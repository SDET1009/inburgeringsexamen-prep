/* Inburgeren Oefenen – service worker.
   Shell/navigation: network-first (so deploys appear immediately, offline still works).
   Static assets: cache-first (JS/CSS are content-hashed; bump CACHE for svg changes). */
const CACHE = "io-shell-v2"
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
]
const KNM_SVG = [
  "geschiedenis-dag","geschiedenis-kaart","geschiedenis-oorlog","geschiedenis-water",
  "instanties-belasting","instanties-digid","instanties-gezin","instanties-ind","instanties-oude","instanties-svb","instanties-uwv",
  "omgang-hand","omgang-klok","omgang-rang","omgang-vrouw",
  "onderwijs-basisschool","onderwijs-duo","onderwijs-routes","onderwijs-school",
  "staats-kamer","staats-keur","staats-kieshok","staats-koning",
  "werk-bureau","werk-inkomsten","werk-saar","werk-schade",
  "wonen-energie","wonen-huis","wonen-huishouden","wonen-sleutel",
  "zorg-alarm","zorg-apotheek","zorg-huisarts","zorg-praktijk","zorg-specialist","zorg-tolk","zorg-verzekering",
].map((n) => `./assets/knm/${n}.svg`)

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll([...SHELL, ...KNM_SVG]))
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

  const isNavigation = req.mode === "navigate" || url.pathname.endsWith("/index.html")

  if (isNavigation) {
    // network-first so users always get fresh deploys when online
    e.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE).then((c) => c.put(req, clone))
          return res
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("./index.html")))
    )
    return
  }

  // static: cache-first, revalidate in background
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
