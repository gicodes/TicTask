'use client';

import { useAuth } from '@/providers/auth';
import { useEffect, useState } from 'react';
import TicketsBoardPage from './_level_3/ticket';
import { Box, Divider, Stack, Typography } from '@mui/material';

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
      <Stack 
        p={3}
        gap={1}
        flexWrap={'wrap'}
        direction={'row'} 
        alignItems={'center'}
        justifyContent={'space-between'}
        display={{xs: 'grid', md: 'flex'}}
      >
        <Typography variant="h5" fontWeight={501}>
          Welcome, {user?.name}
        </Typography>
        <Typography variant='subtitle2'>{time.toLocaleString()}</Typography>
      </Stack>
      
      <Divider />
      <TicketsBoardPage />
    </Box>
  );
}
