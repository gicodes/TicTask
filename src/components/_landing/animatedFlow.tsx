'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Paper,
  TextField,
  MenuItem,
} from '@mui/material';
import { 
  FLOW,
  FlowPhase, 
  ActiveTicket, 
  COLUMNS, 
  createDueDate, 
  createTicket, 
  formatDueDate, 
  getStatusText, 
  INITIAL_TICKET 
} from '@/types/demo';
import { Button } from '@/assets/buttons';
import { DEMO_TICKETS } from '../_level_1/animationData';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { TicketCardTemplate } from '@/app/resources/_level_2/ticketCardTemplate';
import { TicketListRowTemplate } from '@/app/resources/_level_2/ticketListRowTemplate';

export const WorkspaceFlowAnimation = () => {
  const [ticketIndex, 
    setTicketIndex] = useState(0);
  const [ticket, 
    setTicket] = useState<ActiveTicket>(
    createTicket(INITIAL_TICKET),
  );
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [createClicked, setCreateClicked] = useState(false);

  const demoTicket = DEMO_TICKETS[ticketIndex];

  const description = useMemo(
    () => `Quick description for ${demoTicket.title.toLowerCase()}`,
    [demoTicket.title],
  );

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const runPhase = (index: number) => {
      if (cancelled) return;

      if (index >= FLOW.length) {
        timeout = setTimeout(() => {
          if (cancelled) return;

          const nextIndex = (ticketIndex + 1) % DEMO_TICKETS.length;

          setTicketIndex(nextIndex);
          setTicket(createTicket(DEMO_TICKETS[nextIndex]));
          setTypedTitle('');
          setTypedDescription('');
          setCreateClicked(false);
          setPhase('idle');

          timeout = setTimeout(() => {
            if (!cancelled) runPhase(0);
          }, 900);
        }, 400);

        return;
      }

      const current = FLOW[index];

      setPhase(current.phase);

      if (current.phase === 'creating') setCreateClicked(true);

      if (current.phase === 'created') {
        setTicket((prev) => ({
          ...prev,
          status: 'UPCOMING',
        }));
      }

      if (current.phase === 'assigned') {
        setTicket((prev) => ({
          ...prev,
          assignee: 'You',
          dueDate: createDueDate(),
        }));
      }

      if (current.phase === 'moving-to-progress') {
        setTicket((prev) => ({
          ...prev,
          status: 'IN PROGRESS',
        }));
      }

      if (current.phase === 'moving-to-resolved') {
        setTicket((prev) => ({
          ...prev,
          status: 'RESOLVED',
        }));
      }

      timeout = setTimeout(() => {
        runPhase(index + 1);
      }, current.duration);
    };

    timeout = setTimeout(() => {
      runPhase(0);
    }, 1100);

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [ticketIndex]);

  useEffect(() => {
    if (phase !== 'filling') return;

    let cancelled = false;

    const title = demoTicket.title;
    let titleIndex = 0;
    let descriptionIndex = 0;

    const typeTitle = () => {
      if (cancelled) return;

      if (titleIndex <= title.length) {
        setTypedTitle(title.slice(0, titleIndex));
        titleIndex += 1;
        setTimeout(typeTitle, 38);
        return;
      }

      setTimeout(typeDescription, 250);
    };

    const typeDescription = () => {
      if (cancelled) return;

      if (descriptionIndex <= description.length) {
        setTypedDescription(description.slice(0, descriptionIndex));
        descriptionIndex += 1;
        setTimeout(typeDescription, 16);
      }
    };

    typeTitle();

    return () => {
      cancelled = true;
    };
  }, [phase, demoTicket.title, description]);

  const formVisible =
    phase === 'form-open' ||
    phase === 'filling' ||
    phase === 'creating';

  const ticketVisible =
    phase === 'assigned' ||
    phase === 'moving-to-progress' ||
    phase === 'in-progress' ||
    phase === 'moving-to-resolved' ||
    phase === 'resolved';

  const isMoving =
    phase === 'moving-to-progress' ||
    phase === 'moving-to-resolved';

  const renderTicket = () => {
    if (phase === 'resolved') {
      return (
        <TicketListRowTemplate
          title={ticket.title}
          priority={ticket.priority}
          status={ticket.status}
          tags={ticket.tags}
          accentColor={ticket.accent}
          assignee={
            ticket.assignee
              ? { name: ticket.assignee }
              : null
          }
          compact
        />
      );
    }

    return (
      <TicketCardTemplate
        title={ticket.title}
        priority={ticket.priority}
        tags={ticket.tags}
        accentColor={ticket.accent}
        compact
        assignee={
          ticket.assignee
            ? { name: ticket.assignee }
            : null
        }
        dueDate={ticket.dueDate ? formatDueDate(ticket.dueDate) : undefined}
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          minHeight: 750,
          mx: 'auto',
          borderRadius: { xs: 3, md: 5 },
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,.18)',
          padding: { xs: 0, md: '0 0 2rem' },
          background: 'white',
        }}
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
                background: item === 1
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
          sx={{
            px: 2,
            mt: 3,
            fontSize: {
              xs: '1.1rem',
              sm: '1.25rem',
              md: '1.5rem',
            },
          }}
        >
          From Ticket Creation To Resolution: A Seamless Workflow
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 720,
            mx: 'auto',
            mt: 3,
            py: 4,
            px: 2,
            minHeight: 500,
            overflow: 'hidden',
            border: { xs: 'none', sm: '1px solid' },
            borderColor: 'divider',
            boxShadow: { xs: 0, sm: 3},
            boxSizing: 'border-box',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            mb={3}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.disabled',
                  fontWeight: 700,
                }}
              >
                T
              </Avatar>
            </motion.div>

            <Box>
              <Typography
                variant="subtitle1"
                color="text.primary"
                fontWeight={700}
              >
                Team Workspace
              </Typography>

              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Typography
                    minHeight={200}
                    variant="caption"
                    color="text.secondary"
                  >
                    {getStatusText(phase)}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Stack>

          <AnimatePresence mode="wait">
            {formVisible && (
              <motion.div
                key="create-form"
                initial={{
                  opacity: 0,
                  x: 40,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -35,
                  scale: 0.97,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 26,
                }}
                style={{ marginBottom: 24 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.default',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    mb={2}
                  >
                    Create new ticket
                  </Typography>

                  <Stack spacing={1.75}>
                    <motion.div
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity:
                          phase === 'form-open' ? 0.55 : 1,
                      }}
                    >
                      <TextField
                        select
                        size="small"
                        label="Type"
                        value={demoTicket.type}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: phase !== 'form-open'
                              ? 'action.hover'
                              : 'transparent',
                          },
                        }}
                      >
                        <MenuItem value={demoTicket.type}>
                          {demoTicket.type}
                        </MenuItem>
                      </TextField>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity:
                          phase === 'form-open' ? 0.55 : 1,
                      }}
                    >
                      <TextField
                        select
                        size="small"
                        label="Priority"
                        value={demoTicket.priority}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: phase !== 'form-open'
                              ? 'action.hover'
                              : 'transparent',
                          },
                        }}
                      >
                        <MenuItem value={demoTicket.priority}>
                          {demoTicket.priority}
                        </MenuItem>
                      </TextField>
                    </motion.div>

                    <TextField
                      size="small"
                      label="Title"
                      value={typedTitle}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor:
                            typedTitle.length > 0
                              ? 'action.hover'
                              : 'transparent',
                        },
                      }}
                    />

                    <TextField
                      size="small"
                      label="Description"
                      value={typedDescription}
                      fullWidth
                      multiline
                      rows={2}
                      InputProps={{ readOnly: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor:
                            typedDescription.length > 0
                              ? 'action.hover'
                              : 'transparent',
                        },
                      }}
                    />

                    <TextField
                      size="small"
                      label="Due Date"
                      value={
                        phase === 'creating'
                          ? formatDueDate(createDueDate())
                          : ''
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor:
                            phase === 'creating'
                              ? 'action.hover'
                              : 'transparent',
                        },
                      }}
                    />

                    <motion.div
                      animate={ createClicked
                        ? { scale: [1, 0.96, 1], }
                        : {scale: 1, }
                      }
                      transition={{ duration: 0.35 }}
                    >
                      <Button
                        sx={{
                          maxWidth: 200,
                          opacity:
                            phase === 'form-open' ? 0.55 : 1,
                        }}
                      >
                        {phase === 'creating'
                          ? 'Creating…'
                          : 'Create'}
                      </Button>
                    </motion.div>
                  </Stack>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {ticketVisible && (
              <motion.div
                key="board"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LayoutGroup id={`ticket-board-${ticket.id}`}>
                  <Stack
                    direction="row"
                    gap={1.5}
                    sx={{ minHeight: 300 }}
                  >
                    {COLUMNS.map((columnName) => {
                      const isCurrentColumn =
                        ticket.status === columnName;

                      return (
                        <Paper
                          key={columnName}
                          variant="outlined"
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            p: 1.25,
                            borderRadius: 2,
                            bgcolor: isCurrentColumn
                              ? 'action.hover'
                              : 'transparent',
                            borderColor: isCurrentColumn
                              ? 'primary.main'
                              : 'divider',
                            transition:
                              'background 0.4s ease, border-color 0.4s ease',
                          }}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            color="text.secondary"
                            sx={{
                              mb: 1.5,
                              display: 'block',
                              letterSpacing: 0.5,
                            }}
                          >
                            {columnName}
                          </Typography>

                          <Box
                            sx={{
                              position: 'relative',
                              minHeight: 210,
                            }}
                          >
                            <AnimatePresence>
                              {isCurrentColumn && (
                                <motion.div
                                  layoutId={`ticket-${ticket.id}`}
                                  initial={{
                                    opacity: 0,
                                    scale: 0.92,
                                    y: 20,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.92,
                                  }}
                                  transition={{
                                    layout: {
                                      type: 'spring',
                                      stiffness: 240,
                                      damping: 28,
                                    },
                                    opacity: { duration: 0.25 },
                                    scale: { duration: 0.35 },
                                  }}
                                  style={{
                                    width: '100%',
                                  }}
                                >
                                  <motion.div
                                    animate={ isMoving
                                      ? { scale: [
                                          1,
                                          1.025,
                                          1,
                                        ]}
                                      : { scale: 1 }
                                    }
                                    transition={{
                                      duration: 0.65,
                                      ease: 'easeInOut',
                                    }}
                                  >
                                    {renderTicket()}
                                  </motion.div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {!isCurrentColumn && (
                              <Box
                                sx={{
                                  height: 100,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0.35,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  —
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Paper>
                      );
                    })}
                  </Stack>
                </LayoutGroup>
              </motion.div>
            )}
          </AnimatePresence>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={0.75}
            mt={3}
          >
            {[
              'form-open',
              'filling',
              'creating',
              'created',
              'assigned',
              'moving-to-progress',
              'in-progress',
              'moving-to-resolved',
              'resolved',
            ].map((phaseName) => {
              const active = phase === phaseName;

              return (
                <motion.div
                  key={phaseName}
                  animate={{
                    scale: active ? 1.35 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: active
                        ? 'primary.main'
                        : 'action.disabled',
                      transition: 'background 0.3s',
                    }}
                  />
                </motion.div>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};
