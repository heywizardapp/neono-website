/// <reference lib="webworker" />
/// <reference types="vite/client" />

declare const self: ServiceWorkerGlobalScope;

// Service Worker with caching strategies for NeonO
const CACHE_NAME = 'neono-v1';
const OFFLINE_URL = '/offline.html';

// Assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  // Add more core assets as needed
];

// Install event - precache core assets
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip tracking requests
  if (url.pathname.includes('/analytics') || 
      url.pathname.includes('/tracking') ||
      url.hostname.includes('google-analytics') ||
      url.hostname.includes('googletagmanager')) {
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Handle image requests  
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request, 'images', { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 }));
    return;
  }

  // Handle CSS and JS requests
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request, 'static-assets'));
    return;
  }

  // Handle API/JSON requests
  if (url.pathname.includes('/api/') || request.headers.get('accept')?.includes('application/json')) {
    event.respondWith(networkFirst(request, 'api-cache', 10000));
    return;
  }

  // Default: try network first
  event.respondWith(networkFirst(request));
});

// Network-first strategy with offline fallback
async function networkFirstWithOfflineFallback(request: Request): Promise<Response> {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful navigation responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match(OFFLINE_URL);
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

// Network-first strategy with timeout
async function networkFirst(request: Request, cacheName = CACHE_NAME, timeout = 5000): Promise<Response> {
  try {
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      )
    ]);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(
  request: Request, 
  cacheName = CACHE_NAME, 
  options: { maxEntries?: number; maxAgeSeconds?: number } = {}
): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch fresh version in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      // Update cache with fresh response
      cache.put(request, networkResponse.clone());
      
      // Clean up old entries if needed
      if (options.maxEntries) {
        cleanupCache(cacheName, options.maxEntries);
      }
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response or throw
    return cachedResponse || new Response('Network error', { status: 503 });
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    // Check if cached response is still fresh
    if (options.maxAgeSeconds) {
      const cachedDate = cachedResponse.headers.get('date');
      if (cachedDate) {
        const age = (Date.now() - new Date(cachedDate).getTime()) / 1000;
        if (age > options.maxAgeSeconds) {
          // Cached response is stale, wait for network
          return await fetchPromise;
        }
      }
    }
    
    return cachedResponse;
  }
  
  // No cached version, wait for network
  return fetchPromise;
}

// Clean up old cache entries
async function cleanupCache(cacheName: string, maxEntries: number) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    // Remove oldest entries (simple FIFO)
    const entriesToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(
      entriesToDelete.map(key => cache.delete(key))
    );
  }
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

export {};