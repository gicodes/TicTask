export const ALL_TICKET_TYPES = [
  'GENERAL',
  'BUG',
  'FEATURE_REQUEST',
  'DOCUMENTATION',
  'SUPPORT',
  'ISSUE',
  'INVOICE',
  'OPTIMIZATION',
  'MAINTENANCE',
  'RESEARCH',
  'TEST',
  'SECURITY',
  'PERFORMANCE',
  'DESIGN',
  'TICKET',
  'TASK',
  'MEETING',
  'EVENT',
  'RELEASE',
  'DEPLOYMENT',
] as const;

export const TICKET_TYPES = [
  'GENERAL',
  'BUG',
  'FEATURE_REQUEST',
  'DOCUMENTATION',
  'SUPPORT',
  'ISSUE',
  'INVOICE',
  'OPTIMIZATION',
  'MAINTENANCE',
  'RESEARCH',
  'TEST',
  'SECURITY',
  'PERFORMANCE',
  'DESIGN',
  'TICKET',
] as const;

export const PLANNER_TASK_TYPES = [
  'TASK',
  'MEETING',
  'EVENT',
  'RELEASE',
  'DEPLOYMENT',
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
export type PlannerTaskType = (typeof PLANNER_TASK_TYPES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

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
