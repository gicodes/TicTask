import React from 'react';
import { Paper, Typography, Stack, Avatar, Chip, Box } from '@mui/material';

export type Ticket = {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignedToId?: number | null;
  dueDate?: string | null;
  tags?: string[];
};

const priorityColor = (p: string) => {
  switch (p?.toUpperCase()) {
    case 'URGENT': return '#b00020';
    case 'HIGH': return '#e53935';
    case 'MEDIUM': return '#ff9800';
    case 'LOW': return '#4caf50';
    default: return '#9e9e9e';
  }
};

export const TicketCard: React.FC<{ ticket: Ticket; onOpen?: (id:number)=>void }> = ({ ticket, onOpen }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 1.5,
        cursor: 'pointer',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
      }}
      onClick={() => onOpen?.(ticket.id)}
      role="button"
      aria-label={`Open ticket ${ticket.title}`}
    >
      <Stack spacing={2.5}>
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
          {ticket.title}
        </Typography>

        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          flexWrap={'wrap'} 
          width={'100%'}
          gap={1}
          display={'flex'}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={ticket.priority} size="small" sx={{ backgroundColor: priorityColor(ticket.priority), color: '#fff' }} />
            {ticket.tags?.slice(0,2).map(t => <Chip key={t} label={t} size="small" variant="outlined" />)}
          </Stack>

          <Box  
            p={1}
            gap={2}
            width={'100%'}
            display={'flex'} 
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography flexWrap={'wrap'} variant="caption" sx={{ color: 'text.secondary' }}>
              <strong>{ticket.dueDate ? `Due by ${ticket.dueDate}` : ''}</strong>
            </Typography>
            <Avatar  sx={{ width: 28, height: 28, fontSize: 13 }}>A</Avatar>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TicketCard;
