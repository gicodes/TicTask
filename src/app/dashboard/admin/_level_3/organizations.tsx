"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GenericGridPageLayout from "../../_level_1/genGridPageLayout";
import { 
  Box,
  Stack, 
  Typography, 
  Card, 
  CardContent, 
} from "@mui/material";
import { useTeamByAdmin } from "@/hooks/useTeamsByAdmin";

export default function OrganizationsList() {
  const { teams, loading } = useTeamByAdmin();

  return (
    <GenericGridPageLayout> 
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack spacing={2}>
              {teams.length === 0 && !loading && (
                <Typography textAlign="center" py={12}>
                  No Organization yet
                </Typography>
              )}

              {teams.length > 0 && (
                <>
                  <Stack py={1}>
                    <Typography variant="h6" fontWeight={700}>
                      {teams.length > 1 ? "All Teams" : "The Team"}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      View all teams as organizations on Tictask
                    </Typography>
                  </Stack>

                  {teams.map(team => (
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
                          <Typography variant="body2">Strength: {team.members.length}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }} maxWidth={{ xs: 100, sm: 250, md: 'none'}}>
                            <i><strong>Updated:</strong> {new Date(team.updatedAt).toDateString()}</i>
                          </Typography>
                        </Stack>
                      </Box>
                    </Link>
                  ))}
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </GenericGridPageLayout>
  );
}
