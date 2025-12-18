'use client';

import { AiMessage } from '@/types/ai';
import { useEffect, useState } from 'react';
import { handleSendAI } from '../_level_1/aiSend';
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
  Tooltip,
  MenuItem,
  Select,
} from '@mui/material';
import { 
  SmartToy, 
  Send, 
  Chat, 
  ArrowBackIosNew 
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

export default function AiAssistantDrawer() {
  const pathname = usePathname();
  const isAiPage = pathname.startsWith('/dashboard/ai');
  
  if (isAiPage) return null;

  const [open, setOpen] = useState(false);

  const AI_OPTIONS = {
    tictask: { label: "TicTask", icon: "🤖" },
    skyler: { label: "Skyler", icon: "⛅️" },
    kros: { label: "Krōs", icon: "➕" },
  };
  const [aiName, setAiName] = useState<keyof typeof AI_OPTIONS>("kros");
  const [input, setInput] = useState('');
    const getGreeting = (name: keyof typeof AI_OPTIONS): AiMessage => ({
      role: "assistant",
      aiName: AI_OPTIONS[name].label,
      content: `Hi there! I am ${AI_OPTIONS[name].label}, your AI Assistant. How can I help you?`,
    });
    const [messages, setMessages] = useState<AiMessage[]>([]);
    const MAX_HISTORY = 8;

    useEffect(() => {
      const key = `ai_chat_${aiName}`;
      const stored = localStorage.getItem(key);
  
      if (stored) {
        try {
          const parsed: AiMessage[] = JSON.parse(stored);
          setMessages(parsed.length ? parsed : [getGreeting(aiName)]);
          return;
        } catch { 
          // ignore JSON parsing errors
        }
      }
  
      setMessages([getGreeting(aiName)]);
    }, [aiName]);
  
    useEffect(() => {
      if (!messages.length) return;
  
      const key = `ai_chat_${aiName}`;
      const trimmed = messages.slice(-MAX_HISTORY);
  
      localStorage.setItem(key, JSON.stringify(trimmed));
    }, [messages, aiName]);

  const handleClose = () => setOpen(false);

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

        <Box flex={1} p={1} overflow="auto" sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'left'}>
              <Select
                size="small"
                value={aiName}
                onChange={(e) => setAiName(e.target.value as keyof typeof AI_OPTIONS)}
                sx={{ minWidth: 150 }}
              >
                {Object.entries(AI_OPTIONS).map(([key, ai]) => (
                  <MenuItem key={key} value={key}>
                    {ai.icon} {ai.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
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
          <Tooltip title='Close AI Assistant'>
            <Typography 
              component={'button'} 
              onClick={handleClose}
              sx={{ 
                bgcolor: 'transparent',
                color: 'inherit',
                border: 'none',
                pr: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ArrowBackIosNew  />
            </Typography>
          </Tooltip>
          <TextField
            fullWidth
            placeholder="Ask TicTask anything..."
            size="small"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendAI({ 
              messages,
              setMessages, 
              setInput, 
              input, 
              aiName 
            })}
          />
          <IconButton 
            color="info" 
            onClick={() => handleSendAI({ 
              messages,
              setMessages, 
              setInput,
              input, 
              aiName 
            })}
          >
            <Send />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
