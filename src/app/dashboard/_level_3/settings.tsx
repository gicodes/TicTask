'use client';

import Link from 'next/link';
import { User } from '@/types/users';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Button } from '@/assets/buttons';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { useThemeMode } from '@/providers/theme';
import SettingsCard from '../_level_2/settingsCard';
import { forgotPassword } from '@/hooks/useForgotPass';
import { useSubscription } from '@/providers/subscription';
import { useUpdateWorkspaceName } from '@/hooks/useUpdateWorkSpaceName';
import { useUpdateEmailNotifSetting } from '@/hooks/useSetGetTNotifsViaEmail';
import {
  Box,
  Typography,
  Stack,
  Switch,
  TextField,
  MenuItem,
  FormControlLabel,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { Sun, Moon, Laptop, Bell, Shield, User2, Globe, PlugZap, CreditCard, Check } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { mode, setThemeMode } = useThemeMode();
  const { updateWorkspaceName } = useUpdateWorkspaceName(user?.id);
  const { updateEmailNotifications, tNotifsLoading } = useUpdateEmailNotifSetting(user?.id);

  const [autoSave, setAutoSave] = useState(true);
  const [inAppNotfis, setInAppNotfis] = useState(true);
  const [emailNotif, setEmailNotif] = useState((user as User).getTNotifsViaEmail ?? false);
  const [isSavingWSN, setIsSavingWSN] = useState(false);
  const [isEditingWSN, setIsEditingWSN] = useState(false);
  const [language, setLanguage] = useState('English');
  const [workspaceName, setWorkspaceName] = useState((user as User)?.workSpaceName || 'Acme Inc.');

  const { subscription, loading } = useSubscription();
  const plan = subscription?.plan || 'Free';
  const expiresAt = subscription?.expiresAt
    ? new Date(subscription.expiresAt).toLocaleDateString() : '—';

  const handleForgotPassword = () => {
    const email = user?.email;
    if (!email) {
      showAlert('Your account is not signed in or recognized', 'warning');
      return;
    }

    forgotPassword({ email })
      .then(() => showAlert('Password reset link sent to your email!', 'success'))
      .catch(() => showAlert('Something went wrong!', 'error'));
  };

  const handleEmailNotifChange = async () => {
    const next = !emailNotif;
    setEmailNotif(next);

    await updateEmailNotifications(next)
      .then( () => showAlert("Ticket notification settings changes detected", 'success'))
      .catch(() => showAlert('Something went wrong!', 'error'));
  }


  const handleSetWorkSpaceName = async () => {
    if (!isEditingWSN) return;

    setIsSavingWSN(true);
    try {
      await updateWorkspaceName(workspaceName.trim());
      showAlert("New Workspace name detected", 'success')
      setIsEditingWSN(false);
    } catch {
      showAlert('Something went wrong!', 'error')
    } finally {
      setIsSavingWSN(false);
    }
  };

  const INTEGRATION_BUTTON = ({
    title,
    i,
    action,
  }: {
    title: string;
    i: string;
    action?: () => void;
  }) => (
    <Button tone='secondary' onClick={action} key={i}>
      Connect {title}
    </Button>
  );

  return (
    <Box 
      sx={{ 
        maxWidth: 900, 
        mx: 'auto', 
        py: 4, 
        px: 2 
      }}
    >
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Stack spacing={1} textAlign={{xs: 'center', sm: 'inherit'}} mb={3}>
          <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
            App Settings
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Customize your Appearance, Account, Notifications, Workspace and more ...
          </Typography>
        </Stack>
      </motion.div>

      <SettingsCard
        icon={<Sun size={18} />}
        title="Appearance"
        subtitle="Customize your dashboard look and feel."
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {[
            { label: 'Light', icon: <Sun size={18} />, value: 'light' },
            { label: 'Dark', icon: <Moon size={18} />, value: 'dark' },
            { label: 'System', icon: <Laptop size={18} />, value: 'system' },
          ].map(({ label, icon, value }) => (
            <Tooltip key={label} title={`${label} Theme`}>
              <IconButton
                onClick={() => setThemeMode(value as 'dark' | 'light' | 'system')}
                sx={{
                  bgcolor: mode === value ? 'primary.main' : 'transparent',
                  color: mode === value ? '#fff' : 'inherit',
                  border: '1px solid',
                  borderColor: mode === value ? 'primary.main' : 'divider',
                  ':hover': { color: 'var(--bw)' },
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<User2 size={18} />}
        title="Account"
        subtitle="Manage your personal information and credentials."
      >
        <Stack spacing={2}>
          <TextField label="Display Name" value={user?.name || 'Your Display Name'} fullWidth />
          <TextField label="Email" type="email" value={user?.email || ''} fullWidth disabled />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Button component={Link} href="/dashboard/profile">
              Go to Profile
            </Button>
            <Button onClick={handleForgotPassword} tone='warm'>
              Change Password
            </Button>
          </Stack>
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<Bell size={18} />}
        title="Notifications"
        subtitle="Control how and when you receive ticket updates."
      >
        <Stack spacing={1}>
          <FormControlLabel
            control={<Switch checked={inAppNotfis} onChange={() => setInAppNotfis(!inAppNotfis)} />}
            label="In-App Notifications"
          />
          <FormControlLabel
            control={<Switch checked={emailNotif} onChange={handleEmailNotifChange} />}
            label={tNotifsLoading ? "Saving..." : "Email Notifications"}
            disabled={tNotifsLoading}
          />
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<Globe size={18} />}
        title="Workspace"
        subtitle="Update your workspace preferences and environment."
      >
        <Stack spacing={2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSetWorkSpaceName();
            }}
          >
            <TextField
              fullWidth
              label="Workspace Name"
              value={workspaceName}
              onChange={(e) => {
                setWorkspaceName(e.target.value);
                setIsEditingWSN(true);
              }}
              onBlur={() => {if (isEditingWSN) handleSetWorkSpaceName()}}
              disabled={isSavingWSN}
              InputProps={{
                endAdornment: isSavingWSN ? (
                  <CircularProgress size={20} />
                ) : isEditingWSN ? (
                  <Tooltip title='Save'>
                    <IconButton type="submit"> <Check fontSize="small" /></IconButton>
                  </Tooltip>
                ) : null,
              }}
            />
          </form>
          <TextField
            select
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {['English', 'French', 'German', 'Spanish', 'Chinese'].map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<Shield size={18} />}
        title="Security"
        subtitle="Manage session security and data privacy."
      >
        <Stack spacing={2}>
          <FormControlLabel 
            control={<Switch checked={autoSave} onChange={() => setAutoSave(!autoSave)} />}
            label="Enable last session on refresh"
          />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Button>Logged in devices</Button>
            <Button tone='warm'>Log out all sessions</Button>
          </Stack>
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<PlugZap size={18} />}
        title="Integrations"
        subtitle="Connect your workspace with tools you use every day."
      >
        <Stack spacing={1} sx={{ mt: 3 }}>
          {['Slack', 'Github', 'Google Drive'].map((i) => (
            <Box key={i} p={0.5}>
              <INTEGRATION_BUTTON title={i} i={i} />
            </Box>
          ))}
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<CreditCard size={18} />}
        title="Billing"
        subtitle="View your current plan and manage your subscription."
      >
        { loading ? <>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Loading your subscription...
            </Typography>
          </Box> 
        </> : 
          <Stack spacing={2}>
            <Typography variant="body1">
              <strong>Current Plan:</strong> {plan}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Renews on:</strong> {expiresAt}
            </Typography>
            
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Button component={Link} href="/dashboard/subscription">
                Manage Subscription
              </Button>
              <Button component={Link} href="/product/pricing" tone='secondary'>
                See Plans & Prices
              </Button>
            </Stack>
          </Stack>
        } 
      </SettingsCard>
    </Box>
  );
}
