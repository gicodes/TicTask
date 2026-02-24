'use client'

import { CommentsPane } from './tNotes';
import { HistoryPane } from './tHistory';
import { Button } from '@/assets/buttons';
import { useTeam } from '@/hooks/useTeam';
import { useAuth } from '@/providers/auth';
import { QA_Btn } from '@/assets/QA_button';
import { TicketDetailPane } from './tViewEdit';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTeamTicket } from '@/providers/teamTickets';
import { Ticket, TicketHistory, TicketNote } from '@/types/ticket';
import { TICTASK_QUICK_ACTIONS } from '@/app/dashboard/_level_0/constants';
import {
  Box,
  Stack,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Card,
  Select,
  MenuItem,
  Tooltip,
  Fade,
  Fab,
} from '@mui/material';
import { CloseSharp, ArrowBack } from '@mui/icons-material';
import { EllipsisVertical, Share2, Edit, Save, Download } from 'lucide-react';

export default function TeamTicketWorkspace() {
  const router = useRouter();
  const { team } = useTeam();
  const { user } = useAuth();
  const { ticketId } = useParams<{ ticketId: string }>();
  const { getTicket, getComments, getHistory, updateTicket, addComment } = useTeamTicket();

  const [ticketHistory, setTicketHistory] = useState<TicketHistory[]>([]);
  const [ticketComments, setTicketComments] = useState<TicketNote[]>([]);
  const [localTicket, setLocalTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const teamMembers = team?.members ?? [];
  const isAssigned = !!user?.id && (
    user.id === localTicket?.assignedToId || (localTicket?.assigneesIds as number[] | undefined)?.includes(user.id));

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

  const toggleMoreOptions = () => setMoreOptions((prev) => !prev);

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
      if (navigator.share) await navigator.share({ title: localTicket.title, text: 'Check this ticket', url });
      else {
        await navigator.clipboard.writeText(url);
        alert('Link copied!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const handleUpdate = async () => {
    if (!localTicket) return;

    setIsSubmitting(true);    
    try {
      const safeUpdate: Record<string, unknown> = {
        title: localTicket.title?.trim() || undefined,
        description: localTicket.description?.trim() || undefined,
        status: localTicket.status || undefined,
        priority: localTicket.priority || undefined,
        dueDate: localTicket.dueDate ? new Date(localTicket.dueDate).toISOString() : undefined,
        startTime: localTicket.startTime ? new Date(localTicket.startTime).toISOString() : undefined,
        endTime: localTicket.endTime ? new Date(localTicket.endTime).toISOString() : undefined,
        tags: localTicket.tags?.length ? localTicket.tags : undefined,
        amount: localTicket.amount || undefined,
        currency: localTicket.currency || undefined,
        severity: localTicket.data.severity || undefined,
        impact: localTicket.data.impact || undefined,
        steps: localTicket.data.steps?.trim() || undefined,
        location: localTicket.data.location?.trim() || undefined,
        extClient: localTicket.data.extClient?.trim() || undefined,
        checklist: localTicket.data.checklist || undefined,
        recurrenceRule: localTicket.data.recurrence || undefined,
        attachments: localTicket.data.attachments || undefined,
        subtasks: localTicket.data.subtasks || undefined,
        estimatedTimeHours: localTicket.data.estimatedTimeHours || undefined,
        assignTo: localTicket.assignedTo?.email || undefined,
        assignees: localTicket.assignees?.length ? localTicket.assignees.map(u => u.id) : undefined,
      };
      Object.keys(safeUpdate).forEach(key => safeUpdate[key] === undefined && delete safeUpdate[key]);

      await updateTicket(localTicket.id, safeUpdate);

      const refreshed = await getTicket(localTicket.id);
      if (refreshed) setLocalTicket(refreshed);

      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fade in timeout={400}>
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {editMode && (
          <Fab
            aria-label="save"
            sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}
            onClick={handleUpdate}
            disabled={isSubmitting}
          >
            <Save />
          </Fab>
        )}

        <Stack direction="row" p={2} justifyContent="flex-end" spacing={2}>
          <Button
            variant={editMode ? 'contained' : 'outlined'}
            onClick={editMode ? handleUpdate : () => setEditMode(true)}
            disabled={isSubmitting}
            startIcon={editMode ? <Save size={16} /> : <Edit size={16} />}
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
              <Typography 
                noWrap 
                variant="h6" 
                title={localTicket.title}
                sx={{ ml: 2, flex: 1, flexWrap: 'wrap', maxWidth: { xs: 180, sm: 'none' }}} 
              >
                {localTicket.title}
              </Typography>
            )}

            <Select
              value={localTicket.status}
              onChange={(e) => setLocalTicket({ ...localTicket, status: e.target.value as any })}
              disabled={!editMode}
              size="small"
              sx={{ minWidth: 100, mx: 2, maxWidth: { xs: 100, sm: 160 } }}
            >
              {['UPCOMING', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'CANCELLED'].map((s) => (
                <MenuItem key={s} value={s}> {s.replace('_', ' ')} </MenuItem>
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
              <TicketDetailPane
                ticket={localTicket}
                setTicket={setLocalTicket}
                editMode={editMode}
                teamMembers={teamMembers}
                userId={user?.id as number}
              />
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
                <CommentsPane 
                  comments={ticketComments}
                  newComment={newComment}
                  onAddComment={handleAddComment}
                  isActive={isActive}
                  setNewComment={setNewComment}
                  isSubmitting={isSubmitting}
                />
              )}
              {tab === 1 && <HistoryPane history={ticketHistory} />}
            </Box>
          </Stack>

          {isAssigned && <Card
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
          </Card>}
        </Box>
      </Box>
    </Fade>
  );
}
