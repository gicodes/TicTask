import { PlannerTaskType, TicketsType, TicketType } from '../_level_0/constants';
import GeneralForm from "../_level_2/ticketFormTypes/general";
import FeatureForm from "../_level_2/ticketFormTypes/feature";
import InvoiceForm from "../_level_2/ticketFormTypes/invoice";
import BugFixForm from "../_level_2/ticketFormTypes/bugFix";
import EventForm from "../_level_2/ticketFormTypes/event";
import NoteForm from '../_level_2/ticketFormTypes/notes';
import TaskForm from "../_level_2/ticketFormTypes/task";
import { Control, FieldValues } from 'react-hook-form';
import { Ticket } from '@/types/ticket';
import { z, ZodTypeAny } from 'zod';
import { format } from "date-fns";
import { 
  Bug, 
  Lightbulb, 
  ReceiptText, 
  CalendarClock, 
  CheckSquare, 
  Notebook,  
  TicketCheck 
} from "lucide-react";
import { MdSecurityUpdateGood, MdSupport } from "react-icons/md";
import SecurityForm from '../_level_2/ticketFormTypes/security';

export interface TICKET_FORM_PROPS {
  open: boolean;
  task?: boolean;
  defaultDueDate?: Date;
  onClose: () => void;
  teamId?: number;
  onCreated: (t: Ticket | void) => void;
}

export interface TICKET_WORKSPACE_PROPS { 
  open: boolean;
  onClose: () => void;
  ticket?: Ticket;
  ticketId?: string | number;
  onUpdate?: () => void; 
}

export interface TICKET_TOOLBAR_PROPS {
  view: 'board' | 'list'; 
  setView: (v: 'board' | 'list') => void; 
  onOpenCreate: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export interface KANBAN_BOARD_PROPS {
  grouped: Record<string, Ticket[]>;
  setGrouped: React.Dispatch<React.SetStateAction<Record<string, Ticket[]>>>;
  openDetail: (id: number) => void;
  isSearching?: boolean;
  updateTicket: (id: number, updates: Partial<Ticket>) => void;
}

export interface TICKET_LIST_PROPS {
  columns: string[];
  tickets: Ticket[];
  onOpen: (id: number) => void;
}

export interface PLANNER_TOOLBAR_PROPS {
  view: 'calendar' | 'list';
  setView: (v: 'calendar' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCreate: () => void;
  dateRangeLabel?: string;
}

export interface BOARD_COLUMN { 
  title: string;
  tickets: Ticket[];
  onOpen?: (id: number) => void;
  isDragDisabled: boolean;
}

export type TicketTypeUnion = TicketType;
export type PlannerTaskTypeUnion = PlannerTaskType;
export type FormComponentType = React.ComponentType<{control: Control<FieldValues>; type?: TicketType }>;
export type TicketFormValuesUnion = GeneralFormValues | NotesFormValues | BugFormValues | FeatureFormValues | InvoiceFormValues | TaskFormValues | EventMeetingFormValues;

export const TICKET_TYPE_ICONS: Record<TicketsType, React.ComponentType<{ size?: number }>> = {
  GENERAL: TicketCheck,
  BUG: Bug,
  NOTE: Notebook,
  INVOICE: ReceiptText,
  FEATURE_REQUEST: Lightbulb,
  SUPPORT: MdSupport,
  SECURITY: MdSecurityUpdateGood,
  TASK: CheckSquare,
  EVENT: CalendarClock,
  MEETING: CalendarClock,
};

export const generalSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW','MEDIUM','HIGH','URGENT']).optional(),
  assignTo: z.string().trim().pipe(z.union([
    z.literal(""),                    
    z.string().email("Invalid email address")
  ])).optional().optional(),
  assignees: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
});
export type GeneralFormValues = z.infer<typeof generalSchema>;

export const noteSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  assignTo: z.string().trim().pipe(z.union([
    z.literal(""),                    
    z.string().email("Invalid email address")
  ])).optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  attachments: z.array(z.string()).optional(),
  color: z.enum(['INFO', 'SUCCESS', 'DANGER', 'WARNING', 'SPECIAL', 'DEFAULT']).optional().default('INFO'),
  isPinned: z.boolean().optional(),
});
export type NotesFormValues = z.infer<typeof noteSchema>;

export const bugSchema = z.object({
  type: z.literal('BUG').optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  severity: z.enum(['LOW','MEDIUM','HIGH','CRITICAL']).default('HIGH'),
  steps: z.string().optional(),

  priority: z.enum(['LOW','MEDIUM','HIGH','URGENT']).optional(),
  assigneesIds: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
});
export type BugFormValues = z.infer<typeof bugSchema>;

export const featureSchema = z.object({
  type: z.literal('FEATURE_REQUEST').optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  impact: z.enum(['LOW','MEDIUM','HIGH']).default('MEDIUM'),

  priority: z.enum(['LOW','MEDIUM','HIGH','URGENT']).optional(),
  assigneesIds: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
});
export type FeatureFormValues = z.infer<typeof featureSchema>;

