import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface-pearl">
      <header className="border-b border-neutral-300 bg-surface-pearl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-functional-clinical" style={{ letterSpacing: 'var(--heading-letter-spacing)' }}>
          Medical Aesthetics Booking
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-functional-clinical" style={{ letterSpacing: 'var(--body-letter-spacing)', lineHeight: 'var(--body-line-height)' }}>{user.display_name}</span>
              <Link to="/profile" className="text-sm text-accent-gold-dark hover:underline">
                Profile
              </Link>
              <Link to="/booking" className="text-sm text-accent-gold-dark hover:underline">
                Book
              </Link>
              <Link to="/history" className="text-sm text-accent-gold-dark hover:underline">
                History
              </Link>
              <Link to="/membership" className="text-sm text-accent-gold-dark hover:underline">
                Membership
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm text-functional-clinical hover:text-accent-gold-dark"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-accent-gold-dark hover:underline">
                Log in
              </Link>
              <Link to="/register" className="text-sm text-accent-gold-dark hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="py-section px-4">
        <Outlet />
      </main>
    </div>
  );
}
