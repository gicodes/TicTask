'use client';

import { useAuth } from '@/providers/auth';
import { useEffect, useState } from 'react';
import TicketsPage from './_level_3/ticket';
import { TicketTimeTooltip } from './_level_1/tooltips';
import { Box, Divider, Tooltip, Typography } from '@mui/material';

export default function Page() {
  const { user, loading, isAuthenticated } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) 
    return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) 
    return <Box textAlign={'center'} p={4}> Please log in to access dashboard </Box>;

  return (
    <Box py={1}>
      <Box 
        p={3}
        gap={1}
        mx={'auto'}
        width={'100%'}
        alignItems={'center'}
        display={{ xs: 'grid', md: 'flex' }}
      >
        <Box display={'flex'} justifyContent={'left'} width={'100%'}>
          <Typography variant="h5" fontWeight={501}>Welcome, {user?.name}</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'right'} width={'100%'}>
          <Tooltip title={TicketTimeTooltip}>
            <Typography variant='subtitle2'>{time.toLocaleString()}</Typography>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <TicketsPage />
    </Box>
  );
}
