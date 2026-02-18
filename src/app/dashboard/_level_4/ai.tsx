'use client';

import { AiMessage } from '@/types/ai';
import AiInfo from '../_level_2/aiInfo';
import { useEffect, useState } from 'react';
import { handleSendAI } from '../_level_1/aiSend';
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  Chip,
  Avatar,
  MenuItem,
  Select,
} from '@mui/material';
import { Send, SmartToy, Person, Info } from '@mui/icons-material';

const MAX_HISTORY = 8;

export default function AiAssistantPage() {
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
    content: `Hi there! I am ${AI_OPTIONS[name].label==="TicTask" ? "TicTask AI" : AI_OPTIONS[name].label}, your assistant. How can I help you?`,
  });
  const [openInfo, setOpenInfo] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([]);

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

    try {
      localStorage?.setItem(key, JSON.stringify(trimmed));
    } catch {
      // ignore localStorage errors (e.g. quota exceeded)
    }
  }, [messages, aiName]);

  return (
    <Box 
      display="flex" 
      justifyContent="center" p={{ sm: 1, md: 2, lg: 3 }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 777,
          minHeight: {  xs: '80vh', md: '90vh',},
          borderRadius: { xs: 1, sm: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          display={{ xs: 'none', sm: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          p={2}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SmartToy sx={{ color: 'var(--special)' }} />
            <Typography variant="h6" fontWeight={600}>
              AI Assistant
            </Typography>
          </Stack>
          <Chip
            label="BETA"
            variant="outlined"
            sx={{
              bgcolor: 'orange',
              color: 'var(--surface-1)',
              fontWeight: 600,
              border: 'none',
              fontFamily: 'monospace'
            }}
          />
        </Box>

        <Box p={1} display={'flex'} justifyContent={'space-between'}>
          <Select
            size="small"
            value={aiName}
            onChange={(e) => setAiName(e.target.value as keyof typeof AI_OPTIONS)}
            sx={{ minWidth: 180, m: 0.5 }}
          >
            {Object.entries(AI_OPTIONS).map(([key, ai]) => (
              <MenuItem key={key} value={key}>
                {ai.icon} {ai.label}
              </MenuItem>
            ))}
          </Select>

          <IconButton onClick={() => setOpenInfo(!openInfo)}>
            <Info />
          </IconButton>
        </Box>

        <Box flex={1} p={2} overflow="auto">
          {openInfo && 
            <Stack mb={3}>
              <AiInfo />
            </Stack>
          }
          <Stack spacing={2}>
            {messages.map((msg, idx) => (
              <Stack
                key={idx}
                direction="row"
                justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                spacing={1.5}
              >
                {msg.role === 'assistant' && (
                  <Avatar sx={{ bgcolor: 'var(--special)' }}>
                    <SmartToy fontSize="small" />
                  </Avatar>
                )}
                <Paper sx={{ p: 1.5, borderRadius: 3, maxWidth: '80%' }}>
                  <Typography variant="body2">
                    {msg.content}
                  </Typography>
                </Paper>

                {msg.role === 'user' && (
                  <Avatar sx={{ bgcolor: 'grey.500' }}>
                    <Person fontSize="small" />
                  </Avatar>
                )}
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box p={2} display="flex" gap={1}>
          <TextField
            fullWidth
            multiline
            rows={2}
            size="small"
            placeholder="Ask TicTask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              handleSendAI({ 
                messages,
                setMessages, 
                setInput, 
                input, 
                aiName 
              })
            }
          />
          <IconButton
            onClick={() =>
              handleSendAI({ 
                messages,
                setMessages, 
                setInput, 
                input, 
                aiName 
              })
            }
          >
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
