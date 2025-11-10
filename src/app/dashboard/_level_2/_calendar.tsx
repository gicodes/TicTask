'use client';

import moment from 'moment';
import { useMemo, useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PlannerCalendarProps, PlannerEvent } from '@/types/planner';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';
import { Box, Button, IconButton, Stack, Typography, useTheme,} from '@mui/material';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../_level_0/calendar.module.css';

const localizer = momentLocalizer(moment);

const capitalizeView = (v: string) =>
  v.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const PlannerCalendar: React.FC<PlannerCalendarProps> = ({
  tasks,
  onSelectTask,
  onDateChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<View>('month');

  const hasSetMobileView = useRef(false);

  useEffect(() => {
    if (isMobile && !hasSetMobileView.current) {
      setActiveView('day');
      hasSetMobileView.current = true;
    } else if (!isMobile) {
      hasSetMobileView.current = false;
    }
  }, [isMobile]);

  const events = useMemo<PlannerEvent[]>(
    () =>
      tasks
        ?.filter((t) => t.dueDate)
        .map((t) => {
          const start = new Date(t.dueDate!);
          const end = new Date(start.getTime() + 60 * 60 * 1000);
          return {
            id: t.id,
            title: t.title,
            start,
            end,
            allDay: false,
            status: t.status,
            priority: t.priority,
          };
        }) || [],
    [tasks]
  );

  const handleNavigate = (direction: 'PREV' | 'NEXT' | 'TODAY') => {
    const m = moment(currentDate);

    if (direction === 'TODAY') {
      setCurrentDate(moment().toDate());
      return;
    }

    const unit =
      activeView === 'month' ? 'month' :
      activeView === 'week' ? 'week' : 'day';

    const newDate =
      direction === 'PREV' ? m.subtract(1, unit) : m.add(1, unit);

    setCurrentDate(newDate.toDate());
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',

        '@media (max-width: 900px)': {
          overflowX: 'auto',
          maxWidth: '96vw',
          width: '100%',
          '& .rbc-calendar': {
            minWidth: '777px',
            width: '100%',
          },
        },
        
        '& .rbc-calendar': { // calendar base
          minHeight: '90vh',
          cursor: 'default',
        },
        '& .rbc-toolbar': {
          display: 'none', // hide default toolbar
        },
        '& .rbc-header': { // headers
          height: '50px',
          alignContent: 'center',
          backgroundColor: 'var(--surface-2)',
          color: 'var(--foreground)',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '0.8rem',
        },
        '& .rbc-off-range-bg': {
          backgroundColor: 'var(--disabled)',
          color: 'inherit'
        },
        '& .rbc-today': {
          backgroundColor: 'var(--flair)',
          color: 'var(--foreground)'
        },
        '& .rbc-time-view': { // time grid - week/ day
          borderTop: '1px solid var(--disabled)',
          color: 'var(--foreground)',
          background: 'var(--background)',
          borderRadius: '8px',
          padding: '6px',
        },
        '& .rbc-time-gutter': {
          backgroundColor: 'var(--surface-1)',
          color: 'inherit',
          fontSize: '0.75rem',
          fontWeight: 500,
          width: '70px',
          border: '1px solid var(--border)',
        },
        '& .rbc-timeslot-group': {
          textAlign: 'center',
          minHeight: '60px',
          border: '1px dashed var(--divider)',
        },
        '& .rbc-time-slot': {
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'var(--surface-hover)',
          },
        },
        '& .rbc-time-slot.rbc-now': {
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          borderLeft: '3px solid var(--error)',
        },
        '& .rbc-time-header': {
          alignContent: 'center',
          color: 'var(--foreground)',
          backgroundColor: 'var(--surface-2)',
          border: '1px solid var(--divider)',
        },
        '& .rbc-time-content': {
          borderTop: 'none',
          backgroundColor: 'inherit',
          color: 'inherit'
        },
        '& .rbc-current-time-indicator': {
          backgroundColor: 'var(--error)',
          height: '2px',
        },
        '& .rbc-event': {
          borderRadius: '6px',
          margin: '4px',
          padding: '12px 8px',
          cursor: 'pointer',
          transition: 'transform 0.1s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            backgroundColor: 'var(--surface-hover)',
          },
        },
        '& .rbc-event-content': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        '& .rbc-date-cell': {
          fontWeight: 500,
          color: 'var(--foreground-muted)',
        },
      }}
    >
      <Stack
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        sx={{
          py: 2,
          px: 0,
          borderBottom: 1,
          gap: { xs: 2, sm: 0 },
          borderColor: 'divider',
        }}
      >
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center" 
          flexWrap={'wrap'}
          mx={{ xs: 'auto', md: 0}}
        >
          <Stack direction="row">
            <IconButton onClick={() => handleNavigate('PREV')}>
              <ChevronLeft size={20} />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {moment(currentDate).format(
                activeView === 'month' ? 'MMMM YYYY' : 'MMMM D, YYYY'
              )}
            </Typography>
            <IconButton onClick={() => handleNavigate('NEXT')}>
              <ChevronRight size={20} />
            </IconButton>
          </Stack>
          <Button
            variant="contained"
            sx={{ 
              color: 'inherit',
              bgcolor: 'inherit',
              border: '2px solid var(--flair)', 
              height: 36
            }}
            onClick={() => handleNavigate('TODAY')}
          >
            Today
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} mx={{ xs: 'auto', md: 0}}>
          {(['month', 'week', 'day'] as View[]).map((view) => (
            <Button
              key={view}
              size="small"
              onClick={() => setActiveView(view)}
              sx={{ bgcolor: 'var(--surface-1)', borderColor: 'inherit', color: 'var(--foreground)'}}
              variant={activeView === view ? 'outlined' : 'contained'}
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
        date={currentDate}
        view={activeView}
        onView={(v) => setActiveView(v)}
        onNavigate={(date) => setCurrentDate(date)}
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
              ? 'var(--accent)'
              : event.priority === 'LOW'
              ? 'var(--secondary)'
              : 'var(--surface-2)';
          return {
            style: {
              backgroundColor: baseColor,
              maxWidth: 180,              
              borderRadius: '6px',
              color: 'inherit',
              border: 'none',
              padding: '12px 6px',
              fontSize: '0.8rem',
              fontWeight: 500,
            },
          };
        }}
        style={{ fontFamily: theme.typography.fontFamily,}}
      />
    </Box>
  );
};

export default PlannerCalendar;
