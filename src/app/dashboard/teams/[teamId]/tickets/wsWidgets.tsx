'use client';

import { TeamWidgets } from '@/types/team';
import {
  Grid,
  Box,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';

function StatCard({
  label, value,
}: {
  label: string;
  value: number;
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
        minWidth: 80,
        borderRadius: 4,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isLight ? 0.9 : 0.4
        ),
        border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
        textAlign: 'center',
        height: 'auto', 
        maxHeight: { xs: 70, sm: 80},
        display: 'grid'
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
}

export default function WorkspaceWidgets({
  total,
  overdue,
  dueToday,
  inProgress,
  createdThisWeek,
  completed,
}: TeamWidgets) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        maxWidth: 1000,
      }}
      mx={{ xs: 'auto', sm: 0}} 
      justifyContent={{ xs: 'center', sm: 'left'}}
    >
      <Grid>
        <StatCard label="Total" value={total} />
      </Grid>
      <Grid>
        <StatCard label="In Progress" value={inProgress} />
      </Grid>
      <Grid>
        <StatCard label="Completed" value={completed} />
      </Grid>
      <Grid>
        <StatCard label="Overdue" value={overdue} />
      </Grid>
      <Grid>
        <StatCard label="Due Today" value={dueToday} />
      </Grid>
      <Grid>
        <StatCard label="This Week" value={createdThisWeek} />
      </Grid>
    </Grid>
  );
}
