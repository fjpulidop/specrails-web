import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { getDocBySlug, searchDocs } from '@/lib/docs-registry';
import { CATEGORY_ORDER, categoryLabel, getDocsCopy } from '@/lib/docs-copy';
import { useI18n } from '@/lib/i18n';
import { DocsSearch } from '@/components/DocsSearch';
export default function DocsIndex() {
  const {languageId} = useI18n(); const copy = getDocsCopy(languageId); const [query, setQuery] = useState('');
  const docs = searchDocs(query, languageId);
  useSeo({title: `${copy.label} — Specrails`, description: copy.intro, canonical: 'https://specrails.dev/docs'});
  return <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
    <header className="rounded-frame border border-border/60 bg-surface-1 p-6 md:p-10">
      <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan"><BookOpen className="h-4 w-4" aria-hidden="true" />{copy.label}</p>
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">{copy.title}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{copy.intro}</p>
      <div className="mt-8 grid gap-3 md:grid-cols-3">{['getting-started','missions-first-mission','missions-review-and-delivery'].map((slug,i) => {
        const doc = getDocBySlug(slug,languageId)!;
        return <Link key={slug} to={`/docs/${slug}`} className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface-0 p-4 transition-colors hover:border-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan">
          <span className="font-mono text-xs text-brand-cyan">0{i+1}</span><span className="flex-1 text-sm font-medium">{doc.title}</span><ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-brand-cyan" aria-hidden="true" />
        </Link>;
      })}</div>
    </header>
    <div className="my-8 max-w-xl"><DocsSearch value={query} onChange={setQuery} /></div>
    {!docs.length && <p role="status" className="py-10 text-muted-foreground">{copy.empty}</p>}
    <div className="space-y-10">{(query.trim() ? ['search'] : CATEGORY_ORDER).map(category => {
      const entries = category === 'search' ? docs : docs.filter(doc => doc.category === category);
      if (!entries.length) return null;
      return <section key={category}>
        {category !== 'search' && <h2 className="mb-4 text-xl font-semibold">{categoryLabel(category,languageId)}</h2>}
        <div className="grid gap-3 xl:grid-cols-2">{entries.map(doc => <Link key={doc.slug} to={`/docs/${doc.slug}`} className="group flex items-start gap-4 rounded-xl border border-border/50 bg-surface-1/50 p-5 transition-colors hover:border-brand-cyan/60 hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-brand-cyan">
          <div className="min-w-0 flex-1"><span lang={doc.contentLanguage} className="font-medium group-hover:text-brand-cyan">{doc.title}</span><p lang={doc.contentLanguage} className="mt-2 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>{doc.isFallback && <span className="mt-2 block text-xs text-brand-cyan">{copy.english}</span>}</div>
          <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>)}</div>
      </section>;
    })}</div>
  </div>;
}
