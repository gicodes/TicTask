
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import { apiGet } from '@/lib/axios';
import { Button } from '@/assets/buttons';
import type { User } from '@/types/users';
import type { UserProfileRes } from '@/types/axios';

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      setLoading(true);
      setNotFound(false);

      try {
        const res: UserProfileRes = await apiGet(
          `/user/${encodeURIComponent(id)}/public`
        );

        if (!cancelled) {
          setProfile(res.data);
        }
      } catch {
        if (!cancelled) {
          setNotFound(true);
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !profile) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Profile not found
        </Typography>
        <Typography color="var(--secondary)" mb={10}>
          This profile may not exist or may not be publicly available.
        </Typography>
        <Button component={Link} href="/">
          Go home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        variant="outlined"
        sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}
      >
        <Box display="flex" flexDirection="column"
          alignItems="center" textAlign="center" gap={2}>

          <Avatar
            src={profile.photo || '/default-avatar.png'}
            alt={profile.name || 'User'}
            sx={{ width: 104, height: 104, fontSize: 36 }}
          />

          <Typography variant="h4" fontWeight={700}>
            {profile.name}
          </Typography>

          {profile.position && (
            <Typography color="text.secondary">
              {profile.position}
            </Typography>
          )}

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {profile.bio || ''}
          </Typography>

          {profile.userType === 'BUSINESS' && (
            <Typography variant="caption" color="text.secondary">
              Organization
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
