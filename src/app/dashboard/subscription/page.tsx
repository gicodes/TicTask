'use client'

import { Box, Link, Typography } from '@mui/material';
import { useAuth } from '@/providers/auth';
import SubscriptionPage from '../_level_3/subscription'

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography> Please <Link href={'/auth/login'} className='custom-link'>log in</Link> to view subscription </Typography>
    </Box>
  );
  
  return (<SubscriptionPage />)
}

export default Page;