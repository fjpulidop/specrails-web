import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGE_IDS = ["en", "es", "fr", "de", "pt", "it", "zh", "ja"] as const;
export type LanguageId = (typeof LANGUAGE_IDS)[number];

export interface LanguageDescriptor {
  id: LanguageId;
  nativeName: string;
  englishName: string;
}

export const LANGUAGES: Record<LanguageId, LanguageDescriptor> = {
  en: { id: "en", nativeName: "English", englishName: "English" },
  es: { id: "es", nativeName: "Español", englishName: "Spanish" },
  fr: { id: "fr", nativeName: "Français", englishName: "French" },
  de: { id: "de", nativeName: "Deutsch", englishName: "German" },
  pt: { id: "pt", nativeName: "Português", englishName: "Portuguese" },
  it: { id: "it", nativeName: "Italiano", englishName: "Italian" },
  zh: { id: "zh", nativeName: "中文", englishName: "Chinese" },
  ja: { id: "ja", nativeName: "日本語", englishName: "Japanese" },
};

const STORAGE_KEY = "specrails-web:language";
const DEFAULT_LANGUAGE: LanguageId = "en";

export function isLanguageId(value: unknown): value is LanguageId {
  return typeof value === "string" && (LANGUAGE_IDS as readonly string[]).includes(value);
}

export interface SiteCopy {
  seo: {
    title: string;
    description: string;
  };
  nav: {
    product: string;
    specs: string;
    loops: string;
    engineering: string;
    docs: string;
    download: string;
    github: string;
    donate: string;
    menu: string;
    sections: string;
    resources: string;
  };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleGradient: string;
    subtitle: string;
    download: string;
    docs: string;
    worksWith: string;
    trust: string[];
    launcherLabel: string;
    launcherTitle: string;
    launcherSubtitle: string;
    missionPlaceholder: string;
    missionButton: string;
    launcherMeta: string[];
    missionRows: Array<{ label: string; value: string }>;
  };
  pipeline: {
    eyebrow: string;
    title: string;
    gradient: string;
    intro: string;
    modes: Array<{ title: string; body: string }>;
    stages: Array<{ label: string; phase: string; actor: string; desc: string }>;
    cta: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    gradient: string;
    intro: string;
    loopTitle: string;
    loopSubtitle: string;
    nodes: Array<{ title: string; body: string }>;
    checks: string[];
  };
  problem: {
    eyebrow: string;
    title: string;
    gradient: string;
    intro: string;
    beforeTitle: string;
    afterTitle: string;
    before: string[];
    after: string[];
    vibeTitle: string;
    vibeBody: string;
  };
  products: {
    eyebrow: string;
    title: string;
    gradient: string;
    intro: string;
    modes: Array<{ label: string; title: string; body: string; points: string[] }>;
    appTitle: string;
    appBody: string;
    capabilities: Array<{ title: string; body: string }>;
    runtimeTitle: string;
    runtimeBody: string;
    localTitle: string;
    localBody: string;
    cta: string;
    boardExpand: string;
    boardVideoLabel: string;
  };
  footer: {
    headline: string;
    body: string;
    download: string;
    docs: string;
    note: string;
  };
  docs: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    body: string;
    start: string;
    sidebar: string;
    sections: Record<string, { label: string; blurb: string }>;
  };
  language: {
    label: string;
    change: string;
  };
}

