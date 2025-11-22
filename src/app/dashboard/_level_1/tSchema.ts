import { Ticket_Type, Ticket_Priority, Ticket } from '@/types/ticket';
import { z } from 'zod';

export const schema = z.object({
  type: z.nativeEnum(Ticket_Type),
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.nativeEnum(Ticket_Priority),
  assignTo: z.union([z.string(), z.number()]).optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.union([z.string(), z.date()]).optional(),
});

export interface TICKET_FORM_TYPES {
  open: boolean;
  onClose: () => void;
  onCreated?: (t: Ticket | void) => Ticket | void;
  task?: boolean;
  defaultDueDate?: Date;
}

export interface TICKET_DRAWER_TYPES { 
  open: boolean; 
  onClose: () => void; 
  onUpdate?: () => void;
  ticketId?: string | number | null; 
}