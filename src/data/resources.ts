export interface Resource {
  name: string
  url: string
  official: boolean
  paid: boolean
  nl: string // why recommended (NL)
  en: string
}

export const resources: Resource[] = [
  // ── Official (free) ──────────────────────────────────────────────
  {
    name: "inburgeren.nl – Oefenen (DUO)",
    url: "https://www.inburgeren.nl/examen-doen/oefenen.jsp",
    official: true, paid: false,
    nl: "De officiële oefenexamens A2: 12 online (Spreken, Luisteren, Lezen, KNM) en 3 PDF's (Schrijven).",
    en: "The official A2 practice exams: 12 online (Speaking, Listening, Reading, KNM) and 3 PDFs (Writing).",
  },
  {
    name: "KNM oefenexamens (DUO, 2 × 40 vragen)",
    url: "https://www.inburgeren.nl/examen-doen/oefenen.jsp",
    official: true, paid: false,
    nl: "Twee officiële KNM-oefenexamens (samen 80 vragen) met foto's en audio. Dit is dé plek om het echte examengevoel te proeven.",
    en: "Two official KNM practice exams (80 questions together) with photos and audio. This is the place to experience the real exam feel.",
  },
  {
    name: "Oefenexamens NT2 (officiële omgeving)",
    url: "https://oefenexamensnt2.nl/",
    official: true, paid: false,
    nl: "De gratis oefenomgeving met het échte NT2-examensysteem: ervaar het scherm, de tijden en de werkwijze.",
    en: "The free practice environment with the real NT2 exam system: experience the screen, the times and the workflow.",
  },
  {
    name: "Staatsexamens NT2 (officieel)",
    url: "https://www.staatsexamensnt2.nl/",
    official: true, paid: false,
    nl: "Aanmelden, examendata (2026–2027), de woordlijsten (aanvullende lijst 1 nov 2026 bijgewerkt) en documenten.",
    en: "Registration, exam dates (2026–2027), the word lists (supplementary list updated 1 Nov 2026) and documents.",
  },
  {
    name: "Naar Nederland (A1, officiële studiewijzer)",
    url: "https://www.naarnederland.nl/",
    official: true, paid: false,
    nl: "Het gratis officiële zelfstudeerpakket A1 in meerdere talen, met de KNS-fotoboek (100 vragen) en de complete Spreken-vragenlijst (maart 2024).",
    en: "The free official A1 self-study package in multiple languages, with the KNS photo book (100 questions) and the complete Speaking question list (March 2024).",
  },
  {
    name: "Inburgeringsexamen doen (inburgeren.nl)",
    url: "https://www.inburgeren.nl/examen-doen/",
    official: true, paid: false,
    nl: "Uitleg van de drie routes, PIP, 'in welke gevallen kun je minder of geen examens doen' en de prijzen.",
    en: "Explanation of the three routes, the PIP, 'in which cases you can take fewer or no exams' and the prices.",
  },
  {
    name: "Basisexamen inburgering (buitenland)",
    url: "https://www.nederlandwereldwijd.nl/basisexamen-inburgering/",
    official: true, paid: false,
    nl: "Per land: waar je het A1-examen doet en wat het kost (ca. €140–220).",
    en: "Per country: where you take the A1 exam and what it costs (approx. €140–220).",
  },
  {
    name: "KNS oefenexamen A1 buitenland (DUO)",
    url: "https://www.oefenexamensduo.nl/",
    official: true, paid: false,
    nl: "Het officiële, gratis oefenplatform voor de KNS van het A1-examen in het buitenland (30 foto-vragen; 21/30 = geslaagd).",
    en: "The official free practice portal for the KNS of the A1 exam abroad (30 photo questions; 21/30 = passed).",
  },
  {
    name: "CvTE – woordenlijsten NT2 (officiële PDF's)",
    url: "https://www.staatsexamensnt2.nl/documenten",
    official: true, paid: false,
    nl: "De officiële woordenlijsten voor NT2 Programma I/II, inclusief de aanvullende woordenlijst (bijgewerkt 1 november 2026).",
    en: "The official word lists for NT2 Programme I/II, including the supplementary list (updated 1 November 2026).",
  },
  // ── External (unofficial) ─────────────────────────────────────────
  {
    name: "Ad Appel – NT2 B1 examenvragen",
    url: "https://adappel.nl/examenvragen-b1",
    official: false, paid: true,
    nl: "Video's met alle 735 openbare NT2 B1 Spreken- en Schrijvenvragen sinds 2008 + modelantwoorden. Betaald; wij linken alleen.",
    en: "Videos of all 735 public NT2 B1 Speaking and Writing questions since 2008 + model answers. Paid; we only link.",
  },
  {
    name: "Oefenexamens Inburgering (KNM-online)",
    url: "https://www.oefenexamensinburgering.nl/",
    official: false, paid: false,
    nl: "Extra gratis KNM-oefenvragen met foto's, onbeperkt herhaalbaar.",
    en: "Extra free KNM practice questions with photos, repeatable unlimited.",
  },
  {
    name: "Inburgering A1 (woorden + lessen)",
    url: "https://inburgeringa1.nl/",
    official: false, paid: false,
    nl: "1200 basiswoorden met video's, audio en vertalingen (NL/EN/UZ). Gratis; handig voor de A1-woordenschat.",
    en: "1200 basic words with videos, audio and translations (NL/EN/UZ). Free; handy for the A1 vocabulary.",
  },
  {
    name: "Inburgering Prep (KNM)",
    url: "https://inburgeringprep.com/",
    official: false, paid: false,
    nl: "Gratis KNM-oefeningen (40 vragen/45 min/28-referentie) en KNM-woorden. Een van de grootste gratis KNM-bronnen.",
    en: "Free KNM practice (40 questions/45 min/28 reference) and KNM words. One of the biggest free KNM sources.",
  },
  {
    name: "Inburgering.org",
    url: "https://inburgering.org/",
    official: false, paid: false,
    nl: "Gratis getimede KNM-simulaties (2×), KNM-samenvattingen en A1/A2-routegidsen.",
    en: "Free timed KNM simulations (2×), KNM summaries and A1/A2 route guides.",
  },
  {
    name: "App: Inburgering Examen KNM Oefenen",
    url: "https://apps.apple.com/app/id6771166567",
    official: false, paid: true,
    nl: "KNM-app met 499 vragen in 5 talen, offline en met voortgang per onderwerp (App Store).",
    en: "KNM app with 499 questions in 5 languages, offline and with per-topic progress (App Store).",
  },
]
