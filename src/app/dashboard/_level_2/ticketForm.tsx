'use client';

import { z } from 'zod';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/assets/buttons';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { useTickets } from '@/providers/tickets';
import { DatePicker } from '../_level_1/tDatepicker';
import { schema, TICKET_FORM_TYPES } from '../_level_1/tSchema';
import { CreateTicket, Ticket_Type, Ticket_Priority } from '@/types/ticket';
import { useForm, Controller, Control, FieldValues } from 'react-hook-form';
import { 
  TAG_SUGGESTIONS, 
  TICKET_PRIORITIES, 
  TICKET_TYPES, 
  PLANNER_TASK_TYPES, 
  EVENT_TAG_SUGGESTIONS
} from '../_level_1/constants';
import {
  Drawer,
  Box,
  TextField,
  Stack,
  MenuItem,
  Toolbar,
  Autocomplete,
  Alert,
  Typography,
} from '@mui/material';

type FormValues = z.infer<typeof schema>;

export default function TicketFormDrawer({
  open,
  onClose,
  onCreated,
  task,
  defaultDueDate,
}: TICKET_FORM_TYPES ) {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { createTicket } = useTickets();
  const [submitting, setSubmitting] = useState(false);
  const [errRes, setErrRes] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: task ? Ticket_Type.EVENT : Ticket_Type.GENERAL,
      title: '',
      description: '',
      priority: Ticket_Priority.MEDIUM,
      assignTo: '',
      tags: [],
      dueDate: '',
    },
  });

  useEffect(() => {
    reset({
      type: task ? Ticket_Type.EVENT : Ticket_Type.GENERAL,
      title: '',
      description: '',
      priority: Ticket_Priority.MEDIUM,
      assignTo: '',
      tags: [],
      dueDate: defaultDueDate
        ? format(defaultDueDate, "yyyy-MM-dd'T'HH:mm")
        : undefined,
    });
  }, [defaultDueDate, task, reset]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setErrRes(null);

    try {
      if (task && !values.dueDate) {
        setErrRes('You must add a due date for a planner task');
        return;
      }

      const payload: CreateTicket = {
        ...values,
        dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
        tags: values.tags ?? [],
        createdById: user?.id,
      };

      if (!createTicket) {
        setErrRes('Ticket creation is not available right now.');
        return;
      }

      const ticket = await createTicket(payload);
      onCreated?.(ticket);
      showAlert('Your new ticket has been created!', 'success');

      setInterval(() => window.location.reload(), 2500);
      reset();
      onClose();
    } catch {
      setErrRes('Something went wrong. Please try again!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 520 }, p: 3 } }}
    >
      <Toolbar />

      <Box display="grid" gap={2}>
        <h5>Create new {task ? 'task' : 'ticket'}</h5>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField select label="Type" {...field}>
                  {task
                    ? Object.values(PLANNER_TASK_TYPES).map((ptt, i) => (
                        <MenuItem value={ptt} key={i}>
                          {ptt[0] + ptt.slice(1).toLocaleLowerCase()}
                        </MenuItem>
                      ))
                    : Object.values(TICKET_TYPES).map((tt, i) => (
                        <MenuItem value={tt} key={i}>
                          {tt === 'FEATURE_REQUEST'
                            ? 'Feature'
                            : tt[0] + tt.slice(1).toLocaleLowerCase()}
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
                      {v[0] + v.slice(1).toLocaleLowerCase()}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {user?.userType === 'BUSINESS' && (
              <Controller
                name="assignTo"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="email"
                    label="Assign to team (member email)"
                    {...field}
                  />
                )}
              />
            )}
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={task ? EVENT_TAG_SUGGESTIONS : TAG_SUGGESTIONS}
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add tags"
                    />
                  )}
                />
              )}
            />

            <Stack py={1} spacing={2}>
              <Typography variant='body2' sx={{ opacity: 0.75}}>
                Set date {task ? 'and time for this task' : 'for this ticket'}
              </Typography>
              <DatePicker control={control} name="dueDate" defaultValue="" />
            </Stack>

            <Stack direction="row" spacing={3} pt={1.5}>
              <Button loading={submitting}> Create </Button>
              <Button tone="warm" onClick={onClose}> Cancel</Button>
            </Stack>
          </Stack>
        </Box>

        {errRes && <Alert severity="error">{errRes}</Alert>}
      </Box>
    </Drawer>
  );
}
