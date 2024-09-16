import React, { createContext, useContext, useState } from 'react';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/storage';
import { CACHE_KEY } from '@/constants';
import { login } from './api/auth';
import type { User } from './types/user';

export type AuthContextType = {
  token: string | null;
  currentUser: User | null;
  login: () => Promise<boolean>;
  logout: () => void;
  isAuthed: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    getLocalStorage(CACHE_KEY.TOKEN)
  );
  const [currentUser, setCurrentUser] = useState<User | null>(
    getLocalStorage(CACHE_KEY.USER)
  );

  const handleLogin = async () => {
    const { token, user } = await login();
    if (token) {
      setToken(token);
      setCurrentUser(user);
      setLocalStorage(CACHE_KEY.TOKEN, token);
      setLocalStorage(CACHE_KEY.USER, user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    removeLocalStorage(CACHE_KEY.TOKEN);
    removeLocalStorage(CACHE_KEY.USER);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        login: handleLogin,
        logout: handleLogout,
        isAuthed: !!token, // 只基于token判断认证状态
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
