// KNS (Kennis van de Nederlandse Samenleving, A1 buitenland) practice set.
// Format of the real exam: 30 photo questions in 30 minutes, 2 options,
// question shown + read aloud. Official pass line: 21/30 (confirmed on DUO's
// own practice portal). The exam is selected from the official 100-question
// photo book ("fotoboek Naar Nederland").
//
// LICENSING: the 5 example questions below mirror DUO's PUBLIC KNS practice
// exam (freely accessible at oefenexamensduo.nl) — kept short and paraphrased.
// All other questions are ORIGINAL, written for this site in the style of the
// Naar Nederland film/photo-book topics. The photos of the official book are
// NOT reproduced; simple SVG illustrations stand in.

export type KnsThema =
  | "samenleving"
  | "wonen"
  | "zorg"
  | "onderwijs"
  | "werk"
  | "overheid"
  | "verkeer"

export interface KnsQ {
  id: string
  thema: KnsThema
  image: string // existing SVG asset key (under ./assets/knm/)
  question_nl: string
  options_nl: [string, string]
  answer: 0 | 1
  note_nl: string
  note_en: string
  officialDemo?: boolean
}

const K = (
  id: string,
  thema: KnsThema,
  image: string,
  question_nl: string,
  options_nl: [string, string],
  answer: 0 | 1,
  note_nl: string,
  note_en: string,
  officialDemo = false
): KnsQ => ({ id, thema, image, question_nl, options_nl, answer, note_nl, note_en, officialDemo })

