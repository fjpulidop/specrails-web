import { type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ProductFrameProps {
  children: ReactNode;
  /** Chrome style for the title bar. */
  chrome?: "mac" | "none";
  /** Optional label / faux URL shown in the title bar (e.g. "localhost — specrails-desktop"). */
  label?: string;
  /** Apply the once-per-page brand glow ring (hero / Hub-primary instance only). */
  glow?: boolean;
  /** Reserve space to prevent layout shift, e.g. "16 / 10". */
  aspectRatio?: string;
  /**
   * Showcase recreations are non-interactive (pointer-events-none select-none).
   * Set true for an interactive embedded iframe.
   */
  interactive?: boolean;
  className?: string;
  bodyClassName?: string;
}

/**
 * The shared window/product frame: navy `--surface-2` panel, hairline edge,
 * inset top highlight, mac traffic lights, optional faux URL pill and the one
 * brand glow. Wraps a coded showcase, an <img>, an <iframe>, or a <video>.
 */
export function ProductFrame({
  children,
  chrome = "mac",
  label,
  glow = false,
  aspectRatio,
  interactive = false,
  className,
  bodyClassName,
}: ProductFrameProps) {
  const bodyStyle: CSSProperties | undefined = aspectRatio
    ? { aspectRatio }
    : undefined;

  return (
    <div
      className={cn(
        "relative rounded-frame border border-border/70 bg-surface-2 overflow-hidden",
        "[box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.06)]",
        glow ? "hero-chrome-ring" : "shadow-glow-elevated",
        className,
      )}
    >
      {chrome === "mac" && (
        <div className="flex items-center gap-2 px-4 h-10 border-b border-border/50 bg-surface-1/60">
          <span className="w-3 h-3 rounded-full bg-accent-danger/80" />
          <span className="w-3 h-3 rounded-full bg-accent-warning/80" />
          <span className="w-3 h-3 rounded-full bg-accent-success/80" />
          {label && (
            <span className="ml-3 inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono text-muted-foreground bg-surface-0/60 border border-border/50 truncate max-w-[60%]">
              {label}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "relative",
          !interactive && "pointer-events-none select-none",
          bodyClassName,
        )}
        style={bodyStyle}
      >
        {children}
      </div>
    </div>
  );
}

export default ProductFrame;
