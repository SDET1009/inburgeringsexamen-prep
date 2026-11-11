import { useI18n } from "../i18n"
import { cesuren, examStats, knmStats } from "../data/cesuren"

export default function ExamenData() {
  const { t, lang } = useI18n()
  const sorted = [...cesuren].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{t.data.title}</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">{t.data.intro}</p>

      {/* pass lines table */}
      <section className="mt-6" aria-labelledby="ces-h">
        <h2 id="ces-h" className="text-xl font-bold">
          📈 {t.data.tableTitle}
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-line bg-paper text-left">
                <th scope="col" className="px-4 py-2.5 font-semibold">{t.data.cols.part}</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">{t.data.cols.max}</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">{t.data.cols.raw}</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">{t.data.cols.year}</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">{t.data.cols.source}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={`${c.part}-${c.date}-${i}`} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-2.5 font-medium">{c.part}</td>
                  <td className="px-4 py-2.5 tabular-nums text-ink-soft">{c.max}</td>
                  <td className="px-4 py-2.5 font-semibold tabular-nums text-nl-blue">{c.raw}</td>
                  <td className="px-4 py-2.5 tabular-nums">{c.date}</td>
                  <td className="px-4 py-2.5 text-xs text-ink-soft">{c.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          {lang === "nl"
            ? "CvTE publiceert na elke zitting de ruw-ceuurs; de schaal (0–1000) en de ceuur (500) zijn per deel gelijk. We vullen dit bestand zodra nieuwe waarden zijn gepubliceerd."
            : "CvTE publishes the raw pass lines after every sitting; the scale (0–1000) and the pass line (500) are the same per part. We add entries as soon as new values are published."}
        </p>
      </section>

      {/* NT2 real exam characteristics */}
      <section className="mt-8" aria-labelledby="stat-h">
        <h2 id="stat-h" className="text-xl font-bold">
          🎯 {t.data.statsTitle}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">{t.data.statsIntro}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {examStats.map((s) => (
            <div key={s.part} className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-baseline gap-2">
                <p className="font-bold">{s.part}</p>
                <p className="ml-auto rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-bold text-nl-blue">
                  {s.figure}
                </p>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{lang === "nl" ? s.nl : s.en}</p>
              <p className="mt-1 text-xs text-ink-soft">— {s.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KNM official practice characteristics */}
      <section className="mt-8" aria-labelledby="knmstat-h">
        <h2 id="knmstat-h" className="text-xl font-bold">
          🇳🇱 {t.data.knmStatsTitle}
        </h2>
        <ul className="mt-3 space-y-2">
          {knmStats.map((s, i) => (
            <li key={i} className="rounded-lg border border-line bg-white px-4 py-2.5 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 rounded-lg border border-line bg-paper px-4 py-3 text-xs text-ink-soft">
        {t.data.sourceNote}
      </p>
    </div>
  )
}
