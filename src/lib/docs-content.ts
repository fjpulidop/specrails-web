import type { DocEntry } from './docs-registry';
import { articleLoaders } from './docs-loaders';
export async function loadArticle(doc: Pick<DocEntry, 'key' | 'contentLanguage'>): Promise<string> {
  const load = articleLoaders[`${doc.contentLanguage}/${doc.key}`];
  if (!load) throw new Error('Documentation article unavailable');
  return (await load()).replace(/^<!-- guide-revision: [^>]+-->\s*/, '').trimEnd();
}
