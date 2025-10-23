'use client';

import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useThemeMode } from '@/providers/theme';
import { Sun, Moon, Laptop, Bell, Shield, User, Globe, PlugZap, Save } from 'lucide-react';
import { Box, Typography, Stack, Switch, TextField, MenuItem, FormControlLabel, Card, CardContent, IconButton, Tooltip } from '@mui/material';

export default function SettingsPage() {
  const { mode, setThemeMode } = useThemeMode();

  const [autoSave, setAutoSave] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(false);
  const [language, setLanguage] = useState('English');
  const [workspaceName, setWorkspaceName] = useState('Acme Inc.');

  const INTEGRATION_BUTTON = ({
    title, action, key }: { 
      title: string, key: string, action?: () => void
    }) => 
    <span 
      onClick={action}
      key={key}
      className={`max-width-360 ${styles.btnRetreat}`}
    >
      Connect {title}
    </span>


  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        ⚙️&nbsp; Settings
      </Typography>

      <Card // APPEARANCE
        sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <Sun size={18} />
            <Typography variant="h6" fontWeight={600}>Appearance</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Customize your dashboard look and feel.
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            {[
              { label: 'Light', icon: <Sun size={18} color='var(--surface-1)' />, value: 'light' },
              { label: 'Dark', icon: <Moon size={18} color='var(--bw)' />, value: 'dark' },
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
                  }}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card // Account
        sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={2}>
            <User size={18} />
            <Typography variant="h6" fontWeight={600}>Account</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Manage your personal information and credentials.
          </Typography>
          <Stack spacing={2}>
            <TextField label="Display Name" value="Your Display Name" fullWidth />
            <TextField label="Email" type="email" value="yourname@tictask.com" fullWidth disabled />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <button className={styles.btnPrimary}>
                Go to Profile
              </button>
              <button className={styles.btnInverted}>
                Change Password
              </button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card // Notifications
        sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <Bell size={18} />
            <Typography variant="h6" fontWeight={600}>Notifications</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Control how and when you receive updates.
          </Typography>

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
        </CardContent>
      </Card>

      <Card // Workspace
        sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <Globe size={18} />
            <Typography variant="h6" fontWeight={600}>Workspace</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Update your workspace preferences and environment.
          </Typography>

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
        </CardContent>
      </Card>

      <Card // Security
        sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <Shield size={18} />
            <Typography variant="h6" fontWeight={600}>Security</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Manage session security and data privacy.
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch checked={autoSave} onChange={() => setAutoSave(!autoSave)} />}
              label="Auto-save ticket edits"
            />
            <span><button className={`mx-auto max-width-360 ${styles.btnWarm}`}>Log out of all sessions</button></span>
          </Stack>
        </CardContent>
      </Card>

      <Card // Integrations
        sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={1}>
            <PlugZap size={18} />
            <Typography variant="h6" fontWeight={600}>Integrations</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Connect your workspace with tools you use every day.
          </Typography>
          <Stack spacing={1} sx={{ mx: 'auto', maxWidth: 360, mt: 5}}>
            {([ 'Slack', 'Github', 'Google-drive']).map((i) =>
              <INTEGRATION_BUTTON title={i} key={i}/>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Box display={'flex'} justifyContent={'center'}>
        <button className={styles.btnAction}>
          <Save size={16} />&nbsp; Save Changes
        </button>
      </Box>
    </Box>
  );
}
