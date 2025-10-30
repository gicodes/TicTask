'use client';

import BoardColumn from './boardColumn';
import { BoardProps } from '@/types/ticket';
import React, { useState, useMemo } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Box, useTheme, useMediaQuery, Tabs, Tab, IconButton, Tooltip } from '@mui/material';

export default function Board({ grouped, setGrouped, openDetail }: BoardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const STATUSES = Object.keys(grouped);
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));

  const visibleCount = isXs ? 1 : (isSm || isMd) ? 2 : 3;

  const handleNextColumns = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, STATUSES.length - visibleCount)
    );
  };

  const handlePrevColumns = () => setStartIndex((prev) => Math.max(prev - visibleCount, 0));

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus && source.index === destination.index) return;

    setGrouped((prev) => {
      const newGrouped = structuredClone(prev);
      const [moved] = newGrouped[sourceStatus].splice(source.index, 1);
      newGrouped[destStatus].splice(destination.index, 0, moved);
      return newGrouped;
    });
  };

  const visibleStatuses = useMemo(() => {
    if (isXs) return [STATUSES[activeIndex]];
    return STATUSES.slice(startIndex, startIndex + visibleCount);
  }, [isXs, STATUSES, startIndex, visibleCount, activeIndex]);

  const prevStatuses = STATUSES.slice(
    Math.max(0, startIndex - visibleCount), startIndex
  );

  const nextStatuses = STATUSES.slice(
    startIndex + visibleCount, startIndex + visibleCount * 2
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', maxWidth: '99vw' }}>
      {isXs && (
        <Tabs
          value={activeIndex}
          onChange={(_, v) => setActiveIndex(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ marginTop: 2}}
        >
          {STATUSES.map((status, idx) => (
            <Tab key={status} label={status==='IN_PROGRESS' ? 'IN PROGRESS' : status} value={idx} />
          ))}
        </Tabs>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            pb: 2,
          }}
        >
          {!isXs && startIndex > 0 && (
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Tooltip title={prevStatuses.length ? 
                `See ${prevStatuses.join(', ').toLowerCase()} tickets` : ''}
              >
                <IconButton onClick={handlePrevColumns}>
                  <ChevronLeftIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          { visibleStatuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
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
          {!isXs && startIndex + visibleCount < STATUSES.length && (
            <Box
              sx={{                
                marginTop: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Tooltip title={nextStatuses.length ? 
                `See ${nextStatuses.join(', ').toLowerCase()} tickets` : ''}
              >
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
