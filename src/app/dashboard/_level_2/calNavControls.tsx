import { Button } from '@/assets/buttons';
import { Stack, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavControls({
  headerTitle,
  onPrev,
  onNext,
  onToday,
}: {
  headerTitle: string;
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
        <Typography 
          variant="h6" 
          minWidth={75}
          fontSize={{xs: 15, sm: 18}}
          sx={{ fontWeight: 600, textAlign: 'center' }}
        >
          {headerTitle}
        </Typography>
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
