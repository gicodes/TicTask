'use client';

import { useAuth } from '@/providers/auth';
import { Box } from '@mui/material';
import ProfileDetailDrawer from '../_level_2/profileDetail';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) 
    return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) 
    return <Box textAlign={'center'} p={4}> Please log in to access dashboard </Box>;

  return (
    <Box textAlign={'center'} minHeight={'100vh'} p={2}>
      <ProfileDetailDrawer />
    </Box>
  )
}

export default Page;