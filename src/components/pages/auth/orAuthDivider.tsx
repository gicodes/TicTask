import React from 'react';
import { Stack, Divider } from '@mui/material';

export const AuthDivider = () => {
  return (
    <Stack 
      my={4}
      gap={2}
      width={'100%'} 
      display={'flex'} 
      direction={'row'}
      alignItems={'center'} 
      justifyContent={{ xs: 'space-between', md: 'space-around' }}
    >
      <Divider sx={{ minWidth: 125, bgcolor: '#999', height: 1 }} /> 
      OR 
      <Divider sx={{ minWidth: 125, bgcolor: '#999', height: 1 }} />
    </Stack>
  )
}