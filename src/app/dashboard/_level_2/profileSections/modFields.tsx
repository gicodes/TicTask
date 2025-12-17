'use client';

import type { User } from '@/types/users';
import { Paper, Typography, useTheme } from '@mui/material';

export function ModeratorSection({ profile }: { profile: User }) {
  const theme = useTheme();

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
        Moderator & Contributor Info
      </Typography>

      <Typography
        variant="body2"
        color="text.disabled"
        fontStyle="italic"
        sx={{ opacity: 0.5 }}
      >
        ・
        {profile?.collab
          ? 'Private access to product templates, docs and collaboration tools'
          : profile?.partner
          ? `Partner Role: ${
              profile?.partnerRole ||
              'Private access to changelogs, beta features and partner resources'
            }`
          : 'Admin privileges enabled'}
      </Typography>
    </Paper>
  );
}
