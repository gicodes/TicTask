"use client";

import { useCallback } from "react";

export const usePushNotifications = () => {
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

  const forceSubscribe = useCallback(async () => {
    console.warn("[PUSH] 📣 Manual forceSubscribe called — prefer using context requestPushPermission");
  }, []);

  return {
    urlBase64ToUint8Array,
    forceSubscribe, 
  };
};