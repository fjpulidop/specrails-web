import { useId } from 'react';
import { Search, X } from 'lucide-react';
import { getDocsCopy } from '@/lib/docs-copy';
import { useI18n } from '@/lib/i18n';
export function DocsSearch({ value, onChange }: {value: string; onChange: (value: string) => void}) {
  const id = useId(); const {languageId} = useI18n(); const copy = getDocsCopy(languageId);
  return <div role="search" className="relative">
    <label className="sr-only" htmlFor={id}>{copy.search}</label>
    <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
    <input id={id} type="search" value={value} onChange={event => onChange(event.target.value)} placeholder={copy.search}
      className="h-11 w-full min-w-0 rounded-xl border border-border/70 bg-surface-0 pl-10 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan/20 [&::-webkit-search-cancel-button]:appearance-none" />
    {value && <button type="button" onClick={() => onChange('')} aria-label={copy.clear} className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-brand-cyan"><X className="h-4 w-4" /></button>}
  </div>;
}
