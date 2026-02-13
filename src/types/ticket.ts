import { CreateTeamTicketPayload } from "./team";
import { Client, User } from "./users";

export interface TicketNote {
  id: number;
  content: string;
  createdAt: string;
  authorId?: number | null;
  author?: User | null;
}

export interface TicketHistory {
  id: number;
  action: string;
  oldValue?: string | null;
  newValue?: string | null;
  createdAt: string;
  performedById?: number | null;
  performedBy?: User | null;
}

export interface Ticket {
  id: number;
  title: string;
  description: string | null;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority | null;

  tags: string[];
  dueDate: string | null;
  startTime: string | null;
  endTime: string | null;

  amount: number | null;
  currency: string | null;

  data: Data;

  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdBy: User;
  assignedToId: number | null;
  assignedTo: User | null;

  client: Client;
  notes: TicketNote[];
  history: TicketHistory[];
}

export type Data = {
  amount?: number;
  currency?: string;
  extClient: string;
  severity?: TicketPriority,
  steps?: string,
  impact?: TicketImpact,
  location?: string,
  attendees?: string[],
  checklist?: string[] | [],
  recurrence?: string;
  estimatedTimeHours?: number,
  attachments?: string[],
  subtasks?: SubTask[]
}

type SubTask = {
  id: string | number;
  title: string;
  done?: boolean;
}

export interface Create_Ticket {
  type: TicketType;
  title: string;
  description?: string;
  priority?: TicketPriority;
  tags?: string[];

  dueDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;

  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  steps?: string;
  impact?: 'LOW' | 'MEDIUM' | 'HIGH';
  amount?: number;
  currency?: string;
  recurrence?: string;
  checklist?: string[];
  subtasks?: SubTask[];
  estimatedTimeHours?: number;
  attachments?: string[];
  location?: string;
  attendees?: string[];
  extClient?: string;

  createdById: number;
  assignTo?: string;
  assignees?: string[];

  teamId?: number;
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

export enum Ticket_Impact {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Ticket_Severity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum Ticket_Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum Ticket_Status {
  UPCOMING = 'UPCOMING',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

export type TicketImpact = 'LOW' | 'MEDIUM' | 'HIGH';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'UPCOMING'| 'OPEN'| 'IN_PROGRESS'| 'RESOLVED'| 'CLOSED'| 'CANCELLED';
export type TicketType = 'GENERAL'| 'BUG' |'FEATURE_REQUEST' | 'SUPPORT'| 'EVENT' | 'TASK' | 'ISSUE' | 'INVOICE' | 'MEETING' | 'DOCUMENTATION' | 'MAINTENANCE' | 'OPTIMIZATION' | 'DEPLOYMENT' | 'RELEASE' | 'RESEARCH' | 'SECURITY' | 'DESIGN' | 'TEST' | 'PERFORMANCE' | 'TICKET';

export const priorityOrder: Record<string, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export const statusOrder: Record<string, number> = {
  UPCOMING: 0,
  IN_PROGRESS: 1,
  OPEN: 2,
  RESOLVED: 3,
  CANCELLED: 4,
  CLOSED: 5,
};

export type CreateTicketResult =
  | { success: true; ticket: Ticket }  
  | { success: false; error: string };

export type TeamTicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  selectedTicket: Ticket | null;

  fetchTickets: (force?: boolean) => Promise<void>;
  refreshTicket: (ticketId: number) => Promise<void>;

  selectTicket: (ticketId: number | null) => void;
  clearSelection: () => void;

  createTicket: (payload: CreateTeamTicketPayload) => Promise<Ticket | null>;
  updateTicket: (ticketId: number, updates: Partial<Ticket>) => Promise<Ticket | null>;
  deleteTicket: (ticketId: number) => Promise<void>;

  getComments: (ticketId: number) => Promise<TicketNote[]>;
  addComment: (ticketId: number, content: string) => Promise<void>;

  getHistory: (ticketId: number) => Promise<TicketHistory[]>;
  invalidate: () => void;
};