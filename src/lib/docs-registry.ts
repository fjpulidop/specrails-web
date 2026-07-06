import { type LanguageId } from "@/lib/i18n";

const rawGuideDocs = import.meta.glob<string>("../content/guide/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export interface DocEntry {
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  content: string;
  section?: string;
}

interface GuideSpec {
  category: string;
  file: string;
  order: number;
  sourceSlug: string;
}

const DEFAULT_LANGUAGE: LanguageId = "en";

const CATEGORY_LABELS: Record<LanguageId, Record<string, string>> = {
  en: {
    "getting-started": "Getting started",
    specs: "Specs",
    pipeline: "Pipeline",
    agents: "Agents",
    insights: "Insights",
    integrations: "Integrations",
    settings: "Settings",
  },
  es: {
    "getting-started": "Primeros pasos",
    specs: "Specs",
    pipeline: "Pipeline",
    agents: "Agentes",
    insights: "Insights",
    integrations: "Integraciones",
    settings: "Ajustes",
  },
  fr: {
    "getting-started": "Bien démarrer",
    specs: "Specs",
    pipeline: "Pipeline",
    agents: "Agents",
    insights: "Insights",
    integrations: "Intégrations",
    settings: "Réglages",
  },
  de: {
    "getting-started": "Erste Schritte",
    specs: "Specs",
    pipeline: "Pipeline",
    agents: "Agenten",
    insights: "Insights",
    integrations: "Integrationen",
    settings: "Einstellungen",
  },
  pt: {
    "getting-started": "Primeiros passos",
    specs: "Specs",
    pipeline: "Pipeline",
    agents: "Agentes",
    insights: "Insights",
    integrations: "Integrações",
    settings: "Definições",
  },
  it: {
    "getting-started": "Primi passi",
    specs: "Spec",
    pipeline: "Pipeline",
    agents: "Agenti",
    insights: "Insights",
    integrations: "Integrazioni",
    settings: "Impostazioni",
  },
  zh: {
    "getting-started": "入门",
    specs: "规格",
    pipeline: "流水线",
    agents: "代理",
    insights: "洞察",
    integrations: "集成",
    settings: "设置",
  },
  ja: {
    "getting-started": "はじめに",
    specs: "スペック",
    pipeline: "パイプライン",
    agents: "エージェント",
    insights: "インサイト",
    integrations: "連携",
    settings: "設定",
  },
};

const CATEGORY_ORDER = [
  "getting-started",
  "specs",
  "pipeline",
  "agents",
  "insights",
  "integrations",
  "settings",
];

function parseGuideKey(key: string): GuideSpec | null {
  const match = key.match(
    /^\.\.\/content\/guide\/en\/([^/]+)\/(\d+)-(.+)\.md$/,
  );
  if (!match) return null;
  return {
    category: match[1],
    file: `${match[2]}-${match[3]}.md`,
    order: Number.parseInt(match[2], 10),
    sourceSlug: match[3],
  };
}

const GUIDE_SPECS: GuideSpec[] = Object.keys(rawGuideDocs)
  .map(parseGuideKey)
  .filter((spec): spec is GuideSpec => spec !== null)
  .sort((a, b) => {
    const categoryDelta =
      categoryRank(a.category) - categoryRank(b.category) ||
      a.category.localeCompare(b.category);
    if (categoryDelta !== 0) return categoryDelta;
    return a.order - b.order || a.sourceSlug.localeCompare(b.sourceSlug);
  });

