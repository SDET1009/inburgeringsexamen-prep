import { useMemo, useState } from "react"
import { useI18n } from "../i18n"
import { woorden, catMeta, type WoordCat } from "../data/woorden"
import { loadSrs, saveSrs, applyGrade, buildQueue, stats, todayKey, type Grade } from "../lib/srs"
import { readAloud, speechSupported } from "../lib/speech"
import Disclaimer from "../components/Disclaimer"

export default function Woorden() {
  const { lang } = useI18n()
  const nl = lang === "nl"
  const allIds = useMemo(() => woorden.map((w) => w.id), [])

  const [store, setStore] = useState(() => loadSrs())
  const [catFilter, setCatFilter] = useState<WoordCat | "all">("all")
  const [query, setQuery] = useState("")
  const [sessionIds, setSessionIds] = useState<string[]>([])
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const ids = useMemo(
    () => (catFilter === "all" ? allIds : woorden.filter((w) => w.cat === catFilter).map((w) => w.id)),
    [catFilter, allIds]
  )

  const st = stats(store, woorden.length)
  const q = buildQueue(store, ids)
  const target = q.reviewIds.length + q.newIds.length

  const word = woorden.find((w) => w.id === sessionIds[pos])

  function startSession() {
    const qs = buildQueue(store, ids)
    setSessionIds([...qs.reviewIds, ...qs.newIds])
    setPos(0)
    setFlipped(false)
  }

  function grade(g: Grade) {
    if (!word) return
    const isNew = !store.items[word.id] || store.items[word.id].reps === 0
    let next = applyGrade(store, word.id, g, isNew)
    setStore(next)
    setFlipped(false)
    if (g === "again") {
      // requeue at the end of this session
      setSessionIds((s) => [...s, word.id])
    }
    setPos((p) => p + 1)
    void next
  }

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase()
    if (!s) return []
    return woorden.filter(
      (w) =>
        (catFilter === "all" || w.cat === catFilter) &&
        (w.nl.toLowerCase().includes(s) || w.en.toLowerCase().includes(s))
    )
  }, [query, catFilter])

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
        {nl ? "Woordenschat – dagelijkse woorden" : "Vocabulary – daily words"}
      </h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        {nl
          ? "Leer elke dag nieuwe woorden met herhaling op de juiste momenten (spaced repetition). Je voortgang blijft bewaard op dit apparaat — geen account nodig."
          : "Learn new words every day with spaced repetition. Your progress is saved on this device — no account needed."}
      </p>

      <Disclaimer />

      {/* stats bar */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label={nl ? "Geleerd" : "Learned"} value={`${st.learned}/${st.total}`} />
        <Stat label={nl ? "Vandaag te oefenen" : "Due today"} value={String(st.due + Math.max(0, store.settings.newPerDay - store.doneNew))} />
        <Stat label={nl ? "Reeks" : "Streak"} value={`🔥 ${st.streak}`} />
        <Stat label={nl ? "Vandaag gedaan" : "Done today"} value={String(st.doneToday)} />
      </div>

      {/* new-words-per-day */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold">{nl ? "Nieuwe woorden per dag:" : "New words per day:"}</span>
        {[5, 10, 15, 20].map((n) => (
          <button
            key={n}
            onClick={() => {
              const next = { ...store, settings: { ...store.settings, newPerDay: n } }
              saveSrs(next)
              setStore(next)
            }}
            className={`rounded-full border px-3 py-1 font-semibold ${
              store.settings.newPerDay === n
                ? "border-nl-blue bg-nl-blue text-white"
                : "border-line bg-white hover:bg-paper"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* category chips */}
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={nl ? "Categorieën" : "Categories"}>
        <CatChip active={catFilter === "all"} onClick={() => setCatFilter("all")} label={nl ? "Alles" : "All"} icon="📚" />
        {(Object.keys(catMeta) as WoordCat[]).map((c) => (
          <CatChip
            key={c}
            active={catFilter === c}
            onClick={() => setCatFilter(c)}
            label={nl ? catMeta[c].nl : catMeta[c].en}
            icon={catMeta[c].icon}
          />
        ))}
      </div>

      {/* session */}
      {sessionIds.length === 0 ? (
        <div className="mt-5 rounded-xl border border-nl-blue bg-blue-50/60 p-5">
          <p className="font-bold text-ink">
            {target > 0
              ? nl
                ? `Je hebt ${target}woorden klaar vandaag (${q.reviewIds.length} herhaling + ${q.newIds.length} nieuw).`
                : `You have ${target} words ready today (${q.reviewIds.length} reviews + ${q.newIds.length} new).`
              : nl
                ? "Je bent bij voor vandaag! Er is nog niets te herhalen. Kom morgen terug of verlaag je dagdoel niet ;)"
                : "All caught up for today! Nothing to review yet. Come back tomorrow — or cheat a little by raising your daily goal ;)"
            }
          </p>
          {target > 0 && (
            <button
              onClick={startSession}
              className="mt-3 rounded-lg bg-nl-blue px-6 py-3 font-bold text-white hover:bg-nl-blue-dark"
            >
              {nl ? "Start sessie" : "Start session"} →
            </button>
          )}
        </div>
      ) : pos >= sessionIds.length ? (
        <div className="mt-5 rounded-xl border border-ok bg-green-50 p-5">
          <p className="text-xl font-extrabold text-ok">🎉 {nl ? "Sessie compleet!" : "Session complete!"}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {nl ? "Morgen komen de eerste herhalingen terug." : "Your first reviews come back tomorrow."}
          </p>
          <button
            onClick={() => setSessionIds([])}
            className="mt-3 rounded-lg border border-line bg-white px-5 py-2.5 font-semibold hover:bg-paper"
          >
            ← {nl ? "Terug" : "Back"}
          </button>
        </div>
      ) : (
        word && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm text-ink-soft">
              <span>
                {pos + 1} / {sessionIds.length}
              </span>
              <span className="rounded-full bg-white border border-line px-2 py-0.5 text-xs">
                {nl ? catMeta[word.cat].nl : catMeta[word.cat].en}
              </span>
            </div>
            <button
              onClick={() => setFlipped((f) => !f)}
              aria-live="polite"
              className="mt-2 w-full rounded-2xl border-2 border-nl-blue bg-white p-8 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold text-ink">{word.nl}</p>
              {flipped ? (
                <div className="mt-4">
                  <p className="text-xl font-semibold text-nl-blue">{word.en}</p>
                  {word.ex_nl && <p className="mt-3 italic text-ink-soft">“{word.ex_nl}”</p>}
                  <p className="mt-3 text-xs text-ink-soft">{nl ? "Klik om terug te draaien" : "Click to flip back"}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-ink-soft">{nl ? "Klik om de betekenis te zien" : "Click to see the meaning"}</p>
              )}
            </button>
            {speechSupported() && (
              <button
                onClick={() => readAloud(word.nl)}
                className="mt-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold hover:bg-paper"
              >
                🔊 {nl ? "Voorlezen" : "Read aloud"}
              </button>
            )}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button onClick={() => grade("again")} className="rounded-lg bg-red-100 px-3 py-3 font-bold text-danger hover:bg-red-200">
                {nl ? "Nog eens" : "Again"}
              </button>
              <button onClick={() => grade("good")} className="rounded-lg bg-nl-blue px-3 py-3 font-bold text-white hover:bg-nl-blue-dark">
                {nl ? "Goed" : "Good"}
              </button>
              <button onClick={() => grade("easy")} className="rounded-lg bg-green-100 px-3 py-3 font-bold text-ok hover:bg-green-200">
                {nl ? "Makkelijk" : "Easy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-ink-soft">
              {nl
                ? "“Nog eens” zie je dit woord zo weer. “Goed” en “Makkelijk” plannen de volgende herhaling verder weg."
                : "“Again” shows this word again this session. “Good” and “Easy” schedule the next review further out."}
            </p>
          </div>
        )
      )}

      {/* search */}
      <div className="mt-8">
        <button
          onClick={() => setSearchOpen((o) => !o)}
          className="font-semibold text-nl-blue underline underline-offset-2"
        >
          {searchOpen ? "✕" : "🔍"} {nl ? "Zoek in alle woorden" : "Search all words"}
        </button>
        {searchOpen && (
          <>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={nl ? "Typ een woord (NL of EN)…" : "Type a word (NL or EN)…"}
              aria-label={nl ? "Zoek woorden" : "Search words"}
              className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5"
            />
            <ul className="mt-2 max-h-96 overflow-auto rounded-lg border border-line bg-white">
              {filtered.map((w) => {
                const it = store.items[w.id]
                const status = !it || it.reps === 0 ? "•" : it.interval >= 21 ? "★" : "◐"
                return (
                  <li key={w.id} className="flex items-baseline gap-2 border-b border-line/60 px-3 py-2 text-sm last:border-0">
                    <span aria-hidden className={it && it.reps > 0 ? "text-ok" : "text-ink-soft"} title={nl ? "status" : "status"}>
                      {status}
                    </span>
                    <span className="font-semibold">{w.nl}</span>
                    <span className="text-ink-soft">{w.en}</span>
                  </li>
                )
              })}
              {query && filtered.length === 0 && (
                <li className="px-3 py-3 text-sm text-ink-soft">{nl ? "Niets gevonden." : "Nothing found."}</li>
              )}
            </ul>
            <p className="mt-1 text-xs text-ink-soft">• {nl ? "nieuw" : "new"} · ◐ {nl ? "leert" : "learning"} · ★ {nl ? "beheerst" : "mature"}</p>
          </>
        )}
      </div>

      {/* sources */}
      <section className="mt-8 rounded-xl border border-line bg-white p-4">
        <h2 className="font-bold">{nl ? "Woordlijsten & bronnen" : "Word lists & sources"}</h2>
        <p className="mt-1 text-sm text-ink-soft">
          {nl
            ? "Deze A1-woordenschat is zelf samengesteld (geen overname uit betaalde methodes). Voor uitgebreidere officiële lijsten:"
            : "This A1 vocabulary is self-curated (nothing copied from paid methods). For the broader official lists:"}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm">
          <li>
            •{" "}
            <a className="font-semibold text-nl-blue underline underline-offset-2" href="https://www.staatsexamensnt2.nl/documenten" target="_blank" rel="noreferrer noopener">
              CvTE – Aanvullende woordenlijst NT2
            </a>{" "}
            {nl ? "(officiële PDF, vernieuwd 01-11-2026)" : "(official PDF, renewed 01-11-2026)"}
          </li>
          <li>
            •{" "}
            <a className="font-semibold text-nl-blue underline underline-offset-2" href="https://inburgeringa1.nl/" target="_blank" rel="noreferrer noopener">
              inburgeringa1.nl
            </a>{" "}
            {nl
              ? "– gratis A1-lesmateriaal met 1200 basiswoorden, video en audio (Ad Appel; eigen account nodig)"
              : "– free A1 material with 1200 basic words, video and audio (Ad Appel; own account required)"}
          </li>
          <li>
            •{" "}
            <a className="font-semibold text-nl-blue underline underline-offset-2" href="https://www.naarnederland.nl/zelfstudiepakket" target="_blank" rel="noreferrer noopener">
              Naar Nederland – zelfstudiepakket
            </a>{" "}
            {nl ? "(officieel A1-studiepakket, vele talen)" : "(official A1 self-study package, many languages)"}
          </li>
        </ul>
        <p className="mt-2 text-xs text-ink-soft">
          {nl
            ? `Voortgang lokaal opgeslagen (${todayKey()}).`
            : `Progress stored locally (${todayKey()}).`}
        </p>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-3">
      <p className="text-xs font-semibold uppercase text-ink-soft">{label}</p>
      <p className="mt-0.5 text-lg font-bold tabular-nums text-ink">{value}</p>
    </div>
  )
}

function CatChip({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-sm font-medium ${
        active ? "border-nl-blue bg-nl-blue text-white" : "border-line bg-white hover:bg-paper"
      }`}
    >
      <span aria-hidden className="mr-1">{icon}</span>
      {label}
    </button>
  )
}
