import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as client from '../services/client';

type Tab = 'appointments' | 'payments';

export function History() {
  const [tab, setTab] = useState<Tab>('appointments');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { data: appointmentsData, isLoading: loadingAppointments } = useQuery({
    queryKey: ['appointments', statusFilter],
    queryFn: () =>
      client.appointment.listAppointments({
        page: 1,
        page_size: 20,
        status_filter: statusFilter || undefined,
      }),
  });

  const { data: paymentsData, isLoading: loadingPayments } = useQuery({
    queryKey: ['payments'],
    queryFn: () =>
      client.payment.listPayments({
        page: 1,
        page_size: 20,
      }),
  });

  const appointments = appointmentsData?.appointments ?? [];
  const payments = paymentsData?.payments ?? [];

  return (
    <div className="mx-auto max-w-2xl rounded-card border border-neutral-300 bg-surface-pearl p-6 shadow-mist">
      <h2 className="text-xl font-medium text-functional-clinical">Appointment & Payment History</h2>
      <p className="mt-2 text-sm text-functional-clinical">
        View your appointments and payment records.
      </p>

      <div className="mt-6 flex gap-2 border-b border-neutral-300">
        <button
          type="button"
          onClick={() => setTab('appointments')}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            tab === 'appointments'
              ? 'border-accent-gold-dark text-accent-gold-dark'
              : 'border-transparent text-functional-clinical hover:text-functional-clinical'
          }`}
        >
          Appointments
        </button>
        <button
          type="button"
          onClick={() => setTab('payments')}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            tab === 'payments'
              ? 'border-accent-gold-dark text-accent-gold-dark'
              : 'border-transparent text-functional-clinical hover:text-functional-clinical'
          }`}
        >
          Payments
        </button>
      </div>

      {tab === 'appointments' && (
        <div className="mt-4">
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter('')}
              className={`rounded px-3 py-1 text-sm ${
                statusFilter === ''
                  ? 'bg-neutral-200 text-functional-clinical'
                  : 'bg-neutral-100 text-functional-clinical hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('upcoming')}
              className={`rounded px-3 py-1 text-sm ${
                statusFilter === 'upcoming'
                  ? 'bg-neutral-200 text-functional-clinical'
                  : 'bg-neutral-100 text-functional-clinical hover:bg-neutral-200'
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('past')}
              className={`rounded px-3 py-1 text-sm ${
                statusFilter === 'past'
                  ? 'bg-neutral-200 text-functional-clinical'
                  : 'bg-neutral-100 text-functional-clinical hover:bg-neutral-200'
              }`}
            >
              Past
            </button>
          </div>
          {loadingAppointments ? (
            <p className="text-sm text-functional-clinical">Loading appointments…</p>
          ) : appointments.length === 0 ? (
            <div className="rounded-card border border-neutral-300 bg-neutral-100 p-8 text-center">
              <p className="text-sm text-functional-clinical">No appointments yet.</p>
              <p className="mt-1 text-sm text-neutral-500">
                Book an appointment to see your history here.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {appointments.map((apt) => (
                <li
                  key={apt.id}
                  className="rounded-card border border-neutral-300 bg-white p-4 shadow-mist"
                >
                  <p className="font-medium">{apt.procedure_name}</p>
                  <p className="text-sm text-functional-clinical">
                    {apt.date} {apt.start_time} · {apt.doctor_name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Status: {apt.status} · ID: {apt.id}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'payments' && (
        <div className="mt-4">
          {loadingPayments ? (
            <p className="text-sm text-functional-clinical">Loading payments…</p>
          ) : payments.length === 0 ? (
            <div className="rounded-card border border-neutral-300 bg-neutral-100 p-8 text-center">
              <p className="text-sm text-functional-clinical">No payments yet.</p>
              <p className="mt-1 text-sm text-neutral-500">
                Your payment history will appear here after bookings or top-ups.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {payments.map((pay) => (
                <li
                  key={pay.id}
                  className="rounded-card border border-neutral-300 bg-white p-4 shadow-mist"
                >
                  <p className="font-medium">¥{(pay.amount_cents / 100).toFixed(2)}</p>
                  <p className="text-sm text-functional-clinical">{pay.description}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {pay.created_at.slice(0, 10)} · {pay.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
