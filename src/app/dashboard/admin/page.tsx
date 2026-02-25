'use client';

import { Box } from '@mui/material';
import { useAuth } from '@/providers/auth';
import { redirect } from "next/navigation";
import AdminOverviewPage from './_level_3/console';
import AuthRedirectBtn from '@/assets/authRedirectBtn';

export default function Page() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" px={2} py={10}>
      Please <AuthRedirectBtn /> to access console. <br/><br/> If you recently logged in on this device, swipe down or refresh to restore your last session.
    </Box>
  );

  if (user?.role === "USER") {
    return redirect("/dashboard");
  }

  return (
    <Box>
      <AdminOverviewPage />
    </Box>
  );
}