const en: SiteCopy = {
  seo: {
    title: "specrails — Vibe Engineering guided by specs",
    description:
      "Specrails is the local-first desktop app for robust AI software development: turn prompts into specs, run mission-control loops, and ship through guided rails.",
  },
  nav: {
    product: "Product",
    specs: "Specs",
    loops: "Loops",
    engineering: "Vibe Engineering",
    docs: "Docs",
    download: "Download",
    github: "GitHub",
    donate: "Donate on Ko-fi",
    menu: "Menu",
    sections: "Sections",
    resources: "Resources",
  },
  hero: {
    eyebrow: "Local-first · Spec-driven · Mission Control",
    titleTop: "Build with prompts.",
    titleGradient: "Ship with specs.",
    subtitle:
      "Specrails turns vibe coding into Vibe Engineering: a desktop Mission Control where a prepared AI agent launches spec-driven missions and controls the development flow through Specrails Board.",
    download: "Download Specrails",
    docs: "Read the docs",
    worksWith: "Works with",
    trust: ["macOS & Windows", "Claude · Codex · Gemini", "No accounts · local data"],
    launcherLabel: "Mission Control",
    launcherTitle: "What's the mission?",
    launcherSubtitle: "The primary work mode: describe the mission and let the agent drive the spec, loop, rail and review flow.",
    missionPlaceholder: "Add SSO login with audited session expiry…",
    missionButton: "Launch mission",
    launcherMeta: ["Agent prepared", "MCP → Board", "Spec-first loop"],
    missionRows: [
      { label: "Spec", value: "Draft contract, acceptance criteria, invariants" },
      { label: "Loop", value: "Implement → verify → fix until green" },
      { label: "Review", value: "Ask-first PR, cost, logs, decision trail" },
    ],
  },
  pipeline: {
    eyebrow: "Spec Driven Development",
    title: "The spec is the unit of work.",
    gradient: "The prompt is only the beginning.",
    intro:
      "A prompt is volatile. A spec is durable: intent, constraints, acceptance criteria, context and delivery rules in one artifact the app can run, compare and refine.",
    modes: [
      { title: "Quick", body: "Turn a clear idea into a full spec in one shot." },
      { title: "Explore", body: "Shape the spec in conversation while the live draft updates." },
      { title: "Raw", body: "Bring your own exact spec when no AI authoring is needed." },
    ],
    stages: [
      { label: "Idea", phase: "Prompt", actor: "Mission Control", desc: "Capture the outcome, project, provider and context." },
      { label: "Spec", phase: "Contract", actor: "Spec draft", desc: "Define acceptance criteria, data shapes, invariants and file intent." },
      { label: "Loop", phase: "Execution", actor: "Rail", desc: "Run built-in or custom loops against the spec." },
      { label: "Verify", phase: "Feedback", actor: "Decider", desc: "Repeat verify and fix steps until the goal is met or a cap stops it." },
      { label: "PR", phase: "Review", actor: "Human", desc: "Create, publish or discard work before anything merges." },
    ],
    cta: "See how loops run",
  },
  demo: {
    eyebrow: "Custom loops",
    title: "Your development process becomes",
    gradient: "a reusable graph.",
    intro:
      "Specrails ships with Implement, Batch and Freestyle, then lets you build your own loops: AI steps, shell commands and loop deciders with iteration, timeout and cost caps.",
    loopTitle: "Ship & Green",
    loopSubtitle: "A mission-control loop for reliable vibe coding",
    nodes: [
      { title: "AI Step", body: "Implement the spec using project context." },
      { title: "Shell", body: "Run lint, typecheck, tests or any project command." },
      { title: "Loop Decider", body: "Continue when verification fails; stop when it is green." },
      { title: "End", body: "Produce a reviewable result, not a hidden merge." },
    ],
    checks: ["Dry-run preview", "Copy/paste steps", "Shared constants", "Publish to every rail"],
  },
  problem: {
    eyebrow: "Why specs",
    title: "Vibe coding is fast.",
    gradient: "Vibe Engineering makes it repeatable.",
    intro:
      "The useful part of vibe coding is speed. The dangerous part is missing structure. Specrails joins natural-language prompting with spec-driven execution so AI work has shape, memory and review gates.",
    beforeTitle: "Prompt-only coding",
    afterTitle: "Spec-driven vibe engineering",
    before: ["Intent lives in chat history", "The model guesses boundaries", "Verification is easy to skip", "Results are hard to compare"],
    after: ["Intent becomes a spec", "Loops encode the process", "Verification can repeat automatically", "Every run leaves cost, logs and PR decisions"],
    vibeTitle: "Vibe Engineering",
    vibeBody:
      "Robust application development through prompts: use natural language to define intent, then let specs, loops, rails and human review turn that intent into software you can trust.",
  },
  products: {
    eyebrow: "Specrails",
    title: "Specrails has two modes.",
    gradient: "Mission Control comes first.",
    intro:
      "For users, Specrails means the desktop app. Most work happens in Mission Control: an AI agent already prepared with Specrails context uses MCP to operate the Board and coordinate the whole spec-driven development loop.",
    modes: [
      {
        label: "Primary mode",
        title: "Mission Control",
        body:
          "Launch guided missions with an AI agent that knows how Specrails works. You describe the outcome; the agent uses MCP to talk directly to Specrails Board, manage specs, start loops and keep the flow coherent.",
        points: [
          "Agent-guided development for most day-to-day work",
          "Direct MCP control over specs, rails, loops, jobs and context",
          "Prompts become missions with spec-backed execution and review",
        ],
      },
      {
        label: "Manual mode",
        title: "Specrails Board",
        body:
          "A Kanban-style development surface for humans who want to run the workflow directly. You move specs through rails, choose loops and providers, and can still call on the agent for support.",
        points: [
          "Human-operated specs and rails",
          "Kanban visibility over work, jobs and verification",
          "Agent assistance remains available without taking over",
        ],
      },
    ],
    appTitle: "Specrails Board",
    appBody:
      "Board is the direct-control mode: specs on the left, rails on the right, and every execution visible.",
    capabilities: [
      { title: "Specs", body: "Quick, Explore, Raw, SMASH and comparison keep intent concrete." },
      { title: "Rails", body: "Run specs through provider-specific loops with visible state." },
      { title: "Jobs", body: "Live logs, cost, tokens and decisions stay attached to the run." },
      { title: "Loops", body: "Reusable AI, shell and decider steps encode your process." },
    ],
    runtimeTitle: "Bundled runtime",
    runtimeBody: "The desktop app installs and pins the project runtime when a repo needs it.",
    localTitle: "Local-first",
    localBody: "No account system, no cloud workspace, no telemetry leaving your machine.",
    cta: "Download Specrails",
    boardExpand: "Expand video",
    boardVideoLabel: "Real Specrails Board flow creating a spec and moving it to a rail",
  },
  footer: {
    headline: "Start with a mission. Leave with a spec-backed change.",
    body: "Download Specrails, add a project, create your first spec, and run the loop from Mission Control.",
    download: "Download",
    docs: "Documentation",
    note: "Open source · local-first · built for Claude, Codex and Gemini",
  },
  docs: {
    seoTitle: "Documentation — specrails",
    seoDescription:
      "Specrails Desktop documentation: getting started, creating specs, running loops and rails, providers, analytics, terminal, MCP and internals.",
    eyebrow: "Documentation",
    title: "Learn Specrails from the desktop app outward.",
    body:
      "These docs are copied from the current Specrails Desktop documentation and organized around the product users actually run.",
    start: "Start with Getting started",
    sidebar: "Documentation",
    sections: {
      Start: { label: "Start here", blurb: "Install Specrails, add a project and create your first spec." },
      Product: { label: "Product guide", blurb: "Specs, rails, loops, costs, terminal and customization." },
      Providers: { label: "Providers", blurb: "Run Specrails with Claude, Codex or Gemini." },
      Platform: { label: "Platforms", blurb: "macOS and Windows notes." },
      Integrations: { label: "Integrations", blurb: "MCP, Jira and external automation." },
      Internals: { label: "Internals", blurb: "Architecture, API, configuration and development runbooks." },
      Research: { label: "Research", blurb: "Provider studies and planning notes." },
    },
  },
  language: {
    label: "Language",
    change: "Change language",
  },
};

