'use client';

import React, { useMemo, useState } from 'react';
import { Ticket } from '@/types/ticket';
import BoardColumn from './boardColumn';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  Tabs,
  Tab,
  Tooltip,
  useTheme,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { KANBAN_BOARD_PROPS } from '../../_level_1/tSchema';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

const PAGE_SIZE = 5;

export default function Board({
  loading,
  grouped,
  setGrouped,
  openDetail,
  isSearching,
  updateTicket,
}: KANBAN_BOARD_PROPS) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmxMd = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const STATUSES = Object.keys(grouped);

  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [columnPages, setColumnPages] = useState<Record<string, number>>({});

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

  const getPage = (status: string) => columnPages[status] ?? 1;

  const setPage = (status: string, page: number) =>
    setColumnPages((prev) => ({ ...prev, [status]: page }));

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

    // Convert page-local indices → real indices in the full column arrays
    const sourceOffset = (getPage(sourceStatus) - 1) * PAGE_SIZE;
    const destOffset = (getPage(destStatus) - 1) * PAGE_SIZE;

    const realSourceIndex = source.index + sourceOffset;
    const realDestIndex = destination.index + destOffset;

    if (sourceStatus === destStatus && realSourceIndex === realDestIndex) return;

    setGrouped((prev) => {
      const newGrouped = structuredClone(prev);

      newGrouped[sourceStatus] ??= [];
      newGrouped[destStatus] ??= [];

      const [movedTicket] = newGrouped[sourceStatus].splice(realSourceIndex, 1);

      if (movedTicket.status !== destStatus) {
        updateTicket(movedTicket.id, { status: destStatus as Ticket['status'] });
      }

      newGrouped[destStatus].splice(realDestIndex, 0, movedTicket);

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
        maxWidth: { xs: '96vw', sm: 'none' }, 
        borderRadius: 3,
        minHeight: '50vh',
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-start',
          }}
        >
          {!isXs && startIndex > 0 && (
            <Box mr={5}>
              <Box sx={{ position: 'absolute', left: 0, top: 16, zIndex: 10 }}>
                <Tooltip title={`See ${prevStatuses.join(', ').toLowerCase()}`}>
                  <IconButton onClick={handlePrevColumns}>
                    <ChevronLeft fontSize="large" />
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
                    height: '100%',
                  }}
                >
                  <BoardColumn
                    loading={loading}
                    title={status}
                    tickets={grouped[status] || []}
                    onOpen={openDetail}
                    page={getPage(status)}
                    onPageChange={(p) => setPage(status, p)}
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
                  <ChevronRight fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </DragDropContext>
    </Box>
  );
}