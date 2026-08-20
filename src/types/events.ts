import { AllTicketTypes } from "@/types/ticket";

export type TicketPayloads = {
  created: { ticketId: number; type: string; title: string; createdBy: string | number; assignee?: string | number };
  updated: { ticketId: number; type: string | AllTicketTypes; changes: Record<string, unknown>; status: string; updatedBy?: string | number }
  due_soon: { ticketId: number; dueDate: Date | string };
  assigned: { ticketId: number; assignee?: string | number; assignedBy?: string | number };
  resolved: { ticketId: number; resolvedBy?: string | number };
  closed: { ticketId: number, closedBy?: string | number};
  comment: { ticketId: number; commentId: string | number; text: string; author: string | number };
  statusChanged: { ticketId: number; from: string; to: string; changedBy?: string };
};

export type TeamTicketPayloads = {
  created: {
    teamId: number;
    ticketId: number;
    createdBy?: string;
  };

  updated: {
    teamId: number;
    ticketId: number;
    updatedBy: string;
    updates: Record<string, unknown>;
  };

  assigned: {
    teamId: number;
    ticketId: number,
    assignedTo: string,
    assignees?: string[],
    assigneeIds?: number[]
  }
  
  resolved: {
    teamId: number,
    ticketId: number,
    resolvedBy: string,
  }

  due_soon: {
    teamId: number;
    ticketId: number;
    dueDate: Date | string;
  }

  deleted: {
    teamId: number;
    ticketId: number;
    deletedBy?: string | number;
  };

  comment: {
    teamId: number;
    ticketId: number;
    author?: string;
  };

  closed: {
    teamId: number;
    ticketId: number,
    closedBy: string;
  }
};

export type SubscriptionPayloads = {
  started: { userId: string; plan: string; startedAt: number };
  upgraded: { userId: string; fromPlan: string; toPlan: string; at: number };
  downgraded: { userId: string; fromPlan: string; toPlan: string; at: number };
  paymentFailed: { userId: string; attemptId?: string; reason?: string; at: number };
  trialEnding: { userId: string; daysLeft: number; at: number };
  renewalUpcoming: { userId: string; plan: string; renewDate: string };
};

export type AuthPayloads = {
  login: { email: string; ip?: string; device?: string; at: number };
  newDevice: { email: string; device: string; ip?: string; at: number };
  roleChanged: { email: string; fromRole: string; toRole: string; changedBy?: string; at: number };
  invited: { email: string; invitedBy?: string; inviteId?: string; at: number };
  removed: { email: string; removedBy?: string; at: number };
};
