'use client';

import { z } from 'zod';
import React from 'react';
import { api } from '../_level_1/tApi';
import styles from '@/app/page.module.css';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  Box,
  TextField,
  Stack,
  Button,
  MenuItem,
  Toolbar,
  Autocomplete,
} from '@mui/material';
import { CreateTicket, Ticket, Ticket_Type, Ticket_Priority } from '@/types/ticket';
import { TAG_SUGGESTIONS, TICKET_PRIORITIES, TICKET_TYPES } from '../_level_1/constants';

const schema = z.object({
  type: z.nativeEnum(Ticket_Type),
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.nativeEnum(Ticket_Priority),
  assignTo: z.union([z.string(), z.number()]).optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.union([z.string(), z.date()]),
});

type FormValues = z.infer<typeof schema>;

export default function TicketFormDrawer({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (t: Ticket) => void;
}) {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: Ticket_Type.TASK,
      title: '',
      description: '',
      priority: Ticket_Priority.MEDIUM,
      assignTo: '',
      tags: [],
      dueDate: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const formatted: CreateTicket = {
      ...values,
      dueDate: values.dueDate,
      tags: values.tags ?? [],
    };
    const ticket = await api.createTicket(formatted);
    onCreated?.(ticket);
    reset();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 520 }, p: 3 } }}
    >
      <Toolbar />
      <Box>
        <h5 className="my-1">Create new ticket</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField select label="Type" {...field}>
                  {Object.values(TICKET_TYPES).map((v) => (
                    <MenuItem value={v} key={v}>
                      {v==="FEATURE_REQUEST" ? "FEARURE REQUEST" : v}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField label="Title" required {...field} />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Description"
                  multiline
                  minRows={4}
                  {...field}
                />
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <TextField select label="Priority" {...field}>
                  {Object.values(TICKET_PRIORITIES).map((v) => (
                    <MenuItem value={v} key={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="assignTo"
              control={control}
              render={({ field }) => (
                <TextField label="Assign to" {...field} />
              )}
            />

            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={TAG_SUGGESTIONS}
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Add tags" />
                  )}
                />
              )}
            />

            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Due date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...field}
                />
              )}
            />

            <Stack direction="row" spacing={1} pt={3}>
              <Button className={styles.btnAction} type="submit">
                Create
              </Button>
              <Button className={styles.btnWarm} onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}