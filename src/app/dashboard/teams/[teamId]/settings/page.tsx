"use client";

import Link from "next/link";
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

   const subscriptionPlan = 
    team?.subscription?.plan === "STANDARD" ? "Standard"
    : team?.subscription?.plan === ("PRO_MONTH") ? "Pro x Month" 
    : team?.subscription?.plan === ("ENTERPRISE_MONTH") ? "Enterprise x Month"
    : team?.subscription?.plan === ("PRO_ANNUAL") ? "Pro x Year" 
    : team?.subscription?.plan === ("ENTERPRISE_ANNUAL") ? "Enterprise x Month"
    : "Pro +"

  if (!isAuthenticated) return;

  return (
    <Box maxWidth={800}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack mb={2} gap={1}>
            <Typography 
              variant="h6" 
              fontWeight={600}
            > 
              Appearance 
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8}}>
              Configure the appearance of your team&apos;s workspace and playground
            </Typography>
          </Stack>

          <Box py={2}>
            <Typography sx={{ opacity: 0.75 }}> <i>Not Available To Your Team Yet</i></Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack mb={2} gap={1}>
            <Typography 
              variant="h6" 
              fontWeight={600}
            > 
              Team Profile
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8}}>
              Only team owners are allowed to mutate team name and description
            </Typography>
          </Stack>

          <Grid display={'grid'} gap={2}>
            <TextField
              label="Team Name"
              placeholder={team?.name}
              value={name ?? ""}
              disabled={!isOwner}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Description"
              placeholder={team?.description || "No description"}
              value={description ?? ""}
              multiline
              rows={3}
              disabled={!isOwner}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button tone="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack mb={2} gap={1}>
            <Typography 
              variant="h6" 
              fontWeight={600}
            > 
              Notifications 
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8}}>
              Configure how members of your team gets notified on ticket activities
            </Typography>
          </Stack>

          <Box py={2}>
            <Typography sx={{ opacity: 0.75 }}> <i>Not Available To Your Team Yet</i></Typography>
          </Box>
        </CardContent>
      </Card>

      <SettingsCard
        title="Subscriptions"
        subtitle="View your current plan and manage your subscription."
      >
        <Stack spacing={2}>
          <Typography variant="body1">
            <strong>Current Plan:</strong> {subscriptionPlan}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Renews on:</strong> {team?.subscription?.expiresAt ?? "---"}
          </Typography>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Button component={Link} href="/dashboard/subscription">
              Manage Subscription
            </Button>
            <Button component={Link} href="/product/pricing" tone='secondary'>
              See Plans & Prices
            </Button>
          </Stack>
        </Stack>
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
