import { Stack, IconButton, Typography, Button } from '@mui/material';
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
        variant="outlined"
        onClick={onToday}
        sx={{
          height: { xs: 36, md: 40},
          border: '1px solid #B9D9EB',
          fontWeight: 501,
          fontSize: { xs: 14, md: 15},
          textTransform: 'none',
          color:'var(--bw)'
        }}
        className='btn'
      >
        See Today
      </Button>
    </Stack>
  );
}