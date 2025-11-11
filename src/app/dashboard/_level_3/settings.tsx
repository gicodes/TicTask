'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from '@mui/material';
import {
  Sun, Moon, Laptop, Bell, Shield, User, Globe, PlugZap, Save, CreditCard,
} from 'lucide-react';
import styles from '@/app/page.module.css';
import { useAuth } from '@/providers/auth';
import { useThemeMode } from '@/providers/theme';
import { useAlert } from '@/providers/alert';
import SettingsCard from '../_level_2/settingsCard';
import { forgotPassword } from '@/hooks/useForgotPass';
import { useSubscription } from '@/providers/subscription';

export default function SettingsPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { mode, setThemeMode } = useThemeMode();
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(false);
  const [language, setLanguage] = useState('English');
  const [workspaceName, setWorkspaceName] = useState('Acme Inc.');

  const { subscription, loading } = useSubscription();
  const plan = subscription?.plan || 'Free';
  const expiresAt = subscription?.expiresAt
    ? new Date(subscription.expiresAt).toLocaleDateString()
    : '—';

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

  const INTEGRATION_BUTTON = ({
    title,
    i,
    action,
  }: {
    title: string;
    i: string;
    action?: () => void;
  }) => (
    <span onClick={action} key={i} className={`max-width-360 ${styles.btnRetreat}`}>
      Connect {title}
    </span>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        ⚙️ Settings
      </Typography>

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

      {/* Account */}
      <SettingsCard
        icon={<User size={18} />}
        title="Account"
        subtitle="Manage your personal information and credentials."
      >
        <Stack spacing={2}>
          <TextField label="Display Name" value={user?.name || 'Your Display Name'} fullWidth />
          <TextField label="Email" type="email" value={user?.email || ''} fullWidth disabled />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Link href="/dashboard/profile" className={styles.btnPrimary}>
              Go to Profile
            </Link>
            <button onClick={handleForgotPassword} className={styles.btnWarm}>
              Change Password
            </button>
          </Stack>
        </Stack>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard
        icon={<Bell size={18} />}
        title="Notifications"
        subtitle="Control how and when you receive updates."
      >
        <Stack spacing={1}>
          <FormControlLabel
            control={<Switch checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />}
            label="Email Notifications"
          />
          <FormControlLabel
            control={<Switch checked={slackNotif} onChange={() => setSlackNotif(!slackNotif)} />}
            label="Slack Notifications"
          />
        </Stack>
      </SettingsCard>

      {/* Workspace */}
      <SettingsCard
        icon={<Globe size={18} />}
        title="Workspace"
        subtitle="Update your workspace preferences and environment."
      >
        <Stack spacing={2}>
          <TextField
            label="Workspace Name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
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

      {/* Security */}
      <SettingsCard
        icon={<Shield size={18} />}
        title="Security"
        subtitle="Manage session security and data privacy."
      >
        <Stack spacing={2}>
          <FormControlLabel
            control={<Switch checked={autoSave} onChange={() => setAutoSave(!autoSave)} />}
            label="Auto-save ticket edits"
          />
          <span>
            <button className={`mx-auto max-width-360 ${styles.btnWarm}`}>Log out of all sessions</button>
          </span>
        </Stack>
      </SettingsCard>

      {/* Integrations */}
      <SettingsCard
        icon={<PlugZap size={18} />}
        title="Integrations"
        subtitle="Connect your workspace with tools you use every day."
      >
        <Stack spacing={1} sx={{ mx: 'auto', maxWidth: 360, mt: 3 }}>
          {['Slack', 'Github', 'Google Drive'].map((i) => (
            <INTEGRATION_BUTTON title={i} i={i} key={i} />
          ))}
        </Stack>
      </SettingsCard>

      {/* Billing */}
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
            <Link href="/dashboard/subscription" className={styles.btnPrimary}>
              Manage Subscription
            </Link>
          </Stack>
        } 
      </SettingsCard>

      <Box display="flex" justifyContent="center">
        <button className={styles.btnAction}>
          <Save size={16} /> &nbsp; Save Changes
        </button>
      </Box>
    </Box>
  );
}