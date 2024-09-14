import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/dashboard')({
  component: () => <HomePage />,
});

const HomePage = () => {
  const logout = useLogout();
  return (
    <div className="flex-col w-screen h-screen space-y-4 flex-center">
      <div>Protected Page</div>
      <h1>Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
