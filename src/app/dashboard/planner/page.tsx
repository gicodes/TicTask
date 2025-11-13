'use client'

import React from 'react'
import PlannerPage from '../_level_3/planner'
import { useAuth } from '@/providers/auth';
import { Box } from '@mui/material';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated)
    return <Box textAlign="center" p={4}>Please log in to view planner</Box>;
  
  return (<PlannerPage />)
}

export default Page