import { Link, useLocation } from "react-router-dom";
import { getDocs } from "@/lib/docs-registry";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  onNavigate?: () => void;
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps): JSX.Element {
  const location = useLocation();
  const { content, languageId } = useI18n();
  const docs = getDocs(languageId);

  return (
    <nav className="p-4" aria-label="Documentation">
      <div className="eyebrow mb-4 px-3 text-muted-foreground/70">
        {content.nav.docs}
      </div>
      <ul className="space-y-1">
        {(() => {
          let currentSection: string | undefined = undefined;
          return docs.map((entry) => {
            const showSectionHeader =
              entry.section !== undefined && entry.section !== currentSection;
            if (showSectionHeader) currentSection = entry.section;

            const href = entry.slug === "" ? "/docs" : `/docs/${entry.slug}`;
            const isActive =
              entry.slug === ""
                ? location.pathname === "/docs" || location.pathname === "/docs/"
                : location.pathname === href;

            return (
              <li key={entry.slug}>
                {showSectionHeader && (
                  <div className="eyebrow mb-2 mt-5 px-3 text-muted-foreground/70">
                    {entry.section}
                  </div>
                )}
                <Link
                  to={href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "border-l-2 border-brand-cyan bg-surface-2/70 pl-[calc(0.75rem_-_2px)] font-medium text-brand-cyan"
                      : "text-muted-foreground hover:bg-surface-2/40 hover:text-foreground",
                  )}
                >
                  {entry.title}
                </Link>
              </li>
            );
          });
        })()}
      </ul>
    </nav>
  );
}

export default DocsSidebar;
