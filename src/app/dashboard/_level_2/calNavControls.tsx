import { Button } from '@/assets/buttons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Stack, IconButton, Typography, Tooltip } from '@mui/material';

export default function NavControls({
  todaysDate,
  onPrev,
  onNext,
  onToday,
}: {
  todaysDate: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" flexWrap="wrap">
      <Stack direction="row" alignItems="center" sx={{ gap: { sm: 1} }}>
        <IconButton aria-label="previous" onClick={onPrev}>
          <ChevronLeft size={25} />
        </IconButton>
        <Tooltip title="Displays today and toggles according to your view">
          <Typography 
            variant="h6" 
            minWidth={75}
            fontSize={{xs: 15, sm: 18}}
            sx={{ fontWeight: 600, textAlign: 'center' }}
          >
            {todaysDate}
          </Typography>
        </Tooltip>
        <IconButton aria-label="next" onClick={onNext}>
          <ChevronRight size={25} />
        </IconButton>
      </Stack>
       <Button
        size='small'
        tone='retreat'
        variant="outlined"
        onClick={onToday}
        sx={{ color: 'var(--accent)', padding: '0 20px'}}
      >
        See Today
      </Button>
    </Stack>
  );
}
