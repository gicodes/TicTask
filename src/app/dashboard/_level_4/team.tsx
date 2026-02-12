"use client";

import Link from "next/link";
import { useState } from "react";
import { useTeam } from "@/hooks/useTeam";

import { motion } from "framer-motion";
import { Button } from "@/assets/buttons";
import { useAuth } from "@/providers/auth";
import { Team, User } from "@/types/users";
import GenericGridPageLayout from "../_level_1/genGridPageLayout";
import GenericDashboardPagesHeader from "../_level_1/genDashPagesHeader";
import { 
  Stack, 
  Typography, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions 
} from "@mui/material";
import { Add } from "@mui/icons-material";

export default function TeamsPage() {
  const { user } = useAuth();
  const { createNewTeam } = useTeam();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;

    const success = await createNewTeam({
      name,
      description,
    });

    if (success) {
      setOpen(false);
      setName("");
      setDescription("");
    }
  };

  const createdTeams = (user as User)?.createdTeams ?? [];
  const membershipTeams = (user as User)?.teamMemberships?.map(m => m.team) ?? [];

  const teams: Team[] = [...createdTeams, ...membershipTeams];

  return (
    <GenericGridPageLayout> 
      <GenericDashboardPagesHeader 
        title="Team(s) Manager"
        description="Add, remove, or manage members of your organization. "
      />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Stack direction="row" justifyContent="flex-end" mb={3}>
          <Button
            startIcon={<Add />}
            tone="primary"
            variant="filled"
            onClick={() => setOpen(true)}
          >
            Create Team
          </Button>
        </Stack>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack spacing={2}>
              {teams.length === 0 && (
                <Typography textAlign={'center'} py={12}>No team yet</Typography>
              )}
              {teams.length > 0 && 
                <Stack py={1}>
                  <Typography variant="h6" fontWeight={700}>
                    Your {teams.length > 1 ? "Teams" : 'Team'}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    Select {teams.length > 1 ? "a team to manage" : "and manage your team"}.
                  </Typography>
                </Stack>
              }

              {teams.map(team => (
                <Link key={team.id} href={`/dashboard/teams/${team.id}`}>
                  <Typography
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(0,0,0,0.03)",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.06)" }
                    }}
                  >
                    {team.name}
                  </Typography>
                </Link>
              ))}

              <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Create New Team</DialogTitle>
                <DialogContent>
                  <Stack spacing={2} mt={1}>
                    <TextField
                      label="Team Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />

                    <TextField
                      label="Description (Optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={3}
                      fullWidth
                    />
                  </Stack>
                </DialogContent>

                <DialogActions>
                  <Button tone="retreat" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="filled"
                    tone="primary"
                    onClick={handleCreate}
                    disabled={!name.trim()}
                  >
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </GenericGridPageLayout>
  );
}
