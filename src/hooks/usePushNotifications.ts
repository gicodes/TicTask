"use client";

import { useEffect, useCallback } from "react";
import { useAuth } from "@/providers/auth";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const usePushNotifications = () => {
  const { user } = useAuth();

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

  const subscribeUser = useCallback(async () => {
    if (!user) return;
    if (user.userType==="PERSONAL" && !user.subscription?.active) return;

    if (user.userType==="BUSINESS" && !user.subscription?.active) return;

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("[PUSH] 📣 Push notifications not supported in this browser");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      // console.log("[PUSH] 📣 Service Worker registered:", registration);

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        const res = await fetch(`${SERVER_URL}/notifications/push/public-key`)

        if (!res.ok) throw new Error("Failed to get public key");
        const { publicKey } = await res.json();

        const convertedVapidKey = urlBase64ToUint8Array(publicKey);

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
      }

      const subJson = subscription.toJSON();
      const response = await fetch(`${SERVER_URL}/notifications/push/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          endpoint: subJson.endpoint,
          keys: {
            p256dh: subJson.keys?.p256dh,
            auth: subJson.keys?.auth,
          },
        }),
      });

      if (!response.ok) {
        console.error("Failed to save subscription");
      } else {
        console.log("[PUSH] 📣 Push subscription saved");
      }
    } catch (err) {
      console.error("Push subscription error:", err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (Notification.permission === "granted") {
        subscribeUser();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") subscribeUser();
        });
      }
    }
  }, [user, subscribeUser]);

  return { subscribeUser };
};
