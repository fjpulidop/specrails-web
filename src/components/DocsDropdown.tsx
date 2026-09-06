import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { getDocBySlug } from '@/lib/docs-registry';
import { getDocsCopy } from '@/lib/docs-copy';
import { useI18n } from '@/lib/i18n';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
const journeys = ['getting-started', 'missions-first-mission', 'missions-review-and-delivery', 'integrations-mobile-companion'];
export function DocsDropdown() {
  const {languageId, content} = useI18n(); const copy = getDocsCopy(languageId);
  return <DropdownMenu>
    <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
      {content.nav.docs}<ChevronDown className="h-3 w-3" aria-hidden="true" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sideOffset={10} className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl border-border/70 bg-surface-1 p-2 shadow-xl">
      {journeys.map(slug => {
        const doc = getDocBySlug(slug, languageId)!;
        return <DropdownMenuItem key={slug} asChild className="cursor-pointer rounded-xl p-3 focus:bg-surface-2">
          <Link to={`/docs/${slug}`} className="block"><span className="block text-sm font-medium" lang={doc.contentLanguage}>{doc.title}</span>
          {doc.isFallback && <span className="mt-1 block text-xs text-muted-foreground">{copy.english}</span>}</Link>
        </DropdownMenuItem>;
      })}
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-3"><Link to="/docs" className="flex items-center justify-between text-brand-cyan">{copy.overview}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
}
