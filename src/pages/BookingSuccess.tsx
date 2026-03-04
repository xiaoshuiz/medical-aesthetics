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
      <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-600">No booking confirmation found.</p>
        <Link to="/booking" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          Book an appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-green-700">Booking confirmed</h2>
      <p className="mt-2 text-sm text-gray-600">
        Your appointment has been confirmed. Confirmation number: {state.confirmationNumber}
      </p>
      <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <p><span className="font-medium">Procedure:</span> {state.procedure}</p>
        <p><span className="font-medium">Date:</span> {state.date}</p>
        <p><span className="font-medium">Time:</span> {state.time}</p>
        <p><span className="font-medium">Doctor:</span> {state.doctor}</p>
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          to="/history"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          View history
        </Link>
        <Link
          to="/booking"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Book another
        </Link>
      </div>
    </div>
  );
}
