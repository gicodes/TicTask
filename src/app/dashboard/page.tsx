'use client';

import { useAuth } from '@/providers/auth';
import { useEffect, useState } from 'react';
import TicketsPage from './_level_3/ticket';
import DashboardOnboarding from './_level_0/onboardTips';
import { Box, Divider, Tooltip, Typography } from '@mui/material';

export default function Page() {
  const { user, loading, isAuthenticated } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return <Box textAlign="center" px={2} py={10}>
    Please log in to access dashboard. <br/><br/> If you recently logged in on this device, swipe down or refresh to restore your last session.
  </Box>;

  return (
    <Box py={1}>
      <DashboardOnboarding />
      <Box
        px={3}
        py={1}
        gap={1}
        mx="auto"
        width="100%"
        alignItems="center"
        display={{ xs: 'grid', md: 'flex' }}
      >
        <Box display="flex" justifyContent="left" width="100%">
          <Typography variant="h6" fontWeight={501}>Hello{user?.name ? `, ${user?.name}` : ' there...'}</Typography>
        </Box>
        <Box display="flex" justifyContent="right" width="100%">
          <Tooltip title={'Every Second Counts ⏱️'}>
            <Typography variant="subtitle2">{time.toLocaleString()}</Typography>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <TicketsPage />
    </Box>
  );
}
