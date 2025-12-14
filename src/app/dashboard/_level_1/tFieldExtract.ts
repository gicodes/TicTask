import { Ticket } from '@/types/ticket';
import { TicketFormValuesUnion } from './tSchema';

export function extractTicketData(ticket: Ticket): TicketFormValuesUnion {
  const base = {
    type: ticket.type,
    title: ticket.title,
    description: ticket.description ?? '',
    priority: ticket.priority ?? undefined,
    tags: ticket.tags ?? [],
    amount: ticket.amount,
    currency: ticket.currency,
    startTime: ticket.startTime ?? undefined,
    endTime: ticket.endTime ?? undefined,
    dueDate: ticket.dueDate ?? undefined,
    client: ticket.client ?? undefined,
  };

  const data = ticket.data;

  switch (ticket.type) {
    case 'BUG':
      return {
        ...base,
        severity: data.severity ?? 'HIGH',
        steps: data.steps ?? '',
      };
    case 'FEATURE_REQUEST':
      return {
        ...base,
        impact: data.impact ?? 'MEDIUM',
      };
    case 'INVOICE':
      return {
        ...base,    
        extClient: data.extClient,
        recurrence: data.recurrence ?? '',
      };
    case 'TASK':
      return {
        ...base,
        checklist: data.checklist ?? [],
        subtasks: data.subtasks ?? [],
        estimatedTimeHours: data.estimatedTimeHours,
        attachments: data.attachments ?? [],
        recurrence: data.recurrence ?? '',
        startTime: ticket.startTime ?? undefined,
      };
    case 'EVENT':
      return {
        ...base,
        type: ticket.type,
        startTime: ticket.startTime ?? undefined,
        endTime: ticket.endTime ?? undefined,
        location: data.location ?? '',
        attendees: data.attendees ?? [],
      };
    default:
      return base;
  }
}

export const formatAmount = (value: number | string): string => {
  return Number(value).toLocaleString('en-US');
};

export const excludedTypes = [
  'task',
  'event',
  'meeting',
  'invoice',
  'ticket',
  'documentation',
  'feature_request',
];