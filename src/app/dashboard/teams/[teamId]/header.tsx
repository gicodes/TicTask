"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Box, Stack, Typography, Tabs, Tab, Chip } from "@mui/material";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";

export default function WorkspaceHeader() {
  const { teamId } = useParams<{ teamId: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const { team, loading } = useTeam();

  if (loading || !team) return null;
  if (!isAuthenticated) return (
    <Typography textAlign={'center'}> 
      Team unavailable in offline mode!
    </Typography>
  )

  const currentTab = () => {
    if (pathname.includes("/tickets")) return 1;
    if (pathname.includes("/members")) return 2;
    if (pathname.includes("/analytics")) return 3;
    if (pathname.includes("/settings")) return 4;
    return 0;
  };

  const handleChange = (_: any, newValue: number) => {
    const routes = [
      `/dashboard/teams/${teamId}`,
      `/dashboard/teams/${teamId}/tickets`,
      `/dashboard/teams/${teamId}/members`,
      `/dashboard/teams/${teamId}/analytics`,
      `/dashboard/teams/${teamId}/settings`,
    ];

    router.push(routes[newValue]);
  };

  return (
    <Box>
      <Stack spacing={2} mb={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" fontWeight={700}>
            {team.name}
          </Typography>
          <Chip
            label={team?.subscription ?? "Standard"}
            color="primary"
            size="small"
          />
        </Stack>

        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {team.description}
        </Typography>
      </Stack>

      <Tabs
        value={currentTab()}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ maxWidth: '93vw'}}
      >
        <Tab label="Overview" />
        <Tab label="Tickets" />
        <Tab label="Members" />
        <Tab label="Analytics" />
        <Tab label="Settings" />
      </Tabs>
    </Box>
  );
}
