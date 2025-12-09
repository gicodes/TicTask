'use client';

import { motion } from 'framer-motion';
import { useTickets } from '@/providers/tickets';
import { TrendingUp, TaskAlt, Schedule, People } from '@mui/icons-material';
import { Stack, Typography, Card, CardContent, LinearProgress, Grid } from '@mui/material';
import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';
import GenericGridPageLayout from '../_level_1/genGridPageLayout';

export default function MetricsPage() {
  const { tickets } = useTickets() || { tickets: [] };

  const totalTickets = tickets.length;
  const completedTickets = tickets.filter(t => t.status === 'RESOLVED').length;
  const activeTickets = tickets.filter(t => t.status === 'IN_PROGRESS' || t.status === 'OPEN').length;
  const uniqueProjects = new Set(tickets.map(t => t.id)).size || 0;
  const teamMembers = new Set(tickets.map(t => t.assignedTo)).size || 0;

  const completedRate = totalTickets > 0 ? (completedTickets / totalTickets) * 100 : 0;
  const activeRate = totalTickets > 0 ? (activeTickets / totalTickets) * 100 : 0;

  const teamEfficiency = completedRate * 0.8 + (100 - activeRate) * 0.2;
  const collaborationScore = teamMembers
    ? Math.min(100, (completedTickets / teamMembers) * 10) : 0;

  const metrics = [
    { label: 'Completed Tasks', value: Math.round(completedRate), icon: <TaskAlt /> },
    { label: 'Active Projects', value: uniqueProjects * 10 > 100 ? 100 : uniqueProjects * 10, icon: <Schedule /> },
    { label: 'Team Efficiency', value: Math.round(teamEfficiency), icon: <TrendingUp /> },
    { label: 'Collaboration Score', value: Math.round(collaborationScore), icon: <People /> },
  ];

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
