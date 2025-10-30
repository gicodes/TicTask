import React from 'react';
import TicketCard from './ticketCard';
import { Ticket } from '@/types/ticket';
import { Box, Typography } from '@mui/material';

export const BoardColumn: React.FC<{
  title: string;
  tickets: Ticket[];
  onOpen?: (id: string | number) => void;
  }> = ({ 
    title, 
    tickets, 
    onOpen 
  }
) => {
  return (
    <Box 
      sx={{
        p: 1,
        mr: 2,
        minWidth: { xs: 300, sm: 266, md: 270, lg: 320},
        maxWidth: 360,
        bgcolor: 'transparent',
      }}
    >
      <Typography variant="h6" 
        sx={{ 
          p: 1,
          mb: 1, 
          gap: 1, 
          display: 'flex', 
          fontWeight: 700, 
          alignContent: 'center' 
        }}
      >
        {title==='IN_PROGRESS' ? 'IN PROGRESS' : title}
        <small style={{ fontWeight: 500, color: 'gray' }}>
          ({tickets?.length})
        </small>
      </Typography>
      
      <Box>
        {tickets?.map(t => <TicketCard key={t?.id} ticket={t} onOpen={onOpen} />)}
      </Box>
    </Box>
  );
};

export default BoardColumn
