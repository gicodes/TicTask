self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};

  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new update",
    icon: data.icon || "/favicon.ico",
    badge: "/favicon-16x16.png", 
    data: data.data || { url: "/" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); 

  const urlToOpen = event.notification.data?.url || "/"; 

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});