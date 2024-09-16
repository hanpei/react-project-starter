import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    const { isAuthed } = context.auth;
    if (!isAuthed) {
      throw redirect({
        to: '/login',
        search: {
          redirectTo: location.pathname,
        },
      });
    }
  },
  component: ProtectRoute,
});

function ProtectRoute() {
  // const { isAuthed } = useAuth();

  // if (!isAuthed) {
  //   return (
  //     <Navigate
  //       to="/login"
  //       search={{
  //         redirectTo: location.pathname,
  //       }}
  //     />
  //   );
  // }

  return <Outlet />;
}
