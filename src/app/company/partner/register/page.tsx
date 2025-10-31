import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import PartnerJoinPage from './ui';

const Page = () => {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <PartnerJoinPage />
    </Suspense>
  )
}

export default Page