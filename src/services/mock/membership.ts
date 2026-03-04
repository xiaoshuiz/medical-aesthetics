export interface MemberStatus {
  tier_id: string;
  tier_name: string;
}

export interface MemberBenefit {
  type: string;
  value: number;
  procedure_ids: string[];
}

export async function getMemberStatus(): Promise<{
  status: MemberStatus;
  benefits: MemberBenefit[];
}> {
  await delay(100);
  return {
    status: { tier_id: 't1', tier_name: 'Standard' },
    benefits: [{ type: 'discount_percent', value: 10, procedure_ids: [] }],
  };
}

export async function getBalance(): Promise<number> {
  await delay(100);
  const { getStoredBalance } = await import('./store');
  return getStoredBalance();
}

export async function topUpBalance(amount_cents: number): Promise<{
  payment: { id: string };
  new_balance_cents: number;
}> {
  await delay(300);
  const { getStoredBalance, setStoredBalance, addPayment } = await import('./store');
  const current = getStoredBalance();
  const newBalance = current + amount_cents;
  setStoredBalance(newBalance);
  const payId = 'topup-' + Date.now();
  addPayment({
    id: payId,
    amount_cents,
    status: 'success',
    created_at: new Date().toISOString(),
    description: 'Balance top-up',
  });
  return {
    payment: { id: payId },
    new_balance_cents: newBalance,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
