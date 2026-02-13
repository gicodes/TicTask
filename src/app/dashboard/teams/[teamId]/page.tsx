"use client";

import { Box, Card, CardContent, Stack, Typography, Button, Chip } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";

export default function OverviewPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const { team, loading } = useTeam();

  const isOwner = user?.id === team.ownerId;

  if (loading) return <Box py={6}>Loading...</Box>;
  if (!team) return <Box py={6}>Team not found</Box>

  return (
    <Stack spacing={4}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={6}>
            <Box>
              <Typography variant="caption">Created</Typography>
              <Typography fontWeight={600}>
                {new Date(team.createdAt).toDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption">Owner</Typography>
              <Typography fontWeight={600}>
                {team.owner?.name} {isOwner && <Chip title={"you"} size="small" color="success"/>}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption">Tickets</Typography>
              <Typography fontWeight={600}>
                {team._count?.tickets ?? 0}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography fontWeight={700}>
                Team Ticket Playground
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Collaborate and manage tickets.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() =>
                router.push(`/dashboard/teams/${teamId}/tickets`)
              }
            >
              Open Tickets
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
