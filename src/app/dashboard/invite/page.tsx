'use client'

import React from 'react';
import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';
import ReferPage from '../_level_3/refer&invites';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Page = () => {  
  const { login } = useAuthRedirect();
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography> Please <span onClick={login} className='custom-link'>log in</span> to view invite page</Typography>
    </Box>
  );
  
  return (<ReferPage />)
}

export default Page;
