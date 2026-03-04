import { describe, it, expect } from 'vitest';
import * as auth from '../../src/services/mock/auth';

/**
 * Contract / critical path test: AuthService.Login (mock).
 * Ensures login returns session_token and user per contracts/api.proto LoginResponse.
 */
describe('Auth mock (contract)', () => {
  it('login returns session token and user summary', async () => {
    const res = await auth.login({ identifier: 'user@example.com', password: 'secret' });
    expect(res).toHaveProperty('session_token');
    expect(typeof res.session_token).toBe('string');
    expect(res.session_token.length).toBeGreaterThan(0);
    expect(res).toHaveProperty('user');
    expect(res.user).toHaveProperty('user_id');
    expect(res.user).toHaveProperty('display_name');
    expect(res.user).toHaveProperty('identifier');
    expect(res.user.identifier).toBe('user@example.com');
  });

  it('register returns session token and user summary', async () => {
    const res = await auth.register({
      identifier: 'new@example.com',
      password: 'secret',
      display_name: 'New User',
    });
    expect(res).toHaveProperty('session_token');
    expect(res).toHaveProperty('user');
    expect(res.user.display_name).toBe('New User');
    expect(res.user.identifier).toBe('new@example.com');
  });
});
