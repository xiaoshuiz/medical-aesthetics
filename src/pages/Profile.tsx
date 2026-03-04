import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as client from '../services/client';
import * as authStorage from '../services/auth';

interface ProfileFormErrors {
  displayName?: string;
  contact?: string;
  avatarUrl?: string;
}

export function Profile() {
  const { refreshSession } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [contact, setContact] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState<ProfileFormErrors>({});

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      setLoading(true);
      setError('');
      try {
        const { profile } = await client.profile.getProfile();
        if (!active) return;
        setDisplayName(profile.display_name);
        setContact(profile.contact);
        setAvatarUrl(profile.avatar_url);
      } catch {
        if (!active) return;
        setError('Unable to load your profile. Please refresh and try again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      active = false;
    };
  }, []);

  function validateForm(): ProfileFormErrors {
    const nextErrors: ProfileFormErrors = {};
    if (!displayName.trim()) {
      nextErrors.displayName = 'Display name is required.';
    }
    if (!contact.trim()) {
      nextErrors.contact = 'Contact is required.';
    }
    if (avatarUrl.trim() && !isValidHttpUrl(avatarUrl.trim())) {
      nextErrors.avatarUrl = 'Avatar URL must start with http:// or https://.';
    }
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const nextErrors = validateForm();
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSaving(true);
    try {
      const { profile } = await client.profile.updateProfile({
        display_name: displayName.trim(),
        contact: contact.trim(),
        avatar_url: avatarUrl.trim(),
      });
      setDisplayName(profile.display_name);
      setContact(profile.contact);
      setAvatarUrl(profile.avatar_url);
      syncSessionDisplayName(profile.user_id, profile.display_name, refreshSession);
      setSuccess('Profile saved successfully.');
    } catch {
      setError('Unable to save your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const avatarPreview = avatarUrl.trim();
  const hasAvatarPreview = avatarPreview !== '' && isValidHttpUrl(avatarPreview);
  const avatarFallback = (displayName.trim()[0] ?? 'U').toUpperCase();

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-gray-800">My Profile</h2>
      <p className="mt-2 text-sm text-gray-600">Update your display name, contact, and avatar.</p>

      {loading ? (
        <p className="mt-6 text-sm text-gray-600">Loading profile…</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            {hasAvatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="h-16 w-16 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600">
                {avatarFallback}
              </div>
            )}
            <p className="text-sm text-gray-500">
              {hasAvatarPreview
                ? 'This is how your avatar will appear.'
                : 'Enter an avatar URL to preview your profile image.'}
            </p>
          </div>

          <div>
            <label htmlFor="profile-display-name" className="block text-sm font-medium text-gray-700">
              Display name
            </label>
            <input
              id="profile-display-name"
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formErrors.displayName && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {formErrors.displayName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="profile-contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              id="profile-contact"
              type="text"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formErrors.contact && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {formErrors.contact}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="profile-avatar-url" className="block text-sm font-medium text-gray-700">
              Avatar URL (optional)
            </label>
            <input
              id="profile-avatar-url"
              type="url"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              placeholder="https://example.com/avatar.png"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formErrors.avatarUrl && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {formErrors.avatarUrl}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      )}
    </div>
  );
}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function syncSessionDisplayName(
  profileUserId: string,
  nextDisplayName: string,
  refreshSession: () => void
): void {
  const session = authStorage.getSession();
  if (!session || session.user.user_id !== profileUserId) return;
  if (session.user.display_name === nextDisplayName) return;
  authStorage.setSession({
    ...session,
    user: {
      ...session.user,
      display_name: nextDisplayName,
    },
  });
  refreshSession();
}
