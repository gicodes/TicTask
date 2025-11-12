'use client';

import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
} from 'react';
import moment from 'moment';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import ViewSelect from './calViewSelect';
import NavControls from './calNavControls';
import CalendarSkeleton from './calSkeleton';
import EventRenderer, { TicketEvent } from './calEventRenderer';
import { PlannerCalendarProps, PlannerEvent } from '@/types/planner';

export type InternalView = View | 'thisWeek';

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop<PlannerEvent, object>(BigCalendar);


const PlannerCalendar: React.FC<PlannerCalendarProps> = ({
  tasks,
  onSelectTask,
  onDateChange,
  onSelectSlot,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [internalView, setInternalView] = useState<InternalView>('week');
  const [loading, setLoading] = useState(true);

  const hasInitialised = useRef(false);
  const hasSetMobileView = useRef(false);

  useEffect(() => {
    if (isMobile && !hasSetMobileView.current) {
      setInternalView('day');
      hasSetMobileView.current = true;
    } else if (!isMobile) {
      hasSetMobileView.current = false;
    }
  }, [isMobile]);

  useEffect(() => {
    if (!hasInitialised.current) {
      setInternalView('thisWeek');
      setCurrentDate(moment().startOf('week').toDate());
      hasInitialised.current = true;
    }
  }, []);

  useEffect(() => {
    if (!tasks) return;
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), Math.min(tasks.length * 10, 1000));
    return () => clearTimeout(timeout);
  }, [tasks]);

  const bigCalendarView = useMemo<View>(
    () => (internalView === 'thisWeek' ? 'week' : internalView),
    [internalView]
  );

  const handleNavigate = useCallback(
    (direction: 'PREV' | 'NEXT' | 'TODAY') => {
      const m = moment(currentDate);
      if (direction === 'TODAY') {
        setCurrentDate(moment().toDate());
        if (internalView === 'thisWeek') setInternalView('thisWeek');
        return;
      }

      const unit =
        bigCalendarView === 'month'
          ? 'month'
          : bigCalendarView === 'week'
          ? 'week'
          : 'day';

      const newDate = direction === 'PREV' ? m.subtract(1, unit) : m.add(1, unit);
      setCurrentDate(newDate.toDate());
      if (internalView === 'thisWeek') setInternalView('week');
    },
    [currentDate, bigCalendarView, internalView]
  );

  const handleViewChange = useCallback((val: InternalView) => {
    setInternalView(val);
    if (val === 'thisWeek') {
      setCurrentDate(moment().startOf('week').toDate());
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') handleNavigate('PREV');
    if (e.key === 'ArrowRight') handleNavigate('NEXT');
    if (e.key === 't' || e.key === 'T') handleNavigate('TODAY');
  };

  const [eventsState, setEventsState] = useState<PlannerEvent[]>([]);

  useEffect(() => {
    if (tasks?.length) {
      const mapped = tasks.map((t) => ({
        id: t.id,
        title: t.title,
        start: new Date(t.dueDate!),
        end: new Date(new Date(t.dueDate!).getTime() + 60 * 60 * 1000),
        status: t.status,
        priority: t.priority,
      }));
      setEventsState(mapped);
    }
  }, [tasks]);

  const onEventDrop = useCallback(
    ({ event, start, end }: { event: PlannerEvent; start: Date | string; end: Date | string}) => {
      setEventsState((prev) =>
        prev.map((ev) =>
          ev.id === event.id
            ? { ...ev, start, end }
            : ev
        )
      );
      onDateChange?.(start, end);
    },
    [onDateChange]
  );

  const headerTitle = useMemo(() => {
    const m = moment(currentDate);
    if (bigCalendarView === 'month') return m.format('MMMM YYYY');
    if (bigCalendarView === 'week' && internalView === 'thisWeek') return 'This Week';
    return isMobile ? m.format('MMM D, YY') : m.format('MMMM D, YYYY');
  }, [currentDate, bigCalendarView, internalView, isMobile]);

  const eventPropGetter = useCallback((event: TicketEvent) => {
    const colors: Record<string, string> = {
      URGENT: 'var(--danger)',
      HIGH: 'var(--error)',
      MEDIUM: 'var(--accent)',
      LOW: 'var(--secondary)',
    };
    return {
      style: {
        backgroundColor: colors[event.priority ?? 'MEDIUM'],
        border: 'none',
        borderRadius: 6,
        padding: '8px 8px',
        fontSize: '0.85rem',
        fontWeight: 600,
        maxWidth: 220,
      },
    };
  }, []);

  const calendarStyle = {
    height: '100%',
    overflow: 'hidden',

    '@media (max-width: 900px)': {
      overflowX: 'auto',
      maxWidth: '96vw',
      width: '100%',
      '& .rbc-calendar': { minWidth: '735px' },
    },
    '& .rbc-calendar': { minHeight: '90vh', cursor: 'default' },

    '& .rbc-toolbar': { display: 'none'},
    '& .rbc-header': {
      height: 60,
      fontSize: 20,
      alignContent: 'center',
    },
    '& .rbc-off-range-bg': {},
    '& .rbc-time-view': {},
    '& .rbc-time-gutter': {},
    '& .rbc-timeslot-group': {
      padding: '0 10px',
      display: 'grid',
      alignContent: 'center',
    },
    '& .rbc-time-slot': {
      background: 'var(--surface-1)'
    },
    '& .rbc-time-slot.rbc-now': {
      background: 'var(--accent)'
    },
    '& .rbc-time-header': {
      height: 60,
    },
    '& .rbc-current-time-indicator': {
      background: 'var(--accent)'
    },
    '& .rbc-event': {},
    '& .rbc-event-content': {
      height: 'fit-content',
      width: 'auto',
    },
    '& .rbc-date-cell': {},
    '& .rbc-row-bg': {},
    '& .rbc-month-view': {},
    '& .rbc-allday-cell': {},
  };

  return (
    <Box
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{ outline: 'none' }}
      aria-label="Planner calendar"
    >
      <Box
        display="flex"
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ py: 2, px: { xs: 1, md: 0 }, gap: { xs: 2, sm: 0 } }}
      >
        <ViewSelect
          internalView={internalView}
          onChange={handleViewChange}
          hasThisWeek={hasInitialised.current}
        />
        <NavControls
          headerTitle={headerTitle}
          onPrev={() => handleNavigate('PREV')}
          onNext={() => handleNavigate('NEXT')}
          onToday={() => handleNavigate('TODAY')}
        />
      </Box>

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <Box sx={calendarStyle}>
          <DnDCalendar
            localizer={localizer}
            events={eventsState}
            startAccessor={(ev) => new Date(ev.start)}
            endAccessor={(ev) => new Date(ev.end)}
            date={currentDate}
            view={bigCalendarView}
            onView={(v) => setInternalView(v as InternalView)}
            onNavigate={(d) => setCurrentDate(d)}
            selectable
            onSelectSlot={(slot) => onSelectSlot?.(slot)}
            onSelectEvent={(ev) => onSelectTask(String((ev as PlannerEvent).id))}
            onRangeChange={(range) => {
              if (!Array.isArray(range)) onDateChange?.(range.start, range.end);
            }}
            eventPropGetter={eventPropGetter}
            components={{ event: EventRenderer }}
            onEventDrop={onEventDrop}
            style={{ fontFamily: theme.typography.fontFamily }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PlannerCalendar;
