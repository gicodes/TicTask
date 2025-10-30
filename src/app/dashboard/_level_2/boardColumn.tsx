import React from 'react';
import TicketCard from './ticketCard';
import { Ticket } from '@/types/ticket';
import { Badge, Box, Typography } from '@mui/material';

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
        p: 1, mr: 1,
        maxWidth: 360,
        bgcolor: 'transparent',
        minWidth: { xs: 300, sm: 266, md: 270, lg: 320},
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
        <Badge sx={{ display: { xs: 'none', sm: 'flex' }}}>
          ▿ {title==='IN_PROGRESS' ? 'IN PROGRESS' : title}
        </Badge>
        <span style={{ fontWeight: 500, color: 'gray' }}>
          ➥ ({tickets?.length})
        </span>
      </Typography>
      
      <Box>
        {tickets?.map(t => <TicketCard key={t?.id} ticket={t} onOpen={onOpen} />)}
      </Box>
    </Box>
  );
};

export default BoardColumn
