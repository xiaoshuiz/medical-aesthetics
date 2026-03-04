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
  return 0;
}

export async function topUpBalance(_amount_cents: number): Promise<{
  payment: { id: string };
  new_balance_cents: number;
}> {
  await delay(300);
  return {
    payment: { id: 'topup-' + Date.now() },
    new_balance_cents: _amount_cents,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
