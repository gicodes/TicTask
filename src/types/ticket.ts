export interface Ticket {
  id: number | string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string | Date | null;
  assignee?: string;
  createdById?: string | number;
  assignedToId?: string | number | null;
  tags?: string[] | null;
  dueDate?: Date | string | null;
  status: TicketStatus;
  type: TicketType;
  priority: TicketPriority;
}

export interface CreateTicket {
  title: string;
  description?: string;
  assignTo?: string | number | unknown;
  tags?: string[] | null;
  dueDate: Date | string;
  type: TicketType;
  priority: TicketPriority;
}

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'UPCOMING'|'OPEN'|'IN_PROGRESS'|'RESOLVED'|'CLOSED'|'CANCELLED';
export type TicketType = 'GENERAL'|'BUG'|'FEATURE_REQUEST'|'SUPPORT'|'EVENT';