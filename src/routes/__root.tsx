import type { MyRouterContext } from '@/features/app/router';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return <Outlet />;
  },
});
