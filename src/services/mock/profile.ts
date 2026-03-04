export interface Profile {
  user_id: string;
  display_name: string;
  contact: string;
  avatar_url: string;
}

export async function getProfile(): Promise<Profile> {
  await delay(100);
  return {
    user_id: 'mock-user-1',
    display_name: 'Mock User',
    contact: '',
    avatar_url: '',
  };
}

export async function updateProfile(_updates: Partial<Profile>): Promise<Profile> {
  await delay(200);
  return {
    user_id: 'mock-user-1',
    display_name: _updates.display_name ?? 'Mock User',
    contact: _updates.contact ?? '',
    avatar_url: _updates.avatar_url ?? '',
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
