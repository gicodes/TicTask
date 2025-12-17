"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth";
import { Team, User } from "@/types/users";
import { Stack, Typography, Card, CardContent } from "@mui/material";
import GenericDashboardPagesHeader from "../_level_1/genDashPagesHeader";
import GenericGridPageLayout from "../_level_1/genGridPageLayout";

export default function TeamsPage() {
  const { user } = useAuth();

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
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </GenericGridPageLayout>
  );
}
