import GeneralForm from "../_level_2/ticketFormTypes/general";
import FeatureForm from "../_level_2/ticketFormTypes/feature";
import BugFixForm from "../_level_2/ticketFormTypes/bugFix";
import InvoiceForm from "../_level_2/ticketFormTypes/invoice";
import EventForm from "../_level_2/ticketFormTypes/event";

import { PlannerTaskType, TicketType } from './constants';
import TaskForm from "../_level_2/ticketFormTypes/task";

import { Control, FieldValues } from 'react-hook-form';
import { z, ZodTypeAny } from 'zod';
import { format } from "date-fns";

import { Ticket } from '@/types/ticket';

export type TicketTypeUnion = TicketType;
export type PlannerTaskTypeUnion = PlannerTaskType;
export type FormComponentType = React.ComponentType<{ 
  control: Control<FieldValues>; task?: boolean }>;

export interface TICKET_DRAWER_TYPES { 
  open: boolean; 
  onClose: () => void; 
  onUpdate?: () => void;
  ticketId?: string | number | null; 
}

export interface TICKET_FORM_TYPES {
  open: boolean;
  onClose: () => void;
  onCreated?: (t: Ticket | void) => Ticket | void;
  task?: boolean;
  defaultDueDate?: Date;
}

export const generalSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW','MEDIUM','HIGH','URGENT']).optional(),
  assignTo: z.string().email().optional(),
  tags: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
});
export type GeneralFormValues = z.infer<typeof generalSchema>;

export const bugSchema = z.object({
  type: z.literal('BUG').optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  severity: z.enum(['LOW','MEDIUM','HIGH','URGENT']).default('HIGH'),
  steps: z.string().optional(),
  priority: z.enum(['LOW','MEDIUM','HIGH','URGENT']).optional(),
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
  tags: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
});
export type FeatureFormValues = z.infer<typeof featureSchema>;

export const invoiceSchema = z.object({
  type: z.literal('INVOICE').optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  amount: z.number().min(0),
  currency: z.string().default('USD'),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
 
export const taskSchema = z.object({
  type: z.literal('TASK').optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['LOW','MEDIUM','HIGH','CRITICAL']).optional(),
  assignTo: z.string().email().optional(),
  checklist: z.array(z.string()).optional(),
  recurrence: z.string().optional(), // e.g. cron-like or 'daily','weekly'...
  estimatedTimeHours: z.number().nonnegative().optional(),
  attachments: z.array(z.string()).optional(), // store urls / ids
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
  GENERAL: GeneralForm,
  BUG: BugFixForm,
  FEATURE_REQUEST: FeatureForm,
  INVOICE: InvoiceForm,

  DOCUMENTATION: GeneralForm,
  SUPPORT: GeneralForm,
  ISSUE: GeneralForm,
  OPTIMIZATION: GeneralForm,
  MAINTENANCE: GeneralForm,
  RESEARCH: GeneralForm,
  TEST: GeneralForm,
  SECURITY: GeneralForm,
  PERFORMANCE: GeneralForm,
  DESIGN: GeneralForm,
  TICKET: GeneralForm,
};

export const TICKET_SCHEMAS: Record<TicketTypeUnion, ZodTypeAny> = {
  GENERAL: generalSchema,
  BUG: bugSchema,
  FEATURE_REQUEST: featureSchema,
  INVOICE: invoiceSchema,

  DOCUMENTATION: generalSchema,
  SUPPORT: generalSchema,
  ISSUE: generalSchema,
  OPTIMIZATION: generalSchema,
  MAINTENANCE: generalSchema,
  RESEARCH: generalSchema,
  TEST: generalSchema,
  SECURITY: generalSchema,
  PERFORMANCE: generalSchema,
  DESIGN: generalSchema,
  TICKET: generalSchema,
};

export const TICKET_DEFAULTS: 
  Record<TicketTypeUnion, (defaultDueDate?: Date) => Record<string, unknown>> = {

  GENERAL: () => ({ type: 'GENERAL', title: '', description: '', priority: 'MEDIUM', tags: [] }),
  BUG: () => ({ type: 'BUG', title: '', severity: 'HIGH', steps: '', priority: 'HIGH', tags: [] }),
  FEATURE_REQUEST: () => ({ type: 'FEATURE_REQUEST', title: '', impact: 'MEDIUM', description: '' }),
  INVOICE: () => ({ type: 'INVOICE', title: '', amount: 0, currency: 'USD', description: '' }),

  DOCUMENTATION: () => ({ type: 'DOCUMENTATION', title: '', description: '' }),
  SUPPORT: () => ({ type: 'SUPPORT', title: '', description: '' }),
  ISSUE: () => ({ type: 'ISSUE', title: '', description: '' }),
  OPTIMIZATION: () => ({ type: 'OPTIMIZATION', title: '', description: '' }),
  MAINTENANCE: () => ({ type: 'MAINTENANCE', title: '', description: '' }),
  RESEARCH: () => ({ type: 'RESEARCH', title: '', description: '' }),
  TEST: () => ({ type: 'TEST', title: '', description: '' }),
  SECURITY: () => ({ type: 'SECURITY', title: '', description: '' }),
  PERFORMANCE: () => ({ type: 'PERFORMANCE', title: '', description: '' }),
  DESIGN: () => ({ type: 'DESIGN', title: '', description: '' }),
  TICKET: () => ({ type: 'TICKET', title: '', description: '' }),
};

export const TASK_FORMS: Record<PlannerTaskTypeUnion, FormComponentType> = {
  TASK: TaskForm,
  MEETING: EventForm,
  EVENT: EventForm,
  RELEASE: GeneralForm,
  DEPLOYMENT: GeneralForm,
};

export const TASK_SCHEMAS: Record<PlannerTaskTypeUnion, ZodTypeAny> = {
  TASK: taskSchema,
  MEETING: eventMeetingSchema,
  EVENT: eventMeetingSchema,
  RELEASE: generalSchema,
  DEPLOYMENT: generalSchema,
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
  RELEASE: () => ({ type: 'RELEASE', title: '', description: '' }),
  DEPLOYMENT: () => ({ type: 'DEPLOYMENT', title: '', description: '' }),
};
