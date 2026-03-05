import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!identifier.trim() || !password) {
      setError('Please enter your identifier and password.');
      return;
    }
    const result = await login(identifier.trim(), password);
    if (result.ok) {
      navigate(redirect, { replace: true });
    } else {
      setError(result.error ?? 'Invalid credentials. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h2 className="text-xl font-medium text-functional-clinical font-serif" style={{ letterSpacing: 'var(--heading-letter-spacing)' }}>Log in</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="login-identifier" className="block text-sm font-medium text-functional-clinical">
            Email or phone
          </label>
          <input
            id="login-identifier"
            type="text"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full rounded-card border border-neutral-400 px-3 py-2 shadow-mist focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-functional-clinical">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-card border border-neutral-400 px-3 py-2 shadow-mist focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        {error && (
          <p className="text-sm text-functional-clinical" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-pill bg-accent-gold-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-sm text-functional-clinical" style={{ letterSpacing: 'var(--body-letter-spacing)', lineHeight: 'var(--body-line-height)' }}>
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-accent-gold-dark hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
