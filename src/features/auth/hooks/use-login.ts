import { useState } from 'react';
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { useAuth } from '../auth-provider';
import { sleep } from '@/lib/utils';

export function useLogin() {
  const navigate = useNavigate();
  const { login, isAuthed } = useAuth();
  const router = useRouter();
  const search = useSearch({ from: '/login' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const success = await login();

      if (success) {
        await router.invalidate();
        await sleep(1);
        await navigate({ to: search.redirectTo ?? '/', replace: true });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    login: handleLogin,
    loading,
    isAuthed
  };
}
