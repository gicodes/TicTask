import Header from "@/providers/header";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalFooter from "@/providers/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicTask",
  description: "A simple Ticket and Task Management System built with Next.js and TypeScript",
};

export default function RootLayout({
    children,
  }: Readonly<{children: React.ReactNode;}>
) {
  return (
    <html lang="en">
      {/* 
        ThemeProvider
        AlertProvider
        LoadingProvider
        AuthProvider + UserProvider
        NotificationProvider
        TicketProvider
      */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
