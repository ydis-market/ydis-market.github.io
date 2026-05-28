// ============================
// Service Worker — YDis Market
// Archivo: sw.js
// Ubicación: misma carpeta que index.html
// ============================

self.addEventListener('install', event => {
  console.log('YDis SW: Instalado ✅');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('YDis SW: Activado ✅');
  self.clients.claim();
});

self.addEventListener('push', event => {
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(data.title || 'YDis Market', {
      body: data.body || '¡Nueva notificación!',
      icon: data.icon || '/logo.png',
      badge: data.badge || '/logo.png',
      tag: data.tag || 'ydis-default',
      requireInteraction: false,
      actions: data.actions || []
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
