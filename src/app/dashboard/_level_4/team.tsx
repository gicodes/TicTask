"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth";
import { Team, User } from "@/types/users";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";

export default function TeamsPage() {
  const { user } = useAuth();

  const createdTeams = (user as User)?.createdTeams ?? [];
  const membershipTeams = (user as User)?.teamMemberships?.map(m => m.team) ?? [];

  const teams: Team[] = [...createdTeams, ...membershipTeams];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}> 
      <Stack spacing={4} maxWidth="900px" mx="auto"> 
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}> 
          <Stack spacing={1} textAlign={{xs: 'center', sm: 'inherit'}}> 
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}> 
              Manage Team(s)
            </Typography> 
            <Typography variant="body1" sx={{ opacity: 0.7 }}> 
              Add, remove, or manage members of your organization. 
            </Typography>
          </Stack> 
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={2}>
                {teams.length === 0 && (
                  <Typography textAlign={'center'}>No team yet</Typography>
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
                  <Link key={team.id} href={`/dashboard/team/${team.id}`}>
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
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

      </Stack>
    </Box>
  );
}
