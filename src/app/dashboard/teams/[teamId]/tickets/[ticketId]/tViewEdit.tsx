'use client'

import React, { useState } from 'react';
import { Ticket, TicketImpact, TicketPriority } from '@/types/ticket';
import { TICKET_TYPE_ICONS } from '@/app/dashboard/_level_1/tSchema';
import { extractTicketData } from '@/app/dashboard/_level_1/tFieldExtract';
import { getTypeColor, priorityColor } from '../../../../_level_1/tColorVariants';
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
import { TicketCheck, } from 'lucide-react';
import { Add as AddIcon } from '@mui/icons-material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EstimatedTimeField } from '@/app/dashboard/_level_1/estTimeHours';

export function TicketDetailPane({
  ticket,
  setTicket,
  editMode,
  teamMembers,
  userId,
}: {
  ticket: Ticket;
  setTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
  editMode: boolean;
  teamMembers: any[];
  userId: number;
}) {
  const TypeIcon = TICKET_TYPE_ICONS[ticket.type as keyof typeof TICKET_TYPE_ICONS] ?? <TicketCheck />;
  const fields = extractTicketData(ticket);
  const isEventOrMeeting = ticket.type === "EVENT" || ticket.type === "MEETING";

  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    setTicket((prev) => prev ? { ...prev, tags: [...(prev.tags || []), newTag.trim()] } : null);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTicket((prev) =>
      prev ? { ...prev, tags: prev.tags?.filter((t) => t !== tagToRemove) || [] } : null
    );
  };

  const updateField = <K extends keyof Ticket>(field: K, value: Ticket[K]) => {
    setTicket((prev) => (prev ? { ...prev, [field]: value } : null));
  };

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
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={ticket.priority || ''}
                label="Priority"
                onChange={(e) => updateField('priority', e.target.value as any)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="URGENT">Urgent</MenuItem>
              </Select>
            </FormControl>
          ) : (
            ticket.priority && (
              <Chip
                label={ticket.priority}
                size="medium"
                sx={{
                  bgcolor: priorityColor(ticket.priority),
                  color: '#fff',
                  fontWeight: 600,
                }}
              />
            )
          )}
        </Stack>

        {editMode ? (
          <TextField
            multiline
            fullWidth
            rows={5}
            value={ticket.description ?? ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Enter ticket description..."
            variant="outlined"
            sx={{ mb: 4 }}
          />
        ) : (
          <Typography variant="body1" whiteSpace="pre-wrap" sx={{ minHeight: 80, mb: 4 }}>
            {ticket.description || 'No description provided.'}
          </Typography>
        )}

        <Stack spacing={1} mb={4}>
          <Typography variant="subtitle2" fontWeight={600}> Assignees</Typography>

          {editMode ? (
            <Select
              multiple
              fullWidth
              value={ticket.assignees?.map((a) => a.id) ?? (ticket.assignedToId ? [ticket.assignedToId] : [])}
              onChange={(e) => {
                const ids = e.target.value as number[];
                setTicket((prev) =>
                  prev ? { ...prev, assignees: teamMembers.filter((m) => ids.includes(m.id)) } : null
                );
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as number[]).map((id) => {
                    const member = teamMembers.find((m) => m.id === id);
                    return <Chip key={id} label={member?.name ?? `User ${id}`} size="small" />;
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
          ) : (
            <Box display="flex" gap={1} flexWrap="wrap">
              {(() => {
                const list = ticket.assignees?.length ? ticket.assignees : ticket.assignedTo ? [ticket.assignedTo] : [];
                if (list.length === 0) return <Typography variant="caption"><i>Unassigned</i></Typography>;

                return list.map((a) => (
                  <Chip key={a.id ?? a.name} label={a.name ?? `User ${a.id}`} color={a.id === userId ? "primary" : "default"} />
                ));
              })()}
            </Box>
          )}
        </Stack>

        <Stack spacing={1} mb={4}>
          <Typography variant="subtitle2" fontWeight={600}> Tags </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ticket?.tags.length ? ticket.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={editMode ? () => handleRemoveTag(tag) : undefined}
              />
            )) : <i className='font-xxs'>{!editMode && "No tags added yet"}</i>}
            {editMode && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="New tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <IconButton size="small" onClick={handleAddTag} disabled={!newTag.trim()}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} flexWrap="wrap" mb={2}>
          {isEventOrMeeting && <FormControl sx={{ minWidth: 220 }}>
            <Typography variant="caption" gutterBottom> Start Time </Typography>
            {editMode ? (
              <DateTimePicker
                value={ticket.startTime ? new Date(ticket.startTime) : null}
                onChange={(date: Date | null) => updateField('startTime', date ? date.toISOString() : null)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            ) : (
              <Typography variant="body2">
                {ticket.startTime ? new Date(ticket.startTime).toLocaleString() : '—'}
              </Typography>
            )}
          </FormControl>}

          {isEventOrMeeting && <FormControl sx={{ minWidth: 220 }}>
            <Typography variant="caption" gutterBottom> End Time </Typography>
            {editMode ? (
              <DateTimePicker
                value={ticket.endTime ? new Date(ticket.endTime) : null}
                onChange={(date: Date | null) => updateField('endTime', date ? date.toISOString() : null)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            ) : (
              <Typography variant="body2">
                {ticket.endTime ? new Date(ticket.endTime).toLocaleString() : '—'}
              </Typography>
            )}
          </FormControl>}
        </Stack>

        <Stack spacing={3} mb={3}>
          {'severity' in fields && (
            <TextField
              label="Severity"
              size="small"
              value={fields.severity}
              onChange={(e) => {
                updateField('data', {
                  ...ticket.data,
                  severity: e.target.value as TicketPriority,
                });
              }}
              disabled={!editMode}
              fullWidth
            />
          )}
          {'impact' in fields && (
            <TextField
              label="Impact"
              size="small"
              value={fields.impact ?? ''}
              onChange={(e) => {
                updateField('data', {
                  ...ticket.data,
                  impact: e.target.value as TicketImpact,
                });
              }}
              disabled={!editMode}
              fullWidth
            />
          )}
          {ticket.type === "INVOICE" && 'amount' in fields && (
            <Stack direction="row" spacing={2}>
              <TextField
                label="Amount"
                type="number"
                size="small"
                value={fields.amount ?? ''}
                onChange={() => {}}
                disabled={!editMode}
                sx={{ flex: 1 }}
              />
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                  size="small"
                  value={fields.currency || 'USD'}
                  label="Currency"
                  disabled={!editMode}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="NGN">NGN</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
          {ticket.type === "TASK" && 'estimatedTimeHours' in fields && (
            <EstimatedTimeField
              estimatedHours={fields.estimatedTimeHours as number ?? null}
              editMode={editMode}
              onChange={(newHours: number | undefined) => {
                updateField('data', {
                  ...ticket.data,
                  estimatedTimeHours: newHours,
                });
              }}
            />
          )}
          {isEventOrMeeting &&'location' in fields && (
            <TextField
              label="Location"
              size="small"
              value={fields.location ?? ''}
              onChange={() => {}}
              disabled={!editMode}
              fullWidth
            />
          )}
          {ticket.type==="TASK" || ticket.type==="INVOICE" && 'recurrence' in fields && (
            <TextField
              label="Recurrence"
              size="small"
              value={fields.recurrence ?? ''}
              onChange={() => {}}
              disabled={!editMode}
              fullWidth
            />
          )}
        </Stack>

        <FormControl sx={{ minWidth: 180, maxWidth: 250, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={700}> Due Date </Typography>
          {editMode ? (
            <DatePicker
              value={ticket.dueDate ? new Date(ticket.dueDate) : null}
              onChange={(date: Date | null | null) => updateField('dueDate', date ? date.toISOString() : null)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          ) : (
            <Chip label={ticket.dueDate ? new Date(ticket.dueDate).toDateString() : '—'} size="medium" color='info' />
          )}
        </FormControl>

        <Stack spacing={1} sx={{ p: 2, bgcolor: 'var(--surface-1)'}}>
          <Typography variant="caption">
            Created by {ticket.createdById === userId ? <strong>you</strong> : ticket.createdBy?.name || ticket.createdById}{' '}
            on {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : 'unknown'}
          </Typography>

          {ticket.assignedToId && (
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
              Assigned to {ticket.assignedToId === userId ? <strong>you</strong> : ticket.assignedTo?.name || ticket.assignedToId}.
            </Typography>
          )}
        </Stack>
      </Card>
    </LocalizationProvider>
  );
}
