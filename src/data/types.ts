export type ThemeKey =
  | "werk"
  | "wonen"
  | "zorg"
  | "instanties"
  | "staatsinrichting"
  | "geschiedenis"
  | "onderwijs"
  | "omgang"

export type SituationKey = "werken" | "leefomgeving" | "instanties-contact" | "burger"

export interface KnmQuestion {
  id: string
  exam: "KNM"
  level: "A1" | "A2" | "B1"
  theme: ThemeKey
  situation: SituationKey
  type: "mc2" | "mc3"
  image: string
  question_nl: string
  options_nl: string[]
  answer: number
  explanation_nl: string
  explanation_en: string
  source: string
  added: string
}
