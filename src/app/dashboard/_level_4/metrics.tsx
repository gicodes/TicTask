'use client';

import { motion } from 'framer-motion';
import { Box, Stack, Typography, Card, CardContent, LinearProgress, Grid } from '@mui/material';
import { TrendingUp, TaskAlt, Schedule, People } from '@mui/icons-material';

export default function MetricsPage() {
  const metrics = [
    { label: 'Completed Tasks', value: 85, icon: <TaskAlt /> },
    { label: 'Active Projects', value: 60, icon: <Schedule /> },
    { label: 'Team Efficiency', value: 72, icon: <TrendingUp /> },
    { label: 'Collaboration Score', value: 90, icon: <People /> }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="900px" mx="auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}  sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              Performance Metrics
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Track your team’s productivity and project progress in real time.
            </Typography>
          </Stack>
        </motion.div>

        <Card sx={{ p: 2}}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Grid container spacing={3}>
              {metrics.map((item, i) => (
                <Grid key={i} minWidth={300} mx={'auto'}>
                  <Card sx={{ borderRadius: 4, boxShadow: '0 4px 18px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          {item.icon}
                          <Typography fontWeight={600}>{item.label}</Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={item.value} sx={{ height: 8, borderRadius: 10 }} />
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          {item.value}%
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Card>
      </Stack>
    </Box>
  );
}
