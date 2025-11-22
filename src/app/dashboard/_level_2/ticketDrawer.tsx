'use client';

import { User } from '@/types/users';
import { useForm } from 'react-hook-form';
import { Button } from '@/assets/buttons';
import { QA_Btn } from '@/assets/QA_button';
import { useAuth, } from '@/providers/auth';
import { FaEllipsisV } from 'react-icons/fa';
import { Download, Share2 } from 'lucide-react';
import { CloseSharp } from '@mui/icons-material';
import { useTickets } from '@/providers/tickets';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '../_level_1/tDatepicker';
import { TICKET_DRAWER_TYPES } from '../_level_1/tSchema';
import { getTypeColor, priorityColor } from '../_level_1/tColorVariants';
import { Drawer, Box, Typography, Stack, Chip, TextField, Toolbar, IconButton, Tooltip } from '@mui/material';

export default function TicketDetailDrawer({ 
  open, 
  onClose,
  onUpdate,
  ticketId, 
}: TICKET_DRAWER_TYPES ) {
  const { user } = useAuth();
  const { selectedTicket: ticket, selectTicket, updateTicket } = useTickets();
  const [moreOptions, setMoreOptions] = useState(false);
  
  const { control, reset, getValues, watch } = useForm({
    defaultValues: { dueDate: ''},});
  const [assignee, setAssigned] = useState(''); 
  const [note, setNote] = useState(''); 

  useEffect(() => {
    selectTicket(ticketId ?? null);
  }, [ticketId, selectTicket]);

  useEffect(() => {
    if (ticket) reset({ dueDate: ticket.dueDate
      ? new Date(ticket.dueDate).toISOString().slice(0, 16) : '',
    });
  }, [ticket, reset]);

  const save = async () => {
    if (!ticket) return;

    const { dueDate } = getValues();

    await updateTicket(Number(ticket.id), { 
      ...(dueDate && { dueDate: new Date(dueDate).toISOString() }),
      ...(assignee && { assignedTo: assignee }),
      ...(note && { note }),
    });

    onUpdate?.();
    setNote("");
    setAssigned("");
    onClose();
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

  const StatusRender = ticket?.status==="IN_PROGRESS" ? "IN PROGRESS" : ticket?.status;

  const businessOrActiveTeam = user?.userType==="BUSINESS";
  const activeTicket = !(ticket?.status==="CANCELLED" || ticket?.status==="RESOLVED" || ticket?.status==="CLOSED");
  const TeamAdmin = (user as User)?.teamMemberships && (user as User).createdTeams;
  const initialDate = ticket?.dueDate;
  const watchedDate = watch("dueDate");

  const dateChanged = watchedDate !== initialDate;

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
          
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Typography 
              variant="caption" 
              sx={{ color: 'text.secondary' }}
            >
              Updated {ticket?.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : ''}
            </Typography>
            <Box
              pb={1}
              gap={1}
              maxWidth={120}
              display={'grid'}
              justifyContent={'center'}
            >
              <Typography variant='body1' sx={{ textAlign: 'center', color: getTypeColor(ticket?.type)}}>
                <strong>{ticket?.type==="FEATURE_REQUEST" ? "FEATURE": ticket?.type}</strong>
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
          <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap', my: 1 }}>
            {ticket.description}
          </Typography>

          <Stack 
            spacing={1} 
            sx={{ p: 1, borderBottom: '2px solid var(--disabled)' }}
          >
            <Typography variant='caption' sx={{ opacity: 0.75}}>
              <span>Created</span> 
                {ticket.createdById && <> by {ticket.createdById===user?.id ? <strong>you</strong> : <span>ticket.createdById</span>}.</>}
                <br/> <>On {ticket.createdAt ? new Date(ticket.createdAt).toDateString() + `, ${new Date(ticket.createdAt).toLocaleTimeString()}` : ''}</>
            </Typography>

            <Typography variant='caption' sx={{ opacity: 0.75}}>
              {ticket.assignedToId && <span> <span>Assigned to</span> {ticket.assignedToId}</span>}
              {ticket.assignee && <span><br/> <span>&</span> {ticket.assignee}.</span>} 
            </Typography>

            <Stack 
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

            {ticket?.dueDate && <Typography variant="caption" sx={{ opacity: !activeTicket ? 0.5 : ''}}>
              <strong>Due by</strong> {ticket.dueDate ? (new Date(ticket.dueDate).toDateString() + ", " + new Date(ticket.dueDate).toLocaleTimeString()) : ''}
            </Typography>}
          </Stack>

          <Stack spacing={1} sx={{ my: 2 }}>
            <Stack direction={'row'} pt={1} gap={1}>
              <QA_Btn 
                color='success' 
                title='START'
                ticketID={ticket.id} 
                status='IN_PROGRESS' 
                disabled={ticket.status==="RESOLVED" || ticket.status==="CLOSED" || ticket.status==="CANCELLED"} 
                onUpdate={() => onUpdate}
                onClose={onClose}
              />
              <QA_Btn 
                color='secondary' 
                title='RESOLVE' 
                ticketID={ticket.id} 
                status='RESOLVED' 
                disabled={ticket.status==="RESOLVED" || ticket.status==="CLOSED" || ticket.status==="CANCELLED"} 
                onUpdate={() => onUpdate}
                onClose={onClose}
              />
              <QA_Btn 
                color='warning' 
                title='CANCEL' 
                ticketID={ticket.id} 
                status='CANCELLED' 
                disabled={ticket.status==="RESOLVED" || ticket.status==="CLOSED" || ticket.status==="CANCELLED"} 
                onUpdate={() => onUpdate}
                onClose={onClose}
              />
            </Stack>    
          </Stack>
          { activeTicket && <Stack display={'grid'} gap={2}>
            <Typography variant='body2' sx={{ opacity: 0.5}}>{!ticket.dueDate ? "Set a" : "Extend"} due date?</Typography>
            <DatePicker control={control}  name="dueDate" defaultValue="" />
          </Stack>}

          { businessOrActiveTeam && activeTicket &&
            <Box mt={2} display={'grid'} gap={1}>
              { TeamAdmin && <>
                <Typography sx={{ opacity: 0.5}} variant="body2">Add new assignee</Typography>
                <TextField 
                  type='text'
                  value={assignee} 
                  onChange={(e) => setAssigned(e.target.value)} 
                  placeholder="Assign to team (member email)" 
                  sx={{ minWidth: 250 }}
                />
              </>}
              <Typography sx={{ opacity: 0.5}} variant="body2">Add note</Typography>
              <TextField 
                multiline 
                minRows={3} 
                value={note} 
                fullWidth
                onChange={(e) => setNote(e.target.value)} 
                placeholder="Write a note..." 
              />
            </Box>
          }

          <Stack direction="row" spacing={3} sx={{ my: 2, py: 2 }}>
            {businessOrActiveTeam && activeTicket &&
              (note !== '' || assignee !== '' || dateChanged) && (
                <Button onClick={save}>Save Changes</Button> 
              )}
            <Button onClick={onClose} tone="warm"> Back</Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
