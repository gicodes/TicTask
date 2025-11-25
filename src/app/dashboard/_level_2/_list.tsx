'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Avatar,
  Tooltip,
  Paper,
  Stack,
} from '@mui/material';
import {
  Bug,
  Lightbulb,
  Clock,
  DollarSign,
  Users,
  Paperclip,
  Repeat,
} from 'lucide-react';

import { Ticket } from '@/types/ticket';
import { extractTicketData } from '../_level_1/tFieldExtract';
import { priorityColor, getStatusColor } from '../_level_1/tColorVariants';

interface TicketsListProps {
  columns: string[];
  tickets: Ticket[];
  onOpen: (id: number) => void;
}

export default function TicketsList({ 
  columns, 
  tickets, 
  onOpen 
}: TicketsListProps ) {
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => {
      if (a.priority !== b.priority) {
        const order = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return (order[a.priority ?? 'LOW'] ?? 3) - (order[b.priority ?? 'LOW'] ?? 3);
      }
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [tickets]);
  
  if (!tickets || tickets.length === 0) {
    return (
      <Box
        mt={6}
        py={12}
        textAlign="center"
        border="1px dashed"
        borderColor="divider"
        borderRadius={3}
        bgcolor="background.paper"
      >
        <Typography variant="h6" color="text.secondary">
          No tickets here yet
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Create one to get started
        </Typography>
      </Box>
    );
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return <Typography color="text.disabled">—</Typography>;
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isOverdue = date < now && !isToday;

    if (isToday) {
      return (
        <Typography variant='body2' color='primary'>
          <strong>Today</strong> @{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      );
    }

    return (
      <Typography color={isOverdue ? 'error' : 'text.primary'} variant='body2'>
        {isOverdue && 'OVERDUE • '}
        {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
      </Typography>
    );
  };

  const renderTypeCell = (ticket: Ticket) => {
    return (
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="body2" fontWeight={500}>
          {ticket.type === 'FEATURE_REQUEST' ? 'Feature' : (ticket.type[0]+ticket.type.slice(1).toLocaleLowerCase())}
        </Typography>
      </Stack>
    );
  };

  const renderPriorityCell = (ticket: Ticket) => {
    if (!ticket.priority) return <Typography color="text.disabled">—</Typography>;
    return (
      <Chip
        label={ticket.priority}
        size="small"
        sx={{
          bgcolor: priorityColor(ticket.priority),
          color: 'white',
          fontWeight: 600,
          fontSize: '0.7rem',
        }}
      />
    );
  };

  const renderStatusCell = (ticket: Ticket) => {
    const status = ticket.status === 'IN_PROGRESS' ? 'IN PROGRESS' : ticket.status;
    const { bg, color } = getStatusColor(ticket.status);
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: bg,
          color,
          fontWeight: 600,
          fontSize: '0.7rem',
          textTransform: 'uppercase',
        }}
      />
    );
  };

  const renderTagsCell = (ticket: Ticket) => {
    if (!ticket.tags || ticket.tags.length === 0) return <Typography color="text.disabled">—</Typography>;
    return (
      <Stack direction="row" gap={0.5} flexWrap="wrap">
        {ticket.tags.slice(0, 3).map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />
        ))}
        {ticket.tags.length > 3 && (
          <Typography variant="caption" color="text.secondary">
            +{ticket.tags.length - 3}
          </Typography>
        )}
      </Stack>
    );
  };

  const renderAssigneeCell = (ticket: Ticket) => {
    if (!ticket.assignedTo) return <Typography color="text.disabled">Unassigned</Typography>;
    return (
      <Tooltip title={ticket.assignedTo.name || ticket.assignedTo.email}>
        <Avatar
          sx={{
            width: 28,
            height: 28,
            fontSize: 12,
            bgcolor: 'primary.main',
          }}
        >
          {(ticket.assignedTo.name || ticket.assignedTo.email)[0].toUpperCase()}
        </Avatar>
      </Tooltip>
    );
  };

  const renderExtraInfo = (ticket: Ticket) => {
    const data = extractTicketData(ticket);

    return (
      <Stack direction="row" gap={1} flexWrap="wrap">
        {'severity' in data && data.severity && (
          <Chip icon={<Bug size={12} />} label={data.severity} size="small" color="error" variant="outlined" />
        )}
        {'impact' in data && data.impact && (
          <Chip icon={<Lightbulb size={12} />} label={data.impact} size="small" color="primary" variant="outlined" />
        )}
        {'amount' in data && data.amount && (
          <Chip icon={<DollarSign size={12} />} label={`${data.amount} ${data.currency || 'USD'}`} size="small" color="success" />
        )}
        {'estimatedTimeHours' in data && data.estimatedTimeHours && (
          <Chip icon={<Clock size={12} />} label={`${data.estimatedTimeHours}h`} size="small" />
        )}
        {'checklist' in data && data.checklist?.length && (
          <Chip label={`${data.checklist.length} items`} size="small" />
        )}
        {'attendees' in data && data.attendees?.length && (
          <Chip icon={<Users size={12} />} label={data.attendees.length} size="small" />
        )}
        {'attachments' in data && data.attachments?.length && (
          <Chip icon={<Paperclip size={12} />} label={data.attachments.length} size="small" />
        )}
        {'recurrence' in data && data.recurrence && (
          <Chip icon={<Repeat size={12} />} label="Recurring" size="small" color="secondary" />
        )}
      </Stack>
    );
  };

  return (
    <Box py={3} px={2} maxWidth={'96vw'}>
      <Box
        sx={{
          my: 3,
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          borderRadius: 2,
          border: '0.1px solid var(--dull-gray)',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { height: 6,},
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--secondary)',
            borderRadius: 10,
          },
          '@media (max-width: 600px)': {
            display: 'block',
            maxWidth: '90vw',
          },
        }}
      >
        <Box
          sx={{
            minWidth: 750,
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'auto',
          }}
        >
          <TableContainer 
            component={Paper} 
            elevation={0} 
            sx={{ 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: 2 
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns?.map((col, i) => (
                    <TableCell 
                      key={i} 
                      sx={{ 
                        fontWeight: 600, 
                        bgcolor: 'background.paper', 
                        color: 'text.primary',
                        height: 60
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTickets.map((ticket, index) => (
                  <TableRow
                    key={ticket.id}
                    hover
                    onClick={() => onOpen(ticket.id)}
                    sx={{
                      height: 48,
                      cursor: 'pointer',
                      '&:last-child td': { border: 0 },
                      bgcolor: index % 2 === 0 ? 'action.hover' : 'transparent',
                    }}
                  >
                    {columns?.includes('No.') && (
                      <TableCell>
                        <Typography variant="body2">{index + 1}</Typography>
                      </TableCell>
                    )}
                    {columns?.includes('Title') && (
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1.5}>
                          <Typography variant="body2" fontWeight={500}>
                            {ticket.title}
                          </Typography>
                        </Stack>
                      </TableCell>
                    )}
                    {columns?.includes('Priority') && <TableCell>
                      {renderPriorityCell(ticket)}
                    </TableCell>}
                    {columns?.includes('Due Date') && <TableCell>
                      {formatDate(ticket.dueDate)}
                    </TableCell>}
                    {columns?.includes('Status') && <TableCell>
                      {renderStatusCell(ticket)}
                    </TableCell>}
                    {columns?.includes('Tags') && <TableCell>
                      {renderTagsCell(ticket)}
                    </TableCell>}
                    {columns?.includes('Assignee') && <TableCell>
                      {renderAssigneeCell(ticket)}
                    </TableCell>}
                    {columns?.includes('Type') && <TableCell>
                      {renderTypeCell(ticket)}
                    </TableCell>}
                    {columns?.includes('Last Updated') && (
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : '—'}
                        </Typography>
                      </TableCell>
                    )}
                    {columns?.includes('Extra') && <TableCell>{renderExtraInfo(ticket)}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
