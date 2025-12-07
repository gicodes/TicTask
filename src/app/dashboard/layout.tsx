import type { Metadata } from 'next';

import DashboardIndex from './_level_5/_shell';
import { AuthProvider } from '@/providers/auth';
import { AlertProvider } from '@/providers/alert';
import { ThemeProvider } from '@/providers/theme';
import { LoadingProvider } from '@/providers/loading';
import { TicketsProvider } from '@/providers/tickets';
import { SubscriptionProvider } from '@/providers/subscription';
import { NotificationsProvider } from '@/providers/notifications';

export const metadata: Metadata = {
  title: "TicTask",
  description: `Your Dashboard, More Than A Workspace •
    Manage your tickets & tasks with lightweight but effective tools 🧰 •
    Manage clients, teams and workflow efficiently with powerful workspaces and advanced automation 🤖
  `,
};

export default function DashboardLayout({ 
  children 
}: Readonly<{ 
  children: React.ReactNode 
}>) { 
  return (
    <ThemeProvider>
      <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <TicketsProvider>
                <NotificationsProvider>
                  <DashboardIndex>
                    {children}
                  </DashboardIndex>
                </NotificationsProvider>
              </TicketsProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};
