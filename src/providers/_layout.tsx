'use client';

import Header from './header';
import GlobalFooter from './footer';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Toolbar />
      {children}
      <GlobalFooter />
    </>
  );
}
