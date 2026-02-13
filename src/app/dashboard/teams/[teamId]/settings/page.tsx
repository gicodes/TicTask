"use client";

import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";

export default function SettingsPage() {
  const { user } = useAuth()
  const { team, dissolveTeam } = useTeam();
  const isOwner = user?.id === team.ownerId;

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={3}>
        Settings
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          Team name / description editing
        </CardContent>
      </Card>

      <Card sx={{ borderColor: "error.main", borderWidth: 1 }}>
        <CardContent>
          <Stack mb={2} gap={2}>
            <Typography color="error" fontWeight={600}> Danger Zone</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8}}>
              You should be careful with this area, as actions from here can be detrimental to your team and permanently irrevisible! 
            </Typography>
          </Stack>

          <Button tone="error">
            Leave Team
          </Button>

          {isOwner && (
            <Box mt={4} textAlign="right">
              <Button variant="outlined" tone="danger" onClick={dissolveTeam}>
                Dissolve Team
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
