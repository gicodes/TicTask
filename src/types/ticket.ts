import { CreateTeamTicketPayload, TeamMember } from "./team";
import { Client, User } from "./users";

export interface Ticket {
  id: number;
  title: string;
  description: string | null;
  type: AllTicketTypes;
  status: TicketStatus;

  tags: string[] | null;
  dueDate: string | null;
  priority: TicketPriority | null;

  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdBy: User;
  notes: TicketNote[];
  history: TicketHistory[];

  assignTo?: string; // email string taken from CNT forms
  assignedTo: User | null;
  assignedToId: number | null;
  assignees?: TeamMember[] | [];
  assigneesIds?: number[] | [];
  teamId?: number;

  startTime: string | null;
  endTime: string | null;
  client: Client;
  amount: number | null;
  currency: string | null;

  data: Data;
}

export type Data = {
  severity?: TicketSeverity, // bug
  impact?: TicketImpact, // feature
  extClient: string; // invoice
  color?: TicketColor; // note
  isPinned: boolean; //note
  recurrence?: string; // invoice / task
  attachments?: string[], // note / task
  checklist?: string[] | [], // task
  steps?: string, // task
  estimatedTimeHours?: number, // task
  subtasks?: SubTask[] // task
  location?: string, // event/ meeting
  attendees?: string[], // event/ meeting
}

type SubTask = {
  id: string | number;
  title: string;
  done?: boolean;
}

export interface Create_Ticket {
  id?: number;
  type: AllTicketTypes;
  title: string;
  description: string;

  tags?: string[];
  dueDate?: string | null;
  priority?: TicketPriority;
  severity?: TicketSeverity;
  steps?: string;
  impact?: TicketImpact;

  createdById: number;
  assignTo?: string;
  assignees?: TeamMember[];
  teamId?: number;

  extClient?: string;
  amount?: number;
  currency?: string;
  recurrence?: string;
  isPinned?: boolean;
  color?: TicketColor;
  attachments?: string[];
  startTime?: string | null;
  endTime?: string | null;
  checklist?: string[];
  subtasks?: SubTask[];
  estimatedTimeHours?: number;
  location?: string;
  attendees?: string[];
}

export enum Ticket_Type {
  GENERAL = 'GENERAL',
  BUG = 'BUG',
  NOTE = 'NOTE',
  INVOICE = 'INVOICE',
  SUPPORT = 'SUPPORT',
  SECURITY = 'SECURITY',
  FEATURE = 'FEATURE_REQUEST',
  TASK = "TASK",
  EVENT = 'EVENT',
  MEETING = 'MEETING',
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

export type TicketSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TicketColor = 'INFO' | 'SUCCESS' | 'DANGER' | 'WARNING' | 'SPECIAL' | 'DEFAULT';

export type TicketStatus = 'UPCOMING'| 'OPEN'| 'IN_PROGRESS'| 'RESOLVED'| 'CLOSED'| 'CANCELLED';

export type AllTicketTypes = 'GENERAL'| 'BUG' |'FEATURE_REQUEST' | 'SUPPORT'| 'EVENT' | 'TASK' | 'NOTE' | 'INVOICE' | 'MEETING' | 'SECURITY';

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

export type CreateTicketResult = { success: true; ticket: Ticket } | { success: false; error: string };

export type TeamTicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  selectedTicket: Ticket | null;
  getTicket: (ticketId: number) => Promise<Ticket | null>;
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