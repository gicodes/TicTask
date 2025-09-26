import "./globals.css";
import type { Metadata } from "next";
import Header from "@/providers/header";
import EmotionProvider from "@/lib/emotion";
import GlobalFooter from "@/providers/footer";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicTask",
  description: "A simple Ticket and Task Management System built with Next.js and TypeScript",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EmotionProvider>
          <Header />
          {children}
          <GlobalFooter />
        </EmotionProvider>
      </body>
    </html>
  );
}
