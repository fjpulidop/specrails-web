import { Link, useLocation } from "react-router-dom";
import { DOC_ENTRIES } from "@/lib/docs-registry";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  onNavigate?: () => void;
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps): JSX.Element {
  const location = useLocation();

  return (
    <nav className="p-4">
      <div className="font-mono text-xs uppercase tracking-wider text-dracula-comment mb-4 px-3">
        Documentation
      </div>
      <ul className="space-y-1">
        {DOC_ENTRIES.map((entry) => {
          const href = entry.slug === "" ? "/docs" : `/docs/${entry.slug}`;
          const isActive =
            entry.slug === ""
              ? location.pathname === "/docs" || location.pathname === "/docs/"
              : location.pathname === href;

          return (
            <li key={entry.slug}>
              <Link
                to={href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
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
    </nav>
  );
}