const es: SiteCopy = {
  ...en,
  seo: {
    title: "specrails — Vibe Engineering guiado por specs",
    description:
      "Specrails es la app desktop local-first para desarrollo robusto con IA: convierte prompts en specs, ejecuta loops desde Mission Control y entrega cambios guiados.",
  },
  nav: {
    product: "Producto",
    specs: "Specs",
    loops: "Loops",
    engineering: "Vibe Engineering",
    docs: "Docs",
    download: "Descargar",
    github: "GitHub",
    donate: "Donar en Ko-fi",
    menu: "Menú",
    sections: "Secciones",
    resources: "Recursos",
  },
  hero: {
    ...en.hero,
    eyebrow: "Local-first · Spec-driven · Mission Control",
    titleTop: "Construye con prompts.",
    titleGradient: "Entrega con specs.",
    subtitle:
      "Specrails convierte el vibe coding en Vibe Engineering: un Mission Control de escritorio donde un agente de IA preparado lanza misiones guiadas por specs y controla el flujo mediante Specrails Board.",
    download: "Descargar Specrails",
    docs: "Leer docs",
    worksWith: "Funciona con",
    trust: ["macOS y Windows", "Claude · Codex · Gemini", "Sin cuentas · datos locales"],
    launcherTitle: "¿Cuál es la misión?",
    launcherSubtitle: "El modo principal de trabajo: describe la misión y deja que el agente conduzca la spec, el loop, el rail y la revisión.",
    missionPlaceholder: "Añadir login SSO con expiración de sesión auditada…",
    missionButton: "Lanzar misión",
    launcherMeta: ["Agente preparado", "MCP → Board", "Loop spec-first"],
    missionRows: [
      { label: "Spec", value: "Contrato, criterios de aceptación e invariantes" },
      { label: "Loop", value: "Implementar → verificar → corregir hasta verde" },
      { label: "Review", value: "PR ask-first, coste, logs y decisiones" },
    ],
  },
  pipeline: {
    ...en.pipeline,
    eyebrow: "Spec Driven Development",
    title: "La spec es la unidad de trabajo.",
    gradient: "El prompt es solo el inicio.",
    intro:
      "Un prompt es volátil. Una spec es durable: intención, restricciones, criterios de aceptación, contexto y reglas de entrega en un artefacto que la app puede ejecutar, comparar y refinar.",
    modes: [
      { title: "Quick", body: "Convierte una idea clara en una spec completa de una vez." },
      { title: "Explore", body: "Moldea la spec conversando mientras el borrador vivo se actualiza." },
      { title: "Raw", body: "Trae tu spec exacta cuando no necesitas autoría con IA." },
    ],
    stages: [
      { label: "Idea", phase: "Prompt", actor: "Mission Control", desc: "Captura resultado, proyecto, proveedor y contexto." },
      { label: "Spec", phase: "Contrato", actor: "Borrador", desc: "Define criterios, datos, invariantes e intención de archivos." },
      { label: "Loop", phase: "Ejecución", actor: "Rail", desc: "Ejecuta loops integrados o personalizados contra la spec." },
      { label: "Verificar", phase: "Feedback", actor: "Decider", desc: "Repite verificar y corregir hasta cumplir el objetivo o llegar a un límite." },
      { label: "PR", phase: "Review", actor: "Humano", desc: "Crea, publica o descarta antes de fusionar nada." },
    ],
    cta: "Ver cómo corren los loops",
  },
  demo: {
    ...en.demo,
    eyebrow: "Loops personalizados",
    title: "Tu proceso de desarrollo se convierte en",
    gradient: "un grafo reutilizable.",
    intro:
      "Specrails trae Implement, Batch y Freestyle, y además permite crear tus propios loops: pasos de IA, comandos shell y loop deciders con límites de iteración, tiempo y coste.",
    loopSubtitle: "Un loop de mission control para vibe coding fiable",
    nodes: [
      { title: "Paso IA", body: "Implementa la spec usando el contexto del proyecto." },
      { title: "Shell", body: "Ejecuta lint, typecheck, tests o cualquier comando." },
      { title: "Loop Decider", body: "Continúa si falla la verificación; para cuando está verde." },
      { title: "Final", body: "Produce un resultado revisable, no un merge oculto." },
    ],
    checks: ["Preview dry-run", "Copiar/pegar pasos", "Constantes compartidas", "Publicar a todos los rails"],
  },
  problem: {
    ...en.problem,
    eyebrow: "Por qué specs",
    title: "El vibe coding es rápido.",
    gradient: "Vibe Engineering lo hace repetible.",
    intro:
      "Lo útil del vibe coding es la velocidad. Lo peligroso es la falta de estructura. Specrails une prompts en lenguaje natural con ejecución guiada por specs para que el trabajo de IA tenga forma, memoria y revisión.",
    beforeTitle: "Solo prompts",
    afterTitle: "Vibe engineering con specs",
    before: ["La intención vive en el chat", "El modelo adivina límites", "La verificación se salta fácil", "Cuesta comparar resultados"],
    after: ["La intención se vuelve spec", "Los loops codifican el proceso", "La verificación se repite sola", "Cada run deja coste, logs y decisiones"],
    vibeBody:
      "Desarrollo robusto de aplicaciones mediante prompts: usa lenguaje natural para definir intención y deja que specs, loops, rails y revisión humana la conviertan en software confiable.",
  },
  products: {
    ...en.products,
    eyebrow: "Specrails",
    title: "Specrails tiene dos modos.",
    gradient: "Mission Control va primero.",
    intro:
      "Para usuarios, Specrails significa la app desktop. La mayor parte del trabajo ocurre en Mission Control: un agente de IA ya preparado con contexto de Specrails usa MCP para operar el Board y coordinar todo el loop de desarrollo guiado por specs.",
    modes: [
      {
        label: "Modo principal",
        title: "Mission Control",
        body:
          "Lanza misiones guiadas con un agente de IA que ya sabe cómo funciona Specrails. Tú describes el resultado; el agente usa MCP para comunicarse directamente con Specrails Board, gestionar specs, arrancar loops y mantener coherente el flujo.",
        points: [
          "Desarrollo guiado por agente para el trabajo diario",
          "Control directo vía MCP sobre specs, rails, loops, jobs y contexto",
          "Los prompts se convierten en misiones con ejecución y review respaldadas por specs",
        ],
      },
      {
        label: "Modo manual",
        title: "Specrails Board",
        body:
          "Una superficie de desarrollo tipo Kanban para humanos que quieren operar el flujo directamente. Mueves specs por rails, eliges loops y proveedores, y aun así puedes apoyarte en el agente.",
        points: [
          "Specs y rails operados por el humano",
          "Visibilidad Kanban sobre trabajo, jobs y verificación",
          "El agente sigue disponible como soporte sin tomar el control",
        ],
      },
    ],
    appTitle: "Specrails Board",
    appBody:
      "Board es el modo de control directo: specs a la izquierda, rails a la derecha y cada ejecución visible.",
    capabilities: [
      { title: "Specs", body: "Quick, Explore, Raw, SMASH y comparación mantienen la intención concreta." },
      { title: "Rails", body: "Ejecuta specs mediante loops visibles por proveedor." },
      { title: "Jobs", body: "Logs vivos, coste, tokens y decisiones quedan unidos al run." },
      { title: "Loops", body: "Pasos de IA, shell y decider codifican tu proceso." },
    ],
    runtimeTitle: "Runtime incluido",
    runtimeBody: "La app instala y fija el runtime del proyecto cuando un repo lo necesita.",
    localTitle: "Local-first",
    localBody: "Sin cuentas, sin workspace cloud, sin telemetría saliendo de tu máquina.",
    cta: "Descargar Specrails",
    boardExpand: "Ampliar video",
    boardVideoLabel: "Flujo real de Specrails Board creando una spec y moviéndola a un rail",
  },
  footer: {
    headline: "Empieza con una misión. Termina con un cambio respaldado por specs.",
    body: "Descarga Specrails, añade un proyecto, crea tu primera spec y ejecuta el loop desde Mission Control.",
    download: "Descargar",
    docs: "Documentación",
    note: "Open source · local-first · creado para Claude, Codex y Gemini",
  },
  docs: {
    ...en.docs,
    seoTitle: "Documentación — specrails",
    seoDescription:
      "Documentación de Specrails Desktop: primeros pasos, creación de specs, loops y rails, proveedores, analytics, terminal, MCP e internals.",
    eyebrow: "Documentación",
    title: "Aprende Specrails desde la app desktop hacia fuera.",
    body:
      "Estos docs están copiados de la documentación actual de Specrails Desktop y organizados alrededor del producto que realmente usan los usuarios.",
    start: "Empieza con Getting started",
    sidebar: "Documentación",
    sections: {
      Start: { label: "Empieza aquí", blurb: "Instala Specrails, añade un proyecto y crea tu primera spec." },
      Product: { label: "Guía de producto", blurb: "Specs, rails, loops, costes, terminal y personalización." },
      Providers: { label: "Proveedores", blurb: "Ejecuta Specrails con Claude, Codex o Gemini." },
      Platform: { label: "Plataformas", blurb: "Notas para macOS y Windows." },
      Integrations: { label: "Integraciones", blurb: "MCP, Jira y automatización externa." },
      Internals: { label: "Internals", blurb: "Arquitectura, API, configuración y runbooks." },
      Research: { label: "Research", blurb: "Estudios de proveedores y notas de planificación." },
    },
  },
  language: {
    label: "Idioma",
    change: "Cambiar idioma",
  },
};

