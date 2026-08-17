"use client";

import { ConfirmationNumberOutlined, GroupOutlined, ScheduleOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography, Chip, Alert } from "@mui/material";
import { TeamPageSkeleton } from "@/app/dashboard/_level_2/team/teamPageSkeleton";
import { useParams, useRouter } from "next/navigation";
import AuthRedirectBtn from "@/assets/authRedirectBtn";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { Button } from "@/assets/buttons";

function formatCreatedAt(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffMs = startOfToday.getTime() - startOfDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays >= 2 && diffDays <= 6) return `${diffDays} days ago`;
  if (diffDays >= 7 && diffDays < 14) return "1 week ago";
  if (diffDays >= 14 && diffDays < 21) return "2 weeks ago";
  if (diffDays >= 21 && diffDays < 28) return "3 weeks ago";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OverviewPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { team, loading, isOwner } = useTeam();

  if (loading) return <TeamPageSkeleton />;
  if (!team)
    return (
      <Alert severity="warning" sx={{ mx: "auto", maxWidth: 250 }}>
        Team not found. You may be signed out.
      </Alert>
    );

  if (!isAuthenticated)
    return (
      <TeamPageSkeleton>
        Please <AuthRedirectBtn /> to view your team
      </TeamPageSkeleton>
    );

  const memberCount = team.members?.length ?? 0;
  const ticketCount = team._count?.tickets ?? 0;

  return (
    <Stack spacing={4} maxWidth={800}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 4, md: 6, lg: 7 }}
            flexWrap="wrap"
            useFlexGap
          >
            <Box display="grid" gap={1}>
              <Typography variant="caption" color="text.secondary">
                Created
              </Typography>
              <Typography 
                fontWeight={600}
                noWrap
                sx={{
                  minWidth: 0,
                  maxWidth: { xs: 90, sm: 'none' },
                  overflow: "hidden",
                }}
              >
                {formatCreatedAt(team.createdAt)}
              </Typography>
            </Box>

            <Box display="grid" gap={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="flex"
                alignItems="center"
                gap={1}
              >
                Owner
                {isOwner && (
                  <Chip
                    label="YOU"
                    size="small"
                    color="success"
                    sx={{ height: 18, fontSize: 11, fontWeight: 600 }}
                  />
                )}
              </Typography>
              <Typography
                fontWeight={600}
                noWrap
                sx={{
                  minWidth: 0,
                  maxWidth: { xs: 100, sm: 150, md: 180, xl: 250 },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {team.owner?.name}
              </Typography>
            </Box>

            <Box display="grid" gap={1}>
              <Typography variant="caption" color="text.secondary">
                Tickets
              </Typography>
              <Typography fontWeight={600} textAlign="center">
                {ticketCount}
              </Typography>
            </Box>

            <Box display="grid" gap={1}>
              <Typography variant="caption" color="text.secondary">
                Members
              </Typography>
              <Typography fontWeight={600} textAlign="center">
                {memberCount}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack
            gap={3}
            justifyContent="space-between"
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "flex-start" }}
          >
            <Box flex={1}>
              <Typography fontWeight={700} gutterBottom>
                Team Ticket Playground
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2.5 }}>
                Collaborate and manage tickets with your team.
              </Typography>

              <Stack spacing={1.5} mt={4}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <ConfirmationNumberOutlined fontSize="small" color="action" />
                  <Typography variant="body2">
                    {ticketCount === 0 ? "No tickets yet — create the first one"
                      : `${ticketCount} ticket${ticketCount === 1 ? "" : "s"} in this team`}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1.5}>
                  <GroupOutlined fontSize="small" color="action" />
                  <Typography variant="body2">
                    {memberCount} member{memberCount === 1 ? "" : "s"} collaborating
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1.5}>
                  <ScheduleOutlined fontSize="small" color="action" />
                  <Typography variant="body2">
                    Team created {formatCreatedAt(team.createdAt).toLowerCase()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Button
              tone="action"
              onClick={() => router.push(`/dashboard/teams/${teamId}/tickets`)}
            >
              Open Tickets
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}