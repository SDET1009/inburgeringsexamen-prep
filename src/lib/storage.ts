// Anonymous progress in localStorage (no account; M3 may add accounts).
import type { ThemeKey } from "../data/types"

export interface ThemeStat {
  correct: number
  total: number
}

export interface Progress {
  [theme: string]: ThemeStat
}

const KEY = "io:knm-progress:v1"

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const p = JSON.parse(raw) as Progress
    return p && typeof p === "object" ? p : {}
  } catch {
    return {}
  }
}

export function saveThemeResult(theme: ThemeKey, correct: number, total: number): void {
  try {
    const p = loadProgress()
    const cur = p[theme] ?? { correct: 0, total: 0 }
    p[theme] = { correct: cur.correct + correct, total: cur.total + total }
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* private mode: ignore */
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
