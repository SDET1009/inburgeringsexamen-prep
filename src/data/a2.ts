// A2 exam practice: official-set hub + ORIGINAL drill content.
// The 12 online practice sets (Spreken/Luisteren/Lezen) and 3 Schrijven PDFs
// are DUO's official free practice exams, linked directly (© Ministerie van
// SZW — content not copied here). The drills below are self-written material
// in the style of the A2 exam, with our own answer keys.

export interface DuoSessie {
  naam: string
  naamEn: string
  code: string
  url: string
  Minuten: number
  Vragen: string
}

export const A2_SETS: Record<"spreken" | "luisteren" | "lezen" | "knm", DuoSessie[]> = {
  spreken: [
    { naam: "Oefenexamen Spreken 1", naamEn: "Practice exam Speaking 1", code: "DZ66", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/DZ66", Minuten: 35, Vragen: "17 taken" },
    { naam: "Oefenexamen Spreken 2", naamEn: "Practice exam Speaking 2", code: "N94P", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/N94P", Minuten: 35, Vragen: "17 taken" },
    { naam: "Oefenexamen Spreken 3", naamEn: "Practice exam Speaking 3", code: "TKWW", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/TKWW", Minuten: 35, Vragen: "17 taken" },
  ],
  luisteren: [
    { naam: "Oefenexamen Luisteren 1", naamEn: "Practice exam Listening 1", code: "NCJ5", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/NCJ5", Minuten: 45, Vragen: "30 vragen · 1× beluisteren" },
    { naam: "Oefenexamen Luisteren 2", naamEn: "Practice exam Listening 2", code: "J845", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/J845", Minuten: 45, Vragen: "30 vragen · 1× beluisteren" },
    { naam: "Oefenexamen Luisteren 3", naamEn: "Practice exam Listening 3", code: "5QCB", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/5QCB", Minuten: 45, Vragen: "30 vragen · 1× beluisteren" },
  ],
  lezen: [
    { naam: "Oefenexamen Lezen 1", naamEn: "Practice exam Reading 1", code: "RV5Y", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/RV5Y", Minuten: 65, Vragen: "25 vragen" },
    { naam: "Oefenexamen Lezen 2", naamEn: "Practice exam Reading 2", code: "JJPV", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/JJPV", Minuten: 65, Vragen: "25 vragen" },
    { naam: "Oefenexamen Lezen 3", naamEn: "Practice exam Reading 3", code: "QCA1", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/QCA1", Minuten: 65, Vragen: "25 vragen" },
    { naam: "Oefenexamen Lezen 4", naamEn: "Practice exam Reading 4", code: "6N1Z", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/6N1Z", Minuten: 65, Vragen: "25 vragen" },
  ],
  knm: [
    { naam: "Oefenexamen KNM 1", naamEn: "Practice exam KNM 1", code: "VJMM", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/VJMM", Minuten: 45, Vragen: "40 vragen" },
    { naam: "Oefenexamen KNM 2", naamEn: "Practice exam KNM 2", code: "VY2K", url: "https://oefenexamensduo.optimumassessment.com/spa/assessment-login/#/VY2K", Minuten: 45, Vragen: "40 vragen" },
  ],
}

export const SCHRIJVEN_PDFS = [
  { naam: "Oefenexamen A2 Schrijven 1", naamEn: "Practice exam A2 Writing 1", url: "https://www.inburgeren.nl/images/oefenexamen-schrijven-1.pdf" },
  { naam: "Oefenexamen A2 Schrijven 2", naamEn: "Practice exam A2 Writing 2", url: "https://www.inburgeren.nl/images/oefenexamen-schrijven-2.pdf" },
  { naam: "Oefenexamen A2 Schrijven 3", naamEn: "Practice exam A2 Writing 3", url: "https://www.inburgeren.nl/images/oefenexamen-schrijven-3.pdf" },
]

// ── ORIGINAL Lezen drill: short A2 texts + mc3 questions ──────────────
export interface Leestekst {
  id: string
  titel: string
  tekst: string
  vragen: {
    v: string
    opties: [string, string, string]
    antwoord: 0 | 1 | 2
    uitleg: string
  }[]
}

export const LEZEN_DRILL: Leestekst[] = [
  {
    id: "lz-1",
    titel: "De huisarts",
    tekst:
      "Bella is ziek. Ze heeft koorts en hoest al drie dagen. Ze belt om 9 uur 's ochtends de huisartsenpraktijk. De assistente zegt: 'De huisarts is vandaag erg druk. Kunt u morgen terugbellen?' Bella zegt ja. De volgende dag belt ze weer. Nu mag ze om 10 uur komen. In de wachtkamer moet ze haar naam doorgeven aan de balie.",
    vragen: [
      {
        v: "Waarom belt Bella de huisarts?",
        opties: ["Ze is ziek", "Ze wil een recept voor haar moeder", "Ze wil een afspraak voor next jaar"],
        antwoord: 0,
        uitleg: "In de tekst: Bella heeft koorts en hoest al drie dagen.",
      },
      {
        v: "Wat zegt de assistente bij de eerste telefoontje?",
        opties: ["Kom direct langs", "Bel morgen terug", "Bel het alarmnummer 112"],
        antwoord: 1,
        uitleg: "De praktijk is druk; Bella moet de volgende dag terugbellen.",
      },
    ],
  },
  {
    id: "lz-2",
    titel: "Werkzoeken",
    tekst:
      "Karim is twee maanden werkloos. Hij schrijft zich in bij het UWV en zoekt online naar vacatures. Hij vindt een baan als bezorger. Hij stuurt een sollicitatiebrief met zijn CV. Twee dagen later krijgt hij een e-mail: hij mag op gesprek komen. De werkgever vraagt of Karim een rijbewijs heeft, want je moet met een busje rijden.",
    vragen: [
      {
        v: "Waar schrijft Karim zich in?",
        opties: ["Bij de gemeente", "Bij het UWV", "Bij de SVB"],
        antwoord: 1,
        uitleg: "Werklozen schrijven zich in bij het UWV.",
      },
      {
        v: "Wat vraagt de werkgever in de e-mail?",
        opties: ["Of Karim een rijbewijs heeft", "Hoe laat Karim wil beginnen", "Of Karim zin heeft in vakantie"],
        antwoord: 0,
        uitleg: "De baan is bezorger; je moet met een busje kunnen rijden.",
      },
    ],
  },
  {
    id: "lz-3",
    titel: "Verhuizen",
    tekst:
      "Yara vindt een appartement in Utrecht. Huur: 950 euro per maand, exclusief gas, water en licht. Ze tekent een contract voor één jaar. Voordat ze verhuist, schrijft ze zich in bij de gemeente Utrecht. Ook regelt ze een energieleverancier. De verhuurder geeft haar de sleutels op de dag van verhuizing.",
    vragen: [
      {
        v: "Wat betekent 'exclusief gas, water en licht'?",
        opties: ["Yara betaalt dat zelf apart", "De verhuurder betaalt alles", "Het appartement heeft geen gas"],
        antwoord: 0,
        uitleg: "Exclusief = niet inbegrepen in de huurprijs; je betaalt het apart aan een leverancier.",
      },
      {
        v: "Wat moet Yara doen vóór de verhuizing?",
        opties: ["Inschrijven bij de gemeente", "De sleutels verkopen", "Het contract opzeggen"],
        antwoord: 0,
        uitleg: "Je schrijft je in bij de gemeente op je nieuwe adres.",
      },
    ],
  },
  {
    id: "lz-4",
    titel: "Naar school",
    tekst:
      "Alle kinderen in Nederland gaan naar school. Dit is verplicht: de leerplicht. Kinderen van 4 tot 12 jaar gaan meestal naar de basisschool. Daarna gaan ze naar de middelbare school. Samir is 16 en zit in het vierde jaar. Hij wil later technicus worden. Zijn leraar adviseert hem een MBO-opleiding te kiezen.",
    vragen: [
      {
        v: "Wat is de leerplicht?",
        opties: ["Kinderen moeten naar school", "Ouders moeten lesgeven thuis", "Scholen zijn gratis"],
        antwoord: 0,
        uitleg: "Leerplicht = kinderen moeten naar school (in Nederland tot 16 jaar; kwalificatieplicht tot 18).",
      },
      {
        v: "Welke opleiding raadt de leraar Samir aan?",
        opties: ["MBO", "Universiteit", "Geen opleiding"],
        antwoord: 0,
        uitleg: "Voor technicus is een MBO-opleiding een passende keuze.",
      },
    ],
  },
  {
    id: "lz-5",
    titel: "Boodschappen doen",
    tekst:
      "Op zaterdag gaat Ali naar de markt. Hij koopt kaas, vis en groenten. Betalen doet hij meestal met zijn pasje; pinnen kan ook bij de bakker. Aan het eind van de maand kijkt hij zijn rekeningen na. Hij merkt dat hij te veel geld uitgeeft. Vanaf volgende month houdt hij een budgetboek bij.",
    vragen: [
      {
        v: "Waarmee betaalt Ali meestal?",
        opties: ["Met contant geld", "Met zijn pasje (pinpas)", "Met een brief"],
        antwoord: 1,
        uitleg: "'Pinnen' = betalen met de bankpas; Ali gebruikt zijn pasje.",
      },
      {
        v: "Wat doet Ali omdat hij te veel uitgeeft?",
        opties: ["Hij houdt een budgetboek bij", "Hij stopt met boodschappen", "Hij leent geld van de buren"],
        antwoord: 0,
        uitleg: "Hij gaat een budgetboek bijhouden om grip op zijn geld te krijgen.",
      },
    ],
  },
  {
    id: "lz-6",
    titel: "De overheid en jij",
    tekst:
      "In Nederland heb je als inwoner rechten en plichten. Je betaalt belasting aan de Belastingdienst. Je hebt recht op zorg, maar je moet zelf een zorgverzekering afsluiten. Voor veel overheidszaken gebruik je je DigiD: een inlogcode met je BSN. Via internet kun je bijvoorbeeld een uittreksel uit de burgerlijke stand aanvragen.",
    vragen: [
      {
        v: "Wat is een DigiD?",
        opties: ["Een inlogcode voor overheidszaken", "Een soort rijbewijs", "Een gezondheidsverklaring"],
        antwoord: 0,
        uitleg: "Met je DigiD (gekoppeld aan je BSN) log je in op overheidswebsites.",
      },
      {
        v: "Wat moet je zelf regelen als je in Nederland woont?",
        opties: ["Een zorgverzekering afsluiten", "Een paspoort aanvragen bij de gemeente elke 2 jaar", "Belasting betalen aan het UWV"],
        antwoord: 0,
        uitleg: "Zorgverzekering is verplicht en sluit je zelf af bij een verzekeraar; belasting gaat naar de Belastingdienst.",
      },
    ],
  },
]

// fix stray english word
LEZEN_DRILL[4].tekst = LEZEN_DRILL[4].tekst.replace("volgende month", "volgende maand")

// ── ORIGINAL Luisteren drill: scripts played ONCE by TTS ──────────────
export interface LuisterFragment {
  id: string
  setting: string // shown before playback (setting, not content)
  script: string // read aloud by TTS, only once
  vragen: {
    v: string
    opties: [string, string, string]
    antwoord: 0 | 1 | 2
    uitleg: string
  }[]
}

export const LUISTER_DRILL: LuisterFragment[] = [
  {
    id: "ln-1",
    setting: "Je belt de huisartsenpraktijk.",
    script:
      "Goedemorgen, huisartsenpraktijk De Eik, wat kan ik voor u doen? — Goedemorgen, ik heet Omar. Ik heb seit gisteren koorts en keelpijn. — Dat spijt me, meneer. Kunt u om half elf komen? De dokter heeft dan een plekje vrij. — Half elf, dank u wel. — Vergeet niet uw zorgpas mee te nemen.",
    vragen: [
      {
        v: "Wanneer mag Omar naar de huisarts komen?",
        opties: ["Om half elf vanmorgen", "Morgen middag", "Over een week"],
        antwoord: 0,
        uitleg: "De assistente biedt vandaag om 10:30 een plekje.",
      },
      {
        v: "Wat moet Omar meenemen?",
        opties: ["Zijn zorgpas", " Zijn paspoort", "Een brief van het werk"],
        antwoord: 0,
        uitleg: "De assistente zegt: vergeet niet uw zorgpas mee te nemen.",
      },
    ],
  },
  {
    id: "ln-2",
    setting: "Twee buren praten in de tuin.",
    script:
      "Hé Linda, leuk je te zien! Ik ben gisteren verhuisd naar nummer 12. — Gefeliciteerd, Thomas! Leuk, een nieuwe buurt. Ga je zaterdag naar de afvalpunt? Ik moet een grote doos wegbrengen. — Ja, ik bring ook spullen naar de milieustraat. We kunnen samen gaan, om tien uur. — Prima, dank je! En wil je daarna een kop koffie drinken? — Ja graag.",
    vragen: [
      {
        v: "Wat is er afgelopen met Thomas?",
        opties: ["Hij is verhuisd", "Hij heeft een new fiets gekocht", "Hij is gestopt met werken"],
        antwoord: 0,
        uitleg: "Thomas zegt: ik ben gisteren verhuisd naar nummer 12.",
      },
      {
        v: "Wanneer gaan ze samen naar de afvalpunt?",
        opties: ["Zaterdag om tien uur", "Vandaag om half elf", "Maandagochtend"],
        antwoord: 0,
        uitleg: "Ze spreken af: zaterdag, samen, om tien uur.",
      },
    ],
  },
  {
    id: "ln-3",
    setting: "Bij de balie van het gemeentehuis.",
    script:
      "Goeiedag, ik wil mij inschrijven op het adres Kerkstraat 5. — Goede. Heeft u een legitimatie bij de hand? — Ja, mijn paspoort en mijn BSN-nummer heb ik opgeschreven. — Perfect. Ik schrijf u in. U krijgt binnen twee weken een bevestiging per post. — Moet ik nog iets anders doen? — Nee, dat is alles. Welkom terug in Nederland!",
    vragen: [
      {
        v: "Wat komt de man doen bij de gemeente?",
        opties: ["Zich inschrijven op een nieuw adres", "Een rijbewijs verlengen", "Belasting betalen"],
        antwoord: 0,
        uitleg: "Hij zegt: ik wil mij inschrijven op het adres Kerkstraat 5.",
      },
      {
        v: "Hoe krijgt hij de bevestiging?",
        opties: ["Per post, binnen twee weken", "Meteen op de computer", "Per e-mail vandaag"],
        antwoord: 0,
        uitleg: "De medewerker: u krijgt binnen twee weken een bevestiging per post.",
      },
    ],
  },
  {
    id: "ln-4",
    setting: "Een collega belt de werkgever.",
    script:
      "Goedemiddag, met Sanne. Ik kan vandaag niet komen werken. Mijn zoon is ziek en ik moet hem naar de dokter brengen. — Dat is vervelend, Sanne. Meld u zich ziek voor vandaag? Hoe voelt u zich zelf? — Ik zelf ben gezond, maar ik kan niet werken vandaag. — Goed, ik noteer het. En voor morgen: probeer dan wel weer te komen? — Ja, dat plan ik zo.",
    vragen: [
      {
        v: "Waarom kan Sanne nu niet werken?",
        opties: ["Haar zoon is ziek", "Zij zelf is ziek", "De kraan is kapot"],
        antwoord: 0,
        uitleg: "Sanne zegt: mijn zoon is ziek en ik moet hem naar de dokter brengen.",
      },
      {
        v: "Wat vraagt de werkgever?",
        opties: ["Of Sanne morgen weer komt", "Of Sanne vakantie wil", "Of Sanne een dokter kent"],
        antwoord: 0,
        uitleg: "De werkgever vraagt om morgen weer te proberen te komen.",
      },
    ],
  },
  {
    id: "ln-5",
    setting: "Op het station, een medewerker omgeroepen.",
    script:
      "Beste reizigers, de trein naar Amsterdam vertrekt vandaag niet om 15:15, maar om 15:40, van spoor 3. De vertraging is door een storing op het spoor. Reizigers die een aansluiting missen in Amsterdam kunnen zich melden bij de informationbalie daar. Wij bieden onze excuses aan voor het ongemak.",
    vragen: [
      {
        v: "Wanneer vertrekt de trein naar Amsterdam?",
        opties: ["Om 15:40", "Om 15:15", "Om 16:40"],
        antwoord: 0,
        uitleg: "De trein vertrekt niet om 15:15 maar om 15:40.",
      },
      {
        v: "Waarom is er vertraging?",
        opties: ["Een storing op het spoor", "Te veel reizigers", "Het weer"],
        antwoord: 0,
        uitleg: "De omroeper noemt een storing op het spoor als oorzaak.",
      },
    ],
  },
]

// small cleanups of stray non-Dutch slips
LUISTER_DRILL[0].script = LUISTER_DRILL[0].script.replace("ik heb seit gisteren", "ik heb sinds gisteren")
LUISTER_DRILL[1].vragen[0].opties[1] = "Hij heeft een nieuwe fiets gekocht"
LUISTER_DRILL[0].vragen[1].opties[1] = "Zijn paspoort"

// ── ORIGINAL Spreken trainer: timed recording-style tasks ─────────────
export interface SpreekTaak {
  id: string
  seconden: 20 | 30
  taak_nl: string
  tip_nl: string
  tip_en: string
}

export const SPREKEN_TAAK: SpreekTaak[] = [
  { id: "sp-1", seconden: 20, taak_nl: "Vertel: hoe heet je en waar kom je vandaan?", tip_nl: "Begin met: 'Ik heet … en ik kom uit …'", tip_en: "Start with: 'My name is … and I come from …'" },
  { id: "sp-2", seconden: 20, taak_nl: "Wat doe je op zaterdag?", tip_nl: "Noem twee activiteiten.", tip_en: "Name two activities." },
  { id: "sp-3", seconden: 20, taak_nl: "Beschrijf je woonkamer.", tip_nl: "Noem drie dingen in de kamer.", tip_en: "Name three things in the room." },
  { id: "sp-4", seconden: 20, taak_nl: "Wat eet je graag?", tip_nl: "Zeg wat je lekker vindt en waarom.", tip_en: "Say what you like and why." },
  { id: "sp-5", seconden: 20, taak_nl: "Waar werk je of wat studeer je?", tip_nl: "Vertel kort over je werk of opleiding.", tip_en: "Tell briefly about your work or studies." },
  { id: "sp-6", seconden: 20, taak_nl: "Hoe gaat het vandaag?", tip_nl: "Zeg hoe je je voelt en waarom.", tip_en: "Say how you feel and why." },
  { id: "sp-7", seconden: 20, taak_nl: "Noem drie kamers in een huis.", tip_nl: "Zeg de namen hardop.", tip_en: "Say the room names aloud." },
  { id: "sp-8", seconden: 20, taak_nl: "Waarom leert u Nederlands?", tip_nl: "Geef één duidelijke reden.", tip_en: "Give one clear reason." },
  { id: "sp-9", seconden: 30, taak_nl: "Beschrijf een foto van een drukke straat in Nederland.", tip_nl: "Zeg wat je ziet: fietsen, auto's, mensen, winkels.", tip_en: "Say what you see: bikes, cars, people, shops." },
  { id: "sp-10", seconden: 30, taak_nl: "Vertel over je laatste ziekenbezoek of doktersbezoek.", tip_nl: "Wanneer? Bij wie? Wat gebeurde er?", tip_en: "When? Whom? What happened?" },
  { id: "sp-11", seconden: 30, taak_nl: "U wilt een afspraak maken bij de gemeente. Zeg wat u moet zeggen.", tip_nl: "Groet, zeg wie u bent en wat u wilt.", tip_en: "Greet, say who you are and what you want." },
  { id: "sp-12", seconden: 30, taak_nl: "Vertel: wat doet u op de eerste dag in een nieuwe wijk?", tip_nl: "Inschrijven, boodschappen, buren ontmoeten…", tip_en: "Register, do shopping, meet neighbours…" },
]
