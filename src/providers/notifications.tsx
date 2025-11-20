"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AppEvents } from "./events";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  read: boolean;
  type?: NotificationType;
  meta?: Record<string, unknown>;
}

export type NewNotification = Omit<
  AppNotification,
  "id" | "createdAt" | "read"
>;

export interface TicketCreatedPayload {
  title: string;
  createdBy:string | number;
  [key: string]: unknown;
}

export interface TicketUpdatedPayload {
  ticketId: number;
  [key: string]: unknown;
}

export interface TicketAssignedPayload {
  ticketId: number;
  assignee?: string | number;
  [key: string]: unknown;
}

export interface TicketCommentPayload {
  ticketId: number;
  author?: string | number;
  comment?: string;
  [key: string]: unknown;
}

export interface SubscriptionPaymentFailedPayload {
  userId: string;
  reason?: string;
  [key: string]: unknown;
}

export interface SubscriptionRenewalUpcomingPayload {
  plan: string;
  renewDate: string;
  [key: string]: unknown;
}

export interface AuthNewDevicePayload {
  device: string;
  ip?: string;
  [key: string]: unknown;
}

export interface AppEventMap {
  "ticket:created": TicketCreatedPayload;
  "ticket:updated": TicketUpdatedPayload;
  "ticket:assigned": TicketAssignedPayload;
  "ticket:comment": TicketCommentPayload;

  "subscription:payment-failed": SubscriptionPaymentFailedPayload;
  "subscription:renewal-upcoming": SubscriptionRenewalUpcomingPayload;

  "auth:new-device": AuthNewDevicePayload;
}

type EventCallback<K extends keyof AppEventMap> = (
  payload: AppEventMap[K]
) => void;

interface NotificationsContextProps {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: NewNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;       
  clearNotifications: () => void;               
  requestPushPermission: () => Promise<boolean | void>;
}

const NotificationsContext =
  createContext<NotificationsContextProps | undefined>(undefined);

const makeId = () => "n_" + Math.random().toString(36).slice(2, 9);

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const webhookForward = false;
  const webhookEndpoint = "/api/user/events";

  const addNotification = useCallback((n: NewNotification) => {
    const newNotif: AppNotification = {
      id: makeId(),
      createdAt: Date.now(),
      read: false,
      ...n,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    if (webhookForward) {
      fetch(webhookEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "notification.created",
          payload: newNotif,
        }),
      }).catch((e) => console.warn("webhook forward failed", e));
    }
  }, [webhookForward, webhookEndpoint]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, read: true } : p))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((p) => ({ ...p, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);


  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? localStorage.getItem("notifications")
      : null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppNotification[];
        setNotifications(parsed);
      } catch {
        /* ignore */
      }
    }

    const ticketCreated: EventCallback<"ticket:created"> = (p) => {
      addNotification({
        title: "New ticket created",
        message: `${p.title} — created by ${p.createdBy}`,
        type: "info",
        meta: { channel: "ticket", event: "created", ...p },
      });
    };

    const ticketUpdated: EventCallback<"ticket:updated"> = (p) => {
      addNotification({
        title: "Ticket update",
        message: `Ticket ${p.ticketId} status updated`,
        type: "info",
        meta: { channel: "ticket", event: "updated", ...p },
      });
    };

    const ticketAssigned: EventCallback<"ticket:assigned"> = (p) => {
      addNotification({
        title: "Ticket assigned",
        message: `Ticket assigned to ${p.assignee}`,
        type: "info",
        meta: { channel: "ticket", event: "assigned", ...p },
      });
    };

    const ticketComment: EventCallback<"ticket:comment"> = (p) => {
      addNotification({
        title: "New comment",
        message: `New comment on ${p.ticketId} by ${p.author}`,
        type: "info",
        meta: { channel: "ticket", event: "comment", ...p },
      });
    };

    const subscriptionPaymentFailed: EventCallback<"subscription:payment-failed"> = (p) => {
      addNotification({
        title: "Subscription payment failed",
        message: `Payment failed for user ${p.userId} — ${
          p.reason ?? "unknown"
        }`,
        type: "warning",
        meta: { channel: "subscription", event: "paymentFailed", ...p },
      });
    };

    const subscriptionRenewal: EventCallback<"subscription:renewal-upcoming"> = (p) => {
      addNotification({
        title: "Subscription renewal upcoming",
        message: `Plan ${p.plan} renews on ${p.renewDate}`,
        type: "warning",
        meta: { channel: "subscription", event: "renewal", ...p },
      });
    };

    const authNewDevice: EventCallback<"auth:new-device"> = (p) => {
      addNotification({
        title: "New device login",
        message: `${p.device} logged in`,
        type: "warning",
        meta: { channel: "auth", event: "new-device", ...p },
      });
    };

    const off1 = AppEvents.on("ticket:created", ticketCreated);
    const off2 = AppEvents.on("ticket:updated", ticketUpdated);
    const off3 = AppEvents.on("ticket:assigned", ticketAssigned);
    const off4 = AppEvents.on("ticket:comment", ticketComment);
    const off5 = AppEvents.on("subscription:payment-failed", subscriptionPaymentFailed);
    const off6 = AppEvents.on("subscription:renewal-upcoming", subscriptionRenewal);
    const off7 = AppEvents.on("auth:new-device", authNewDevice);

    return () => {
      off1(); off2(); off3(); off4(); off5(); off6(); off7();
    };
  }, [addNotification]);

  /* ----------------------------- Persist to localStorage ---------------------------- */

  useEffect(() => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  /* ------------------------------ Push Permission ------------------------------ */

  const requestPushPermission = useCallback(async () => {
    if (typeof Notification !== "undefined") {
      const result = await Notification.requestPermission();
      return result === "granted";
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications,
        requestPushPermission,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationsProvider");
  return ctx;
};
