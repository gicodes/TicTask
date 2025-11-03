import ResetPassword from '@/components/_level_3/reset-password';
import React, { Suspense } from 'react';
import { Box } from '@mui/material';

const Page = () => {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <ResetPassword />
    </Suspense>
  )
}

export default Page