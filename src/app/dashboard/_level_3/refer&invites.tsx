'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { motion } from 'framer-motion';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import GenericGridPageLayout from '../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';
import { 
  Share, 
  PersonAdd, 
  ContentCopy, 
  CheckCircle, 
  People,
  MonetizationOn,
  BuildCircle
} from '@mui/icons-material';
import { 
  Stack, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  IconButton, 
  Grid,
  Chip,
  Divider
} from '@mui/material';

export default function ReferPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    api.get('/invite/referral/code')
      .then(({ data }) => {
        setInviteLink(data.link);
      })
      .catch(err => showAlert('Failed to load invite link', 'error'));

    api.get('/invite/referral/stats')
      .then(({ data }) => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      showAlert('Invite link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard error:', err);
      showAlert('Failed to copy link', 'error');
    }
  };

  const handleShare = async () => {
    if (!user) return;
    const shareUrl = inviteLink;
    const shareData = {
      title: `${user.name || 'A user'} invites you to TicTask!`,
      text: 'Check out TicTask and enjoy your personal or team workspace!',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showAlert('Invitation link copied to clipboard!', 'info');
      }
    } catch (err) {
      console.error('Error sharing profile:', err);
      showAlert('Unable to share link', 'error');
    }
  };

  const  handleInviteEmail = () => {
    if (!user) return;

    const subject = encodeURIComponent('Join me on TicTask 🚀');
    const body = encodeURIComponent(`
      Hey!\n\nI’m inviting you to join me on TicTask — 
      A powerful ticket & task management platform.\n\n
      Use my referral link to sign up:\n${inviteLink}\n\nSee you inside!\n\n${user.name || ''}
    `);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <GenericGridPageLayout>
      <Stack spacing={4} maxWidth="800px" mx="auto">
        <GenericDashboardPagesHeader
          title='Invite & Earn Rewards'
          description='Bring your colleagues to TicTask and earn credits or discounts when they subscribe.'
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
        >
          <Card sx={{ borderRadius: 4, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography sx={{ opacity: 0.8}}>
                    Your referral link
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField fullWidth value={inviteLink} size="small" InputProps={{ readOnly: true }} />
                    <IconButton onClick={handleCopy} color="inherit">
                      {copied ? <CheckCircle color="success" /> : <ContentCopy />}
                    </IconButton>
                  </Stack>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row'}} spacing={2}>
                  <Button
                    startIcon={<Share />}
                    variant="contained"
                    color="inherit"
                    fullWidth
                    sx={{ textTransform: 'none', maxWidth: { sm: 234} }}
                    onClick={handleShare}
                  >
                    Share Link
                  </Button>
                  <Button
                    startIcon={<PersonAdd />}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    sx={{ textTransform: 'none', maxWidth: { sm: 234} }}
                    onClick={handleInviteEmail}
                  >
                    Invite via Email
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card sx={{ borderRadius: 4, bgcolor: 'rgba(0,0,0,0.02)' }}>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  You&apos;ll receive 10% of your friend&apos;s first subscription as credits. 
                  Credits can be used toward your own renewal or upgrades.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        {!loading && stats && (
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            <Grid minWidth={150}>
              <Card sx={{ bgcolor: '#e3f2fd', color: 'black', borderRadius: 4 }}>
                <CardContent>
                  <Stack alignItems="center" spacing={1}>
                    <People color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h4" fontWeight="bold">{stats.totalReferrals || "-"}</Typography>
                    <Typography>Total Invites</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid minWidth={150}>
              <Card sx={{ bgcolor: '#e8f5e9', color: 'black', borderRadius: 4 }}>
                <CardContent>
                  <Stack alignItems="center" spacing={1}>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="h4" fontWeight="bold">{stats.successfulReferrals || "-"}</Typography>
                    <Typography>Successful Signups</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid minWidth={150}>
              <Card sx={{ bgcolor: '#fff3e0', color: 'black', borderRadius: 4 }}>
                <CardContent>
                  <Stack alignItems="center" spacing={1}>
                    <MonetizationOn color="warning" sx={{ fontSize: 40 }} />
                    <Typography variant="h4" fontWeight="bold">
                      {stats.totalCreditsEarned || "--"}
                    </Typography>
                    <Typography>Credits Earned</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid minWidth={150}>
              <Card sx={{ bgcolor: 'whitesmoke', color: 'black', borderRadius: 4, }}>
                <CardContent>
                  <Stack alignItems="center" spacing={1}>
                    <BuildCircle color="secondary" sx={{ fontSize: 40 }} />
                    <Typography variant="h4" fontWeight="bold"> {stats.totalCreditsEarned > 5 ? "100%" : "--"} </Typography>
                    <Typography>Community Builder</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {stats?.recentReferrals?.length > 0 && (
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Recent Invites</Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {stats.recentReferrals.map((ref: any) => (
                  <Stack key={ref.id} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack>
                      <Typography>{ref.referee.name || ref.referee.email}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(ref.createdAt).toLocaleString()}
                      </Typography>
                    </Stack>
                    <Chip 
                      label={ref.referee.isOnboarded ? "Joined" : "Pending"} 
                      color={ref.referee.isOnboarded ? "success" : "default"} 
                      size="small"
                    />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </GenericGridPageLayout>
  );
}
