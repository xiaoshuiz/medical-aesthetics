export interface UserSummary {
  user_id: string;
  display_name: string;
  identifier: string;
}

export interface Session {
  token: string;
  user: UserSummary;
}

const STORAGE_KEY = 'ma_session';

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}
