import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const Logo = () => {
  const Txt = 
    <>
      <span className=''>Tic</span>
      <span className='custom-dull'>Task</span>
    </>

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        <Link href="/">{Txt}</Link>
      </Typography>
    </Box>
    
  )
}

export default Logo