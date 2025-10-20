import styles from '@/app/page.module.css';
import React from 'react';
import { z } from 'zod';

import { api } from '../_level_0/seed';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTicket, Ticket } from '@/types/ticket';
import { Drawer, Box, TextField, Stack, Button, MenuItem, Toolbar } from '@mui/material';

const schema = z.object({
  title: z.string().min(3),
  assignTo: z.string() || z.number(),
  description: z.string().optional(),
  type: z.enum(['GENERAL','BUG','FEATURE_REQUEST','SUPPORT','EVENT']).default('GENERAL'),
  priority: z.enum(['LOW','MEDIUM','HIGH','URGENT']).default('MEDIUM'),
  dueDate: z.string() || z.date(),
});

export default function TicketFormDrawer({ 
    open, 
    onClose, 
    onCreated 
  }: { 
    open: boolean; 
    onClose: () => void; 
    onCreated?: (t: Ticket)=>void 
  }
) {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', type: 'GENERAL', priority: 'MEDIUM', assignTo: '', dueDate: '' },
  });

  const onSubmit = async (values: CreateTicket) => {
    const ticket = await api.createTicket(values);
    onCreated?.(ticket);
    reset();
    onClose();
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{ '& .MuiDrawer-paper': { width: {xs: '100%', md: 520}, p: 3 } }}
    >
      <Toolbar />
      <Box>
        <h5 className='my-1'>Create new ticket</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller 
              name="title" 
              control={control} 
              render={({ field }) => 
                <TextField label="Title" required {...field} />} 
            />
            <Controller 
              name="description" 
              control={control} 
              render={({ field }) => 
                <TextField label="Description" multiline minRows={4} {...field} />}
            />
            <Controller 
              name="type" 
              control={control} 
              render={({ field }) => (
              <TextField select label="Type" {...field}>
                {['GENERAL','BUG','FEATURE_REQUEST','SUPPORT','EVENT'].map(v => <MenuItem value={v} key={v}>{v}</MenuItem>)}
              </TextField>
            )} />
            <Controller name="priority" control={control} render={({ field }) => (
              <TextField select label="Priority" {...field}>
                {['LOW','MEDIUM','HIGH','URGENT'].map(v => <MenuItem value={v} key={v}>{v}</MenuItem>)}
              </TextField>
            )} />
            <Controller 
              name="assignTo" 
              control={control} 
              render={({ field }) => 
                <TextField label="Assigned To" required {...field} />} 
            />
            <Controller name="dueDate" control={control} render={({ field }) => <TextField label="Due date" type="date" InputLabelProps={{ shrink: true }} {...field} />} />

            <Stack direction="row" spacing={1} pt={3}>
              <Button className={styles.btnAction} type="submit">Create</Button>
              <Button className={styles.btnWarm} onClick={() => onClose()}>Cancel</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}