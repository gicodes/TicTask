"use client";

import { useEffect } from "react";
import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { Box, Typography, Card, CardContent, Grid, Stack } from "@mui/material";

export default function AnalyticsPage() {
  const { isAuthenticated } = useAuth();
  const { team, analytics, fetchAnalytics } = useTeam();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!isAuthenticated) return;

  const isPro = team?.subscription?.plan.includes("PRO");
  const isEnt = team?.subscription?.plan.includes("ENTERPRISE");

  if (!isPro || !isEnt) {
    return (
      <Card sx={{ maxWidth: 800}}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row'}} gap={2} justifyContent={'space-between'}>
            <Grid mb={4} gap={1}>
              <Typography variant="h6" fontWeight={700}>
                Upgrade to Pro
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Analytics is available on Pro and Enterprise plans.
              </Typography> 
            </Grid>
            
            <Button variant="contained">Upgrade</Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) return <Typography p={3}>Loading analytics...</Typography>;

  return (
    <Box maxWidth={800}>
      <Box>
        <Typography variant="h6" mb={3}>Analytics</Typography>

        { analytics && 
          <Grid container spacing={3}>
            <Grid>
              <Card><CardContent>Total: {analytics.totalTickets}</CardContent></Card>
            </Grid>
            <Grid>
              <Card><CardContent>Completed: {analytics.completedTickets}</CardContent></Card>
            </Grid>
            <Grid>
              <Card><CardContent>Open: {analytics.openTickets}</CardContent></Card>
            </Grid>
            <Grid>
              <Card><CardContent>Members: {analytics.membersCount}</CardContent></Card>
            </Grid>
          </Grid>
        }
      </Box>
    </Box>
  );
}
