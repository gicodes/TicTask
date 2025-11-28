import React from 'react';
import TicketCard from './boardTCard';
import NoTickets from '../_level_1/tEmpty';
import { BOARD_COLUMN } from '../_level_1/tSchema';
import { Badge, Box, Typography } from '@mui/material';

export const BoardColumn: React.FC<BOARD_COLUMN> = ({ 
  title, 
  tickets, 
  onOpen 
}) => {
  if (!tickets) return <NoTickets />
    
  return (
    <Box 
      px={1} 
      mr={1}
      mt={{ sm: 2 }}
      maxWidth={360}
      minWidth={{ xs: 300, sm: 234, md: 250 }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          p: 1,
          gap: 1, 
          display: 'flex', 
          fontWeight: 700, 
          alignContent: 'center' 
        }}
      >
        <Badge sx={{ display: { xs: 'none', sm: 'flex' }, pl: 2, gap: 2}}>
          <span>▿</span> {title==='IN_PROGRESS' ? 'IN PROGRESS' : title}
        </Badge>
        <span style={{ fontWeight: 500, color: 'gray', display: 'flex', gap: 5 }}>
          <Badge sx={{ display: { xs: 'none', sm: 'flex'}}}>({tickets?.length})</Badge>
        </span>
      </Typography>
      
      {tickets?.map((t, i) => (
        <Box my={5} key={i}>
          <TicketCard ticket={t} onOpen={onOpen} />
        </Box>
      ))}
    </Box>
  );
};

export default BoardColumn;
