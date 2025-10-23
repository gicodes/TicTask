import React from 'react';
import { Ticket } from '@/types/ticket';
import { priorityColor } from '../_level_1/tColorVariants';
import { Paper, Typography, Stack, Avatar, Chip, Box, Tooltip } from '@mui/material';

export const TicketCard: React.FC<{ 
    ticket: Ticket; 
    onOpen?: ( id:string | number)=>void }> = ({ ticket, onOpen }
  ) => {
  const isString = typeof(ticket?.assignedToId)==='string' && ticket.assignedToId.length && ticket.assignedToId.length > 0;
  const avatar = ticket?.assignedToId 
    ? (typeof(ticket?.assignedToId)==='string' && ticket.assignedToId.length) ? ticket.assignedToId[0] : ticket.assignedToId : '🤖';

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
            <Typography flexWrap={'wrap'} variant="caption">
              {ticket.dueDate ? `Due by ${new Date(ticket.dueDate).toDateString()}` : ''}
            </Typography>
            <Tooltip title={`Assigned to ${ticket.assignedToId ? isString ? ticket.assignedToId : `${ticket.assignedToId}`: 'TicTask Bot'}`}>
              <Avatar sx={{ width: 28, height: 28, fontSize: 13, fontWeight: 600, bgcolor: 'var(--surface-2)', color: 'var(--foreground)' }}>
                {avatar}
              </Avatar>
            </Tooltip>
          </Box>
          <Box  
            px={1}
            width={'100%'}
            display={'grid'} 
          >
            <Typography flexWrap={'wrap'} fontSize={12} sx={{ color: 'text.disabled' }}>
              {ticket.updatedAt ? `Last Updated: ${new Date(ticket.updatedAt).toLocaleString()}` : ''}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TicketCard;
