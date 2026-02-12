'use client'

import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useAuth } from '@/providers/auth';
import ReferPage from '../_level_3/refer&invites';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography> Please <Link href={'/auth/login'} className='custom-link'>log in</Link> to view invite page</Typography>
    </Box>
  );
  
  return (<ReferPage />)
}

export default Page;
