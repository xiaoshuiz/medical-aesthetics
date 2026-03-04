import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as client from '../services/client';
import type { Procedure, Doctor, TimeSlot } from '../services/mock/catalog';

type Step = 'procedure' | 'slot' | 'doctor' | 'confirm';

export function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('procedure');
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const { data: procedures, isLoading: loadingProcedures } = useQuery({
    queryKey: ['procedures'],
    queryFn: () => client.catalog.listProcedures(),
  });

  const { data: doctors, isLoading: loadingDoctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => client.catalog.listDoctors(),
  });

  const { data: slots, isLoading: loadingSlots } = useQuery({
    queryKey: ['slots', selectedProcedure?.id, selectedDate, selectedDoctor?.id],
    queryFn: () =>
      client.catalog.getAvailableSlots({
        procedure_id: selectedProcedure!.id,
        date: selectedDate,
        doctor_id: selectedDoctor?.id,
      }),
    enabled: !!selectedProcedure && !!selectedDate,
  });

  const handleProcedureSelect = (p: Procedure) => {
    setSelectedProcedure(p);
    setSelectedDate('');
    setSelectedSlot(null);
    setSelectedDoctor(null);
    setStep('slot');
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setSelectedDoctor(null);
  };

  const handleSlotSelect = (s: TimeSlot) => {
    setSelectedSlot(s);
    const doc = doctors?.find((d) => d.id === s.doctor_id);
    setSelectedDoctor(doc ?? null);
    setStep('doctor');
  };

  const handleDoctorSelect = (d: Doctor) => {
    setSelectedDoctor(d);
    setStep('confirm');
  };

  const handleConfirm = () => {
    const state = {
      procedure: selectedProcedure!,
      slot: selectedSlot!,
      doctor: selectedDoctor!,
    };
    navigate('/booking/confirm', { state });
  };

  const handleBack = () => {
    if (step === 'slot') setStep('procedure');
    else if (step === 'doctor') setStep('slot');
    else if (step === 'confirm') setStep('doctor');
  };

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-gray-800">Book Appointment</h2>
      <p className="mt-2 text-sm text-gray-600">
        Select procedure, date, time, and doctor.
      </p>

      {/* Step 1: Procedure */}
      {step === 'procedure' && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700">1. Select procedure</h3>
          {loadingProcedures ? (
            <p className="mt-2 text-sm text-gray-600">Loading procedures…</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {procedures?.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => handleProcedureSelect(p)}
                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-left text-sm hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <span className="font-medium">{p.name}</span>
                    {p.description && (
                      <span className="ml-2 text-gray-600">— {p.description}</span>
                    )}
                    <span className="block mt-1 text-gray-500">
                      ¥{(p.base_price_cents / 100).toFixed(2)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Step 2: Date & Slot */}
      {step === 'slot' && selectedProcedure && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">2. Select date & time</h3>
            <p className="mt-1 text-sm text-gray-600">
              Selected: {selectedProcedure.name}
            </p>
          </div>
          <div>
            <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="booking-date"
              type="date"
              value={selectedDate}
              min={minDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available slots
              </label>
              {loadingSlots ? (
                <p className="mt-2 text-sm text-gray-600">Loading slots…</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {slots?.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => handleSlotSelect(s)}
                        className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-left text-sm hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {s.start_time} – {s.end_time}
                      </button>
                    </li>
                  ))}
                  {slots?.length === 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      No available slots for this date.
                    </p>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Doctor */}
      {step === 'doctor' && selectedProcedure && selectedSlot && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">3. Select doctor</h3>
            <p className="mt-1 text-sm text-gray-600">
              {selectedProcedure.name} · {selectedSlot.date} {selectedSlot.start_time}
            </p>
          </div>
          {loadingDoctors ? (
            <p className="text-sm text-gray-600">Loading doctors…</p>
          ) : (
            <ul className="space-y-2">
              {doctors?.map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => handleDoctorSelect(d)}
                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-left text-sm hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {d.display_name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 'confirm' &&
        selectedProcedure &&
        selectedSlot &&
        selectedDoctor && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">4. Summary</h3>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
              <p>
                <span className="font-medium">Procedure:</span> {selectedProcedure.name}
              </p>
              <p>
                <span className="font-medium">Date:</span> {selectedSlot.date}
              </p>
              <p>
                <span className="font-medium">Time:</span> {selectedSlot.start_time} –{' '}
                {selectedSlot.end_time}
              </p>
              <p>
                <span className="font-medium">Doctor:</span> {selectedDoctor.display_name}
              </p>
              <p>
                <span className="font-medium">Price:</span> ¥
                {(selectedProcedure.base_price_cents / 100).toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue to payment
            </button>
          </div>
        )}

      {step !== 'procedure' && (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
