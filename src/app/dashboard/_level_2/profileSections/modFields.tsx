'use client';

import type { User } from '@/types/users';
import { Divider, Paper, Stack, Typography, useTheme } from '@mui/material';

export function ModeratorSection({ profile }: { profile: User }) {
  const theme = useTheme();

  const accountLabel =
    profile.role === "ADMIN"
      ? "Admin Account"
      : profile.partnerRole?.includes("Sponsor")
      ? "Sponsor Account"
      : profile.partnerRole === "Moderator"
      ? "Moderator Account"
      : profile.collab
      ? "Collaborator Account"
      : profile.partnerRole?.includes("Developer")
      ? "Developer Account"
      : "Contributor Account";

  const accessLevel =
    profile.role === "ADMIN"
      ? "Administrator"
      : profile.partnerRole?.includes("Sponsor")
      ? "Sponsor"
      : profile.partnerRole === "Moderator"
      ? "Moderator"
      : profile.collab
      ? "Collaborator"
      : profile.partnerRole?.includes("Developer")
      ? "Developer"
      : "Contributor";

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
        bgcolor: theme.palette.warning.light + '15',
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
        <strong>{accountLabel} Information</strong>
      </Typography>

      <Stack p={1} spacing={1}>
        <Typography variant="body2">
          <strong>Access Level:</strong>&nbsp; <i>{accessLevel}</i>
        </Typography>

        <Typography variant="caption" sx={{ opacity: 0.5 }}>
          { profile.role === "ADMIN"
            ? "Full administrative access to all organizations, users, projects, tickets, billing, and system-wide configurations"
            : profile.partnerRole?.includes("Sponsor")
            ? "Private access to strategic dashboards, performance analytics, financial reports, and sponsored initiatives"
            : profile.partnerRole === "Moderator"
            ? "Private access to moderation tools, changelogs, beta features, user reports, and platform governance resources"
            : profile.collab
            ? "Private access to shared workspaces, product templates, internal documentation, and collaboration tools"
            : profile.partnerRole?.includes("Developer")
            ? "Private access to developer tools, API documentation, webhooks, integrations, and sandbox environments"
            : "Elevated contributor privileges with enhanced creation, review, and task execution capabilities"
          }
        </Typography>
        <Stack py={1}><Divider /></Stack>

        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          <strong>Platform Capabilities:</strong>&nbsp;
          {profile.role === "ADMIN"
            ? "Create, manage, and oversee all tickets, tasks, workflows, automations, and organizational structures"
            : profile.partnerRole === "Moderator"
            ? "Review, moderate, escalate, and resolve tickets and tasks across assigned scopes"
            : "Create, update, and collaborate on tickets and tasks within assigned projects"}
        </Typography>

        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          <strong>Governance & Visibility:</strong>&nbsp;
          {profile.role === "ADMIN"
            ? "Full visibility across all organizations, audit logs, activity feeds, and system events"
            : profile.partnerRole === "Moderator"
            ? "Visibility into flagged activities, reports, user actions, and resolution history"
            : "Visibility limited to assigned teams, projects, and shared workspaces"}
        </Typography>

        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          <strong>AI & Automation:</strong>&nbsp;
          {profile.role === "ADMIN"
            ? "Access to advanced AI orchestration, workflow automation rules, and system-wide AI configuration"
            : "AI-assisted task creation, summaries, prioritization, and smart recommendations"}
        </Typography>

        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          <strong>AI Credits:</strong>&nbsp; <i>Unlimited</i>
        </Typography>
      </Stack>
    </Paper>
  );
}