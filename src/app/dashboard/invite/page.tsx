'use client'

import React from 'react';
import { Box } from '@mui/material';
import { useAuth } from '@/providers/auth';
import ReferPage from '../_level_3/refer&invites';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) 
    return <Box textAlign="center" p={4}>Loading...</Box>;
  if (!isAuthenticated) 
    return <Box textAlign="center" p={4}>Please log in to view invite page</Box>;
  
  return (<ReferPage />)
}

export default Page;
