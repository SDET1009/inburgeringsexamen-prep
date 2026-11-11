import { useEffect, useMemo, useRef, useState } from "react"
import { useI18n } from "../i18n"
import { knsQuestions, knsThemaMeta, type KnsQ, type KnsThema } from "../data/kns"
import { readAloud, stopSpeech, speechSupported } from "../lib/speech"
import Disclaimer from "../components/Disclaimer"

const PASS = 21 // DUO's own practice portal states: 21/30 required

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Mode = "keuze" | "thema" | "examen"

export default function KnsA1() {
  const { lang } = useI18n()
  const nl = lang === "nl"

  const [mode, setMode] = useState<Mode>("keuze")
  const [thema, setThema] = useState<KnsThema | "all">("all")

  // examen state
  const [pool, setPool] = useState<KnsQ[]>([])
  const [pos, setPos] = useState(0)
  const [picked, setPicked] = useState<Record<string, number>>({})
  const [left, setLeft] = useState(30 * 60)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  // immediate feedback for keuze/thema mode
  const [checked, setChecked] = useState<Record<string, 0 | 1 | 2>>({}) // 2 = just checked, show note

  const visible = useMemo(() => {
    if (mode === "examen") return pool
    const base = thema === "all" ? knsQuestions : knsQuestions.filter((q) => q.thema === thema)
    return base
  }, [mode, thema, pool])

  const q = visible[pos]

  useEffect(() => {
    if (running && !done) {
      const iv = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
      return () => clearInterval(iv)
    }
  }, [running, done])
  useEffect(() => {
    if (running && left === 0) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, running])

  useEffect(() => () => stopSpeech(), [])

  function start() {
    stopSpeech()
    setPicked({})
    setChecked({})
    setPos(0)
    setDone(false)
    if (mode === "examen") {
      setPool(shuffle(knsQuestions).slice(0, 30))
      setLeft(30 * 60)
      setRunning(true)
    } else {
      setRunning(false)
    }
  }

  function finish() {
    setRunning(false)
    setDone(true)
    stopSpeech()
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const score = visible.reduce((n, it) => n + (picked[it.id] === it.answer ? 1 : 0), 0)
  const answered = visible.filter((it) => picked[it.id] !== undefined).length

  function pick(oi: number) {
    if (!q || done || checked[q.id] === 2) return
    setPicked((p) => ({ ...p, [q.id]: oi }))
    if (mode !== "examen") {
      // immediate feedback
      setChecked((c) => ({ ...c, [q.id]: 2 }))
    }
  }

  const mm = String(Math.floor(left / 60)).padStart(2, "0")
  const ss = String(left % 60).padStart(2, "0")

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
        {nl ? "KNS oefenen (A1 buitenland)" : "KNS practice (A1 abroad)"}
      </h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        {nl
          ? "De KNS-toets hoort bij het Inburgeringsexamen in het buitenland: 30 vragen over de film 'Naar Nederland', 30 minuten, twee keuze-opties per vraag. De officiële vragen komen uit het fotoboek met 100 vragen; deze set bootst de stijl na met eigen tekeningen."
          : "The KNS test belongs to the civic integration exam abroad: 30 questions about the 'Naar Nederland' film, 30 minutes, two options per question. The official questions come from the 100-question photo book; this set mirrors the style with our own drawings."}
      </p>
      <Disclaimer />

      <p className="mt-3 rounded-lg border border-nl-blue bg-blue-50/60 px-4 py-3 text-sm">
        {nl ? (
          <>✅ Op het officiële DUO-oefenplatform geldt: <strong>21 van de 30 goed = geslaagd</strong>. Beschouw dat hier als richtlijn.</>
        ) : (
          <>✅ On DUO's official practice portal: <strong>21 of 30 correct = passed</strong>. Treat that here as a guideline.</>
        )}
      </p>

      {mode === "keuze" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <ModeCard title={nl ? "Alle 30 vragen" : "All 30 questions"} desc={nl ? "Willekeurige volgorde, directe feedback" : "Random order, instant feedback"} onStart={() => { setMode("thema"); setThema("all"); setPos(0); setPicked({}); setChecked({}); setDone(false) }} />
          <ModeCard title={nl ? "Per thema" : "By theme"} desc={nl ? "Kies één van de 7 thema's" : "Pick one of the 7 themes"} pickTheme onStart={(th) => { setMode("thema"); setThema(th ?? "samenleving"); setPos(0); setPicked({}); setChecked({}); setDone(false) }} />
          <ModeCard title={nl ? "Mock-examen 30 min" : "Mock exam 30 min"} desc={nl ? "30 vragen, nakijken aan het eind" : "30 questions, scored at the end"} onStart={start} />
        </div>
      )}

      {mode === "thema" && (
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={nl ? "Thema's" : "Themes"}>
          <ThemaChip active={thema === "all"} onClick={() => { setThema("all"); setPos(0); setPicked({}); setChecked({}) }} label={nl ? "Alle" : "All"} icon="🗺️" />
          {(Object.keys(knsThemaMeta) as KnsThema[]).map((c) => (
            <ThemaChip
              key={c}
              active={thema === c}
              onClick={() => { setThema(c); setPos(0); setPicked({}); setChecked({}) }}
              label={nl ? knsThemaMeta[c].nl : knsThemaMeta[c].en}
              icon={knsThemaMeta[c].icon}
            />
          ))}
        </div>
      )}

      {mode !== "keuze" && q && !done && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-soft">
              {pos + 1} / {visible.length}
              {q.officialDemo && (
                <span className="ml-2 rounded-full border border-line bg-white px-2 py-0.5 text-[11px]">
                  {nl ? "nabootsing publiek DUO-voorbeeld" : "modeled on DUO's public example"}
                </span>
              )}
            </p>
            {mode === "examen" && (
              <span className={`rounded-lg px-3 py-1 font-mono font-bold ${left < 300 ? "bg-red-100 text-danger" : "bg-white border border-line"}`}>
                ⏱ {mm}:{ss}
              </span>
            )}
          </div>

          <div className="mt-2 rounded-2xl border-2 border-nl-blue bg-white p-5 text-center">
            <img
              src={`./assets/knm/${q.image}.svg`}
              alt=""
              aria-hidden
              className="mx-auto h-44 w-auto sm:h-56"
              loading="lazy"
            />
            <p className="mt-3 text-lg font-bold text-ink">{q.question_nl}</p>
            {speechSupported() && (
              <button
                onClick={() => readAloud(q.question_nl)}
                className="mt-1 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-paper"
              >
                🔊 {nl ? "Voorlezen" : "Read aloud"}
              </button>
            )}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {q.options_nl.map((op, oi) => {
              const chosen = picked[q.id] === oi
              const show = checked[q.id] === 2 || mode === "examen" && false
              const correctPick = show && chosen && oi === q.answer
              const wrongPick = show && chosen && oi !== q.answer
              return (
                <button
                  key={op}
                  onClick={() => pick(oi)}
                  disabled={checked[q.id] === 2}
                  className={`rounded-xl border-2 px-4 py-4 text-left font-semibold transition ${
                    correctPick
                      ? "border-ok bg-green-50 text-ok"
                      : wrongPick
                        ? "border-danger bg-red-50 text-danger"
                        : chosen
                          ? "border-nl-blue bg-blue-50"
                          : "border-line bg-white hover:border-nl-blue"
                  }`}
                >
                  {op}
                  {correctPick && " ✓"}
                  {wrongPick && " ✗"}
                </button>
              )
            })}
          </div>

          {checked[q.id] === 2 && (
            <p className="mt-3 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink-soft">
              {nl ? q.note_nl : q.note_en}
            </p>
          )}

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => { setPos((p) => Math.max(0, p - 1)); stopSpeech() }}
              disabled={pos === 0}
              className="rounded-lg border border-line bg-white px-5 py-2.5 font-semibold disabled:opacity-40"
            >
              ← {nl ? "Vorige" : "Previous"}
            </button>
            {pos + 1 < visible.length ? (
              <button onClick={() => { setPos((p) => p + 1); stopSpeech() }} className="rounded-lg bg-nl-blue px-5 py-2.5 font-bold text-white hover:bg-nl-blue-dark">
                {nl ? "Volgende" : "Next"} →
              </button>
            ) : (
              mode === "examen" ? (
                <button onClick={finish} disabled={answered < visible.length} className="rounded-lg bg-nl-ok px-5 py-2.5 font-bold text-white disabled:opacity-40">
                  {nl ? `Inleveren (${answered}/${visible.length})` : `Submit (${answered}/${visible.length})`}
                </button>
              ) : (
                <button onClick={() => { setMode("keuze"); setRunning(false); stopSpeech() }} className="rounded-lg bg-nl-ok px-5 py-2.5 font-bold text-white">
                  ✓ {nl ? "Klaar" : "Done"}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {done && (
        <div ref={endRef} className="mt-5 rounded-xl border border-ok bg-green-50 p-5">
          <p className="text-2xl font-extrabold text-ink">
            {score}/{visible.length} — {score >= Math.ceil((visible.length * PASS) / 30) ? (nl ? "geslaagd! 🎉" : "passed! 🎉") : nl ? "nog oefenen 💪" : "keep practising 💪"}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {nl
              ? `Richtlijn: 21/30 goed zoals op het officiële oefenplatform (jouw score: ${score}/${visible.length}).`
              : `Guideline: 21/30 as on the official practice portal (your score: ${score}/${visible.length}).`}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(knsThemaMeta) as KnsThema[]).slice(0, 8).map((c) => {
              const qs = visible.filter((it) => it.thema === c)
              if (!qs.length) return null
              const ok = qs.filter((it) => picked[it.id] === it.answer).length
              return (
                <div key={c} className="rounded-lg border border-line bg-white px-3 py-2 text-sm">
                  <p className="font-semibold">{knsThemaMeta[c].icon} {nl ? knsThemaMeta[c].nl : knsThemaMeta[c].en}</p>
                  <p className="tabular-nums text-ink-soft">{ok}/{qs.length}</p>
                </div>
              )
            })}
          </div>
          <button onClick={() => { setDone(false); setMode("keuze"); setPool([]); }} className="mt-4 rounded-lg border border-line bg-white px-5 py-2 font-semibold">
            ← {nl ? "Terug naar keuze" : "Back to menu"}
          </button>
        </div>
      )}

      <p className="mt-6 text-sm">
        <a className="font-semibold text-nl-blue underline underline-offset-2" href="https://www.oefenexamensduo.nl/" target="_blank" rel="noreferrer noopener">
          {nl ? "Officieel KNS-oefenexamen bij DUO (gratis) ↗" : "Official KNS practice exam at DUO (free) ↗"}
        </a>
      </p>
    </div>
  )
}

