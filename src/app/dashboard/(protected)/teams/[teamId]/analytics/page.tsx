"use client";

import { useEffect, useState } from "react";
import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { TeamAnalKPICardProps } from "@/types/teamViewProps";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Skeleton,
  Chip,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  CheckCircleOutline,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";
import { NavbarAvatar } from "@/app/dashboard/_level_1/navItems";

const fmt = (n: number) => n.toLocaleString();

function Trend({ value }: { value: number }) {
  if (value === 0) return null;
  const up = value > 0;
  
  return (
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: up ? "success.main" : "error.main" }}>
      {up ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
      <Typography variant="caption" fontWeight={600}>
        {up ? "+" : ""}
        {value}%
      </Typography>
    </Stack>
  );
}

function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  loading,
}: TeamAnalKPICardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Box sx={{ color: "text.secondary", opacity: 0.7 }}>{icon}</Box>
        </Stack>
        {loading ? (
          <Skeleton width={80} height={36} />
        ) : (
          <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
            {value}
          </Typography>
        )}
        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          {trend !== undefined && <Trend value={trend} />}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { isAuthenticated } = useAuth();
  const { team, analytics, fetchAnalytics, loading } = useTeam();
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    fetchAnalytics({ range });
  }, [range]);

  if (!isAuthenticated) return null;

  const isPro = team?.subscription?.plan?.includes("PRO");
  const isEnt = team?.subscription?.plan?.includes("ENTERPRISE");

  if (!analytics || loading && team===null) return (
    <Box maxWidth={800} py={6} px={2}>
      <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6"> Loading... </Typography>
        </CardContent>
      </Card>
    </Box>
  );

  if (!loading && !isPro && !isEnt) return (
    <Box maxWidth={800} py={6} px={2}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="flex-start">
            <Box gap={2}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Unlock team analytics
              </Typography>
              <Typography color="text.secondary" maxWidth={480}>
                See resolution times, workload balance, trends, and member performance.
                Available on Pro and Enterprise.
              </Typography>
            </Box>
            <Button variant="contained" size="large">
              Upgrade to Pro
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box
      mx="auto"
      py={3}
      px={{ xs: 2, md: 3 }}
      sx={{
        overflowX: { xs: "auto", md: "visible" },
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0,0,0,0.2) transparent",
        "&::-webkit-scrollbar": {
          height: 6,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0,0,0,0.35)",
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={4}
      >
        <Stack gap={1} pb={1}>
          <Typography variant="h5" fontWeight={700}>
            Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {team?.name} · performance & workload
          </Typography>
        </Stack>

        <ToggleButtonGroup
          value={range}
          exclusive
          size="small"
          onChange={(_, v) => v && setRange(v)}
          sx={{ bgcolor: "background.paper" }}
        >
          <ToggleButton value="7d">7 days</ToggleButton>
          <ToggleButton value="30d">30 days</ToggleButton>
          <ToggleButton value="90d">90 days</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            title="Total tickets"
            value={loading ? "—" : fmt(analytics.totalTickets)}
            trend={analytics?.totalTrend}
            icon={<ConfirmationNumberOutlined fontSize="small" />}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            title="Resolved"
            value={loading ? "—" : fmt(analytics!.completedTickets)}
            subtitle={ analytics ? `${Math.round((
              analytics.completedTickets / Math.max(
                analytics.totalTickets, 1)
              ) * 100)}% rate
            `
              : undefined
            }
            trend={analytics?.resolvedTrend}
            icon={<CheckCircleOutline fontSize="small" />}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            title="Avg. resolution"
            value={loading ? "—" : analytics.avgResolutionHours != null ? `${analytics.avgResolutionHours}h` : "—"}
            subtitle="median time to resolve"
            trend={analytics?.resolutionTrend}
            icon={<AccessTime fontSize="small" />}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <KpiCard
            title="Active backlog"
            value={loading ? "—" : fmt(analytics.openTickets)}
            subtitle={analytics?.avgOpenAgeDays != null ? `avg age ${analytics.avgOpenAgeDays}d` : undefined}
            icon={<ConfirmationNumberOutlined fontSize="small" />}
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined" sx={{ height: 320 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Ticket volume
              </Typography>
              {loading ? (
                <Skeleton variant="rectangular" height={240} />
              ) : (
                <Box
                  height={240}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="action.hover"
                  borderRadius={1}
                >
                  <Typography color="text.secondary" variant="body2">
                    {/* Future releases will plug in chart using analytics.volumeSeries */}
                    Volume chart (last {range})
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: 320 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Status breakdown
              </Typography>
              {loading ? (
                <Skeleton variant="rectangular" height={240} />
              ) : (
                <Stack spacing={1.5} mt={1}>
                  {[
                    { label: "Active", value: analytics.openTickets, color: "warning.main" },
                    { label: "In progress", value: analytics.inProgressTickets ?? 0, color: "info.main" },
                    { label: "Resolved", value: analytics.completedTickets, color: "success.main" },
                  ].map((s) => {
                    const pct = Math.round((s.value / Math.max(analytics.totalTickets, 1)) * 100);
                    return (
                      <Box key={s.label}>
                        <Stack direction="row" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2">{s.label}</Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {fmt(s.value)} ({pct}%)
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "action.hover",
                            "& .MuiLinearProgress-bar": { bgcolor: s.color },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle2" fontWeight={600}>
              Workload by member
            </Typography>
            <Chip size="small" label={`${analytics?.membersCount ?? 0} members`} variant="outlined" />
          </Stack>

          {loading ? (
            <Stack spacing={1}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height={48} />
              ))}
            </Stack>
          ) : analytics.memberStats?.length ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell align="right">Opened</TableCell>
                  <TableCell align="right">Resolved</TableCell>
                  <TableCell align="right">Avg. time</TableCell>
                  <TableCell align="right" width={120}>
                    Share
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics.memberStats.map((m: any) => (
                  <TableRow key={m.userId} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <NavbarAvatar user={m} showStatus={false} />
                        <Typography variant="body2" fontWeight={500}>
                          {m.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{m.open}</TableCell>
                    <TableCell align="right">{m.resolved}</TableCell>
                    <TableCell align="right">
                      {m.avgHours != null ? `${m.avgHours}h` : "—"}
                    </TableCell>
                    <TableCell align="right">
                      <LinearProgress
                        variant="determinate"
                        value={m.sharePct}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography color="text.secondary" variant="body2" py={4} textAlign="center">
              No member activity in this period
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}