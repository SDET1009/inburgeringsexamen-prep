import { useState } from "react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n"

type Step = "loc" | "level" | null
type Route = "a1" | "a2" | "b1" | null

export default function Home() {
  const { t, lang } = useI18n()
  const [step, setStep] = useState<Step>(null)
  const [route, setRoute] = useState<Route>(null)

  const result =
    route === "a1"
      ? { text: t.home.resultA1, to: "/a1" as const, cta: t.home.learnMore }
      : route === "a2"
        ? { text: t.home.resultA2, to: "/a2" as const, cta: t.home.learnMore }
        : route === "b1"
          ? { text: t.home.resultB1, to: "/b1" as const, cta: t.home.learnMore }
          : { text: t.home.resultUnknown, to: "/knm" as const, cta: t.home.startKnm }

  return (
    <div>
      {/* hero */}
      <section className="rounded-2xl bg-nl-blue px-5 py-8 text-white sm:px-8 sm:py-12">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          {t.home.heroTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-blue-100">{t.home.heroSub}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#tree"
            className="rounded-lg bg-white px-5 py-2.5 font-semibold text-nl-blue hover:bg-blue-50"
          >
            {lang === "nl" ? "Vind jouw examen ↓" : "Find your exam ↓"}
          </a>
          <Link
            to="/knm"
            className="rounded-lg border-2 border-white/70 px-5 py-2.5 font-semibold hover:bg-white/10"
          >
            {t.home.startKnm}
          </Link>
        </div>
      </section>

      {/* decision tree */}
      <section id="tree" className="mt-8" aria-labelledby="tree-h">
        <h2 id="tree-h" className="text-xl font-bold">
          {t.home.treeTitle}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">{t.home.treeIntro}</p>

        <div className="mt-4 rounded-xl border border-line bg-white p-4 sm:p-6">
          {step === null && (
            <TreeStep q={t.home.q1}>
              <TreeBtn onClick={() => { setStep("loc"); setRoute(null) }}>{t.home.yes}</TreeBtn>
              <TreeBtn onClick={() => setRoute("a1")}>{t.home.no}</TreeBtn>
            </TreeStep>
          )}
          {step === "loc" && (
            <TreeStep q={t.home.q2} hint={t.home.q2Hint}>
              <TreeBtn onClick={() => setRoute("a1")}>{t.home.a1}</TreeBtn>
              <TreeBtn onClick={() => setRoute("a2")}>{t.home.a2}</TreeBtn>
              <TreeBtn onClick={() => setRoute("b1")}>{t.home.b1}</TreeBtn>
              <TreeBtn subtle onClick={() => setRoute(null)}>{t.home.donotknow}</TreeBtn>
              <button
                className="text-sm text-nl-blue underline underline-offset-2"
                onClick={() => { setStep(null); setRoute(null) }}
              >
                ← {t.common.back}
              </button>
            </TreeStep>
          )}
          {route !== null && (
            <div className="rounded-lg bg-blue-50 border border-nl-blue/40 p-4" role="status">
              <p className="font-bold text-nl-blue">{result.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to={result.to} className="rounded-lg bg-nl-blue px-4 py-2 font-semibold text-white hover:bg-nl-blue-dark">
                  {result.cta} →
                </Link>
                <button
                  onClick={() => { setStep(null); setRoute(null) }}
                  className="rounded-lg border border-line bg-white px-4 py-2 font-medium text-ink-soft hover:bg-paper"
                >
                  ← {t.common.back}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* route cards */}
      <section className="mt-8" aria-labelledby="cards-h">
        <h2 id="cards-h" className="text-xl font-bold">
          {t.home.cardsTitle}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card to="/a1" title={t.home.cardA1} body={t.home.cardA1Body} />
          <Card to="/a2" title={t.home.cardA2} body={t.home.cardA2Body} />
          <Card to="/b1" title={t.home.cardB1} body={t.home.cardB1Body} />
          <Card to="/knm" title={t.home.cardKnm} body={t.home.cardKnmBody} accent />
        </div>
      </section>

      {/* M2 practice quick links */}
      <section className="mt-8" aria-labelledby="practice-h">
        <h2 id="practice-h" className="text-xl font-bold">
          {lang === "nl" ? "Direct oefenen" : "Start practising now"}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Card to="/woorden" title={lang === "nl" ? "📇 Woorden van vandaag" : "📇 Today's words"} body={lang === "nl" ? "354 A1-woorden met slimmere herhaling (SRS), dagdoel en reeks — offline bruikbaar." : "354 A1 words with spaced repetition, daily goal and streak — works offline."} />
          <Card to="/oefenen-a2" title={lang === "nl" ? "🎧 A2: officieel + trainers" : "🎧 A2: official + trainers"} body={lang === "nl" ? "De 12 officiële DUO-sets en 3 Schrijven-PDF's, plus onze Lezen/Luisteren/Spreken-trainers." : "The 12 official DUO sets and 3 writing PDFs, plus our reading/listening/speaking trainers."} />
          <Card to="/kns" title={lang === "nl" ? "🌍 KNS (A1 buitenland)" : "🌍 KNS (A1 abroad)"} body={lang === "nl" ? "30 foto-vragen, twee keuzes, 30 minuten — zoals het echte examen; 21/30 richtlijn." : "30 photo questions, two options, 30 minutes — like the real exam; guideline 21/30."} />
        </div>
      </section>

      {/* KNM teaser */}
      <section className="mt-8 rounded-2xl border-2 border-dashed border-nl-blue/50 bg-blue-50/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[220px] flex-1">
            <h2 className="text-lg font-bold text-nl-blue">{t.home.knmTeaserTitle}</h2>
            <p className="mt-1 text-sm text-ink-soft">{t.home.knmTeaserBody}</p>
          </div>
          <Link
            to="/knm"
            className="rounded-lg bg-nl-blue px-5 py-3 font-semibold text-white hover:bg-nl-blue-dark"
          >
            {t.home.startKnm} →
          </Link>
        </div>
      </section>

      {/* news */}
      <section className="mt-8" aria-labelledby="news-h">
        <h2 id="news-h" className="text-xl font-bold">
          {t.home.newsTitle}
        </h2>
        <ul className="mt-3 grid gap-3 lg:grid-cols-3">
          <NewsCard title={t.home.news.schedule.t} body={t.home.news.schedule.b} src={t.home.news.schedule.src} />
          <NewsCard title={t.home.news.vocab.t} body={t.home.news.vocab.b} src={t.home.news.vocab.src} />
          <NewsCard title={t.home.news.knm2025.t} body={t.home.news.knm2025.b} src={t.home.news.knm2025.src} />
        </ul>
      </section>
    </div>
  )
}

function TreeStep({ q, hint, children }: { q: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-lg font-semibold">{q}</p>
      {hint && <p className="mt-1 text-sm text-ink-soft">{hint}</p>}
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function TreeBtn({
  children,
  onClick,
  subtle,
}: {
  children: React.ReactNode
  onClick: () => void
  subtle?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 font-medium ${
        subtle
          ? "border border-line bg-paper text-ink-soft hover:bg-line/60"
          : "bg-nl-blue text-white hover:bg-nl-blue-dark"
      }`}
    >
      {children}
    </button>
  )
}

function Card({ to, title, body, accent }: { to: string; title: string; body: string; accent?: boolean }) {
  return (
    <Link
      to={to}
      className={`group block rounded-xl border p-4 transition hover:shadow ${
        accent ? "border-nl-blue bg-blue-50/60" : "border-line bg-white"
      }`}
    >
      <p className="font-bold group-hover:text-nl-blue">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
      <p className="mt-2 text-sm font-semibold text-nl-blue">→</p>
    </Link>
  )
}

function NewsCard({ title, body, src }: { title: string; body: string; src: string }) {
  return (
    <li className="rounded-xl border border-line bg-white p-4">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
      <p className="mt-2 text-xs text-ink-soft">— {src}</p>
    </li>
  )
}
