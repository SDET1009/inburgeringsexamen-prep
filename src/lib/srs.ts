// Lightweight SRS (spaced repetition, SM-2 inspired) for the vocabulary trainer.
// All progress lives in localStorage under io:srs:v1 — no account needed.

export interface SrsItem {
  ease: number // start 2.5
  interval: number // days
  due: string // YYYY-MM-DD (local)
  reps: number
  lapses: number
}

export interface SrsStore {
  items: Record<string, SrsItem>
  settings: { newPerDay: number }
  day: string // YYYY-MM-DD the counters below belong to
  doneReviews: number
  doneNew: number
  streak: number
  lastActive: string
}

const KEY = "io:srs:v1"

export function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`
}

function yesterdayOf(key: string): string {
  const [y, m, d] = key.split("-").map(Number)
  const dt = new Date(y, m - 1, d - 1)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(
    dt.getDate()
  ).padStart(2, "0")}`
}

function addDays(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number)
  const dt = new Date(y, m - 1, d + n)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(
    dt.getDate()
  ).padStart(2, "0")}`
}

export function loadSrs(): SrsStore {
  const fresh: SrsStore = {
    items: {},
    settings: { newPerDay: 10 },
    day: todayKey(),
    doneReviews: 0,
    doneNew: 0,
    streak: 0,
    lastActive: "",
  }
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fresh
    const s = JSON.parse(raw) as SrsStore
    if (!s.items || !s.settings) return fresh
    if (s.day !== todayKey()) {
      // new day: reset daily counters
      s.day = todayKey()
      s.doneReviews = 0
      s.doneNew = 0
    }
    return s
  } catch {
    return fresh
  }
}

export function saveSrs(s: SrsStore) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* private mode */
  }
}

export type Grade = "again" | "good" | "easy"

export function applyGrade(s: SrsStore, id: string, g: Grade, isNew: boolean): SrsStore {
  const items = { ...s.items }
  const cur: SrsItem = items[id] ?? { ease: 2.5, interval: 0, due: todayKey(), reps: 0, lapses: 0 }
  const t = todayKey()
  let { ease, interval, reps, lapses } = cur
  if (g === "again") {
    lapses += 1
    ease = Math.max(1.3, ease - 0.2)
    interval = 0 // due again today
  } else {
    reps += 1
    if (g === "easy") ease = Math.min(3.2, ease + 0.15)
    interval = reps === 1 ? (g === "easy" ? 4 : 1) : reps === 2 ? (g === "easy" ? 7 : 3) : Math.round(interval * ease)
    if (g === "easy") interval += 1
  }
  items[id] = { ease, interval, due: addDays(t, interval), reps, lapses }

  const next: SrsStore = {
    ...s,
    items,
    day: t,
    doneReviews: s.doneReviews + (isNew ? 0 : 1),
    doneNew: s.doneNew + (isNew ? 1 : 0),
  }
  // streak
  if (s.lastActive !== t) {
    next.streak = s.lastActive === yesterdayOf(t) ? s.streak + 1 : 1
    next.lastActive = t
  }
  saveSrs(next)
  return next
}

export interface Queue {
  reviewIds: string[]
  newIds: string[]
}

export function buildQueue(s: SrsStore, wordIds: string[]): Queue {
  const t = todayKey()
  const reviewIds = wordIds
    .filter((id) => s.items[id] && s.items[id].reps > 0 && s.items[id].due <= t)
    .sort((a, b) => (s.items[a].due < s.items[b].due ? -1 : 1))
    .slice(0, 60)
  const seen = new Set(wordIds.filter((id) => s.items[id]))
  const fresh = wordIds.filter((id) => !seen.has(id))
  const room = Math.max(0, s.settings.newPerDay - s.doneNew)
  const newIds = fresh.slice(0, room)
  return { reviewIds, newIds }
}

export function stats(s: SrsStore, total: number) {
  const ids = Object.keys(s.items)
  const learned = ids.filter((id) => s.items[id].reps >= 1).length
  const mature = ids.filter((id) => s.items[id].interval >= 21).length
  const due = ids.filter((id) => s.items[id].reps > 0 && s.items[id].due <= todayKey()).length
  return { learned, mature, due, total, streak: s.streak, doneToday: s.doneReviews + s.doneNew }
}
