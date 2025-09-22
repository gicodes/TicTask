// src/providers/AppWrapper.tsx
'use client';

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Header from "./header";
// import Footer from "./footer";

// import { AlertProvider } from "./alert-context";
// import { LoadingProvider } from "./loading-context";
// import { AuthProvider } from "./auth-context";
// import { UserProvider } from "./user-context";
// import { NotificationProvider } from "./notification-context";
// import { TicketProvider } from "./ticket-context";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

type AppWrapperProps = {
  children: ReactNode;
};

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <UserProvider>
              <NotificationProvider>
                <TicketProvider> */}
                  {/* Shared Layout */}
                  <Header />
                  {children}
                  {/* <Footer />
                </TicketProvider>
              </NotificationProvider>
            </UserProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider> */}
    </ThemeProvider>
  );
}
