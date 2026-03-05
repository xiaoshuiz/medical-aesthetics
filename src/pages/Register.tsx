import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Register() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!identifier.trim()) {
      setError('Please enter your email or phone.');
      return;
    }
    if (!displayName.trim()) {
      setError('Please enter your display name.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const result = await register(identifier.trim(), password, displayName.trim());
    if (result.ok) {
      navigate('/', { replace: true });
    } else {
      setError(result.error ?? 'Registration failed. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h2 className="text-xl font-medium text-functional-clinical font-serif" style={{ letterSpacing: 'var(--heading-letter-spacing)' }}>Register</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="reg-identifier" className="block text-sm font-medium text-functional-clinical">
            Email or phone
          </label>
          <input
            id="reg-identifier"
            type="text"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full rounded-card border border-neutral-400 px-3 py-2 shadow-mist focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        <div>
          <label htmlFor="reg-displayName" className="block text-sm font-medium text-functional-clinical">
            Display name
          </label>
          <input
            id="reg-displayName"
            type="text"
            autoComplete="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full rounded-card border border-neutral-400 px-3 py-2 shadow-mist focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-functional-clinical">
            Password (min 6 characters)
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
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
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-4 text-sm text-functional-clinical" style={{ letterSpacing: 'var(--body-letter-spacing)', lineHeight: 'var(--body-line-height)' }}>
        Already have an account?{' '}
        <Link to="/login" className="text-accent-gold-dark hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
