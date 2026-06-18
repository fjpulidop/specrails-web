import { type ReactNode, type ElementType } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Render element. Defaults to div. */
  as?: ElementType;
  /** Stagger in ms (maps to the shared delay utilities). */
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** IntersectionObserver threshold. */
  threshold?: number;
  className?: string;
}

const DELAY: Record<number, string> = {
  0: "",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
  600: "delay-600",
  700: "delay-700",
};

/**
 * Single scroll-reveal primitive. Replaces the ~10 hand-copied
 * `isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"` strings.
 * Entrance is `opacity 0→1` + `translateY` + `blur` via `.animate-reveal`; the
 * global reduced-motion block in index.css forces the end state instantly, so
 * content is never left invisible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  threshold = 0.15,
  className,
}: RevealProps) {
  const { ref, isVisible } = useScrollAnimation(threshold);
  return (
    <Tag
      ref={ref}
      className={cn(
        "motion-safe:opacity-0",
        isVisible && "motion-safe:animate-reveal",
        DELAY[delay],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
