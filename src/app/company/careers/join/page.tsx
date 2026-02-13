import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import CareerRegistrationPage from './ui';

const Page = () => {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <CareerRegistrationPage />
    </Suspense>
  )
}

export default Page