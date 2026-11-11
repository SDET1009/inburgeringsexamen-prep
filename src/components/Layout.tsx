import { useState, type ReactNode } from "react"
import { NavLink, Link } from "react-router-dom"
import { useI18n } from "../i18n"

const links = [
  { to: "/", key: "home" },
  { to: "/knm", key: "knm" },
  { to: "/woorden", key: "woorden" },
  { to: "/a1", key: "a1" },
  { to: "/a2", key: "a2" },
  { to: "/b1", key: "b1" },
  { to: "/bronnen", key: "bronnen" },
  { to: "/examen-data", key: "data" },
] as const

export default function Layout({ children }: { children: ReactNode }) {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive ? "bg-nl-blue text-white" : "text-ink hover:bg-line/60"
    }`

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded"
      >
        {t.nav.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-nl-blue">
            <span aria-hidden className="grid h-8 w-8 place-items-center rounded-md bg-nl-blue text-white text-sm">
              IO
            </span>
            <span className="hidden sm:inline">{t.meta.title}</span>
            <span className="sr-only sm:hidden">{t.meta.title}</span>
          </Link>

          <button
            className="ml-auto rounded-md border border-line px-3 py-2 text-sm font-medium"
            aria-expanded={open}
            aria-controls="mainnav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"} <span className="hidden sm:inline">{open ? "Sluiten" : "Menu"}</span>
          </button>

          <div className="flex items-center gap-1 text-sm" role="group" aria-label={t.nav.langLabel}>
            {(["nl", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-md px-2 py-1 ${
                  lang === l ? "bg-nl-blue text-white" : "text-ink-soft hover:bg-line/60"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {open && (
          <nav id="mainnav" aria-label="Hoofdmenu" className="border-t border-line px-4 py-2">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={navClass} onClick={() => setOpen(false)}>
                    {t.nav[l.key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav className="hidden lg:block px-4 pb-2">
          <ul className="mx-auto flex max-w-5xl flex-wrap gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={navClass}>
                  {t.nav[l.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-ink-soft">
          <p className="font-semibold text-ink">{t.footer.disclaimer}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-ink">{t.footer.official}</p>
              <ul className="mt-1 space-y-1">
                <li><a className="text-nl-blue underline" href="https://www.inburgeren.nl/examen-doen/" target="_blank" rel="noreferrer noopener">inburgeren.nl</a> (A1/A2/KNM)</li>
                <li><a className="text-nl-blue underline" href="https://www.staatsexamensnt2.nl/" target="_blank" rel="noreferrer noopener">staatsexamensnt2.nl</a> (NT2)</li>
                <li><a className="text-nl-blue underline" href="https://www.naarnederland.nl/" target="_blank" rel="noreferrer noopener">naarnederland.nl</a> (A1)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">{t.footer.contact}</p>
              <p className="mt-1">{t.footer.duo}</p>
              <p>{t.footer.cvte}</p>
              <p className="mt-2 text-xs">{t.footer.rights}</p>
            </div>
          </div>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} {t.meta.title} · {lang.toUpperCase()}</p>
        </div>
      </footer>
    </div>
  )
}
