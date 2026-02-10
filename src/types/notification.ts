export type NotificationType = 
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
  title: string;
  message?: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  readAt?: string | null;
  ticketId?: number | null;
  teamId?: number | null;
  meta?: Record<string, unknown>;
  severity: NotificationSeverity
}

export type NewNotification = Omit<
  AppNotification,
  "id" | "createdAt" | "read"
>;

export interface AppEventMap {
  "ticket:created": { title: string; createdBy: string | number };
  "ticket:updated": { ticketId: number };
  "ticket:assigned": { ticketId: number; assignee?: string | number };
  "ticket:comment": { ticketId: number; author?: string | number };
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
  requestPushPermission: () => Promise<boolean | void>;
}