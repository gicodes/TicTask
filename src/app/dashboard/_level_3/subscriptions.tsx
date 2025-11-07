'use client';

import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { useSubscription } from '@/providers/subscription';
import { Box, Stack, Typography, Card, CardContent, Button, Divider, Grid, LinearProgress } from '@mui/material';

export default function SubscriptionPage() {
  const { subscription, isPro, loading } = useSubscription();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="body1" sx={{ opacity: 0.7 }}>Loading your subscription...</Typography>
      </Box>
    );
  }

  const plan = subscription?.plan || 'Free';
  const expiresAt = subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : '—';

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="900px" mx="auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              Subscription & Billing
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Manage your current plan, renewal settings, and upgrade options.
            </Typography>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{plan} Plan</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {isPro
                      ? `Active — renews on ${expiresAt}`
                      : `You’re on the Free Plan. Upgrade for more power.`}
                  </Typography>
                </Box>

                {isPro ? (
                  <Button
                    variant="outlined"
                    startIcon={<CreditCard size={18}/>}
                    sx={{ borderRadius: 3 }}
                  >
                    Manage Billing
                  </Button>
                ) : (
                  <button className='btn min-height-44 custom-bw flex items-center gap-2'>
                    UPGRADE TO PRO
                  </button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                  Usage Overview
                </Typography>
                <Divider sx={{ my: 1, opacity: 0.2 }} />

                <Grid container spacing={3}>
                  <Grid>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      AI Assistant Credits
                    </Typography>
                    <LinearProgress variant="determinate" value={isPro ? 70 : 100} sx={{ height: 8, borderRadius: 10 }} />
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {isPro ? '70 / 100 credits used' : 'Free plan limit reached'}
                    </Typography>
                  </Grid>

                  <Grid>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Automation Runs
                    </Typography>
                    <LinearProgress variant="determinate" value={40} sx={{ height: 8, borderRadius: 10 }} />
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      40 / 100 this month
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card sx={{ borderRadius: 4, bgcolor: 'rgba(0,0,0,0.02)' }}>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Need help with your billing or invoices? 
                </Typography>
                <Button variant="contained" color='inherit' sx={{ maxWidth: 'fit-content', textTransform: 'none'}}>
                  Contact Support
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </Stack>
    </Box>
  );
}