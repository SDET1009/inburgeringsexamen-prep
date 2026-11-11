import { useI18n } from "../i18n"
import Disclaimer from "../components/Disclaimer"

type RouteKey = "a1" | "a2" | "b1"

interface RouteContent {
  title: string
  intro: string
  parts: { k: string; b?: string }[]
  pass: string
  price?: string
  reg: { t: string; b: string; link: string; linkText: string; url: string }
  extra: { t: string; b: string; linkText: string; url: string }
}

function content(route: RouteKey, lang: "nl" | "en"): RouteContent {
  const nl = lang === "nl"
  switch (route) {
    case "a1":
      return {
        title: nl
          ? "Basisexamen Inburgering Buitenland (A1)"
          : "Basic Integration Exam Abroad (A1)",
        intro: nl
          ? "Voor wie vanuit het buitenland een MVV aanvraagt (bijv. gezinshereniging of werk). Het examen doe je bij de Nederlandse ambassade of consul in je eigen land. Vaak is er een gratis officiële studiewijzer: Naar Nederland."
          : "For people applying for an MVV from abroad (e.g. family reunification or work). You take the exam at the Dutch embassy or consulate in your own country. A free official study guide is usually available: Naar Nederland.",
        parts: nl
          ? [
              { k: "KNS – kennis van de Nederlandse samenleving", b: "30 foto-vragen, 2 keuzes, 30 minuten. Ongeveer 21/30 is nodig. De 30 vragen komen uit het officiële fotoboek van 100 vragen." },
              { k: "Lezen", b: "9 korte teksten, 19 meerkeuzevragen, 35 minuten. Ongeveer 14/19 is nodig." },
              { k: "Spreken", b: "10 videovragen + 12 zinnen aanvullen, 30 minuten. Maximaal 2 punten per vraag (juist + verstaanbaar); een enkel woord mag, grammatica hoeft niet perfect. Ongeveer 34/44 punten is nodig." },
            ]
          : [
              { k: "KNS – knowledge of Dutch society", b: "30 photo questions, 2 options, 30 minutes. About 21/30 is needed. The 30 questions come from the official photo book of 100 questions." },
              { k: "Reading", b: "9 short texts, 19 multiple-choice questions, 35 minutes. About 14/19 is needed." },
              { k: "Speaking", b: "10 video questions + 12 sentence completions, 30 minutes. Maximum 2 points per question (correct + understandable); a single word is fine, grammar need not be perfect. About 34/44 points is needed." },
            ],
        pass: nl
          ? "Score per deel: 1–10 schaal, 6 is nodig. Alle drie de delen moeten gehaald worden."
          : "Score per part: 1–10 scale, 6 is needed. All three parts must be passed.",
        price: nl
          ? "Prijs: ca. €140–220, afhankelijk van je land (geldt wat Nederland Wereldwijd voor je land aangeeft)."
          : "Price: approx. €140–220, depending on your country (the Nederland Wereldwijd page for your country is authoritative).",
        reg: {
          t: nl ? "Aanmelden" : "Registration",
          b: nl
            ? "Kies je land: via Nederland Wereldwijd vind je het examen bij je ambassade of consul."
            : "Choose your country: via Nederland Wereldwijd you find the exam at your embassy or consulate.",
          link: nl ? "Examen doen in je land" : "Take the exam in your country",
          linkText: "nederlandwereldwijd.nl",
          url: "https://www.nederlandwereldwijd.nl/basisexamen-inburgering/",
        },
        extra: {
          t: nl ? "Officieel studiemateriaal & oefenen (gratis)" : "Official study material & practice (free)",
          b: nl
            ? "Naar Nederland is het officiële zelfstudeerpakket in meerdere talen: daarin zitten de KNS-fotoboek (100 vragen), de complete Spreken-vragenlijst (maart 2024) en oefeningen voor alle drie de delen."
            : "Naar Nederland is the official self-study package in multiple languages: it includes the KNS photo book (100 questions), the complete Speaking question list (March 2024) and practice for all three parts.",
          linkText: "naarnederland.nl",
          url: "https://www.naarnederland.nl/",
        },
      }
    case "a2":
      return {
        title: nl ? "Inburgeringsexamen A2 (in Nederland)" : "Integration Exam A2 (in the Netherlands)",
        intro: nl
          ? "Voor wie in Nederland woont en na 1 oktober 2017 inburgeringsplichtig is. Vijf delen, elk afzonderlijk te leggen en te halen (geen gemiddeld). Lezen, Luisteren, Spreken en de KNM doen je op de computer; Schrijven op papier."
          : "For people living in the Netherlands who became subject to the integration obligation after 1 October 2017. Five parts, each can be taken and passed separately (no averaging). Reading, Listening, Speaking and the KNM are on a computer; Writing on paper.",
        parts: nl
          ? [
              { k: "Lezen – 65 minuten" },
              { k: "Luisteren – 45 minuten" },
              { k: "Schrijven – 40 minuten (papier)" },
              { k: "Spreken – 35 minuten (met examiner)" },
              { k: "KNM – 45 minuten (zie onze KNM-oefening)" },
            ]
          : [
              { k: "Reading – 65 minutes" },
              { k: "Listening – 45 minutes" },
              { k: "Writing – 40 minutes (paper)" },
              { k: "Speaking – 35 minutes (with examiner)" },
              { k: "KNM – 45 minutes (see our KNM practice)" },
            ],
        pass: nl
          ? "Score per deel: 1–10 schaal, 6 is nodig. Elk deel telt los: je hoeft niet alles op één dag te doen."
          : "Score per part: 1–10 scale, 6 is needed. Each part counts separately: you do not have to do everything in one day.",
        price: nl
          ? "Prijs: €50 per deel, €250 in totaal. Er bestaan vrijstellingen en korting (bijv. bij bepaalde uitkeringen of statussen)."
          : "Price: €50 per part, €250 in total. Exemptions and discounts exist (e.g. for certain benefits or statuses).",
        reg: {
          t: nl ? "Aanmelden" : "Registration",
          b: nl
            ? "Via Mijn DUO (met DigiD). Deel(s) op één dag of gespreid. Examendata: Amsterdam, Eindhoven, Rijswijk, Rotterdam, Utrecht en Zwolle. Uitslag en diploma via Mijn Inburgering."
            : "Via Mijn DUO (with DigiD). Parts on one day or spread out. Exam locations: Amsterdam, Eindhoven, Rijswijk, Rotterdam, Utrecht and Zwolle. Results and diploma via Mijn Inburgering.",
          link: nl ? "Inburgeringsexamen doen" : "Take the integration exam",
          linkText: "inburgeren.nl",
          url: "https://www.inburgeren.nl/examen-doen/",
        },
        extra: {
          t: nl ? "Officieel oefenmateriaal (gratis)" : "Official practice material (free)",
          b: nl
            ? "DUO heeft 15 officiële oefenexamens: 12 online (Spreken, Luisteren, Lezen en de KNM) en 3 PDF's (Schrijven). Dit is het officiële oefenmateriaal voor jouw niveau."
            : "DUO has 15 official practice exams: 12 online (Speaking, Listening, Reading and the KNM) and 3 PDFs (Writing). This is the official practice material for your level.",
          linkText: "inburgeren.nl – Oefenen",
          url: "https://www.inburgeren.nl/examen-doen/oefenen.jsp",
        },
      }
    case "b1":
      return {
        title: nl
          ? "Staatsexamen NT2 Programma I (B1) + KNM"
          : "Dutch National Exam NT2 Programme I (B1) + KNM",
        intro: nl
          ? "De B1-route: het Staatsexamen Nederlands als Tweede Taal (NT2) op niveau B1, plus de KNM. Ook voor wie via de onderwijsroute gaat of na een mislukte A2 een B1-diploma nodig heeft. NT2 is moeilijker dan A2: de vragen zijn langer en gaan over dagelijkse en algemene onderwerpen."
          : "The B1 route: the National Exam for Dutch as a Second Language (NT2) at level B1, plus the KNM. Also for people on the education route or who need a B1 diploma after an unsuccessful A2. NT2 is harder than A2: the questions are longer and about everyday and general topics.",
        parts: nl
          ? [
              { k: "Lezen – 110 min, ca. 35 meerkeuzevragen (6 lange teksten; papier + scherm)" },
              { k: "Luisteren – 90 min, ca. 38–39 vragen (4–5 audiofragmenten + 1 video; elk fragment 1×)" },
              { k: "Schrijven – 100 min, 12 typed opdrachten (8 zinnen, 2 halfstukken, 2 teksten van 5–7 punten)" },
              { k: "Spreken – ca. 30 min, 16 opnames (8×20 s + 8×30 s; elke vraag zie je 1 keer)" },
              { k: "KNM – 45 min (zie onze KNM-oefening)" },
            ]
          : [
              { k: "Reading – 110 min, approx. 35 multiple-choice questions (6 long texts; paper + screen)" },
              { k: "Listening – 90 min, approx. 38–39 questions (4–5 audio clips + 1 video; each clip once)" },
              { k: "Writing – 100 min, 12 typed tasks (8 sentences, 2 half-texts, 2 texts of 5–7 points)" },
              { k: "Speaking – approx. 30 min, 16 recordings (8×20 s + 8×30 s; each question shown once)" },
              { k: "KNM – 45 minutes (see our KNM practice)" },
            ],
        pass: nl
          ? "Score: je ruwe resultaat wordt omgerekend naar een schaal van 0–1000; ≥500 per deel is nodig. CvTE publiceert na elke zitting de ruw-ceuurs (zie Examendata)."
          : "Score: your raw result is converted to a 0–1000 scale; ≥500 per part is needed. CvTE publishes the raw pass lines after every sitting (see Exam data).",
        price: nl
          ? "Prijs: €50 per deel (€200 voor de vier taaldelen) + €50 voor de KNM. Uitslag na ca. 5 weken in Mijn DUO."
          : "Price: €50 per part (€200 for the four language parts) + €50 for the KNM. Result after approx. 5 weeks in Mijn DUO.",
        reg: {
          t: nl ? "Aanmelden & regels" : "Registration & rules",
          b: nl
            ? "Via Mijn DUO (DigiD); je kunt meerdere delen tegelijk aanmelden. Betaling iDEAL of factuur (uiterlijk 3 weken voor het examen). Sinds augustus 2026 mag je geen digitale apparaten meenemen. Bij Lezen en Schrijven mag alleen het Van Dale Pocketwoordenboek NT2. Neem je identiteitsbewijs en de aanmeldbevestiging mee."
            : "Via Mijn DUO (DigiD); you can register for multiple parts at once. Payment by iDEAL or invoice (no later than 3 weeks before the exam). Since August 2026 you may not bring digital devices. For Reading and Writing only the Van Dale Pocket NT2 dictionary is allowed. Bring your ID and the registration confirmation.",
          link: nl ? "NT2 (officieel)" : "NT2 (official)",
          linkText: "staatsexamensnt2.nl",
          url: "https://www.staatsexamensnt2.nl/",
        },
        extra: {
          t: nl ? "Oefenen (gratis, officiële omgeving)" : "Practice (free, official environment)",
          b: nl
            ? "De officiële oefenomgeving voor NT2 gebruikt het échte examensysteem: scherm, tijden en werkwijze zijn identiek. Aanbeveling: maak eerst één volledige simulatie, pas daarna pas je gerichter in."
            : "The official NT2 practice environment uses the real exam system: screen, times and workflow are identical. Recommendation: do one full simulation first, then practise more specifically.",
          linkText: "oefenexamensnt2.nl",
          url: "https://oefenexamensnt2.nl/",
        },
      }
  }
}

