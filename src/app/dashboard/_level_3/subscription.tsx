'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/assets/buttons';
import { useAlert } from '@/providers/alert';
import { GiArmorUpgrade } from 'react-icons/gi';
import { CreditCard } from '@mui/icons-material';
import { useSubscription } from '@/providers/subscription';
import { 
  Box, 
  Stack, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Grid, 
  LinearProgress 
} from '@mui/material';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function SubscriptionPage() {
  const { showAlert } = useAlert();
  const { subscription, isPro, isEnterprise, isFreeTrial, loading, upgradeToCheckout, cancelSubscription } = useSubscription();

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="body1" sx={{ opacity: 0.7 }}>
          Loading your subscription...
        </Typography>
      </Box>
    );

  const handleUpgrade = async (planId: string) => {
    try {
      const res = await upgradeToCheckout(planId);
      window.location.href = res.url;
    } catch (e) {
      console.error(e);
      showAlert('Failed to start checkout session', 'error');
    }
  };

  const plan = subscription?.plan ?? "FREE";
  const expiresAt = subscription?.expiresAt
    ? new Date(subscription.expiresAt).toLocaleDateString()
    : '—';

  const displayPlanName =
    plan === "PRO_MONTH" || plan === "PRO_ANNUAL"
      ? "Pro"
      : plan === "ENTERPRISE_MONTH" || plan === "ENTERPRISE_ANNUAL"
      ? "Enterprise"
      : "Free";

  const interval =
    plan.endsWith("_MONTH") ? "Monthly" :
    plan.endsWith("_ANNUAL") ? "Annual" : "";

  const aiCredits = isEnterprise ? 1000 : isPro ? 500 : isFreeTrial ? 100 : 10;
  const usedCredits = 30; // TODO: fetch usage
  const automationRuns = isEnterprise ? 1000 : isPro ? 200 : 20;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="900px" mx="auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack spacing={1} textAlign={{ xs: 'center', sm: 'inherit' }}>
            <Typography variant="h4" fontWeight={700}>
              Manage Subscription
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Manage your plan, trial, and billing settings.
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
                    {displayPlanName} {interval && `(${interval})`}
                  </Typography>

                  {isFreeTrial ? (
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Free Trial — Ends on {expiresAt}
                    </Typography>
                  ) : isPro || isEnterprise ? (
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Active — Renews on {expiresAt}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      You&apos;re on the Free plan. Upgrade for more features.
                    </Typography>
                  )}
                </Box>

                <Stack direction="row" spacing={2}>
                  {isPro || isEnterprise ? (
                    <Stack direction={{ xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2}}>
                      <Button 
                        variant="outlined" 
                        startIcon={<CreditCard />} 
                        onClick={() => showAlert("Billing portal coming soon", "info")}
                      >
                        Manage Billing
                      </Button>

                      <Button variant="text" color="error" onClick={cancelSubscription}>
                        Cancel
                      </Button>
                    </Stack>
                  ) : (
                    <Stack direction={{ xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2}}>
                      <Button
                        startIcon={<GiArmorUpgrade />}
                        variant="contained"
                        onClick={() => handleUpgrade("pro_month")}
                      >
                        Upgrade to Pro
                      </Button>

                      <Button
                        startIcon={<GiArmorUpgrade />}
                        variant="contained"
                        tone='action'
                        sx={{ background: 'var(--special)', color: 'var(--surface-1)'}}
                        onClick={() => handleUpgrade("enterprise_month")}
                      >
                        Enterprise
                      </Button>
                    </Stack>
                  )}
                </Stack>
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

                <Divider sx={{ opacity: 0.2 }} />

                <Grid container spacing={3}>
                  <Grid>
                    <Typography variant="body2">AI Credits</Typography>
                    <LinearProgress variant="determinate" value={(usedCredits / aiCredits) * 100} />
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {usedCredits} / {aiCredits}
                    </Typography>
                  </Grid>

                  <Grid>
                    <Typography variant="body2">Automation Runs</Typography>
                    <LinearProgress variant="determinate" value={(automationRuns / 1000) * 100} />
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {automationRuns} / 1000
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>

              <Box mt={3}>
                <Link href="/product/pricing">
                  <Button
                    variant="outlined"
                    size="small"
                    tone='retreat'
                    endIcon={<FaExternalLinkAlt size={12.5} />}
                    sx={{ textTransform: 'none' }}
                  >
                    See All Plans
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
        > 
          <Card sx={{ borderRadius: 4, bgcolor: 'rgba(0,0,0,0.02)' }}> 
            <CardContent> 
              <Stack spacing={1.5}> 
                <Typography variant="body2" sx={{ opacity: 0.8 }}> 
                  Need help fixing an issue with your billing or subscription? 
                </Typography> 

                <Link href={'/company/#contact-us'}> 
                  <Button tone='secondary'> 
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
