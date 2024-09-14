import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/storage';
import { CACHE_KEY } from '@/constants';
import { getUser, login } from './api/auth';
import type { AuthedUser } from './types/user';

export type AuthContextType = {
  token: string | null | undefined;
  login: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthed: boolean;
  // 当前登录用户, null 表示未登录, undefined 表示正在加载
  currentUser: AuthedUser | null | undefined;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [currentUser, setCurrentUser] = useState<AuthedUser | null | undefined>(
    undefined
  );

  // 初始化用户信息
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getLocalStorage(CACHE_KEY.TOKEN);

      if (token) {
        try {
          // 使用存储的token调用API验证用户
          const { user, token } = await getUser();
          // 更新token（如果有变化）
          setCurrentUser(user);
          setToken(token);
          setLocalStorage(CACHE_KEY.TOKEN, token);
        } catch (error) {
          console.error('Failed to validate user:', error);
          handleLogout(); // 清除无效的认证信息
        }
      } else {
        handleLogout(); // 确保状态为未登录
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async () => {
    const { token, user } = await login();
    if (token) {
      flushSync(() => {
        setToken(token);
        setCurrentUser(user);
        setLocalStorage(CACHE_KEY.TOKEN, token);
      });

      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    removeLocalStorage(CACHE_KEY.TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        login: handleLogin,
        logout: handleLogout,
        isLoading: currentUser === undefined,
        isAuthed: !!currentUser,
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
