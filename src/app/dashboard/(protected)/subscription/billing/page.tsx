'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/buttons';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { useSubscription } from '@/providers/subscription';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Skeleton,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CreditCard,
  ArrowBack,
  ReceiptLong,
  CalendarMonth,
  CheckCircleOutline,
  CancelOutlined,
  ContentCopy,
  Refresh,
  SupportAgent,
} from '@mui/icons-material';
import { apiGet } from '@/lib/axios';
import { GenericAPIRes } from '@/types/axios';
import { BillingOverview } from '@/types/billing';
import { VscLinkExternal } from 'react-icons/vsc';
import GenericGridPageLayout from '@/app/dashboard/_level_1/genGridPageLayout';
import { SubscriptionHistory } from '@/app/dashboard/_level_2/subscriptionHistory';
import GenericDashboardPagesHeader from '@/app/dashboard/_level_1/genDashPagesHeader';

function formatMoney(amount?: number | null, currency = 'NGN') {
  if (amount == null) return '—';
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatPlan(plan?: string) {
  if (!plan) return 'Free';
  return plan.charAt(0) + plan.slice(1).toLowerCase();
}

export default function ManageBillingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { showAlert, confirm } = useAlert();
  const { user } = useAuth();
  const { cancel, loading: subLoading } = useSubscription();

  const [data, setData] = useState<BillingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);

      const res: GenericAPIRes = await apiGet("/subscription/billing")
      const json = await res.data as BillingOverview;

      if (!res.ok) {
        showAlert(res.message || 'Unable to load billing', 'error');
        setData(null);
        return;
      }
      
      setData(json);
    } catch {
      showAlert('Unable to load billing', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showAlert]);

  useEffect(() => {
    load();
  }, [load]);

  const copyCustomerCode = async () => {
    if (!data?.customerCode) return;
    try {
      await navigator.clipboard.writeText(data.customerCode);
      showAlert('Customer code copied', 'success');
    } catch {
      showAlert('Could not copy', 'error');
    }
  };

  const handleCancel = async () => {
    const plan = formatPlan(data?.subscription?.plan);
    const ok = await confirm(
      `Are you sure you want to cancel your ${plan} subscription? You’ll keep access until the end of the current period.`,
      'Cancel subscription?',
      'Yes, Cancel'
    );
    if (!ok) return;
    await cancel();
    showAlert('Subscription cancelled', 'success');
    load(true);
  };

  const handleUpdatePayment = () => {
    showAlert('Card update flow coming soon. Contact support if your card needs updating.', 'info');
  };

  const sub = data?.subscription;
  const isPaid = sub?.active && sub?.plan && sub.plan !== 'FREE';

  return (
    <GenericGridPageLayout>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={1.5}
        mb={1}
      >
        <GenericDashboardPagesHeader
          title="Manage Billing"
          description="Plan details, payment method, and billing history."
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Refresh">
            <IconButton
              onClick={() => load(true)}
              disabled={refreshing}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Refresh
                sx={{
                  fontSize: 18,
                  animation: refreshing ? 'spin 0.8s linear infinite' : 'none',
                  '@keyframes spin': {
                    to: { transform: 'rotate(360deg)' },
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Button
            component={Link}
            href="/dashboard/subscription"
            tone="retreat"
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            sx={{ textTransform: 'none' }}
          >
            {isMobile ? 'Back' : 'Back to Subscription'}
          </Button>
        </Stack>
      </Stack>

      {(loading || subLoading) && (
        <Stack spacing={2.5}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={i === 1 ? 160 : 120}
              sx={{ borderRadius: 4 }}
            />
          ))}
        </Stack>
      )}

      {!loading && !subLoading && (
        <Stack spacing={2.5}>
          <motion.div>
            <Card
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
                background: (t) =>
                  `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.06)} 0%, ${alpha(
                    t.palette.background.paper,
                    1
                  )} 48%)`,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1.5} flex={1}>
                    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                      <Typography variant="overline" sx={{ opacity: 0.6, letterSpacing: 1.2 }}>
                        Current plan
                      </Typography>
                      {sub?.active ? (
                        <Chip
                          size="small"
                          icon={<CheckCircleOutline sx={{ fontSize: '16px !important' }} />}
                          label="Active"
                          color="success"
                          variant="outlined"
                          sx={{ height: 24, fontWeight: 600 }}
                        />
                      ) : (
                        <Chip
                          size="small"
                          icon={<CancelOutlined sx={{ fontSize: '16px !important' }} />}
                          label="Inactive"
                          color="default"
                          variant="outlined"
                          sx={{ height: 24 }}
                        />
                      )}
                    </Stack>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: '1.75rem', sm: '2rem' },
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {formatPlan(sub?.plan)}
                      {sub?.billingCycle && (
                        <Typography
                          component="span"
                          variant="h6"
                          fontWeight={500}
                          sx={{ ml: 1, opacity: 0.55 }}
                        >
                          · {sub.billingCycle}
                        </Typography>
                      )}
                    </Typography>

                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 3 }}
                      sx={{ opacity: 0.85 }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarMonth sx={{ fontSize: 18, opacity: 0.6 }} />
                        <Typography variant="body2">
                          {sub?.active
                            ? `Renews ${sub.expiresAt ? new Date(sub.expiresAt).toLocaleDateString() : '—'}`
                            : `Ended ${sub?.expiresAt ? new Date(sub.expiresAt).toLocaleDateString() : '—'}`}
                        </Typography>
                      </Stack>
                      {typeof sub?.daysRemaining === 'number' && sub.active && (
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {sub.daysRemaining} day{sub.daysRemaining === 1 ? '' : 's'} left
                        </Typography>
                      )}
                      {sub?.amount != null && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <ReceiptLong sx={{ fontSize: 18, opacity: 0.6 }} />
                          <Typography variant="body2">
                            {formatMoney(sub.amount)}
                            {sub.billingCycle ? ` / ${sub.billingCycle === 'yearly' ? 'yr' : 'mo'}` : ''}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    alignItems={{ xs: 'stretch', md: 'flex-start' }}
                    sx={{ minWidth: { md: 220 } }}
                  >
                    {isPaid && (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<CreditCard />}
                          onClick={handleUpdatePayment}
                          sx={{ textTransform: 'none', borderRadius: 2.5 }}
                        >
                          Update card
                        </Button>
                        <Button
                          tone="danger"
                          onClick={handleCancel}
                          sx={{ textTransform: 'none', borderRadius: 2.5 }}
                        >
                          Cancel plan
                        </Button>
                      </>
                    )}
                    {!isPaid && (
                      <Button
                        component={Link}
                        href="/dashboard/subscription"
                        variant="contained"
                        sx={{ textTransform: 'none', borderRadius: 2.5 }}
                      >
                        Upgrade plan
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div>
            <Card
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Payment profile
                </Typography>
                <Divider sx={{ opacity: 0.15, mb: 2.5 }} />

                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={1}
                  >
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.55, display: 'block' }}>
                        Billing email
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {user?.email ?? '—'}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label="Paystack"
                      variant="outlined"
                      sx={{ fontWeight: 600, letterSpacing: 0.3 }}
                    />
                  </Stack>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={1}
                  >
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="caption" sx={{ opacity: 0.55, display: 'block' }}>
                        Customer code
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily="monospace"
                        sx={{
                          opacity: data?.customerCode ? 1 : 0.5,
                          wordBreak: 'break-all',
                        }}
                      >
                        {data?.customerCode ?? 'Not linked yet'}
                      </Typography>
                    </Box>
                    {data?.customerCode && (
                      <Tooltip title="Copy">
                        <IconButton size="small" onClick={copyCustomerCode}>
                          <ContentCopy sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>

                  {!data?.canUpdatePaymentMethod && (
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      Complete a successful payment to link a Paystack customer profile.
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div>
            <SubscriptionHistory limit={20} compact={false} />
          </motion.div>

          <motion.div>
            <Card
              sx={{
                borderRadius: 4,
                bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'stretch', sm: 'center' }}
                  spacing={2}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <SupportAgent sx={{ opacity: 0.7, mt: 0.25 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        Billing help
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.75, maxWidth: 420 }}>
                        Failed charge, wrong plan, or invoice questions? Our team can help.
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button
                      component={Link}
                      href="/company/#contact-us"
                      tone="secondary"
                      sx={{ textTransform: 'none', borderRadius: 2.5 }}
                    >
                      Contact support
                    </Button>
                    <Button
                      component={Link}
                      href="/product/pricing"
                      variant="outlined"
                      endIcon={<VscLinkExternal size={14} />}
                      sx={{ textTransform: 'none', borderRadius: 2.5 }}
                    >
                      View plans
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Stack>
      )}
    </GenericGridPageLayout>
  );
}