const fr: SiteCopy = {
  ...en,
  nav: { ...en.nav, product: "Produit", specs: "Specs", loops: "Loops", engineering: "Vibe Engineering", docs: "Docs", download: "Télécharger", menu: "Menu", sections: "Sections", resources: "Ressources" },
  hero: {
    ...en.hero,
    titleTop: "Construisez avec des prompts.",
    titleGradient: "Livrez avec des specs.",
    subtitle:
      "Specrails transforme le vibe coding en Vibe Engineering: un Mission Control desktop où un agent IA préparé lance des missions guidées par specs et pilote le Board.",
    download: "Télécharger Specrails",
    docs: "Lire les docs",
    worksWith: "Fonctionne avec",
    trust: ["macOS et Windows", "Claude · Codex · Gemini", "Sans compte · données locales"],
    launcherTitle: "Quelle est la mission ?",
    launcherSubtitle: "Choisissez un projet, décrivez le résultat, puis sélectionnez la boucle à exécuter.",
    missionButton: "Lancer la mission",
  },
  pipeline: { ...en.pipeline, title: "La spec est l'unité de travail.", gradient: "Le prompt n'est que le début." },
  demo: { ...en.demo, title: "Votre processus de développement devient", gradient: "un graphe réutilisable." },
  problem: { ...en.problem, title: "Le vibe coding est rapide.", gradient: "Vibe Engineering le rend répétable." },
  products: { ...en.products, title: "Specrails a deux modes.", gradient: "Mission Control d'abord.", cta: "Télécharger Specrails", boardExpand: "Agrandir la vidéo", boardVideoLabel: "Flux réel de Specrails Board créant une spec et la déplaçant vers un rail" },
  footer: { ...en.footer, download: "Télécharger", docs: "Documentation" },
  language: { label: "Langue", change: "Changer de langue" },
};

