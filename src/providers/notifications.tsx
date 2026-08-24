"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./auth";
import { AppEvents } from "./events";
import {
  AppEventMap,
  EventCallback,   
  AppNotification,
  NewNotification, 
  NotificationsContextProps 
} from "@/types/notification";
import { GenericAPIRes } from "@/types/axios";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/axios";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

{/*
  This provider handles 2 different kind of notification system.
  1. Push notifications - Register worker, getVAPID and subscribe to push
  2. In-App notifications - Register event with AppEvents and fire on trigger
*/}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const shouldShowInAppNotifications =
    !user?.data?.muteNotifications &&
    (user?.data?.getInAppNotifs ?? true);

  const addLocalNotification = useCallback(
    (n: NewNotification) => {
      if (!shouldShowInAppNotifications) return;

      const optimistic: AppNotification = {
        id: Date.now(),
        read: false,
        createdAt: new Date().toISOString(),
        ...n,
      } as AppNotification;

      setNotifications((prev) => [optimistic, ...prev]);
    },
    [shouldShowInAppNotifications]
  );

  const addNotification = useCallback(
    async (n: NewNotification) => {
      const res: GenericAPIRes = await apiPost(`/notifications`, n);
      const data = await res.data;

      if (res?.ok && shouldShowInAppNotifications) {
        setNotifications((prev) => [data as AppNotification, ...prev]);
      }
    },
    [shouldShowInAppNotifications]
  );

  const initInAppNotifications = useCallback(async () => {
    if (!user || !shouldShowInAppNotifications) return;
    
    try {
      const res: GenericAPIRes = await apiGet("/notifications");

      const data = await res.data;
      if (res?.ok) {
        setNotifications(data as AppNotification[]);
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.error("[IN APP] ⛔️ Restore failed:", err);
    }
  }, [user]);

  const initPushNotifications = useCallback(async () => {
    if (!user) return;

    if (!user.subscription?.active && user.role!=="ADMIN") return;

    const isSecure = location.protocol === "https:" || location.hostname === "localhost";

    if (!isSecure) {
      if (process.env.NODE_ENV !== "production") console.warn("[PUSH] ⚠️ Notifications require HTTPS (localhost allowed for dev)");
      return;
    }

    if (!("serviceWorker" in navigator) || !("PushManager" in window) || typeof Notification === "undefined") {
      if (process.env.NODE_ENV !== "production") console.warn("[PUSH] 📵 Push/Notifications API not supported in this browser");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      if (process.env.NODE_ENV !== "production") console.log("[PUSH] 📣 Service Worker registered → scope:", registration.scope);

      let permission = Notification.permission;

      if (permission !== "granted") {
        if (process.env.NODE_ENV !== "production") console.log("[PUSH] 🚫 Permission not granted yet →", permission);
        return;
      }

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        const res: GenericAPIRes = await apiGet(`/notifications/push/public-key`);

        if (!res.ok) {
          const text = typeof res.data === "string"
            ? res.data
            : JSON.stringify(res.data ?? "No body");
          throw new Error(`VAPID fetch failed: ${res.status} – ${text.slice(0, 150)}`);
        }

        const publicKey = (await res.data as string);
        if (!publicKey) throw new Error("No VAPID public key");

        const applicationServerKey = urlBase64ToUint8Array(publicKey);

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
      }

      const subJson = subscription.toJSON();
      const saveRes: GenericAPIRes = await apiPost(
        `/notifications/push/subscribe`,
        {
          endpoint: subJson.endpoint,
          keys: subJson.keys,
        }
      );

      if (!saveRes.ok) {
        if (process.env.NODE_ENV !== "production") console.warn("[PUSH] Server save failed", saveRes.status);
      } else {
        if (process.env.NODE_ENV !== "production") console.log("[PUSH] 📣 Subscription registered successfully");
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.error("[PUSH] ⛔️ Setup failed:", err);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    initPushNotifications();
    initInAppNotifications();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        initPushNotifications();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [user, initPushNotifications]);

  const requestPushPermission = useCallback(async () => {
    if (typeof Notification === "undefined") return false;

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      if (process.env.NODE_ENV !== "production") console.log("[PUSH] 📣 Permission granted → attempting subscription now");

      await apiPatch(`/user/${user!.id}`, {
        data: { getPushNotifs: true }
      }) 

      await initPushNotifications();
    } else {
      if (process.env.NODE_ENV !== "production") console.log("[PUSH] 🚫 Permission denied/dismissed");
    }

    return permission === "granted";
  }, [initPushNotifications]); 

  const unsubscribePush = useCallback(async () => {
    if (typeof Notification === "undefined" || !("serviceWorker" in navigator)) {
      if (process.env.NODE_ENV !== "production") console.warn("[PUSH] 🆘 Cannot unsubscribe: APIs not available");
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        if (process.env.NODE_ENV !== "production") console.log("[PUSH] ⚠️ No active subscription to unsubscribe from");
        return true;
      }

      const unsubscribed = await subscription.unsubscribe();

      if (!unsubscribed) {
        if (process.env.NODE_ENV !== "production") console.warn("[PUSH] ⚠️ unsubscribe() returned false – may have failed");
      } else {
        if (process.env.NODE_ENV !== "production") console.log("[PUSH] ✔️ Successfully unsubscribed locally");
      }

      const deleteRes = await fetch(`${SERVER_URL}/notifications/push/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          endpoint: subscription.endpoint,
        }),
      });

      if (!deleteRes.ok) {
        if (process.env.NODE_ENV !== "production") console.warn("[PUSH] ⛔️ Server unsubscribe failed", deleteRes.status);
      } else {
        if (process.env.NODE_ENV !== "production") console.log("[PUSH] 📵 Server notified – subscription removed");
      }

      return unsubscribed;
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.error("[PUSH] ⛔️ Unsubscribe failed:", err);
      return false;
    }
  }, [user]);

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const markAsRead = useCallback(async (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );

    apiPatch(`/notifications/${id}/read`);
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    
    apiPatch('/notifications/read-all');
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(async () => {
    const previousNotifications = notifications;

    setNotifications([]);

    try {
      await apiDelete('/notifications/delete-all');
    } catch (error) {
      console.error('Failed to clear notifications:', error);
      setNotifications(previousNotifications);
    }
  }, [notifications]);

  useEffect(() => {
    if (!user) return;

    const push = (n: NewNotification) => addLocalNotification(n);

    const handlers: { [K in keyof AppEventMap]?: EventCallback<K> } = {
      "ticket:created": (p) =>
        push({
          title: "New ticket",
          message: `${p.title} — created by ${p.createdBy}`,
          type: "TICKET_CREATED",
          meta: { channel: "ticket", event: "created", ...p },
          severity: "success",
        }),

      "ticket:updated": (p) =>
        push({
          title: "Ticket update",
          message: `Ticket #${p.ticketId} was updated`,
          type: "TICKET_UPDATED",
          meta: { channel: "ticket", event: "updated", ...p },
          severity: "info",
        }),

      "ticket:due_soon": (p) =>
        push({
          title: "Ticket reminder",
          message: `Ticket #${p.ticketId} is due on ${new Date(p.dueDate).toLocaleString()}`,
          type: "TICKET_DUE_SOON",
          meta: { channel: "ticket", event: "due_soon", ...p },
          severity: "warning",
        }),

      "ticket:assigned": (p) =>
        push({
          title: "Ticket assigned",
          message: `Assigned to ${p.assignee ?? "a user"}`,
          type: "TICKET_ASSIGNED",
          meta: { channel: "ticket", event: "assigned", ...p },
          severity: "info",
        }),

      "ticket:comment": (p) =>
        push({
          title: "New comment",
          message: `Comment on ticket #${p.ticketId}`,
          type: "COMMENT_ADDED",
          meta: { channel: "ticket", event: "comment", ...p },
          severity: "info",
        }),

      "ticket:closed": (p) =>
        push({
          title: "Ticket closed",
          message: `Ticket #${p.ticketId} was closed`,
          type: "TICKET_CLOSED",
          meta: { channel: "ticket", event: "closed", ...p },
          severity: "info",
        }),

      "team:ticket:created": (p) =>
        push({
          title: "Team Ticket (NEW)",
          message: `Team ${p.teamId}- ticket ${p.ticketId} — created by ${p.createdBy ?? "someone"}`,
          type: "TICKET_CREATED",
          meta: { channel: "team-ticket", event: "created", ...p },
          severity: "success",
        }),

      "team:ticket:assigned": (p) =>
        push({
          title: "Team Ticket assigned",
          message: `Team ${p.teamId}- Assigned Ticket ${p.ticketId} to ${p.assignedTo ?? p.assignees?.[0] ?? "a user"}`,
          type: "TICKET_ASSIGNED",
          meta: { channel: "team-ticket", event: "assigned", ...p },
          severity: "info",
        }),

      "team:ticket:updated": (p) =>
        push({
          title: "Team Ticket update",
          message: `Team ${p.teamId}- Ticket ${p.ticketId} updated by ${p.updatedBy}`,
          type: "TICKET_UPDATED",
          meta: { channel: "team-ticket", event: "updated", ...p },
          severity: "info",
        }),

      "team:ticket:due_soon": (p) =>
        push({
          title: "Team Ticket reminder",
          message: `Team ${p.teamId}- Ticket ${p.ticketId} due on ${new Date(p.dueDate).toLocaleString()}`,
          type: "TICKET_DUE_SOON",
          meta: { channel: "team-ticket", event: "due_soon", ...p },
          severity: "warning",
        }),

      "team:ticket:comment": (p) =>
        push({
          title: "New comment in Team",
          message: `Team ${p.teamId}- Comment on ticket ${p.ticketId} by ${p.author ?? "someone"}`,
          type: "COMMENT_ADDED",
          meta: { channel: "team-ticket", event: "comment", ...p },
          severity: "info",
        }),

      "team:ticket:closed": (p) =>
        push({
          title: "Team Ticket closed",
          message: `Team ${p.teamId}- Ticket ${p.ticketId} closed by ${p.closedBy}`, // ← fixed template bug
          type: "TICKET_CLOSED",
          meta: { channel: "team-ticket", event: "closed", ...p },
          severity: "info",
        }),

      "subscription:payment-failed": (p) =>
        addNotification({
          title: "Payment failed",
          message: p.reason ?? "Unknown failure",
          type: "ALERT",
          meta: { channel: "subscription", event: "payment-failed", ...p },
          severity: "error",
        }),

      "subscription:renewal-upcoming": (p) =>
        addNotification({
          title: "Renewal upcoming",
          message: `Plan renews on ${p.renewDate}`,
          type: "ALERT",
          meta: { channel: "subscription", event: "renewal-upcoming", ...p },
          severity: "warning",
        }),

      "auth:new-device": (p) =>
        addNotification({
          title: "New device login",
          message: p.device,
          type: "SYSTEM",
          meta: { channel: "auth", event: "new-device", ...p },
          severity: "warning",
        }),
    };

    const unsubscribers = Object.entries(handlers).map(([event, handler]) =>
      AppEvents.on(event as keyof AppEventMap, handler as any)
    );

    return () => unsubscribers.forEach((off) => off());
  }, [addLocalNotification, addNotification, user]);

  const unreadCount = useMemo(() => notifications?.filter(n => !n?.read).length,
    [notifications]
  );

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
        unsubscribePush
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  }
  return ctx;
};
