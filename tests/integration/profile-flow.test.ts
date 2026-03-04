import { beforeEach, describe, expect, it } from 'vitest';
import * as authStorage from '../../src/services/auth';
import * as profileApi from '../../src/services/mock/profile';

describe('Profile mock flow', () => {
  beforeEach(() => {
    localStorage.clear();
    authStorage.clearSession();
  });

  it('returns default profile based on current session', async () => {
    authStorage.setSession({
      token: 'session-token',
      user: {
        user_id: 'user-1',
        display_name: 'Alice',
        identifier: 'alice@example.com',
      },
    });

    const { profile } = await profileApi.getProfile();
    expect(profile).toEqual({
      user_id: 'user-1',
      display_name: 'Alice',
      contact: 'alice@example.com',
      avatar_url: '',
    });
  });

  it('persists updated profile fields', async () => {
    authStorage.setSession({
      token: 'session-token',
      user: {
        user_id: 'user-1',
        display_name: 'Alice',
        identifier: 'alice@example.com',
      },
    });

    const { profile: updatedProfile } = await profileApi.updateProfile({
      display_name: 'Alice Chen',
      contact: '18800001111',
      avatar_url: 'https://example.com/avatar.png',
    });

    expect(updatedProfile.display_name).toBe('Alice Chen');
    expect(updatedProfile.contact).toBe('18800001111');
    expect(updatedProfile.avatar_url).toBe('https://example.com/avatar.png');

    const { profile: fetchedAgain } = await profileApi.getProfile();
    expect(fetchedAgain).toEqual(updatedProfile);
  });

  it('rejects updates missing required fields', async () => {
    await expect(
      profileApi.updateProfile({
        display_name: '   ',
        contact: 'alice@example.com',
      })
    ).rejects.toThrow('display_name and contact are required.');
  });
});
