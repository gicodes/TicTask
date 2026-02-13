'use client';

import React from 'react';
import {
  Typography,
  Stack,
  Card,
  CardContent,
} from '@mui/material';

export default function SettingsCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" gap={1} mb={1}>
          {icon}
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            {subtitle}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}