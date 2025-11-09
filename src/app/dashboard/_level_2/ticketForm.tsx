'use client';

import { z } from 'zod';
import { useState } from 'react';
import styles from '@/app/page.module.css';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { apiPost } from '@/lib/api';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { CreateTicket, Ticket, Ticket_Type, Ticket_Priority } from '@/types/ticket';
import { TAG_SUGGESTIONS, TICKET_PRIORITIES, TICKET_TYPES, PLANNER_TASK_TYPES } from '../_level_1/constants';

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
  task,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (t: Ticket) => void;
  task?: boolean
}) {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [ submitting, setSubmitting ] = useState(false);
  const [ errRes, setErrRes ] = useState<string | null>("");
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: task ? Ticket_Type.EVENT : Ticket_Type.SUPPORT,
      title: '',
      description: '',
      priority: Ticket_Priority.MEDIUM,
      assignTo: '',
      tags: [],
      dueDate: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    try {
      if (task && (values.dueDate==='' || !values.dueDate)) {
        setErrRes("You must add a due date for a planner task");
        return
      }

      const formatted: CreateTicket = {
        ...values,
        dueDate: values.dueDate,
        tags: values.tags ?? [],
        createdById: user?.id
      };

      const ticket: Ticket = await apiPost("/tickets", formatted);
      onCreated?.(ticket);
      showAlert("Your new ticket has been created!", "success");

      reset();
      onClose();
    } catch {
      setErrRes("Something went wrong. Please try again!");
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
      <Box display={'grid'} gap={2}>
        <h5>Create new {task ? "task" : "ticket"}</h5>

        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField select label="Type" {...field}>
                  {task ? 
                    Object.values(PLANNER_TASK_TYPES).map((ptt, i) => (
                      <MenuItem value={ptt} key={i}>
                        {ptt[0] + ptt.slice(1).toLocaleLowerCase()}
                      </MenuItem>
                    )) : Object.values(TICKET_TYPES).map((tt, i) => (
                      <MenuItem value={tt} key={i}>
                        {tt==="FEATURE_REQUEST" ? "Feature" : tt[0] + tt.slice(1).toLocaleLowerCase()}
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

            {!task && <Controller
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
            />}

            {user?.userType==="BUSINESS" && <Controller
              name="assignTo"
              control={control}
              render={({ field }) => (
                <TextField 
                  type='email' 
                  label="Assign to team (member email)" 
                  {...field} 
                />
              )}
            />}
            
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

            <Stack py={3} spacing={3}>
              <Typography>Set a due date {task ? "& time for your task" : "for your ticket"}</Typography>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Due Date & Time"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{
                      "& input": {
                        padding: "20px 14px",
                        borderRadius: 1,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <Stack direction="row" spacing={3} pt={3}>
              <button 
                type='submit'
                disabled={submitting}
                className={styles.btnAction} 
              >
                {submitting ? "Submitting..." : "Create"}
              </button>
              <button className={styles.btnWarm} onClick={onClose} type='button'>
                Cancel
              </button>
            </Stack>
          </Stack>
        </Box>

        {errRes && <Alert color='warning' severity='error'>{errRes}</Alert>}
      </Box>
    </Drawer>
  );
}
