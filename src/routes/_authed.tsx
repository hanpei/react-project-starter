import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { Spinner } from '@/components/spinner';
import { useAuth } from '@/features/auth/auth-provider';

export const Route = createFileRoute('/_authed')({
  component: ProtectRoute,
});

function ProtectRoute() {
  const { isLoading, isAuthed } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-col w-screen h-screen space-x-3 flex-center">
        <Spinner />
        <h3>checking auth...</h3>
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
