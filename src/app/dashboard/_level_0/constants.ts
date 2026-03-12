import { TicketColor } from "@/types/ticket";
import { UserStatus } from "@/types/users";
import { PlannerTaskTypeUnion, TicketTypeUnion } from "../_level_1/tSchema";

export type LinkItem = {
  label: string | React.ReactNode;
  href: string;
  cta?: boolean;
  disabled?: boolean;
};

export const ALL_TICKET_TYPES = [
  'GENERAL',
  'BUG',
  'FEATURE_REQUEST',
  'SUPPORT',
  'INVOICE',
  'SECURITY',
  'NOTE',
  'TASK',
  'MEETING',
  'EVENT',
] as const;

export const TICKET_TYPES = [
  'GENERAL',
  'BUG',
  'FEATURE_REQUEST',
  'SUPPORT',
  'INVOICE',
  'SECURITY',
  'NOTE',
] as const;

export const PLANNER_TASK_TYPES = [
  'TASK',
  'MEETING',
  'EVENT',
] as const;

export const TICKET_PRIORITIES = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT'
] as const;

export const TAG_SUGGESTIONS = [
  'API', 'SWE', 'accessibility', 'analytics', 'algorithm', 'backend', 'bug fix', 'beta', 'button', 'client', 'cloud', 'code', 'comment', 'config', 'database', 'deploy', 'design', 'dev', 'docs', 'error', 'feature request', 'first issue', 'frontend', 'git', 'integration', 'layout', 'logging', 'migration', 'new feature', 'optimization', 'payment', 'performance', 'prod', 'refactor', 'security', 'slack', 'staging', 'style', 'system design', 'testing', 'ui/ux', 'v1', 'v2',
] as const;

export const EVENT_TAG_SUGGESTIONS = [
  'meeting', 'workshop', 'webinar', 'conference', 'seminar', 'training', 'demo', 'presentation', 'standup', 'retrospective', 'planning', 'review', 'kickoff', 'onboarding', 'blocked', 'remote', 'in-person', 'hybrid', 'zoom', 'google meet', 'office', 'conference room', 'stakeholders', 'leadership', 'customers', 'partners', 'public', 'brainstorm', 'feedback', 'decision', 'alignment', 'sync', 'follow-up', 'celebration', 'milestone', 'launch',
] as const;

export type TicketType = (typeof TICKET_TYPES)[number];

export type TicketsType = (typeof ALL_TICKET_TYPES)[number];

export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export type PlannerTaskType = (typeof PLANNER_TASK_TYPES)[number];

export const TICKET_STATUSES = ['UPCOMING', 'IN_PROGRESS', 'OPEN', 'RESOLVED', 'CLOSED', 'CANCELLED'];

export const TICKET_LIST_HEADERS = ['No.', 'Title', 'Priority', 'Due Date', 'Status', 'Type', 'Last Updated']

export const TASK_LIST_HEADERS = ['No.', 'Title', 'Due Date', 'Status', 'Tags', 'Type']

export const TICTASK_QUICK_ACTIONS = [
  {
    color: 'success',
    title: 'START',
    status: 'IN_PROGRESS',
  },                  
  {
    color: 'secondary',
    title: 'RESOLVE', 
    status: 'RESOLVED',
  },  
  {   
    color: 'warning',
    title: 'CANCEL',
    status: 'CANCELLED',
  }
] as const;

export const USER_STATUS_OPTIONS: { 
  value: UserStatus; 
  label: string; 
  emoji: string;
}[] = [
  { value: UserStatus.ACTIVE, label: "Active", emoji: "🟢" },
  { value: UserStatus.BUSY, label: "Busy", emoji: "⛔️" },
  { value: UserStatus.AWAY, label: "Away", emoji: "🔸" },
  { value: UserStatus.OFFLINE, label: "Offline", emoji: "📵" },
];

export const colorTooltipMap: Record<TicketColor, string> = {
  DEFAULT: 'No color',
  INFO: 'Blue',
  SUCCESS: 'Green',
  WARNING: 'Orange',
  DANGER: 'Red',
  SPECIAL: 'Purple',
};

export type TicketTypeMeta = {
  label: string;
  description: string;
};

export const TICKET_TYPE_META: Record<TicketTypeUnion, TicketTypeMeta> = {
  GENERAL: {
    label: "General",
    description: "A general purpose ticket used for ideas, discussions, or anything that doesn't fit another category.",
  },
  NOTE: {
    label: "Note",
    description: "Quick notes, documentation, or internal knowledge you want to save.",
  },
  BUG: {
    label: "Bug",
    description: "Report an issue or unexpected behavior in the system that needs fixing.",
  },

  FEATURE_REQUEST: {
    label: "Feature",
    description: "Suggest a new feature or improvement for the platform.",
  },
  SUPPORT: {
    label: "Support",
    description: "Request help or assistance from the support team.",
  },
  INVOICE: {
    label: "Invoice",
    description: "Create billing requests, payments, or invoice-related records.",
  },
  SECURITY: {
    label: "Security",
    description: "Report vulnerabilities, security concerns, or suspicious activity.",
  },
};

export const TASK_TYPE_META: Record<PlannerTaskTypeUnion, TicketTypeMeta> = {
  TASK: {
    label: "Task",
    description: "A standard to-do item or action that needs to be completed. Tasks can include due dates, notes, and progress tracking.",
  },
  EVENT: {
    label: "Event",
    description: "A scheduled activity happening at a specific time, such as a launch, reminder, deadline, or personal event.",
  },
  MEETING: {
    label: "Meeting",
    description: "A planned meeting with one or more participants. Useful for tracking agendas, discussion notes, and meeting times.",
  },
};