'use client';

import { useState } from 'react';
import { useAiChat } from '@/hooks/useAI';
import AiInfo from '../../_level_1/aiInfo';
import { usePathname } from 'next/navigation';
import AITyping from '../../_level_1/aiTyping';
import { handleSendAI } from '../../_level_1/aiSend';
import { AiChatPanelProps, AiMessage } from '@/types/ai';
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  Divider,
} from '@mui/material';
import { SmartToy, Send, Person, Info } from '@mui/icons-material';

const AI_OPTIONS = {
  tictask: { label: "TicTask", icon: "🤖" },
  skyler: { label: "Skyler", icon: "⛅️" },
  kros: { label: "Krōs", icon: "➕" },
};

export default function AiChatPanel({
  fullRender
}: AiChatPanelProps) {
  const pathname = usePathname();
  const [aiName, setAiName] = useState<keyof typeof AI_OPTIONS>("kros");
  const [input, setInput] = useState('');
  const [userTyping, setUserTyping] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const getGreeting = (name: keyof typeof AI_OPTIONS): AiMessage => ({
    role: "assistant",
    aiName: AI_OPTIONS[name].label,
    content:
      `Hi there! I am ${
        AI_OPTIONS[name].label === "TicTask"
          ? "TicTask AI"
          : AI_OPTIONS[name].label
      }, your assistant. How can I help you?`,
  });
  const greeting = getGreeting(aiName);
  const { messages, setMessages } =useAiChat(aiName, greeting);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setUserTyping(false);
    setAiTyping(true);

    await handleSendAI({
      messages,
      setMessages,
      setInput,
      input,
      aiName,
      context: {
        page: pathname
      }
    });

    setAiTyping(false);
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        background: 'transparent',
        width: fullRender ? '100%' : 'fit-content',
        minHeight: fullRender ? '100vh' : 'auto',
      }}>
      <Box display="flex" p={2} justifyContent="space-between">
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

        <IconButton onClick={() => setOpenInfo(!openInfo)}>
          <Info />
        </IconButton>
      </Box>
      <Divider />

      {openInfo && <AiInfo />}

      <Stack spacing={2} my={2} p={1}>
        {messages.map((msg, idx) => (
          <Stack
            key={idx}
            direction="row"
            justifyContent={
              msg.role === 'user'
                ? 'flex-end'
                : 'flex-start'
            }
            spacing={1.5}
          >
            {msg.role === 'assistant' && (
              <Avatar sx={{ bgcolor: 'var(--special)' }}>
                <SmartToy fontSize="small" />
              </Avatar>
            )}

            <Paper
              sx={{
                p: 1.5,
                borderRadius: 3,
                maxWidth: fullRender ? 500 : '75%',
                bgcolor:
                  msg.role === 'user'
                    ? 'white'
                    : 'background.paper',
                color:
                  msg.role === 'user'
                    ? 'black'
                    : 'text.primary',
              }}
            >
              <Typography variant="body2">
                {msg.content}
              </Typography>
            </Paper>
            {msg.role === 'user' && <Person fontSize="small" />}
          </Stack>
        ))}
        
        {aiTyping && <AITyping />}
        <Box display={'flex'} justifyContent={'end'}>
          {userTyping && <i className='px-1'>you are typing...</i>}
        </Box>
        <Box sx={{ height: 50}} />
      </Stack>

      <Paper
        sx={{
          zIndex: 1000,
          position: 'fixed',
          bottom: 50,
          borderRadius: 99,
          background: 'rgba(0,0,0,0.1)',
          width: { 
            xs: fullRender ? '100%' : 360,
            sm: fullRender ? 1000 : 360
          },
          px: 1
        }}
      >
        <Stack p={1.5} direction={'row'} gap={1}>
          <TextField
            fullWidth
            size="small"
            multiline
            maxRows={4}
            placeholder="Ask TicTask anything..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setUserTyping(e.target.value.length > 0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <IconButton onClick={sendMessage}>
            <Send />
          </IconButton>
        </Stack>
      </Paper>
    </Paper>
  );
}
