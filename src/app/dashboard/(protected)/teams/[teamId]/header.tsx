"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Box, Stack, Typography, Tabs, Tab, Chip } from "@mui/material";
import { useTeam } from "@/hooks/useTeam";

export default function WorkspaceHeader() {
  const { teamId } = useParams<{ teamId: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const { team, loading } = useTeam();
  if (loading || !team) return null;

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

  const subscriptionPlan = 
    team?.subscription?.plan === "STANDARD" ? "Standard"
    : team?.subscription?.plan==="PRO" ? "Pro" 
    : team?.subscription?.plan==="ENTERPRISE" ? "Enterprise"
    : "Privileged"

  return (
    <Box>
      <Stack spacing={2} mb={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" fontWeight={700}>
            {team.name}
          </Typography>
          <Chip
            label={subscriptionPlan}
            color="primary"
            size="small"
          />
        </Stack>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {team.description}
        </Typography>
      </Stack>
      <Box sx={{ position: "relative" }}>
        <Tabs
          value={currentTab()}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            pr: 2,
            margin: 0,
            maxWidth: "98vw",
            "& .MuiTabs-scrollButtons.Mui-disabled": {
              opacity: 0,
              width: 0,
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Tickets" />
          <Tab label="Members" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
        <Box
          sx={{
            display: { sm: 'none'},
            position: "absolute",
            left: 2,
            top: "50%",
            transform: "translateY(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            bgcolor: "text.secondary",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
}
