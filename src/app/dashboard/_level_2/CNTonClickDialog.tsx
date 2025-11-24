'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { format } from 'date-fns';

interface DateSelectDialogProps {
  open: boolean;
  date: Date | null;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

export const DateSelectDialog: React.FC<DateSelectDialogProps> = ({
  open,
  date,
  onClose,
  onConfirm,
}) => {
  if (!date) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600}}>Create new event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new task for <strong>{format(date, 'PPP')}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3}}>
        <Button color='inherit' onClick={onClose}>Cancel</Button>
        <Button
          color='inherit'
          variant="contained"
          onClick={() => {
            onConfirm(date);
            onClose();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};