import { Box, Skeleton } from '@mui/material';

export const calendarStyle = {
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
  '& .rbc-timeslot-group': {
    padding: '0 10px',
    display: 'grid',
    alignContent: 'center',
  },
  '& .rbc-time-slot.rbc-now': { background: 'var(--accent)' },
  '& .rbc-time-header': { height: 60 },
  '& .rbc-current-time-indicator': { background: 'var(--accent)' },
  '& .rbc-event-content': {
    height: 'fit-content',
    width: 'auto',
  },
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


export default function CalendarSkeleton() {
  return (
    <Box px={2} py={2}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={50}
          width="100%"
          sx={{ my: 1, borderRadius: 1 }}
          animation="wave"
        />
      ))}
    </Box>
  );
}
