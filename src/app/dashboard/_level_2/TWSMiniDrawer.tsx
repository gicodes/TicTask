'use client';

import { User } from '@/types/users';
import TWSExtDrawer from './TWSExtDrawer';
import { useForm } from 'react-hook-form';
import { Button } from '@/assets/buttons';
import { QA_Btn } from '@/assets/QA_button';
import { useAuth } from '@/providers/auth';
import { FaEllipsisV } from 'react-icons/fa';
import { useTickets } from '@/providers/tickets';
import React, { useEffect, useState } from 'react';
import { extractTicketData } from '../_level_1/tFieldExtract';
import { TICTASK_QUICK_ACTIONS } from '../_level_0/constants';
import { getTypeColor, priorityColor } from '../_level_1/tColorVariants';
import { TICKET_WORKSPACE_PROPS, TICKET_TYPE_ICONS } from '../_level_1/tSchema';
import {
  Box,
  Drawer,
  Toolbar,
  Stack,
  Typography,
  Chip,
  IconButton,
  Card,
  TextField,
  Divider,
  Tooltip,
} from '@mui/material';
import { ArrowBack, CloseSharp } from '@mui/icons-material';
import { Download, Share2, TicketCheck } from 'lucide-react';

interface FormValues { dueDate: string; }

export default function TicketDetailDrawer({
  open,
  onClose,
  onUpdate,
  ticketId,
}: TICKET_WORKSPACE_PROPS) {

  const { user } = useAuth();
  const { selectedTicket: ticket, selectTicket, updateTicket } = useTickets();
  const { reset } = useForm<FormValues>({ defaultValues: { dueDate: '' } });
  const [assignee, setAssignee] = useState<number | null>();
  const [extDrawerOpen, setExtDrawerOpen] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    selectTicket(ticketId ?? null);
  }, [ticketId, selectTicket]);

  useEffect(() => {
    if (ticket) {
      reset({ dueDate: ticket.dueDate ? new Date(ticket.dueDate).toISOString().slice(0, 16) : '' });
    }
  }, [ticket, reset]);

  const save = async () => {
    try {
      setIsSubmitting(true);
      if (!ticket) return;

      await updateTicket(Number(ticket.id), {...(assignee && { assignedToId: assignee })});
      setIsSubmitting(false);

      onUpdate?.();
      setAssignee(null);
      onClose();
    } catch {
      console.warn("Failed to update ticket at Mini-workspace");
      setIsSubmitting(false);
    }
  };

  const toggleMoreOptions = () => setMoreOptions(!moreOptions);

  const handleSavePDF = () => {
    if (!ticket) return;
    window.print();
  };

  const handleShare = async () => {
    if (!ticket) return;
    const shareUrl = `${window.location.origin}/tickets/${ticket.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: ticket.title, text: 'Check out this ticket:', url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!ticket) return null;

  const fields = extractTicketData(ticket);
  const statusRender = ticket.status === 'IN_PROGRESS' ? 'IN PROGRESS' : ticket.status;
  const isBusinessOrTeam = user?.userType === 'BUSINESS';
  const isActive = !['CANCELLED', 'RESOLVED', 'CLOSED'].includes(ticket.status);
  const isTeamAdmin = !!(user as User).teamMemberships && !!(user as User).createdTeams;
  
  const TypeIcon = TICKET_TYPE_ICONS[ticket.type as keyof typeof TICKET_TYPE_ICONS] ?? <TicketCheck />;

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 500, lg: 555 } } }}
      >
        <Toolbar />
        <Box display="grid" gap={2}>
          <Card sx={{ borderRadius: 0, px: 1 }}>
            <Stack direction="row" alignItems="center" minHeight={64}>
              <Tooltip title="More Options">
                <IconButton onClick={toggleMoreOptions}>
                  {!moreOptions ? <FaEllipsisV size={20} /> : <CloseSharp sx={{ fontSize: 20 }} />}
                </IconButton>
              </Tooltip>
              {moreOptions && (
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Save as PDF / Print">
                      <IconButton onClick={handleSavePDF}>
                        <Download size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share Ticket">
                      <IconButton onClick={handleShare}>
                        <Share2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Toolbar>
              )}
              <Box display="flex" width="100%" justifyContent="end" pr={1}>
                <Typography variant="caption" sx={{ opacity: 0.75 }}>
                  {(user as User).data?.workSpaceName || user?.name.split(' ')[0]}&apos;s mini - workspace
                </Typography>
              </Box>
            </Stack>
          </Card>

          <Box px={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="start">
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Updated {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : ''}
              </Typography>
              <Box pb={1} gap={0.5} maxWidth={120} display="grid" justifyContent="center">
                <Typography 
                  display={'flex'} 
                  gap={0.5}
                  alignItems={'center'}
                  justifyContent={'center'} 
                  variant="body1" 
                  sx={{ color: getTypeColor(ticket.type) }}
                >
                  <TypeIcon size={16} />
                    <strong>{ticket.type === 'FEATURE_REQUEST' ? 'FEATURE' : ticket.type}</strong>
                </Typography>
                <Tooltip title={`Ticket ${statusRender.toLowerCase()}`}>
                  <Chip label={statusRender} size="small" sx={{ px: 1, maxWidth: 'max-content', mx: 'auto' }} />
                </Tooltip>
              </Box>
            </Stack>
            <Typography variant="h6">{ticket.title}</Typography>
            <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-wrap', my: 1, opacity: 0.75 }}>
              {ticket.description}
            </Typography>

            <Stack spacing={1} sx={{ px: 1, pb: 2 }}>
              <Typography variant="caption" sx={{ opacity: 0.5 }}>
                <span>Created</span>{' '}
                {ticket.createdById && (
                  <>
                    by{' '}
                    {ticket.createdById === user?.id ? (
                      <strong className="custom-sharp">you</strong>
                    ) : (
                      <span className="custom-warm">{ticket.createdById}</span>
                    )}
                    .
                  </>
                )}
                <br /> On {ticket.createdAt ? new Date(ticket.createdAt).toDateString() + `, 
                  ${new Date(ticket.createdAt).toLocaleTimeString()}` : ''}
              </Typography>

              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                {ticket.assignedToId && (
                  <span>
                    <span>Assigned to</span> {ticket.assignedToId === user?.id 
                    ? <strong className="custom-sharp">you</strong>
                    : <span className="custom-warm">{ticket.assignedToId}</span>}.
                  </span>
                )}
                {ticket.assignedTo && (
                  <span>
                    <br /> <span>&</span> {ticket.assignedToId}.
                  </span>
                )}
              </Typography>

              <Stack direction="row" alignItems="center" width="100%" justifyContent="space-between">
                <Box display="flex" gap={1} flexWrap="wrap">
                  {ticket.tags?.map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" />
                  ))}
                </Box>
                <Box display="flex" justifyContent="end">
                  {ticket.priority && (
                    <Stack gap={0.5}>
                      <Typography fontSize={11} color="text.secondary" textAlign="center">
                        Priority
                      </Typography>
                      <Chip
                        size="medium"
                        label={ticket.priority}
                        sx={{ bgcolor: priorityColor(ticket.priority ?? 'LOW'), color: '#fff', fontWeight: 600 }}
                      />
                    </Stack>
                  )}
                </Box>
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap={1} pb={1} pt={2}>
                {'severity' in fields && fields.severity && 
                  <Chip label={`Severity: ${fields.severity}`} size="small" />}
                {'impact' in fields && fields.impact && 
                  <Chip label={`Impact: ${fields.impact}`} size="small" />}
                {'amount' in fields && fields.amount > 0 && 
                  <Chip size="small" color="success" variant="outlined"
                    label={`${fields.amount.toLocaleString("en-US", 
                      {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${fields.currency || "USD"}`}
                  />
                }
                {'extClient' in fields && fields.extClient &&
                  <Chip label={`${fields.extClient}`} size="small" color="info"/>}
                {'estimatedTimeHours' in fields && fields.estimatedTimeHours && 
                  <Chip label={`${fields.estimatedTimeHours}h est.`} size="small" />}
                {'subtasks' in fields && fields.subtasks?.length && fields.subtasks.length > 0 ? (
                  <Chip label={`${fields.subtasks.length} subtasks`} size="small" /> ): ''}
                {'checklist' in fields && fields.checklist?.length && fields.checklist.length > 0 ? (
                  <Chip label={`${fields.checklist.length} checklist items`} size="small" /> ): ''}
                {'attendees' in fields && fields.attendees?.length && fields.attendees.length > 0 ? (
                  <Chip label={`${fields.attendees.length} attendees`} size="small" /> ): ''}
                {'attachments' in fields && fields.attachments?.length && fields.attachments.length > 0 ? (
                  <Chip label={`${fields.attachments.length} attachments`} size="small" /> ): ''}
                {'steps' in fields && fields.steps && 
                  <><Chip label="Steps provided: " size="small" />{fields.steps}</>}
                {'recurrence' in fields && fields.recurrence && 
                  <Chip label={`Recurs: ${fields.recurrence}`} size="small" />}
                {'location' in fields && fields.location && 
                  <Chip label={`Location: ${fields.location}`} size="small" />}
                {('startTime' in fields || 'endTime' in fields) && 
                  <Stack direction={'row'} flexWrap="wrap" gap={1} width={'100%'} justifyContent={'end'} py={2}>
                    {'startTime' in fields && fields.startTime && <Stack gap={0.75}>
                      <Chip size="small" variant='outlined' label={`Start: ${new Date(fields.startTime).toLocaleTimeString()}`} />
                      <Chip size='small' label={new Date(fields.startTime).toDateString()} />
                    </Stack>}
                    {'endTime' in fields && fields.endTime && <Stack gap={0.75}>
                      <Chip size="small" variant='outlined' label={`End: ${new Date(fields.endTime).toLocaleTimeString()}`} />
                      <Chip size='small' label={new Date(fields.endTime).toDateString()} />
                    </Stack>}
                  </Stack>
                }
              </Stack>

              <Button 
                onClick={() => setExtDrawerOpen(true)} 
                tone="secondary" 
                sx={{ margin: '20px 0 0' }}
              >
                View Details & Activities
              </Button>
            </Stack>

            <Card
              sx={{
                p: { xs: 1, sm: 1.5 },
                mb: 3,
                mx: 'auto',
                boxShadow: 4,
                borderRadius: 999,
                maxWidth: 'fit-content',
                background: 'transparent',
              }}
            >
              <Stack 
                direction="row" 
                justifyContent="center" 
                gap={{ xs: 1, sm: 2, md: 3 }} 
                maxWidth={{ xs: 282, sm: 'none' }}
              >
                {TICTASK_QUICK_ACTIONS.map((qa, i) => (
                  <QA_Btn
                    key={i}
                    color={qa.color}
                    title={qa.title}
                    ticketID={ticket.id}
                    status={qa.status}
                    disabled={!isActive}
                    onUpdate={onUpdate!}
                    onClose={onClose}
                  />
                ))}
              </Stack>
            </Card>

            {isActive && (
              <Box mt={2} display="grid" gap={1}>
                { isTeamAdmin && <>
                  <Typography sx={{ opacity: 0.5 }} variant="body2"> Add new assignee </Typography>
                  <TextField
                    type="text"
                    value={assignee}
                    onChange={(e) => setAssignee(Number(e.target.value))}
                    placeholder="Assign to team (member email)"
                    sx={{ minWidth: 250 }}
                  />
                </>
              }
              </Box>
            )}
          </Box>
        </Box>
        <Divider sx={{ mt: 5, border: '5px solid var(--disabled)' }} />
        <Stack p={3} direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          { isSubmitting ? <Typography py={2}>Submitting...</Typography> :
            ( isBusinessOrTeam && 
              isActive && 
              assignee && 
            <Button onClick={save}>Save Changes</Button>
          )}
          <Button 
            onClick={onClose} 
            tone="inverted" 
            sx={{ width: 125 }} 
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </Stack>
      </Drawer>

      <TWSExtDrawer
        open={extDrawerOpen}
        onClose={() => setExtDrawerOpen(false)}
        ticket={ticket}
        onUpdate={onUpdate}
      />
    </>
  );
}
