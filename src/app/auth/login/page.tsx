import { Login } from '@/components/_level_3/login';
import { Box } from '@mui/material';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <Login roleParam={"USER"} />
    </Suspense>
  )
}
