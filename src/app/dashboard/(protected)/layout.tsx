import { Suspense } from 'react';
import type { Metadata } from 'next';
import DashboardIndex from '../_level_5/_shell';
import { ThemeProvider } from '@/providers/theme';
import { LoadingProvider } from '@/providers/loading';
import { TicketsProvider } from '@/providers/tickets';
import { AdminApolloProvider } from './admin/_level_1/graphQL';
import { NotificationsProvider } from '@/providers/notifications';

export const metadata: Metadata = {
  title: "TicTask",
  description: `
    Your Dashboard, More Than A Workspace •
    Manage your tickets & tasks with lightweight but effective tools 🧰 •
    Manage clients, teams and workflow efficiently with powerful workspaces and advanced automation 🤖
  `,
};

export default function DashboardLayout(
  { children }: Readonly<{
  children: React.ReactNode }>
) { 
  return (
    <Suspense fallback={<span />}>
      <ThemeProvider>
        <LoadingProvider>
          <AdminApolloProvider>
            <NotificationsProvider>
              <TicketsProvider>
                <DashboardIndex>
                  {children}
                </DashboardIndex>
              </TicketsProvider>
            </NotificationsProvider>
          </AdminApolloProvider>
        </LoadingProvider>
      </ThemeProvider>
    </Suspense>
  );
};
