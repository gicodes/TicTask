"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { TeamMember } from "@/types/team";
import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { useAlert } from "@/providers/alert";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Tooltip,
  Pagination,
} from "@mui/material";
import { Crown } from "lucide-react";
import { Add, DeleteOutline, Close } from "@mui/icons-material";
import { NavbarAvatar } from "@/app/dashboard/_level_1/navItems";
import { TeamPageSkeleton } from "@/app/dashboard/_level_2/team/teamPageSkeleton";

export default function MembersPage() {
  const { isAuthenticated, user } = useAuth();
  const { showAlert, confirm, prompt } = useAlert();
  const { team, inviteMember, removeMember, isOwner, loading } = useTeam();

  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [pendingInvitesLoading, setPendingInvitesLoading] = useState(false);
  const [invitePage, setInvitePage] = useState(1);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
    
  useEffect(() => {
    if (!team?.id || !isOwner) return;

    const fetchPendingInvites = async () => {
      try {
        setPendingInvitesLoading(true);

        const { data } = await api.get(
          `/team/${team.id}/invites/pending`
        );

        setPendingInvites(data.invites || []);
      } catch (err) {
        console.error("Failed to load pending invitations:", err);
        showAlert("Failed to load pending invitations", "error");
      } finally {
        setPendingInvitesLoading(false);
      }
    };

    fetchPendingInvites();
  }, [team?.id, isOwner]);

  const INVITES_PER_PAGE = 5;

  const invitePageCount = Math.ceil(
    pendingInvites.length / INVITES_PER_PAGE
  );

  const paginatedInvites = pendingInvites.slice(
    (invitePage - 1) * INVITES_PER_PAGE,
    invitePage * INVITES_PER_PAGE
  );

  const handleInvite = async () => {
    if (!user) return;
    const email = await prompt(
      "Enter email to invite:",
      "Invite User", "",
      "Send Invite"
    );

    if (!email) return;
    await inviteMember(email, user?.id);
  };

  const handleRemoveMember = async (id: number) => {
    if (id && id === user?.id) {
      showAlert(
        "Owner cannot remove self. To continue with this action, go to team settings and hit 'Leave Team'"
      );
      return;
    }

    const ok = await confirm(
      `Are you sure you want to kick user ${id} out from this team?`,
      "Confirm remove user",
      "Remove User"
    );
    if (!ok) return;

    removeMember(id);
    showAlert("User removed!");
    setProfileOpen(false);
  };

  const openProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setProfileOpen(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
    setSelectedMember(null);
  };

  const members = (team?.members ?? []) as TeamMember[];

  if (!isAuthenticated) return null;

  if (loading) return <TeamPageSkeleton />

  return (
    <Box>
      <Card sx={{ borderRadius: 4, maxWidth: 800 }}>
        <CardContent>
          <Stack
            pb={1}
            mb={1}
            gap={2}
            justifyContent="space-between"
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "normal", sm: "center" }}
          >
            <Typography variant="h6" fontWeight={600}>
              Members ({members.length})
            </Typography>
            <Button
              startIcon={<Add />}
              tone="primary"
              variant="filled"
              onClick={handleInvite}
            >
              Add Member
            </Button>
          </Stack>

          <Grid container spacing={1} pt={1}>
            {members.map((m) => (
              <Grid key={m.id} size={{ xs: 12 }}>
                <Stack
                  p={2}
                  gap={5}
                  direction="row"
                  borderRadius={2}
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => openProfile(m)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    ":hover": { bgcolor: "rgba(0,0,0, 0.1)" },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <NavbarAvatar user={m} />
                    <Box>
                      <Typography fontWeight={600}>{m.name}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {m.teamMemberships.map((tm) => tm.role).join(", ")}
                      </Typography>
                    </Box>
                  </Stack>

                  {isOwner && (
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveMember(m.id);
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>

          {isOwner && !pendingInvitesLoading && pendingInvites.length > 0 && (
            <Card
              sx={{
                borderRadius: 4,
                mt: 3,
                bgcolor: "rgba(0,0,0,0.02)",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight={600}>
                        Pending Invitations
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        People invited to join this team
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {pendingInvites.length} pending
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack spacing={1}>
                    {paginatedInvites.map((invite) => (
                      <Stack
                        key={invite.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        }}
                      >
                        <Stack spacing={0.25}>
                          <Typography fontWeight={600}>
                            {invite.email}
                          </Typography>

                          {invite.invitedBy && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Invited by{" "}
                              {invite.invitedBy.name ||
                                invite.invitedBy.email}
                            </Typography>
                          )}

                          {invite.createdAt && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(
                                invite.createdAt
                              ).toLocaleDateString()}
                            </Typography>
                          )}
                        </Stack>

                        <Typography
                          variant="caption"
                          color="warning.main"
                          fontWeight={600}
                        >
                          Pending
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  {invitePageCount > 1 && (
                    <>
                      <Divider />

                      <Stack alignItems="center">
                        <Pagination
                          count={invitePageCount}
                          page={invitePage}
                          onChange={(_, page) => setInvitePage(page)}
                          color="primary"
                          shape="rounded"
                        />
                      </Stack>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={profileOpen}
        onClose={closeProfile}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          Member Profile
          <IconButton
            onClick={closeProfile}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedMember && (
            <Stack spacing={2} alignItems="center" py={1}>
              <Stack alignItems={'center'}>
                {selectedMember.id===team?.ownerId && <Tooltip title="Team owner"><Crown color="gold"/></Tooltip>}
                <NavbarAvatar user={selectedMember} size={80} />
                <br/>
              </Stack>
              
              <Box textAlign="center">
                <Typography variant="h6" fontWeight={700}>
                  {selectedMember.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {selectedMember.role}
                </Typography>
              </Box>
              <Divider flexItem />

              <Stack spacing={1.5} width="100%">
                {selectedMember.position && 
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Position
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedMember.position}
                    </Typography>
                  </Stack>
                }
                {selectedMember.bio && (
                  <Stack direction="row" gap={2} justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Bio
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedMember.bio}
                    </Typography>
                  </Stack>
                )}
                {selectedMember.email && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedMember.email}
                    </Typography>
                  </Stack>
                )}
                {selectedMember.country && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Country
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedMember.country}
                    </Typography>
                  </Stack>
                )}
                {isOwner && 
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Joined
                    </Typography>
                  <Stack direction="column" alignItems="flex-end" gap={0.5}>
                    <Typography color="text.secondary" variant="caption">
                      { new Date(selectedMember.teamMemberships[0]?.
                        createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric'
                        })
                      }, { new Date(selectedMember.teamMemberships[0]?.
                        createdAt).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          timeZone: 'UTC'
                        })} UTC
                    </Typography>
                  </Stack>
                </Stack>}
              </Stack>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Stack 
            p={1}
            gap={2}
            width={'100%'}
            direction={{ xs: 'column', sm: 'row'}} 
          >
            {isOwner && selectedMember && selectedMember.id !== user?.id && (
              <Button
                tone="danger"
                startIcon={<DeleteOutline />}
                onClick={() => handleRemoveMember(selectedMember.id)}
              >
                Remove from team
              </Button>
            )}
            <Button tone="retreat" variant="filled" onClick={closeProfile}>
              Close
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
}