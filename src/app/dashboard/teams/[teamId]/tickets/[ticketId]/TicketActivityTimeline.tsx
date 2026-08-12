'use client'

import { TicketActivityTimelineProps } from '@/types/tViewProps'
import { Box, Stack, Typography } from '@mui/material'

export function TicketActivityTimeline({ 
  ticket, 
  userId 
}: TicketActivityTimelineProps ) {
  return (
    <Stack
      spacing={0}
      sx={{
        py: 1,
        px: 1,
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'rgba(0,0,0,0.1))',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          gap: 1.5,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'rgba(99, 102, 241, 0.06)',
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'rgb(99, 102, 241)',
            flexShrink: 0,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2">
            <strong>Created</strong> by{' '}
            {ticket.createdById === userId ? (
              <strong>you</strong>
            ) : (
              ticket.createdBy?.name || ticket.createdById
            )}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          {ticket.createdAt
            ? new Date(ticket.createdAt).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : 'unknown'}
        </Typography>
      </Box>

      {ticket.assignedToId && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            bgcolor: 'rgba(14, 165, 233, 0.06)',
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'rgb(14, 165, 233)',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2">
              <strong>Assigned</strong> to{' '}
              {ticket.assignedToId === userId ? (
                <strong>you</strong>
              ) : (
                ticket.assignedTo?.name || ticket.assignedToId
              )}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : 'unknown'}
          </Typography>
        </Box>
      )}

      {ticket.startedAt && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            bgcolor: 'rgba(245, 158, 11, 0.07)',
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'rgb(245, 158, 11)',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2">
              <strong>Started</strong> by{' '}
              {ticket.startedById === userId ? (
                <strong>you</strong>
              ) : (
                ticket.startedBy?.name || ticket.startedById
              )}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {new Date(ticket.startedAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </Typography>
        </Box>
      )}

      {ticket.closedAt && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            bgcolor: 'rgba(34, 197, 94, 0.07)',
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'rgb(34, 197, 94)',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2">
              <strong>Closed</strong> by{' '}
              {ticket.closedById === userId ? (
                <strong>you</strong>
              ) : (
                ticket.closedBy?.name || ticket.closedById
              )}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {new Date(ticket.closedAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </Typography>
        </Box>
      )}
    </Stack>
  )
}