import * as authStorage from '../auth';

export interface Profile {
  user_id: string;
  display_name: string;
  contact: string;
  avatar_url: string;
}

export interface GetProfileResponse {
  profile: Profile;
}

export interface UpdateProfileRequest {
  display_name: string;
  contact: string;
  avatar_url?: string;
}

export interface UpdateProfileResponse {
  profile: Profile;
}

const PROFILE_STORAGE_KEY = 'ma_profile';
const FALLBACK_USER_ID = 'mock-user-1';

export async function getProfile(): Promise<GetProfileResponse> {
  await delay(120);
  const profile = readStoredProfile() ?? buildDefaultProfile();
  persistProfile(profile);
  return { profile };
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  await delay(200);
  const displayName = payload.display_name.trim();
  const contact = payload.contact.trim();
  const avatarUrl = payload.avatar_url?.trim() ?? '';

  if (!displayName || !contact) {
    throw new Error('display_name and contact are required.');
  }

  const current = readStoredProfile() ?? buildDefaultProfile();
  const profile: Profile = {
    ...current,
    display_name: displayName,
    contact,
    avatar_url: avatarUrl,
  };

  persistProfile(profile);
  return { profile };
}

function buildDefaultProfile(): Profile {
  const session = authStorage.getSession();
  return {
    user_id: session?.user.user_id ?? FALLBACK_USER_ID,
    display_name: session?.user.display_name ?? 'Mock User',
    contact: session?.user.identifier ?? '',
    avatar_url: '',
  };
}

function readStoredProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    if (
      !parsed ||
      typeof parsed.user_id !== 'string' ||
      typeof parsed.display_name !== 'string' ||
      typeof parsed.contact !== 'string'
    ) {
      return null;
    }
    return {
      user_id: parsed.user_id,
      display_name: parsed.display_name,
      contact: parsed.contact,
      avatar_url: typeof parsed.avatar_url === 'string' ? parsed.avatar_url : '',
    };
  } catch {
    return null;
  }
}

function persistProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
