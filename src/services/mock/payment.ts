export interface Payment {
  id: string;
  amount_cents: number;
  status: string;
  created_at: string;
  description: string;
  appointment_id?: string;
}

export async function listPayments(_params?: {
  page?: number;
  page_size?: number;
}): Promise<{ payments: Payment[]; total: number }> {
  void _params;
  await delay(100);
  return { payments: [], total: 0 };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
