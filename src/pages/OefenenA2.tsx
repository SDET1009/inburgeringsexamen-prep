import { useEffect, useMemo, useRef, useState } from "react"
import { useI18n } from "../i18n"
import { A2_SETS, SCHRIJVEN_PDFS, LEZEN_DRILL, LUISTER_DRILL, SPREKEN_TAAK } from "../data/a2"
import { readAloud, stopSpeech as cancelSpeech, speechSupported } from "../lib/speech"
import Disclaimer from "../components/Disclaimer"

type Tab = "overzicht" | "lezen" | "luisteren" | "spreken"

export default function OefenenA2() {
  const { lang } = useI18n()
  const nl = lang === "nl"
  const [tab, setTab] = useState<Tab>("overzicht")

  useEffect(() => () => cancelSpeech(), [])

  const tabs: { id: Tab; nl: string; en: string; icon: string }[] = [
    { id: "overzicht", nl: "Officiële sets", en: "Official sets", icon: "🏛️" },
    { id: "lezen", nl: "Lezen trainen", en: "Reading drill", icon: "📖" },
    { id: "luisteren", nl: "Luisteren trainen", en: "Listening drill", icon: "🎧" },
    { id: "spreken", nl: "Spreken trainen", en: "Speaking drill", icon: "🎤" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
        {nl ? "Oefenen A2 (inburgering in Nederland)" : "Practice A2 (civic integration in the Netherlands)"}
      </h1>
      <p className="mt-2 max-w-3xl text-ink-soft">
        {nl
          ? "De officiële gratis oefenexamens van DUO (12 online sets + 3 Schrijven-PDF's) staan onder 'Officiële sets'. Onze eigen trainers nahetsen de opzet: Lezen met een 65-minuutentimer, Luisteren één keer afspelen, Spreken met 20/30-seconden-opdrachten."
          : "DUO's official free practice exams (12 online sets + 3 writing PDFs) are under 'Official sets'. Our own trainers mirror the format: timed 65-min reading, play-once listening, 20/30-second speaking tasks."}
      </p>
      <Disclaimer />

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label={nl ? "Oefenen-onderdelen" : "Practice parts"}>
        {tabs.map((tb) => (
          <button
            key={tb.id}
            role="tab"
            aria-selected={tab === tb.id}
            onClick={() => { cancelSpeech(); setTab(tb.id) }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              tab === tb.id ? "border-nl-blue bg-nl-blue text-white" : "border-line bg-white hover:bg-paper"
            }`}
          >
            <span aria-hidden className="mr-1">{tb.icon}</span>
            {nl ? tb.nl : tb.en}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "overzicht" && <Overzicht />}
        {tab === "lezen" && <LezenTrainer />}
        {tab === "luisteren" && <LuisterenTrainer />}
        {tab === "spreken" && <SprekenTrainer />}
      </div>
    </div>
  )
}

function Overzicht() {
  const { lang } = useI18n()
  const nl = lang === "nl"
  return (
    <div className="space-y-6">
      {(Object.keys(A2_SETS) as (keyof typeof A2_SETS)[]).map((onderdeel) => (
        <section key={onderdeel}>
          <h2 className="text-lg font-bold capitalize text-ink">
            {onderdeel === "spreken" ? (nl ? "Spreken" : "Speaking") : onderdeel === "luisteren" ? (nl ? "Luisteren" : "Listening") : onderdeel === "knm" ? "KNM" : nl ? "Lezen" : "Reading"}
          </h2>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {A2_SETS[onderdeel].map((s) => (
              <a
                key={s.code}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-xl border border-line bg-white p-4 transition hover:border-nl-blue hover:shadow-sm"
              >
                <p className="font-bold text-ink">{nl ? s.naam : s.naamEn}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {s.Minuten} min · {s.Vragen}
                </p>
                <p className="mt-2 text-xs font-semibold text-nl-blue">{nl ? "Open bij DUO ↗" : "Open at DUO ↗"}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
      <section>
        <h2 className="text-lg font-bold text-ink">{nl ? "Schrijven (PDF)" : "Writing (PDF)"}</h2>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {SCHRIJVEN_PDFS.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-line bg-white p-4 transition hover:border-nl-blue hover:shadow-sm"
            >
              <p className="font-bold text-ink">📄 {nl ? p.naam : p.naamEn}</p>
              <p className="mt-2 text-xs font-semibold text-nl-blue">PDF ↗</p>
            </a>
          ))}
        </div>
      </section>
      <p className="rounded-lg border border-line bg-paper p-3 text-sm text-ink-soft">
        {nl
          ? "Tip: maak de officiële sets op het platform van DUO; daar zie je-na afloop je score. Deze website kopieert de officiële examens niet — only links."
          : "Tip: take the official sets on DUO's platform; you see your score there afterwards. This site does not copy official exams — links only."}
      </p>
    </div>
  )
}

function LezenTrainer() {
  const { lang } = useI18n()
  const nl = lang === "nl"
  const [running, setRunning] = useState(false)
  const [left, setLeft] = useState(65 * 60)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)
  const finishRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!running || done) return
    const iv = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(iv)
  }, [running, done])
  useEffect(() => {
    if (left === 0 && running) setDone(true)
  }, [left, running])

  const totalQ = useMemo(() => LEZEN_DRILL.reduce((n, tk) => n + tk.vragen.length, 0), [])
  const answeredAll = LEZEN_DRILL.every((tk) => tk.vragen.every((q) => picked[q.v] !== undefined))

  function finish() {
    setRunning(false)
    setDone(true)
    cancelSpeech()
    finishRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  function scoreOf(qv: string) {
    return picked[qv]
  }
  let correct = 0
  LEZEN_DRILL.forEach((tk) => tk.vragen.forEach((q) => { if (picked[q.v] === q.antwoord) correct++ }))

  const mm = String(Math.floor(left / 60)).padStart(2, "0")
  const ss = String(left % 60).padStart(2, "0")

  if (!running && !done) {
    return (
      <div className="rounded-xl border border-nl-blue bg-blue-50/60 p-5">
        <p className="font-bold">{nl ? `Lezen: ${LEZEN_DRILL.length} korte teksten, ${totalQ} vragen, 65 minuten.` : `Reading: ${LEZEN_DRILL.length} short texts, ${totalQ} questions, 65 minutes.`}</p>
        <p className="mt-1 text-sm text-ink-soft">
          {nl ? "De klok loopt door — zoals op het echte examen (25 vragen / 65 min; hier bekorte set)." : "The clock keeps running — like the real exam (25 questions / 65 min; this is a shorter set)."}
        </p>
        <button onClick={() => setRunning(true)} className="mt-3 rounded-lg bg-nl-blue px-6 py-3 font-bold text-white hover:bg-nl-blue-dark">
          {nl ? "Start 65:00" : "Start 65:00"}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className={`sticky top-14 z-10 rounded-lg px-4 py-2 font-mono text-lg font-bold ${left < 300 ? "bg-red-100 text-danger" : "bg-white border border-line"}`}>
        ⏱ {mm}:{ss}
      </div>
      {LEZEN_DRILL.map((tk, ti) => (
        <section key={tk.id} className={`mt-4 rounded-xl border bg-white p-5 ${ti === idx && !done ? "border-nl-blue" : "border-line"}`}>
          <h3 className="font-bold text-ink">{ti + 1}. {tk.titel}</h3>
          <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-ink">{tk.tekst}</p>
          {tk.vragen.map((q, qi) => (
            <fieldset key={q.v} className="mt-3">
              <legend className="font-semibold">{qi + 1}. {q.v}</legend>
              <div className="mt-1 space-y-1">
                {q.opties.map((op, oi) => {
                  const chosen = scoreOf(q.v) === oi
                  const show = done
                  const cls = show
                    ? oi === q.antwoord
                      ? "border-ok bg-green-50"
                      : chosen
                        ? "border-danger bg-red-50"
                        : "border-line bg-white"
                    : chosen
                      ? "border-nl-blue bg-blue-50"
                      : "border-line bg-white hover:bg-paper"
                  return (
                    <label key={op} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${cls}`}>
                      <input
                        type="radio"
                        name={q.v}
                        checked={scoreOf(q.v) === oi}
                        disabled={done}
                        onChange={() => setPicked((p) => ({ ...p, [q.v]: oi }))}
                      />
                      {op}
                      {show && oi === q.antwoord && <span className="ml-auto font-bold text-ok">✓</span>}
                    </label>
                  )
                })}
              </div>
              {done && <p className="mt-1 text-xs text-ink-soft">{q.uitleg}</p>}
            </fieldset>
          ))}
          {!done && ti === LEZEN_DRILL.length - 1 && (
            <button onClick={finish} disabled={!answeredAll} className="mt-3 rounded-lg bg-nl-ok px-5 py-2.5 font-bold text-white disabled:opacity-40">
              {nl ? "Inleveren" : "Submit"}
            </button>
          )}
        </section>
      ))}
      {done && (
        <div ref={finishRef} className="mt-4 rounded-xl border border-ok bg-green-50 p-5">
          <p className="text-xl font-extrabold text-ok">
            {correct}/{totalQ} — {correct >= Math.ceil(totalQ * 0.7) ? (nl ? "sterk! 🎉" : "strong! 🎉") : nl ? "blijf oefenen 💪" : "keep practising 💪"}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {nl ? "Ter indicatie: op het echte A2-lezen haal je met ~70% een ruw ceuur van 24 (normeringsjaar 2024/2025)." : "Indication: on the real A2 reading, ~70% corresponds to a raw score of 24 (2024/2025 norming)."}
          </p>
          <button onClick={() => { setDone(false); setRunning(false); setPicked({}); setLeft(65 * 60); setIdx(0) }} className="mt-3 rounded-lg border border-line bg-white px-5 py-2 font-semibold">
            ↺ {nl ? "Opnieuw" : "Restart"}
          </button>
        </div>
      )}
    </div>
  )
}

