'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { Share, PersonAdd, ContentCopy, CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography, Card, CardContent, Button, TextField, IconButton } from '@mui/material';

export default function ReferPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [copied, setCopied] = useState(false);
  
  const inviteLink = `https://tictask.ng/invite?ref=${encodeURIComponent(user?.email || '')}`;

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
    const shareUrl = `${window.location.origin}/user/${user.id}`;
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

  const handleInviteEmail = () => {
    if (!user) return;
    const subject = encodeURIComponent('Join me on TicTask 🚀');
    const body = encodeURIComponent(
      `Hey!\n\nI’m inviting you to join me on TicTask — a powerful ticket & task management platform.\n\nUse my referral link to sign up:\n${inviteLink}\n\nSee you inside!\n\n${user.name || ''}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="800px" mx="auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack spacing={1} textAlign={{xs: 'center', sm: 'inherit'}}>
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              Refer & Earn Rewards
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Invite your colleagues to TicTask and earn credits or discounts when they subscribe.
            </Typography>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="body1" fontWeight={501}>
                  Share your referral link
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField fullWidth value={inviteLink} size="small" InputProps={{ readOnly: true }} />
                  <IconButton onClick={handleCopy} color="inherit">
                    {copied ? <CheckCircle color="success" /> : <ContentCopy />}
                  </IconButton>
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
      </Stack>
    </Box>
  );
}
