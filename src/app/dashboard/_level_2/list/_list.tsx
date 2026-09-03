import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  Stack,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Bug,
  Lightbulb,
  Clock,
  DollarSign,
  Users,
  Paperclip,
  Repeat,
  Calendar,
} from 'lucide-react';
import { Ticket } from '@/types/ticket';
import NoTickets from '../../_level_1/tEmpty';
import { TICKET_LIST_PROPS } from '../../_level_1/tSchema';
import { extractTicketData } from '../../_level_1/tFieldExtract';
import { priorityColor, getStatusColor } from '../../_level_1/tColorVariants';

export default function TicketsList({
  columns,
  tickets,
  onOpen,
}: TICKET_LIST_PROPS) {
  const theme = useTheme();

  if (!tickets || tickets.length === 0) return <NoTickets />;

  const formatDate = (dateStr: string | null, isDisabled: boolean) => {
    if (!dateStr) {
      return (
        <Typography variant="caption" color="text.disabled">
          —
        </Typography>
      );
    }

    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isOverdue = date < now && !isToday;

    if (isToday) {
      return (
        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
          Today{' '}
          <Box
            component="span"
            sx={{ color: 'warning.main', fontWeight: 700 }}
          >
            {date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Box>
        </Typography>
      );
    }

    return (
      <Typography
        variant="caption"
        sx={{
          color: isDisabled
            ? 'text.disabled'
            : isOverdue
              ? 'error.main'
              : 'text.secondary',
          fontWeight: isOverdue ? 700 : 500,
          letterSpacing: 0.2,
        }}
      >
        {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
        {isOverdue && ' · OVERDUE'}
      </Typography>
    );
  };

  const renderTypeLabel = (ticket: Ticket) => {
    if (!ticket.type) return 'Unknown';
    if (ticket.type === 'FEATURE_REQUEST') return 'Feature';
    return ticket.type
      .split(' ')
      .map((w) => w[0] + w.slice(1).toLowerCase())
      .join(' ');
  };

  const renderPriority = (ticket: Ticket) => {
    if (!ticket.priority) {
      return (
        <Typography variant="caption" color="text.disabled">
          —
        </Typography>
      );
    }
    return (
      <Chip
        label={ticket.priority}
        size="small"
        sx={{
          height: 22,
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: 0.3,
          bgcolor: alpha(priorityColor(ticket.priority), 0.6),
          color: '#fff',
          borderRadius: 1.5,
          '& .MuiChip-label': { px: 1 },
        }}
      /> 
    );
  };

  const renderStatus = (ticket: Ticket) => {
    const status =
      ticket.status === 'IN_PROGRESS' ? 'IN PROGRESS' : ticket.status;
    const { bg, color } = getStatusColor(ticket.status);

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          height: 22,
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          bgcolor: bg,
          color,
          borderRadius: 1.5,
          '& .MuiChip-label': { px: 1 },
        }}
      />
    );
  };

  const renderTags = (ticket: Ticket) => {
    if (!ticket.tags?.length) {
      return (
        <Typography variant="caption" color="text.disabled">
          —
        </Typography>
      );
    }
    return (
      <Stack direction="row" gap={0.6} flexWrap="wrap" useFlexGap>
        {ticket.tags.slice(0, 2).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              borderRadius: 1.2,
              borderColor: alpha(theme.palette.text.secondary, 0.22),
              color: 'text.secondary',
              bgcolor: alpha(theme.palette.background.default, 0.4),
            }}
          />
        ))}
        {ticket.tags.length > 2 && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ pt: 0.25, fontWeight: 500 }}
          >
            +{ticket.tags.length - 2}
          </Typography>
        )}
      </Stack>
    );
  };

  const renderAssignee = (ticket: Ticket) => {
    if (!ticket.assignedTo) {
      return (
        <Typography variant="caption" color="text.disabled">
          Unassigned
        </Typography>
      );
    }
    const name = ticket.assignedTo.name || ticket.assignedTo.email;
    return (
      <Tooltip title={name} arrow placement="top">
        <Avatar
          sx={{
            width: 28,
            height: 28,
            fontSize: 12,
            fontWeight: 700,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          {name[0].toUpperCase()}
        </Avatar>
      </Tooltip>
    );
  };

  const renderExtra = (ticket: Ticket) => {
    const data = extractTicketData(ticket);
    const items: React.ReactNode[] = [];

    if ('severity' in data && data.severity)
      items.push(
        <Chip
          key="sev"
          icon={<Bug size={11} />}
          label={data.severity}
          size="small"
          color="error"
          variant="outlined"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('impact' in data && data.impact)
      items.push(
        <Chip
          key="imp"
          icon={<Lightbulb size={11} />}
          label={data.impact}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('amount' in data && data.amount)
      items.push(
        <Chip
          key="amt"
          icon={<DollarSign size={11} />}
          label={`${data.amount} ${data.currency || 'USD'}`}
          size="small"
          color="success"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('estimatedTimeHours' in data && data.estimatedTimeHours)
      items.push(
        <Chip
          key="est"
          icon={<Clock size={11} />}
          label={`${data.estimatedTimeHours}h`}
          size="small"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('checklist' in data && data.checklist?.length)
      items.push(
        <Chip
          key="chk"
          label={`${data.checklist.length} items`}
          size="small"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('attendees' in data && data.attendees?.length)
      items.push(
        <Chip
          key="att"
          icon={<Users size={11} />}
          label={data.attendees.length}
          size="small"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('attachments' in data && data.attachments?.length)
      items.push(
        <Chip
          key="attch"
          icon={<Paperclip size={11} />}
          label={data.attachments.length}
          size="small"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );
    if ('recurrence' in data && data.recurrence)
      items.push(
        <Chip
          key="rec"
          icon={<Repeat size={11} />}
          label="Recurring"
          size="small"
          color="secondary"
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
      );

    if (!items.length) {
      return (
        <Typography variant="caption" color="text.disabled">
          —
        </Typography>
      );
    }

    return (
      <Stack direction="row" gap={0.6} flexWrap="wrap" useFlexGap>
        {items}
      </Stack>
    );
  };

  const gridTemplate = {
    md: 'minmax(240px, 2.4fr) 90px 100px 110px 110px minmax(110px, 1fr) 60px 90px minmax(130px, 1.2fr)',
  };

  return (
    <Box
      sx={{
        px: { xs: 0.5, sm: 1 },
        py: 1,
        display: 'grid',
        gap: 2, 
        width: { xs: '100%', sm: 'max-content' },
      }}
    >
      <Stack
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: gridTemplate.md,
          gap: 1.5,
          px: 2.5,
          py: 1.25,
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: alpha(theme.palette.text.primary, 0.03),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {columns?.includes('Title') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Title
          </Typography>
        )}
        {columns?.includes('Priority') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Priority
          </Typography>
        )}
        {columns?.includes('Type') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Type
          </Typography>
        )}
        {columns?.includes('Due Date') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Due
          </Typography>
        )}
        {columns?.includes('Status') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Status
          </Typography>
        )}
        {columns?.includes('Tags') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Tags
          </Typography>
        )}
        {columns?.includes('Assignee') && (
          <Typography
            variant="body2"
            fontWeight={700}
            color="text.secondary"
            textAlign="center"
          >
            Owner
          </Typography>
        )}
        {columns?.includes('Last Updated') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Updated
          </Typography>
        )}
        {columns?.includes('Extra') && (
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Extra
          </Typography>
        )}
      </Stack>

      <Stack spacing={1}>
        {tickets.map((ticket, index) => {
          const isClosed =
            ticket.status === 'CANCELLED' ||
            ticket.status === 'CLOSED' ||
            ticket.status === 'RESOLVED';

          const accentColor = ticket.priority
            ? priorityColor(ticket.priority)
            : alpha(theme.palette.text.disabled, 0.4);

          return (
            <Box
              key={ticket.id || index}
              onClick={() => onOpen(ticket.id)}
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr auto',
                  md: gridTemplate.md,
                },
                gap: { xs: 1.25, md: 1.5 },
                alignItems: 'center',
                pl: { xs: 1.75, md: 2.5 },
                pr: { xs: 1.5, sm: 2 },
                py: { xs: 1.6, sm: 1.4 },
                borderRadius: 2.5,
                cursor: 'pointer',
                bgcolor: 'background.paper',
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                overflow: 'hidden',

                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: accentColor,
                  borderRadius: '4px 0 0 4px',
                  transition: 'width 0.2s ease',
                },

                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.35),
                  boxShadow: `0 6px 20px ${alpha(theme.palette.common.black, 0.06)}`,
                  transform: 'translateY(-1px)',
                  bgcolor: alpha(theme.palette.primary.main, 0.025),
                  '&::before': {
                    width: 5,
                  },
                },

                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="flex-start"
                gap={1.25}
                sx={{ minWidth: 0 }}
              >
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Tooltip
                    title={
                      columns?.includes('No.')
                        ? `#${index + 1} · ${ticket.title}`
                        : ticket.title
                    }
                    arrow
                    placement="top-start"
                    enterDelay={400}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        lineHeight: 1.35,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        color: isClosed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {ticket.title}
                    </Typography>
                  </Tooltip>

                  <Stack
                    direction="row"
                    gap={1}
                    mt={0.9}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                  >
                    {columns?.includes('Priority') && renderPriority(ticket)}
                    {columns?.includes('Status') && renderStatus(ticket)}
                    {columns?.includes('Due Date') && (
                      <Stack direction="row" alignItems="center" gap={0.4}>
                        <Calendar size={12} style={{ opacity: 0.55 }} />
                        {formatDate(ticket.dueDate, isClosed)}
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </Stack>

              {columns?.includes('Priority') && (
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {renderPriority(ticket)}
                </Box>
              )}
              {columns?.includes('Type') && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  {renderTypeLabel(ticket)}
                </Typography>
              )}
              {columns?.includes('Due Date') && (
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {formatDate(ticket.dueDate, isClosed)}
                </Box>
              )}
              {columns?.includes('Status') && (
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {renderStatus(ticket)}
                </Box>
              )}
              {columns?.includes('Tags') && (
                <Box
                  sx={{ display: { xs: 'none', md: 'block' }, minWidth: 0 }}
                >
                  {renderTags(ticket)}
                </Box>
              )}
              {columns?.includes('Assignee') && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                  }}
                >
                  {renderAssignee(ticket)}
                </Box>
              )}
              {columns?.includes('Last Updated') && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    fontWeight: 500,
                  }}
                >
                  {ticket.updatedAt
                    ? new Date(ticket.updatedAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '—'}
                </Typography>
              )}
              {columns?.includes('Extra') && (
                <Box
                  sx={{ display: { xs: 'none', md: 'block' }, minWidth: 0 }}
                >
                  {renderExtra(ticket)}
                </Box>
              )}

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  gridColumn: '1 / -1',
                  pt: 0.75,
                  mt: 0.25,
                  borderTop: columns?.some((col) =>
                    ['Assignee', 'Tags', 'Extra'].includes(col)
                  )
                    ? `1px solid ${alpha(theme.palette.divider, 0.45)}`
                    : 'none',
                }}
              >
                <Stack
                  direction="row"
                  gap={1.25}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  {columns?.includes('Assignee') && renderAssignee(ticket)}
                  {columns?.includes('Tags') && renderTags(ticket)}
                </Stack>
                {columns?.includes('Extra') && (
                  <Box sx={{ maxWidth: '55%', overflow: 'hidden' }}>
                    {renderExtra(ticket)}
                  </Box>
                )}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}