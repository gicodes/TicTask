'use client';

import NotificationsDrawer from '../_level_2/notificationDrawer';
import { useAuth } from '@/providers/auth';
import { Box, Link, Typography } from '@mui/material';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign={'center'} p={4}> 
      <Typography> Please <Link href={'/auth/login'} className='custom-link'>log in</Link> to access notifications </Typography>
    </Box>
  );

  return (
    <Box textAlign={'center'} minHeight={'100vh'} p={2}>
      <NotificationsDrawer />
    </Box>
  )
}

export default Page;