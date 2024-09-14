import type { QueryClient } from '@tanstack/react-query';
import type { AuthContextType } from '@/features/auth/auth-provider';

import { lazy, Suspense } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/auth-provider';
import { routeTree } from '@/routeTree.gen';
import { NotFound } from '@/components/not-found';
import { queryClient } from './react-query';

export type MyRouterContext = {
  auth: AuthContextType;
  queryClient: QueryClient;
};

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    queryClient,
  },
  defaultPreload: 'intent',
  // // Since we're using React Query, we don't want loader calls to ever be stale
  // // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  const auth = useAuth();

  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      <Suspense>
        <TanStackRouterDevtools initialIsOpen={false} router={router} />
      </Suspense>
    </>
  );
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );
