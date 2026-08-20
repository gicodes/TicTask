'use client'

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  ToggleButton,
} from '@mui/material';
import { Add as AddIcon, PushPin, PushPinOutlined } from '@mui/icons-material';
import { Button as AppButton } from '@/assets/buttons';
import { TicketImpact, TicketSeverity } from '@/types/ticket';
import { TeamTicketSpecificTypeProps } from '@/types/teamViewProps';
import { RichTextViewer } from '@/app/dashboard/_level_1/richTextViewer';
import { EstimatedTimeField } from '@/app/dashboard/_level_1/estTimeHours';
import { LightweightRichEditor } from '@/app/dashboard/_level_1/richTextEditior';
import { NotesFormValues } from '@/app/dashboard/_level_1/tSchema';
import { useFormContext } from 'react-hook-form';

const SEVERITY_OPTIONS = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const
const IMPACT_OPTIONS = ['HIGH', 'MEDIUM', 'LOW'] as const

export function TicketTypeSpecificFields({
  ticket,
  fields,
  editMode,
  updateField,
}: TeamTicketSpecificTypeProps) {
  const { setValue, watch } = useFormContext<NotesFormValues>();
  
  const isPinned = ticket.data.isPinned ?? watch('isPinned');
  const [newChecklistItem, setNewChecklistItem] = useState('')
  const [newSubtask, setNewSubtask] = useState('');
  const [newAttendee, setNewAttendee] = useState('');
  const [amountInput, setAmountInput] = useState(ticket.amount != null ? String(ticket.amount) : '' )

  const updateData = (partial: Record<string, any>) => {
    updateField('data', { ...ticket.data, ...partial })
  }

  return (
    <Stack spacing={2.5} mb={3}>
      {'isPinned' in fields && 
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ToggleButton
            value="pin"
            selected={isPinned}
            onChange={() =>
              setValue('isPinned', !isPinned, {
                shouldDirty: true,
              })
            }
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              gap: 1,
              px: 2,
            }}
          >
            {isPinned ? (
              <PushPin fontSize="small" />
            ) : (
              <PushPinOutlined fontSize="small" />
            )}

            {isPinned ? 'Pinned' : 'Pin note'}
          </ToggleButton>
        </Box>
      }
      
      {'steps' in fields && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>
            Steps to reproduce
          </Typography>
          <Box
            sx={{
              borderRadius: 2.5,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: editMode ? 'divider' : 'transparent',
            }}
          >
            {editMode ? (
              <LightweightRichEditor
                value={ticket.data?.steps ?? ''}
                onChange={(value) => updateData({ steps: value })}
                placeholder="Write your Steps here..."
              />
            ) : (
              <RichTextViewer html={ticket.data?.steps} />
            )}
          </Box>
        </Box>
      )}

      {('severity' in fields || 'impact' in fields) && (
        <Box
          sx={{
            gap: 1.5,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          {'severity' in fields && (
            <Box
              sx={{
                borderRadius: '50%',
                bgcolor: 'rgba(239, 68, 68, 0.045)',
                width: 100,
                height: 100,
                textAlign: 'center',
                alignContent: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Severity
              </Typography>
              {editMode ? (
                <FormControl size="small" fullWidth sx={{ mt: 0.75 }}>
                  <Select
                    value={fields.severity ?? ''}
                    displayEmpty
                    onChange={(e) =>
                      updateData({ severity: e.target.value as TicketSeverity })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {SEVERITY_OPTIONS.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body2" fontWeight={600} sx={{ mt: 0.75 }}>
                  {fields.severity
                    ? String(fields.severity).charAt(0) +
                      String(fields.severity).slice(1).toLowerCase()
                    : '—'}
                </Typography>
              )}
            </Box>
          )}

          {'impact' in fields && (
            <Box
              sx={{
                borderRadius: '50%',
                bgcolor: 'rgba(239, 68, 68, 0.045)',
                width: 100,
                height: 100,
                textAlign: 'center',
                alignContent: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Impact
              </Typography>
              {editMode ? (
                <FormControl size="small" fullWidth sx={{ mt: 0.75 }}>
                  <Select
                    value={fields.impact ?? ''}
                    displayEmpty
                    onChange={(e) =>
                      updateData({ impact: e.target.value as TicketImpact })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {IMPACT_OPTIONS.map((i) => (
                      <MenuItem key={i} value={i}>
                        {i.charAt(0) + i.slice(1).toLowerCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body2" fontWeight={600} sx={{ mt: 0.75 }}>
                  {fields.impact
                    ? String(fields.impact).charAt(0) +
                      String(fields.impact).slice(1).toLowerCase()
                    : '—'}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}

      {ticket.type === 'INVOICE' &&
        ('amount' in fields || 'extClient' in fields) && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.05)',
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
              display="block"
              mb={1.25}
            >
              Invoice details
            </Typography>
            
            {'amount' in fields && (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                mb={'extClient' in fields ? 1.5 : 0}
              >
                <TextField 
                  label="Amount" 
                  type="number" 
                  size="small" 
                  fullWidth 
                  value={amountInput} 
                  onChange={(e) => { 
                    const raw = e.target.value;
                    setAmountInput(raw);
                    if (raw === '') { 
                      updateField('amount', null ) 
                      return 
                    } 
                    const parsed = Number(raw);
                    if (!Number.isNaN(parsed)) { 
                      updateField('amount', parsed) 
                    }
                  }} 
                  onBlur={() => { 
                    if (amountInput === '') { 
                      updateData({ amount: null }) 
                      return 
                    } 
                    const parsed = Number(amountInput) 
                    if (!Number.isNaN(parsed)) { 
                      setAmountInput(String(parsed)) 
                      updateField('amount', parsed) 
                    } 
                  }} 
                  disabled={!editMode} 
                  sx={{ flex: 1 }} 
                  slotProps={{ 
                    htmlInput: { min: 0, step: '0.01', 
                    inputMode: 'decimal', }, 
                  }} 
                />

                <FormControl
                  size="small"
                  sx={{
                    minWidth: { xs: '100%', sm: 130 },
                  }}
                >
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={fields.currency ?? 'USD'} 
                    label="Currency" 
                    disabled={!editMode} 
                    onChange={(e) => { 
                      updateField('currency', e.target.value) 
                    }} 
                  >
                    <MenuItem value="USD">USD — US Dollar</MenuItem>
                    <MenuItem value="NGN">NGN — Nigerian Naira</MenuItem>
                    <MenuItem value="EUR">EUR — Euro</MenuItem>
                    <MenuItem value="GBP">GBP — British Pound</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )}

            {'extClient' in fields && (
              <TextField
                label="Recipient E-mail"
                size="small"
                fullWidth
                value={fields.extClient ?? ''}
                onChange={(e) => updateData({ extClient: e.target.value })}
                disabled={!editMode}
              />
            )}
          </Box>
        )}

      {(ticket.type === 'INVOICE' || ticket.type === 'TASK') &&
        'recurrence' in fields && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Recurrence
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={fields.recurrence ?? ''}
              onChange={(e) => updateData({ recurrence: e.target.value })}
              disabled={!editMode}
              sx={{ mt: 0.75 }}
              placeholder="e.g. weekly, monthly..."
            />
          </Box>
        )}

      {ticket.type === 'TASK' && 'estimatedTimeHours' in fields && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: '1px solid',
            borderColor: 'rgba(99, 102, 241, 0.14)',
            bgcolor: 'rgba(99, 102, 241, 0.04)',
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            display="block"
            mb={0.75}
          >
            Estimated effort
          </Typography>
          <EstimatedTimeField
            estimatedHours={(fields.estimatedTimeHours as number) ?? null}
            editMode={editMode}
            onChange={(newHours: number | undefined) =>
              updateData({ estimatedTimeHours: newHours })
            }
          />
        </Box>
      )}

      {ticket.type === 'TASK' && 'checklist' in fields && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Checklist
          </Typography>

          {fields.checklist?.length ? (
            <Stack spacing={0.5}>
              {(fields.checklist as any[]).map((item: any, idx: number) => {
                const label = typeof item === 'string' ? item : item?.text ?? item?.title ?? ''
                const done = typeof item === 'object' ? !!item.done : false

                return (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1.5,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Switch
                      size="small"
                      checked={done}
                      disabled={!editMode}
                      onChange={() => {
                        const next = [...(fields.checklist as any[])]
                        next[idx] =
                          typeof item === 'string'
                            ? { text: item, done: !done }
                            : { ...item, done: !done }
                        updateData({ checklist: next })
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: done ? 'line-through' : 'none',
                        color: done ? 'text.disabled' : 'text.primary',
                        flex: 1,
                      }}
                    >
                      {label}
                    </Typography>
                    {editMode && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          const next = (fields.checklist as any[]).filter(
                            (_: any, i: number) => i !== idx
                          )
                          updateData({ checklist: next })
                        }}
                      >
                        ×
                      </IconButton>
                    )}
                  </Box>
                )
              })}
            </Stack>
          ) : (
            <Typography variant="caption" color="text.disabled" fontStyle="italic">
              No checklist items yet
            </Typography>
          )}

          {editMode && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Add checklist item"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newChecklistItem.trim()) {
                    e.preventDefault()
                    const next = [
                      ...(fields.checklist as any[] || []),
                      { text: newChecklistItem.trim(), done: false },
                    ]
                    updateData({ checklist: next })
                    setNewChecklistItem('')
                  }
                }}
              />
              <IconButton
                size="small"
                disabled={!newChecklistItem.trim()}
                onClick={() => {
                  const next = [
                    ...(fields.checklist as any[] || []),
                    { text: newChecklistItem.trim(), done: false },
                  ]
                  updateData({ checklist: next })
                  setNewChecklistItem('')
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      )}

      {(ticket.type === 'EVENT' || ticket.type === 'MEETING') &&
        'location' in fields && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Location
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={fields.location ?? ''}
              onChange={(e) => updateData({ location: e.target.value })}
              disabled={!editMode}
              sx={{ mt: 0.75 }}
              placeholder="Meeting room, Zoom link, address..."
            />
          </Box>
        )}

      {(ticket.type === 'TASK' || ticket.type === 'NOTE') &&
        'attachments' in fields && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.05)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                Attachments
              </Typography>
              {fields.attachments?.length ? (
                <Typography variant="caption" color="text.secondary">
                  {fields.attachments.length}{' '}
                  {fields.attachments.length === 1 ? 'file' : 'files'}
                </Typography>
              ) : null}
            </Box>

            {fields.attachments?.length ? (
              <Stack spacing={0.75}>
                {(fields.attachments as string[]).map((url, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: 0,
                      px: 1.25,
                      py: 0.75,
                      borderRadius: 1.5,
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Typography variant="body2" noWrap sx={{ minWidth: 0, flex: 1 }}>
                      {url}
                    </Typography>
                    {editMode && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          const next = (fields.attachments as string[]).filter(
                            (_: string, i: number) => i !== idx
                          )
                          updateData({ attachments: next })
                        }}
                      >
                        ×
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="caption" color="text.disabled" fontStyle="italic">
                No attachments &nbsp;
              </Typography>
            )}

            {editMode && (
              <AppButton variant="text" size="small" sx={{ margin: '10px 0' }}>
                Upload attachment
              </AppButton>
            )}
          </Box>
        )}

      {ticket.type === 'TASK' && 'subtasks' in fields && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Subtasks
          </Typography>

          {fields.subtasks?.length ? (
            <List
              disablePadding
              sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
            >
              {(fields.subtasks as any[]).map((sub, idx) => (
                <ListItem
                  key={idx}
                  disableGutters
                  sx={{
                    px: 1,
                    py: 0.75,
                    borderRadius: 1.5,
                    bgcolor: 'action.hover',
                  }}
                  secondaryAction={
                    editMode ? (
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => {
                          const next = (fields.subtasks as any[]).filter(
                            (_: any, i: number) => i !== idx
                          )
                          updateData({ subtasks: next })
                        }}
                      >
                        ×
                      </IconButton>
                    ) : null
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {sub.title ?? sub.name ?? 'Untitled'}
                      </Typography>
                    }
                    secondary={sub.done ? 'Completed' : 'Pending'}
                    slotProps={{
                      secondary: {
                        sx: { color: sub.done ? 'success.main' : 'text.secondary'},
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="caption" color="text.disabled" fontStyle="italic">
              No subtasks yet
            </Typography>
          )}

          {editMode && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Add subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newSubtask.trim()) {
                    e.preventDefault()
                    const next = [
                      ...(fields.subtasks as any[] || []),
                      { title: newSubtask.trim(), done: false },
                    ]
                    updateData({ subtasks: next })
                    setNewSubtask('')
                  }
                }}
              />
              <IconButton
                size="small"
                disabled={!newSubtask.trim()}
                onClick={() => {
                  const next = [
                    ...(fields.subtasks as any[] || []),
                    { title: newSubtask.trim(), done: false },
                  ]
                  updateData({ subtasks: next })
                  setNewSubtask('')
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      )}

      {['EVENT', 'MEETING'].includes(ticket.type) && 'attendees' in fields && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'rgba(0,0,0,0.05)',
          }}
        >
          <Box
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Attendees
            </Typography>
            {fields.attendees?.length ? (
              <Typography variant="caption" color="text.secondary">
                {fields.attendees.length}
              </Typography>
            ) : null }
          </Box>

          {!fields.attendees?.length ? (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              No attendees for this event
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {(fields.attendees as string[]).map((attendee, idx) => (
                <Chip
                  key={idx}
                  label={attendee}
                  size="small"
                  onDelete={ editMode
                    ? () => {
                        const next = (fields.attendees as string[]).filter(
                          (_: string, i: number) => i !== idx
                        )
                        updateData({ attendees: next })
                      }
                    : undefined
                  }
                  sx={{
                    maxWidth: '100%',
                    borderRadius: 1.5,
                    bgcolor: 'action.hover',
                  }}
                />
              ))}
            </Box>
          )}
          {editMode && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1.25 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Add attendee (email or name)"
                value={newAttendee}
                onChange={(e) => setNewAttendee(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newAttendee.trim()) {
                    e.preventDefault()
                    const next = [
                      ...(fields.attendees as string[] || []),
                      newAttendee.trim(),
                    ]
                    updateData({ attendees: next })
                    setNewAttendee('')
                  }
                }}
              />
              <IconButton
                size="small"
                disabled={!newAttendee.trim()}
                onClick={() => {
                  const next = [
                    ...(fields.attendees as string[] || []),
                    newAttendee.trim(),
                  ]
                  updateData({ attendees: next })
                  setNewAttendee('')
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </Stack>
  )
}