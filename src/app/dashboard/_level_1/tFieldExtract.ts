import { Ticket } from '@/types/ticket';
import { TicketFormValuesUnion } from './tSchema';

export function extractTicketData(ticket: Ticket): TicketFormValuesUnion {
  const base = {
    type: ticket.type,
    title: ticket.title,
    description: ticket.description ?? '',
    assigneesId: ticket.assigneesIds ?? undefined,
  };
  const base2 = {
    priority: ticket.priority ?? undefined,
    tags: ticket.tags ?? [],
    assignTo: ticket.assignTo ?? undefined,
    assignToId: ticket.assignedToId,
    dueDate: ticket.dueDate ?? undefined,
  };

  const data = ticket.data;

  switch (ticket.type) {
    case 'BUG':
      return {
        ...base,
        type: 'BUG',
        steps: data.steps ?? '',
        severity: data.severity ?? 'HIGH',
      };
    case 'FEATURE_REQUEST':
      return {
        ...base,
        type: 'FEATURE_REQUEST',
        impact: data.impact ?? 'MEDIUM',
      };
    case 'NOTE': 
      return {
        ...base,
        ...base2,
        type: 'NOTE',
        color: data.color ?? 'DEFAULT',
        isPinned: data.isPinned ?? false,
        attachments: data.attachments ?? []
      }
    case 'INVOICE':
      return {
        ...base,
        ...base2,
        type: 'INVOICE', 
        amount: ticket.amount!,
        currency: ticket.currency!,
        extClient: data.extClient,
        recurrence: data.recurrence ?? '',
      };
    case 'TASK':
      return {
        ...base,
        ...base2,
        subtasks: data?.subtasks ?? [],
        checklist: data?.checklist ?? [],
        recurrence: data?.recurrence ?? '',
        attachments: data?.attachments ?? [],
        startTime: ticket.endTime ?? undefined,
        estimatedTimeHours: data?.estimatedTimeHours,
      };
    case 'EVENT':
      return {
        ...base,
        ...base2,
        location: data?.location ?? '',
        attendees: data.attendees ?? [],
        endTime: ticket.endTime ?? undefined,
        startTime: ticket.startTime ?? undefined,
      };
    default: return { ...base, ...base2 };
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
  'feature_request',
];