import type { LanguageId } from "@/lib/i18n";
import index from "@/lib/docs-generated.json";
import { categoryLabel } from "@/lib/docs-copy";

interface Translation { title: string; description: string; headings: string[] }
interface GuideSpec { key: string; slug: string; sourceSlug: string; category: string; translations: Partial<Record<LanguageId, Translation>> }
export interface DocEntry {
  key: string; slug: string; sourceSlug: string; category: string; title: string; description: string;
  headings: string[]; section: string; language: LanguageId; contentLanguage: LanguageId; isFallback: boolean;
}
export interface LoadedDoc extends DocEntry { content: string }
const GUIDE_SPECS: GuideSpec[] = index.entries;
const docsCache = new Map<LanguageId, DocEntry[]>();
function routeSlug(category: string, sourceSlug: string) {
  return category === 'getting-started' && sourceSlug === 'what-is-specrails' ? 'getting-started' : `${category}-${sourceSlug}`;
}
export function getDocs(language: LanguageId = 'en'): DocEntry[] {
  const cached = docsCache.get(language); if (cached) return cached;
  const docs = GUIDE_SPECS.map(spec => {
    const contentLanguage = spec.translations[language] ? language : 'en';
    const metadata = spec.translations[contentLanguage]!;
    return { key: spec.key, slug: spec.slug, sourceSlug: spec.sourceSlug, category: spec.category, ...metadata,
      section: categoryLabel(spec.category, language), language, contentLanguage, isFallback: contentLanguage !== language };
  });
  docsCache.set(language, docs); return docs;
}
export const DOCS = getDocs();
export function getDocBySlug(slug: string, language: LanguageId = 'en') { return getDocs(language).find(doc => doc.slug === slug); }
export function getAdjacentDocs(slug: string, language: LanguageId = 'en') {
  const docs = getDocs(language); const index = docs.findIndex(doc => doc.slug === slug);
  return { prev: index > 0 ? docs[index - 1] : null, next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null };
}
export async function loadDocContent(doc: DocEntry): Promise<string> {
  // Even the loader map stays out of the public landing page's dependency graph.
  const { loadArticle } = await import('./docs-content');
  return loadArticle(doc);
}
function normalizeSearch(value: string) { return value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim(); }
export function searchDocs(query: string, language: LanguageId = 'en'): DocEntry[] {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const docs = getDocs(language); if (!terms.length) return docs;
  return docs.map((doc, order) => {
    const title = normalizeSearch(doc.title);
    const body = normalizeSearch([doc.description, doc.section, doc.sourceSlug, ...doc.headings].join(' '));
    const score = terms.every(term => title.includes(term) || body.includes(term))
      ? terms.reduce((n, term) => n + (title === term ? 8 : title.startsWith(term) ? 4 : title.includes(term) ? 2 : 1), 0) : 0;
    return { doc, score, order };
  }).filter(result => result.score > 0).sort((a,b) => b.score - a.score || a.order - b.order).map(result => result.doc);
}
function findSpec(category: string, sourceSlug: string) { return GUIDE_SPECS.find(spec => spec.category === category && spec.sourceSlug === sourceSlug); }

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
