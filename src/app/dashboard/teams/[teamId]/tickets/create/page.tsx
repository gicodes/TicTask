'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller, Control, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTeam } from '@/hooks/useTeam';
import { useTeamTicket } from '@/providers/teamTickets';
import { DatePicker } from '@/app/dashboard/_level_1/tDateControl';
import {
  TICKET_FORMS,
  TICKET_SCHEMAS,
  TICKET_DEFAULTS,
  TASK_FORMS,
  TASK_SCHEMAS,
  TASK_DEFAULTS,
  TicketTypeUnion,
  PlannerTaskTypeUnion,
} from '../../../../_level_1/tSchema';
import { Create_Ticket } from '@/types/ticket';
import { useAuth } from '@/providers/auth';
import { ALL_TICKET_TYPES } from '@/app/dashboard/_level_0/constants';
import { Button } from '@/assets/buttons';
import { NavbarAvatar } from '@/app/dashboard/_level_1/navItems';

type LocalType = TicketTypeUnion | PlannerTaskTypeUnion;

export default function TeamTicketCreatePage() {
  const router = useRouter();
  const { teamId } = useParams();
  const { user } = useAuth();
  const { team } = useTeam();
  const { createTicket } = useTeamTicket();

  const [itemType, setItemType] = useState<LocalType>('GENERAL');

  const isTaskMode = ['EVENT', 'MEETING'].includes(itemType);
  const registryForms   = isTaskMode ? TASK_FORMS   : TICKET_FORMS;
  const registrySchemas = isTaskMode ? TASK_SCHEMAS : TICKET_SCHEMAS;
  const registryDefaults = (isTaskMode ? TASK_DEFAULTS : TICKET_DEFAULTS) as Record<
    LocalType,
    (d?: Date) => Record<string, unknown>
  >;

  const currentSchema = registrySchemas[itemType as keyof typeof registrySchemas];
  const getDefaults   = registryDefaults[itemType as keyof typeof registryDefaults];

  const methods = useForm<FieldValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      ...getDefaults(),          
      assignees: [],               
      tags: [],                   
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    reset(getDefaults());
  }, [itemType, reset, getDefaults]);
  
  const teamMembers = team?.members ?? [];

  const onSubmit = async (data: FieldValues) => {
    const payloadBase: Record<string, unknown> = { ...(data as Record<string, unknown>) };

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

    try {
      const payload = {
        ...data,
        type: itemType,
        title: data.title ?? '',
        teamId: Number(teamId), 
        extClient: data.extClient ?? null,
        createdById: user?.id!,
        dueDate: dueDateIso,
        endTime: endTimeDate,
        startTime: startTimeDate,
        assignTo: data.assignees?.length === 0 ? null : data.assignees,
      } as unknown as Create_Ticket;

      const result = await createTicket(payload);

      if (result) {
        router.push(`/teams/${teamId}/tickets`); 
        router.back();
      } else {
        console.error('Failed to create');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const FormComponent = registryForms[itemType as keyof typeof registryForms] as React.ComponentType<{
    control: Control<FieldValues>;
    task?: boolean;
  }>;

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600} sx={{ ml: 2, flex: 1 }}>
            Create Team Ticket
          </Typography>
        </Toolbar>
      </AppBar>

      <Box p={4} maxWidth="lg" mx="auto">
        <Stack direction={{ md: 'row' }} spacing={4}>
          <Box 
            p={2}
            gap={2}
            display={'flex'} 
            width={{ md: '30%' }} 
            flexDirection={'column'}
            bgcolor="background.paper" 
            borderRadius={2} 
            boxShadow={1}
          >
            <TextField
              select
              label="Type"
              value={itemType}
              onChange={(e) => setItemType(e.target.value as LocalType)}
              fullWidth
            >
              {ALL_TICKET_TYPES.map((t: string) => (
                <MenuItem key={t} value={t}>
                  {t.replace('_', ' ')}
                </MenuItem>
              ))}
            </TextField>

            <Typography fontWeight={600} mt={2}> Team Playground</Typography>

            <Stack gap={0.75}>
              {teamMembers.length === 0 ? (
                <Typography variant="caption" color="textSecondary">
                  No team members available. Add members to assign tickets.
                </Typography>
              ) : teamMembers.map(m => m.id).includes(user?.id!) ? (
                <Typography variant="caption" color="textSecondary">
                  You can assign this ticket to yourself or other team members.
                </Typography>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  You cannot assign this ticket to anyone because you are not a member of the team.
                </Typography>
              )}
              <Typography variant='caption'>Share or assign to team member </Typography>
              <Controller
                name="assignees"
                control={control}
                render={({ field }) => (
                  <Select
                    multiple
                    label="Assignees"
                    fullWidth
                    {...field}
                    value={field.value ?? []}        
                    onChange={(e) => field.onChange(e.target.value)} 
                    renderValue={(selected: number[]) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const member = teamMembers.find((m) => m.id === value);
                          return <Chip key={value} label={member?.name ?? value} />;
                        })}
                      </Box>
                    )}
                  >
                    {teamMembers.map((m) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Stack
                bgcolor={'var(--border-color)'}
                direction={'row'} 
                borderRadius={5}
                gap={0.75}
                mb={1.75} 
                p={1}
              >
                {teamMembers.map(m =>
                  <NavbarAvatar key={m.id} user={m} size={24}/>
                )}
              </Stack>
            </Stack>

            <DatePicker control={control} name="dueDate" label="Due Date" />
          </Box>

          <Box flex={1}>
            <FormComponent control={control} task={isTaskMode} />
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', sm: "row" }} justifyContent="flex-end" mt={5} spacing={2}>
          <Button tone='retreat' onClick={() => router.back()}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>
            Create Ticket
          </Button>
        </Stack>
      </Box>
    </>
  );
}