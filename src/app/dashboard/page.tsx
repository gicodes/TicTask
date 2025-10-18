'use client';

import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';

export default function Page() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) 
    return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) 
    return <Box textAlign={'center'} p={4}> Please log in to access dashboard </Box>;

  return (
    <Box p={4}>
      <Typography variant="h5">
        Welcome, {user?.name}
      </Typography>
    </Box>
  );
}
