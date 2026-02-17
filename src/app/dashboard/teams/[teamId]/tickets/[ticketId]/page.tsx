'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/assets/buttons';
import { QA_Btn } from '@/assets/QA_button';
import { useTeam } from '@/hooks/useTeam';
import { useAuth } from '@/providers/auth';
import { useTeamTicket } from '@/providers/teamTickets';
import { Ticket, TicketHistory, TicketNote } from '@/types/ticket';
import { TICKET_TYPE_ICONS } from '@/app/dashboard/_level_1/tSchema';
import { TICTASK_QUICK_ACTIONS } from '@/app/dashboard/_level_0/constants';
import { extractTicketData } from '@/app/dashboard/_level_1/tFieldExtract';
import { getTypeColor, priorityColor } from '../../../../_level_1/tColorVariants';
import {
  Box,
  Stack,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Chip,
  Tabs,
  Tab,
  Card,
  Select,
  MenuItem,
  Tooltip,
  Fade,
  Fab,
} from '@mui/material';
import { CloseSharp, ArrowBack, Download, Edit, Save } from '@mui/icons-material';
import { EllipsisVertical, Share2, TicketCheck } from 'lucide-react';

export default function TeamTicketWorkspace() {
  const router = useRouter();
  const { ticketId } = useParams<{ ticketId: string }>();
  const { team } = useTeam();
  const { user } = useAuth();
  const { getTicket, getComments, getHistory, updateTicket, addComment } = useTeamTicket();

  const [localTicket, setLocalTicket] = useState<Ticket | null>(null);
  const [ticketHistory, setTicketHistory] = useState<TicketHistory[]>([]);
  const [ticketComments, setTicketComments] = useState<TicketNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [tab, setTab] = useState(0);

  const teamMembers = team?.members ?? [];

  useEffect(() => {
    if (!ticketId) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const ticketNum = Number(ticketId);
        if (isNaN(ticketNum)) throw new Error('Invalid ticket ID');

        const [ticketData, historyData, commentsData] = await Promise.all([
          getTicket(ticketNum),
          getHistory(ticketNum),
          getComments(ticketNum),
        ]);

        if (!ticketData) {
          setError('Ticket not found');
          return;
        }

        setLocalTicket(ticketData);
        setTicketHistory(historyData ?? []);
        setTicketComments(commentsData ?? []);
      } catch (err) {
        console.error('Failed to load ticket:', err);
        setError('Failed to load ticket data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ticketId, getTicket, getHistory, getComments]);

  if (loading) return (<Typography p={4} textAlign={'center'}>Loading ticket...</Typography>);
  if (error || !localTicket) return (
    <Box p={4} mx={'auto'} width={300} textAlign={'center'} display={'grid'} gap={2}>
      <Typography color="error">{error || 'Ticket not found'}</Typography>
      <Button onClick={() => router.back()}>
        Go Back
      </Button>
    </Box>
  );

  const isActive = !['CANCELLED', 'RESOLVED', 'CLOSED'].includes(localTicket.status);
  const TypeIcon = TICKET_TYPE_ICONS[localTicket.type as keyof typeof TICKET_TYPE_ICONS] ?? <TicketCheck size={20} />;
  const fields = extractTicketData(localTicket);

  const toggleMoreOptions = () => setMoreOptions((prev) => !prev);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await updateTicket(localTicket.id, localTicket);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await addComment(localTicket.id, newComment.trim());
      setNewComment('');
      const updated = await getComments(localTicket.id);
      setTicketComments(updated ?? []);
    } catch (err) {
      console.error('Add comment failed:', err);
    }
  };

  const handleSavePDF = () => window.print();

  const handleShare = async () => {
    const url = `${window.location.origin}/tickets/${localTicket.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: localTicket.title, text: 'Check this ticket', url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <Fade in timeout={400}>
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {editMode && (
          <Fab
            color="primary"
            aria-label="save"
            sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}
            onClick={handleSave}
            disabled={isSubmitting}
          >
            <Save />
          </Fab>
        )}

        <Stack direction="row" p={2} justifyContent="flex-end" spacing={2}>
          <Button
            variant={editMode ? 'contained' : 'outlined'}
            onClick={editMode ? handleSave : () => setEditMode(true)}
            disabled={isSubmitting}
            startIcon={editMode ? <Save /> : <Edit />}
          >
            {editMode ? (isSubmitting ? 'Saving...' : 'Save') : 'Update'}
          </Button>
          {editMode && (
            <Button tone="warm" onClick={() => setEditMode(false)} startIcon={<ArrowBack />}>
              Back
            </Button>
          )}
        </Stack>

        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <IconButton edge="start" onClick={() => router.back()}>
              <ArrowBack />
            </IconButton>

            {editMode ? (
              <TextField
                value={localTicket.title}
                onChange={(e) => setLocalTicket({ ...localTicket, title: e.target.value })}
                variant="standard"
                fullWidth
                autoFocus
                sx={{ ml: 2, fontSize: '1.5rem' }}
              />
            ) : (
              <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
                {localTicket.title}
              </Typography>
            )}

            <Select
              value={localTicket.status}
              onChange={(e) => setLocalTicket({ ...localTicket, status: e.target.value as any })}
              disabled={!editMode}
              size="small"
              sx={{ minWidth: 160, mx: 2 }}
            >
              {['UPCOMING', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'CANCELLED'].map((s) => (
                <MenuItem key={s} value={s}>
                  {s.replace('_', ' ')}
                </MenuItem>
              ))}
            </Select>

            <Tooltip title="More options">
              <IconButton onClick={toggleMoreOptions}>
                {moreOptions ? <CloseSharp /> : <EllipsisVertical size={20} />}
              </IconButton>
            </Tooltip>

            {moreOptions && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 64,
                  right: 16,
                  zIndex: 1300,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 4,
                  p: 1.5,
                }}
              >
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Print / Save PDF">
                    <IconButton onClick={handleSavePDF}>
                      <Download />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton onClick={handleShare}>
                      <Share2 size={20} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Box p={{ xs: 2, md: 4 }} maxWidth="xl" mx="auto">
          <Stack direction={{ md: 'row' }} spacing={4}>
            <Box flex={3}>
              <Card sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: getTypeColor(localTicket.type),
                      fontWeight: 600,
                    }}
                  >
                    <TypeIcon /> {localTicket.type.replace('_', ' ')}
                  </Typography>

                  {localTicket.priority && (
                    <Chip
                      label={localTicket.priority}
                      size="medium"
                      sx={{
                        bgcolor: priorityColor(localTicket.priority),
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Stack>

                {editMode ? (
                  <TextField
                    multiline
                    fullWidth
                    rows={5}
                    value={localTicket.description ?? ''}
                    onChange={(e) => setLocalTicket({ ...localTicket, description: e.target.value })}
                    placeholder="Enter ticket description..."
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    whiteSpace="pre-wrap"
                    sx={{ minHeight: 80 }}
                  >
                    {localTicket.description || 'No description provided.'}
                  </Typography>
                )}

                <Stack spacing={1} mb={3}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Assignees
                  </Typography>

                  {editMode ? (
                    <Select
                      multiple
                      fullWidth
                      value={
                        localTicket.assignees?.map((a) => a.id) ??
                        (localTicket.assignedToId ? [localTicket.assignedToId] : [])
                      }
                      onChange={(e) => {
                        const selectedIds = e.target.value as number[];
                        setLocalTicket({
                          ...localTicket,
                          assignees: teamMembers.filter((m) => selectedIds.includes(m.id)),
                        });
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as number[]).map((id) => {
                            const member = teamMembers.find((m) => m.id === id);
                            return <Chip key={id} label={member?.name ?? id} size="small" />;
                          })}
                        </Box>
                      )}
                    >
                      {teamMembers.map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                          {m.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {(localTicket.assignees?.length
                        ? localTicket.assignees.map((a) => a.id)
                        : localTicket.assignedToId
                        ? [localTicket.assignedToId]
                        : []
                      ).map((id) => {
                        const member = teamMembers.find((m) => m.id === id);
                        return <Chip key={id} label={member?.name ?? `User ${id}`} size="small" />;
                      })}

                      {!(localTicket.assignees?.length || localTicket.assignedToId) && (
                        <Typography variant="body2" color="text.secondary">
                          <i>Unassigned</i>
                        </Typography>
                      )}
                    </Box>
                  )}
                </Stack>

                <Stack spacing={1} sx={{ px: 1, pb: 2, pt: 2 }}>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Created{' '}
                    {localTicket.createdById && (
                      <>
                        by{' '}
                        {localTicket.createdById === user?.id ? (
                          <strong>you</strong>
                        ) : (
                          <span>{localTicket.createdBy?.name || localTicket.createdById}</span>
                        )}{' '}
                        on{' '}
                      </>
                    )}
                    {localTicket.createdAt ? (
                      <>
                        {new Date(localTicket.createdAt).toDateString()},{' '}
                        {new Date(localTicket.createdAt).toLocaleTimeString()}
                      </>
                    ) : (
                      'unknown date'
                    )}
                  </Typography>

                  {localTicket.assignedToId && (
                    <Typography variant="caption" sx={{ opacity: 0.75 }}>
                      Assigned to{' '}
                      {localTicket.assignedToId === user?.id ? (
                        <strong>you</strong>
                      ) : (
                        <span>{localTicket.assignedTo?.name || localTicket.assignedToId}</span>
                      )}
                      .
                    </Typography>
                  )}

                  {localTicket.tags?.length > 0 && (
                    <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                      {localTicket.tags.map((t) => (
                        <Chip key={t} label={t} size="small" variant="outlined" />
                      ))}
                    </Box>
                  )}
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={1} pb={1} pt={1}>
                  {'severity' in fields && fields.severity && (
                    <Chip label={`Severity: ${fields.severity}`} size="small" />
                  )}
                  {'impact' in fields && fields.impact && (
                    <Chip label={`Impact: ${fields.impact}`} size="small" />
                  )}
                  {'amount' in fields && fields.amount > 0 && (
                    <Chip
                      size="small"
                      color="success"
                      variant="outlined"
                      label={`${fields.amount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} ${fields.currency || 'USD'}`}
                    />
                  )}
                  {'extClient' in fields && fields.extClient && (
                    <Chip label={`${fields.extClient}`} size="small" color="info" />
                  )}
                  {'estimatedTimeHours' in fields && fields.estimatedTimeHours && (
                    <Chip label={`${fields.estimatedTimeHours}h est.`} size="small" />
                  )}
                  {'subtasks' in fields && fields.subtasks?.length && fields.subtasks.length > 0 && (
                    <Chip label={`${fields.subtasks.length} subtasks`} size="small" />
                  )}
                  {'checklist' in fields && fields.checklist?.length && fields.checklist.length > 0 && (
                    <Chip label={`${fields.checklist.length} checklist items`} size="small" />
                  )}
                  {'attendees' in fields && fields.attendees?.length && fields.attendees.length > 0 && (
                    <Chip label={`${fields.attendees.length} attendees`} size="small" />
                  )}
                  {'attachments' in fields && fields.attachments?.length && fields.attachments.length > 0 && (
                    <Chip label={`${fields.attachments.length} attachments`} size="small" />
                  )}
                  {'steps' in fields && fields.steps && (
                    <>
                      <Chip label="Steps provided:" size="small" /> {fields.steps}
                    </>
                  )}
                  {'recurrence' in fields && fields.recurrence && (
                    <Chip label={`Recurs: ${fields.recurrence}`} size="small" />
                  )}
                  {'location' in fields && fields.location && (
                    <Chip label={`Location: ${fields.location}`} size="small" />
                  )}

                  {('startTime' in fields || 'endTime' in fields) && (
                    <Stack direction="row" flexWrap="wrap" gap={2} width="100%" justifyContent="flex-end" py={1}>
                      {'startTime' in fields && fields.startTime && (
                        <Stack gap={0.5}>
                          <Chip
                            size="small"
                            variant="outlined"
                            label={`Start: ${new Date(fields.startTime).toLocaleTimeString()}`}
                          />
                          <Chip size="small" label={new Date(fields.startTime).toDateString()} />
                        </Stack>
                      )}
                      {'endTime' in fields && fields.endTime && (
                        <Stack gap={0.5}>
                          <Chip
                            size="small"
                            variant="outlined"
                            label={`End: ${new Date(fields.endTime).toLocaleTimeString()}`}
                          />
                          <Chip size="small" label={new Date(fields.endTime).toDateString()} />
                        </Stack>
                      )}
                    </Stack>
                  )}
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {'dueDate' in fields && fields.dueDate && (
                    <Chip label={`Due: ${new Date(fields.dueDate).toLocaleDateString()}`} size="small" />
                  )}
                  {'amount' in fields && fields.amount && (
                    <Chip
                      color="success"
                      label={`${fields.amount} ${fields.currency || 'USD'}`}
                      size="small"
                    />
                  )}
                  {'estimatedTimeHours' in fields && fields.estimatedTimeHours && (
                    <Chip label={`${fields.estimatedTimeHours}h est.`} size="small" />
                  )}
                </Stack>
              </Card>
            </Box>

            <Box flex={2}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="fullWidth"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Comments" />
                <Tab label="Activity" />
              </Tabs>

              {tab === 0 && (
                <Card sx={{ p: 3, borderRadius: 2, maxWidth: 555 }}>
                  {ticketComments.length > 0 ? (
                    ticketComments.map((note) => (
                      <Fade in key={note.id} timeout={300}>
                        <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                          <Stack direction="row" justifyContent="space-between" mb={1}>
                            <Typography variant="subtitle2">
                              {note.author?.name || 'Unknown'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(note.createdAt).toLocaleString()}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {note.content}
                          </Typography>
                        </Box>
                      </Fade>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
                      No comments yet. Be the first to add one.
                    </Typography>
                  )}

                  {isActive && (
                    <Stack direction="row" spacing={2} mt={4}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={6}
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        onClick={handleAddComment}
                        disabled={!newComment.trim() || isSubmitting}
                      >
                        Send
                      </Button>
                    </Stack>
                  )}
                </Card>
              )}

              {tab === 1 && (
                <Card sx={{ p: 3, borderRadius: 2, maxWidth: 555 }}>
                  {ticketHistory.length > 0 ? (
                    ticketHistory.map((h) => (
                      <Fade in key={h.id} timeout={300}>
                        <Box sx={{ mb: 2.5, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {h.action}
                          </Typography>
                          {(h.oldValue || h.newValue) && (
                            <Typography variant="body2" color="text.secondary" sx={{ my: 0.5 }}>
                              {h.oldValue && `From: ${h.oldValue} `}
                              {h.newValue && `→ To: ${h.newValue}`}
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.disabled">
                            {new Date(h.createdAt).toLocaleString()} • {h.performedBy?.name || 'System'}
                          </Typography>
                        </Box>
                      </Fade>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
                      No activity recorded yet.
                    </Typography>
                  )}
                </Card>
              )}
            </Box>
          </Stack>

          <Card
            sx={{
              p: { xs: 2, sm: 3 },
              mt: 5,
              mx: 'auto',
              boxShadow: 3,
              borderRadius: 999,
              maxWidth: 'fit-content',
              background: 'transparent',
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              gap={{ xs: 1.5, sm: 3 }}
              flexWrap="wrap"
            >
              {TICTASK_QUICK_ACTIONS.map((qa, i) => (
                <QA_Btn
                  key={i}
                  color={qa.color}
                  title={qa.title}
                  ticketID={localTicket.id}
                  status={qa.status}
                  disabled={!isActive}
                  onClose={() => router.back()}
                  onUpdate={() => {
                    setLocalTicket((prev) => (prev ? { ...prev, status: qa.status } : null));
                    updateTicket(localTicket.id, { status: qa.status });
                  }}
                />
              ))}
            </Stack>
          </Card>
        </Box>
      </Box>
    </Fade>
  );
}