const de: SiteCopy = {
  ...en,
  nav: { ...en.nav, product: "Produkt", specs: "Specs", loops: "Loops", engineering: "Vibe Engineering", docs: "Docs", download: "Download", menu: "Menü", sections: "Bereiche", resources: "Ressourcen" },
  hero: {
    ...en.hero,
    titleTop: "Mit Prompts bauen.",
    titleGradient: "Mit Specs liefern.",
    subtitle:
      "Specrails macht aus Vibe Coding Vibe Engineering: ein Desktop-Mission-Control, in dem ein vorbereiteter KI-Agent spec-geführte Missionen startet und das Board steuert.",
    download: "Specrails herunterladen",
    docs: "Docs lesen",
    worksWith: "Funktioniert mit",
    trust: ["macOS und Windows", "Claude · Codex · Gemini", "Keine Accounts · lokale Daten"],
    launcherTitle: "Was ist die Mission?",
    launcherSubtitle: "Projekt wählen, Ergebnis beschreiben und den Loop auswählen.",
    missionButton: "Mission starten",
  },
  pipeline: { ...en.pipeline, title: "Die Spec ist die Arbeitseinheit.", gradient: "Der Prompt ist nur der Anfang." },
  demo: { ...en.demo, title: "Ihr Entwicklungsprozess wird", gradient: "zu einem wiederverwendbaren Graphen." },
  problem: { ...en.problem, title: "Vibe Coding ist schnell.", gradient: "Vibe Engineering macht es wiederholbar." },
  products: { ...en.products, title: "Specrails hat zwei Modi.", gradient: "Mission Control zuerst.", cta: "Specrails herunterladen", boardExpand: "Video vergrößern", boardVideoLabel: "Echter Specrails-Board-Ablauf: Spec erstellen und in ein Rail verschieben" },
  footer: { ...en.footer, download: "Download", docs: "Dokumentation" },
  language: { label: "Sprache", change: "Sprache ändern" },
};

