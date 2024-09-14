import { ModeToggle } from '@/features/theme/mode-toggle';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <header className="flex items-center justify-between p-4">
        <h1>Logo</h1>
        <ModeToggle />
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};
