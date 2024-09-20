import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { confirm } from '@/components/confirm-dialog/confirm-dialog';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { DemoList } from '@/features/demo/demo-list';
import { demosQueryOptions } from '@/features/demo/api/get-demos';
import { useCurrentUser } from '@/features/auth/user-provider';

export const Route = createFileRoute('/_authed/dashboard')({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(demosQueryOptions()),
  component: () => <HomePage />,
});

const HomePage = () => {
  const logout = useLogout();
  const user = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const ok = await confirm('Log Out', 'Are you sure you want to logout?');
    if (!ok) return;
    logout();
  }

  return (
    <div className="flex-col w-screen h-screen space-y-4 flex-center">
      <Button onClick={() => navigate({ to: '/' })}>Home</Button>
      <div>Protected Page</div>
      <h1>Dashboard</h1>
      <div>{user?.username ?? ''}</div>
      <DemoList />

      <Button onClick={handleLogout}>Logout</Button>

    </div>
  );
};
