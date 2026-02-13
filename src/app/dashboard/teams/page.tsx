'use client'

import React from 'react'
import Link from 'next/link';
import TeamPage from '../_level_4/team'
import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';

const Page = () => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign={'center'} p={4}> 
      <Typography>Please <Link href={'/auth/login'} className='custom-link'>log in</Link> to access Teams </Typography>
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