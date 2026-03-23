'use client';

import { useState } from 'react';
import AiChatPanel from './aiChatPanel';
import { usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  Fab,
  Toolbar,
} from '@mui/material';
import { Chat } from '@mui/icons-material';

export default function AiAssistantDrawer() {
  const pathname = usePathname();
  const isAiPage = pathname.startsWith('/dashboard/ai');
  
  if (isAiPage) return null;

  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        aria-label="open ai assistant"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          boxShadow: 3,
        }}
      >
        <Chat fontSize='small' />
      </Fab>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 380 },
            borderBottomLeftRadius: { xs: 0, sm: 16 },
            height: { xs: '100%', sm: '90vh' },
            marginTop: { xs: 0, sm: 5 },
            boxShadow: 5,
            position: 'relative',
          },
        }}
      >
        <Toolbar sx={{ display: { xs: 'block', md: 'none'}}} />
        
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={{ xs: 1, md: 4}}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Box flex={1} overflow="auto">
            <AiChatPanel fullRender={false} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
