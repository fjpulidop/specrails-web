import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const IDLE_DELAY = 1200;

interface SectionNavProps {
  sectionIds?: string[];
  autoDetect?: string;
  scrollThreshold?: number;
}

const SectionNav = ({
  sectionIds,
  autoDetect,
  scrollThreshold = 100,
}: SectionNavProps) => {
  const [ids, setIds] = useState<string[]>(sectionIds ?? []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const navigating = useRef(false);

  // Auto-detect headings with IDs from the DOM, re-detect on content changes
  useEffect(() => {
    if (!autoDetect) return;
    const detect = () => {
      const els = document.querySelectorAll(autoDetect);
      const found = Array.from(els)
        .map((el) => el.id)
        .filter(Boolean);
      setIds(found);
    };
    // Wait for content to render
    const timer = setTimeout(detect, 100);
    // Re-detect when DOM changes (page navigation in docs)
    const observer = new MutationObserver(() => {
      setTimeout(detect, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [autoDetect]);

  // Use prop IDs when provided
  useEffect(() => {
    if (sectionIds) setIds(sectionIds);
  }, [sectionIds]);

  const updateCurrent = useCallback(() => {
    if (ids.length === 0) return;
    const viewportMid = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;

    for (let i = 0; i < ids.length; i++) {
      const el = document.getElementById(ids[i]);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }

    setCurrentIndex(closest);
    setVisible(window.scrollY > scrollThreshold);

    if (!navigating.current) {
      setScrolling(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setScrolling(false), IDLE_DELAY);
    }
  }, [ids, scrollThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", updateCurrent, { passive: true });
    updateCurrent();
    return () => {
      window.removeEventListener("scroll", updateCurrent);
      clearTimeout(idleTimer.current);
    };
  }, [updateCurrent]);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(ids.length - 1, index));
    const el = document.getElementById(ids[clamped]);
    if (el) {
      navigating.current = true;
      clearTimeout(idleTimer.current);
      setScrolling(false);
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { navigating.current = false; }, 1000);
    }
  };

  if (ids.length === 0) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === ids.length - 1;

  return (
    <>
      {/* Up — fixed right, just below navbar */}
      <button
        onClick={() => scrollTo(currentIndex - 1)}
        disabled={isFirst}
        aria-label="Previous section"
        className={cn(
          "fixed top-[6.5rem] right-3 z-40",
          "w-8 h-8 rounded-full",
          "bg-foreground/[0.07] hover:bg-foreground/[0.13] active:bg-foreground/[0.18]",
          "flex items-center justify-center",
          "transition-all duration-300 cursor-pointer",
          visible && !isFirst && !scrolling
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        <svg
          viewBox="0 0 20 20"
          className="w-4 h-4 animate-section-nav-up"
        >
          <path
            d="M4 13 L10 7 L16 13"
            fill="none"
            stroke="hsl(var(--background))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Down — fixed right, bottom aligned */}
      <button
        onClick={() => scrollTo(currentIndex + 1)}
        disabled={isLast}
        aria-label="Next section"
        className={cn(
          "fixed bottom-10 right-3 z-40",
          "w-8 h-8 rounded-full",
          "bg-foreground/[0.07] hover:bg-foreground/[0.13] active:bg-foreground/[0.18]",
          "flex items-center justify-center",
          "transition-all duration-300 cursor-pointer",
          !isLast && !scrolling
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        <svg
          viewBox="0 0 20 20"
          className="w-4 h-4 animate-section-nav-down"
        >
          <path
            d="M4 7 L10 13 L16 7"
            fill="none"
            stroke="hsl(var(--background))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
};

export default SectionNav;
