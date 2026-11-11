// Published NT2 raw pass lines (cesuurs). Source per row; add new sittings here.
export interface Ceuur {
  exam: string
  part: "Lezen" | "Luisteren" | "Schrijven" | "Spreken" | "KNM"
  raw: number
  max: number
  date: string
  source: string
}

export const cesuren: Ceuur[] = [
  { exam: "NT2 B1", part: "Lezen", raw: 24, max: 35, date: "2025", source: "CvTE/DUO per zitting" },
  { exam: "NT2 B1", part: "Spreken", raw: 75, max: 128, date: "2025", source: "CvTE/DUO per zitting" },
  { exam: "NT2 B1", part: "Lezen", raw: 24, max: 35, date: "2024", source: "CvTE/DUO per zitting" },
  { exam: "NT2 B1", part: "Spreken", raw: 73, max: 128, date: "2024", source: "CvTE/DUO per zitting" },
]

// Characteristic statistics of real NT2 exams 2023–2025 (inburgeringscursus.nl,
// independent double count; for <80 questions only agreeing parts are used).
export interface ExamStat {
  part: string
  figure: string
  nl: string
  en: string
  source: string
}

export const examStats: ExamStat[] = [
  {
    part: "Lezen",
    figure: "68/105",
    nl: "In 105 vragen zat het antwoord bij 68 keer 'anders geformuleerd' in de tekst (paraprase).",
    en: "In 105 questions, 68 had the answer 'paraphrased' in the text.",
    source: "inburgeringscursus.nl (2023–2025)",
  },
  {
    part: "Luisteren",
    figure: "105/115",
    nl: "Van 115 vragen ging 105 over een gesprek tussen twee personen.",
    en: "Of 115 questions, 105 were about a conversation between two people.",
    source: "inburgeringscursus.nl (2023–2025)",
  },
  {
    part: "Schrijven",
    figure: "23/36",
    nl: "Van 36 schrijfopdrachten was 23 een e-mail.",
    en: "Of 36 writing tasks, 23 were an email.",
    source: "inburgeringscursus.nl (2023–2025)",
  },
  {
    part: "Spreken",
    figure: "22/48",
    nl: "Van 48 spreekopdrachten vroeg 22 om een reden te geven (omdat / vooral omdat).",
    en: "Of 48 speaking tasks, 22 asked you to give a reason (because / especially because).",
    source: "inburgeringscursus.nl (2023–2025)",
  },
]

// Characteristic statistics of the 80 official KNM practice questions (2025).
export const knmStats: string[] = [
  "52/80 vragen gaan over werk, instanties, zorg of overheid (de vier grote blokken).",
  "36/79 vragen toetsen 'wie is er verantwoordelijk, welke rechten heb je'.",
  "Bij 77/79 vragen zijn de afleirmogelijkheden wél écht bestaande instanties/regels — alleen de situatie beslist.",
  "30/76 valkuilen gaan over 'verwarrende' begrippen: wie is écht verantwoordelijk?",
  "Bij 78/80 vragen heb je de afbeelding nauwelijks nodig — lees eerst de situatie.",
]
