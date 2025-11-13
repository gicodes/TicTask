'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAlert } from '@/providers/alert';
import { GiArmorUpgrade } from 'react-icons/gi';
import { CreditCard } from '@mui/icons-material';
import { useSubscription } from '@/providers/subscription';
import { useCreateCheckoutSession } from '@/hooks/useCreateCheckout';
import { Box, Stack, Typography, Card, CardContent, Button, Divider, Grid, LinearProgress, CircularProgress } from '@mui/material';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function SubscriptionPage() {
  const { showAlert } = useAlert();
  const { subscription, isPro, loading, isEnterprise, isFreeTrial } = useSubscription();
  const { mutate, isPending } = useCreateCheckoutSession();

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
      <Typography variant="body1" sx={{ opacity: 0.7 }}> Loading your subscription... </Typography>
    </Box>
  );

  const handleCheckout = (plan: string) => {
    mutate(plan, {
      onError: (error) => {
        console.error(error);
        showAlert('Something went wrong while processing checkout', 'warning');
      },
    });
  };

  const plan = subscription?.plan || 'Free';
  const expiresAt = subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : '—';

  const aiCredits = isEnterprise ? 1000 : isPro ? 500 : isFreeTrial ? 100 : 10;
  const automationRuns = isEnterprise ? 1000 : isPro ? 200 : 20;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="900px" mx="auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack spacing={1} textAlign={{xs: 'center', sm: 'inherit'}}>
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
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
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {plan} Plan
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {isPro
                      ? `Active — renews on ${expiresAt}`
                      : `You’re on the Free Plan. Upgrade for more power.`}
                  </Typography>
                </Box>

                <Box>
                  {isPro ? (
                    <Button variant="outlined" startIcon={<CreditCard />} color="inherit">
                      Manage Billing
                    </Button>
                  ) : (
                    <Button
                      startIcon={
                        isPending ? <CircularProgress size={16} color="inherit" /> : <GiArmorUpgrade />
                      }
                      color="inherit"
                      variant="outlined"
                      disabled={isPending}
                      sx={{ textTransform: 'none'}}
                      onClick={() => handleCheckout('PRO')}
                    >
                      {isPending ? 'Redirecting...' : 'Upgrade to Pro'}
                    </Button>
                  )}
                </Box>
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
                <Divider sx={{ my: 1, opacity: 0.2, bgcolor: 'var(--disabled)', width: '100%' }} />

                <Grid container spacing={3}>
                  <Grid display={'grid'} gap={1}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      AI Assistant Credits
                    </Typography>
                    <Box>
                      <LinearProgress variant="determinate" value={(120 / aiCredits) * 100} />
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {isPro ? '70 / 100 credits used' : 'Free plan limit reached'}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid display={'grid'} gap={1}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Automation Runs
                    </Typography>
                    <Box>
                      <LinearProgress variant="determinate" value={automationRuns} sx={{ height: 8, borderRadius: 10 }} />
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {automationRuns} / 100 this month
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
              <Box mt={3}>
                <Link href={'/product/pricing'}>
                  <Button 
                    variant='outlined' 
                    color='info' 
                    size='small'
                    endIcon={<FaExternalLinkAlt size={12.5} />}
                    sx={{ textTransform: 'none'}}
                  >
                    See All Plans
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card sx={{ borderRadius: 4, bgcolor: 'rgba(0,0,0,0.02)' }}>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Need help fixing an issue with your billing or subscription? 
                </Typography>
                <Link href={'/company/#contact-us'}>
                  <Button variant="contained" color='inherit' sx={{ maxWidth: 'fit-content', textTransform: 'none'}}>
                    Contact Support
                  </Button>
                </Link>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </Stack>
    </Box>
  );
}
