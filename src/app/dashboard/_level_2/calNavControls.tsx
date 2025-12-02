import { Button } from '@/assets/buttons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Stack, IconButton, Typography, Tooltip } from '@mui/material';

export default function NavControls({
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
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" flexWrap="wrap">
      <Stack direction="row" alignItems="center" sx={{ gap: { sm: 1 } }}>
        <Tooltip title={prevTip}>
          <IconButton aria-label="previous" onClick={onPrev}>
            <ChevronLeft size={25} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Display and toggles according to your set view">
          <Typography
            variant="h6"
            minWidth={75}
            fontSize={{ xs: 15, sm: 18 }}
            sx={{ fontWeight: 600, textAlign: 'center' }}
          >
            {calControlDes}
          </Typography>
        </Tooltip>

        <Tooltip title={nextTip}>
          <IconButton aria-label="next" onClick={onNext}>
            <ChevronRight size={25} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Tooltip title={`${new Date().toDateString()}`}>
        <div>
          <Button
            size="small"
            tone="retreat"
            variant="outlined"
            onClick={onToday}
            sx={{ color: 'var(--accent)', padding: '0 20px' }}
          >
            See Today
          </Button>
        </div>
      </Tooltip>
    </Stack>
  );
}
