'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Bug,
  Lightbulb,
  Clock,
  Users,
  Paperclip,
  Repeat,
  TicketCheck,
} from 'lucide-react';
import { FaMoneyBill } from 'react-icons/fa';

export interface TicketCardTemplateProps {
  title: string;
  type?: string;
  status?: string;
  priority?: string;
  tags?: string[];
  assignee?: { name?: string; email?: string } | null;
  dueDate?: string | null;
  updatedAt?: string | null;

  severity?: string;
  impact?: string;
  amount?: number | string;
  currency?: string;
  estimatedHours?: number;
  checklistCount?: number;
  subtaskCount?: number;
  attendeeCount?: number;
  attachmentCount?: number;
  isRecurring?: boolean;

  accentColor?: string;
  compact?: boolean;
}

export const TicketCardTemplate: React.FC<TicketCardTemplateProps> = ({
  title,
  type = 'TASK',
  priority,
  tags = [],
  assignee,
  dueDate,
  updatedAt,
  severity,
  impact,
  amount,
  currency = 'USD',
  estimatedHours,
  checklistCount,
  subtaskCount,
  attendeeCount,
  attachmentCount,
  isRecurring,
  accentColor = '#6366f1',
  compact = false,
}) => {
  const now = new Date();
  const due = dueDate ? new Date(dueDate) : null;
  const isDueToday = due && due.toDateString() === now.toDateString();
  const isOverdue = due && due < now && !isDueToday;

  return (
    <Paper
      elevation={compact ? 1 : 2}
      sx={{
        p: compact ? 1.5 : 2,
        borderRadius: 2,
        borderLeft: `4px solid ${accentColor}`,
        transition: 'all 0.2s ease',
        maxWidth: compact ? 280 : 340,
        width: '100%',
      }}
    >
      <Stack spacing={compact ? 1 : 1.5}>
        {/* Title + Priority */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
          <Stack direction="row" alignItems="flex-start" gap={0.75} flex={1} minWidth={0}>
            <TicketCheck size={16} style={{ marginTop: 2, color: accentColor, flexShrink: 0 }} />
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                flex: 1,
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: compact ? 2 : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </Typography>
          </Stack>
          {priority && (
            <Chip
              label={priority}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.65rem',
                fontWeight: 700,
                bgcolor: accentColor,
                color: '#fff',
                flexShrink: 0,
              }}
            />
          )}
        </Stack>

        {tags.length > 0 && (
          <Stack direction="row" gap={0.5} flexWrap="wrap">
            {tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.65rem' }}
              />
            ))}
            {tags.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{tags.length - 3}
              </Typography>
            )}
          </Stack>
        )}

        <Stack direction="row" gap={0.5} flexWrap="wrap">
          {severity && (
            <Chip icon={<Bug size={12} />} label={severity} size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
          {impact && (
            <Chip icon={<Lightbulb size={12} />} label={impact} size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
          {amount && (
            <Chip icon={<FaMoneyBill size={12} />} label={`${amount} ${currency}`} size="small" color="success" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
          {estimatedHours && (
            <Chip icon={<Clock size={12} />} label={`${estimatedHours}h`} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
          {checklistCount ? <Chip label={`${checklistCount} items`} size="small" sx={{ height: 20, fontSize: '0.65rem' }} /> : null}
          {subtaskCount ? <Chip label={`${subtaskCount} sub`} size="small" sx={{ height: 20, fontSize: '0.65rem' }} /> : null}
          {attendeeCount ? <Chip icon={<Users size={12} />} label={attendeeCount} size="small" sx={{ height: 20, fontSize: '0.65rem' }} /> : null}
          {attachmentCount ? <Chip icon={<Paperclip size={12} />} label={attachmentCount} size="small" sx={{ height: 20, fontSize: '0.65rem' }} /> : null}
          {isRecurring && (
            <Chip icon={<Repeat size={12} />} label="Recurring" size="small" color="secondary" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            {dueDate && (
              <Typography
                variant="caption"
                fontWeight={isOverdue || isDueToday ? 700 : 500}
                color={isOverdue ? 'error.main' : isDueToday ? 'warning.main' : 'text.secondary'}
              >
                {isOverdue ? 'OVERDUE ⚠️' : isDueToday ? 'DUE TODAY' : `Due ${new Date(dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
              </Typography>
            )}
          </Box>
          <Stack direction="row" alignItems="center" gap={1}>
            {assignee && (
              <Tooltip title={assignee.name || assignee.email}>
                <Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: 'primary.main' }}>
                  {(assignee.name?.[0] || assignee.email?.[0] || '?').toUpperCase()}
                </Avatar>
              </Tooltip>
            )}
            {updatedAt && (
              <Typography variant="caption" color="text.disabled">
                {new Date(updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};