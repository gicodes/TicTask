'use client'

import SubscriptionPage from '../_level_3/subscription';
import AuthRedirectBtn from '@/assets/authRedirectBtn';
import { Box, Typography } from '@mui/material';
import { useAuth } from '@/providers/auth';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography> Please <AuthRedirectBtn />  to view subscription </Typography>
    </Box>
  );
  
  return (<SubscriptionPage />)
}

export default Page;