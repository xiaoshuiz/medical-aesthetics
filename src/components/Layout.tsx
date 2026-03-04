import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          Medical Aesthetics Booking
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.display_name}</span>
              <Link to="/profile" className="text-sm text-blue-600 hover:underline">
                Profile
              </Link>
              <Link to="/booking" className="text-sm text-blue-600 hover:underline">
                Book
              </Link>
              <Link to="/history" className="text-sm text-blue-600 hover:underline">
                History
              </Link>
              <Link to="/membership" className="text-sm text-blue-600 hover:underline">
                Membership
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-blue-600 hover:underline">
                Log in
              </Link>
              <Link to="/register" className="text-sm text-blue-600 hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