export default function RoutePage({ route }: { route: RouteKey }) {
  const { lang } = useI18n()
  const c = content(route, lang)

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{c.title}</h1>
      <p className="mt-2 max-w-3xl text-ink-soft">{c.intro}</p>

      <Disclaimer />

      <section className="mt-6">
        <h2 className="text-lg font-bold">
          {route === "a1" ? (lang === "nl" ? "De drie delen" : "The three parts") : lang === "nl" ? "De onderdelen" : "The parts"}
        </h2>
        <ul className="mt-3 space-y-2">
          {c.parts.map((p) => (
            <li key={p.k} className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="font-semibold">{p.k}</p>
              {p.b && <p className="mt-1 text-sm text-ink-soft">{p.b}</p>}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-xs font-semibold uppercase text-ink-soft">
            {lang === "nl" ? "Score & ceuur" : "Score & pass line"}
          </p>
          <p className="mt-1 text-sm">{c.pass}</p>
          {c.price && (
            <>
              <p className="mt-3 text-xs font-semibold uppercase text-ink-soft">
                {lang === "nl" ? "Prijs" : "Price"}
              </p>
              <p className="mt-1 text-sm">{c.price}</p>
            </>
          )}
        </div>
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-xs font-semibold uppercase text-ink-soft">{c.reg.t}</p>
          <p className="mt-1 text-sm">{c.reg.b}</p>
          <a
            className="mt-2 inline-block font-semibold text-nl-blue underline underline-offset-2"
            href={c.reg.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {c.reg.link} ({c.reg.linkText}) ↗
          </a>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-line bg-white p-4">
        <p className="text-xs font-semibold uppercase text-ink-soft">{c.extra.t}</p>
        <p className="mt-1 text-sm">{c.extra.b}</p>
        <a
          className="mt-2 inline-block font-semibold text-nl-blue underline underline-offset-2"
          href={c.extra.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {c.extra.linkText} ↗
        </a>
      </div>

      {route === "b1" && (
        <p className="mt-3 text-sm">
          <a href="#/examen-data" className="font-semibold text-nl-blue underline underline-offset-2">
            → {lang === "nl" ? "Historische examendata & ceuurs NT2" : "Historical exam data & NT2 pass lines"}
          </a>
        </p>
      )}
    </div>
  )
}
