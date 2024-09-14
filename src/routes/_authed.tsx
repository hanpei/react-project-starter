import { Spinner } from '@/components/spinner';
import { useAuth } from '@/features/auth/auth-provider';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed')({
  component: ProtectRoute,
});

function ProtectRoute() {
  const { isLoading, isAuthed } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <Navigate
        to="/login"
        search={{
          redirectTo: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
