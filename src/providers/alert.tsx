'use client';

import React, { createContext, useCallback, useContext, useState, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { Button } from '@/assets/buttons';
import { AlertContextType, AlertType } from '@/types/alert';

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
}

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertType>('info');

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleteText, setDeleteText] = useState('Delete');
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const [promptOpen, setPromptOpen] = useState(false);
  const [promptTitle, setPromptTitle] = useState('');
  const [promptMessage, setPromptMessage] = useState('');
  const [promptConfirmText, setPromptConfirmText] = useState('OK');
  const [promptValue, setPromptValue] = useState('');
  const [promptResolver, setPromptResolver] = useState<((value: string | null) => void) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showAlert = useCallback((msg: string, sev: AlertType = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const confirm = useCallback(
    (message: string, title = 'Confirm', deleteText = 'Delete') => {
      setConfirmTitle(title);
      setConfirmMessage(message);
      setDeleteText(deleteText);
      setConfirmOpen(true);

      return new Promise<boolean>((resolve) => {
        setResolver(() => resolve);
      });
    },
    []
  );

  const prompt = useCallback(
    (
      message: string,
      title = 'Prompt',
      defaultValue = '',
      confirmText = 'OK'
    ) => {
      setPromptTitle(title);
      setPromptMessage(message);
      setPromptValue(defaultValue);
      setPromptConfirmText(confirmText);
      setPromptOpen(true);

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);

      return new Promise<string | null>((resolve) => {
        setPromptResolver(() => resolve);
      });
    },
    []
  );

  const handleConfirm = () => {
    resolver?.(true);
    setConfirmOpen(false);
  };

  const handleCancel = () => {
    resolver?.(false);
    setConfirmOpen(false);
  };

  const handlePromptConfirm = () => {
    promptResolver?.(promptValue);
    setPromptOpen(false);
  };

  const handlePromptCancel = () => {
    promptResolver?.(null);
    setPromptOpen(false);
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePromptConfirm();
    }
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        confirm,
        prompt,
      }}
    >
      {children}

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          sx={{ zIndex: 999 }}
          elevation={6}
          variant="filled"
          severity={severity}
          onClose={() => setOpen(false)}
        >
          {message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>
          <strong>{confirmTitle}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>{confirmMessage}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button tone="retreat" onClick={handleCancel}>
              Cancel
            </Button>

            <Button tone="danger" variant="contained" onClick={handleConfirm}>
              {deleteText}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog open={promptOpen} onClose={handlePromptCancel}>
        <DialogTitle>
          <strong>{promptTitle}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 2, p: 1, minWidth: 360 }}>{promptMessage}</DialogContentText>
          <TextField
            inputRef={inputRef}
            autoFocus
            fullWidth
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onKeyDown={handlePromptKeyDown}
            variant="outlined"
            size="small"
          />
        </DialogContent>

        <DialogActions>
          <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button tone="retreat" onClick={handlePromptCancel}>
              Cancel
            </Button>

            <Button tone="primary" variant="contained" onClick={handlePromptConfirm}>
              {promptConfirmText}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </AlertContext.Provider>
  );
};