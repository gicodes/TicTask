'use client';

import React from 'react';
import { Ticket } from '@/types/ticket';
import { extractTicketData, formatAmount } from '../_level_1/tFieldExtract';
import { priorityColor, getTypeColor, TYPE_COLORS } from '../_level_1/tColorVariants';
import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Box,
  Tooltip,
  IconButton,
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
import { TICKET_TYPE_ICONS } from '../_level_1/tSchema';

interface TicketCardProps {
  ticket: Ticket;
  onOpen?: (id: number) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onOpen }) => {
  const fields = extractTicketData(ticket);
  const IconComponent = TICKET_TYPE_ICONS[ticket.type];

  const hasDueDate = !!ticket.dueDate;
  const isOverdue = hasDueDate && new Date(ticket.dueDate!) < new Date();
  const dueDateLabel = hasDueDate
    ? new Date(ticket.dueDate!).toLocaleDateString() : '';

  return (
    <Paper
      elevation={2}
      onClick={() => onOpen?.(ticket.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen?.(ticket.id)}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderLeft: `4px solid ${getTypeColor(ticket.type)}`,
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={0.5} flex={1}>
            <IconButton size="small" sx={{ p: 0.5, color: TYPE_COLORS[ticket.type]}}>
              {IconComponent ? <IconComponent size={18} /> : <TicketCheck size={18} />}
            </IconButton>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              noWrap
              sx={{ flex: 1 }}
            >
              {ticket.title}
            </Typography>
          </Stack>

          {ticket.priority && (
            <Chip
              label={ticket.priority}
              size="small"
              sx={{
                bgcolor: priorityColor(ticket.priority),
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.65rem',
              }}
            />
          )}
        </Stack>

        {ticket.tags && ticket.tags.length > 0 && (
          <Stack direction="row" gap={0.5} flexWrap="wrap">
            {ticket.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.65rem', height: 20 }}
              />
            ))}
            {ticket.tags.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{ticket.tags.length - 3}
              </Typography>
            )}
          </Stack>
        )}

        <Stack direction="row" pl={1} gap={1} flexWrap="wrap">
          {'severity' in fields && fields.severity && (
            <Chip
              icon={<Bug size={14} />}
              label={fields.severity}
              size="small"
              color="error"
              variant="outlined"
              sx={{ fontSize: '0.65rem' }}
            />
          )}

          {'impact' in fields && fields.impact && (
            <Chip
              icon={<Lightbulb size={14} />}
              label={`Impact: ${fields.impact}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: '0.65rem' }}
            />
          )}

          {'amount' in fields && fields.amount && (
            <Chip
              icon={<FaMoneyBill size={14} />}
              label={`${formatAmount(fields.amount)} ${fields.currency || 'USD'}`}
              size="small"
              color="success"
              sx={{ fontSize: '0.65rem', px: 0.5 }}
            />
          )}

          {'estimatedTimeHours' in fields && fields.estimatedTimeHours && (
            <Chip
              icon={<Clock size={14} />}
              label={`${fields.estimatedTimeHours}h`}
              size="small"
              sx={{ fontSize: '0.65rem' }}
            />
          )}

          {'checklist' in fields && fields.checklist?.length ? (
            <Chip
              label={`${fields.checklist.length} items`}
              size="small"
              sx={{ fontSize: '0.65rem' }}
            />
          ) : null}

          {'subtasks' in fields && fields.subtasks?.length ? (
            <Chip
              label={`${fields.subtasks.length} subtasks`}
              size="small"
              sx={{ fontSize: '0.65rem' }}
            />
          ) : null}

          {'attendees' in fields && fields.attendees?.length ? (
            <Chip
              icon={<Users size={14} />}
              label={`${fields.attendees.length} attendees`}
              size="small"
              sx={{ fontSize: '0.65rem' }}
            />
          ) : null}

          {'attachments' in fields && fields.attachments?.length ? (
            <Chip
              icon={<Paperclip size={14} />}
              label={`${fields.attachments.length}`}
              size="small"
              sx={{ fontSize: '0.65rem' }}
            />
          ) : null}

          {'recurrence' in fields && fields.recurrence && (
            <Chip
              icon={<Repeat size={14} />}
              label="Recurring"
              size="small"
              color="secondary"
              sx={{ fontSize: '0.65rem' }}
            />
          )}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Box>
            {hasDueDate && (
              <Typography
                variant="caption"
                letterSpacing={isOverdue ? 1.5 : 0.5}
                color={isOverdue ? 'error' : 'text.secondary'}
              >
                {isOverdue ? <>
                  <strong>OVERDUE ⛔️</strong></> : <>Due on {dueDateLabel}</>}
              </Typography>
            )}
          </Box>

          <Stack direction="row" alignItems="center" gap={1}>
            {ticket.assignedTo && (
              <Tooltip title={`Assigned to ${ticket.assignedTo.name || ticket.assignedTo.email}`}>
                <Avatar
                  sx={{
                    width: 26,
                    height: 26,
                    fontSize: 12,
                    bgcolor: 'primary.main',
                  }}
                >
                  {ticket.assignedTo.name?.[0] || ticket.assignedTo.email[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            )}

            <Typography variant="caption" color="text.disabled">
              {ticket.updatedAt
                ? new Date(ticket.updatedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                : ''}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TicketCard;
