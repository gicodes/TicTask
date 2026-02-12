"use client";

import { useEffect } from "react";
import { User } from "@/types/users";
import { motion } from "framer-motion";
import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { Add, DeleteOutline } from "@mui/icons-material";
import { Box, Stack, Typography, Card, CardContent, Divider, Avatar, Grid, IconButton } from "@mui/material";

export default function TeamDashboard() {
  const { team, loading, inviteToTeam, removeFromTeam, dissolveTeam } = useTeam();

  useEffect(() => {
    if (team?.members?.length === 1) {
      setTimeout(() => {
        handleInvite();
      }, 500);
    }
  }, [team]);

  if (loading) return <Box py={10} textAlign={'center'}>Loading team...</Box>;
  if (!team) return <Box py={10} textAlign={'center'}>Team not found</Box>;

  const handleInvite = async () => {
    const email = prompt("Enter email to invite:");
    if (!email) return;

    await inviteToTeam(email);
  };

  const members = team.members ?? [];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="900px" mx="auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" fontWeight={700}>
            {team.name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Manage members of this team.
          </Typography>
        </motion.div>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>Members</Typography>
              <Button startIcon={<Add />} tone="primary" variant="filled" onClick={handleInvite}>
                Add Member
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {members.map((m: User) => (
                <Grid key={m.id}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(0,0,0,0.02)" }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>{m.name[0]}</Avatar>
                      <Box>
                        <Typography fontWeight={600}>{m.name}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>{m.role}</Typography>
                      </Box>
                    </Stack>

                    <IconButton color="error" onClick={() => removeFromTeam(m.id)}>
                      <DeleteOutline />
                    </IconButton>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            {team.ownerId && (
              <Box mt={4} textAlign="right">
                <Button variant="outlined" tone="danger" onClick={dissolveTeam}>
                  Dissolve Team
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
