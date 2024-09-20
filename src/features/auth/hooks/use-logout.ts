import { useNavigate, useRouter } from '@tanstack/react-router';
import { useAuth } from '../auth-provider';

export function useLogout() {
  const navigate = useNavigate();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    router.invalidate().finally(() => {
      navigate({ to: '/' });
    });
  };

  return handleLogout;
}
