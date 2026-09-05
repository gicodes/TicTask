'use client';

import React from 'react';
import {
  Box,
  Chip,
  Stack,
  Avatar,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { Calendar } from 'lucide-react';

export interface TicketListRowTemplateProps {
  title: string;
  priority?: string;
  status?: string;
  dueDate?: string | null;
  tags?: string[]; 
  type?: string;
  assignee?: { name?: string; email?: string } | null;
  accentColor?: string;
  compact?: boolean;
}

export const TicketListRowTemplate: React.FC<TicketListRowTemplateProps> = ({
  title,
  priority,
  status,
  dueDate,
  tags = [],
  assignee,
  accentColor = '#6366f1',
  compact = false,
}) => {
  const theme = useTheme();
  const now = new Date();
  const due = dueDate ? new Date(dueDate) : null;
  const isDueToday = due && due.toDateString() === now.toDateString();
  const isOverdue = due && due < now && !isDueToday;

  return (
    <Box
      sx={{
        position: 'relative',
        p: compact ? 1.25 : 1.5,
        pl: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        overflow: 'hidden',
        maxWidth: compact ? 320 : 420,
        minHeight: 180,
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: accentColor,
        },
      }}
    >
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          lineHeight: 1.35,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          mb: 1,
        }}
        color="text.primary"
      >
        {title}
      </Typography>

      <Stack direction="row" gap={0.75} flexWrap="wrap" alignItems="center">
        {priority && (
          <Chip
            label={priority}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: alpha(accentColor, 0.85),
              color: '#fff',
            }}
          />
        )}
        {status && (
          <Chip
            label={status.replace('_', ' ')}
            size="small"
            sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
          />
        )}
        {dueDate && (
          <Stack direction="row" alignItems="center" gap={0.4}>
            <Calendar size={12} style={{ opacity: 0.6 }} />
            <Typography
              variant="caption"
              fontWeight={isOverdue || isDueToday ? 700 : 500}
              color={isOverdue ? 'error.main' : isDueToday ? 'warning.main' : 'text.secondary'}
            >
              {isOverdue ? 'OVERDUE' : isDueToday ? 'Today' : new Date(dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Typography>
          </Stack>
        )}
      </Stack>

      {(tags.length > 0 || assignee) && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1.25}>
          <Stack direction="row" gap={0.5}>
            {tags.slice(0, 2).map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem' }} />
            ))}
          </Stack>
          {assignee && (
            <Avatar sx={{ width: 22, height: 22, fontSize: 10, bgcolor: 'primary.main' }}>
              {(assignee.name?.[0] || assignee.email?.[0] || '?').toUpperCase()}
            </Avatar>
          )}
        </Stack>
      )}
    </Box>
  );
};