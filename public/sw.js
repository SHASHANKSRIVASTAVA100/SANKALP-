// Service Worker for Swachhta Sangam (AICTE PS-26195) PWA
const CACHE_NAME = 'swachhta-sangam-v4-fast';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.png',
  '/favicon.svg',
  '/logo.png',
  '/logo-emblem.png',
  '/logo-transparent.png',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.webmanifest'
];

// Install Event: Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up older caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-first with fast fallback; bypass API and dynamic calls
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Bypass non-http, API requests, WebSockets, or Vite dev requests
  if (!url.startsWith('http') || url.includes('/api/') || url.includes('/@') || url.includes(':5173') || url.includes(':5000')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') return caches.match('/');
        });
      })
  );
});
