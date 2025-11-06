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
  task,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (t: Ticket) => void;
  task?: boolean
}) {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [ errRes, setErrRes] = useState<string | null>("")
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
    try {
      if (task && (values.dueDate==='' || !values.dueDate)) {
        showAlert("You must add a due date for planner task!", "warning");
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

      window.location.reload();
      reset();
      onClose();
    } catch {
      setErrRes("Something went wrong. Please try again!")
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField select label="Type" {...field}>
                  {task ? <MenuItem value={'TASK'}>
                      Task
                    </MenuItem> : Object.values(TICKET_TYPES).map((v, i) => (
                    <MenuItem value={v} key={i}>
                      {v==="FEATURE_REQUEST" ? "Feature" : v[0] + v.slice(1).toLocaleLowerCase()}
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

            {<Stack py={3} spacing={3}>
              <Typography>Set a due date for your {task ? "task" : "ticket"}</Typography>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Due date"
                    type="date"
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
            }
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

            <Stack direction="row" spacing={3} pt={3}>
              <button className={styles.btnAction} type="submit">
                Create
              </button>
              <button className={styles.btnWarm} onClick={onClose}>
                Cancel
              </button>
            </Stack>
          </Stack>
        </form>
        {errRes && <Alert color='warning' severity='error'>{errRes}</Alert>}
      </Box>
    </Drawer>
  );
}