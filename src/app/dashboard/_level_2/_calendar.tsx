'use client';

import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
} from 'react';
import CalendarTimeline from './calTimeline';
import ViewSelect, { InternalView} from './calViewSelect';
import EventRenderer, { TicketEvent } from './calEventRenderer';
import { PlannerCalendarProps, PlannerEvent } from '@/types/planner';
import { getStatusColor, priorityColor, getTypeColor } from '../_level_1/tColorVariants';

import moment from 'moment';
import { format, addDays } from 'date-fns';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CalendarSkeleton, { calendarStyle } from '../_level_1/calendarStyle';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const LOCAL_VIEW_KEY = 'plannerView';
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

  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [eventsState, setEventsState] = useState<PlannerEvent[]>([]);
  const [internalView, setInternalView] = useState<InternalView>('week');
  const [ready, setReady] = useState(false); 

  const hasInitialised = useRef(false);
  const hasSetMobileView = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

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
      if (isMobile) setInternalView('day');
      else setInternalView(saved as InternalView);

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
      type: t.type,
      title: t.title,
      start: new Date(t.dueDate!),
      end: new Date(new Date(t.dueDate!).getTime() + 60 * 60 * 1000),
      status: t.status!,
      priority: t.priority!,
    }));

    setEventsState(mapped);
  }, [tasks]);

  const bigCalendarView = useMemo<View>(() => 
    internalView === 'thisWeek' 
      ? 'week' : (internalView as View)
  , [internalView]);

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
        } catch {}
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
    } catch {}

    if (val === 'thisWeek') setCurrentDate(new Date());
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') handleNavigate('PREV');
    if (e.key === 'ArrowRight') handleNavigate('NEXT');
    if (e.key === 't' || e.key === 'T') handleNavigate('TODAY');
  };

  const onEventDrop = useCallback(
    ({ event, start, end }: { event: PlannerEvent; start: Date | string; end: Date | string }) => {
      setEventsState((prev) =>
        prev.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev))
      );
      onDateChange?.(start, end);
    },
    [onDateChange]
  );

  const timeline = useMemo(() => {
    const date = new Date(currentDate);
    const start = currentDate;
    const end = addDays(start, 6);
    const currentYear = new Date().getFullYear();

    const mobileFormat = (d: Date) => {
      const year = d.getFullYear();
      return year === currentYear ? format(d, "EEE d MMM") : format(d, "d MMM, yyy");
    };

    const desktopFormat = (d: Date) => {
      const year = d.getFullYear();
      return year === currentYear ? format(d, "EEEE, d MMM") : format(d, "EEEE, d MMM, yyyy");
    };

    if (bigCalendarView === "month")
      return isMobile ? format(date, "MMM yyyy") : format(date, "MMMM yyyy");

    if (bigCalendarView === "week" && internalView === "thisWeek") {
      const today = new Date();
      const weekEnd = addDays(today, 6);

      if (isMobile) {
        const s = mobileFormat(today);
        const e = mobileFormat(weekEnd);
        return `${s} - ${e}`;
      }
      return `${desktopFormat(today)} - ${desktopFormat(weekEnd)}`;
    }

    if (bigCalendarView === "week") {
      if (isMobile) {
        const s = mobileFormat(start);
        const e = mobileFormat(end);
        return `${s} - ${e}`;
      }
      return `${desktopFormat(start)} - ${desktopFormat(end)}`;
    }

    return isMobile ? mobileFormat(date) : desktopFormat(date);
  }, [currentDate, bigCalendarView, internalView, isMobile]);

  const eventPropGetter = useCallback((event: TicketEvent) => {
    const todaysDate = new Date().toLocaleDateString();
    const dueDate = new Date(event.start || event.end).toLocaleDateString();

    const color = dueDate === todaysDate
      ? getStatusColor('TODAY').color : event.priority
      ? priorityColor(event.priority) : getTypeColor(event.type);

    return {
      style: {
        backgroundColor: color,
        border: 'none',
        borderRadius: 0,
        padding: '5px 10px',
        margin: '0 5px',
        fontSize: '0.85rem',
        fontWeight: 600,
        maxWidth: 250,
        height: 'auto',
        minHeight: 55,
        maxHeight: 75,
        transition: 'background-color 0.2s ease',
      },
    };
  }, []);

  return (
    <Box
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{ outline: 'none' }}
      aria-label="Planner calendar"
    >
      <Box
        py={2}
        px={{ xs: 1, md: 0 }}
        gap={1}
        display="flex"
        flexWrap={'wrap'}
        justifyContent={'space-between'}
      >
        <ViewSelect
          internalView={internalView}
          onChange={handleViewChange}
          hasThisWeek={hasInitialised.current}
        />
        <CalendarTimeline
          calControlDes={timeline}
          onPrev={() => handleNavigate('PREV')}
          onNext={() => handleNavigate('NEXT')}
          onToday={() => handleNavigate('TODAY')}
          bigCalendarView={bigCalendarView}
        />
      </Box>

      <Box sx={{ position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background: theme.palette.background.paper,
              opacity: 0.85,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CalendarSkeleton />
          </Box>
        )}
        <Box
          sx={{
            ...calendarStyle,
            visibility: ready ? 'visible' : 'hidden',
          }}
        >
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
                // do nothing for now
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
      </Box>
    </Box>
  );
};

export default PlannerCalendar;
