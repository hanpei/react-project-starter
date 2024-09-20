import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/sonner';
import { ConfirmDialog } from '@/components/confirm-dialog/confirm-dialog';
import { AuthProvider } from '@/features/auth/auth-provider';
import { ThemeProvider } from '@/features/theme/theme-provider';
import { UserProvider } from '../auth/user-provider';
import { queryClient } from './react-query';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>
        <ConfirmDialog />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
