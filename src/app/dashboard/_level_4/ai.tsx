'use client';

import { useState } from 'react';
import { handleSendAI, Message } from '../_level_1/aiSend';
import { Send, SmartToy, Person } from '@mui/icons-material';
import { Box, Paper, Stack, Typography, TextField, IconButton, Chip, Avatar,} from '@mui/material';

export default function AiAssistantPage() { 
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "👋 Hey there! I am T, your AI Assistant. How can I help you today?" 
    },
  ]);
  const [input, setInput] = useState('');

  return (
    <Box display="flex" justifyContent="center" p={{ sm: 1, md: 2, lg: 3}}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 777,
          minHeight: { md: '77vh', xs: '80vh', },
          borderRadius: { xs: 1, sm: 2, md: 3, },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          display={{xs: 'none', sm: "flex"}}
          alignItems="center"
          justifyContent="space-between"
          p={2}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SmartToy fontSize="medium" sx={{ color: 'var(--special)'}} />
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
              p: 1.5, 
              border: 'none',
              fontFamily: 'monospace'
            }}
          />
        </Box>

        <Box
          flex={1}
          py={2}
          px={{ xs: 1, sm: 2}}
          overflow="auto"
          sx={{ scrollBehavior: 'smooth', backgroundColor: 'background.default' }}
        >
          <Stack spacing={2}>
            {messages.map((msg, idx) => (
              <Stack
                key={idx}
                direction="row"
                justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                alignItems="flex-start"
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
                    maxWidth: '80%',
                    bgcolor:
                      msg.role === 'user'
                        ? 'primary.main'
                        : 'background.paper',
                    color:
                      msg.role === 'user'
                        ? 'info.contrastText'
                        : 'text.info',
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
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

        <Box p={2} display="flex" alignItems="center" gap={1}>
          <TextField
            fullWidth
            placeholder="Ask TicTask anything..."
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendAI({ setMessages, setInput, input })}
          />
          <IconButton
            color="info"
            onClick={() => handleSendAI({ setMessages, setInput, input })}
            sx={{ borderRadius: 2 }}
          >
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
