'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTickets } from '@/providers/tickets';
import { Stack, Typography, Card, CardContent, LinearProgress, Grid } from '@mui/material';
import GenericGridPageLayout from '../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';
import { TrendingUp, TaskAlt, Schedule, People } from '@mui/icons-material';

export default function MetricsPage() {
  const { tickets } = useTickets() || { tickets: [] };

  const metrics = useMemo(() => {
    const totalTickets = tickets.length;

    const completedTickets = tickets.filter(
      t => t.status === 'RESOLVED' || t.status === 'CLOSED'
    ).length;

    const activeTickets = tickets.filter(
      t => t.status === 'IN_PROGRESS' || t.status === 'OPEN'
    ).length;

    const uniqueProjects = new Set(
      tickets.map(t => t.status)
    ).size;

    const teamMembers = new Set(
      tickets.map(t => t.assignedTo)
    ).size;

    const completedRate =
      totalTickets ? (completedTickets / totalTickets) * 100 : 0;

    const activeRate =
      totalTickets ? (activeTickets / totalTickets) * 100 : 0;

    const teamEfficiency =
      completedRate * 0.8 + (100 - activeRate) * 0.2;

    const collaborationScore = teamMembers
      ? Math.min(100, (completedTickets / teamMembers) * 10)
      : 0;

    return [
      { label: 'Completed Tasks', value: Math.round(completedRate), icon: <TaskAlt /> },
      {
        label: 'Active Projects',
        value: Math.min(100, uniqueProjects * 10),
        icon: <Schedule />,
      },
      {
        label: 'Work Efficiency',
        value: Math.round(teamEfficiency),
        icon: <TrendingUp />,
      },
      {
        label: 'Collaboration Score',
        value: Math.round(collaborationScore),
        icon: <People />,
      },
    ];
  }, [tickets]);

  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title="Performance Metrics"
        description="Track your team&apos;s productivity and project progress in real time."
      />

      <Card sx={{ py: 5, px: 2 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Grid container spacing={3}>
            {metrics.map((item, i) => (
              <Grid key={i} mx={'auto'} minWidth={300}>
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
    </GenericGridPageLayout>
  );
}
