import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { UserSummary } from '../services/auth';
import * as authStorage from '../services/auth';
import * as authApi from '../services/mock/auth';

interface AuthState {
  user: UserSummary | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (identifier: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (identifier: string, password: string, displayName: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const session = authStorage.getSession();
    return {
      user: session?.user ?? null,
      token: session?.token ?? null,
      loading: false,
    };
  });

  const refreshSession = useCallback(() => {
    const session = authStorage.getSession();
    setState((s) => ({
      ...s,
      user: session?.user ?? null,
      token: session?.token ?? null,
    }));
  }, []);

  const login = useCallback(
    async (identifier: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const res = await authApi.login({ identifier, password });
        authStorage.setSession({ token: res.session_token, user: res.user });
        setState({
          user: res.user,
          token: res.session_token,
          loading: false,
        });
        return { ok: true };
      } catch {
        setState((s) => ({ ...s, loading: false }));
        return { ok: false, error: 'Invalid credentials. Please try again.' };
      }
    },
    []
  );

  const register = useCallback(
    async (
      identifier: string,
      password: string,
      displayName: string
    ): Promise<{ ok: boolean; error?: string }> => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const res = await authApi.register({
          identifier,
          password,
          display_name: displayName,
        });
        authStorage.setSession({ token: res.session_token, user: res.user });
        setState({
          user: res.user,
          token: res.session_token,
          loading: false,
        });
        return { ok: true };
      } catch {
        setState((s) => ({ ...s, loading: false }));
        return { ok: false, error: 'Registration failed. Please try again.' };
      }
    },
    []
  );

  const logout = useCallback(() => {
    authStorage.clearSession();
    setState({ user: null, token: null, loading: false });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      register,
      logout,
      refreshSession,
    }),
    [state, login, register, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
