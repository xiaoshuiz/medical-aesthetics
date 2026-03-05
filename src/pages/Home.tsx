import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="text-xl font-medium text-functional-clinical font-serif" style={{ letterSpacing: 'var(--heading-letter-spacing)' }}>Welcome</h2>
      <p className="mt-2 text-functional-clinical" style={{ letterSpacing: 'var(--body-letter-spacing)', lineHeight: 'var(--body-line-height)' }}>
        {user
          ? `Welcome, ${user.display_name}. Book appointments, manage your profile, and view your membership.`
          : 'Sign in or register to book appointments and manage your profile.'}
      </p>
      {user && (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/booking"
            className="rounded-pill bg-accent-gold-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
          >
            Book appointment
          </Link>
          <Link
            to="/profile"
            className="rounded-card border border-neutral-400 px-4 py-2 text-sm font-medium text-functional-clinical hover:bg-neutral-200"
          >
            My profile
          </Link>
          <Link
            to="/history"
            className="rounded-card border border-neutral-400 px-4 py-2 text-sm font-medium text-functional-clinical hover:bg-neutral-200"
          >
            History
          </Link>
        </div>
      )}
    </div>
  );
}
