'use client';

import { TICKET_WORKSPACE_PROPS, TicketFormValuesUnion } from '../_level_1/tSchema';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { extractTicketData } from '../_level_1/tFieldExtract';
import { Create_Ticket, Ticket } from '@/types/ticket';
import { DatePicker } from '../_level_1/tDateControl';
import { useTickets } from '@/providers/tickets';
import { useAuth } from '@/providers/auth';
import { Button } from '@/assets/buttons';
import { User } from '@/types/users';
import { useState } from 'react';
import {
  Box,
  Drawer,
  Toolbar,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Divider,
  Chip,
  Switch,
} from '@mui/material';
import { CloseSharp, ExpandMore } from '@mui/icons-material';

export default function TWSExtDrawer({ 
  open, 
  onClose, 
  ticket, 
  onUpdate 
}: TICKET_WORKSPACE_PROPS ) {  
  const { user } = useAuth();
  const { updateTicket } = useTickets();
  const fields = extractTicketData(ticket!);
  const { control, handleSubmit, reset } = useForm<TicketFormValuesUnion>({ defaultValues: fields });
  const [newNote, setNewNote] = useState('');
  const [newHistoryAction, setNewHistoryAction] = useState('');

  const isActive = !['CANCELLED', 'RESOLVED', 'CLOSED'].includes(ticket!.status);
  const isTeamAdmin = !!(user as User).teamMemberships && !!(user as User).createdTeams;

  const onSubmit = async (data: FieldValues) => {
    const dueDateIso = (data?.dueDate) === 'string' && data.dueDate
      ? new Date(data.dueDate as string)
      : typeof data.startTime === 'string' && data.startTime
        ? new Date(data.startTime as string)
        : undefined;

    const startTimeDate = typeof data.startTime === 'string' && data.startTime
      ? new Date(data.startTime as string)
      : undefined;

    const endTimeDate = typeof data.endTime === 'string' && data.endTime
      ? new Date(data.endTime as string)
      : undefined;

    const payload: FieldValues | TicketFormValuesUnion = {
      ...data,
      dueDate: dueDateIso,
      startTime: startTimeDate,
      endTime: endTimeDate,
      createdById: user?.id ?? null,
    } as unknown as Partial<Create_Ticket>;
        
    await updateTicket(Number(ticket!.id), payload as Partial<Ticket>);
    onUpdate?.();
    reset(payload);
  };

  const addNote = async () => {
    if (!newNote) return;

    await updateTicket(Number(ticket!.id), { 
      notes: [...(ticket!.notes ?? []), { 
        id: Number(ticket!.id+Math.random()), 
        content: newNote, 
        createdAt: new Date().toISOString(), 
        authorId: user?.id }] 
      });
    
    setNewNote('');
    onUpdate?.();
  };

  const addHistory = async () => {
    if (!newHistoryAction) return;

    await updateTicket(Number(ticket!.id), { 
      history: [...(ticket!.history ?? []), { 
        id: Number(ticket!.id+Math.random()), 
        action: newHistoryAction, 
        createdAt: new Date().toISOString(), 
        performedById: user?.id }] 
      });
    setNewHistoryAction('');
    onUpdate?.();
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{ 
        '& .MuiDrawer-paper': { width: { 
          xs: '100%', md: 600, lg: 669 } 
        } 
      }}
    >
      <Toolbar />
      <Toolbar>
        <Typography flexGrow={1} variant='body2' color='text.disabled'>
          Extended Workspace 
          <IconButton size='small'>➣ </IconButton>
          <Chip label={ticket!.title} />
        </Typography>
        <IconButton onClick={onClose}>
          <CloseSharp />
        </IconButton>
      </Toolbar>
      <Divider />

      <Box p={3} display="grid" gap={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography><strong>Unique Fields</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={2}>
                {ticket!.type === 'BUG' && 'severity' in fields && (
                  <Controller
                    name="severity"
                    control={control}
                    render={({ field }) => (
                      <TextField label="Severity" select disabled={!isActive} {...field}>
                      </TextField>
                    )}
                  />
                )}
                {ticket!.type === 'BUG' && 'steps' in fields && (
                  <Controller
                    name="steps"
                    control={control}
                    render={({ field }) => <TextField label="Steps" multiline disabled={!isActive} {...field} />}
                  />
                )}
                {ticket!.type === 'FEATURE_REQUEST' && 'impact' in fields && (
                  <Controller
                    name="impact"
                    control={control}
                    render={({ field }) => (
                      <TextField label="Impact" select disabled={!isActive} {...field}>
                        {/* Options */}
                      </TextField>
                    )}
                  />
                )}
                {ticket!.type === 'INVOICE' && 'amount' in fields && (
                  <Controller name="amount" control={control} render={({ field }) => <TextField label="Amount" type="number" disabled={!isActive} {...field} />} />
                )}
                {ticket!.type === 'INVOICE' && 'currency' in fields && (
                  <Controller name="currency" control={control} render={({ field }) => <TextField label="Currency" disabled={!isActive} {...field} />} />
                )}
                {ticket!.type === 'INVOICE' && 'recurrence' in fields && (
                  <Controller name="recurrence" control={control} render={({ field }) => <TextField label="Recurrence" disabled={!isActive} {...field} />} />
                )}
                {ticket!.type === 'TASK' && 'checklist' in fields && (
                  <Stack gap={1}>
                    <Typography>Checklist</Typography>
                    {fields.checklist?.map((item, idx) => (
                      <Stack key={idx} direction="row" alignItems="center">
                        <Switch disabled={!isActive} />
                        <Typography>{item}</Typography>
                      </Stack>
                    ))}
                    {isActive && <TextField placeholder="Add checklist item" />}
                  </Stack>
                )}
                {ticket!.type === 'TASK' && 'recurrence' in fields && (
                  <Controller name="recurrence" control={control} render={({ field }) => 
                    <TextField label="Recurrence" disabled={!isActive} {...field} />} />
                )}
                {ticket!.type === 'TASK' && 'estimatedTimeHours' in fields && (
                  <Controller
                    name="estimatedTimeHours"
                    control={control}
                    render={({ field }) => <TextField label="Estimated Hours" type="number" disabled={!isActive} {...field} />}
                  />
                )}
                {ticket!.type === 'TASK' && 'attachments' in fields && (
                  <Stack gap={1}>
                    <Typography>Attachments</Typography>
                    {fields.attachments?.map((url, idx) => <Chip key={idx} label={url} />)}
                    {isActive && <Button>Upload Attachment</Button>}
                  </Stack>
                )}
                {ticket!.type === 'TASK' && 'subtasks' in fields && (
                  <Stack gap={1}>
                    <Typography>Subtasks</Typography>
                    <List>
                      {fields.subtasks?.map((sub, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={sub.title} secondary={sub.done ? 'Done' : 'Pending'} />
                        </ListItem>
                      ))}
                    </List>
                    {isActive && <TextField placeholder="Add subtask" />}
                  </Stack>
                )}
                {['EVENT', 'MEETING'].includes(ticket!.type) && 'startTime' in fields && (
                  <DatePicker 
                    control={control} 
                    name="startTime" 
                    defaultValue={fields.startTime ?? ""} 
                    disabled={!isActive}
                    label="Start Time"
                  />
                )}
                {['EVENT', 'MEETING'].includes(ticket!.type) && 'endTime' in fields && (
                  <DatePicker
                    control={control}
                    name="endTime"
                    defaultValue={fields.endTime ?? ""}
                    disabled={!isActive}
                    label="End Time"
                  />
                )}
                {['EVENT', 'MEETING'].includes(ticket!.type) && 'location' in fields && (
                  <Controller name="location" control={control} render={({ field }) => 
                    <TextField label="Location" disabled={!isActive} {...field} />} />
                )}
                {['EVENT', 'MEETING'].includes(ticket!.type) && 'attendees' in fields && (
                  <Stack gap={1} p={1}>
                    <Typography><strong>Attendees</strong></Typography>
                    {fields.attendees &&
                      <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
                        {fields.attendees?.map((attendee, idx) => 
                          <Chip key={idx} label={attendee} sx={{ maxWidth: 'fit-content'}}/>
                        )}
                      </Stack>
                    }
                    {isActive && <TextField placeholder="Add attendee" />}
                  </Stack>
                )}
                {'dueDate' in fields && 
                  <DatePicker
                    control={control}
                    name="dueDate"
                    defaultValue={fields.dueDate ?? ""}
                    disabled={!isActive}
                    label="Due Date"
                  />
                }
                {isActive && <Button type="submit">Save Fields</Button>}
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Notes ({ticket!.notes?.length ?? 0})</Typography>
            </AccordionSummary>
            <Box px={2} my={-1}>
              {(ticket!.notes?.length===0 || !ticket?.notes) && 
                <Typography variant='caption' color='text.disabled'>You have no notes on this ticket</Typography>
              }
            </Box>
            <AccordionDetails>
              {/* Newer features will enforce a boundary with either user.userType, user.subscription or both */}
              <List>
                {ticket!.notes?.map((note, idx) => (
                  <ListItem key={idx}>
                    <ListItemText 
                      primary={note.content} 
                      secondary={new Date(note.createdAt).toLocaleString()} 
                    />
                  </ListItem>
                ))}
              </List>
              {isActive && (
                <Stack gap={1}>
                  <TextField multiline value={newNote} onChange={(e) => 
                    setNewNote(e.target.value)} placeholder="Add note" 
                  />
                  <Button onClick={addNote}>Add Note</Button>
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>History ({ticket!.history?.length ?? 0})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {ticket!.history?.map((hist, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={hist.action}
                      secondary={`${hist.oldValue ? `From: ${hist.oldValue} ` : ''} 
                        To: ${hist.newValue ?? ''} - ${new Date(hist.createdAt).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
              {isActive && isTeamAdmin && (
                <Stack gap={1}>
                  <TextField value={newHistoryAction} onChange={(e) => 
                    setNewHistoryAction(e.target.value)} placeholder="Log action" 
                  />
                  <Button onClick={addHistory}>Log History</Button>
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>
        </form>
      </Box>
    </Drawer>
  );
}
