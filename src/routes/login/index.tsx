import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/hooks/use-login';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/login/')({
  validateSearch: z.object({
    redirectTo: z.string().optional(),
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.auth.token) {
      throw redirect({ to: search.redirectTo || '/' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const { login, loading } = useLogin();

  return (
    <div className="flex-col w-screen h-screen space-y-5 flex-center">
      <div>LoginPage</div>
      <Button onClick={login}>
        {loading ? <Spinner className="w-4 h-4 mr-2" /> : null}
        Login
      </Button>
    </div>
  );
}
