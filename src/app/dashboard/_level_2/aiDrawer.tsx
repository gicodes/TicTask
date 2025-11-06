'use client';

import { useState } from 'react';
import { handleSendAI, Message } from '../_level_1/aiSend';
import {
  Box,
  Drawer,
  Fab,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  Chip,
  Avatar,
  Toolbar,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { SmartToy, Send, Chat} from '@mui/icons-material';

export default function AiAssistantDrawer() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message []>([
    { role: 'assistant', content: "👋  Hey there, I'm your AI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const pathname = usePathname();
  const isAiPage = pathname.startsWith('/dashboard/ai');

  if (isAiPage) return null;

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
          bgcolor: 'var(--secondary)',
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
            borderTopLeftRadius: { xs: 0, sm: 12 },
            borderBottomLeftRadius: { xs: 0, sm: 12 },
            height: { xs: '100%', sm: '90vh' },
            marginTop: { xs: 0, sm: 5 },
            boxShadow: 5,
          },
        }}
      >
        <Toolbar sx={{ display: { xs: 'block', md: 'none'}}} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={{ xs: 1, md: 4}}
          p={2}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <SmartToy sx={{ color: 'var(--special)'}} />
            <Typography fontWeight={600}>AI Assistant</Typography>
          </Stack>
          <Chip label="BETA" size="small" variant="outlined" sx={{ fontWeight: 600, bgcolor: 'orange', color: 'var(--surface-1)', p: 1.5}} />
        </Box>

        <Box flex={1} p={2} overflow="auto" sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            {messages.map((msg, idx) => (
              <Stack
                key={idx}
                direction="row"
                justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                spacing={1.5}
              >
                {msg.role === 'assistant' && (
                  <Avatar sx={{ bgcolor: 'var(--special)', width: 28, height: 28 }}>
                    <SmartToy fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    maxWidth: '80%',
                    bgcolor:
                      msg.role === 'user'
                        ? 'info.main'
                        : 'background.paper',
                    color:
                      msg.role === 'user'
                        ? 'primary.contrastText'
                        : 'text.primary',
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box
          p={2}
          display="flex"
          alignItems="center"
          gap={1}
          borderTop="1px solid"
          borderColor="divider"
        >
          <button style={{ background: 'transparent', border: 'none', padding: 2}} onClick={() => setOpen(!open)}>← </button>
          <TextField
            fullWidth
            placeholder="Ask TicTask anything..."
            size="small"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendAI({ setMessages, setInput, input })}
          />
          <IconButton color="info" onClick={() => handleSendAI({ setMessages, setInput, input })}>
            <Send />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
