import { useEffect, useMemo, useRef, useState } from "react"
import type { KnmQuestion, ThemeKey } from "../data/types"
import { knmQuestions, SIM_TARGETS } from "../data/questions"
import { themeByKey } from "../data/themes"
import { useI18n } from "../i18n"
import { readAloud, stopSpeech, speechSupported } from "../lib/speech"
import { saveThemeResult, type Progress, loadProgress } from "../lib/storage"

export type Mode = "one" | "theme" | "sim"

const SIM_MINUTES = 45
const REF_LINE = 26 // practice guideline only; DUO publishes no official pass line

function pickWeighted(n: number): KnmQuestion[] {
  const pool = [...knmQuestions]
  const byTheme = (t: ThemeKey) => pool.filter((q) => q.theme === t)
  const out: KnmQuestion[] = []
  for (const [theme, count] of Object.entries(SIM_TARGETS) as [ThemeKey, number][]) {
    const avail = byTheme(theme)
    // shuffle then take `count` (never more than available)
    const shuffled = [...avail].sort(() => Math.random() - 0.5)
    out.push(...shuffled.slice(0, Math.min(count, shuffled.length)))
  }
  // if pool smaller than target (shouldn't happen), top up with random
  while (out.length < n) {
    const extra = knmQuestions.filter((q) => !out.includes(q))
    if (!extra.length) break
    out.push(extra[Math.floor(Math.random() * extra.length)])
  }
  return out.sort(() => Math.random() - 0.5).slice(0, n)
}

function randomFrom(list: KnmQuestion[]): KnmQuestion {
  return list[Math.floor(Math.random() * list.length)]
}

