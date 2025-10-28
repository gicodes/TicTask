import { DocSection, GenericHeader } from '@/app/resources/_level_3/docsTemplate'
import { CONTENTS_DEV, TABLE_OF_CONTENTS_DEV } from '@/constants/docs'
import { Box, Stack, Typography } from '@mui/material'
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'TicTask Developer Documentation',
  description: 'Technical documentation for TicTask developers: APIs, Auth, Architecture, and more.',
};

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
          pl={3}
          maxWidth={1000}
        >
          <Typography variant='h4' fontWeight={600} mb={3}>Table Of Content</Typography>
          <ul>
            { TABLE_OF_CONTENTS_DEV.map((t, i) => 
              <li key={i}>
                <Typography 
                  sx={{ maxWidth: 'max-content', p: 1, borderRadius: 1, 
                  ":hover": { bgcolor: 'var(--background)', color: 'var(--foreground)'}}}
                >
                  <Link href={`#${t.replace(/\s+/g, '-').toLowerCase()}`}>{t}</Link>
                </Typography>   
              </li>
            )}
          </ul>
        </Stack>
      </Box>
      <Stack maxWidth={1000} mx='auto' px={2} py={5} spacing={5}>
        {Object.entries(CONTENTS_DEV).map(([title, blocks]) => (
          <DocSection key={title} title={title} blocks={blocks} />
        ))}
      </Stack>
    </Box>
  )
}

export default Page
