"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AppEvents } from "./events";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
  meta?: any;
}

interface NotificationsContextProps {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  requestPushPermission: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

const makeId = () => "n_" + Math.random().toString(36).slice(2, 9);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const webhookForward = false;  // set to true to let server forward to n8n, Twilio, Slack, etc.
  const webhookEndpoint = "/api/user/events";

  const addNotification = useCallback(
    (n: Omit<AppNotification, "id" | "createdAt" | "read">) => {
      const newNotif: AppNotification = {
        id: makeId(),
        createdAt: Date.now(),
        read: false,
        ...n,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      // forward event to server so server-side webhooks (twilio, slack, n8n) can react
      if (webhookForward) {
        try {
          fetch(webhookEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "notification.created", payload: newNotif }),
          }).catch((e) => console.warn("webhook forward failed", e));
        } catch (err) {
          console.warn("webhook forward error", err);
        }
      }
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((p) => ({ ...p, read: true })));
  }, []);

  useEffect(() => { // Restore from localStorage
    const stored = typeof window !== "undefined" ? localStorage.getItem("notifications") : null;
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch {}
    }

    // --- Event listeners ---
    const ticketCreated = (p: any) => {
      addNotification({
        title: "New ticket created",
        message: `${p.title} — created by ${p.createdBy}`,
        type: "info",
        meta: { channel: "ticket", event: "created", ...p },
      });
    };

    const ticketUpdated = (p: any) => {
      addNotification({
        title: "Ticket update",
        message: `Ticket ${p.ticketId} status updated`,
        type: "info",
        meta: { channel: "ticket", event: "updated", ...p },
      });
    };

    const ticketAssigned = (p: any) => {
      addNotification({
        title: "Ticket assigned",
        message: `Ticket assigned to ${p.assignee}`,
        type: "info",
        meta: { channel: "ticket", event: "assigned", ...p },
      });
    };

    const ticketComment = (p: any) => {
      addNotification({
        title: "New comment",
        message: `New comment on ${p.ticketId} by ${p.author}`,
        type: "info",
        meta: { channel: "ticket", event: "comment", ...p },
      });
    };

    const subscriptionPaymentFailed = (p: any) => {
      addNotification({
        title: "Subscription payment failed",
        message: `Payment failed for user ${p.userId} — ${p.reason ?? "unknown"}`,
        type: "warning",
        meta: { channel: "subscription", event: "paymentFailed", ...p },
      });
    };

    const subscriptionRenewal = (p: any) => {
      addNotification({
        title: "Subscription renewal upcoming",
        message: `Plan ${p.plan} renews on ${p.renewDate}`,
        type: "warning",
        meta: { channel: "subscription", event: "renewal", ...p },
      });
    };

    const authNewDevice = (p: any) => {
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

  useEffect(() => {
    try { // persist to localStorage
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const requestPushPermission = useCallback(async () => {
    // Keep minimal — integrate FCM or OneSignal here
    if (typeof Notification !== "undefined") {
      const p = await Notification.requestPermission();
      return p === "granted";
    }

    return;
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
        requestPushPermission: requestPushPermission as () => Promise<void>,
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
