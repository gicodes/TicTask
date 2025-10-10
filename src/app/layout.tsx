import "./globals.css";
import type { Metadata } from "next";
import Header from "@/providers/header";
import GlobalFooter from "@/providers/footer";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/providers/emotionCache";
import { Toolbar } from "@mui/material";
import { AlertProvider } from "@/providers/alert";

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
         <ThemeRegistry>
          <AlertProvider>
            <Header />
            <Toolbar />
            {children}
            <GlobalFooter />
          </AlertProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
