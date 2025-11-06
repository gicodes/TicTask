'use client';

import styles from '@/app/page.module.css';
import { FaEllipsisV } from 'react-icons/fa';
import { Download, Share2 } from 'lucide-react';
import { CloseSharp } from '@mui/icons-material';
import { useTickets } from '@/providers/tickets';
import React, { useEffect, useState } from 'react';
import { getTypeColor, priorityColor } from '../_level_1/tColorVariants';
import { Drawer, Box, Typography, Stack, Divider, Chip, Button, TextField, Toolbar, IconButton, Tooltip } from '@mui/material';
import { useAuth } from '@/providers/auth';

export default function TicketDetailDrawer({ 
  open, 
  onClose,
  ticketId, 
  onUpdate 
}: { 
  open: boolean; 
  onClose: () => void; 
  ticketId?: string | number | null; 
  onUpdate?: () => void 
}) {
  const { user } = useAuth();
  const { selectedTicket: ticket, selectTicket, updateTicket } = useTickets();
  const [moreOptions, setMoreOptions] = useState(false);
  const [assignee, setAssigned] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    selectTicket(ticketId ?? null);
  }, [ticketId, selectTicket]);

  const save = async () => {
    if (!ticket) return;
    await updateTicket(Number(ticket.id), { updatedAt: new Date().toISOString() });
    onUpdate?.();
    setNote('');
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
        await navigator.share({
          title: ticket.title,
          text: 'Check out this ticket on our board:',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  type ColorVariations = 'success' | 'secondary' | 'warning';
  type Status = 'RESOLVED' | 'CANCELLED' | 'IN_PROGRESS';
  const StatusRender = ticket?.status==="IN_PROGRESS" ? "IN PROGRESS" : ticket?.status

  interface QuickActions {
    ticketID: string | number;
    color: ColorVariations;
    status: Status;
    title: string;
    disabled: boolean;
  }

  const QA_BUTTON = ({ ticketID, color, title, status, disabled=false} : QuickActions) => 
    <Button 
      variant="outlined"  
      color={color} 
      sx={{ boxShadow: 2}}
      disabled={disabled}
      onClick={() => { 
        updateTicket(Number(ticketID), { status: status }).then(() => {
          onUpdate?.(); onClose()}); 
      }}
    >
      {title}
    </Button>

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{ '& .MuiDrawer-paper': { width: {xs:'100%', md: 440}, px: 3 } }}
    >
      <Toolbar />
      {ticket && (
        <Box> 
          <Stack direction={'row'} alignItems={'center'} minHeight={64}>
            <Tooltip title='More Options'>
              <IconButton onClick={toggleMoreOptions}>
                {!moreOptions ? <FaEllipsisV size={20} /> : <CloseSharp sx={{ fontSize: 20}} />}
              </IconButton>
            </Tooltip>
            { moreOptions && 
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Save as PDF / Print">
                    <IconButton onClick={handleSavePDF}> <Download size={18} /> </IconButton>
                  </Tooltip>
                  <Tooltip title="Share Ticket">
                    <IconButton onClick={handleShare}> <Share2 size={18} /></IconButton>
                  </Tooltip>
                </Stack>
              </Toolbar>}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="end" mb={1}>
            <Typography 
              variant="caption" 
              sx={{ color: 'text.secondary' }}
            >
              Updated {ticket?.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : ''}
            </Typography>
            <Box 
              display={'flex'} 
              justifyContent={'end'} 
              flexDirection={'column'} 
              gap={1} 
              flexWrap={'wrap'} 
              width={'100%'}
              maxWidth={120}
            >
              <Typography variant='body1' sx={{ textAlign: 'center', color: getTypeColor(ticket.type)}}>
                <strong>{ticket.type==="FEATURE_REQUEST" ? "FEATURE": ticket.type}</strong>
              </Typography>
              <Tooltip title={`Ticket ${StatusRender?.toLowerCase()}`}>
                <Chip 
                  label={StatusRender} 
                  size="small" 
                  sx={{ px: 1, maxWidth: 'max-content', mx: 'auto'}} 
                />
              </Tooltip>
            </Box> 
          </Stack>  
          <Typography variant="h6">{ticket.title}</Typography>
          <Divider sx={{ my: 1.5 }} />
          <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            {ticket.description}
          </Typography>

          <Stack spacing={1} sx={{ my: 4 }}>
            <Typography fontWeight={600}>QUICK ACTIONS</Typography>
            <Stack direction={'row'} pt={1} gap={1}>
              <QA_BUTTON color='success' title='START' ticketID={ticket.id} status='IN_PROGRESS' disabled={ticket.status==="RESOLVED" || ticket.status==="CLOSED" || ticket.status==="CANCELLED"} />
              <QA_BUTTON color='secondary' title='RESOLVE' ticketID={ticket.id} status='RESOLVED' disabled={ticket.status==="RESOLVED" || ticket.status==="CLOSED" || ticket.status==="CANCELLED"} />
              <QA_BUTTON color='warning' title='CANCEL' ticketID={ticket.id} status='CANCELLED' disabled={ticket.status==="RESOLVED" || ticket.status==="CLOSED" || ticket.status==="CANCELLED"} />
            </Stack>    
          </Stack>

          <Stack 
            spacing={1} 
            sx={{ 
              py: 2, 
              borderTop: '1px solid var(--dull-gray)', 
              borderBottom: '1px solid var(--dull-gray)' 
            }}
          >
            <Typography variant='caption'>
              <strong>Created</strong> {ticket.createdById && <Typography variant='caption'><strong>By</strong> {ticket.createdById}.</Typography>}
              <strong>{' '}On</strong> {ticket.createdAt ? new Date(ticket.createdAt).toDateString() + `, ${new Date(ticket.createdAt).toTimeString()}` : ''}
            </Typography>

            <Stack direction={'row'} gap={0.5}>
              {ticket.assignedToId && <Typography variant='caption'><strong>Assigned to</strong> {ticket.assignedToId}.</Typography>}
              {ticket.assignee && <Typography variant='caption'><strong>&</strong> {ticket.assignee}.</Typography>} 
            </Stack>
            <Stack 
              py={1}
              spacing={1} 
              direction="row" 
              alignItems="center" 
              width={'100%'} 
              justifyContent={'space-between'}
            >
              <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                {ticket.tags?.map(t => <Chip key={t} label={t} size="small" variant="outlined" />)}
              </Box>
              <Box display={'flex'} justifyContent={'end'}>
                <Stack gap={0.5}>
                  <Typography fontSize={11} color='text.secondary' textAlign={'center'}>Priority</Typography>
                  <Chip size='medium' label={ticket?.priority} sx={{ bgcolor: priorityColor(ticket.priority), color: '#fff', fontWeight: 600 }}/>
                </Stack>
              </Box>
            </Stack>
            {ticket?.dueDate && <Typography variant="caption">
              <strong>Due by</strong> {ticket.dueDate ? new Date(ticket.dueDate).toDateString() : ''}
            </Typography>}
          </Stack>
          {user?.userType==="BUSINESS" && <>
            <Typography variant="subtitle2" py={1}>Add new assignee</Typography>
            <TextField 
              type='text'
              value={assignee} 
              onChange={(e) => setAssigned(e.target.value)} 
              placeholder="Assign to team (member email)" 
              sx={{ minWidth: 250}}
            />
          </>}
          <Typography variant="subtitle2" py={1}>Add note</Typography>
          <TextField 
            multiline 
            minRows={3} 
            value={note} 
            fullWidth
            onChange={(e) => setNote(e.target.value)} 
            placeholder="Write a note..." 
          />
          <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
            <Button className={styles.btnPrimary} onClick={save}>Save</Button>
            <Button className={styles.btnWarm} onClick={onClose}>Back</Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