function fmt(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function Practice({ mode, theme }: { mode: Mode; theme?: ThemeKey }) {
  const { t, lang } = useI18n()
  const [qs, setQs] = useState<KnmQuestion[]>(() => {
    if (mode === "sim") return pickWeighted(40)
    if (mode === "theme" && theme)
      return [...knmQuestions.filter((q) => q.theme === theme)].sort(() => Math.random() - 0.5)
    return [randomFrom(knmQuestions)]
  })
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(qs.length).fill(null))
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(SIM_MINUTES * 60)
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const audioRef = useRef(0)

  const q = qs[idx]
  const isSingle = mode === "one"

  // countdown for the simulation
  useEffect(() => {
    if (mode !== "sim" || submitted) return
    audioRef.current = window.setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          window.clearInterval(audioRef.current)
          setSubmitted(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(audioRef.current)
  }, [mode, submitted])

  const select = (opt: number) => {
    if (submitted || (isSingle && checked[idx])) return
    setAnswers((a) => a.map((v, i) => (i === idx ? opt : v)))
  }

  const check = () => {
    if (answers[idx] == null) return
    setChecked((c) => ({ ...c, [idx]: true }))
    stopSpeech()
  }

  const next = () => {
    if (idx + 1 < qs.length) {
      setIdx(idx + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const finish = () => {
    stopSpeech()
    setSubmitted(true)
  }

  const restart = () => {
    stopSpeech()
    const fresh =
      mode === "sim"
        ? pickWeighted(40)
        : mode === "theme" && theme
          ? [...knmQuestions.filter((q) => q.theme === theme)].sort(() => Math.random() - 0.5)
          : [randomFrom(knmQuestions)]
    setQs(fresh)
    setIdx(0)
    setAnswers(Array(fresh.length).fill(null))
    setChecked({})
    setSubmitted(false)
    setTimeLeft(SIM_MINUTES * 60)
  }

  // persist per-theme stats when a session ends
  const persist = (all: boolean) => {
    const doneIdx = all ? qs.map((_, i) => i) : Object.keys(checked).map(Number)
    const byTheme = new Map<ThemeKey, { c: number; n: number }>()
    doneIdx.forEach((i) => {
      if (answers[i] == null) return
      const k = qs[i].theme
      const cur = byTheme.get(k) ?? { c: 0, n: 0 }
      cur.n += 1
      if (answers[i] === qs[i].answer) cur.c += 1
      byTheme.set(k, cur)
    })
    byTheme.forEach((v, k) => saveThemeResult(k, v.c, v.n))
    setProgress(loadProgress())
  }

  useEffect(() => {
    if (submitted && mode !== "one") persist(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  const score = useMemo(
    () => qs.reduce((acc, qq, i) => acc + (answers[i] === qq.answer ? 1 : 0), 0),
    [qs, answers]
  )
  const answeredCount = answers.filter((a) => a != null).length

  const read = () => {
    const text = `${q.question_nl}`
    const ok = readAloud(text, lang === "nl" ? "nl-NL" : "nl-NL")
    if (!ok) stopSpeech()
  }

  const themeLabel = (k: ThemeKey) => (lang === "nl" ? themeByKey[k].nlShort : themeByKey[k].enShort)

  return (
    <section aria-label={lang === "nl" ? "KNM-oefening" : "KNM practice"} className="mt-4">
      {/* status bar */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-ink">
          {t.knm.question} {idx + 1} {t.knm.of} {qs.length}
        </span>
        {mode === "sim" && (
          <span
            className={`ml-auto rounded-full px-3 py-1 font-bold tabular-nums ${
              timeLeft < 300 && !submitted
                ? "bg-red-100 text-bad"
                : "bg-line/70 text-ink"
            }`}
            aria-live="polite"
          >
            ⏱ {t.knm.timer}: {fmt(timeLeft)}
          </span>
        )}
        {submitted && (
          <span className="ml-auto rounded-full bg-nl-blue px-3 py-1 font-bold text-white">
            {t.knm.score}: {score}/{qs.length}
          </span>
        )}
      </div>

      {/* question card */}
      <article className="rounded-xl border border-line bg-white p-4 sm:p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
          <img
            src={`./assets/knm/${q.image}.svg`}
            alt=""
            aria-hidden="true"
            className="aspect-[4/3] w-full rounded-lg bg-paper"
            loading="lazy"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t.knm.themeLabel}: {lang === "nl" ? themeByKey[q.theme].nl : themeByKey[q.theme].en} ·{" "}
              {lang === "nl" ? themeByKey[q.theme].nlShort : themeByKey[q.theme].enShort}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{q.question_nl}</h3>
            {speechSupported() && (
              <button
                onClick={read}
                className="mt-2 rounded-md border border-line bg-paper px-3 py-1.5 text-sm font-medium hover:bg-line/60"
              >
                🔊 {t.knm.readAloud}
              </button>
            )}
          </div>
        </div>

        {/* options */}
        <fieldset className="mt-4">
          <legend className="sr-only">{q.question_nl}</legend>
          <div className="space-y-2" role="radiogroup" aria-label={t.knm.question}>
            {q.options_nl.map((opt, i) => {
              const selected = answers[idx] === i
              const isCorrect = submitted || checked[idx] ? i === q.answer : false
              const isWrongPick =
                (submitted || checked[idx]) && selected && i !== q.answer
              return (
                <button
                  key={i}
                  role="radio"
                  aria-checked={selected}
                  disabled={submitted || (isSingle && !!checked[idx])}
                  onClick={() => select(i)}
                  className={`w-full rounded-lg border-2 px-4 py-3 text-left text-base transition
                    ${
                      isCorrect
                        ? "border-ok bg-green-50 text-ink"
                        : isWrongPick
                          ? "border-bad bg-red-50 text-ink"
                          : selected
                            ? "border-nl-blue bg-blue-50"
                            : "border-line bg-white hover:border-nl-blue/50"
                    }
                    disabled:cursor-not-allowed`}
                >
                  <span
                    aria-hidden
                    className={`mr-3 inline-grid h-6 w-6 place-items-center rounded-full border-2 text-sm font-bold ${
                      isCorrect
                        ? "border-ok text-ok"
                        : isWrongPick
                          ? "border-bad text-bad"
                          : selected
                            ? "border-nl-blue text-nl-blue"
                            : "border-line text-ink-soft"
                    }`}
                  >
                    {isCorrect ? "✓" : isWrongPick ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {!submitted && (
            <>
              <button
                onClick={check}
                disabled={answers[idx] == null}
                className="rounded-lg bg-nl-blue px-5 py-2.5 font-semibold text-white disabled:opacity-40"
              >
                {t.knm.check}
              </button>
              {checked[idx] && !isSingle && (
                <button
                  onClick={next}
                  className="rounded-lg border border-line bg-white px-5 py-2.5 font-semibold hover:bg-paper"
                >
                  {t.knm.next} →
                </button>
              )}
              {idx + 1 < qs.length && (
                <button
                  onClick={finish}
                  className="ml-auto rounded-lg border border-line bg-white px-5 py-2.5 font-medium text-ink-soft hover:bg-paper"
                >
                  {t.knm.finish}
                </button>
              )}
            </>
          )}
          {checked[idx] && (
            <button
              onClick={restart}
              className="rounded-lg border border-line bg-white px-5 py-2.5 font-medium text-ink-soft hover:bg-paper"
            >
              ↻ {t.common.startOver}
            </button>
          )}
        </div>

        {/* feedback */}
        {(checked[idx] || submitted) && answers[idx] != null && (
          <div
            className={`mt-4 rounded-lg border p-4 ${
              answers[idx] === q.answer ? "border-ok bg-green-50" : "border-bad bg-red-50"
            }`}
            aria-live="polite"
          >
            <p className={`font-bold ${answers[idx] === q.answer ? "text-ok" : "text-bad"}`}>
              {answers[idx] === q.answer ? t.knm.correct : t.knm.wrong}
            </p>
            <p className="mt-2 text-ink">
              <strong>{t.knm.explanation}:</strong>{" "}
              {lang === "nl" ? q.explanation_nl : q.explanation_en}
            </p>
            <p className="mt-2 text-xs text-ink-soft">
              {t.knm.sourceLabel}: {t.knm.sourceOurs}
            </p>
          </div>
        )}
      </article>

      {/* results (simulation / theme) */}
      {submitted && mode !== "one" && <Results />}

      {/* per-theme stats */}
      <ThemeStats progress={progress} />

      <nav className="mt-3 flex gap-2" aria-label={lang === "nl" ? "Vragen" : "Questions"}>
        {qs.length <= 60 &&
          qs.map((_, i) => {
            const done = answers[i] != null
            const correct = answers[i] === qs[i].answer
            return (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`${t.knm.question} ${i + 1}${done ? (correct ? " (✓)" : " (✗)") : ""}`}
                className={`h-8 w-8 rounded-md text-xs font-bold ${
                  i === idx
                    ? "bg-nl-blue text-white"
                    : done
                      ? correct
                        ? "bg-green-200 text-ok"
                        : "bg-red-200 text-bad"
                      : "bg-line/60 text-ink-soft"
                }`}
              >
                {i + 1}
              </button>
            )
          })}
      </nav>
    </section>
  )

  function Results() {
    const total = qs.length
    const pct = Math.round((score / total) * 100)
    const passed = score >= REF_LINE
    return (
      <section className="mt-4 rounded-xl border border-line bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="text-xl font-bold">{t.knm.resultTitle}</h3>
        <div className="mt-3 flex items-end gap-6">
          <p className="text-5xl font-extrabold tabular-nums text-nl-blue">
            {score}<span className="text-2xl text-ink-soft">/{total}</span>
          </p>
          <p className={`text-lg font-semibold ${passed ? "text-ok" : "text-warn"}`}>
            {passed ? t.knm.failedRef : t.knm.passed}
          </p>
        </div>
        <div
          className="mt-4 h-4 w-full overflow-hidden rounded-full bg-line"
          role="img"
          aria-label={`${score} / ${total} (${pct}%)`}
        >
          <div
            className="h-full rounded-full bg-nl-blue"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-ink-soft">{t.knm.refLine}</p>
        <div className="mt-3 text-sm text-ink-soft">
          {answeredCount}/{total} {t.knm.answered.toLowerCase()}
        </div>

        {/* per-theme breakdown */}
        <h4 className="mt-4 font-semibold">{t.knm.themeStatsTitle}</h4>
        <ul className="mt-2 space-y-1.5">
          {(Object.keys(SIM_TARGETS) as ThemeKey[])
            .filter((k) => qs.some((qq) => qq.theme === k))
            .map((k) => {
              const subset = qs.filter((qq) => qq.theme === k)
              const c = subset.reduce((a, qq, i) => a + (answers[i] === qq.answer ? 1 : 0), 0)
              const n = subset.length
              const p = n ? Math.round((c / n) * 100) : 0
              return (
                <li key={k} className="flex items-center gap-2 text-sm">
                  <span className="w-32 shrink-0 text-ink-soft">{themeLabel(k)}</span>
                  <span className="h-3 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
                    <span
                      className={`block h-full rounded-full ${p >= 60 ? "bg-ok" : p >= 40 ? "bg-amber-500" : "bg-bad"}`}
                      style={{ width: `${p}%` }}
                    />
                  </span>
                  <span className="w-14 text-right tabular-nums">{c}/{n}</span>
                </li>
              )
            })}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={restart}
            className="rounded-lg bg-nl-blue px-5 py-2.5 font-semibold text-white"
          >
            ↻ {t.knm.retry}
          </button>
          <a
            href="https://www.inburgeren.nl/examen-doen/oefenen.jsp"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg border border-line bg-white px-5 py-2.5 font-semibold hover:bg-paper"
          >
            {t.knm.officialNow} ↗
          </a>
        </div>
      </section>
    )
  }
}

function ThemeStats({ progress }: { progress: Record<string, { correct: number; total: number }> }) {
  const { t, lang } = useI18n()
  const entries = Object.entries(progress)
  if (!entries.length) {
    return (
      <section className="mt-4 rounded-xl border border-line bg-white p-4 text-sm text-ink-soft">
        <h3 className="font-semibold text-ink">{t.knm.themeStatsTitle}</h3>
        <p className="mt-1">{t.knm.themeStatsEmpty}</p>
      </section>
    )
  }
  return (
    <section className="mt-4 rounded-xl border border-line bg-white p-4">
      <h3 className="font-semibold text-ink">{t.knm.themeStatsTitle}</h3>
      <p className="mt-1 text-xs text-ink-soft">{t.knm.themeStatsHint}</p>
      <ul className="mt-3 space-y-1.5">
        {entries.map(([k, v]) => {
          const info = themeByKey[k as ThemeKey]
          if (!info) return null
          const p = v.total ? Math.round((v.correct / v.total) * 100) : 0
          const label = lang === "nl" ? info.nlShort : info.enShort
          return (
            <li key={k} className="flex items-center gap-2 text-sm">
              <span className="w-32 shrink-0 text-ink-soft" aria-hidden>{info.icon} {label}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
                <span
                  className={`block h-full rounded-full ${p >= 60 ? "bg-ok" : p >= 40 ? "bg-amber-500" : "bg-bad"}`}
                  style={{ width: `${p}%` }}
                />
              </span>
              <span className="w-14 text-right tabular-nums">
                {v.correct}/{v.total}
              </span>
              <span className="sr-only">{p}%</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
