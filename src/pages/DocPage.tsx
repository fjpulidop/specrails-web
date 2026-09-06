import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Languages } from 'lucide-react';
import { getDocBySlug, getAdjacentDocs, loadDocContent } from '@/lib/docs-registry';
import { getDocsCopy } from '@/lib/docs-copy';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TableOfContents } from '@/components/TableOfContents';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useSeo } from '@/hooks/useSeo';
import { useI18n } from '@/lib/i18n';

type ArticleState = {key: string; content?: string; error?: boolean};
export default function DocPage() {
  const {slug = ''} = useParams(); const location = useLocation(); const {languageId} = useI18n(); const copy = getDocsCopy(languageId);
  const doc = getDocBySlug(slug,languageId); const key = `${slug}:${languageId}`;
  const [article, setArticle] = useState<ArticleState>({key: ''}); const [attempt,setAttempt] = useState(0);
  const loaded = article.key === key ? article : undefined;
  useSeo({title: `${doc?.title ?? copy.notFound} — Specrails`,description:doc?.description ?? copy.notFoundBody,canonical:`https://specrails.dev/docs/${slug}`});
  useEffect(() => {
    let current = true;
    if (!doc) return;
    setArticle({key});
    loadDocContent(doc).then(content => { if (current) setArticle({key,content}); }, () => { if (current) setArticle({key,error:true}); });
    return () => {current = false;};
  },[doc,key,attempt]);
  useEffect(() => {
    if (!loaded?.content) return;
    if (location.hash) {
      let id: string; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      document.getElementById(id)?.scrollIntoView({block:'start'});
    } else window.scrollTo(0,0);
  },[loaded?.content,location.hash]);
  if (!doc) return <div className="mx-auto max-w-3xl px-6 py-12"><h1 className="mb-4 text-3xl font-bold">{copy.notFound}</h1><p className="mb-6 text-muted-foreground">{copy.notFoundBody}</p><Link to="/docs" className="text-brand-cyan underline underline-offset-4">{copy.overview}</Link></div>;
  const {prev,next} = getAdjacentDocs(slug,languageId);
  return <div className="mx-auto flex w-full max-w-6xl gap-10 px-5 py-8 md:px-10 md:py-12">
    <div className="min-w-0 flex-1">
      <nav aria-label={copy.label} className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><Link to="/docs" className="hover:text-brand-cyan">{copy.label}</Link><ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /><span>{doc.section}</span></nav>
      {doc.isFallback && <p role="note" className="mb-6 flex items-start gap-3 rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 p-4 text-sm leading-relaxed text-foreground"><Languages className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />{copy.fallback}</p>}
      {loaded?.error ? <div role="alert" className="rounded-xl border border-border bg-surface-1 p-6"><h1 className="mb-4 text-2xl font-bold" lang={doc.contentLanguage}>{doc.title}</h1><p className="mb-4 text-muted-foreground">{copy.failed}</p><Button onClick={() => setAttempt(v=>v+1)}>{copy.retry}</Button></div>
      : loaded?.content === undefined ? <p role="status" className="py-12 text-muted-foreground">{copy.loading}</p>
      : <>
        <div className="mb-8 xl:hidden"><Collapsible key={key}><CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm font-medium">{copy.contents}<ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" /></CollapsibleTrigger><CollapsibleContent className="px-2 py-4"><TableOfContents variant="compact" contentKey={key} /></CollapsibleContent></Collapsible></div>
        <article lang={doc.contentLanguage} className="min-w-0"><MarkdownRenderer content={loaded.content} doc={doc} /></article>
        <nav aria-label={copy.overview} className="mt-12 grid gap-3 border-t border-border/50 pt-6 sm:grid-cols-2">
          {[{entry:prev,label:copy.previous,Icon:ArrowLeft},{entry:next,label:copy.next,Icon:ArrowRight}].map(({entry,label,Icon}) => entry ? <Link key={label} to={`/docs/${entry.slug}`} className="group rounded-xl border border-border/60 bg-surface-1 p-4 transition-colors hover:border-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan"><span className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}</span><span lang={entry.contentLanguage} className="text-sm font-medium group-hover:text-brand-cyan">{entry.title}</span>{entry.isFallback && <span className="mt-1 block text-xs text-muted-foreground">{copy.english}</span>}</Link> : <span key={label} />)}
        </nav>
      </>}
    </div>
    {loaded?.content !== undefined && <aside className="hidden w-48 shrink-0 xl:block"><div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8"><TableOfContents contentKey={key} /></div></aside>}
  </div>;
}
