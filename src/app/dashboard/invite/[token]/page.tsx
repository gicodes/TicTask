'use client';

import { apiPost } from '@/lib/api';
import { Typography } from '@mui/material';
import { useAuth } from '@/providers/auth';
import { useEffect, useState } from 'react';
import { GenericAPIRes } from '@/types/axios';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AcceptInvitePage() {
  const { user } = useAuth();
  const router = useRouter();
  const token = useSearchParams().get('token');
  const [status, setStatus] = useState('pending');

  async function acceptInvite() {
    if (!token) return;
    
    const res: GenericAPIRes = await apiPost('/invite/accept', token);

    if (res.ok) {
      setStatus('success');
      setTimeout(() => router.push('/auth/join/user'), 2000);
    } else setStatus('failed');
  }

  async function acceptTeamInvite() {
    if (!token || !user) return;
  
    const credentials = { token, userId: user?.id };
    const res: GenericAPIRes = await apiPost('/team/accept-invite', credentials);

    if (res.ok) {
      setStatus('success');
      setTimeout(() => router.push('/dashboard'), 2000);
    } else setStatus('failed');
  }

  // in future releases, we can differentiate between: 
  // rir invites, team invites, team-admin invites *, contributor invites *, moderator invites *, partner invites *,

  useEffect(() => {
    try {
      if (token?.startsWith('team_')) {
        if (user && token) acceptTeamInvite();
        return;
      }

      if (token) acceptInvite();
    } catch {
      setStatus('failed');
      setTimeout(() => router.push('/dashboard'), 2000);
    }

  }, [token, router, acceptInvite, acceptTeamInvite]);

  if (status === 'pending') return (
    <Typography textAlign={'center'} py={8}>Accepting invite...</Typography>
  );
  
  if (status === 'success') return (
    <Typography textAlign={'center'} py={8}>Welcome to the team! 🎉</Typography>
  );

  return (
    <Typography textAlign={'center'} py={8}>Invalid or expired invitation.</Typography>
  );
}
