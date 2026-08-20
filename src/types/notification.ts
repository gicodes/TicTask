export type NotificationType = 
  "TICKET_DUE_SOON" |
  "TICKET_CREATED" |
  "TICKET_ASSIGNED" |
  "TICKET_UPDATED" |
  "TICKET_CLOSED" |
  "COMMENT_ADDED" |
  "MENTION" |
  "SYSTEM" |
  "ALERT" ;

export type NotificationSeverity = "info" | "warning" | "success" | "error"

export interface AppNotification {
  id: number;
  teamId?: number | null;
  ticketId?: number | null;

  title: string;
  message?: string;
  type: NotificationType;
  severity: NotificationSeverity
  read: boolean;

  createdAt: string;
  readAt?: string | null;

  meta?: Record<string, unknown>;

  closedBy?: string;
  createdBy?: string;
  author?: string;
}

export type NewNotification = Omit<
  AppNotification,
  "id" | "createdAt" | "read"
>;

export interface AppEventMap {
  "ticket:created": { title: string; createdBy: string | number };
  "ticket:due_soon": { ticketId: number, dueDate: Date | string };
  "ticket:updated": { ticketId: number, updatedBy: string | number };
  "ticket:closed": { ticketId: number, closedBy: number | string }
  "ticket:assigned": { ticketId: number; assignee?: string | number };
  "ticket:comment": { ticketId: number; author?: string | number };
  
  "team:ticket:created": { teamId: number, ticketId: number, title: string; createdBy: string };
  "team:ticket:closed": { teamId: number, ticketId: number, closedBy: string };
  "team:ticket:due_soon": { teamId: number, ticketId: number, dueDate: Date | string };
  "team:ticket:updated": { teamId: number, ticketId: number, updatedBy: string };
  "team:ticket:assigned": { teamId: number, ticketId: number; assignedTo: string | number; assignees: number[] };
  "team:ticket:comment": { teamId: number, ticketId: number; author?: string | number };

  "subscription:payment-failed": { userId: string; reason?: string };
  "subscription:renewal-upcoming": { plan: string; renewDate: string };
  "auth:new-device": { device: string; ip?: string };
}

export type EventCallback<K extends keyof AppEventMap> = (
  payload: AppEventMap[K]
) => void;

export interface NotificationsContextProps {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: NewNotification) => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
  requestPushPermission?: () => Promise<boolean | void>;
  unsubscribePush?: () => Promise<boolean>; 
}
