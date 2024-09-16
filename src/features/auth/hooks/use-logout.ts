import { useNavigate, useRouter } from '@tanstack/react-router';
import { useAuth } from '../auth-provider';
import { queryClient } from '@/features/app/react-query';

export function useLogout() {
  const navigate = useNavigate();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: ['user'] });

    router.invalidate().finally(() => {
      navigate({ to: '/' });
    });
  };

  return handleLogout;
}
