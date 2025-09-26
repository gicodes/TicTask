'use client';

import { AuthProvider } from '@/providers/auth';
import { AlertProvider } from '@/providers/alert';
import { ThemeProvider } from '@/providers/theme';
import { LoadingProvider } from '@/providers/loading';
import { TicketsProvider } from '@/providers/tickets';
import { NotificationProvider } from '@/providers/notifications';

export default function DashboardLayout(
  { children }: { 
    children: React.ReactNode 
  }) {
  return (
    <ThemeProvider>
      <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <NotificationProvider>
              <TicketsProvider>
                {children}
              </TicketsProvider>
            </NotificationProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
