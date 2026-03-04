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
}

export async function createAppointment(
  _params: CreateAppointmentParams
): Promise<{ appointment: Appointment; payment: { id: string } }> {
  await delay(300);
  return {
    appointment: {
      id: 'apt-' + Date.now(),
      procedure_id: _params.procedure_id,
      procedure_name: 'Mock Procedure',
      date: new Date().toISOString().slice(0, 10),
      start_time: '09:00',
      doctor_id: _params.doctor_id,
      doctor_name: 'Dr. Smith',
      status: 'upcoming',
      payment_id: 'pay-' + Date.now(),
    },
    payment: { id: 'pay-' + Date.now() },
  };
}

export async function listAppointments(_params?: {
  page?: number;
  page_size?: number;
}): Promise<{ appointments: Appointment[]; total: number }> {
  await delay(100);
  return { appointments: [], total: 0 };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