function ModeCard({ title, desc, onStart, pickTheme }: { title: string; desc: string; onStart: (th?: KnsThema | "all") => void; pickTheme?: boolean }) {
  const { lang } = useI18n()
  const nl = lang === "nl"
  const [ready, setReady] = useState(!pickTheme)
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{desc}</p>
      {pickTheme && ready && (
        <select
          aria-label={nl ? "Kies thema" : "Choose theme"}
          className="mt-2 w-full rounded-lg border border-line bg-white px-2 py-2 text-sm"
          onChange={(e) => onStart(e.target.value as KnsThema)}
          defaultValue=""
        >
          <option value="" disabled>{nl ? "Kies thema…" : "Choose theme…"}</option>
          <option value="all">{nl ? "Alle thema's" : "All themes"}</option>
          {(Object.keys(knsThemaMeta) as KnsThema[]).map((c) => (
            <option key={c} value={c}>{nl ? knsThemaMeta[c].nl : knsThemaMeta[c].en}</option>
          ))}
        </select>
      )}
      <button onClick={() => { if (pickTheme && !ready) { setReady(true); return } onStart() }} className="mt-3 w-full rounded-lg bg-nl-blue px-4 py-2.5 font-bold text-white hover:bg-nl-blue-dark">
        {pickTheme && !ready ? (nl ? "Kies thema ↓" : "Choose theme ↓") : nl ? "Start" : "Start"}
      </button>
    </div>
  )
}

function ThemaChip({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-sm font-medium ${active ? "border-nl-blue bg-nl-blue text-white" : "border-line bg-white hover:bg-paper"}`}
    >
      <span aria-hidden className="mr-1">{icon}</span>
      {label}
    </button>
  )
}
