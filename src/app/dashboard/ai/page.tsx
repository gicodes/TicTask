'use client'

import React from 'react'
import { useAuth } from '@/providers/auth';
import AiAssistantPage from '../_level_4/ai';
import { Box, Typography } from '@mui/material';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Page = () => {
  const { login } = useAuthRedirect();
  const {loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography>Please <span onClick={login} className='custom-link'>log in</span> to access AI assistant</Typography>
    </Box>
  );
  
  return (<AiAssistantPage />)
}

export default Page;