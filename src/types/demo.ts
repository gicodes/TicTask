import { DEMO_TICKETS } from "@/components/_level_1/animationData";

export const COLUMNS = ['UPCOMING', 'IN PROGRESS', 'RESOLVED'] as const;

export type TicketStatus = (typeof COLUMNS)[number];

export type FlowPhase =
  | 'idle'
  | 'form-open'
  | 'filling'
  | 'creating'
  | 'created'
  | 'assigned'
  | 'moving-to-progress'
  | 'in-progress'
  | 'moving-to-resolved'
  | 'resolved';

export type DemoTicket = (typeof DEMO_TICKETS)[number];

export type ActiveTicket = DemoTicket & {
  status: TicketStatus;
  assignee: string | null;
  tags: string[] | null;
  dueDate: Date | null;
};

export const FLOW: Array<{
  phase: FlowPhase;
  duration: number;
}> = [
  { phase: 'form-open', duration: 1000 },
  { phase: 'filling', duration: 3800 },
  { phase: 'creating', duration: 1400 },
  { phase: 'created', duration: 1800 },
  { phase: 'assigned', duration: 1800 },
  { phase: 'moving-to-progress', duration: 1300 },
  { phase: 'in-progress', duration: 1900 },
  { phase: 'moving-to-resolved', duration: 1300 },
  { phase: 'resolved', duration: 3000 },
];

export const INITIAL_TICKET = DEMO_TICKETS[0];

export const createDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const formatDueDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

export const createTicket = (ticket: DemoTicket): ActiveTicket => ({
  ...ticket,
  status: 'UPCOMING',
  assignee: null,
  dueDate: null,
  tags: ticket.tags,
});

export const getStatusText = (phase: FlowPhase) => {
  switch (phase) {
    case 'idle':
      return 'Waiting for activity…';
    case 'form-open':
      return 'Opening create form…';
    case 'filling':
      return 'Filling ticket details…';
    case 'creating':
      return 'Creating ticket…';
    case 'created':
      return 'New ticket created';
    case 'assigned':
      return 'Ticket assigned to you';
    case 'moving-to-progress':
      return 'Moving ticket to In Progress…';
    case 'in-progress':
      return 'Ticket is now In Progress';
    case 'moving-to-resolved':
      return 'Moving ticket to Resolved…';
    case 'resolved':
      return 'Marked as RESOLVED ✨';
    default:
      return '';
  }
}