'use client';

import { useAuth } from '@/providers/auth';
import { Box, Link, Typography } from '@mui/material';
import ProfileDetailDrawer from '../_level_2/profileDrawer';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign={'center'} p={4}> 
      <Typography>Please <Link href={'/auth/login'} className='custom-link'>log in</Link> to access profile </Typography>
    </Box>
  );

  return (
    <Box textAlign={'center'} minHeight={'100vh'} p={2}>
      <ProfileDetailDrawer />
    </Box>
  )
}

export default Page;