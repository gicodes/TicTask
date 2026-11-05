import React from 'react';
import TicketCard from './boardTCard';
import { Draggable } from '@hello-pangea/dnd';
import { BOARD_COLUMN } from '../../_level_1/tSchema';
import { Badge, Box, Typography, Pagination } from '@mui/material';
import { ColumnSkeleton, TicketCardSkeleton } from '../ticketCardSkeleton';

const PAGE_SIZE = 5;

export const BoardColumn: React.FC<BOARD_COLUMN & {
  page: number;
  onPageChange: (page: number) => void;
}> = ({ 
  loading,
  title, 
  tickets, 
  onOpen,
  page,
  onPageChange,
}) => {
  if (loading) return <ColumnSkeleton />;

  const pageCount = Math.ceil((tickets?.length || 0) / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedTickets = tickets.slice(start, start + PAGE_SIZE);

  return (
    <Box 
      px={1} 
      mr={1}
      mt={{ sm: 2 }}
      maxWidth={360}
      minWidth={{ xs: 300, sm: 234, md: 250 }}
      sx={{ display: 'flex', flexDirection: 'column', minHeight: 480 }}
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
        <Badge sx={{ display: { xs: 'none', sm: 'flex' }, pl: 2, gap: 2 }}>
          <span>▿</span> {title === 'IN_PROGRESS' ? 'IN PROGRESS' : title}
        </Badge>
        <span style={{ fontWeight: 500, color: 'gray', display: 'flex', gap: 5 }}>
          <Badge sx={{ display: { xs: 'none', sm: 'flex' } }}>
            ({tickets?.length ?? 0})
          </Badge>
        </span>
      </Typography>
      
      {paginatedTickets.length < 1 && tickets.length < 1 && <TicketCardSkeleton />}

      {paginatedTickets.map((ticket, index) => (
        <Draggable
          key={ticket.id}
          draggableId={String(ticket.id)}
          index={index}
          isDragDisabled={false}
        >
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              my={{ xs: 1, lg: 2 }}
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

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5, mt: 'auto' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            size="small"
            color="standard"
          />
        </Box>
      )}
    </Box>
  );
};

export default BoardColumn;