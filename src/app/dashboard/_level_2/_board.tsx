'use client';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Ticket } from '@/types/ticket';
import BoardColumn from './boardColumn';

export default function Board({
  grouped,
  setGrouped,
  openDetail,
}: {
  grouped: Record<string, Ticket[]>;
  setGrouped: (g: Record<string, Ticket[]>) => void;
  openDetail: (id: string | number) => void;
}) {
  const STATUSES = Object.keys(grouped);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus && source.index === destination.index) return;

    const updated = { ...grouped };
    const [movedTicket] = updated[sourceStatus].splice(source.index, 1);
    updated[destStatus].splice(destination.index, 0, movedTicket);

    setGrouped(updated);
  };

  return (
    <Box mb={5}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            pb: 2,
            gap: 2,
            display: 'flex',
            pt: { xs: 3, md: 0 },
            overflowX: 'auto',
            alignItems: 'flex-start',
          }}
        >
          {STATUSES.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: '0 0 320px',
                    borderRadius: 2,
                    p: 1,
                    bgcolor: 'transparent',
                  }}
                >
                  <BoardColumn
                    title={status}
                    tickets={grouped[status]}
                    onOpen={openDetail}
                  />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>

      <Stack
        sx={{
          my: 2,
          textAlign: 'center',
          color: 'text.secondary',
          gap: 2,
        }}
      >
        <Typography>Scroll horizontally to view more columns</Typography>
        <Divider />
      </Stack>
    </Box>
  );
}
