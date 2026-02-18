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

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const initPushNotifications = useCallback(async () => {
    if (!user) return;

    if (!user.subscription?.active && !user.data?.approved) return;

    const isSecure = location.protocol === "https:" || location.hostname === "localhost";

    if (!isSecure) {
      console.warn("[PUSH] ⚠️ Notifications require HTTPS (localhost allowed for dev)");
      return;
    }

    if (!("serviceWorker" in navigator) || !("PushManager" in window) || typeof Notification === "undefined") {
      console.warn("[PUSH] 📵 Push/Notifications API not supported in this browser");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      console.log("[PUSH] 📣 Service Worker registered → scope:", registration.scope);

      let permission = Notification.permission;
      if (permission !== "granted") {
        console.log("[PUSH] 🚫 Permission not granted yet →", permission);
        return;
      }

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        const res = await fetch(`${SERVER_URL}/notifications/push/public-key`, {
          credentials: "include",
          headers: user?.accessToken ? { Authorization: `Bearer ${user.accessToken}` } : {},
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "No body");
          throw new Error(`VAPID fetch failed: ${res.status} – ${text.slice(0, 150)}`);
        }

        const { publicKey } = await res.json();
        if (!publicKey) throw new Error("No VAPID public key");

        const applicationServerKey = urlBase64ToUint8Array(publicKey);

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
      }

      const subJson = subscription.toJSON();
      const saveRes = await fetch(`${SERVER_URL}/notifications/push/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          endpoint: subJson.endpoint,
          keys: subJson.keys,
        }),
      });

      if (!saveRes.ok) {
        console.warn("[PUSH] Server save failed", saveRes.status);
      } else {
        console.log("[PUSH] 📣 Subscription registered successfully");
      }
    } catch (err) {
      console.error("[PUSH] ⛔️ Setup failed:", err);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    initPushNotifications();

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
      console.log("[PUSH] 📣 Permission granted → attempting subscription now");
      await initPushNotifications();
    } else {
      console.log("[PUSH] 🚫 Permission denied/dismissed");
    }

    return permission === "granted";
  }, [initPushNotifications]); 

  const unsubscribePush = useCallback(async () => {
    if (typeof Notification === "undefined" || !("serviceWorker" in navigator)) {
      console.warn("[PUSH] 🆘 Cannot unsubscribe: APIs not available");
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        console.log("[PUSH] ⚠️ No active subscription to unsubscribe from");
        return true;
      }

      const unsubscribed = await subscription.unsubscribe();

      if (!unsubscribed) {
        console.warn("[PUSH] ⚠️ unsubscribe() returned false – may have failed");
      } else {
        console.log("[PUSH] ✔️ Successfully unsubscribed locally");
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
        console.warn("[PUSH] ⛔️ Server unsubscribe failed", deleteRes.status);
      } else {
        console.log("[PUSH] 📵 Server notified – subscription removed");
      }

      return unsubscribed;
    } catch (err) {
      console.error("[PUSH] ⛔️ Unsubscribe failed:", err);
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

  const addNotification = useCallback(async (n: NewNotification) => {
    const res = await fetch(`${SERVER_URL}/notifications/${user?.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(n),
    });

    const data = await res.json();
    if (data?.ok) {
      setNotifications(prev => [data.notification, ...prev]);
    }
  }, []);

  const markAsRead = useCallback(async (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );

    fetch(`${SERVER_URL}/notifications/${id}/read`, { 
      method: "PATCH",
    });
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    
    fetch(`${SERVER_URL}/notifications/read-all`, { 
      method: "PATCH",
      credentials: "include",
      headers: { Authorization: `Bearer ${user?.accessToken}` }
    });
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (!user) return;

    const push = (n: NewNotification) => void addNotification(n);

    const handlers: {
      [K in keyof AppEventMap]: EventCallback<K>;
    } = {
      "ticket:created": p =>
        push({
          title: "New ticket",
          message: `${p.title} — created by ${p.createdBy}`,
          type: "TICKET_CREATED",
          meta: { channel: "ticket", event: "created", ...p },
          severity: 'success'
        }),

      "ticket:updated": p =>
        push({
          title: "Ticket update",
          message: `Ticket ${p.ticketId} was updated`,
          type: "TICKET_UPDATED",
          meta: { channel: "ticket", event: "updated", ...p },
          severity: 'info'
        }),

      "ticket:assigned": p =>
        push({
          title: "Ticket assigned",
          message: `Assigned to ${p.assignee ?? "a user"}`,
          type: "TICKET_ASSIGNED",
          meta: { channel: "ticket", event: "assigned", ...p },
          severity: 'info'
        }),

      "ticket:comment": p =>
        push({
          title: "New comment",
          message: `Comment on ticket ${p.ticketId}`,
          type: "COMMENT_ADDED",
          meta: { channel: "ticket", event: "comment", ...p },
          severity: 'info'
        }),

      "subscription:payment-failed": p =>
        push({
          title: "Payment failed",
          message: p.reason ?? "Unknown failure",
          type: "ALERT",
          meta: { channel: "subscription", event: "payment-failed", ...p },
          severity: 'error'
        }),

      "subscription:renewal-upcoming": p =>
        push({
          title: "Renewal upcoming",
          message: `Plan renews on ${p.renewDate}`,
          type: "ALERT",
          meta: { channel: "subscription", event: "renewal-upcoming", ...p },
          severity: 'warning'
        }),

      "auth:new-device": p =>
        push({
          title: "New device login",
          message: p.device,
          type: "SYSTEM",
          meta: { channel: "auth", event: "new-device", ...p },
          severity: 'warning'
        }),
    };

    const unsubscribers = Object.entries(handlers).map(([event, handler]) =>
      AppEvents.on(event as keyof AppEventMap, handler as any)
    );

    return () => unsubscribers.forEach(off => off());
  }, [addNotification, user]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length,
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
