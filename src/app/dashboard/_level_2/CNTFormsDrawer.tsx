'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useTickets } from '@/providers/tickets';
import { useAlert } from '@/providers/alert';
import { useAuth } from '@/providers/auth';
import { Button } from '@/assets/buttons';
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
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTicketLimits } from '@/hooks/useTicketLimits';
import { Create_Ticket, CreateTicketResult } from '@/types/ticket';
import { TASK_TYPE_META, TICKET_TYPE_META } from '../_level_0/constants';
import { 
  useForm, 
  FormProvider, 
  FieldValues, 
  Control, 
  Resolver 
} from 'react-hook-form';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import { Info } from '@mui/icons-material';

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

  const { data: limits, isLoading: limitsLoading, refreshLimits } = useTicketLimits();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const typeSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const element = typeSelectorRef.current;
    if (!element) return;

    void element.offsetWidth;
    element.style.animation = 'highlightPulse 1.8s ease-out';

    const timer = setTimeout(() => { element.style.animation = ''}, 2000);

    return () => clearTimeout(timer);
  }, [open]);

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

  const FormComponent = registryForms[itemType as keyof typeof registryForms] as React.ComponentType<{ 
    control: Control<FieldValues>; task?: boolean 
  }>;

  useEffect(() => {
    methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate));
  }, [defaultDueDate, itemType, task, methods, registryDefaults]);

  
  const isPartner = user?.data?.approved;

  const onSubmit = async (values: FieldValues) => {
    setErr(null);
    methods.clearErrors();
    setIsSubmitting(true);

    try {
      if (itemType === "INVOICE" && (!isPartner || !user?.subscription?.active)) {
        setErr('Invoice is not supported for users without active subscription');
        setIsSubmitting(false);
        return;
      }

      if (task && (itemType === 'MEETING' || itemType==='EVENT')) {
        if (!values.dueDate && !values.startTime) {
          setErr('You must add a due date or start time for a planner task');
          setIsSubmitting(false);
          return;
        }
      }

      console.log("Got here!")
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

              console.log("Got here!!")

      const payload = {
        ...payloadBase,
        assignees: values.assignees ?? null,
        dueDate: dueDateIso,
        endTime: endTimeDate,
        startTime: startTimeDate,
        createdById: user?.id,
      } as unknown as Create_Ticket;

      if (!createTicket) {
        showAlert("Ticket creation is not available right now.", 'warning')
        throw new Error('Ticket creation is not available right now.');
      }

            console.log("Got here!!!")
      const result = await createTicket(payload) as CreateTicketResult;

      if (result.success) {
        onCreated?.(result.ticket);
        showAlert("Your new ticket has been created!", "success");

        methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate));

        refreshLimits();
        onClose();
      } else {
        showAlert(result.error, "error");
        setErr(result.error);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setErr(message);
      showAlert(message, "error");
      methods.clearErrors();
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelCNT = () => { 
    methods.clearErrors();
    methods.reset(registryDefaults[itemType as keyof typeof registryDefaults](defaultDueDate)); 
    onClose(); 
  }

  return (
    <Drawer 
      open={open} 
      anchor="right" 
      onClose={onClose} 
      sx={{ 
        '& .MuiDrawer-paper': { width: { xs: '100%', md: 600 },} 
      }}
    >
      <Toolbar />
      { isSubmitting ? 
        <Typography textAlign={'center'} py={6}> Submitting....</Typography> 
        :
        <Box display="grid" gap={1}>
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
              <Stack mr={1}>
                <Typography 
                  variant="h6" 
                  fontWeight={600}
                  minWidth={{ sm: 200}}
                  textAlign={{ xs: 'center', sm: 'left'}} 
                >
                  Create new {task ? 'task' : 'ticket'}
                </Typography>
                <Typography 
                  variant='caption' 
                  pb={{ xs: 2, md: 0}}
                  sx={{ opacity: 0.5 }}
                  textAlign={{ xs: 'center', sm: 'left'}} 
                >
                  Choose from {!task ? 'General, Invoice, etc' : 'Task, Event, Meeting'}
                </Typography>
              </Stack>
              
              <Box
                ref={typeSelectorRef}
                width={'100%'}
                sx={{
                  animation: 'none',
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                  },
                }}
                className='highlight-glow'
              >
                <TextField
                  select
                  label="Type"
                  value={String(itemType)}
                  onChange={(e) => setItemType(e.target.value as LocalType)}
                  fullWidth
                  slotProps={{
                    input: {
                      sx: {
                        fontWeight: 600,
                        backgroundColor: 'background.paper',
                      },
                    },
                  }}
                >
                  { Object.keys(registryForms).map((k) => {
                    const meta = task
                      ? TASK_TYPE_META[k as PlannerTaskTypeUnion]
                      : TICKET_TYPE_META[k as TicketTypeUnion];
                    
                    return (
                      <MenuItem key={k} value={k}>
                        <Stack
                          width="100%"
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          {meta?.label ?? k}
                          <Tooltip title={meta.description} arrow placement="right">
                            <IconButton size="small">
                              <Info fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Box>
            </Box>
          </Card>

          <Alert 
            sx={{ mx: 'auto', maxWidth: 321 }} 
            severity={
              limitsLoading ? "info" : 
              limits && limits.remaining <= 0 ? "error" :
              "success"
            }
          >
            {limits && !limitsLoading && (
              <Box borderRadius={1}>
                <Typography variant="body2" color="text.secondary">
                  {task ? "Tasks" : "Tickets"} remaining:{" "}
                  <strong>
                    {limits.remaining}
                    {limits.remaining === 0 && " (limit reached!)"}
                  </strong>{" "}
                  / {limits.limit}
                  {limits.isTeamActive && " (via team)"}
                </Typography>
                {limits.remaining <= 3 && limits.remaining > 0 && (
                  <Typography variant="caption" color="warning.main">
                    Almost out — consider upgrading or free up space
                  </Typography>
                )}
                {limits.remaining <= 0 && (
                  <Typography variant="caption" color="error.main" mt={0.5}>
                    You&aposve reached your limit. Upgrade or resolve some tickets.
                  </Typography>
                )}
              </Box>
            )}

            {limitsLoading && (
              <Typography variant="caption" color="text.secondary" mt={1}>
                Checking ticket limit...
              </Typography>
            )}
          </Alert>
          
          { isSubmitting ? (
              <Typography textAlign={'center'} py={2}>Submitting...</Typography> 
          ) : (
            <Box px={3} mb={2}>
              <FormProvider {...methods}>
                <form 
                  key={String(itemType)} 
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <FormComponent control={methods.control} task={task} />
                  <Stack gap={2} py={3} px={{ xs: 4, sm: 5, md: 6, }}>
                    <Button
                      fullWidth
                      type="submit"
                      tone="action"
                      size="large"
                      loading={isSubmitting}
                      disabled={isSubmitting || (limits?.remaining ?? 1) <= 0}
                    >
                      Create
                    </Button>
                    { err && <Alert severity="error">{err}</Alert>}
                    { methods.formState.errors && Object.keys(
                      methods.formState.errors).length > 0 && (
                        <Alert severity="warning">
                          Please fix the errors above
                        </Alert>
                      )
                    }
                    <Button 
                      tone="warm" 
                      onClick={cancelCNT}
                      sx={{ minWidth: 222, margin: '0 auto'}}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </form>
              </FormProvider>
            </Box>
          )}
        </Box>
      }
    </Drawer>
  );
}
