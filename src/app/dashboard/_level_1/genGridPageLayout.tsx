import { Box, Stack } from '@mui/material';
import React from 'react';

interface GGPLProps {
  children: React.ReactNode
}

const GenericGridPageLayout = ({ children }: GGPLProps) => {
  return (
    <Box>
      <Stack 
        py={{ xs: 4, md: 5 }}
        px={{ xs: 1, sm: 2, md: 3}}
        mx="auto"
        spacing={4} 
        maxWidth="900px"
      >
        {children}
      </Stack>
    </Box>
  )
}

export default GenericGridPageLayout