function LuisterenTrainer() {
  const { lang } = useI18n()
  const nl = lang === "nl"
  const [played, setPlayed] = useState<Record<string, boolean>>({})
  const [picked, setPicked] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)

  const totalQ = useMemo(() => LUISTER_DRILL.reduce((n, f) => n + f.vragen.length, 0), [])
  let correct = 0
  LUISTER_DRILL.forEach((f) => f.vragen.forEach((q) => { if (picked[q.v] === q.antwoord) correct++ }))
  const answeredAll = LUISTER_DRILL.every((f) => f.vragen.every((q) => picked[q.v] !== undefined))

  function play(id: string, script: string) {
    if (played[id] || done) return
    setPlayed((p) => ({ ...p, [id]: true }))
    readAloud(script)
  }

  return (
    <div className="space-y-5">
      <p className="rounded-lg border border-nl-blue bg-blue-50/60 p-3 text-sm">
        {nl
          ? "🎧 Belangrijk: op het echte examen hoor je elk fragment maar één keer. Luister dus aandachtig! (Hier voorgelezen door de computer — de echte examens gebruiken natives.)"
          : "🎧 Important: on the real exam you hear each fragment only ONCE. Listen carefully! (Here read by the computer — real exams use native speakers.)"}
      </p>
      {!speechSupported() && (
        <p className="rounded-lg border border-warn bg-yellow-50 p-3 text-sm">{nl ? "Deze browser ondersteunt geen voorlezen (Web Speech API)." : "This browser does not support read-aloud (Web Speech API)."}</p>
      )}
      {LUISTER_DRILL.map((f, fi) => (
        <section key={f.id} className="rounded-xl border border-line bg-white p-5">
          <h3 className="font-bold text-ink">{fi + 1}. {f.setting}</h3>
          <button
            onClick={() => play(f.id, f.script)}
            disabled={played[f.id]}
            className="mt-2 rounded-lg border border-nl-blue px-4 py-2 text-sm font-bold text-nl-blue disabled:opacity-40"
          >
            {played[f.id] ? `🔇 ${nl ? "Al gespeeld (1× regel)" : "Already played (1× rule)"}` : `▶ ${nl ? "Speel af (één keer)" : "Play (once only)"}`}
          </button>
          {done && (
            <details className="mt-2 text-sm text-ink-soft" open>
              <summary className="cursor-pointer font-semibold">{nl ? "Toon tekst" : "Show transcript"}</summary>
              <p className="mt-1 italic">{f.script}</p>
            </details>
          )}
          {f.vragen.map((q, qi) => (
            <fieldset key={q.v} className="mt-3">
              <legend className="font-semibold">{qi + 1}. {q.v}</legend>
              <div className="mt-1 space-y-1">
                {q.opties.map((op, oi) => {
                  const chosen = picked[q.v] === oi
                  const cls = done
                    ? oi === q.antwoord
                      ? "border-ok bg-green-50"
                      : chosen
                        ? "border-danger bg-red-50"
                        : "border-line bg-white"
                    : chosen
                      ? "border-nl-blue bg-blue-50"
                      : "border-line bg-white hover:bg-paper"
                  return (
                    <label key={op} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${cls}`}>
                      <input type="radio" name={q.v} checked={chosen} disabled={done} onChange={() => setPicked((p) => ({ ...p, [q.v]: oi }))} />
                      {op}
                      {done && oi === q.antwoord && <span className="ml-auto font-bold text-ok">✓</span>}
                    </label>
                  )
                })}
              </div>
              {done && <p className="mt-1 text-xs text-ink-soft">{q.uitleg}</p>}
            </fieldset>
          ))}
        </section>
      ))}
      {!done ? (
        <button onClick={() => { setDone(true); cancelSpeech() }} disabled={!answeredAll} className="rounded-lg bg-nl-ok px-6 py-3 font-bold text-white disabled:opacity-40">
          {nl ? "Nakijken" : "Check answers"}
        </button>
      ) : (
        <div className="rounded-xl border border-ok bg-green-50 p-5">
          <p className="text-xl font-extrabold text-ok">{correct}/{totalQ}</p>
          <button onClick={() => { setDone(false); setPlayed({}); setPicked({}) }} className="mt-3 rounded-lg border border-line bg-white px-5 py-2 font-semibold">
            ↺ {nl ? "Opnieuw" : "Restart"}
          </button>
        </div>
      )}
    </div>
  )
}

function SprekenTrainer() {
  const { lang } = useI18n()
  const nl = lang === "nl"
  const [idx, setIdx] = useState(0)
  const [left, setLeft] = useState<number | null>(null)

  const taak = SPREKEN_TAAK[idx]

  useEffect(() => {
    if (left === null) return
    if (left <= 0) { setLeft(null); cancelSpeech(); return }
    const iv = setInterval(() => setLeft((s) => (s === null ? null : s - 1)), 1000)
    return () => clearInterval(iv)
  }, [left !== null])

  function start() {
    cancelSpeech()
    readAloud(taak.taak_nl)
    setLeft(taak.seconden)
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-line bg-white p-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
        {idx + 1} / {SPREKEN_TAAK.length} · {taak.seconden}s
      </p>
      <p className="mt-3 text-xl font-bold text-ink">{taak.taak_nl}</p>
      <p className="mt-2 text-sm text-ink-soft">💡 {nl ? taak.tip_nl : taak.tip_en}</p>
      {left !== null ? (
        <p className={`mt-4 font-mono text-5xl font-extrabold ${left <= 5 ? "text-danger" : "text-nl-blue"}`}>{left}</p>
      ) : (
        <button onClick={start} className="mt-4 rounded-lg bg-nl-blue px-8 py-3 text-lg font-bold text-white hover:bg-nl-blue-dark">
          🎤 {nl ? "Start taak" : "Start task"}
        </button>
      )}
      <div className="mt-5 flex justify-center gap-2">
        <button
          onClick={() => { setIdx((i) => Math.max(0, i - 1)); setLeft(null); cancelSpeech() }}
          disabled={idx === 0}
          className="rounded-lg border border-line px-4 py-2 font-semibold disabled:opacity-40"
        >
          ←
        </button>
        <button
          onClick={() => { setIdx((i) => Math.min(SPREKEN_TAAK.length - 1, i + 1)); setLeft(null); cancelSpeech() }}
          disabled={idx === SPREKEN_TAAK.length - 1}
          className="rounded-lg border border-line px-4 py-2 font-semibold disabled:opacity-40"
        >
          →
        </button>
      </div>
      <p className="mt-4 text-xs text-ink-soft">
        {nl
          ? "Spreken kun je niet automatisch nakijken. Neem jezelf op met je telefoon en vergelijk met de officiële Spreken-oefenexamens bij DUO (tab 'Officiële sets')."
          : "Speaking can't be auto-checked. Record yourself with your phone and compare with DUO's official speaking practice exams (tab 'Official sets')."}
      </p>
    </div>
  )
}
