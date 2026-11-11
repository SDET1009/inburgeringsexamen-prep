import type { SituationKey, ThemeKey } from "./types"

export interface ThemeInfo {
  key: ThemeKey
  nl: string
  en: string
  nlShort: string
  enShort: string
  icon: string // emoji for visual cue (decorative, real text labels always present)
  count: number
}

export const themes: ThemeInfo[] = [
  { key: "werk", nl: "Werk en inkomen", en: "Work and income", nlShort: "Werk", enShort: "Work", icon: "💼", count: 0 },
  { key: "instanties", nl: "Instanties", en: "Government agencies", nlShort: "Instanties", enShort: "Agencies", icon: "🏛️", count: 0 },
  { key: "zorg", nl: "Gezondheid en gezondheidszorg", en: "Health and healthcare", nlShort: "Zorg", enShort: "Health", icon: "🩺", count: 0 },
  { key: "staatsinrichting", nl: "Staatsinrichting en rechtsstaat", en: "State and rule of law", nlShort: "Staat", enShort: "State", icon: "⚖️", count: 0 },
  { key: "geschiedenis", nl: "Geschiedenis en geografie", en: "History and geography", nlShort: "Geschiedenis", enShort: "History", icon: "🗺️", count: 0 },
  { key: "wonen", nl: "Wonen", en: "Housing", nlShort: "Wonen", enShort: "Housing", icon: "🏠", count: 0 },
  { key: "onderwijs", nl: "Onderwijs en opvoeding", en: "Education and upbringing", nlShort: "Onderwijs", enShort: "Education", icon: "🎓", count: 0 },
  { key: "omgang", nl: "Omgangsvormen, waarden en normen", en: "Etiquette, values and norms", nlShort: "Omgang", enShort: "Etiquette", icon: "🤝", count: 0 },
]

export const themeByKey = Object.fromEntries(themes.map((t) => [t.key, t])) as Record<
  ThemeKey,
  ThemeInfo
>

export const situations: Record<SituationKey, { nl: string; en: string }> = {
  werken: { nl: "Werken in Nederland", en: "Working in the Netherlands" },
  leefomgeving: { nl: "Jouw leefomgeving", en: "Your living environment" },
  "instanties-contact": { nl: "Contact met instanties", en: "Dealing with government" },
  burger: { nl: "Als burger", en: "As a citizen" },
}

// New exam topics added with the 2025 terminal learning objectives (Staatscourant 2024, 15802)
export const newTopics2025 = [
  { nl: "DigiD, BSN en de digitale overheid", en: "DigiD, BSN and the digital government" },
  { nl: "De Holocaust en antisemitisme (eindterm 5.1.2)", en: "The Holocaust and antisemitism (terminal 5.1.2)" },
  { nl: "Vrouwenrecht op zelfbeschikking (eindterm 7.2.8)", en: "Women's right to self-determination (terminal 7.2.8)" },
  { nl: "POH (praktijkondersteuner huisarts) en recht op een tolk", en: "POH (practice assistant) and the right to an interpreter" },
  { nl: "Leerplicht (16 jaar) en kwalificatieplicht (18 jaar)", en: "Compulsory schooling (16) and qualification duty (18)" },
  { nl: "Festivals: Keti Koti, suikerfeest, carnaval", en: "Festivals: Keti Koti, sweet festival, carnival" },
  { nl: "Energiecontracten: vast vs. tempo variabel", en: "Energy contracts: fixed vs. variable" },
]
