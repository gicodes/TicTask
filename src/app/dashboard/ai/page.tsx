'use client'

import React from 'react'
import { Box } from '@mui/material';
import { useAuth } from '@/providers/auth';
import AiAssistantPage from '../_level_4/ai';

const Page = () => {
  const {loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated)
    return <Box textAlign="center" p={4}>Please log in to access AI assistant</Box>;
  
  return (<AiAssistantPage />)
}

export default Page