import { useLocation, Link } from 'react-router-dom';

interface SuccessState {
  confirmationNumber: string;
  procedure: string;
  date: string;
  time: string;
  doctor: string;
}

export function BookingSuccess() {
  const { state } = useLocation() as { state?: SuccessState };

  if (!state) {
    return (
      <div className="mx-auto max-w-xl rounded-card border border-neutral-300 bg-surface-pearl p-6 shadow-mist">
        <p className="text-functional-clinical">No booking confirmation found.</p>
        <Link to="/booking" className="mt-4 inline-block text-sm text-accent-gold-dark hover:underline">
          Book an appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-card border border-neutral-300 bg-surface-pearl p-6 shadow-mist">
      <h2 className="text-xl font-medium text-functional-clinical">Booking confirmed</h2>
      <p className="mt-2 text-sm text-functional-clinical">
        Your appointment has been confirmed. Confirmation number: {state.confirmationNumber}
      </p>
      <div className="mt-6 rounded-card border border-neutral-300 bg-neutral-100 p-4 text-sm">
        <p><span className="font-medium">Procedure:</span> {state.procedure}</p>
        <p><span className="font-medium">Date:</span> {state.date}</p>
        <p><span className="font-medium">Time:</span> {state.time}</p>
        <p><span className="font-medium">Doctor:</span> {state.doctor}</p>
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          to="/history"
          className="rounded-pill bg-accent-gold-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          View history
        </Link>
        <Link
          to="/booking"
          className="rounded-card border border-neutral-400 px-4 py-2 text-sm font-medium text-functional-clinical hover:bg-neutral-100"
        >
          Book another
        </Link>
      </div>
    </div>
  );
}
