import { useI18n } from "../i18n"
import { resources } from "../data/resources"
import { Link } from "react-router-dom"

export default function Bronnen() {
  const { t, lang } = useI18n()
  const official = resources.filter((r) => r.official)
  const external = resources.filter((r) => !r.official)

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{t.bronnen.title}</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">{t.bronnen.intro}</p>

      <h2 className="mt-6 text-xl font-bold">✅ {t.bronnen.officialTitle}</h2>
      <ul className="mt-3 space-y-3">
        {official.map((r) => (
          <li key={r.name} className="rounded-xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-semibold text-ink">{r.name}</p>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-ok">
                {lang === "nl" ? "gratis & officieel" : "free & official"}
              </span>
              <a
                className="ml-auto font-semibold text-nl-blue underline underline-offset-2"
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.bronnen.open} ↗
              </a>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              <span className="font-semibold text-ink">{t.bronnen.why}:</span>{" "}
              {lang === "nl" ? r.nl : r.en}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-bold">🔗 {t.bronnen.commercialTitle}</h2>
      <p className="mt-1 text-sm text-ink-soft">
        {lang === "nl"
          ? "Niet-officieel, maar vaak handig. Betaalde bronnen kun je gerust zelf kopen; herpubliceren doen we niet."
          : "Unofficial, but often useful. You can of course buy paid sources yourself; we do not republish their content."}
      </p>
      <ul className="mt-3 space-y-3">
        {external.map((r) => (
          <li key={r.name} className="rounded-xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-semibold text-ink">{r.name}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  r.paid ? "bg-amber-100 text-warn" : "bg-blue-100 text-nl-blue"
                }`}
              >
                {r.paid ? (lang === "nl" ? "betaald" : "paid") : lang === "nl" ? "gratis" : "free"}
              </span>
              <a
                className="ml-auto font-semibold text-nl-blue underline underline-offset-2"
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.bronnen.open} ↗
              </a>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              <span className="font-semibold text-ink">{t.bronnen.why}:</span>{" "}
              {lang === "nl" ? r.nl : r.en}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/knm" className="rounded-lg bg-nl-blue px-5 py-2.5 font-semibold text-white hover:bg-nl-blue-dark">
          {t.home.startKnm} →
        </Link>
        <Link to="/examen-data" className="rounded-lg border border-line bg-white px-5 py-2.5 font-semibold hover:bg-paper">
          {t.nav.data} →
        </Link>
      </div>
    </div>
  )
}
