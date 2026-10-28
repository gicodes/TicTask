import React from 'react';
import TicketCard from './boardTCard';
import { Draggable } from '@hello-pangea/dnd';
import { BOARD_COLUMN } from '../../_level_1/tSchema';
import { Badge, Box, Typography } from '@mui/material';
import { ColumnSkeleton, TicketCardSkeleton } from '../ticketCardSkeleton';

export const BoardColumn: React.FC<BOARD_COLUMN> = ({ 
  loading,
  title, 
  tickets, 
  onOpen 
}) => {
  if (loading) return <ColumnSkeleton />

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
      
      {tickets.length < 1 && <TicketCardSkeleton />}
      {tickets.map((ticket, index) => (
        <Draggable
          key={ticket.id}
          draggableId={String(ticket.id)}
          index={index}
          isDragDisabled={false} // future releases would have isDragDisabled tied to user-workspace preferences
        >
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              my={{ xs: 3, sm: 4, lg: 5 }}
              sx={{
                opacity: snapshot.isDragging ? 0.9 : 1,
                transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
                boxShadow: snapshot.isDragging ? 6 : 0,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <TicketCard ticket={ticket} onOpen={onOpen} />
            </Box>
          )}
        </Draggable>
      ))}
    </Box>
  );
};

export default BoardColumn;
