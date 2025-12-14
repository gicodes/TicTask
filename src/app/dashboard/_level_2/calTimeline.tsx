import { Button } from '@/assets/buttons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Stack, IconButton, Typography, Tooltip } from '@mui/material';

export default function CalendarTimeline({
  calControlDes,
  onPrev,
  onNext,
  onToday,
  bigCalendarView,
}: {
  calControlDes: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  bigCalendarView: 'day' | 'week' | 'month' | string;
}) {
  const prevTip =
    bigCalendarView === 'month'
      ? 'Previous Month'
      : bigCalendarView === 'week'
        ? 'Previous Week'
        : bigCalendarView === 'day'
          ? 'Previous Day'
          : 'Previous';
          
  const nextTip =
    bigCalendarView === 'month'
      ? 'Next Month'
      : bigCalendarView === 'week'
        ? 'Next Week'
        : bigCalendarView === 'day'
          ? 'Next Day'
          : 'Next';

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={1} 
      alignItems="center" 
      flexWrap="wrap"
      minHeight={{ xs: 50, sm: 'none'}}
    >
      <Stack 
        direction="row" 
        alignItems="center" 
        sx={{ gap: { sm: 1 } }}
      >
        <Tooltip title={prevTip}>
          <IconButton aria-label="previous" onClick={onPrev}>
            <ChevronLeft size={25} />
          </IconButton>
        </Tooltip>

        <Typography
          fontSize={{ xs: 14, md: 15, xl: 16 }}
          sx={{
            textAlign: 'center',
            width: '100%',
            maxWidth: { xs: 180, sm: 234, md: 250, lg: 300, xl: 360 },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            opacity: 0.75
          }}
        >
          {calControlDes}
        </Typography>

        <Tooltip title={nextTip}>
          <IconButton aria-label="next" onClick={onNext}>
            <ChevronRight size={25} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack display={{ xs: 'none', sm: 'flex'}}>
        <Tooltip title={`${new Date().toDateString()}`}>
          <div>
            <Button
              size="small"
              tone="warm"
              onClick={onToday}
            >
              See Today
            </Button>
          </div>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
