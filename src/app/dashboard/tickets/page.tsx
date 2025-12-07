'use client';

import { Box, Typography, Tooltip, Divider } from '@mui/material';
import DashboardOnboarding from '../_level_0/onboardTips';
import React, { useEffect, useState } from 'react'
import TicketsPage from '../_level_3/ticket';
import { useAuth } from '@/providers/auth';

const Page = () => {
  const [time, setTime] = useState(new Date());
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Box textAlign="center" p={4}>Loading Tickets View...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" px={2} py={10}>
      Please log in to access dashboard. <br/><br/> If you recently logged in on this device, swipe down or refresh to restore your last session.
    </Box>
  );
  
  return (
    <Box py={1}>
      <DashboardOnboarding />
      <Box
        px={3}
        py={1}
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
  )
}

export default Page;
