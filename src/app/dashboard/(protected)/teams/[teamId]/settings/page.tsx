"use client";

import { useState } from "react";
import { Button } from "@/assets/buttons";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "@/providers/auth";
import { useAlert } from "@/providers/alert";
import { UpdateTeamPayload } from "@/types/team";
import SettingsCard from "@/app/dashboard/_level_2/settingsCard";
import { Box, Typography, Card, CardContent, Stack, TextField, Grid } from "@mui/material";

export default function SettingsPage() {
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert()
  const { team, dissolveTeam, isOwner, updateTeam, leaveCurrentTeam} = useTeam();

  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const handleSave = async () => {
    const payload: UpdateTeamPayload = {};

    if (name !== undefined && name !== team?.name) 
      payload.name = name;
    if (description !== undefined && description !== team?.description) 
      payload.description = description;

    if (!Object.keys(payload).length) return;

    await updateTeam(payload);
    showAlert("Team information succesfully updated!", 'success')
  };

  if (!isAuthenticated) return;

  return (
    <Box maxWidth={800}>
      <SettingsCard
        title="Team Profile" 
        subtitle="Only team owners are allowed to mutate team name and description."
      >
        <Grid display={'grid'} gap={2}>
          <TextField
            label="Team Name"
            placeholder={team?.name}
            value={name ?? team?.name ?? ""}
            disabled={!isOwner}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Description"
            placeholder={team?.description || "No description"}
            value={description ?? team?.description ?? ""}
            multiline
            rows={3}
            disabled={!isOwner}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button sx={{ maxWidth: 300 }} onClick={handleSave}>
            Save Changes
          </Button>
        </Grid>
      </SettingsCard>            

      <SettingsCard
        title="Appearance" 
        subtitle="Configure the appearance of your team&apos;s workspace and playground"
      >
        <Box py={2}>
          <Typography sx={{ opacity: 0.75 }}> <i>Coming soon to teams</i></Typography>
        </Box>
      </SettingsCard>

      <SettingsCard
        title="Workflow" 
        subtitle="View and manage team workflow."
      >
        <Box py={2}>
          <Typography sx={{ opacity: 0.75 }}> <i>Coming soon to teams</i></Typography>
        </Box>
      </SettingsCard>

      <SettingsCard
        title="Notifications"           
        subtitle="Configure how members of your team gets notified on ticket activities"
      >
        <Box py={2}>
          <Typography sx={{ opacity: 0.75 }}> <i>Coming soon to teams</i></Typography>
        </Box>
      </SettingsCard>

      <Card sx={{ borderColor: "error.main", borderWidth: 1 }}>
        <CardContent>
          <Stack mb={2} gap={1}>
            <Typography 
              variant="h6" 
              color="error" 
              fontWeight={600}
            > 
              Danger Zone
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8}}>
              You should be careful with this area. Actions from here can be detrimental to your team and permanently irrevisible! 
            </Typography>
          </Stack>

          <Stack maxWidth={250} gap={2} mt={5}>
            <Button tone="warm" onClick={leaveCurrentTeam}>
              Leave Team
            </Button>
            {isOwner && (
              <Button tone="danger" onClick={dissolveTeam}>
                Dissolve Team
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
