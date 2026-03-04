import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="text-xl font-medium text-gray-800">Welcome</h2>
      <p className="mt-2 text-gray-600">
        {user
          ? `Welcome, ${user.display_name}. Book appointments, manage your profile, and view your membership.`
          : 'Sign in or register to book appointments and manage your profile.'}
      </p>
      {user && (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/booking"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Book appointment
          </Link>
          <Link
            to="/profile"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            My profile
          </Link>
          <Link
            to="/history"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            History
          </Link>
        </div>
      )}
    </div>
  );
}
