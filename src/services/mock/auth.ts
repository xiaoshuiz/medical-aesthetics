import type { UserSummary } from '../auth';

export interface RegisterParams {
  identifier: string;
  password: string;
  display_name: string;
}

export interface LoginParams {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  session_token: string;
  user: UserSummary;
}

export async function register(_params: RegisterParams): Promise<AuthResponse> {
  await delay(300);
  return {
    session_token: 'mock-token-' + Date.now(),
    user: {
      user_id: 'mock-user-1',
      display_name: _params.display_name,
      identifier: _params.identifier,
    },
  };
}

export async function login(_params: LoginParams): Promise<AuthResponse> {
  await delay(300);
  return {
    session_token: 'mock-token-' + Date.now(),
    user: {
      user_id: 'mock-user-1',
      display_name: 'Mock User',
      identifier: _params.identifier,
    },
  };
}

export async function logout(): Promise<void> {
  await delay(100);
}

export async function getSession(): Promise<{ user: UserSummary } | null> {
  await delay(100);
  return null;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
