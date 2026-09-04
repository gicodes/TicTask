'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Stack, Typography, Avatar, Paper } from '@mui/material';
import { TicketListRowTemplate } from '@/app/resources/_level_2/ricketListRowTemplate';
import { TicketCardTemplate } from '@/app/resources/_level_2/ticketCardTemplate';

const DEMO_TICKETS = [
  {
    id: 1,
    title: 'Fix login redirect on mobile',
    priority: 'HIGH',
    type: 'BUG',
    status: 'OPEN',
    tags: ['auth', 'mobile'],
    accent: '#ef4444',
  },
  {
    id: 2,
    title: 'Add dark mode toggle',
    priority: 'MEDIUM',
    type: 'FEATURE',
    status: 'OPEN',
    tags: ['ui', 'theme'],
    accent: '#8b5cf6',
  },
  {
    id: 3,
    title: 'Q3 revenue report',
    priority: 'LOW',
    type: 'TASK',
    status: 'OPEN',
    tags: ['finance'],
    accent: '#10b981',
  },
];

const COLUMNS = ['UPCOMING', 'IN PROGRESS', 'RESOLVED'];

export const WorkspaceFlowAnimation = () => {
  const [step, setStep] = useState(0);
  const [activeTicket, setActiveTicket] = useState(0);
  const [column, setColumn] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),          
      setTimeout(() => setStep(2), 2800),       
      setTimeout(() => { setColumn(1); setStep(3); }, 4200), 
      setTimeout(() => { setColumn(2); setStep(4); }, 6200),
      setTimeout(() => {
        setStep(0);
        setColumn(0);
        setActiveTicket((prev) => (prev + 1) % DEMO_TICKETS.length);
      }, 8500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [activeTicket]);

  const ticket = DEMO_TICKETS[activeTicket];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.15,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1180,
          mx: 'auto',
          borderRadius: {
            xs: 3,
            md: 5,
          },
          overflow: 'hidden',
          boxShadow:
            '0 40px 100px rgba(0,0,0,.18)',
          padding: { xs: 0, md: "0 0 2rem"},
          background: 'white',
        }}
        gap={3}
        display="flex"
        flexDirection="column"
      >
        <Box
          sx={{
            height: 42,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: '#181818',
          }}
        >
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background:
                  item === 1
                    ? '#ff5f57'
                    : item === 2
                      ? '#febc2e'
                      : '#28c840',
              }}
            />
          ))}
      </Box>
        
      <Typography 
        variant="h6" 
        color="text.primary" 
        fontWeight={700} 
        textAlign="center"
        sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
      >
        From Ticket Creation To Resolution: A Seamless Workflow
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 720,
          mx: 'auto',
          py: 4,
          px: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          // bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.disabled', fontWeight: 700 }}>
              T
            </Avatar>
          </motion.div>
          <Box>
            <Typography variant="subtitle1" color="text.primary" fontWeight={700}>
              Team Workspace
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {step === 0 && 'Waiting for activity…'}
              {step === 1 && 'New ticket created'}
              {step === 2 && 'Ticket assigned to you'}
              {step === 3 && 'Moved to In Progress'}
              {step === 4 && 'Marked as RESOLVED ✨'}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={1.5} sx={{ minHeight: 260 }}>
          {COLUMNS.map((col, idx) => (
            <Paper
              key={col}
              variant="outlined"
              sx={{
                flex: 1,
                p: 1.25,
                borderRadius: 2,
                bgcolor: idx === column ? 'action.hover' : 'transparent',
                transition: 'background 0.4s ease',
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1.5, display: 'block', letterSpacing: 0.5 }}
              >
                {col}
              </Typography>

              <AnimatePresence mode="wait">
                {idx === column && (
                  <motion.div
                    key={`${ticket.id}-${column}`}
                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  >
                    {step < 3 ? (
                      <TicketCardTemplate
                        title={ticket.title}
                        priority={ticket.priority}
                        tags={ticket.tags}
                        accentColor={ticket.accent}
                        compact
                        assignee={step >= 2 ? { name: 'You' } : null}
                        dueDate={step >= 3 ? new Date().toISOString() : undefined}
                      />
                    ) : (
                      <TicketListRowTemplate
                        title={ticket.title}
                        priority={ticket.priority}
                        status={column === 2 ? 'RESOLVED' : 'IN PROGRESS'}
                        tags={ticket.tags}
                        accentColor={ticket.accent}
                        assignee={{ name: 'You' }}
                        compact
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          ))}
        </Stack>

        <Stack direction="row" justifyContent="center" gap={0.75} mt={3}>
          {[0, 1, 2, 3, 4].map((s) => (
            <Box
              key={s}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: step === s ? 'primary.main' : 'action.disabled',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
    </motion.div>
  );
};