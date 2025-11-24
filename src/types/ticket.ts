export interface Ticket {
  id: number;
  title: string;
  createdAt: string;
  type: Ticket_Type;
  status: TicketStatus;
  priority: Ticket_Priority;

  description?: string;

  assignee?: string;
  createdById?: number;
  assignedToId?: number;

  tags?: string[] | null;

  startTime?: Date | string;
  endTime?: Date | string;
  estimatedTimeHours?: number;

  attachments?: string[];
  subtasks?: string[];
  recurrence?: string;

  impact?: Partial<TicketPriority>;
  severity?: TicketPriority;
  steps?: string | string[];

  location?: string;
  checklist?: string[];
  attendees?: string[];

  amount?: number;
  currency?: string;
  dueDate?: Date | string | null;

  updatedAt?: string | Date | null;
  updatedById?: string | number;
}

export interface Create_Ticket {
  id: number;
  title: string;
  createdAt: string;
  type: Ticket_Type;
  priority: Ticket_Priority;  
  status: TicketStatus;
  
  description?: string;

  assignee?: string;
  createdById?: number;
  assignedToId?: number;

  tags?: string[] | null;

  startTime?: Date | string;
  endTime?: Date | string;
  estimatedTimeHours?: number;

  attachments?: string[];
  subtasks?: string[];
  recurrence?: string;

  impact?: Partial<TicketPriority>;
  severity?: TicketPriority;
  steps?: string | string[];

  location?: string;
  checklist?: string[];
  attendees?: string[];

  amount?: number;
  currency?: string;

  dueDate?: Date | string;
  updatedAt?: string | Date;
}

export enum Ticket_Type {
  GENERAL = 'GENERAL',
  INVOICE = 'INVOICE',
  FEATURE = 'FEATURE_REQUEST',
  EVENT = 'EVENT',
  BUG = 'BUG',
  TASK = "TASK",

  TICKET = 'TICKET',
  ISSUE = 'ISSUE',
  TEST = 'TEST',
  DESIGN = 'DESIGN',
  MEETING = 'MEETING',
  RELEASE = 'RELEASE',
  SUPPORT = 'SUPPORT',
  RESEARCH = 'RESEARCH',
  SECURITY = 'SECURITY',
  DEPLOYMENT = 'DEPLOYMENT',
  PERFORMANCE = 'PERFORMANCE',
  MAINTENANCE = 'MAINTENANCE',
  OPTIMIZATION = 'OPTIMIZATION',
  DOCUMENTATION = 'DOCUMENTATION',
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