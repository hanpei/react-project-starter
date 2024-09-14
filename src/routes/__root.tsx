import type { MyRouterContext } from '@/features/app/router';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return <Outlet />;
  },
  notFoundComponent: () => {
    return (
      <div className="flex-col w-screen h-screen flex-center">
        <h1>Not Found</h1>
      </div>
    );
  },
});
