import { useState } from "react"
import { useI18n } from "../i18n"
import { themes, newTopics2025, situations } from "../data/themes"
import type { ThemeKey } from "../data/types"
import { knmQuestions, SIM_TARGETS } from "../data/questions"
import Practice, { type Mode } from "../components/Practice"
import Disclaimer from "../components/Disclaimer"

type Active = { mode: Mode; theme?: ThemeKey } | null

export default function Knm() {
  const { t, lang } = useI18n()
  const [active, setActive] = useState<Active>(null)

  const facts = [
    { icon: "❓", k: t.knm.facts.q, v: t.knm.facts.qv },
    { icon: "⏱️", k: t.knm.facts.t, v: t.knm.facts.tv },
    { icon: "💶", k: t.knm.facts.p, v: t.knm.facts.pv },
    { icon: "📊", k: t.knm.facts.s, v: t.knm.facts.sv },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{t.knm.title}</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">{t.knm.intro}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="rounded-lg border border-line bg-white p-3">
            <p className="text-xs font-semibold uppercase text-ink-soft">
              <span aria-hidden className="mr-1">{f.icon}</span>
              {f.k}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">{f.v}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-warn">
        ⚠️ {t.knm.passLineNote}
      </p>

      <a
        href="https://www.inburgeren.nl/examen-doen/oefenen.jsp"
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 inline-block rounded-lg bg-nl-blue px-5 py-3 font-semibold text-white hover:bg-nl-blue-dark"
      >
        {t.knm.officialLink} ↗
      </a>
      <p className="mt-2 text-sm text-ink-soft">{t.knm.officialNote}</p>

      <Disclaimer />

      {active ? (
        <>
          <button
            onClick={() => setActive(null)}
            className="mb-3 text-sm font-semibold text-nl-blue underline underline-offset-2"
          >
            ← {t.common.back}
          </button>
          <Practice key={active.mode + (active.theme ?? "")} mode={active.mode} theme={active.theme} />
        </>
      ) : (
        <>
          {/* practice modes */}
          <h2 className="mt-6 text-xl font-bold">{t.knm.practicesTitle}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <ModeCard
              title={t.knm.modes.one.t}
              body={t.knm.modes.one.b}
              cta={t.knm.modes.one.btn}
              onClick={() => setActive({ mode: "one" })}
            />
            <ModeCard
              title={t.knm.modes.theme.t}
              body={t.knm.modes.theme.b}
              cta={t.knm.modes.theme.btn}
              onClick={() => setActive({ mode: "theme" })}
              choose={{
                options: themes.map((th) => ({
                  value: th.key,
                  label: `${lang === "nl" ? th.nlShort : th.enShort} (${th.key === "werk" ? SIM_TARGETS.werk : knmQuestions.filter((q) => q.theme === th.key).length})`,
                })),
                onPick: (v) => setActive({ mode: "theme", theme: v as ThemeKey }),
              }}
            />
            <ModeCard
              title={t.knm.modes.sim.t}
              body={t.knm.modes.sim.b}
              cta={t.knm.modes.sim.btn}
              onClick={() => setActive({ mode: "sim" })}
              highlight
            />
          </div>

          {/* themes */}
          <h2 className="mt-8 text-xl font-bold">{t.knm.themesTitle}</h2>
          <p className="mt-1 text-sm text-ink-soft">{t.knm.themesIntro}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {themes.map((th) => (
              <button
                key={th.key}
                onClick={() => setActive({ mode: "theme", theme: th.key })}
                className="rounded-lg border border-line bg-white p-4 text-left hover:border-nl-blue hover:shadow"
              >
                <p aria-hidden className="text-2xl">{th.icon}</p>
                <p className="mt-1 font-semibold text-ink">
                  {lang === "nl" ? th.nl : th.en}
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  {knmQuestions.filter((q) => q.theme === th.key).length}{" "}
                  {lang === "nl" ? "oefenvragen" : "practice questions"} →
                </p>
              </button>
            ))}
          </div>

          {/* situations */}
          <h2 className="mt-8 text-xl font-bold">
            {lang === "nl" ? "De 4 levenssituaties" : "The 4 life situations"}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {lang === "nl"
              ? "De nieuwe eindtermen (sinds 1 juli 2025) zijn gebaseerd op deze vier situaties:"
              : "The new terminal learning objectives (since 1 July 2025) are based on these four situations:"}
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {Object.entries(situations).map(([k, v]) => (
              <li key={k} className="rounded-lg bg-white border border-line px-4 py-2 text-sm">
                <strong>{lang === "nl" ? v.nl : v.en}</strong>
              </li>
            ))}
          </ul>

          {/* 2025 additions */}
          <h2 className="mt-8 text-xl font-bold">
            {lang === "nl" ? "Nieuwe onderwerpen in 2025" : "New topics in 2025"}
          </h2>
          <ul className="mt-2 space-y-1.5">
            {newTopics2025.map((n) => (
              <li key={n.nl} className="flex gap-2 text-sm text-ink">
                <span aria-hidden className="text-ok">＋</span>
                {lang === "nl" ? n.nl : n.en}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-soft">
            Bron: Staatscourant 2024, 15802 (nieuwe eindtermen KNM).
          </p>
        </>
      )}
    </div>
  )
}

function ModeCard({
  title,
  body,
  cta,
  onClick,
  highlight,
  choose,
}: {
  title: string
  body: string
  cta: string
  onClick: () => void
  highlight?: boolean
  choose?: {
    options: { value: string; label: string }[]
    onPick: (v: string) => void
  }
}) {
  const [sel, setSel] = useState(choose?.options[0]?.value ?? "")
  return (
    <div
      className={`flex flex-col rounded-xl border p-4 ${
        highlight ? "border-nl-blue bg-blue-50/50" : "border-line bg-white"
      }`}
    >
      <h3 className="font-bold text-ink">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-ink-soft">{body}</p>
      {choose ? (
        <div className="mt-3 flex gap-2">
          <select
            aria-label={title}
            className="w-full rounded-md border border-line bg-white px-2 py-2 text-sm"
            value={sel}
            onChange={(e) => setSel(e.target.value)}
          >
            {choose.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => choose.onPick(sel)}
            className="shrink-0 rounded-md bg-nl-blue px-4 py-2 text-sm font-semibold text-white"
          >
            {cta}
          </button>
        </div>
      ) : (
        <button
          onClick={onClick}
          className="mt-3 rounded-md bg-nl-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-nl-blue-dark"
        >
          {cta}
        </button>
      )}
    </div>
  )
}
