'use client'

import React from 'react'
import TeamPage from '../_level_4/team'
import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Page = () => {
  const { login } = useAuthRedirect();
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign={'center'} p={4}> 
      <Typography>Please <span onClick={login} className='custom-link'>log in</span> to access Teams </Typography>
    </Box>
  );

  if (isAuthenticated && (user?.role==="USER" && user.data?.approved===false)) return (
    <Box textAlign={'center'} p={4}> Teams unavailable right now!</Box>
  )
  
  return (
    <TeamPage />
  )
}

export default Page