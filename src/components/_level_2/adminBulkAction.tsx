'use client';

import { useMemo, useState } from 'react';
import { apiPost } from '@/lib/axios';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Button } from '@/assets/buttons';
import { useAlert } from '@/providers/alert';
import { GenericAPIRes } from '@/types/axios';

export type BulkCategory = 'announcement' | 'product_update' | 'maintenance' | 'custom';

export type BulkTarget =
  | { kind: 'all' }
  | { kind: 'role'; role: 'USER' | 'ADMIN' }
  | { kind: 'userType'; userType: 'BUSINESS' | 'PERSONAL' }
  | { kind: 'ids'; ids: number[] };

type Preview = {
  dryRun: true;
  category: BulkCategory;
  subject: string;
  count: number;
  sample: string[];
};

type BulkSendResult = {
  category: BulkCategory;
  subject: string;
  targeted: number;
  sent: number;
  failed: number;
  failures: { email: string; error: string }[];
};

const CATEGORIES: { value: BulkCategory; label: string }[] = [
  { value: 'announcement', label: 'Announcement' },
  { value: 'product_update', label: 'Product update' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'custom', label: 'Custom' },
];

async function postBulk(body: Record<string, unknown>) {
  const res: GenericAPIRes = await apiPost('/admin/send-bulk-messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    throw new Error(res.error?.message || 'Request failed');
  }
  return res.data as BulkSendResult;
}

export function BulkEmailDialog({
  open,
  onClose,
  target,
  targetLabel,
}: {
  open: boolean;
  onClose: () => void;
  target: BulkTarget;
  targetLabel: string;
}) {
  const { showAlert } = useAlert();
  const [category, setCategory] = useState<BulkCategory>('announcement');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState<'preview' | 'send' | null>(null);

  const payload = useMemo(
    () => ({
      category,
      target,
      message,
      ...(category === 'custom' ? { subject } : {}),
    }),
    [category, target, message, subject],
  );

  const reset = () => {
    setPreview(null);
    setBusy(null);
  };

  const handleClose = () => {
    if (busy) return;
    reset();
    onClose();
  };

  const handlePreview = async () => {
    setBusy('preview');
    try {
      const data = await postBulk({ ...payload, dryRun: true });
      setPreview(data as unknown as Preview);
    } catch (err) {
      showAlert(err instanceof Error ? err.message : 'Preview failed', 'error');
    } finally {
      setBusy(null);
    }
  };

  const handleSend = async () => {
    setBusy('send');
    try {
      const data = await postBulk(payload);
      showAlert(`Sent ${data?.sent as unknown as number} of ${data.targeted}`, data.failed ? 'error' : 'success');
      reset();
      onClose();
    } catch (err) {
      showAlert(err instanceof Error ? err.message : 'Send failed', 'error');
    } finally {
      setBusy(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Send bulk email</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography variant="body2" color="text.secondary">
            Target: {targetLabel}
          </Typography>

          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as BulkCategory);
              setPreview(null);
            }}
          >
            {CATEGORIES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>

          {category === 'custom' && (
            <TextField
              label="Subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setPreview(null);
              }}
              inputProps={{ maxLength: 140 }}
            />
          )}

          <TextField
            label="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setPreview(null);
            }}
            multiline
            minRows={5}
            inputProps={{ maxLength: 5000 }}
            helperText="Plain text. Line breaks are kept. HTML is stripped on the server."
          />

          {preview && (
            <Box>
              <Typography variant="body2">
                {preview.count} recipient{preview.count === 1 ? '' : 's'} · {preview.subject}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {preview.sample.join(', ') || 'No sample'}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button tone='retreat' onClick={handleClose} disabled={!!busy}>
          Cancel
        </Button>
        <Button 
          tone='inverted' 
          onClick={handlePreview} 
          disabled={!!busy || !message.trim()}
        >
          {busy === 'preview' ? 'Checking…' : 'Preview'}
        </Button>
      </DialogActions>

      <br/>
      <Divider />
        
      <Box 
        gap={1}
        bgcolor="rgba(0, 0, 0, 0.09)"
        p={2} display="flex" 
        justifyContent="flex-end" 
      >
        <Button 
          tone="action"
          variant="contained"
          onClick={handleSend} 
          disabled={!!busy || !preview}
        >
          {busy === 'send' ? 'Sending…' : 'Send'}
        </Button>
      </Box>
    </Dialog>
  );
}