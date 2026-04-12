import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DOCS } from "@/lib/docs-registry";

export function DocsDropdown(): JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Group entries by section for visual grouping
  const grouped: { section: string | undefined; entries: typeof DOCS }[] = [];
  let lastSection: string | undefined = "__INIT__";

  for (const entry of DOCS) {
    if (entry.section !== lastSection) {
      lastSection = entry.section;
      grouped.push({ section: entry.section, entries: [] });
    }
    grouped[grouped.length - 1].entries.push(entry);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Docs
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-2 w-80 grid gap-1 p-3 bg-popover border border-border/30 rounded-xl shadow-xl z-50 max-h-[70vh] overflow-y-auto">
          {grouped.map((group) => (
            <li key={group.section ?? "__default"}>
              {group.section && (
                <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.section}
                </div>
              )}
              {group.entries.map((entry) => (
                <Link
                  key={entry.slug}
                  to={entry.slug ? `/docs/${entry.slug}` : "/docs"}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-dracula-current transition-colors group"
                >
                  <div className="text-sm font-medium text-foreground group-hover:text-dracula-purple transition-colors">
                    {entry.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {entry.description}
                  </div>
                </Link>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
