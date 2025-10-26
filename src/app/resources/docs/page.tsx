import { DocSection, GenericHeader } from '@/app/resources/_level_3/docs'
import { CONTENTS, TABLE_OF_CONTENTS } from '@/constants/docs';
import { Box, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: "TicTask",
  description: 'TicTask Documentation — Learn how to use TicTask quickly and effectively.',
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
          px={1}
          pl={3}
          spacing={5}
          maxWidth={1000}
        >
          <Typography variant='h4' fontWeight={600}>Table Of Content</Typography>
          <ul>
            {TABLE_OF_CONTENTS.map((t, i) => 
              <li key={i} style={{ paddingBottom: '1rem'}}>
                <Link href={`#${t.replace(/\s+/g, '-').toLowerCase()}`}>{t}</Link>   
              </li>
            )}
          </ul>
        </Stack>
      </Box>
      <Stack maxWidth={1000} mx='auto' px={2} spacing={2}>
        { Object.entries(CONTENTS).map(([title, blocks]) => (
          <DocSection key={title} title={title} blocks={blocks} />
        ))}
      </Stack>
    </Box>
  )
}

export default Page
