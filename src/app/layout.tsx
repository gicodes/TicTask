import "./globals.css";
import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import { AlertProvider } from "@/providers/alert";
import ThemeRegistry from '@/emotion/ThemeRegistry';
import ConditionalLayout from "@/providers/_layout";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/providers/auth";
import AppProviders from "@/providers/clientProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicTask",
  description: "A simple Ticket and Task Management System built with Next.js and TypeScript",
};

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <AuthProvider>
            <CssBaseline />
            <AlertProvider>
              <ConditionalLayout>
                <AppProviders>
                  {children}
                </AppProviders>
              </ConditionalLayout>
            </AlertProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}