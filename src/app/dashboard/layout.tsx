import type { Metadata } from 'next';
import DashboardIndex from './_level_5/_shell';
import { AuthProvider } from '@/providers/auth';
import { AlertProvider } from '@/providers/alert';
import { ThemeProvider } from '@/providers/theme';
import { LoadingProvider } from '@/providers/loading';
import { TicketsProvider } from '@/providers/tickets';
import { NotificationProvider } from '@/providers/notifications';
import { SubscriptionProvider } from '@/providers/subscription';

export const metadata: Metadata = {
  title: "TicTask",
  description: "Welcome to your dashboard - manage your tickets and tasks efficiently with TicTask",
};

export default function DashboardLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) { 
  return (
    <ThemeProvider>
      <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <NotificationProvider>
                <TicketsProvider>
                  <DashboardIndex>
                    {children}
                  </DashboardIndex>
                </TicketsProvider>
              </NotificationProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};
