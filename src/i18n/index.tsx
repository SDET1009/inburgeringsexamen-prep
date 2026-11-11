import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { nl, type Dict } from "./nl"
import { en } from "./en"

export type Lang = "nl" | "en"
const dicts: Record<Lang, Dict> = { nl, en }

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
  isRtl: boolean
}

const Ctx = createContext<I18n | null>(null)

const LANG_KEY = "io:lang"

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem(LANG_KEY)
      return s === "en" ? "en" : "nl"
    } catch {
      return "nl"
    }
  })
  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang: (l) => {
        setLang(l)
        try {
          localStorage.setItem(LANG_KEY, l)
        } catch {
          /* private mode */
        }
      },
      t: dicts[lang],
      isRtl: (["ar", "tr"] as string[]).includes(lang), // reserved for RTL locales
    }),
    [lang]
  )
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18n {
  const v = useContext(Ctx)
  if (!v) throw new Error("useI18n outside provider")
  return v
}
