import { Link, useLocation } from "react-router-dom";
import { DOC_ENTRIES, type DocEntry } from "@/lib/docs-registry";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface DocsSidebarProps {
  onNavigate?: () => void;
}

interface DocGroup {
  section: string;
  product?: "core" | "hub" | "mcp";
  entries: DocEntry[];
}

const PRODUCT_DOT_COLOR: Record<string, string> = {
  core: "hsl(var(--dracula-cyan))",
  hub: "hsl(var(--dracula-green))",
  mcp: "hsl(var(--dracula-purple))",
};

function groupEntries(entries: DocEntry[]): DocGroup[] {
  const groups: DocGroup[] = [];
  let currentSection: string | undefined;

  for (const entry of entries) {
    const section = entry.section ?? "Docs";
    if (section !== currentSection) {
      currentSection = section;
      groups.push({ section, product: entry.product, entries: [entry] });
    } else {
      groups[groups.length - 1].entries.push(entry);
    }
  }

  return groups;
}

function isEntryActive(entry: DocEntry, pathname: string): boolean {
  const href = entry.slug === "" ? "/docs" : `/docs/${entry.slug}`;
  return entry.slug === ""
    ? pathname === "/docs" || pathname === "/docs/"
    : pathname === href;
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps): JSX.Element {
  const location = useLocation();
  const groups = groupEntries(DOC_ENTRIES);

  return (
    <nav className="p-4" aria-label="Documentation sidebar">
      <div className="font-mono text-xs uppercase tracking-wider text-dracula-comment mb-4 px-3">
        Documentation
      </div>
      <div className="space-y-1">
        {groups.map((group) => (
          <Collapsible key={group.section} defaultOpen>
            <CollapsibleTrigger className="flex items-center gap-2 w-full px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-dracula-comment hover:text-foreground transition-colors group cursor-pointer">
              <ChevronRight className="w-3 h-3 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
              {group.product && (
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: PRODUCT_DOT_COLOR[group.product] }}
                />
              )}
              <span className="truncate">{group.section}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="mt-0.5 space-y-0.5">
                {group.entries.map((entry) => {
                  const href =
                    entry.slug === "" ? "/docs" : `/docs/${entry.slug}`;
                  const isActive = isEntryActive(entry, location.pathname);

                  return (
                    <li key={entry.slug}>
                      <Link
                        to={href}
                        onClick={onNavigate}
                        className={cn(
                          "block rounded-lg px-3 py-1.5 text-sm transition-colors ml-3",
                          isActive
                            ? "border-l-2 border-dracula-purple text-dracula-purple bg-dracula-current/50 pl-[calc(0.75rem_-_2px)]"
                            : "text-muted-foreground hover:text-foreground hover:bg-dracula-current/30"
                        )}
                      >
                        {entry.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </nav>
  );
}
