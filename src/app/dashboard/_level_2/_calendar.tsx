'use client';

import moment from 'moment';
import React, { useMemo } from 'react';
import { Ticket } from '@/types/ticket';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  View,
} from 'react-big-calendar';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../_level_1/calendar.module.css';

interface PlannerCalendarProps {
  tasks: Ticket[];
  onSelectTask: (id: string) => void;
  onDateChange?: (start: Date, end: Date) => void;
}

const localizer = momentLocalizer(moment);
const capitalizeView = (v: string) =>
  v.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const PlannerCalendar: React.FC<PlannerCalendarProps> = ({
  tasks,
  onSelectTask,
  onDateChange,
}) => {
  const theme = useTheme();

  const events = useMemo(
    () =>
      tasks
        ?.filter((t) => t.dueDate)
        .map((t) => ({
          id: t.id,
          title: t.title,
          start: new Date(t.dueDate!),
          end: new Date(t.dueDate!),
          allDay: true,
          status: t.status,
          priority: t.priority,
        })),
    [tasks]
  );

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
        '& .rbc-calendar': {
          minHeight: '85vh',
          fontFamily: theme.typography.fontFamily,
        },
        '& .rbc-toolbar': { display: 'none' },
        '& .rbc-month-view': {
          borderRadius: '8px',
          border: '0.1px solid var(--secondary)',
          background: theme.palette.background.default,
        },
        '& .rbc-header': {
          alignContent: 'center',
          height: '50px',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: theme.palette.text.secondary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        '& .rbc-date-cell': {
          fontSize: '0.85rem',
          fontWeight: 500,
          textAlign: 'right',
          padding: '4px 8px',
        },
        '& .rbc-off-range-bg': {
          backgroundColor: 'transparent',
        },
        '& .rbc-today': {
          backgroundColor: 'var(--info)',
          color: theme.palette.common.white,
        },
        '& .rbc-month-row': {
          minHeight: '100px',
        },
        '& .rbc-event': {
          borderRadius: '6px',
          padding: '2px 6px',
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          background: theme.palette.background.paper,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <IconButton onClick={() => (window as any).calendarRef?.onNavigate?.('PREV')}>
            <ChevronLeft size={20} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            {moment().format('MMMM YYYY')}
          </Typography>
          <IconButton onClick={() => (window as any).calendarRef?.onNavigate?.('NEXT')}>
            <ChevronRight size={20} />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={1}>
          {(['month', 'week', 'day'] as View[]).map((view) => (
            <Button
              key={view}
              size="small"
              variant={view === 'month' ? 'contained' : 'outlined'}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
              }}
            >
              {capitalizeView(view)}
            </Button>
          ))}
        </Stack>
      </Stack>

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        popup
        selectable
        onSelectEvent={(event) => onSelectTask(String(event.id))}
        onRangeChange={(range) => {
          if (Array.isArray(range)) return;
          onDateChange?.(range.start, range.end);
        }}
        eventPropGetter={(event) => {
          const baseColor =
            event.priority === 'URGENT'
              ? 'var(--danger)'
              : event.priority === 'HIGH'
              ? 'var(--error)'
              : event.priority === 'MEDIUM'
              ? 'var(--warm)'
              : event.priority === 'LOW'
              ? 'var(--secondary)'
              : 'var(--surface-2)';

          return {
            style: {
              backgroundColor: baseColor,
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 500,
              padding: '2px 6px',
              transition: 'all 0.2s ease',
            },
          };
        }}
      />
    </Box>
  );
};

export default PlannerCalendar;