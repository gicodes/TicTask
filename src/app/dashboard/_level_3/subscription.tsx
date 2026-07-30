'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/buttons';
import { useAlert } from '@/providers/alert';
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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useAuth } from '@/providers/auth';
import { Plan, Interval } from '@/types/subscription';
import { VscLinkExternal } from 'react-icons/vsc';
import { SiAwsorganizations } from 'react-icons/si';
import { GiArmorUpgrade, GiTeamIdea } from 'react-icons/gi';
import GenericGridPageLayout from '../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';

export default function SubscriptionPage() {
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const { 
    subscription, 
    isPro, 
    isEnterprise, 
    isFreeTrial, 
    loading, 
    billingCycle,
    upgradeToCheckout, 
    cancel 
  } = useSubscription();

  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [cycle, setCycle] = useState<Interval>("monthly");
  const [upgrading, setUpgrading] = useState(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 400 }}>
        <Typography variant="body1" sx={{ opacity: 0.7 }}>
          Loading your subscription...
        </Typography>
      </Box>
    );
  }

  const openUpgradeModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setCycle(billingCycle || "monthly"); // pre-select current cycle if available
    setOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan) return;

    try {
      setUpgrading(true);
      const url = await upgradeToCheckout(selectedPlan, cycle);

      if (url) {
        window.location.href = url;
      } else {
        showAlert('Failed to start checkout session', 'error');
        setUpgrading(false);
      }
    } catch (e) {
      console.error(e);
      showAlert('Failed to start checkout session', 'error');
      setUpgrading(false);
    }
  };

  const plan = subscription?.plan ?? 'FREE';
  const formattedPlan = plan
    ? `${plan.charAt(0).toUpperCase()}${plan.slice(1).toLowerCase()}`
    : plan;
  const expiresAt = subscription?.expiresAt
    ? new Date(subscription.expiresAt).toLocaleDateString()
    : '—';

  const aiCredits = isEnterprise ? 1000 : isPro ? 500 : 100;
  const usedCredits = 0;
  const automationRuns = isEnterprise ? 1000 : isPro ? 200 : 20;

  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader
        title='Manage Subscription'
        description='Manage your plan, trial, and billing settings.'
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
      >
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
                  {formattedPlan} {billingCycle && `(${billingCycle})`}
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
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<CreditCard />} 
                      onClick={() => showAlert("Billing portal coming soon", "info")}
                    >
                      Manage Billing
                    </Button>
                    <Button variant="text" tone="error" onClick={cancel}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Stack 
                    py={1} 
                    spacing={{ xs: 1.5, sm: 2 }}
                    direction={{ xs: 'column', lg: 'row' }} 
                  >
                    <Button
                      startIcon={user?.userType === "BUSINESS" ? <GiTeamIdea /> : <GiArmorUpgrade />}
                      variant="contained"
                      onClick={() => openUpgradeModal(Plan.PRO)}
                    >
                      Upgrade to Pro
                    </Button>

                    {user?.organization && (
                      <Button
                        startIcon={<SiAwsorganizations color='var(--special)' style={{ opacity: 0.85 }} />}
                        variant="contained"
                        tone='action'
                        onClick={() => openUpgradeModal(Plan.ENTERPRISE)}
                      >
                        Go Enterprise
                      </Button>
                    )}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
      >
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={700}>
                Usage Overview
              </Typography>
              <Divider sx={{ opacity: 0.2 }} />
              
              <Grid container spacing={3}>
                <Grid display={'grid'} gap={0.5}>
                  <Typography variant="body2">AI Credits</Typography>
                  <LinearProgress variant="determinate" value={(usedCredits / aiCredits) * 100} />
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {usedCredits} / {aiCredits}
                  </Typography>
                </Grid>

                <Grid display={'grid'} gap={0.5}>
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
                  tone='retreat'
                  endIcon={<VscLinkExternal size={14} color='var(--secondary)' />}
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
            <Stack spacing={3}> 
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

      <Dialog 
        open={open} 
        onClose={() => !upgrading && setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle fontWeight={700}>
          Choose Billing Cycle
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
            Select how you want to be billed for the{' '}
            <strong>{selectedPlan}</strong> plan.
          </Typography>

          <ToggleButtonGroup
            value={cycle}
            exclusive
            onChange={(_, val) => val && setCycle(val)}
            fullWidth
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                py: 1.5,
              },
            }}
          >
            <ToggleButton value="monthly">
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly">
              Yearly <Typography component="span" variant="caption" sx={{ ml: 0.5, opacity: 0.7 }}>
                (Save 20%)
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            variant="text" 
            onClick={() => setOpen(false)} 
            disabled={upgrading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleConfirmUpgrade}
            disabled={upgrading}
          >
            {upgrading ? "Redirecting..." : "Continue to Payment"}
          </Button>
        </DialogActions>
      </Dialog>
    </GenericGridPageLayout>
  );
}