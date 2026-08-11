'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Button } from '@/assets/buttons';

type AlertType = 'success' | 'error' | 'info' | 'warning';

type AlertContextType = {
  showAlert: (message: string, severity?: AlertType) => void;
  confirm: (message: string, title?: string, deleteText?: string) => Promise<boolean>;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
}

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [deleteText, setDeleteText] = useState('Delete')

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const [severity, setSeverity] = useState<AlertType>('info');
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const showAlert = useCallback((msg: string, sev: AlertType = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const confirm = useCallback(
    (message: string, title = "Confirm", deleteText = "Delete") => {
      setConfirmTitle(title);
      setConfirmMessage(message);
      setDeleteText(deleteText)
      setConfirmOpen(true);

      return new Promise<boolean>((resolve) => {
        setResolver(() => resolve);
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

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        confirm,
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
          sx={{ 
            zIndex: 999}} 
            elevation={6} 
            variant="filled" 
            severity={severity}
            onClose={() => setOpen(false)} 
          >
          {message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle><strong>{confirmTitle}</strong></DialogTitle>

        <DialogContent>
          <DialogContentText>
            {confirmMessage}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 2}}>
            <Button tone='retreat' onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              tone="danger"
              variant="contained"
              onClick={handleConfirm}
            >
              {deleteText}
            </Button>
          </Box>
          
        </DialogActions>
      </Dialog> 
    </AlertContext.Provider>
  );
};
