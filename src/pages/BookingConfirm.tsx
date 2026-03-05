import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as client from '../services/client';
import type { Procedure, Doctor, TimeSlot } from '../services/mock/catalog';
import { useQuery } from '@tanstack/react-query';

interface BookingState {
  procedure: Procedure;
  slot: TimeSlot;
  doctor: Doctor;
}

export function BookingConfirm() {
  const { state } = useLocation() as { state?: BookingState };
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [useBalance, setUseBalance] = useState(false);

  const { data: memberData } = useQuery({
    queryKey: ['memberStatus', 'balance'],
    queryFn: async () => {
      const [status, balance] = await Promise.all([
        client.membership.getMemberStatus(),
        client.membership.getBalance(),
      ]);
      return { status, balance };
    },
  });

  if (!state?.procedure || !state?.slot || !state?.doctor) {
    return (
      <div className="mx-auto max-w-xl rounded-card border border-neutral-300 bg-surface-pearl p-6 shadow-mist">
        <p className="text-functional-clinical">Invalid booking. Please start from the booking page.</p>
        <button
          type="button"
          onClick={() => navigate('/booking')}
          className="mt-4 text-sm text-accent-gold-dark hover:underline"
        >
          Go to booking
        </button>
      </div>
    );
  }

  const { procedure, slot, doctor } = state;
  const basePrice = procedure.base_price_cents;
  const benefits = memberData?.status.benefits ?? [];
  const discountPercent = benefits.find(
    (b) => b.type === 'discount_percent' && (b.procedure_ids.length === 0 || b.procedure_ids.includes(procedure.id))
  )?.value ?? 0;
  const memberPrice = Math.round(basePrice * (1 - discountPercent / 100));
  const isMember = (memberData?.status.tier_name ?? '') !== '';
  const balance = memberData?.balance ?? 0;
  const finalPrice = isMember ? memberPrice : basePrice;
  const payWithBalance = useBalance && balance > 0;
  const externalCents = payWithBalance ? Math.max(0, finalPrice - balance) : finalPrice;

  async function handleConfirmPayment() {
    setError('');
    setPaying(true);
    try {
      const { appointment } = await client.appointment.createAppointment({
        procedure_id: procedure.id,
        slot_id: slot.id,
        doctor_id: doctor.id,
        payment: {
          use_balance: payWithBalance,
          external_amount_cents: externalCents > 0 ? externalCents : undefined,
        },
        procedure_name: procedure.name,
        date: slot.date,
        start_time: slot.start_time,
        doctor_name: doctor.display_name,
        total_amount_cents: finalPrice,
      });
      navigate('/booking/success', {
        state: {
          confirmationNumber: appointment.id,
          procedure: procedure.name,
          date: slot.date,
          time: slot.start_time,
          doctor: doctor.display_name,
        },
      });
    } catch {
      setError('Payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-card border border-neutral-300 bg-surface-pearl p-6 shadow-mist">
      <h2 className="text-xl font-medium text-functional-clinical">Confirm & Pay</h2>
      <p className="mt-2 text-sm text-functional-clinical">Review your booking and complete payment.</p>

      <div className="mt-6 rounded-card border border-neutral-300 bg-neutral-100 p-4 text-sm">
        <p><span className="font-medium">Procedure:</span> {procedure.name}</p>
        <p><span className="font-medium">Date:</span> {slot.date}</p>
        <p><span className="font-medium">Time:</span> {slot.start_time} – {slot.end_time}</p>
        <p><span className="font-medium">Doctor:</span> {doctor.display_name}</p>
        <p>
          <span className="font-medium">Price:</span>{' '}
          {isMember ? (
            <>
              <span className="text-gray-500 line-through">¥{(basePrice / 100).toFixed(2)}</span>
              {' '}¥{(memberPrice / 100).toFixed(2)} (member)
            </>
          ) : (
            <>¥{(basePrice / 100).toFixed(2)}</>
          )}
        </p>
      </div>

      {balance > 0 && (
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useBalance}
              onChange={(e) => setUseBalance(e.target.checked)}
              className="rounded border-neutral-400"
            />
            <span className="text-sm">
              Pay with balance (¥{(balance / 100).toFixed(2)} available)
            </span>
          </label>
        </div>
      )}

      {payWithBalance && balance < finalPrice && (
        <p className="mt-2 text-sm text-functional-clinical">
          Balance covers ¥{(Math.min(balance, finalPrice) / 100).toFixed(2)}. Remaining ¥{(externalCents / 100).toFixed(2)} will be paid externally (mock).
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-card border border-neutral-400 px-4 py-2 text-sm font-medium text-functional-clinical hover:bg-neutral-100"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirmPayment}
          disabled={paying}
          className="rounded-pill bg-accent-gold-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {paying ? 'Processing…' : 'Confirm payment'}
        </button>
      </div>
    </div>
  );
}
