'use client';

import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import NotificationsDrawer from '../_level_2/notificationDrawer';

const Page = () => {
  const { login } = useAuthRedirect();
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign={'center'} p={4}> 
      <Typography> Please <span onClick={login} className='custom-link'>log in</span> to access notifications </Typography>
    </Box>
  );

  return (
    <Box textAlign={'center'} minHeight={'100vh'} p={2}>
      <NotificationsDrawer />
    </Box>
  )
}

export default Page;