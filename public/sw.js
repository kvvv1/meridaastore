const CACHE_NAME = "mf-store-v1"
const urlsToCache = [
  "/",
  "/produtos",
  "/conta",
  "/carrinho",
  "/mf-store-logo.jpg",
  "/elegant-midi-dress-woman.png",
  "/elegant-structured-blazer.png",
  "/elegant-long-party-dress.png",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Handle offline actions like adding to cart, wishlist, etc.
  return new Promise((resolve) => {
    // Sync logic here
    resolve()
  })
}

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nova promoção disponível!",
    icon: "/mf-store-logo.jpg",
    badge: "/mf-store-logo.jpg",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver Promoção",
        icon: "/mf-store-logo.jpg",
      },
      {
        action: "close",
        title: "Fechar",
        icon: "/mf-store-logo.jpg",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Merida Store", options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/produtos"))
  }
})
