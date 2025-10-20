'use client';

import { useAuth } from '@/providers/auth';
import TicketsBoardPage from './_level_3/ticket';
import { Box, Divider, Stack, Typography } from '@mui/material';

export default function Page() {
  const { user, loading, isAuthenticated } = useAuth();
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
        <Typography variant='subtitle2'>{new Date().toLocaleString()}</Typography>
      </Stack>
      
      <Divider />
      <TicketsBoardPage />
    </Box>
  );
}
