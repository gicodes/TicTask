import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  TicketCheck,
  Ticket,
  CircleDot,
  Users,
  UserRoundCheck,
  Copy,
  Check,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';
import { ProfileActivityProps } from '@/types/users';

export function ProfileActivitySection({
  tickets = [],
  closedTickets = [],
  startedTickets = [],
  assignedTickets = [],
  referralCode,
  createdTeams = [],
  teamMemberships = [],
  teamMembership,
}: ProfileActivityProps) {
  const [copied, setCopied] = useState(false);

  const copyReferralCode = async () => {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy referral code:', error);
    }
  };

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
      >
        Activity & Participation
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

      {(teamMembership !== null || referralCode) && (
        <>
          <Divider sx={{ my: 2 }} />

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
                  color={
                    teamMembership
                      ? 'success.main'
                      : 'text.secondary'
                  }
                >
                  {teamMembership ? 'Member' : 'No team'}
                </Typography>
              </Stack>
            )}

            {referralCode && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Stack>
                  <Typography variant="body2" fontWeight={500}>
                    Referral code
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Share this code to earn referrals
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      fontFamily: 'monospace',
                      letterSpacing: 0.5,
                    }}
                  >
                    {referralCode}
                  </Typography>

                  <Tooltip title={copied ? 'Copied!' : 'Copy referral code'}>
                    <IconButton
                      size="small"
                      onClick={copyReferralCode}
                      color={copied ? 'success' : 'default'}
                    >
                      {copied ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            )}
          </Stack>
        </>
      )}
    </Paper>
  );
}