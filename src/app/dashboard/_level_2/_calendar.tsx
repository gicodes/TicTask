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
import { format, isSameMonth, isSameYear, addDays } from 'date-fns';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import NavControls from './calNavControls';
import CalendarSkeleton from './calSkeleton';
import ViewSelect from './calViewSelect';
import EventRenderer, { TicketEvent } from './calEventRenderer';
import { PlannerCalendarProps, PlannerEvent } from '@/types/planner';

export type InternalView = View | 'thisWeek';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<PlannerEvent, object>(BigCalendar);

const LOCAL_VIEW_KEY = 'plannerView';

const PlannerCalendar: React.FC<PlannerCalendarProps> = ({
  tasks,
  onSelectTask,
  onDateChange,
  onSelectSlot,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [eventsState, setEventsState] = useState<PlannerEvent[]>([]);
  const [internalView, setInternalView] = useState<InternalView>('week');

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
    if (hasInitialised.current) return;

    const saved = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_VIEW_KEY) : null;
    if (saved && (saved === 'day' || saved === 'week' || saved === 'month' || saved === 'thisWeek')) {
      if (isMobile) {
        setInternalView('day');
      } else setInternalView(saved as InternalView);

      if (saved === 'thisWeek') setCurrentDate(new Date());
    } else {
      setInternalView('thisWeek');
      setCurrentDate(new Date());
    }

    hasInitialised.current = true;
  }, [isMobile]);

  useEffect(() => {
    if (!tasks) return;
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), Math.min(tasks.length * 10, 1000));
    return () => clearTimeout(timeout);
  }, [tasks]);

  useEffect(() => {
    if (!tasks?.length) {
      setEventsState([]);
      return;
    }

    const mapped = tasks.map((t) => ({
      id: t.id,
      title: t.title,
      start: new Date(t.dueDate!),
      end: new Date(new Date(t.dueDate!).getTime() + 60 * 60 * 1000),
      status: t.status!,
      priority: t.priority!,
    }));
    setEventsState(mapped);
  }, [tasks]);

  const bigCalendarView = useMemo<View>(
    () => (internalView === 'thisWeek' ? 'week' : (internalView as View)),
    [internalView]
  );

  const handleNavigate = useCallback(
    (direction: 'PREV' | 'NEXT' | 'TODAY') => {
      const m = moment(currentDate);

      if (direction === 'TODAY') {
        const today = moment().toDate();
        setCurrentDate(today);
        return;
      }

      if (internalView === 'thisWeek') {
        setInternalView('week');
        try {
          localStorage.setItem(LOCAL_VIEW_KEY, 'week');
        } catch {
        }
      }

      const unit =
        bigCalendarView === 'month' ? 'month' : bigCalendarView === 'week' ? 'week' : 'day';

      const newDate = direction === 'PREV' ? m.subtract(1, unit) : m.add(1, unit);
      setCurrentDate(newDate.toDate());
    },
    [currentDate, bigCalendarView, internalView]
  );

  const handleViewChange = useCallback((val: InternalView) => {
    setInternalView(val);

    try {
      localStorage.setItem(LOCAL_VIEW_KEY, val);
    } catch {
    }

    if (val === 'thisWeek') {
      setCurrentDate(new Date());
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') handleNavigate('PREV');
    if (e.key === 'ArrowRight') handleNavigate('NEXT');
    if (e.key === 't' || e.key === 'T') handleNavigate('TODAY');
  };

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

  const control = useMemo(() => {
    const date = new Date(currentDate);

    if (bigCalendarView === 'month') return format(date, isMobile ? 'MMM yyyy' : 'MMMM yyyy');

    if (bigCalendarView === 'week' && internalView === 'thisWeek') {
      const start = new Date();
      const end = addDays(start, 6);
      if (isSameMonth(start, end)) return `${format(start, 'MMM d')} - ${format(end, 'd')}`;
      if (isSameYear(start, end)) return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
      return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
    }

    if (bigCalendarView === 'week') {
      const start = currentDate;
      const end = addDays(start, 6);
      if (isSameMonth(start, end)) return `${format(start, 'MMM d')} - ${format(end, 'd')}`;
      if (isSameYear(start, end)) return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
      return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
    }

    return isMobile
      ? format(date, 'MMM d, yy')
      : format(date, 'MMMM d, yyyy');
  }, [currentDate, bigCalendarView, internalView, isMobile]);

  const eventPropGetter = useCallback((event: TicketEvent) => {
    const colors: Record<string, string> = {
      URGENT: '#b00020',
      HIGH: '#e53935',
      MEDIUM: '#ff9800',
      LOW: '#999',
    };

    return {
      style: {
        backgroundColor: colors[event.priority ?? 'LOW'],
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
    '& .rbc-toolbar': { display: 'none' },
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
    '& .rbc-time-slot': {},
    '& .rbc-time-slot.rbc-now': { background: 'var(--accent)' },
    '& .rbc-time-header': { height: 60 },
    '& .rbc-current-time-indicator': { background: 'var(--accent)' },
    '& .rbc-event': {},
    '& .rbc-event-content': {
      height: 'fit-content',
      width: 'auto',
    },
    '& .rbc-date-cell': {},
    '& .rbc-row-bg': {},
    '& .rbc-month-view': {},
    '& .rbc-allday-cell': {},
    '& .rbc-today': {
      fontWeight: 'bold',
      color: 'var(--accent)',
      background: 'var(--accent-light)',
    },
    '& .rbc-month-view .rbc-today': {
      border: '3px solid var(--accent)',
      borderRadius: 0,
      background: 'var(--accent-light)',
      color: 'var(--accent)',
      fontWeight: 700,
    },
    '& .rbc-today .rbc-day-slot': {
      fontWeight: 700,
    },
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
          calControlDes={control}
          onPrev={() => handleNavigate('PREV')}
          onNext={() => handleNavigate('NEXT')}
          onToday={() => handleNavigate('TODAY')}
          bigCalendarView={bigCalendarView}
        />
      </Box>

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <Box sx={calendarStyle}>
          <DnDCalendar
            localizer={localizer}
            events={eventsState}
            date={currentDate}
            view={bigCalendarView}
            endAccessor={(ev) => new Date(ev.end)}
            onView={(v) => {
              setInternalView(v as InternalView);
              try {
                localStorage.setItem(LOCAL_VIEW_KEY, v as string);
              } catch {
              }
            }}
            onNavigate={(d) => setCurrentDate(d)}
            selectable
            onSelectSlot={(slot) => onSelectSlot?.(slot)}
            onSelectEvent={(ev) => onSelectTask(String((ev as PlannerEvent).id))}
            onRangeChange={(range) => {
              if (!Array.isArray(range) && range && range.start && range.end) {
                onDateChange?.(range.start, range.end);
              }
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