const pt: SiteCopy = {
  ...en,
  nav: { ...en.nav, product: "Produto", specs: "Specs", loops: "Loops", engineering: "Vibe Engineering", docs: "Docs", download: "Baixar", menu: "Menu", sections: "Seções", resources: "Recursos" },
  hero: {
    ...en.hero,
    titleTop: "Construa com prompts.",
    titleGradient: "Entregue com specs.",
    subtitle:
      "Specrails transforma vibe coding em Vibe Engineering: um Mission Control desktop onde um agente de IA preparado lança missões guiadas por specs e controla o Board.",
    download: "Baixar Specrails",
    docs: "Ler docs",
    worksWith: "Funciona com",
    trust: ["macOS e Windows", "Claude · Codex · Gemini", "Sem contas · dados locais"],
    launcherTitle: "Qual é a missão?",
    launcherSubtitle: "Escolha o projeto, descreva o resultado e selecione o loop.",
    missionButton: "Lançar missão",
  },
  pipeline: { ...en.pipeline, title: "A spec é a unidade de trabalho.", gradient: "O prompt é só o começo." },
  demo: { ...en.demo, title: "Seu processo de desenvolvimento vira", gradient: "um grafo reutilizável." },
  problem: { ...en.problem, title: "Vibe coding é rápido.", gradient: "Vibe Engineering torna isso repetível." },
  products: { ...en.products, title: "Specrails tem dois modos.", gradient: "Mission Control vem primeiro.", cta: "Baixar Specrails", boardExpand: "Ampliar vídeo", boardVideoLabel: "Fluxo real do Specrails Board criando uma spec e movendo-a para um rail" },
  footer: { ...en.footer, download: "Baixar", docs: "Documentação" },
  language: { label: "Idioma", change: "Alterar idioma" },
};

