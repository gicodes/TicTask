"use client";

import { Box, Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { Button } from "@/assets/buttons";

export default function OverviewPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { team, loading, isOwner } = useTeam();

  if (loading) return <Typography py={6} textAlign={'center'}>Loading...</Typography>;
  if (!team) return <Typography py={6}>Team not found</Typography>

  if (!isAuthenticated) return;

  return (
    <Stack spacing={4} maxWidth={800}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction={'row'} spacing={{ xs: 3, sm: 4, md: 5, lg: 6, xl: 7}}>
            <Box display={'grid'} gap={1}>
              <Typography variant="caption">Created</Typography>
              <Typography fontWeight={600}>
                {new Date(team.createdAt).toDateString()}
              </Typography>
            </Box>

            <Box display={'grid'} gap={1}>
              <Typography 
                variant="caption" 
                display={'flex'} 
                alignItems={'center'} 
                gap={1}
              >
                Owner 
                {isOwner && <Chip label={"you"} sx={{ fontSize: 10, height: 20}} color="success"/>}
              </Typography>
              <Typography fontWeight={600}>
                {team.owner?.name}
              </Typography>
            </Box>

            <Box display={'grid'} gap={1}>
              <Typography variant="caption">Tickets</Typography>
              <Typography fontWeight={600}>
                {team._count?.tickets ?? 0}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4, pt: 2 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row"}} gap={4} justifyContent="space-between">
            <Box>
              <Typography fontWeight={700}>
                Team Ticket Playground
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Collaborate and manage tickets.
              </Typography>
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
