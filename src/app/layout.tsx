import './globals.css';


import type { Metadata } from "next";
import QueryProvider from "@/providers/query";
import StripeProvider from "@/providers/stripe";
import { AuthProvider } from "@/providers/auth";
import { AlertProvider } from "@/providers/alert";
import ConditionalLayout from "@/providers/_layout";
import { Geist, Geist_Mono } from "next/font/google";
import { SubscriptionProvider } from '@/providers/subscription';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicTask",
  description: "A simple Ticket and Task Management System built with Next.js and TypeScript",
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <QueryProvider>
            <StripeProvider>
              <AuthProvider>
                <AlertProvider>
                  <SubscriptionProvider>
                    <ConditionalLayout>
                      {children}
                    </ConditionalLayout>
                  </SubscriptionProvider>
                </AlertProvider>
              </AuthProvider>
            </StripeProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
