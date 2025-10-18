import type { Metadata } from 'next';
import DashboardIndex from './_shell';
import { AuthProvider } from '@/providers/auth';
import { AlertProvider } from '@/providers/alert';
import { ThemeProvider } from '@/providers/theme';
import { LoadingProvider } from '@/providers/loading';
import { TicketsProvider } from '@/providers/tickets';
import { NotificationProvider } from '@/providers/notifications';

export const metadata: Metadata = {
  title: "TicTask",
  description: "Welcome to your dashboard - manage your tickets and tasks efficiently with TicTask",
};

export default function DashboardLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AlertProvider>
            <LoadingProvider>
              <AuthProvider>
                <NotificationProvider>
                  <TicketsProvider>
                    <DashboardIndex>
                      {children}
                    </DashboardIndex>
                  </TicketsProvider>
                </NotificationProvider>
              </AuthProvider>
            </LoadingProvider>
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
