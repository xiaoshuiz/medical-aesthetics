export interface Payment {
  id: string;
  amount_cents: number;
  status: string;
  created_at: string;
  description: string;
  appointment_id?: string;
}

export async function listPayments(params?: {
  page?: number;
  page_size?: number;
}): Promise<{ payments: Payment[]; total: number }> {
  await delay(100);
  const { getStoredPayments } = await import('./store');
  const list = getStoredPayments();
  const total = list.length;
  const page = params?.page ?? 1;
  const pageSize = params?.page_size ?? 20;
  const start = (page - 1) * pageSize;
  const payments = list.slice(start, start + pageSize);
  return { payments, total };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