const it: SiteCopy = {
  ...en,
  nav: { ...en.nav, product: "Prodotto", specs: "Specs", loops: "Loops", engineering: "Vibe Engineering", docs: "Docs", download: "Scarica", menu: "Menu", sections: "Sezioni", resources: "Risorse" },
  hero: {
    ...en.hero,
    titleTop: "Costruisci con prompt.",
    titleGradient: "Rilascia con specs.",
    subtitle:
      "Specrails trasforma il vibe coding in Vibe Engineering: un Mission Control desktop dove un agente IA preparato avvia missioni guidate da specs e controlla il Board.",
    download: "Scarica Specrails",
    docs: "Leggi i docs",
    worksWith: "Funziona con",
    trust: ["macOS e Windows", "Claude · Codex · Gemini", "Nessun account · dati locali"],
    launcherTitle: "Qual è la missione?",
    launcherSubtitle: "Scegli progetto, descrivi il risultato e seleziona il loop.",
    missionButton: "Avvia missione",
  },
  pipeline: { ...en.pipeline, title: "La spec è l'unità di lavoro.", gradient: "Il prompt è solo l'inizio." },
  demo: { ...en.demo, title: "Il tuo processo di sviluppo diventa", gradient: "un grafo riutilizzabile." },
  problem: { ...en.problem, title: "Il vibe coding è veloce.", gradient: "Vibe Engineering lo rende ripetibile." },
  products: { ...en.products, title: "Specrails ha due modalità.", gradient: "Mission Control prima di tutto.", cta: "Scarica Specrails", boardExpand: "Ingrandisci video", boardVideoLabel: "Flusso reale di Specrails Board che crea una spec e la sposta in un rail" },
  footer: { ...en.footer, download: "Scarica", docs: "Documentazione" },
  language: { label: "Lingua", change: "Cambia lingua" },
};

const zh: SiteCopy = {
  ...en,
  nav: { ...en.nav, product: "产品", specs: "Specs", loops: "Loops", engineering: "Vibe Engineering", docs: "文档", download: "下载", menu: "菜单", sections: "栏目", resources: "资源" },
  hero: {
    ...en.hero,
    titleTop: "用提示构建。",
    titleGradient: "用 specs 交付。",
    subtitle:
      "Specrails 将 vibe coding 变成 Vibe Engineering：一个桌面 Mission Control，预配置的 AI agent 会启动 spec 驱动的任务并控制 Board。",
    download: "下载 Specrails",
    docs: "阅读文档",
    worksWith: "支持",
    trust: ["macOS 与 Windows", "Claude · Codex · Gemini", "无需账号 · 数据本地"],
    launcherTitle: "任务是什么？",
    launcherSubtitle: "选择项目，描述结果，然后选择要运行的 loop。",
    missionButton: "启动任务",
  },
  pipeline: { ...en.pipeline, title: "Spec 是工作的基本单元。", gradient: "Prompt 只是开始。" },
  demo: { ...en.demo, title: "你的开发流程变成", gradient: "可复用的图。" },
  problem: { ...en.problem, title: "Vibe coding 很快。", gradient: "Vibe Engineering 让它可重复。" },
  products: { ...en.products, title: "Specrails 有两种模式。", gradient: "Mission Control 优先。", cta: "下载 Specrails", boardExpand: "放大视频", boardVideoLabel: "真实的 Specrails Board 流程：创建 spec 并移动到 rail" },
  footer: { ...en.footer, download: "下载", docs: "文档" },
  language: { label: "语言", change: "切换语言" },
};

