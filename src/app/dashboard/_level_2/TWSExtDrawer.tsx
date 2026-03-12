'use client';

import { Create_Ticket, Ticket, Ticket_Impact, Ticket_Severity, TicketHistory, TicketNote } from '@/types/ticket';
import { TICKET_WORKSPACE_PROPS, TicketFormValuesUnion } from '../_level_1/tSchema';
import { excludedTypes, extractTicketData } from '../_level_1/tFieldExtract';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { DatePicker } from '../_level_1/tDateControl';
import { useTickets } from '@/providers/tickets';
import { useAlert } from '@/providers/alert';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/auth';
import { Button } from '@/assets/buttons';
import { User } from '@/types/users';
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
  MenuItem,
  Avatar,
  Alert,
} from '@mui/material';
import { CloseSharp, ExpandMore } from '@mui/icons-material';
import { LightweightRichEditor } from '../_level_1/richTextEditior';

export default function TWSExtDrawer({ 
  open, 
  onClose, 
  ticket, 
  onUpdate 
}: TICKET_WORKSPACE_PROPS ) {  
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { updateTicket, addTicketComment, fetchTicketNote, fetchTicketHistory, addTicketHistory } = useTickets();
  
  const fields = extractTicketData(ticket!);
  const [ newNote, setNewNote ] = useState('');
  const [ isUpdating, setIsUpdating ] = useState(false);
  const [ ticketNotes, setTicketNotes ] = useState<TicketNote[] | null>();
  const { control, handleSubmit, reset } = useForm<TicketFormValuesUnion>({ defaultValues: fields });

  useEffect(() => {
    if (!ticket) return;

    const setNotes = async () => {
      const notes = await fetchTicketNote(ticket.id)
      setTicketNotes(notes);
    }
    
    setNotes();
  }, [ticket, setTicketNotes])

  const isActive = !['CANCELLED', 'RESOLVED', 'CLOSED'].includes(ticket!.status);
  const isTeamAdmin = !!(user as User).teamMemberships && !!(user as User).createdTeams;

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsUpdating(true);

      const dueDateIso = (data?.dueDate) === 'string' && data.dueDate
        ? new Date(data.dueDate as string) : typeof data.startTime === 'string' && data.startTime
          ? new Date(data.startTime as string) : undefined;
      const startTimeDate = typeof data.startTime === 'string' && data.startTime
        ? new Date(data.startTime as string) : undefined;
      const endTimeDate = typeof data.endTime === 'string' && data.endTime
        ? new Date(data.endTime as string) : undefined;
      const payload: FieldValues | TicketFormValuesUnion = {
        ...data,
        dueDate: dueDateIso,
        startTime: startTimeDate,
        endTime: endTimeDate,
        createdById: user?.id ?? null,
      } as unknown as Partial<Create_Ticket>;
          
      await updateTicket(Number(ticket!.id), payload as Partial<Ticket>);
      showAlert("Ticket updated!", 'success');

      onUpdate?.();
      setIsUpdating(false)
      reset(payload);
      onClose();
    } catch {
      showAlert("Failed to update!", 'warning');
    }
  };

  const addNote = async () => {
    if (!newNote) return;

    try {
      setIsUpdating(true);
      await addTicketComment(Number(ticket!.id), newNote);
    
      setNewNote('');
      setIsUpdating(false);
      showAlert("Comment posted!", 'success');

      window.location.reload();
    } catch {
      showAlert("Update failed. Something went wrong!", 'warning')
      setIsUpdating(false);
    }
  };

  const shouldAppendTicket = !excludedTypes.some(keyword => ticket?.type?.toLowerCase().includes(keyword));

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{'& .MuiDrawer-paper': { width: { xs: '100%', md: 600, lg: 669 }} }}
    >
      <Toolbar />
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack display={'flex'} direction={'row'} alignItems={'center'} flexWrap={'wrap'} py={1} pl={3}>
          <Typography flexGrow={1} variant='body2' color='text.disabled'>
            Extended Workspace 
          </Typography>
          <IconButton>➣ </IconButton>
          <Chip label={ticket!.title} />
        </Stack>
        <IconButton onClick={onClose} sx={{ height: 'fit-content'}}>
          <CloseSharp />
        </IconButton>
      </Box>

      <Divider />
      { isUpdating ? <Typography textAlign={'center'} py={6}> Updating.... </Typography> :
        <Box py={2} px={{ xs: 1, md: 2 }} display="grid" gap={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Alert severity="warning" color="warning" sx={{ opacity: 0.75, mb: 2 }}>
                Modifying this{' '}<strong>{ticket?.type === 'FEATURE_REQUEST' ? 'feature' : ticket?.type?.toLowerCase()}</strong>
                {shouldAppendTicket ? ' ticket' : ''} will irreversibly update the details!
              </Alert>

              <Controller
                name="title"
                control={control}
                render={({ field }) => 
                  <TextField label="Title" required {...field} />}
              />
              <Controller
                name={ticket?.type==="BUG" ? "steps" : "description"}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {ticket?.type==="BUG" ? "Steps" : "Description"}
                    </Typography>
        
                    <LightweightRichEditor
                      value={value ?? ''}
                      onChange={onChange}
                      placeholder={`Write your ${ticket?.type==="BUG" ? "steps" : "description"} here...`}
                    />
        
                    {fieldState.error && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5 }}
                      >
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Stack>
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
                      defaultValue={fields.severity ?? Ticket_Severity.HIGH}
                      render={({ field }) => (
                        <TextField label="Severity" select disabled={!isActive} {...field}>
                          {Object.values(Ticket_Severity).map((sev) => (
                            <MenuItem key={sev} value={sev}>
                              {sev}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  )}
                  {ticket!.type === 'FEATURE_REQUEST' && 'impact' in fields && (
                    <Controller
                      name="impact"
                      control={control}
                      defaultValue={fields.impact ?? Ticket_Impact.MEDIUM}
                      render={({ field }) => (
                        <TextField label="Impact" select disabled={!isActive}{...field}>
                          {Object.values(Ticket_Impact).map((impact) => (
                            <MenuItem key={impact} value={impact}>
                              {impact}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  )}
                  {ticket!.type === 'INVOICE' && 'amount' in fields && (
                    <Controller name="amount" control={control} render={({ field }) => 
                      <TextField label="Amount" type="number" disabled={!isActive} {...field} />} />
                  )}
                  {ticket!.type === 'INVOICE' && 'currency' in fields && (
                    <Controller name="currency" control={control} render={({ field }) => 
                      <TextField label="Currency" disabled={!isActive} {...field} />} />
                  )}
                  {ticket!.type === 'INVOICE' && 'recurrence' in fields && (
                    <Controller name="recurrence" control={control} render={({ field }) => 
                      <TextField label="Recurrence" disabled={!isActive} {...field} />} />
                  )}
                  {ticket!.type === 'INVOICE' && 'extClient' in fields && (
                    <Controller name="extClient" control={control} render={({ field }) => 
                      <TextField label="Clients" disabled={!isActive} {...field} />} />
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
                      render={({ field }) => 
                        <TextField label="Estimated Hours" type="number" disabled={!isActive} {...field} />}
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
                      {!fields.attendees || fields.attendees.length < 1 && 
                        <Typography variant='body2' sx={{ opacity: 0.75}}>No attendees for this event</Typography>
                      }
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
                  {(ticket!.type !== 'EVENT') && (ticket!.type !== 'MEETING') && 'dueDate' in fields && fields.dueDate &&
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
                <Typography>Notes ({ticketNotes?.length ?? 0})</Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {!ticketNotes?.length && (
                  <Typography variant="caption" color="text.disabled">
                    No notes yet. Be the first to add one.
                  </Typography>
                )}
                <Stack spacing={2} py={1}>
                  {ticketNotes?.map((note, i) => (
                    <Box key={i} flexWrap={'wrap'} display={'flex'} gap={1}>
                      <Stack direction="row" spacing={1.5} alignItems={'center'} width={'100%'}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {note.author?.name?.[0] ?? "?"}
                        </Avatar>
                        <Stack alignItems="flex-start" minWidth={150}>
                          <Typography variant="body2" fontWeight={600}>
                            {note.author?.name ?? "Unknown"}
                          </Typography>
                          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                            {note.content}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack alignItems={'flex-end'} width={'100%'}>
                        <Typography variant="caption" maxWidth={150}>
                          {new Date(note.createdAt).toLocaleString()}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                {isActive && ( // still contemplating bordering add-comments feature with (Product TIERs) PBAC or RBAC
                  <Stack spacing={1.5} mt={3}>
                    <TextField
                      multiline
                      minRows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Write a comment…"
                      fullWidth
                    />
                    <Stack direction="row" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        onClick={addNote}
                        disabled={!newNote.trim()}
                      >
                        Add comment
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          </form>
        </Box>
      }
    </Drawer>
  );
}
