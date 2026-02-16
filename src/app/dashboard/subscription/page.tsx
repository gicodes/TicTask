'use client'

import { Box, Typography } from '@mui/material';
import { useAuth } from '@/providers/auth';
import SubscriptionPage from '../_level_3/subscription'
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Page = () => {
  const { login } = useAuthRedirect();
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography> Please <span onClick={login} className='custom-link'>log in</span> to view subscription </Typography>
    </Box>
  );
  
  return (<SubscriptionPage />)
}

export default Page;