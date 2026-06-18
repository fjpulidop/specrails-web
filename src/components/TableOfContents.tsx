import { useCallback, useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  /** Selector for the rendered prose container whose headings to index. */
  containerSelector?: string;
  /** A value that changes per page so the heading list is rebuilt on navigation. */
  contentKey?: string;
  /** Compact rendering (mobile / inline) drops the eyebrow chrome. */
  variant?: "rail" | "compact";
  /** Fired after a heading is selected (e.g. to close a mobile drawer). */
  onSelect?: () => void;
  className?: string;
}

/**
 * Extracts the rendered h2/h3 headings (ids come from rehype-slug) and renders
 * an "On this page" outline with scroll-spy. Reads the real DOM rather than the
 * markdown source so anchor ids always match what rehype-slug produced.
 */
export function TableOfContents({
  containerSelector = ".docs-prose",
  contentKey,
  variant = "rail",
  onSelect,
  className,
}: TableOfContentsProps): JSX.Element | null {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const reducedMotion = useReducedMotion();

  // Build the heading list from the rendered prose. Retries briefly because the
  // markdown mounts asynchronously, and re-runs whenever the page changes.
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const collect = (): boolean => {
      const container = document.querySelector(containerSelector);
      if (!container) return false;
      const nodes = Array.from(
        container.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
      );
      const found: TocHeading[] = nodes.map((node) => ({
        id: node.id,
        text: node.textContent?.replace(/\u00A0/g, " ").trim() ?? "",
        level: node.tagName === "H3" ? 3 : 2,
      }));
      if (cancelled) return true;
      setHeadings(found);
      return found.length > 0;
    };

    if (!collect()) {
      const timer = window.setInterval(() => {
        attempts += 1;
        if (collect() || attempts >= 10) window.clearInterval(timer);
      }, 80);
      return () => {
        cancelled = true;
        window.clearInterval(timer);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [containerSelector, contentKey]);

  // Scroll-spy: highlight the heading nearest the top of the reading area.
  useEffect(() => {
    if (headings.length === 0) return;

    const onScroll = () => {
      const offset = 140; // clears the fixed navbar + a little breathing room
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = heading.id;
        } else {
          break;
        }
      }
      // Pin the last heading when scrolled to the very bottom.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = headings[headings.length - 1]?.id ?? current;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      setActiveId(id);
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      // Reflect the anchor in the URL without a router navigation.
      window.history.replaceState(null, "", `#${id}`);
      onSelect?.();
    },
    [onSelect, reducedMotion],
  );

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className={cn("text-sm", className)}
    >
      {variant === "rail" && (
        <div className="eyebrow mb-3 flex items-center gap-2 text-muted-foreground/80">
          <List className="h-3.5 w-3.5" aria-hidden="true" />
          On this page
        </div>
      )}
      <ul
        className={cn(
          "space-y-1 border-l border-border/40",
          variant === "compact" && "border-l-0",
        )}
      >
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(event) => handleClick(event, heading.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block -ml-px border-l-2 py-1 leading-snug transition-colors",
                  heading.level === 3 ? "pl-6" : "pl-4",
                  isActive
                    ? "border-brand-cyan text-brand-cyan font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
