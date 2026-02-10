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

const NotificationsContext =
  createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (!user) return;

    fetch(`${SERVER_URL}/notifications`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${user?.accessToken}`, }
    })
    .then(res => res.json())
    .then(data => {
      if (data?.ok) setNotifications(data.notifications);
    })
    .catch(() => {});
  }, [user]);

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

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications]
  );


  const requestPushPermission = useCallback(async () => {
    if (typeof Notification === "undefined") return;
    return (await Notification.requestPermission()) === "granted";
  }, []);

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
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  }
  return ctx;
};
