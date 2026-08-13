'use client';

import { getTimeOfDayGreeting, getRandomGreeting, GREETINGS } from '../../_level_1/getGreeting';
import { Box, Typography, Tooltip, Divider } from '@mui/material';
import DashboardOnboarding from '../../_level_0/onboardTips';
import AuthRedirectBtn from '@/assets/authRedirectBtn';
import React, { useEffect, useState } from 'react';
import TicketsPage from '../../_level_3/ticket';
import { useAuth } from '@/providers/auth';
import Link from 'next/link';

const Page = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const { user, loading, isAuthenticated } = useAuth();

  const name = user?.name?.split(' ')[0] || user?.organization?.split(' ')[0] || "User";

  const nameFirst = greeting.includes('?') || greeting.includes('!');

  const greetingLowercase = greeting
    ? `${greeting[0].toLowerCase()}${greeting.slice(1)}`
    : '';

  useEffect(() => {
    const interval = setInterval(
      () => setTime(new Date()),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeOfDay = getTimeOfDayGreeting(new Date());
    const timeSpecificSpunnedGreeting = getRandomGreeting(GREETINGS[timeOfDay]);

    setGreeting(timeSpecificSpunnedGreeting);
  }, []);

  if (loading) return (
    <Box textAlign="center" p={4}>
      Loading Tickets View...
    </Box>
  );

  if (!isAuthenticated) return (
    <Box textAlign="center" px={2} display="grid" gap={10} py={10}>
      <Typography>
        Please <AuthRedirectBtn /> to access dashboard
      </Typography>
    </Box>
  );

  return (
    <Box py={1}>
      <DashboardOnboarding />

      <Box
        px={3}
        py={1}
        gap={1}
        width="100%"
        alignItems="center"
        display={{ xs: 'grid', md: 'flex' }}
      >
        <Box display="flex" justifyContent="left" width="100%">
          <Typography variant="h6" fontWeight={501}>
            {nameFirst ? (
              <>
                <Tooltip title="Go to profile">
                  <Link
                    href="/dashboard/profile"
                    style={{ opacity: 0.8 }}
                  >
                    {name}
                  </Link>
                </Tooltip>
                {`, ${greetingLowercase}`}
              </>
            ) : (
              <>
                <span style={{ opacity: 0.6 }}>
                  {greeting}
                </span>{' '}
                <Tooltip title="Go to profile">
                  <Link
                    href="/dashboard/profile"
                    style={{ opacity: 0.8 }}
                  >
                    {name}
                  </Link>
                </Tooltip>
              </>
            )}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="right" width="100%">
          <Tooltip title="Every Second Counts ⏱️">
            <Typography variant="subtitle2">
              {time.toLocaleString()}
            </Typography>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />

      <TicketsPage />
    </Box>
  );
};

export default Page;