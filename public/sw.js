// Lightweight Service Worker for NeonO (public)
// Caches core assets and provides offline fallback

const CACHE_NAME = 'neono-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE_ASSETS = [
  '/',
  OFFLINE_URL,
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (
    url.pathname.includes('/analytics') ||
    url.pathname.includes('/tracking') ||
    url.hostname.includes('google-analytics') ||
    url.hostname.includes('googletagmanager')
  ) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request, 'images-cache'));
    return;
  }

  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request, 'static-cache'));
    return;
  }

  event.respondWith(networkFirst(request));
});

async function networkFirstWithOfflineFallback(request) {
  try {
    const res = await fetch(request);
    if (res && res.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, res.clone());
    }
    return res;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName = CACHE_NAME, timeout = 5000) {
  try {
    const res = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
    if (res && res.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, res.clone());
    }
    return res;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((res) => {
    if (res && res.status === 200) cache.put(request, res.clone());
    return res;
  }).catch(() => cached || new Response('Offline', { status: 503 }));

  return cached || fetchPromise;
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
