import type React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { AuthResponse, User } from '../types/global';
import { api } from '../services/api';

interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (data: { name: string; password: string; confirmPassword: string; cpf: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) as User : null;
  });

  const persist = (response: AuthResponse): void => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const { data } = await api.post<AuthResponse>('/auth/signin', { email, password });
    persist(data);
  };

  const signOut = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = async (data: { name: string; password: string; confirmPassword: string; cpf: string }): Promise<void> => {
    const response = await api.put<User>('/auth/users/me', data);
    localStorage.setItem('user', JSON.stringify(response.data));
    setUser(response.data);
  };

  const value = useMemo(() => ({ user, signIn, signOut, updateUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa do provider');
  return context;
};
