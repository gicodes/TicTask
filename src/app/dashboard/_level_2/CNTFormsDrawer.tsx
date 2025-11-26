import React, { useEffect, useState } from 'react';
import { useTickets } from '@/providers/tickets';
import { Create_Ticket } from '@/types/ticket';
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
  TICKET_FORM_PROPS,
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
  Card,
} from '@mui/material';

export default function TicketTaskCreateFormsDrawer({ 
  open,
  task = false, 
  defaultDueDate,
  onClose, 
  onCreated, 
}: TICKET_FORM_PROPS ) {
  
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { createTicket } = useTickets();

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  type LocalType = TicketTypeUnion | PlannerTaskTypeUnion;
  
  const initialType = task ? ('EVENT' as PlannerTaskTypeUnion) : ('GENERAL' as TicketTypeUnion);
  const [itemType, setItemType] = useState<LocalType>(initialType);

  const registryForms = task ? TASK_FORMS : TICKET_FORMS;
  const registrySchemas = task ? TASK_SCHEMAS : TICKET_SCHEMAS;
  const registryDefaults = (task ? TASK_DEFAULTS : TICKET_DEFAULTS) as Record<
    LocalType, (d?: Date) => Record<string, unknown>>;
  const currentSchema: ZodType<FieldValues, FieldValues> = registrySchemas[itemType as keyof typeof registrySchemas];
  const defaultValues = registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate);

  const methods = useForm<FieldValues>({
    resolver: zodResolver(currentSchema) as Resolver<FieldValues, FieldValues>,
    defaultValues: defaultValues as Record<string, unknown>,
  });

  const FormComponent = registryForms[itemType as keyof typeof registryForms] as React.ComponentType<{ control: Control<FieldValues>; task?: boolean }>;

  useEffect(() => {
    methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate));
  }, [defaultDueDate, itemType, task, methods, registryDefaults]);

  const onSubmit = async (values: FieldValues) => {
    setErr(null);
    setSubmitting(true);

    try {
      if (task && (itemType === 'MEETING' || itemType==='EVENT')) {
        if (!values.dueDate && !values.startTime) {
          setErr('You must add a due date or start time for a planner task');
          setSubmitting(false);
          return;
        }
      }

      const payloadBase: Record<string, unknown> = { ...(values as Record<string, unknown>) };

      if (Array.isArray(payloadBase.tags) === false && typeof payloadBase.tags === 'string') {
        payloadBase.tags = (payloadBase.tags as unknown as string).split(',').map(s => s.trim()).filter(Boolean);
      }

      const dueDateIso =
        typeof payloadBase.dueDate === 'string' && payloadBase.dueDate
          ? new Date(payloadBase.dueDate as string)
          : typeof payloadBase.startTime === 'string' && payloadBase.startTime
            ? new Date(payloadBase.startTime as string)
            : undefined;

      const startTimeDate = typeof payloadBase.startTime === 'string' && payloadBase.startTime
        ? new Date(payloadBase.startTime as string)
        : undefined;

      const endTimeDate = typeof payloadBase.endTime === 'string' && payloadBase.endTime
        ? new Date(payloadBase.endTime as string)
        : undefined;

      const payload = {
        ...payloadBase,
        dueDate: dueDateIso,
        startTime: startTimeDate,
        endTime: endTimeDate,
        createdById: user?.id ?? null,
      } as unknown as Create_Ticket;

      if (!createTicket) {
        showAlert("Ticket creation is not available right now.", 'warning')
        throw new Error('Ticket creation is not available right now.');
      }

      const ticket = await createTicket(payload);
      onCreated?.(ticket);
      showAlert('Your new ticket has been created!', 'success');

      methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate));
      onClose();
      
    } catch (e) {
      const message = (e instanceof Error) ? e.message : 'Something went wrong. Please try again.';
      console.error(e);
      setErr(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{ 
        '& .MuiDrawer-paper': { width: { xs: '100%', md: 600 },} 
      }}
    >
      <Toolbar />

      <Box display="grid" gap={2}>
        <Card 
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            borderRadius: 0,
          }}
        >
          <Box 
            gap={1}  
            alignItems={'center'}
            justifyContent={'space-between'}
            display={{ xs: 'block', sm: 'flex' }}
          >
            <Typography 
              pb={1}
              variant="h6" 
              fontWeight={600}
              minWidth={{ sm: 200}}
              textAlign={{ xs: 'center', sm: 'left'}} 
            >
              Create new {itemType === 'TASK' ? 'task' : 'ticket'}
            </Typography>
            <Box width={'100%'}>
              <TextField 
                select 
                label="Type" 
                value={String(itemType)} 
                onChange={(e) => setItemType(e.target.value as LocalType)} 
                fullWidth
              >
                {Object.keys(registryForms).map((k) => (
                  <MenuItem key={k} value={k}>
                    {k === 'FEATURE_REQUEST' ? 'Feature' : (k[0]+k.slice(1).toLowerCase())}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Card>
        
        <Box px={3}>
          <FormProvider {...methods}>
            <form key={String(itemType)} onSubmit={methods.handleSubmit(onSubmit)}>
              <FormComponent control={methods.control} task={task} />
              <Stack gap={2} py={3} px={{ xs: 4, sm: 5, md: 6, }}>
                <Button 
                  fullWidth 
                  type="submit"
                  tone='action'
                  size='large'
                  loading={submitting}
                >
                  Create
                </Button>
                <Button 
                  tone="warm" 
                  onClick={() => { 
                    methods.reset(registryDefaults[itemType as 
                      keyof typeof registryDefaults](defaultDueDate)); 
                    onClose(); 
                  }}
                  sx={{ minWidth: 222, margin: '0 auto'}}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </Box>
        
        {err && <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert>}
        {methods.formState.errors && Object.keys(methods.formState.errors).length > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Please fix the errors above
          </Alert>
        )}
      </Box>
    </Drawer>
  );
}
