'use client'

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTeam } from '@/hooks/useTeam';
import { Button } from '@/assets/buttons';
import { useAuth } from '@/providers/auth';
import { useTeamTicket } from '@/providers/teamTickets';
import { AllTicketTypes, Create_Ticket } from '@/types/ticket';
import { NavbarAvatar } from '@/app/dashboard/_level_1/navItems';
import { DatePicker } from '@/app/dashboard/_level_1/tDateControl';
import { ALL_TICKET_TYPES } from '@/app/dashboard/_level_0/constants';
import { useForm, Controller, Control, FieldValues, Resolver } from 'react-hook-form';
import {
  TICKET_FORMS,
  TICKET_SCHEMAS,
  TICKET_DEFAULTS,
  TASK_FORMS,
  TASK_SCHEMAS,
  TASK_DEFAULTS,
} from '../../../../_level_1/tSchema'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const TASK_TYPES = ['TASK', 'EVENT', 'MEETING', 'RELEASE', 'DEPLOYMENT'] as const
type TaskType = (typeof TASK_TYPES)[number]
const isTaskType = (value: AllTicketTypes): value is TaskType => TASK_TYPES.includes(value as any)

export default function TeamTicketCreatePage() {
  const router = useRouter()
  const params = useParams()
  const teamId = params.teamId as string
  const { user } = useAuth()
  const { team } = useTeam()
  const { createTicket } = useTeamTicket()

  const [itemType, setItemType] = useState<AllTicketTypes>('GENERAL')

  const formConfig = useMemo(() => {
    let schema
    let getDefaults: (() => Record<string, any>) | undefined
    let FormComp: React.ComponentType<{
      control: Control<FieldValues>
      task?: boolean
    }> | undefined

    if (isTaskType(itemType)) {
      schema = TASK_SCHEMAS[itemType]
      getDefaults = TASK_DEFAULTS[itemType]
      FormComp = TASK_FORMS[itemType]
    } else {
      schema = TICKET_SCHEMAS[itemType]
      getDefaults = TICKET_DEFAULTS[itemType]
      FormComp = TICKET_FORMS[itemType]
    }

    if (!schema) {
      console.warn(`Missing schema for type: ${itemType}`)
      return null
    }

    if (typeof getDefaults !== 'function') {
      console.warn(`Missing defaults function for type: ${itemType}`)
      return null
    }

    if (!FormComp) {
      console.warn(`Missing form component for type: ${itemType}`)
      return null
    }

    return {
      schema,
      defaultValues: {
        ...getDefaults(),
        assignees: [] as number[],
        tags: [] as string[],
      },
      FormComponent: FormComp,
      isTask: isTaskType(itemType),
    }
  }, [itemType])

  const methods = useForm<FieldValues>(
    formConfig
      ? {
          resolver: zodResolver(formConfig.schema as any) as Resolver<FieldValues>,
          defaultValues: formConfig.defaultValues,
        }
      : {
          defaultValues: {
            title: '',
            assignees: [],
            tags: [],
          },
        },
  )

  const { handleSubmit, control, reset } = methods

  useEffect(() => {
    if (formConfig) {
      reset(formConfig.defaultValues)
    }
  }, [formConfig, reset])

  const FormComponent = formConfig?.FormComponent

  if (!formConfig || !FormComponent) {
    return (
      <Box p={4}>
        <Typography color="error">
          Cannot load form — invalid or unsupported type "{itemType}"
        </Typography>
      </Box>
    )
  }

  const teamMembers = team?.members ?? []

  const onSubmit = async (data: FieldValues) => {
    console.log('Form data to submit:', data)
    const payload = {
      ...data,
      teamId: Number(teamId),
      createdById: user?.id!,
      dueDate:
        typeof data.dueDate === 'string' && data.dueDate
          ? new Date(data.dueDate)
          : undefined,
      startTime:
        typeof data.startTime === 'string' && data.startTime
          ? new Date(data.startTime)
          : undefined,
      endTime:
        typeof data.endTime === 'string' && data.endTime
          ? new Date(data.endTime)
          : undefined,
      assignees: data.assignees,
      assignTo: data.assignTo,
    } as unknown as Create_Ticket

    console.log("form data as payload", payload)

    try {
      const result = await createTicket(payload)
      if (result) {
        router.push(`/teams/${teamId}/tickets`)
        router.back()
      } else {
        console.error('Failed to create ticket')
      }
    } catch (err) {
      console.error('Error creating ticket:', err)
    }
  }

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
            display="flex"
            width={{ md: '30%' }}
            flexDirection="column"
            bgcolor="background.paper"
            borderRadius={2}
            boxShadow={1}
          >
            <TextField
              select
              label="Type"
              value={itemType}
              onChange={(e) => setItemType(e.target.value as AllTicketTypes)}
              fullWidth
            >
              {ALL_TICKET_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </TextField>

            <Typography fontWeight={600} mt={2}>
              Team Space
            </Typography>

            <Stack gap={0.75}>
              {teamMembers.length === 0 ? (
                <Typography variant="caption" color="textSecondary">
                  No team members available. Add members to assign tickets.
                </Typography>
              ) : teamMembers.some((m) => m.id === user?.id) ? (
                <Typography variant="caption" color="textSecondary">
                  You can assign this ticket to yourself or other team members.
                </Typography>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  You cannot assign this ticket because you are not a member of the team.
                </Typography>
              )}

              <Typography variant="caption">Share or assign to team member</Typography>

              <Controller
                name="assignees"
                control={control}
                render={({ field }) => (
                  <Select
                    multiple
                    label="Assignees"
                    {...field}
                    value={field.value ?? []}
                    onChange={(e) => field.onChange(e.target.value)}
                    renderValue={(selected: number[]) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const member = teamMembers.find((m) => m.id === value)
                          return <Chip key={value} label={member?.name ?? value} />
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
                bgcolor="var(--surface-1)"
                direction="row"
                borderRadius={5}
                gap={0.75}
                mb={1.75}
                p={1}
              >
                {teamMembers.map((m) => (
                  <NavbarAvatar key={m.id} user={m} size={24} />
                ))}
              </Stack>
            </Stack>

            <DatePicker control={control} name="dueDate" label="Due Date" />
          </Box>

          <Box flex={1}>
            <FormComponent control={control} task={formConfig.isTask} />
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
          mt={5}
          spacing={2}
        >
          <Button tone="retreat" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Create Ticket</Button>
        </Stack>
      </Box>
    </>
  )
}