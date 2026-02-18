'use client'

import React from 'react';
import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';
import ReferPage from '../_level_3/refer&invites';
import AuthRedirectBtn from '@/assets/authRedirectBtn';

const Page = () => {  
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography> Please <AuthRedirectBtn />  to view invite page</Typography>
    </Box>
  );
  
  return (<ReferPage />)
}

export default Page;
