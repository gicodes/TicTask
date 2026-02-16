'use client';

import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';
import ProfileDetailDrawer from '../_level_2/profileDrawer';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Page = () => {
  const { login } = useAuthRedirect();
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign={'center'} p={4}> 
      <Typography>Please <span onClick={login} className='custom-link'>log in</span> to access profile </Typography>
    </Box>
  );

  return (
    <Box textAlign={'center'} minHeight={'100vh'} p={2}>
      <ProfileDetailDrawer />
    </Box>
  )
}

export default Page;