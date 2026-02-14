"use client";

import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { Add, DeleteOutline } from "@mui/icons-material";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Grid, 
  IconButton, 
  Stack 
} from "@mui/material";

export default function MembersPage() {
  const { isAuthenticated, user } = useAuth();
  const { team, inviteMember, removeMember, isOwner, loading } = useTeam();

  const handleInvite = async () => {
    if (!user) return;
    const email = prompt("Enter email to invite:");
    
    if (!email) return;
    await inviteMember(email, user?.id);
  };

  const members = team?.members ?? [];

  if (!isAuthenticated) return;
  if (loading) return <Typography py={2} textAlign={'center'}> Loading...</Typography>

  return (
    <Box maxWidth={800}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>Members ({members.length})</Typography>
            <Button startIcon={<Add />} tone="primary" variant="filled" onClick={handleInvite}>
              Add Member
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {members.map(m => (
              <Grid key={m.id}>
                <Stack
                  p={2}
                  gap={5}
                  direction="row"
                  borderRadius={2}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: "rgba(0,0,0,0.02)",
                    ":hover": { bgcolor: "rgba(0,0,0, 0.06)"} 
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>{m.name?.[0]}</Avatar>
                    <Box>
                      <Typography fontWeight={600}>{m.name}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>{m.role}</Typography>
                    </Box>
                  </Stack>

                  {isOwner && (
                    <IconButton
                      color="error"
                      onClick={() => removeMember(m.id)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>

          {isOwner && team?.invitations && team?.invitations?.length > 0 && (
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography fontWeight={600} mb={2}>
                  Pending Invitations
                </Typography>
                
                {team.invitations.map((invite: { id: number, email: string}) => (
                  <Typography key={invite.id}>
                    {invite.email}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
