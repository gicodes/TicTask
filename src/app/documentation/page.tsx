'use client';

import { GenericHeader } from '@/components/_level_2/documentations'
import { TABLE_OF_CONTENTS } from '@/constants/docs';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <Box>
      <GenericHeader />
      <Box
        py={15}
        px={1.5}
        color={'var(--background)'}
        bgcolor={'var(--foreground)'}
      >
        <Stack 
          mx={'auto'}
          spacing={5}
          maxWidth={1000}
        >
          <Typography variant='h4'>Table Of Content</Typography>
          <ol>
            {TABLE_OF_CONTENTS.map((t, i) => 
              <li key={i} style={{ paddingLeft: '2rem', paddingBottom: '1rem'}}>
                <Link href={`#${i+1}`}>{t}</Link>
              </li>
            )}
          </ol>
        </Stack>
      </Box>
    </Box>
  )
}

export default Page