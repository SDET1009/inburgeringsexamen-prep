// English UI strings — same shape as nl.ts (see Dict type).
import type { Dict } from "./nl"

export const en: Dict = {
  meta: {
    title: "Inburgeren Oefenen",
    description:
      "Free practice material for the Dutch integration exam: KNM, A1, A2 and B1-NT2. With simulation, explanations and official sources.",
  },
  nav: {
    home: "Home",
    knm: "KNM practice",
    woorden: "Words",
    a1: "A1 (abroad)",
    a2: "A2 (in the Netherlands)",
    b1: "B1 (NT2)",
    bronnen: "Resources",
    data: "Exam data",
    skip: "Skip to content",
    langLabel: "Language",
  },
  home: {
    heroTitle: "Prepare for the Dutch integration exam",
    heroSub:
      "Free practice material for the KNM and the language exams A1, A2 and B1-NT2. Find below which exam applies to you.",
    treeTitle: "Which exam is for you?",
    treeIntro: "Answer these questions and get to the right section.",
    q1: "Do you currently live in the Netherlands?",
    yes: "Yes, I live in the Netherlands",
    no: "No, I live abroad",
    q2: "Which language level applies to your integration obligation?",
    q2Hint:
      "This is stated in your PIP (Personal Integration Plan). Do you have an NT2 diploma or are you on the B1/B2 route?",
    a1: "A1 (basic exam)",
    a2: "A2",
    b1: "B1 (NT2)",
    donotknow: "I don't know yet",
    resultA1: "Your route: Basic Integration Exam Abroad (A1)",
    resultA2: "Your route: Integration Exam A2",
    resultB1: "Your route: Dutch National Exam NT2 Programme I (B1)",
    resultUnknown:
      "Still unclear? Start with the KNM: it belongs to almost every route. Then check your PIP with your municipality.",
    cardsTitle: "The three routes",
    cardA1: "A1 · outside the Netherlands",
    cardA1Body:
      "For people applying for an MVV from abroad. KNS (knowledge), Reading and Speaking, at the embassy.",
    cardA2: "A2 · in the Netherlands",
    cardA2Body:
      "For people living in the Netherlands (integration obligation after 1 October 2017). Five parts, each €50, each passable separately.",
    cardB1: "B1 · NT2",
    cardB1Body:
      "For the B1/B2 route or the education route. Four language parts at NT2 level plus the KNM.",
    cardKnm: "KNM · for all routes",
    cardKnmBody:
      "Knowledge of Dutch Society: 40 multiple-choice questions on 8 topics. Practice here now.",
    learnMore: "Learn more",
    startKnm: "Go to the KNM practice",
    knmTeaserTitle: "Practice now: the KNM",
    knmTeaserBody:
      "40 questions on work, housing, healthcare, education, government agencies and more. With photo, audio, time limit and per-question explanation.",
    newsTitle: "Recent developments",
    news: {
      schedule: {
        t: "2026–2027 exam dates published",
        b: "DUO has published the exam dates; there are extra sittings in December 2026 and January 2027.",
        src: "inburgeren.nl",
      },
      vocab: {
        t: "NT2 supplementary word list updated (1 November 2026)",
        b: "The official NT2 word list document has been renewed; download it free from staatsexamensnt2.nl.",
        src: "staatsexamensnt2.nl",
      },
      knm2025: {
        t: "The KNM was renewed in July 2025",
        b: "New terminal learning objectives with 8 topics, including DigiD, the Holocaust and women's right to self-determination.",
        src: "Staatscourant 2024, 15802",
      },
    },
  },
  knm: {
    title: "KNM – Knowledge of Dutch Society",
    intro:
      "The KNM is a mandatory part of the integration exam (and of the B1 route). You answer 40 multiple-choice questions in 45 minutes, on a computer. Every question has an image and is read aloud.",
    factsTitle: "The KNM in numbers",
    facts: {
      q: "Number of questions",
      qv: "40 questions (3 options)",
      t: "Duration",
      tv: "45 minutes",
      p: "Price",
      pv: "€50",
      s: "Score",
      sv: "DUO publishes no fixed pass line; 26–28/40 is used as a guideline",
    },
    passLineNote:
      "Note: 26–28/40 is a guideline for practice. DUO publishes no official pass line for the KNM.",
    officialLink: "Official KNM practice exam (80 questions, DUO)",
    officialNote:
      "DUO offers two official practice exams of 40 questions (80 together). Take those in the official environment; above you find our own practice questions.",
    themesTitle: "The 8 topics",
    themesIntro:
      "Every exam covers all 8 topics. Since 1 July 2025 the new terminal learning objectives apply, based on 4 life situations.",
    practicesTitle: "Choose your practice",
    modes: {
      one: {
        t: "Single question",
        b: "A random question, with instant explanation. Ideal for quick learning.",
        btn: "Start",
      },
      theme: {
        t: "By topic",
        b: "Pick one of the 8 topics and practice it specifically.",
        btn: "Start",
      },
      sim: {
        t: "Simulation (45 min)",
        b: "40 questions with a time limit, just like the real exam. Instant score and explanation at the end.",
        btn: "Start simulation",
      },
    },
    simIntro:
      "You get 40 questions and 45 minutes. You can move back and forth. At the end you see your score, the reference line and per-question explanations.",
    disclaimer:
      "This is practice material, not an official exam. Our questions are original and do not come from DUO. Always check inburgeren.nl and staatsexamensnt2.nl for official rules, registration, prices and results.",
    question: "Question",
    of: "of",
    timer: "Time left",
    answered: "Answered",
    check: "Check",
    next: "Next",
    prev: "Previous",
    finish: "Finish",
    correct: "Correct!",
    wrong: "Unfortunately, that is not correct.",
    explanation: "Explanation",
    readAloud: "Read question aloud",
    stopAudio: "Stop audio",
    resultTitle: "Your result",
    score: "Score",
    passed: "You scored below the reference line. Keep going and keep practicing!",
    failedRef:
      "You scored at or above the reference line (26/40). That is a good practice score!",
    refLine: "Reference line (practice guideline): 26/40 – the official pass line is unknown",
    retry: "Try again",
    toThemes: "To topics",
    officialNow: "Take the official practice exam",
    themeStatsTitle: "Your progress per topic",
    themeStatsEmpty: "Do a practice first to see your progress.",
    themeStatsHint: "Number correct / total per topic (these practice sessions only).",
    situationLabel: "Situation",
    themeLabel: "Topic",
    sourceLabel: "Source",
    sourceOurs: "Original practice question (unofficial)",
  },
  a1: {
    title: "Basic Integration Exam Abroad (A1)",
    intro:
      "For people applying for an MVV from abroad (e.g. as a family member or job seeker). You take the exam at the Dutch embassy or consulate in your own country.",
    how: "How it works",
    parts: {
      kns: "KNS – knowledge of Dutch society",
      knsB: "30 photo questions, 2 options, 30 minutes. Questions are read aloud and shown. About 21/30 is needed.",
      lezen: "Reading",
      lezenB: "9 short texts, 19 multiple-choice questions, 35 minutes.",
      spreken: "Speaking",
      sprekenB:
        "10 video questions + 12 sentence completions, 30 minutes. Maximum 2 points per question (correct + understandable); grammar need not be perfect.",
    },
    pass: "Score: 1–10 scale per part, 6 is needed. About 21/30 (KNS), 14/19 (Reading), 34/44 (Speaking).",
    reg: {
      t: "Registration",
      b: "Choose your country: via nederlandwereldwijd.nl you find the exam at your embassy. Price varies per country (approx. €140–220; your country's page is authoritative).",
      link: "Take the exam in your country (Nederland Wereldwijd)",
    },
    study: {
      t: "Official study material",
      b: "Naar Nederland is the free official self-study package, in multiple languages. It includes e.g. the KNS photo book (100 questions) and the complete Speaking question list (March 2024).",
      link: "Naar Nederland (free)",
    },
    practice: {
      t: "Practice",
      b: "On naarnederland.nl you can practice for free: KNS (5 sample questions), Reading (19 questions) and Speaking (22 tasks).",
      link: "Practice on Naar Nederland",
    },
  },
  a2: {
    title: "Integration Exam A2 (in the Netherlands)",
    intro:
      "For people living in the Netherlands who became subject to the integration obligation after 1 October 2017. The exam has five parts; each part can be taken and passed separately (no averaging).",
    partsTitle: "The five parts",
    parts: {
      lezen: "Reading – 65 min (computer)",
      luisteren: "Listening – 45 min (computer, each clip played once)",
      schrijven: "Writing – 40 min (paper)",
      spreken: "Speaking – 35 min (with examiner)",
      knm: "KNM – 45 min (computer)",
    },
    pass: "Score per part: 1–10 scale, 6 is needed. Each part counts separately.",
    price: "Price: €50 per part, €250 in total (exemptions and discounts exist).",
    reg: {
      t: "Registration",
      b: "Via Mijn DUO (with DigiD). Parts on the same day or spread out. Exam locations: Amsterdam, Eindhoven, Rijswijk, Rotterdam, Utrecht, Zwolle.",
      link: "Take the integration exam (inburgeren.nl)",
    },
    practice: {
      t: "Official practice material",
      b: "DUO has 15 official practice exams: 12 online (Speaking, Listening, Reading, KNM) and 3 PDFs (Writing).",
      link: "Practice on inburgeren.nl",
    },
  },
  b1: {
    title: "Dutch National Exam NT2 Programme I (B1) + KNM",
    intro:
      "The B1 route: the Dutch National Exam for Dutch as a Second Language (NT2) at level B1, plus the KNM. Also for people who need a B1 diploma via the education route or after an unsuccessful A2.",
    partsTitle: "Four language parts + KNM",
    parts: {
      lezen: "Reading – 110 min, approx. 35 multiple-choice questions (6 long texts; paper + screen)",
      luisteren: "Listening – 90 min, approx. 38–39 questions (4–5 audio clips + 1 video, each once)",
      schrijven: "Writing – 100 min, 12 typed tasks (8 sentences, 2 half-texts, 2 texts)",
      spreken: "Speaking – approx. 30 min, 16 recordings (8×20 s + 8×30 s; you see each question once)",
      knm: "KNM – 45 min (see our KNM practice)",
    },
    pass:
      "Score: raw result converted to a 0–1000 scale; ≥500 per part is needed. CvTE publishes the raw pass lines after every sitting.",
    reg: {
      t: "Registration & rules",
      b: "Via Mijn DUO (DigiD). Payment by iDEAL or invoice (no later than 3 weeks beforehand). Result after approx. 5 weeks in Mijn DUO. No digital devices (since August 2026). For Reading/Writing only the Van Dale Pocket NT2 dictionary is allowed.",
      link: "NT2 (staatsexamensnt2.nl)",
    },
    dict: "Allowed: Van Dale Pocketwoordenboek NT2 (Reading & Writing only).",
    practice: {
      t: "Practice",
      b: "The official practice environment (with the real exam system) is at oefenexamensnt2.nl. Our recommendation: do a full simulation there first.",
      link: "Official NT2 practice environment",
    },
  },
  data: {
    title: "Exam data & history",
    intro:
      "NT2 publishes the raw pass lines per part after every sitting. Below are the published values; we add them yearly. At the bottom: characteristics of the real 2023–2025 exams.",
    tableTitle: "NT2 raw pass lines (published by CvTE/DUO)",
    cols: { part: "Part", max: "Max", raw: "Pass line", year: "Year", source: "Source" },
    statsTitle: "Characteristics of real NT2 exams (2023–2025)",
    statsIntro:
      "Counted by inburgeringscursus.nl over released final exams (independent double count; for <80 questions only the agreeing parts).",
    stats: {
      lezen: "Reading: in 105 questions, 68 had the answer 'paraphrased' in the text.",
      luisteren: "Listening: of 115 questions, 105 were about a conversation between two people.",
      schrijven: "Writing: of 36 writing tasks, 23 were an email.",
      spreken: "Speaking: of 48 speaking tasks, 22 asked you to give a reason (because / especially because).",
    },
    knmStatsTitle: "Characteristics of the 80 official KNM practice questions (2025)",
    knmStats: {
      a: "52 of 80 questions are about work, agencies, healthcare or government (the 4 big blocks).",
      b: "36 of 79 questions test 'who is responsible, which rights do you have'.",
      c: "For 77 of 79 questions the distractors are real existing agencies/rules (only the situation decides).",
      d: "30 of 76 distractor traps are about 'confusable' concepts (who is actually responsible?).",
      e: "For 78 of 80 questions you barely need the image; read the situation first.",
    },
    sourceNote:
      "Sources: CvTE/DUO announcements per sitting; inburgeringscursus.nl (exam research B1 and KNM). We add entries here as soon as DUO publishes new pass lines.",
  },
  bronnen: {
    title: "Resources & more practice",
    intro:
      "Everything you can use: the official (free) sources first, then reliable external sources. Buying anything is never necessary.",
    officialTitle: "Official (free, government)",
    commercialTitle: "External sources (paid or free, unofficial)",
    why: "Why recommended",
    open: "Open",
  },
  faq: {
    title: "Frequently asked questions",
    q1: "Is this site the official exam?",
    a1: "No. This is independent practice material. The official exam and rules are on inburgeren.nl (A1/A2/KNM) and staatsexamensnt2.nl (NT2).",
    q2: "How much does the integration exam cost?",
    a2: "KNM €50. A2: €50 per part (€250 total). NT2: €50 per part (€250 total). A1 (abroad): approx. €140–220, depending on country. Exemptions exist.",
    q3: "Who decides which exam I must take?",
    a3: "Your municipality makes a PIP (Personal Integration Plan) stating your route. Request it from your municipality.",
    q4: "May I bring a dictionary?",
    a4: "For NT2 Reading and Writing only the Van Dale Pocket NT2 dictionary is allowed. For A2 no aids are allowed.",
    q5: "When is the result?",
    a5: "NT2 after approx. 5 weeks (in Mijn DUO, after 15:00). A2/KNM via Mijn Inburgering.",
  },
  footer: {
    disclaimer:
      "This is independent practice material, not an official exam. Official rules, registration, prices and results: inburgeren.nl and staatsexamensnt2.nl.",
    official: "Official sites",
    contact: "Contact (official)",
    duo: "DUO: 050 599 89 33 · nt2@duo.nl",
    cvte: "CvTE: 030 230 60 62 · info@staatsexamensnt2.nl (Mon–Fri 9:00–17:00)",
    rights: "All official exam questions and images are © the Ministry of SZW / DUO; we do not republish official questions.",
  },
  common: {
    loading: "Loading…",
    min: "min",
    sec: "s",
    startOver: "Start over",
    back: "Back",
    officialSite: "Official site",
    external: "Opens external site",
  },
}
