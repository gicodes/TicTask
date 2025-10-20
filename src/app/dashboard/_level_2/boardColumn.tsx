import React from 'react';
import { Box, Typography } from '@mui/material';
import TicketCard, { Ticket } from './ticketCard';

export const BoardColumn: React.FC<{
  title: string;
  tickets: Ticket[];
  onOpen?: (id:number)=>void;
}> = ({ title, tickets, onOpen }) => {
  return (
    <Box sx={{
      minWidth: 320,
      maxWidth: 360,
      mr: 2,
      p: 1,
      bgcolor: 'transparent',
    }}>
      <Typography p={1} variant="h6" sx={{ mb: 1, fontWeight: 700 }}>{title} <small style={{ fontWeight: 500, color: 'gray' }}>({tickets.length})</small></Typography>
      <Box>
        {tickets.map(t => <TicketCard key={t.id} ticket={t} onOpen={onOpen} />)}
      </Box>
    </Box>
  );
};

export default BoardColumn;
