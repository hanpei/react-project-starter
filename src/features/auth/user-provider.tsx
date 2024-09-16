import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '@/lib/storage';
import { CACHE_KEY } from '@/constants';
import type { User } from './types/user';
import { getUser } from './api/auth';
import { useAuth } from './auth-provider';

type UserContextType = {
  user: User | null;
};

const UserContext = createContext<UserContextType>({ user: null });

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  const { data, } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    staleTime: Infinity, // 永远不过期
    enabled: !!token,
    placeholderData: () => {
      const storedUser = getLocalStorage<User | null>(CACHE_KEY.USER);
      return storedUser ? storedUser : undefined;
    },
    select: (data) => {
      if (data) {
        setLocalStorage(CACHE_KEY.USER, data);
      }
      return data;
    }
  });

  return (
    <UserContext.Provider value={{ user: data ?? null }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a UserProvider');
  }
  return context.user;
};



