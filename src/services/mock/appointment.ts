export interface Appointment {
  id: string;
  procedure_id: string;
  procedure_name: string;
  date: string;
  start_time: string;
  doctor_id: string;
  doctor_name: string;
  status: string;
  payment_id: string;
}

export interface CreateAppointmentParams {
  procedure_id: string;
  slot_id: string;
  doctor_id: string;
  payment: { use_balance: boolean; external_amount_cents?: number };
  /** Mock-only: display data for stored appointment */
  procedure_name?: string;
  date?: string;
  start_time?: string;
  doctor_name?: string;
  /** Mock-only: total amount for payment record */
  total_amount_cents?: number;
}

export async function createAppointment(
  params: CreateAppointmentParams
): Promise<{ appointment: Appointment; payment: { id: string } }> {
  await delay(300);
  const payId = 'pay-' + Date.now();
  const aptId = 'apt-' + Date.now();
  const appointment: Appointment = {
    id: aptId,
    procedure_id: params.procedure_id,
    procedure_name: params.procedure_name ?? 'Procedure',
    date: params.date ?? new Date().toISOString().slice(0, 10),
    start_time: params.start_time ?? '09:00',
    doctor_id: params.doctor_id,
    doctor_name: params.doctor_name ?? 'Doctor',
    status: 'upcoming',
    payment_id: payId,
  };
  const { addAppointment, addPayment } = await import('./store');
  addAppointment(appointment);
  const amount =
    params.total_amount_cents ?? params.payment.external_amount_cents ?? 0;
  if (params.payment.use_balance && amount > 0) {
    const { getStoredBalance, setStoredBalance } = await import('./store');
    const bal = getStoredBalance();
    const deduct = Math.min(bal, amount);
    if (deduct > 0) setStoredBalance(bal - deduct);
  }
  addPayment({
    id: payId,
    amount_cents: amount,
    status: 'success',
    created_at: new Date().toISOString(),
    description: `Appointment: ${appointment.procedure_name}`,
    appointment_id: aptId,
  });
  return { appointment, payment: { id: payId } };
}

export async function listAppointments(params?: {
  page?: number;
  page_size?: number;
  status_filter?: string;
}): Promise<{ appointments: Appointment[]; total: number }> {
  await delay(100);
  const { getStoredAppointments } = await import('./store');
  let list = getStoredAppointments();
  if (params?.status_filter) {
    if (params.status_filter === 'upcoming') {
      list = list.filter((a) => a.status === 'upcoming');
    } else if (params.status_filter === 'past') {
      list = list.filter((a) => a.status !== 'upcoming');
    }
  }
  const total = list.length;
  const page = params?.page ?? 1;
  const pageSize = params?.page_size ?? 20;
  const start = (page - 1) * pageSize;
  const appointments = list.slice(start, start + pageSize);
  return { appointments, total };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
