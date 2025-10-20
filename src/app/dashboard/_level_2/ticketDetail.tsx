'use client';

import { api } from '../_level_0/seed';
import { Ticket } from '@/types/ticket';
import styles from '@/app/page.module.css';
import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Stack, Divider, Chip, Button, TextField, Toolbar } from '@mui/material';

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
  }
) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!ticketId) {
      setTicket(null); 
      return; 
    }
    setLoading(true);

    api.getTicket(ticketId)
      .then(t => { setTicket(t); setLoading(false); });
  }, [ticketId]);

  const addNote = () => {
    if (!ticket) return;
    api.updateTicket(ticket.id, { updatedAt: new Date().toISOString() }).then(t => {
      setTicket(t);
      if (onUpdate) onUpdate();
      setNote('');
    });
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{ '& .MuiDrawer-paper': { width: {xs:'100%', md: 420}, p: 3 } }}
    >
      <Toolbar />
      <Box>
        {!ticket && !loading && <Typography variant="subtitle1">No ticket selected</Typography>}
        {loading && <Typography variant="body2">Loading…</Typography>}
        {ticket && (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{ticket.title}</Typography>
              <Chip label={ticket.status} size="small" />
            </Stack>
            <Typography 
              variant="caption" 
              sx={{ color: 'text.secondary' }}
            >
              Updated {ticket?.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : ''}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
              {ticket.description}
            </Typography>

            <Stack spacing={1} sx={{ my: 4 }}>
              <Typography fontWeight={600}>QUICK ACTIONS</Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined"  color={'success'} onClick={() => { api.updateTicket(ticket.id, { status: 'IN_PROGRESS' }).then(() => onUpdate?.()); }}>Start</Button>
                <Button variant="outlined" color={'secondary'} onClick={() => { api.updateTicket(ticket.id, { status: 'RESOLVED' }).then(() => onUpdate?.()); }}>Resolve</Button>
                <Button variant="outlined" color={'warning'} onClick={() => { api.updateTicket(ticket.id, { status: 'CANCELLED' }).then(() => onUpdate?.()); }}>Cancel</Button>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" py={1}>Add note</Typography>
            <TextField 
              multiline 
              minRows={3} 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder="Write a note..." 
            />
            <Stack direction="row" spacing={1} sx={{ mt: 5 }}>
              <Button className={styles.btnPrimary} onClick={addNote}>Add note</Button>
              <Button className={styles.btnWarm} onClick={onClose}>Close</Button>
            </Stack>
          </>
        )}
      </Box>
    </Drawer>
  );
}