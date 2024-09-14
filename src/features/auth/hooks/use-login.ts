import { useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { useAuth } from '../auth-provider';
import { useState } from 'react';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const router = useRouter();
  const search = useSearch({ from: '/login/' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const success = await login();
    setLoading(false);

    if (success) {
      await router.invalidate();

      navigate({ to: search.redirectTo ?? '/', replace: true });
    }
  };

  return {
    login: handleLogin,
    loading,
  };
}
