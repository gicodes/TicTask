'use client';

import { useAuth } from '@/providers/auth';
import { Box } from '@mui/material';

const Page = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) 
    return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) 
    return <Box textAlign={'center'} p={4}> Please log in to access dashboard </Box>;

  return (
    <Box textAlign={'center'} p={2}>{user?.name}</Box>
  )
}

export default Page