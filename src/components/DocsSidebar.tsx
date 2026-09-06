import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchDocs } from '@/lib/docs-registry';
import { getDocsCopy } from '@/lib/docs-copy';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { DocsSearch } from './DocsSearch';

export function DocsSidebar({onNavigate}: {onNavigate?: () => void}) {
  const location = useLocation(); const {languageId} = useI18n(); const copy = getDocsCopy(languageId);
  const [query, setQuery] = useState(''); const docs = searchDocs(query, languageId);
  let section = '';
  return <nav className="space-y-4 p-4" aria-label={copy.label}>
    <Link to="/docs" onClick={onNavigate} aria-current={/^\/docs\/?$/.test(location.pathname) ? 'page' : undefined} className="block px-2 py-1 text-sm font-semibold text-foreground hover:text-brand-cyan">{copy.overview}</Link>
    <DocsSearch value={query} onChange={setQuery} />
    {!docs.length && <p role="status" className="px-2 text-sm text-muted-foreground">{copy.empty}</p>}
    <ul className="space-y-1">{docs.map(entry => {
      const showSection = entry.section !== section; section = entry.section;
      const active = location.pathname.replace(/\/$/, '') === `/docs/${entry.slug}`;
      return <li key={entry.slug}>
        {showSection && <div className="mb-2 mt-5 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{entry.section}</div>}
        <Link to={`/docs/${entry.slug}`} onClick={onNavigate} aria-current={active ? 'page' : undefined}
          className={cn('block rounded-lg border-l-2 px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-brand-cyan', active ? 'border-brand-cyan bg-surface-2 text-brand-cyan' : 'border-transparent text-muted-foreground hover:bg-surface-2 hover:text-foreground')}>
          <span lang={entry.contentLanguage}>{entry.title}</span>
          {entry.isFallback && <span className="mt-0.5 block text-xs text-muted-foreground">{copy.english}</span>}
        </Link>
      </li>;
    })}</ul>
  </nav>;
}
export default DocsSidebar;
