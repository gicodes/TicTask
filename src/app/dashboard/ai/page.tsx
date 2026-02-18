'use client'

import React from 'react'
import { useAuth } from '@/providers/auth';
import AiAssistantPage from '../_level_4/ai';
import { Box, Typography } from '@mui/material';
import AuthRedirectBtn from '@/assets/authRedirectBtn';

const Page = () => {
  const {loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography>Please <AuthRedirectBtn />  to access AI assistant</Typography>
    </Box>
  );
  
  return (<AiAssistantPage />)
}

export default Page;