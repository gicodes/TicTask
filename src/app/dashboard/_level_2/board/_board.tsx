'use client';

import { Ticket } from '@/types/ticket';
import BoardColumn from './boardColumn';
import React, { useMemo } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import {
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import { unknown } from 'zod';
import { KANBAN_BOARD_PROPS } from '../_level_1/tSchema';

export default function Board({
  grouped,
  setGrouped,
  openDetail,
  isSearching,
  updateTicket,
}: KANBAN_BOARD_PROPS) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmxMd = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isSmOrLarger = !isXs;

  const STATUSES = Object.keys(grouped);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [startIndex, setStartIndex] = React.useState(0);

  const visibleCount = isXs ? 1 : isSmxMd ? 2 : 3;
  const visibleStatusesRaw = isSearching
    ? STATUSES.filter((status) => grouped[status]?.length > 0)
    : STATUSES;

  const visibleStatuses = useMemo(() => {
    if (isXs) {
      return [visibleStatusesRaw[activeIndex] || visibleStatusesRaw[0] || 'OPEN'];
    }
    return visibleStatusesRaw.slice(startIndex, startIndex + visibleCount);
  }, [isXs, visibleStatusesRaw, activeIndex, startIndex, visibleCount]);

  const handlePrevColumns = () =>
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));

  const handleNextColumns = () =>
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, STATUSES.length - visibleCount)
    );

  const handleDragEnd = (result: DropResult) => {
    if (isXs) return;

    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus && source.index === destination.index) return;

    setGrouped((prev) => {
      const newGrouped = structuredClone(prev);

      newGrouped[sourceStatus] ??= [];
      newGrouped[destStatus] ??= [];

      const [movedTicket] = newGrouped[sourceStatus].splice(source.index, 1);

      if (movedTicket.status !== destStatus) {
        updateTicket(movedTicket.id, { status: destStatus as Ticket['status'] });
      }

      newGrouped[destStatus].splice(destination.index, 0, movedTicket);

      return newGrouped;
    });
  };

  const prevStatuses = STATUSES.slice(Math.max(0, startIndex - visibleCount), startIndex);
  const nextStatuses = STATUSES.slice(startIndex + visibleCount);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        overflow: 'hidden', 
        maxWidth: { xs: '96vw', sm: 'none'} 
      }}
    >
      {isXs && (
        <Tabs
          value={activeIndex}
          onChange={(_, v) => setActiveIndex(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mt: 2 }}
        >
          {visibleStatusesRaw.map((status, idx) => (
            <Tab
              key={status}
              label={
                status === 'IN_PROGRESS'
                  ? `IN PROGRESS (${grouped[status]?.length ?? 0})`
                  : `${status} (${grouped[status]?.length ?? 0})`
              }
              value={idx}
            />
          ))}
        </Tabs>
      )}

      <DragDropContext onDragEnd={isSmOrLarger ? handleDragEnd : unknown as typeof handleDragEnd}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          {!isXs && startIndex > 0 && (
            <Box mr={5}>
              <Box sx={{ position: 'absolute', left: 0, top: 16, zIndex: 10 }}>
                <Tooltip title={`See ${prevStatuses.join(', ').toLowerCase()}`}>
                  <IconButton onClick={handlePrevColumns}>
                    <ChevronLeftIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}

          {visibleStatuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: isXs ? 1 : '1 0 0',
                    mx: isXs ? 2 : 1,
                  }}
                >
                  <BoardColumn
                    title={status}
                    tickets={grouped[status] || []}
                    onOpen={openDetail}
                    isDragDisabled={isXs}
                  />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}

          {!isXs && startIndex + visibleCount < STATUSES.length && (
            <Box sx={{ position: 'absolute', right: 0, top: 16, zIndex: 10 }}>
              <Tooltip title={`See ${nextStatuses.join(', ').toLowerCase()}`}>
                <IconButton onClick={handleNextColumns}>
                  <ChevronRightIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </DragDropContext>
    </Box>
  );
}