const ja: SiteCopy = {
  ...en,
  nav: { ...en.nav, product: "製品", specs: "Specs", loops: "Loops", engineering: "Vibe Engineering", docs: "Docs", download: "ダウンロード", menu: "メニュー", sections: "セクション", resources: "リソース" },
  hero: {
    ...en.hero,
    titleTop: "プロンプトで作る。",
    titleGradient: "Specs で届ける。",
    subtitle:
      "Specrails は vibe coding を Vibe Engineering に変えます。準備済みの AI エージェントが spec 駆動のミッションを開始し、Board を操作します。",
    download: "Specrails をダウンロード",
    docs: "Docs を読む",
    worksWith: "対応",
    trust: ["macOS と Windows", "Claude · Codex · Gemini", "アカウント不要 · データはローカル"],
    launcherTitle: "ミッションは何ですか？",
    launcherSubtitle: "プロジェクトを選び、成果を説明し、実行する loop を選択します。",
    missionButton: "ミッション開始",
  },
  pipeline: { ...en.pipeline, title: "Spec が作業単位です。", gradient: "Prompt は始まりにすぎません。" },
  demo: { ...en.demo, title: "開発プロセスは", gradient: "再利用できるグラフになります。" },
  problem: { ...en.problem, title: "Vibe coding は速い。", gradient: "Vibe Engineering は再現性を与えます。" },
  products: { ...en.products, title: "Specrails には2つのモードがあります。", gradient: "Mission Control が中心です。", cta: "Specrails をダウンロード", boardExpand: "動画を拡大", boardVideoLabel: "Specrails Board で spec を作成し rail へ移動する実際のフロー" },
  footer: { ...en.footer, download: "ダウンロード", docs: "ドキュメント" },
  language: { label: "言語", change: "言語を変更" },
};

export const SITE_COPY: Record<LanguageId, SiteCopy> = {
  en,
  es,
  fr,
  de,
  pt,
  it,
  zh,
  ja,
};

interface I18nContextValue {
  languageId: LanguageId;
  language: LanguageDescriptor;
  content: SiteCopy;
  setLanguage: (next: LanguageId) => void;
}

function detectBrowserLanguage(): LanguageId {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const candidates =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const tag of candidates) {
    const base = tag?.toLowerCase().split("-")[0];
    if (isLanguageId(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

function readInitialLanguage(): LanguageId {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguageId(stored)) return stored;
    } catch {
      // Ignore storage failures and fall back to browser detection.
    }
  }
  return detectBrowserLanguage();
}

const fallbackContext: I18nContextValue = {
  languageId: DEFAULT_LANGUAGE,
  language: LANGUAGES[DEFAULT_LANGUAGE],
  content: SITE_COPY[DEFAULT_LANGUAGE],
  setLanguage: () => undefined,
};

const I18nContext = createContext<I18nContextValue>(fallbackContext);

export function I18nProvider({ children }: { children: ReactNode }): JSX.Element {
  const [languageId, setLanguageId] = useState<LanguageId>(() => readInitialLanguage());

  useEffect(() => {
    document.documentElement.lang = languageId;
  }, [languageId]);

  const setLanguage = useCallback((next: LanguageId) => {
    setLanguageId(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Keep the runtime switch even if persistence is unavailable.
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      languageId,
      language: LANGUAGES[languageId],
      content: SITE_COPY[languageId],
      setLanguage,
    }),
    [languageId, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
