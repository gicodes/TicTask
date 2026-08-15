import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  TicketCheck,
  Ticket,
  CircleDot,
  Users,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { ProfileActivityProps } from '@/types/users';

export function ProfileActivitySection({
  tickets = [],
  closedTickets = [],
  startedTickets = [],
  assignedTickets = [],
  createdTeams = [],
  teamMemberships = [],
  teamMembership,
}: ProfileActivityProps) {
  const stats = [
    {
      label: 'Tickets created',
      value: tickets.length,
      icon: <Ticket size={17} />,
    },
    {
      label: 'Tickets closed',
      value: closedTickets.length,
      icon: <TicketCheck size={17} />,
    },
    {
      label: 'Tickets started',
      value: startedTickets.length,
      icon: <CircleDot size={17} />,
    },
    {
      label: 'Tickets assigned',
      value: assignedTickets.length,
      icon: <UsersRound size={17} />,
    },
    {
      label: 'Teams owned',
      value: createdTeams.length,
      icon: <Users size={17} />,
    },
    {
      label: 'Team memberships',
      value: teamMemberships.length,
      icon: <UserRoundCheck size={17} />,
    },
  ];

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="subtitle2"
        color="text.secondary"
        mb={2}
        pb={1}                     
        borderBottom={'1px dashed var(--disabled)'}
      >
        Workflow & Collaboration
      </Typography>

      <Stack spacing={1.5}>
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'action.hover',
                    color: 'text.secondary',
                  }}
                >
                  {stat.icon}
                </Box>

                <Typography variant="body2">
                  {stat.label}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                fontWeight={600}
              >
                {stat.value}
              </Typography>
            </Stack>

            {index < stats.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Stack>

      {(teamMembership !== null) && (
        <Stack spacing={1.5}>
          {teamMembership !== null && teamMembership !== undefined && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack>
                <Typography variant="body2" fontWeight={500}>
                  Team membership
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Your current participation status
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                fontWeight={600}
                color={ teamMembership ? 'success.main': 'text.secondary'}
              >
                {teamMembership ? 'Member' : 'No team'}
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    </Paper>
  );
}