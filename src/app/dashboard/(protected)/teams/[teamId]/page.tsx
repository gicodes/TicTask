"use client";

import { ConfirmationNumberOutlined, GroupOutlined, ScheduleOutlined, AddCircleOutline, AnalyticsOutlined, ArrowForwardIosRounded, MenuBookOutlined, PeopleOutline, SettingsOutlined, } from "@mui/icons-material"; 
import { Box, Card, CardContent, Stack, Typography, Chip, Alert } from "@mui/material";
import { TeamPageSkeleton } from "@/app/dashboard/_level_2/team/teamPageSkeleton";
import { useParams, useRouter } from "next/navigation";
import AuthRedirectBtn from "@/assets/authRedirectBtn";
import SomeOnePays from "@/assets/marketingCard";

import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { Button } from "@/assets/buttons";
import { formatCreatedAt } from "@/lib/formatCreatedAt";

export default function OverviewPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { team, loading, isOwner } = useTeam();

  if (loading) return <TeamPageSkeleton />;
  if (!team || !isAuthenticated)
    return (
      <TeamPageSkeleton>
        Please <AuthRedirectBtn /> to view your team
      </TeamPageSkeleton>
    );

  const memberCount = team.members?.length ?? 0;
  const ticketCount = team._count?.tickets ?? 0;
  const quickActions = [
    { 
      label: "Create ticket", 
      description: "Add a new ticket to the team", 
      icon: <AddCircleOutline />, 
      href: `/dashboard/teams/${team.id}/tickets/create`, 
    }, 
    { 
      label: "Invite members", 
      description: "Bring people into the team", 
      icon: <PeopleOutline />, 
      href: `/dashboard/teams/${team.id}/members/#invite`, 
    }, 
    { label: "Team settings", 
      description: "Manage your team", 
      icon: <SettingsOutlined />, 
      href: `/dashboard/teams/${team.id}/settings`, 
    }, 
    { label: "View tickets", 
      description: "Browse the team's tickets", 
      icon: <ConfirmationNumberOutlined />, 
      href: `/dashboard/teams/${team.id}/tickets`, 
    }, 
  ];

  const pinnedResources = [ 
    { 
      label: "Team handbook", 
      description: "Guidelines, processes and useful information", 
      icon: <MenuBookOutlined />, 
      href: "#", 
      enterprise: true, 

    }, 
    { label: "Analytics", 
      description: "Explore team performance and insights", 
      icon: <AnalyticsOutlined />, 
      href: `/dashboard/teams/${team.id}/analytics`, 
      enterprise: true, 
    }, 
  ];

  return (
    <Stack spacing={4}>
      <Stack spacing={4} maxWidth={800}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 3, md: 5, lg: 7 }}
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

        <Card
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 3 },
              "&:last-child": { pb: { xs: 2.5, sm: 3 } },
            }}
          >
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={750}
                  sx={{
                    letterSpacing: "-0.02em",
                  }}
                >
                  Quick actions
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Common things you can do with this team.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                  },
                  gap: 1.25,
                }}
              >
                {quickActions.map((action) => (
                  <Box
                    key={action.label}
                    component="button"
                    type="button"
                    onClick={() => router.push(action.href)}
                    sx={{
                      appearance: "none",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      bgcolor: "background.paper",
                      color: "inherit",
                      textAlign: "left",
                      cursor: "pointer",
                      p: 1.75,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      minWidth: 0,
                      transition:
                        "border-color 150ms ease, background-color 150ms ease, transform 150ms ease",

                      "&:hover": {
                        borderColor: "text.disabled",
                        bgcolor: "action.hover",
                        transform: "translateY(-1px)",
                      },

                      "&:active": {
                        transform: "translateY(0)",
                      },

                      "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2,
                        bgcolor: "action.hover",
                        color: "text.secondary",
                        "& svg": { fontSize: 20 },
                      }}
                    >
                      {action.icon}
                    </Box>

                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        noWrap
                      >
                        {action.label}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        sx={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          mt: 0.25,
                        }}
                      >
                        {action.description}
                      </Typography>
                    </Box>

                    <ArrowForwardIosRounded
                      sx={{
                        fontSize: 13,
                        color: "text.disabled",
                        flexShrink: 0,
                        transition: "transform 150ms ease",
                        ".MuiBox-root:hover &": { transform: "translateX(2px)" },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Stack>
          </CardContent>
      </Card>
      {team?.subscription?.plan==="ENTERPRISE" &&
        <Card
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 3 },
              "&:last-child": {
                pb: { xs: 2.5, sm: 3 },
              },
            }}
          >
            <Stack spacing={2.5}>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                gap={2}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={750}
                    sx={{ letterSpacing: "-0.02em", }}
                  >
                    Pinned resources
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Important resources for your team.
                  </Typography>
                </Box>
              </Stack>

              <Stack
                divider={
                  <Box sx={{ height: "1px", bgcolor: "divider" }} />
                }
              >
                {pinnedResources.map((resource) => {
                  const disabled = resource.href === "#";

                  return (
                    <Box
                      key={resource.label}
                      component="button"
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        if (!disabled) {
                          router.push(resource.href);
                        }
                      }}
                      sx={{
                        appearance: "none",
                        width: "100%",
                        border: 0,
                        bgcolor: "transparent",
                        color: "inherit",
                        textAlign: "left",
                        cursor: disabled ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.75,
                        py: 1.75,
                        px: 0,
                        opacity: disabled ? 0.55 : 1,
                        transition: "opacity 150ms ease",

                        "&:hover:not(:disabled)": {
                          opacity: 0.72,
                        },

                        "&:focus-visible": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: 2,
                          borderRadius: 2,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 2.5,
                          bgcolor: "action.hover",
                          color: "text.secondary",

                          "& svg": {
                            fontSize: 21,
                          },
                        }}
                      >
                        {resource.icon}
                      </Box>

                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            noWrap
                          >
                            {resource.label}
                          </Typography>

                          {resource.enterprise && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: { xs: "none", sm: "inline" },
                                color: "text.disabled",
                                fontWeight: 600,
                              }}
                            >
                              Enterprise
                            </Typography>
                          )}
                        </Stack>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{
                            display: "block",
                            mt: 0.25,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {resource.description}
                        </Typography>
                      </Box>

                      <ArrowForwardIosRounded
                        sx={{
                          fontSize: 13,
                          color: "text.disabled",
                          flexShrink: 0,
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      }
      </Stack>
      
      <SomeOnePays>
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 0 }}
            maxWidth={800}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            {[
              {
                icon: <ConfirmationNumberOutlined fontSize="small" />,
                label: `${ticketCount} ticket${ticketCount === 1 ? "" : "s"}`,
              },
              {
                icon: <GroupOutlined fontSize="small" />,
                label: `${memberCount} member${memberCount === 1 ? "" : "s"}`,
              },
              {
                icon: <ScheduleOutlined fontSize="small" />,
                label: `Created ${formatCreatedAt(team.createdAt).toLowerCase()}`,
              },
            ].map((item, index) => (
              <Stack
                key={item.label}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  flex: 1,
                  px: { xs: 1.75, sm: 2 },
                  py: 1.5,
                  borderRight: {
                    xs: "none",
                    sm: index < 2 ? "1px solid" : "none",
                  },
                  borderBottom: {
                    xs: index < 2 ? "1px solid" : "none",
                    sm: "none",
                  },
                  borderColor: "divider",
                  color: "text.secondary",
                }}
              >
                {item.icon}

                <Typography
                  variant="caption"
                  fontWeight={600}
                  noWrap
                  sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" }}}
            >
              Bring the team. We&apos;ll bring the tickets.
            </Typography>

            <Button
              tone="action"
              onClick={() => router.push(`/dashboard/teams/${teamId}/tickets`)}
              sx={{ borderRadius: 2.5, fontWeight: 700 }}
            >
              Open Playground
            </Button>
          </Stack>
      </SomeOnePays>
    </Stack>
  );
}