"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/assets/buttons";
import { useMyTeams } from "@/hooks/useMyTeams";
import GenericGridPageLayout from "../_level_1/genGridPageLayout";
import GenericDashboardPagesHeader from "../_level_1/genDashPagesHeader";
import { 
  Box,
  Stack, 
  Typography, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions,
  Divider,
  Drawer
} from "@mui/material";
import { Add, CloseSharp, Group } from "@mui/icons-material";

export default function TeamsPage() {
  const { teams, createTeam, loading } = useMyTeams();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [readAboutTeam, setReadAboutTeam] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSubmitting((true));

    try {
      const success = await createTeam({
        name,
        description,
      });

      if (success) {
        setOpen(false);
        setName("");
        setSubmitting(false)
        setDescription("");
      }
    } catch {
      setSubmitting(false);
    } finally { 
      setSubmitting(false)
    }
  };

  const sortedTeams = useMemo(() => {
    return [...teams].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );
  }, [teams]);

  return (
    <GenericGridPageLayout> 
      <GenericDashboardPagesHeader 
        title="Team(s) Manager"
        description="Add, remove, or manage members of your organization "
      />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Button
            startIcon={<Add />}
            variant="filled"
            onClick={() => setOpen(true)}
          >
            Create Team
          </Button>

          <Typography
            sx={{ cursor: 'pointer', borderBottom: '1px solid cornflowerblue', height: 'fit-content'}}
            onClick={() => setReadAboutTeam(true)}
          >
            What is a <strong>team?</strong>
          </Typography>
        </Stack>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack spacing={2}>
              { loading && 
                <Typography textAlign="center" py={12}>
                  Loading your teams...
                </Typography>
              }
              {teams.length === 0 && !loading && (
                <Typography textAlign="center" py={12}>
                  No team yet
                </Typography>
              )}

              {teams.length > 0 && (
                <>
                  <Stack py={1}>
                    <Typography variant="h6" fontWeight={700}>
                      Your {teams.length > 1 ? "Teams" : "Team"}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      Select one to manage
                    </Typography>
                  </Stack>

                  {sortedTeams.map(team => (
                    <Link key={team.id} href={`/dashboard/teams/${team.id}`}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          bgcolor: "rgba(0,0,0,0.03)",
                          cursor: "pointer",
                          "&:hover": { bgcolor: "rgba(0,0,0,0.06)" }
                        }}
                      >
                        <Stack gap={1}>
                          <Typography>{team.name}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>{team.description}</Typography>
                        </Stack>
                        <Stack display={'flex'} alignItems={'flex-end'} gap={0.5}>
                          <Typography variant="body2"><Group/> {team.members.length}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }} maxWidth={{ xs: 100, sm: 250, md: 'none'}}>
                            <i><strong>Updated:</strong> {new Date(team.updatedAt).toDateString()}</i>
                          </Typography>
                        </Stack>
                      </Box>
                    </Link>
                  ))}
                </>
              )}

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
                    onClick={handleCreate}
                    disabled={!name.trim() || submitting}
                  >
                    {submitting ? "Creating Team" : "Create"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </CardContent>
        </Card>

        <Drawer
          anchor="right"
          open={readAboutTeam}
          onClose={() => setReadAboutTeam(false)}
          sx={{ width: { xs: '100%', sm: 360 }}}
        >
          <Box sx={{ width: { xs: '100%', sm: 360 }, pt: 4, px: 2, mt: 5 }}>
            <Box display={'flex'} justifyContent={'end'} onClick={() => setReadAboutTeam(false)}> 
              <CloseSharp color="error" sx={{ boxShadow: 2, borderRadius: '50%', p: 1}} fontSize="large" /> 
            </Box>
            <Typography variant="h6" fontWeight={700} mb={2}>
              What is a Team?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.88,
                lineHeight: 1.9,
                fontSize: { xs: '0.96rem', sm: '1rem' },
              }}
            >
              A <strong>Team</strong> is the smallest collaborative unit, or
              group of individuals working together toward shared goals, task
              or project.
              <br /><br />
              A team may represent a department in an organization, a business unit, a
              startup crew, a project squad, or even a circle of friends cordinating
              activities together.
              <br /><br />
              Every team has an owner, several members and a workflow. 
              Team members are granted basic permissions (i.e. create ticket, manage/ close projects, get alerts on changes), while 
              owners and administrators can customize workflows, manage members and set these permissions and roles. 
            </Typography>

            <Divider sx={{ my: 5 }} />
            <Typography variant="h6" fontWeight={700} mb={2}>
              Teams Manager
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }} mb={3}>
              <strong>Team Manager</strong> show team(s) you currently manage, are part of, or created in the past.
              <br /><br/>
              Team Managers are team owners by default, and can create or manage multiple teams simulteanously.
              <br/><strong> Organization</strong> account + <strong>active</strong> subscription is required to fully access teams manager.
              <br/><br/>
              To create a Team, click<span className="btn">✛ Create Team</span>
              <br/><br/>
              <i>[ Active subscription plan determines the number of teams you can create, and max number of members allowed in each team ]</i>
            </Typography>

            <Divider sx={{ my: 5 }} />
            <Typography variant="h6" fontWeight={700} mb={2}>
              Why Use Teams?
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }} mb={3}>
              Teams allow you to collaborate, manage tickets, permissions,
              assign roles, and centralize workflows.
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h6" fontWeight={700}>
              Best Use Cases
            </Typography>
            <ul style={{ padding: 10}}>
              <li>Internal company departments</li>
              <li>Client management groups</li>
              <li>Project-based collaboration</li>
              <li>Shared ticket playground</li>
              <li>Open-source collaboration</li>
              
            </ul>
            <Typography my={5} p={1} variant="body2" className="highlight-glow">
              Teams unlock advanced ticket collaboration 
            </Typography>
          </Box>
        </Drawer>
      </motion.div>
    </GenericGridPageLayout>
  );
}