export const knsQuestions: KnsQ[] = [
  // ── the 5 public DUO demo questions (paraphrased; source: oefenexamensduo.nl) ──
  K("kns-d1", "overheid", "instanties-oude",
    "Als u naar Nederland komt, moet u dan opnieuw uw rijbewijs halen?",
    ["Ja", "Nee"], 0,
    "Een buitenlands rijbewijs is maar beperkt geldig in Nederland; vaak moet u een Nederlands rijbewijs aanvragen.",
    "A foreign driving licence is only valid for a limited time in the Netherlands; often you must apply for a Dutch one.",
    true),
  K("kns-d2", "samenleving", "staats-koning",
    "Uit welk land komt koningin Máxima?",
    ["Argentinië", "Duitsland"], 0,
    "Koningin Máxima (nu koningin Máxima) kwam uit Argentinië naar Nederland.",
    "Queen Máxima came to the Netherlands from Argentina.",
    true),
  K("kns-d3", "onderwijs", "onderwijs-school",
    "Wat leert u in de Nederlandse taalles?",
    ["Alle Europese talen", "De Nederlandse taal"], 1,
    "In de taalles leert u Nederlands — de taal van Nederland.",
    "In the Dutch lesson you learn Dutch — the language of the Netherlands.",
    true),
  K("kns-d4", "zorg", "zorg-apotheek",
    "Waar haalt men in Nederland medicijnen op recept?",
    ["Bij de apotheek", "Bij de drogist"], 0,
    "Medicijnen op recept (van de arts) haalt u bij de apotheek.",
    "Prescription medicine (from the doctor) is collected at the pharmacy.",
    true),
  K("kns-d5", "werk", "werk-bureau",
    "Waar kunt u zich in Nederland inschrijven als u werk zoekt?",
    ["Bij een school", "Bij een uitzendbureau"], 1,
    "Voor werk kunt u zich inschrijven bij een uitzendbureau of het UWV.",
    "To find work you can register with an employment agency (uitzendbureau) or the UWV.",
    true),

  // ── original questions in the same style ─────────────────────────────
  K("kns-06", "wonen", "wonen-huis",
    "Waar moet u zich inschrijven als u in Nederland gaat wonen?",
    ["Bij de gemeente", "Bij de politie"], 0,
    "U schrijft zich in bij de gemeente op uw nieuwe adres (BRP).",
    "You register at the municipality at your new address (BRP)."),
  K("kns-07", "wonen", "wonen-sleutel",
    "Wie geeft u de sleutels van een huurwoning?",
    ["De verhuurder", "De buren"], 0,
    "De verhuurder (eigenaar of woningcorporatie) geeft de sleutels.",
    "The landlord (owner or housing association) gives the keys."),
  K("kns-08", "wonen", "wonen-energie",
    "Wat betaalt u aan een energieleverancier?",
    ["Gas, water en licht", "De huur van het huis"], 0,
    "Gas, water en elektra regelt u zelf met een leverancier; huur betaalt u aan de verhuurder.",
    "You arrange gas, water and electricity yourself with a supplier; rent goes to the landlord."),
  K("kns-09", "wonen", "wonen-huishouden",
    "Wat hoort bij 'afval scheiden' in Nederland?",
    ["Papier, plastic en restafval gescheiden weggooien", "Alles bij elkaar in één zak"], 0,
    "In Nederland scheidt u afval: papier, plastic, gft en restafval.",
    "In the Netherlands you separate waste: paper, plastic, organic and residual waste."),
  K("kns-10", "zorg", "zorg-huisarts",
    "U bent ziek. Wat doet u eerst?",
    ["Bellen naar de huisarts", "Naar de apotheek voor medicijnen"], 0,
    "De huisarts is de 'voordeur' van de zorg: belt u eerst als u ziek bent.",
    "The GP is the 'front door' of healthcare: call first when you are ill."),
  K("kns-11", "zorg", "zorg-alarm",
    "Er is een noodsituatie. Welk nummer belt u?",
    ["112", "555"], 0,
    "112 is het alarmsnummer voor brand, ongeval en medische noodsituaties.",
    "112 is the emergency number for fire, accidents and medical emergencies."),
  K("kns-12", "zorg", "zorg-verzekering",
    "Wat moet u hebben als u in Nederland werkt of woont?",
    ["Een zorgverzekering", "Een rijbewijs"], 0,
    "Iedereen in Nederland moet een basis zorgverzekering hebben.",
    "Everyone living or working in the Netherlands must have basic health insurance."),
  K("kns-13", "zorg", "zorg-apotheek",
    "Waar koopt u paracetamol zónder recept?",
    ["Bij de drogist of supermarkt", "Bij het gemeentehuis"], 0,
    "Zonder recept koopt u paracetamol bij de drogist; met recept gaat u naar de apotheek.",
    "Without a prescription you buy it at the drugstore or supermarket; with a prescription, at the pharmacy."),
  K("kns-14", "werk", "werk-saar",
    "Hoeveel salaris krijgt u na aftrek van belasting?",
    ["Het nettoloon", "Het brutoloon"], 0,
    "Bruto is vóór belasting; netto is wat u overhoudt.",
    "Gross is before tax; net is what you take home."),
  K("kns-15", "werk", "werk-bureau",
    "Wat is een werkgever?",
    ["Het bedrijf waar u werkt", "De werknemer die naast u zit"], 0,
    "Werkgever = baas/bedrijf; werknemer = de persoon die werkt.",
    "Employer = the company; employee = the person who works."),
  K("kns-16", "werk", "werk-inkomsten",
    "Werkloos? Welke instantie geeft ww-uitkering?",
    ["Het UWV", "De SVB"], 0,
    "Het UWV regelt ww (werkloosheid). De SVB geeft AOW en kinderbijslag.",
    "The UWV handles unemployment benefits (ww); the SVB handles state pension and child benefit."),
  K("kns-17", "werk", "omgang-vrouw",
    "Mag een werkgever u weigeren omdat u een buitenlandse naam heeft?",
    ["Nee, discriminatie mag niet", "Ja, dat mag"], 0,
    "Discriminatie is verboden, bijvoorbeeld bij het zoeken van werk.",
    "Discrimination is prohibited, for example when looking for work."),
  K("kns-18", "overheid", "instanties-digid",
    "Wat is een DigiD?",
    ["Inlogcode voor overheidszaken", "Een pas"], 0,
    "Met uw DigiD logt u in op overheidswebsites zoals Mijn DUO en de Belastingdienst.",
    "With your DigiD you log in to government websites like Mijn DUO and the Tax Authority."),
  K("kns-19", "overheid", "instanties-gezin",
    "Wat is het BSN?",
    ["Uw persoonlijke nummer voor overheid, werk en zorg", "Een paspoort voor de bus"], 0,
    "Het BSN is uw persoonlijke nummer voor overheid, werk en zorg.",
    "The BSN is your personal number for government, work and healthcare."),
  K("kns-20", "overheid", "staats-koning",
    "Wie is het staatshoofd van Nederland?",
    ["De koning", "De burgemeester"], 0,
    "Nederland is een koninkrijk; koning Willem-Alexander is het staatshoofd.",
    "The Netherlands is a kingdom; King Willem-Alexander is the head of state."),
  K("kns-21", "overheid", "staats-kieshok",
    "Wat doet u bij verkiezingen?",
    ["U stemt op een politieke partij", "U betaalt belasting"], 0,
    "Bij verkiezingen stemmen burgers voor de Tweede Kamer, gemeente enz.",
    "In elections citizens vote for the House of Representatives, municipality etc."),
  K("kns-22", "overheid", "instanties-belasting",
    "Waar gaat uw betaalde belasting heen?",
    ["Naar de Belastingdienst", "Naar de school"], 0,
    "De Belastingdienst verzamelt belasting voor land, gemeente en waterschap.",
    "The Tax Authority collects taxes for the country, municipality and water board."),
  K("kns-23", "samenleving", "omgang-hand",
    "Wat doen Nederlanders vaak als begroeting?",
    ["Elkaar de hand schudden", "Elkaar drie kus geven altijd"], 0,
    "Handenschudden is de gebruikelijke begroeting, ook zakelijk.",
    "Shaking hands is the usual greeting, also in business."),
  K("kns-24", "samenleving", "omgang-vrouw",
    "Hebben vrouwen in Nederland dezelfde rechten als mannen?",
    ["Ja", "Nee"], 0,
    "Mannen en vrouwen zijn gelijk; dat staat in de grondwet.",
    "Men and women are equal; the constitution says so."),
  K("kns-25", "samenleving", "omgang-klok",
    "Hoe spreekt u een ambtenaar of onbekende beleefd aan?",
    ["Met 'u'", "Met 'hé jij'"], 0,
    "Gebruik bij onbekenden en autoriteiten 'u'; dat is beleefd.",
    "With strangers and authorities use 'u'; that is polite."),
  K("kns-26", "verkeer", "geschiedenis-kaart",
    "Met welk vervoermiddel fietsen Nederlanders overal?",
    ["De fiets", "De slee"], 0,
    "De fiets is het belangrijkste kleine vervoermiddel; er zijn overal fietspaden.",
    "The bicycle is the most important small vehicle; bike lanes are everywhere."),
  K("kns-27", "verkeer", "wonen-huishouden",
    "Wat moet u doen als de voetgangerslamp rood is?",
    ["Wachten tot hij groen is", "Toch oversteken"], 0,
    "Bij rood moet u wachten; bij groen kunt u oversteken.",
    "At red you must wait; at green you may cross."),
  K("kns-28", "verkeer", "wonen-huis",
    "Hoe heet een huis dat aan twee gezinnen vast is gebouwd?",
    ["Een rijtjeshuis / tussenwoning", "Een kasteel"], 0,
    "Veel Nederlanders wonen in rijtjeshuizen of appartementen.",
    "Many Dutch people live in terraced houses or apartments."),
  K("kns-29", "samenleving", "geschiedenis-water",
    "Wat is bijzonder aan veel land in Nederland?",
    ["Het ligt onder zeeniveau, beschermd door dijken", "Het is allemaal berg"], 0,
    "Ongeveer een derde van Nederland ligt onder zeeniveau; dijken en polders beschermen het land.",
    "About a third of the Netherlands lies below sea level; dikes and polders protect it."),
  K("kns-30", "samenleving", "geschiedenis-oorlog",
    "In welk jaar was Nederland bevrijd van de Duitse bezetting?",
    ["1945", "1918"], 0,
    "Op 5 mei 1945 werd Nederland bevrijd; dat vieren we als Bevrijdingsdag.",
    "On 5 May 1945 the Netherlands was liberated; we celebrate that as Liberation Day."),
]

export const knsThemaMeta: Record<KnsThema, { nl: string; en: string; icon: string }> = {
  samenleving: { nl: "Samen leven & geschiedenis", en: "Living together & history", icon: "🇳🇱" },
  wonen: { nl: "Wonen", en: "Housing", icon: "🏠" },
  zorg: { nl: "Gezondheid", en: "Healthcare", icon: "🩺" },
  onderwijs: { nl: "Onderwijs", en: "Education", icon: "🎒" },
  werk: { nl: "Werk & inkomen", en: "Work & income", icon: "💼" },
  overheid: { nl: "Overheid & instanties", en: "Government & agencies", icon: "🏛️" },
  verkeer: { nl: "Verkeer & gedrag", en: "Traffic & behaviour", icon: "🚲" },
}
