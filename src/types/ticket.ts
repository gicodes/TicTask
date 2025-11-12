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
  type: Ticket_Type;
  priority: Ticket_Priority;
}

export interface Create_Ticket {
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
  type: Ticket_Type;
  priority: Ticket_Priority;
}

export interface CreateTicket {
  type: Ticket_Type;
  title: string;
  description?: string;
  tags?: string[] | null;
  priority: Ticket_Priority;  
  assignTo?: string | number | unknown;
  dueDate: Date | string | undefined;
  createdById?: string | number;
}

export enum Ticket_Type {
  GENERAL = 'GENERAL',
  INVOICE = 'INVOICE',
  ISSUE = 'ISSUE',
  TASK = "TASK",
  BUG = 'BUG',
  TEST = 'TEST',
  EVENT = 'EVENT',
  DESIGN = 'DESIGN',
  MEETING = 'MEETING',
  RELEASE = 'RELEASE',
  SUPPORT = 'SUPPORT',
  RESEARCH = 'RESEARCH',
  SECURITY = 'SECURITY',
  DEPLOYMENT = 'DEPLOYMENT',
  FEATURE = 'FEATURE_REQUEST',
  PERFORMANCE = 'PERFORMANCE',
  MAINTENANCE = 'MAINTENANCE',
  OPTIMIZATION = 'OPTIMIZATION',
  DOCUMENTATION = 'DOCUMENTATION',
  TICKET = 'TICKET'
}

export enum Ticket_Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'UPCOMING'|'OPEN'|'IN_PROGRESS'|'RESOLVED'|'CLOSED'|'CANCELLED';
export type TicketType = 'GENERAL'|'BUG'|'FEATURE_REQUEST'|'SUPPORT'|'EVENT' | 'TASK' | 'ISSUE' | 'INVOICE';

export interface BoardProps {
  grouped: Record<string, Ticket[]>;
  setGrouped: React.Dispatch<React.SetStateAction<Record<string, Ticket[]>>>;
  openDetail: (id: string | number) => void;
  isSearching?: boolean 
}