function categoryRank(category: string): number {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function categoryLabel(category: string, language: LanguageId): string {
  return (
    CATEGORY_LABELS[language]?.[category] ??
    CATEGORY_LABELS[DEFAULT_LANGUAGE]?.[category] ??
    toTitle(category)
  );
}

function toTitle(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function routeSlug(category: string, sourceSlug: string): string {
  if (category === "getting-started" && sourceSlug === "what-is-specrails") {
    return "getting-started";
  }
  return `${category}-${sourceSlug}`;
}

function contentFor(language: LanguageId, spec: GuideSpec): string {
  const localizedKey = `../content/guide/${language}/${spec.category}/${spec.file}`;
  const englishKey = `../content/guide/${DEFAULT_LANGUAGE}/${spec.category}/${spec.file}`;
  const content = rawGuideDocs[localizedKey] ?? rawGuideDocs[englishKey];
  if (!content) {
    throw new Error(`Missing documentation content: ${englishKey}`);
  }
  return stripMarkdownNav(content);
}

function extractTitle(content: string, sourceSlug: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : toTitle(sourceSlug);
}

function extractDescription(content: string): string {
  const body = content
    .replace(/^#\s+.+$/m, "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#") && !line.startsWith("```"));

  if (!body) return "";
  return body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .slice(0, 170)
    .trim();
}

// Strip inline markdown navigation lines that come from source docs; DocPage
// renders its own previous/next navigation.
function stripMarkdownNav(content: string): string {
  return content
    .split("\n")
    .filter((line) => !/^\[←[^\]]*\]\([^)]*\)/.test(line.trim()))
    .join("\n")
    .trimEnd();
}

const docsCache = new Map<LanguageId, DocEntry[]>();

export function getDocs(language: LanguageId = DEFAULT_LANGUAGE): DocEntry[] {
  const cached = docsCache.get(language);
  if (cached) return cached;

  const docs = GUIDE_SPECS.map((spec) => {
    const content = contentFor(language, spec);
    return {
      slug: routeSlug(spec.category, spec.sourceSlug),
      sourceSlug: spec.sourceSlug,
      category: spec.category,
      title: extractTitle(content, spec.sourceSlug),
      description: extractDescription(content),
      content,
      section: categoryLabel(spec.category, language),
    };
  });

  docsCache.set(language, docs);
  return docs;
}

export const DOCS: DocEntry[] = getDocs(DEFAULT_LANGUAGE);

export function getDocBySlug(
  slug: string,
  language: LanguageId = DEFAULT_LANGUAGE,
): DocEntry | undefined {
  return getDocs(language).find((doc) => doc.slug === slug);
}

export function getAdjacentDocs(
  slug: string,
  language: LanguageId = DEFAULT_LANGUAGE,
): {
  prev: DocEntry | null;
  next: DocEntry | null;
} {
  const docs = getDocs(language);
  const idx = docs.findIndex((doc) => doc.slug === slug);
  return {
    prev: idx > 0 ? docs[idx - 1] : null,
    next: idx >= 0 && idx < docs.length - 1 ? docs[idx + 1] : null,
  };
}

function findSpec(category: string, sourceSlug: string): GuideSpec | undefined {
  return GUIDE_SPECS.find(
    (spec) => spec.category === category && spec.sourceSlug === sourceSlug,
  );
}

function normalizeRelativePath(pathPart: string, currentCategory?: string): {
  category: string;
  sourceSlug: string;
} | null {
  const rawSegments = pathPart
    .replace(/\.md$/, "")
    .split("/")
    .filter(Boolean);

  const stack = currentCategory ? [currentCategory] : [];
  for (const segment of rawSegments) {
    if (segment === ".") continue;
    if (segment === "..") {
      stack.pop();
      continue;
    }
    stack.push(segment);
  }

  if (stack.length === 0) return null;

  const rawSourceSlug = stack.pop();
  const category = stack.pop() ?? currentCategory;
  if (!rawSourceSlug || !category) return null;

  const sourceSlug = rawSourceSlug.replace(/^\d+-/, "");
  return { category, sourceSlug };
}

export function resolveDocHref(
  href: string,
  currentDoc?: Pick<DocEntry, "category" | "sourceSlug">,
): string {
  if (
    href.startsWith("http") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("/")
  ) {
    return href;
  }

  const [pathPart, hashPart = ""] = href.split("#");
  if (!pathPart) return href;

  const normalized = normalizeRelativePath(pathPart, currentDoc?.category);
  if (!normalized) return href;

  let spec = findSpec(normalized.category, normalized.sourceSlug);
  if (!spec) {
    spec = GUIDE_SPECS.find((candidate) => candidate.sourceSlug === normalized.sourceSlug);
  }
  if (!spec) return href;

  const hash = hashPart ? `#${hashPart}` : "";
  return `/docs/${routeSlug(spec.category, spec.sourceSlug)}${hash}`;
}

export function docPathToSlug(path: string): string {
  const clean = path
    .replace(/^\.\//, "")
    .replace(/^\.\.\//, "")
    .replace(/^docs\/guide\/[^/]+\//, "")
    .replace(/^docs\//, "")
    .replace(/\.md$/, "");

  const parts = clean.split("/").filter(Boolean);
  if (parts.length >= 2) {
    const sourceSlug = parts[parts.length - 1].replace(/^\d+-/, "");
    return routeSlug(parts[parts.length - 2], sourceSlug);
  }

  const sourceSlug = clean.replace(/^\d+-/, "");
  const spec = GUIDE_SPECS.find((candidate) => candidate.sourceSlug === sourceSlug);
  return spec ? routeSlug(spec.category, spec.sourceSlug) : sourceSlug;
}
