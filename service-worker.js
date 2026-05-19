const CACHE_NAME = 'maqams-transition-v1';
const CORE_ASSETS = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icon.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                const isSameOrigin = new URL(event.request.url).origin === self.location.origin;
                const isCoreAsset = CORE_ASSETS.some((asset) => event.request.url.endsWith(asset.replace('./', '/')));

                if (isSameOrigin && isCoreAsset) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                }

                return networkResponse;
            });
        })
    );
});