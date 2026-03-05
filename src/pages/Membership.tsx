import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as client from '../services/client';

export function Membership() {
  const [topUpAmount, setTopUpAmount] = useState('');
  const queryClient = useQueryClient();

  const { data: memberData, isLoading } = useQuery({
    queryKey: ['memberStatus', 'balance'],
    queryFn: async () => {
      const [status, balance] = await Promise.all([
        client.membership.getMemberStatus(),
        client.membership.getBalance(),
      ]);
      return { status, balance };
    },
  });

  const topUpMutation = useMutation({
    mutationFn: (amount_cents: number) => client.membership.topUpBalance(amount_cents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberStatus', 'balance'] });
      setTopUpAmount('');
    },
  });

  function handleTopUp(e: React.FormEvent) {
    e.preventDefault();
    const cents = Math.round(parseFloat(topUpAmount) * 100);
    if (cents > 0) {
      topUpMutation.mutate(cents);
    }
  }

  const status = memberData?.status;
  const balance = memberData?.balance ?? 0;
  const benefits = status?.benefits ?? [];

  return (
    <div className="mx-auto max-w-xl rounded-card border border-neutral-300 bg-surface-pearl p-6 shadow-mist">
      <h2 className="text-xl font-medium text-functional-clinical">Membership</h2>
      <p className="mt-2 text-sm text-functional-clinical">
        View your membership tier, benefits, and balance.
      </p>

      {isLoading ? (
        <p className="mt-6 text-sm text-functional-clinical">Loading…</p>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Tier & Benefits */}
          <div className="rounded-card border border-neutral-300 bg-neutral-100 p-4">
            <h3 className="text-sm font-medium text-functional-clinical">Member status</h3>
            <p className="mt-2 font-medium">{status?.tier_name ?? 'Standard'}</p>
            {benefits.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-functional-clinical">
                {benefits.map((b, i) => (
                  <li key={i}>
                    {b.type === 'discount_percent' && (
                      <>{(b as { value: number }).value}% discount on procedures</>
                    )}
                    {b.type === 'discount_fixed' && (
                      <>¥{((b as { value: number }).value / 100).toFixed(2)} off</>
                    )}
                    {b.type !== 'discount_percent' && b.type !== 'discount_fixed' && (
                      <>{b.type}: {String((b as { value: number }).value)}</>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Balance */}
          <div className="rounded-card border border-neutral-300 bg-neutral-100 p-4">
            <h3 className="text-sm font-medium text-functional-clinical">Balance</h3>
            <p className="mt-2 text-lg font-medium">¥{(balance / 100).toFixed(2)}</p>
            <p className="mt-1 text-sm text-functional-clinical">
              Use your balance when booking to pay for appointments.
            </p>

            <form onSubmit={handleTopUp} className="mt-4 flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount (e.g. 100)"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="block w-32 rounded-card border border-neutral-400 px-3 py-2 text-sm shadow-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              />
              <button
                type="submit"
                disabled={topUpMutation.isPending || !topUpAmount}
                className="rounded-pill bg-accent-gold-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {topUpMutation.isPending ? 'Processing…' : 'Top up'}
              </button>
            </form>
            {topUpMutation.isSuccess && (
              <p className="mt-2 text-sm text-green-700" role="status">
                Balance updated successfully.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
