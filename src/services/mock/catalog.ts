export interface Procedure {
  id: string;
  name: string;
  description: string;
  base_price_cents: number;
}

export interface Doctor {
  id: string;
  display_name: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  doctor_id: string;
}

export async function listProcedures(): Promise<Procedure[]> {
  await delay(100);
  return [
    { id: 'p1', name: 'Consultation', description: 'Initial consultation', base_price_cents: 5000 },
    { id: 'p2', name: 'Treatment A', description: 'Treatment A', base_price_cents: 20000 },
  ];
}

export async function listDoctors(): Promise<Doctor[]> {
  await delay(100);
  return [
    { id: 'd1', display_name: 'Dr. Smith' },
    { id: 'd2', display_name: 'Dr. Lee' },
  ];
}

export async function getAvailableSlots(_params: {
  procedure_id: string;
  date: string;
  doctor_id?: string;
}): Promise<TimeSlot[]> {
  await delay(100);
  return [
    {
      id: 's1',
      date: _params.date,
      start_time: '09:00',
      end_time: '09:30',
      doctor_id: 'd1',
    },
    {
      id: 's2',
      date: _params.date,
      start_time: '10:00',
      end_time: '10:30',
      doctor_id: 'd1',
    },
  ];
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
