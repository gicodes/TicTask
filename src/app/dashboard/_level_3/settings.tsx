'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { User } from '@/types/users';
import { Button } from '@/assets/buttons';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { useThemeMode } from '@/providers/theme';
import SettingsCard from '../_level_2/settingsCard';
import AuthRedirectBtn from '@/assets/authRedirectBtn';
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
  Chip,
} from '@mui/material';
import { 
  Sun, 
  Moon, 
  Laptop, 
  Bell, 
  Shield, 
  User2, 
  Globe, 
  PlugZap, 
  CreditCard, 
  Check 
} from 'lucide-react';
import { useNotifications } from '@/providers/notifications';
import GenericGridPageLayout from '../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';
import DevicesAndSessions from '../_level_2/accountSettings/loggedInDevices';
import { useUpdateInAppNotifSetting } from '@/hooks/useInAppNotifs';
import { useRouter } from 'next/navigation';

const isIOS = () => {
  const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const hasMSStream = typeof window !== 'undefined' && 'MSStream' in window;
  return isIOSDevice && !hasMSStream;
};
const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches;

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showAlert, confirm } = useAlert();
  const { mode, setThemeMode } = useThemeMode();
  const {
    inAppNotifications,
    updateInAppNotifications,
    inAppNotifsLoading,
  } = useUpdateInAppNotifSetting();
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [autoSave, setAutoSave] = useState(true);
  const { updateWorkspaceName } = useUpdateWorkspaceName(user?.id);
  const { requestPushPermission, unsubscribePush } = useNotifications();
  const { 
    updateEmailNotifications, 
    emailNotifications,
    emailNotifsLoading 
  } = useUpdateEmailNotifSetting();
  const [pushNotif, setPushNotif] = useState<boolean>((user as User)?.data?.getPushNotifs ?? false);
    
  const [isSavingWSN, setIsSavingWSN] = useState(false);
  const [isEditingWSN, setIsEditingWSN] = useState(false);
  const [language, setLanguage] = useState('English');
  const [workspaceName, setWorkspaceName] = useState(
    (user as User)?.data?.workSpaceName || (user?.name.split(" ")[0] || "Untitled User")
  );
  const { subscription, loading } = useSubscription();
  const plan = subscription?.plan || 'Free';
  const expiresAt = subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : '—';

  const [showIOSGuidance, setShowIOSGuidance] = useState(false);

  const handleInAppNotifChange = async () => {
    try {
      await updateInAppNotifications(!inAppNotifications);

      showAlert(`In-App notifications 
        ${!inAppNotifications ? "turned on" : "turned off"}!`,
        "success"
      );
    } catch {
      showAlert("Something went wrong!", "error");
    }
  }

  const handleEmailNotifChange = async () => {
    const next = !emailNotifications;

    if (!updateEmailNotifications) {
      showAlert('Notification settings are unavailable right now.', 'error');
      return;
    }

    try {
      await updateEmailNotifications(next);
      showAlert("Ticket notification settings changes detected", 'success');
    } catch {
      showAlert('Something went wrong!', 'error');
    }
  };

  const handlePushNotifChange = () => {
    const newValue = !pushNotif;
    setPushNotif(newValue);

    if (newValue) {
      requestPushPermission?.();
      showAlert("Push notification settings turned on!", 'success');
    } else {
      unsubscribePush?.();
      showAlert("Push notification settings turned off", 'success');
    }
  };

  useEffect(() => {
    if (isIOS() && !isStandalone()) setShowIOSGuidance(true)
  }, []);

  const handleForgotPassword = async () => {
    const ok = await confirm(
      "Click Continue to receive a magic link to reset your password",
      "Continue with password reset?",
      'Continue'
    )

    if (!ok) return;

    const email = user?.email;
    if (!email) {
      showAlert('Your account is not signed in or recognized', 'warning');
      return;
    }

    forgotPassword({ email })
      .then(() => showAlert('Password reset link sent to your email!', 'success'))
      .catch(() => showAlert('Something went wrong!', 'error'));
  };
  
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
    title, action,
  }: {
    title: string;
    action?: () => void;
  }) => (
    <Button tone='secondary' onClick={action}>
      Connect {title}
    </Button>
  );
  

  if (authLoading) return <Box textAlign={'center'} p={4}> Loading...</Box>;

  if (!isAuthenticated) return (
     <Box textAlign={'center'} p={4}> 
      <Typography>Please <AuthRedirectBtn />  to access settings </Typography>
    </Box>
  );

  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader
        title='Settings'
        description='Customize your Appearance, Account, Notifications, Workspace and more. '
      />

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
                  ':hover': { color: 'var(--inverse)' },
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
            control={
              <Switch
                checked={inAppNotifications}
                onChange={handleInAppNotifChange}
                disabled={inAppNotifsLoading}
              />
            }
            label={inAppNotifsLoading ? "Saving..." : "In-App Notifications"}
          />
          <FormControlLabel
            control={<Switch checked={emailNotifications} onChange={handleEmailNotifChange} />}
            label={emailNotifsLoading ? "Saving..." : "Email Notifications"}
            disabled={emailNotifsLoading}
          />
          {/* {(user?.subscription?.active) && ( */}
            <>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={pushNotif as boolean}
                      onChange={handlePushNotifChange}
                      disabled={!requestPushPermission || !user?.subscription?.active}
                    />
                  }
                  label="Push Notifications"
                />

                {!user?.subscription?.active && (
                  <Chip
                    label="Upgrade"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => router.replace("/product/pricing")}
                    sx={{ cursor: 'pointer' }}
                  />
                )}
              </Stack>
              {showIOSGuidance && (
                <Box py={2}>
                  <Box p={2} bgcolor="disabled.light" borderRadius={2}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      iPhone/ iPad users – important step!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      To receive push notifications on iOS, you must first add this app to your Home Screen:
                    </Typography>
                    <Stack pl={2} my={1} fontSize={12}>
                      <ol className="mt-2 list-decimal space-y-1 pl-5">
                        <li>Open this site in Safari</li>
                        <li>Tap the Share button (square with arrow up)</li>
                        <li>Scroll down and select "Add to Home Screen"</li>
                        <li>Name it (e.g. "TicTask") and tap "Add"</li>
                        <li>Open the new icon from your Home Screen</li>
                        <li>Come back here and enable notifications</li>
                      </ol>
                    </Stack>
                    
                    <Typography variant="caption">
                      This is required by Apple for web push on iOS (works on iOS 16.4+). 
                      Once added, the prompt will appear properly.
                    </Typography>
                  </Box>
                </Box>
              )}

              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ p: 1, mt: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}
              >
                Push notifications require browser permission. You can manage them in your device settings later.
              </Typography>
            </>
          {/* )} */}
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
                    <IconButton type="submit"> 
                      <Check fontSize="small" />
                    </IconButton>
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
        <Stack pt={2} spacing={4}>
          <FormControlLabel 
            control={<Switch checked={autoSave} onChange={() => setAutoSave(!autoSave)} />}
            label="Enable last session on refresh"
          />
          <DevicesAndSessions />
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
              <INTEGRATION_BUTTON title={i} />
            </Box>
          ))}
        </Stack>
      </SettingsCard>

      <SettingsCard
        icon={<CreditCard size={18} />}
        title="Billing"
        subtitle="View your current plan and manage your subscription."
      >
        { loading ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                Loading your subscription...
              </Typography>
            </Box> 
          </>
        ) : (
          <Stack spacing={2} pt={2}>
            <Typography variant="body1">
              <strong>Current Plan:</strong> {plan.at(0)?.toUpperCase() + plan.slice(1).toLowerCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Renews on {expiresAt}
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
        )} 
      </SettingsCard>
    </GenericGridPageLayout>
  );
}