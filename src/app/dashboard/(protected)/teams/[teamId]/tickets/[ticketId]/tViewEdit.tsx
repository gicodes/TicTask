'use client'

import React, { useState } from 'react';
import { Ticket } from '@/types/ticket';
import { TICKET_TYPE_ICONS } from '@/app/dashboard/_level_1/tSchema';
import { extractTicketData } from '@/app/dashboard/_level_1/tFieldExtract';
import { getTypeColor, priorityColor } from '../../../../../_level_1/tColorVariants';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Chip,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { TicketCheck, Plus } from 'lucide-react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TeamTicketViewProps } from '@/types/teamViewProps';
import { TicketActivityTimeline } from './TicketActivityTimeline';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TicketTypeSpecificFields } from './TicketTypeSpecificField';
import { RichTextViewer } from '@/app/dashboard/_level_1/richTextViewer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LightweightRichEditor } from '@/app/dashboard/_level_1/richTextEditior';

export function TicketDetailPane({
  ticket,
  setTicket,
  editMode,
  teamMembers,
  userId,
}: TeamTicketViewProps) {
  const fields = extractTicketData(ticket)
  const isEventOrMeeting = ticket.type === 'EVENT' || ticket.type === 'MEETING'
  const [newTag, setNewTag] = useState('')
  const TypeIcon = TICKET_TYPE_ICONS[ticket.type as keyof typeof TICKET_TYPE_ICONS] ?? <TicketCheck />;

  const handleAddTag = () => {
    if (!newTag.trim()) return
    setTicket((prev) =>
      prev ? { ...prev, tags: [...(prev.tags || []), newTag.trim()] } : null
    )
    setNewTag('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTicket((prev) => prev ? { ...prev, tags: prev.tags?.filter(
      (t) => t !== tagToRemove) || [] } : null
    )
  }

  const updateField = <K extends keyof Ticket>(field: K, value: Ticket[K]) => {
    setTicket((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="subtitle1"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: getTypeColor(ticket.type),
              fontWeight: 600,
            }}
          >
            <TypeIcon /> {ticket.type.replace('_', ' ')}
          </Typography>

          {editMode ? (
            <FormControl size="small" sx={{ width: { xs: 140, sm: 160 }, flexShrink: 0 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={ticket.priority || ''}
                label="Priority"
                onChange={(e) => updateField('priority', e.target.value as any)}
              >
                <MenuItem value="">None</MenuItem>
                {['LOW', 'MEDIUM', 'HIGH', 'URGENT'].map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority.charAt(0) + priority.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ticket.priority && (
              <Box
                sx={{
                  width: { xs: 100, sm: 120 },
                  minHeight: 40,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: `${priorityColor(ticket.priority)}33`,
                  bgcolor: `${priorityColor(ticket.priority)}0D`,
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: priorityColor(ticket.priority),
                    flexShrink: 0,
                    boxShadow: `0 0 0 3px ${priorityColor(ticket.priority)}18`,
                  }}
                />
                <Box sx={{ minWidth: 0, display: 'grid' }}>
                  <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.1}>
                    Priority
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    lineHeight={1.35}
                    noWrap
                    sx={{ color: priorityColor(ticket.priority) }}
                  >
                    {ticket.priority.charAt(0) + ticket.priority.slice(1).toLowerCase()}
                  </Typography>
                </Box>
              </Box>
            )
          )}
        </Stack>

        <Box
          my={3}
          sx={{
            position: 'relative',
            borderRadius: 2,
            transition: 'all 0.2s ease',
            ...(editMode && {
              p: 2,
              border: '1px solid',
              borderColor: 'primary.main',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(25, 118, 210, 0.06)'
                  : 'rgba(25, 118, 210, 0.04)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 0 0 1px rgba(25, 118, 210, 0.3), 0 0 16px rgba(25, 118, 210, 0.15)'
                  : '0 0 0 1px rgba(25, 118, 210, 0.2), 0 0 12px rgba(25, 118, 210, 0.12)',
            }),
          }}
        >
          {editMode ? (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <LightweightRichEditor
                value={ticket.description ?? ''}
                onChange={(value) => updateField('description', value)}
                placeholder="Write your description here..."
              />
            </Box>
          ) : (
            <RichTextViewer html={ticket.description} />
          )}
        </Box>

        <Stack spacing={1} mb={4}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            People on this ticket
          </Typography>

          {editMode ? (
            <Select
              multiple
              fullWidth
              displayEmpty
              value={
                ticket.assignees?.map((a) => a.id) ??
                (ticket.assignedToId ? [ticket.assignedToId] : [])
              }
              onChange={(e) => {
                const ids = e.target.value as number[]
                setTicket((prev) => prev ? { ...prev, assignees: teamMembers.
                  filter((m) => ids.includes(m.id))}
                  : null
                )
              }}
              renderValue={(selected: number[]) => {
                if (selected.length === 0) {
                  return (
                    <Typography color="text.secondary" fontSize={12.5}>
                      Click the dropdown to see teammates
                    </Typography>
                  )
                }
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const member = teamMembers.find((m) => m.id === id)
                      return (
                        <Chip key={id} label={member?.name ?? `User ${id}`} size="small" />
                      )
                    })}
                  </Box>
                )
              }}
            >
              {teamMembers.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            (() => {
              const list = ticket.assignees?.length
                ? ticket.assignees
                : ticket.assignedTo
                  ? [ticket.assignedTo]
                  : []

              if (list.length === 0) {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      px: 2,
                      py: 1.5,
                      borderRadius: 2.5,
                      border: '1px dashed',
                      borderColor: 'divider',
                      bgcolor: 'rgba(0,0,0,0.05)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'action.hover',
                        color: 'text.disabled',
                      }}
                    >
                      —
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        No one assigned
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        This ticket is currently unassigned
                      </Typography>
                    </Box>
                  </Box>
                )
              }

              return (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: list.length > 1 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
                    },
                    gap: 1,
                  }}
                >
                  {list.map((a) => {
                    const isCurrentUser = a.id === userId
                    const name = a.name ?? `User ${a.id}`

                    return (
                      <Box
                        key={a.id ?? a.name}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.25,
                          px: 1.5,
                          py: 1.25,
                          borderRadius: 2.5,
                          border: '1px solid',
                          borderColor: isCurrentUser ? 'rgba(99, 102, 241, 0.22)' : 'divider',
                          bgcolor: isCurrentUser
                            ? 'rgba(99, 102, 241, 0.055)'
                            : 'rgba(0,0,0,0.05)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                            bgcolor: isCurrentUser ? 'primary.main' : 'divider',
                            color: isCurrentUser ? 'primary.contrastText' : 'text.secondary',
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {name
                            .split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()}
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="body2" fontWeight={600} noWrap>
                            {name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={isCurrentUser ? 'primary.main' : 'text.secondary'}
                            noWrap
                          >
                            {isCurrentUser ? 'You' : 'Assigned teammate'}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              )
            })()
          )}
        </Stack>

        <Stack spacing={1.25} mb={4}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
            Tags
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 0.75,
              minHeight: 42,
              px: 1.5,
              py: 1,
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: editMode ? 'divider' : 'transparent',
              bgcolor: editMode ? 'rgba(0,0,0,0.05)' : 'transparent',
            }}
          >
            {ticket?.tags?.length ? (
              ticket.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={editMode ? () => handleRemoveTag(tag) : undefined}
                  sx={{
                    borderRadius: 1.5,
                    bgcolor: 'rgba(0,0,0,0.05)',
                    fontWeight: 500,
                  }}
                />
              ))
            ) : (
              !editMode && (
                <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                  No tags added yet
                </Typography>
              )
            )}

            {editMode && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 0.25 }}>
                <TextField
                  size="small"
                  placeholder="New tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  sx={{
                    width: { xs: 120, sm: 150 },
                    '& .MuiOutlinedInput-root': { borderRadius: 1.75 },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                  sx={{
                    bgcolor: 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                >
                  <Plus fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Stack>

        {isEventOrMeeting && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              gap: 1.5,
              mb: 4,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'rgba(99, 102, 241, 0.16)',
                bgcolor: 'rgba(99, 102, 241, 0.045)',
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Starts
              </Typography>
              {editMode ? (
                <DateTimePicker
                  value={ticket.startTime ? new Date(ticket.startTime) : null}
                  onChange={(date: Date | null) =>
                    updateField('startTime', date ? date.toISOString() : null)
                  }
                  slotProps={{
                    textField: { size: 'small', fullWidth: true, sx: { mt: 1 } },
                  }}
                />
              ) : (
                <Typography variant="body2" fontWeight={600} sx={{ mt: 0.75 }}>
                  {ticket.startTime
                    ? new Date(ticket.startTime).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : 'Not scheduled'}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'rgba(14, 165, 233, 0.16)',
                bgcolor: 'rgba(14, 165, 233, 0.045)',
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Ends
              </Typography>
              {editMode ? (
                <DateTimePicker
                  value={ticket.endTime ? new Date(ticket.endTime) : null}
                  onChange={(date: Date | null) =>
                    updateField('endTime', date ? date.toISOString() : null)
                  }
                  slotProps={{
                    textField: { size: 'small', fullWidth: true, sx: { mt: 1 } },
                  }}
                />
              ) : (
                <Typography variant="body2" fontWeight={600} sx={{ mt: 0.75 }}>
                  {ticket.endTime
                    ? new Date(ticket.endTime).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : 'Not scheduled'}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        <TicketTypeSpecificFields
          ticket={ticket}
          fields={fields}
          editMode={editMode}
          updateField={updateField}
          setTicket={setTicket}
        />

        <FormControl
          sx={{
            display: 'flex',
            justifySelf: 'right',
            width: '100%',
            maxWidth: { xs: '100%', sm: 280 },
            mb: 2,
          }}
        >
          {editMode ? (
            <DateTimePicker
              value={ticket.dueDate ? new Date(ticket.dueDate) : null}
              onChange={(date) => updateField('dueDate', date ? date.toISOString() : null)}
              slotProps={{ textField: { size: 'small', fullWidth: true },}}
            />
          ) : (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                minHeight: 68,
                px: 2,
                py: 1.25,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: ticket.dueDate ? 'rgba(99, 102, 241, 0.18)' : 'divider',
                bgcolor: ticket.dueDate ? 'rgba(99, 102, 241, 0.045)' : 'rgba(0,0,0,0.09)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  bgcolor: ticket.dueDate ? 'rgb(99, 102, 241)' : 'text.disabled',
                }}
              />
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
                  bgcolor: ticket.dueDate ? 'rgba(99, 102, 241, 0.10)' : 'action.hover',
                  color: ticket.dueDate ? 'rgb(99, 102, 241)' : 'text.secondary',
                  flexShrink: 0,
                  fontSize: 18,
                }}
              >
                📅
              </Box>
              {ticket.dueDate ? (
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {new Date(ticket.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {new Date(ticket.dueDate).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body2" fontWeight={500} color="text.secondary">
                    No due date
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Not scheduled
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </FormControl>

        <TicketActivityTimeline ticket={ticket} userId={userId} />
      </Card>
    </LocalizationProvider>
  )
}