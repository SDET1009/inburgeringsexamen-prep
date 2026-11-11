/* Inburgeren Oefenen – service worker (app-shell cache, cache-first).
   Keeps the practice pages usable offline; always revalidates the shell. */
const CACHE = "io-shell-v1"
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/knm/werk-bureau.svg",
  "./assets/knm/zorg-huisarts.svg",
  "./assets/knm/wonen-huis.svg",
  "./assets/knm/instanties-gezin.svg",
]

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (e) => {
  const req = e.request
  if (req.method !== "GET") return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone()
            caches.open(CACHE).then((c) => c.put(req, clone))
          }
          return res
        })
        .catch(() => hit)
      return hit || fetchPromise
    })
  )
})