export const invoiceSchema = z.object({
  type: z.literal('INVOICE').optional(),
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.string().default("USD"),
  extClient: z.email().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  recurrence: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});
export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
 
export const taskSchema = z.object({
  type: z.literal('TASK').optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(['LOW','MEDIUM','HIGH','CRITICAL']).optional(),
  assignTo: z.string().trim().pipe(z.union([
    z.literal(""),                    
    z.string().email("Invalid email address")
  ])).optional(),
  assignees: z.array(z.number()).optional(),
  checklist: z.array(z.string()).optional(),
  recurrence: z.string().optional(),
  estimatedTimeHours: z.number().nonnegative().optional(),
  attachments: z.array(z.string()).optional(), // store urls & ids
  subtasks: z.array(z.object({ title: z.string(), done: z.boolean().optional() })).optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  startTime: z.string().optional(),
});
export type TaskFormValues = z.infer<typeof taskSchema>;

export const eventMeetingSchema = z.object({
  type: z.enum(['EVENT','MEETING']).optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  attendees: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});
export type EventMeetingFormValues = z.infer<typeof eventMeetingSchema>;

export const TICKET_FORMS: Record<TicketTypeUnion, FormComponentType> = {
  NOTE: NoteForm,
  GENERAL: GeneralForm,
  INVOICE: InvoiceForm,
  FEATURE_REQUEST: FeatureForm,
  BUG: BugFixForm,
  SUPPORT: GeneralForm,
  SECURITY: SecurityForm,
};

export const TICKET_SCHEMAS: Record<TicketTypeUnion, ZodTypeAny> = {
  NOTE: noteSchema,
  GENERAL: generalSchema,
  INVOICE: invoiceSchema,
  FEATURE_REQUEST: featureSchema,
  BUG: bugSchema,
  SUPPORT: generalSchema,
  SECURITY: generalSchema,
};

export const TICKET_DEFAULTS: Record<TicketTypeUnion, (defaultDueDate?: Date) => Record<string, unknown>> = {
  GENERAL: () => ({ 
    type: 'GENERAL', title: '', description: '', priority: 'MEDIUM', tags: [], assignees: [], }),
  BUG: () => ({ 
    type: 'BUG', title: '', severity: 'HIGH', steps: '', priority: 'HIGH', tags: [], assignees: [], }),
  FEATURE_REQUEST: () => ({ 
    type: 'FEATURE_REQUEST', title: '', impact: 'MEDIUM', description: '', assignees: [], }),
  INVOICE: () => ({ 
    type: 'INVOICE', title: '', amount: 0, currency: 'USD', description: '', assignTo: '', }),
  SUPPORT: () => ({ 
    type: 'SUPPORT', title: '', description: '', assignees: [], }),
  SECURITY: () => ({ 
    type: 'SECURITY', title: '', description: '', assignees: [], }),
  NOTE: () => ({ 
    type: 'NOTE', title: '', description: '', assignees: [], isPinned: false}),
};

export const TASK_FORMS: Record<PlannerTaskTypeUnion, FormComponentType> = {
  TASK: TaskForm,
  MEETING: EventForm,
  EVENT: EventForm,
};

export const TASK_SCHEMAS: Record<PlannerTaskTypeUnion, ZodTypeAny> = {
  TASK: taskSchema,
  MEETING: eventMeetingSchema,
  EVENT: eventMeetingSchema,
};

export const TASK_DEFAULTS: Record<PlannerTaskTypeUnion, (defaultDueDate?: Date) => Record<string, unknown>> = {
  TASK: (defaultDueDate?: Date) => ({
    type: 'TASK',
    title: '',
    description: '',
    checklist: [],
    recurrence: '',
    estimatedTimeHours: undefined,
    attachments: [],
    subtasks: [],
    assignees: [],
    dueDate: defaultDueDate ? format(defaultDueDate, "yyyy-MM-dd'T'HH:mm") : undefined,
  }),
  MEETING: (defaultDueDate?: Date) => ({
    type: 'MEETING',
    title: '',
    description: '',
    startTime: defaultDueDate ? format(defaultDueDate, "yyyy-MM-dd'T'HH:mm") : undefined,
    endTime: defaultDueDate ? format(defaultDueDate, "yyyy-MM-dd'T'HH:mm") : undefined,
    location: '',
    attendees: [],
    tags: [],
  }),
  EVENT: (defaultDueDate?: Date) => ({
    type: 'EVENT',
    title: '',
    description: '',
    startTime: defaultDueDate ? format(defaultDueDate, "yyyy-MM-dd'T'HH:mm") : undefined,
    endTime: defaultDueDate ? format(defaultDueDate, "yyyy-MM-dd'T'HH:mm") : undefined,
    location: '',
    attendees: [],
    tags: [],
  }),
};

export const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "Crypto", symbol: "₿", name: "Cryptocurrency" },
];

export const SUGGESTED_TAGS = [
  "bill", "paypal", "client", "wire", "confirm","check", "crypto", "payment", "asap", "urgent","monthly", "overdue"
];
