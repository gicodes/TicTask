import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useAlert } from '@/providers/alert';
import type { SessionItem } from '@/types/auth';
import { apiDelete, apiGet, apiPost } from '@/lib/axios';
import { 
  Box, 
  CircularProgress, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Stack, 
  Typography 
} from '@mui/material';
import { Button } from '@/assets/buttons';

const DevicesAndSessions = () => {
  const { showAlert, confirm } = useAlert();
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [revokingAll, setRevokingAll] = useState(false);
  
  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const data = await apiGet<{ ok: boolean; sessions: SessionItem[] }>("/auth/sessions");
      setSessions(data.sessions);
    } catch (e) {
      showAlert("Failed to load sessions", 'error')
    } finally {
      setLoadingSessions(false);
    }
  };

  const openDevices = () => {
    setSessionsOpen(true);
    loadSessions();
  };

  const revokeOne = async (id: string) => {
    await apiDelete(`/auth/sessions/${id}`);
    setSessions((prev) => prev.filter((s) => s.id !== id));

    if (sessions.length !== 0) await signOut({ 
      callbackUrl: "/dashboard/settings" 
    });
  };

  const revokeAll = async () => {
    const ok = await confirm(
      "Confirm logout from all devices?",
      "Confirm Logout",
      "Continue"
    );

    if (!ok) return;

    setRevokingAll(true);
    try {
      await apiPost("/auth/sessions/revoke-all");
      await signOut({ callbackUrl: "/dashboard/settings" });
    } catch {
      showAlert("Failed to log out all sessions", "error");
      setRevokingAll(false);
    }
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Button onClick={openDevices}>Logged in devices</Button>
        <Button tone="warm" onClick={revokeAll} disabled={revokingAll}>
          {revokingAll ? "Logging out…" : "Log out all sessions"}
        </Button>
      </Stack>

      <Dialog
        open={sessionsOpen} 
        onClose={() => setSessionsOpen(false)}
      >
        <Box sx={{ p: 1, borderRadius: 2 }}>
          <DialogTitle><strong>Logged-in devices</strong></DialogTitle>
          <DialogContent>
            {loadingSessions ? (
              <CircularProgress />
            ) : sessions.length === 0 ? (
              <Typography color='goldenrod'>No active sessions</Typography>
            ) : (
              <Stack spacing={1.5}>
                {sessions.map((s) => (
                  <Stack
                    key={s.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ 
                      p: 1.5,
                      gap: 2,
                      border: "1px solid", 
                      borderColor: "divider", 
                      borderRadius: 1 
                    }}
                  >
                    <Box>
                      <Typography fontWeight={600}>
                        {s.device} {s.isCurrent && "(This device)"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {s.ip} · {new Date(s.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    {!s.isCurrent && (
                      <Button size="small" tone="warm" onClick={() => revokeOne(s.id)}>
                        Revoke
                      </Button>
                    )}
                  </Stack>
                ))}
              </Stack>
            )}
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  )
}

export default DevicesAndSessions