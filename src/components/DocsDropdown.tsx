import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DOC_ENTRIES } from "@/lib/docs-registry";

export function DocsDropdown(): JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const entries = DOC_ENTRIES.filter((d) => d.slug !== "");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <ul className="absolute right-0 top-full mt-2 w-80 grid gap-1 p-3 bg-popover border border-border/30 rounded-xl shadow-xl z-50">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                to={`/docs/${entry.slug}`}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
