import React, { useEffect, useState } from 'react';
import { useTickets } from '@/providers/tickets';
import { CreateTicket, Ticket } from '@/types/ticket';
import { useAlert } from '@/providers/alert';
import { useAuth } from '@/providers/auth';
import { Button } from '@/assets/buttons';
import { 
  useForm, 
  FormProvider, 
  FieldValues, 
  Control, 
  Resolver 
} from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TICKET_FORMS,
  TICKET_SCHEMAS,
  TICKET_DEFAULTS,
  TASK_FORMS,
  TASK_SCHEMAS,
  TASK_DEFAULTS,
  TicketTypeUnion,
  PlannerTaskTypeUnion,
} from '../_level_1/tSchema';
import {
  Drawer,
  Box,
  Toolbar,
  TextField,
  MenuItem,
  Stack,
  Alert,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  task?: boolean;
  defaultDueDate?: Date;
  onClose: () => void;
  onCreated?: (t: Ticket | void) => void;
};

export default function TicketTaskCreateFormsDrawer({ 
  open,
  task = false, 
  defaultDueDate,
  onClose, 
  onCreated, 
}: Props) {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { createTicket } = useTickets();

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  type LocalType = TicketTypeUnion | PlannerTaskTypeUnion;

  const registryForms = task ? TASK_FORMS : TICKET_FORMS;
  const registrySchemas = task ? TASK_SCHEMAS : TICKET_SCHEMAS;
  const registryDefaults = (task ? TASK_DEFAULTS : TICKET_DEFAULTS) as Record<
    LocalType,
    (d?: Date) => Record<string, unknown>
  >;

  const initialType = task ? ('EVENT' as PlannerTaskTypeUnion) : ('GENERAL' as TicketTypeUnion);
  const [itemType, setItemType] = useState<LocalType>(initialType);

  const currentSchema: ZodType<FieldValues, FieldValues> = registrySchemas[itemType as keyof typeof registrySchemas];
  const defaultValues = registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate);

  const methods = useForm<FieldValues>({
    resolver: zodResolver(currentSchema) as Resolver<FieldValues, FieldValues>,
    defaultValues: defaultValues as Record<string, unknown>,
  });

  const FormComponent = registryForms[itemType as keyof typeof registryForms] as React.ComponentType<{ control: Control<FieldValues>; task?: boolean }>;

  useEffect(() => {
    methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDueDate, itemType, task]);

  const onSubmit = async (values: FieldValues) => {
    setErr(null);
    setSubmitting(true);

    try {
      if (task && itemType === 'TASK') {
        if (!values.dueDate && !values.startTime) {
          setErr('You must add a due date or start time for a planner task');
          setSubmitting(false);
          return;
        }
      }

      const payloadBase: Record<string, unknown> = { ...(values as Record<string, unknown>) };

      if (Array.isArray(payloadBase.tags) === false && typeof payloadBase.tags === 'string') {
        // if tags were provided as comma string, convert and normalize
        payloadBase.tags = (payloadBase.tags as unknown as string).split(',').map(s => s.trim()).filter(Boolean);
      }

      const dueDateIso =
        typeof payloadBase.dueDate === 'string' && payloadBase.dueDate
          ? new Date(payloadBase.dueDate as string)
          : typeof payloadBase.startTime === 'string' && payloadBase.startTime
            ? new Date(payloadBase.startTime as string)
            : undefined;

      const payload = {
        ...payloadBase,
        dueDate: dueDateIso,
        createdById: user?.id ?? null,
      } as unknown as CreateTicket;

      if (!createTicket) {
        showAlert("Ticket creation is not available right now.", 'warning')
        throw new Error('Ticket creation is not available right now.');
      }

      const ticket = await createTicket(payload);
      onCreated?.(ticket);
      showAlert('Your new ticket has been created!', 'success');

      methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate));
      onClose();

      setTimeout(() => {
        try { 
          window.location.reload(); 
        } catch { 
          console.warn("Timed Out")
        }
      }, 2500);
    } catch (e) {
      const message = (e instanceof Error) ? e.message : 'Something went wrong. Please try again.';
      console.error(e);
      setErr(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 520 }, p: 3 } }}>
      <Toolbar />
      <Box display="grid" gap={2}>
        <Typography variant="h6">Create new {itemType === 'TASK' ? 'task' : 'ticket'}</Typography>

        <Box>
          <TextField select label="Type" value={String(itemType)} onChange={(e) => setItemType(e.target.value as LocalType)} fullWidth>
            {Object.keys(registryForms).map((k) => (
              <MenuItem key={k} value={k}>
                {k[0] + k.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <FormProvider {...methods}>
          <form key={String(itemType)} onSubmit={methods.handleSubmit(onSubmit)}>
            <FormComponent control={methods.control} task={task} />
            <Stack direction="row" spacing={2} pt={2}>
              <Button type="submit" loading={submitting}>Create</Button>
              <Button tone="warm" onClick={() => { methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate)); onClose(); }}>
                Cancel
              </Button>
            </Stack>
          </form>
        </FormProvider>

        {err && <Alert severity="error">{err}</Alert>}
      </Box>
    </Drawer>
  );
}
