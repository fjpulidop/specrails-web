/**
 * CollapsibleSection — ported from specrails-hub/client/src/components/CollapsibleSection.tsx
 *
 * Dashboard section with expand/collapse, pin toggle, and drag handle.
 * Adapted for specrails-web demo: drag handle is decorative (no @dnd-kit dependency).
 */

import type { ReactNode } from "react";
import { ChevronRight, GripVertical, Pin, PinOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SectionId } from "./types";

interface CollapsibleSectionProps {
  id: SectionId;
  title: string;
  indicator?: ReactNode;
  expanded: boolean;
  pinned: boolean;
  onToggleExpand: () => void;
  onTogglePin: () => void;
  trailing?: ReactNode;
  children: ReactNode;
}

export function CollapsibleSection({
  id,
  title,
  indicator,
  expanded,
  pinned,
  onToggleExpand,
  onTogglePin,
  trailing,
  children,
}: CollapsibleSectionProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/30 bg-card/20 overflow-hidden",
        "transition-shadow duration-200"
      )}
      data-testid={`section-${id}`}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 px-3 py-2.5 select-none">
        {/* Drag handle (decorative in demo) */}
        <div
          className="flex items-center justify-center w-5 h-5 rounded text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/30 transition-colors cursor-grab shrink-0"
          aria-label="Drag to reorder"
          data-testid={`drag-handle-${id}`}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </div>

        {/* Expand/collapse toggle */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex items-center gap-2 flex-1 min-w-0 group cursor-pointer"
          aria-expanded={expanded}
          data-testid={`toggle-${id}`}
        >
          <ChevronRight
            className={cn(
              "w-3.5 h-3.5 text-muted-foreground transition-transform duration-150 shrink-0",
              expanded && "rotate-90"
            )}
          />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
            {title}
          </span>
          {indicator && <span className="shrink-0">{indicator}</span>}
        </button>

        {/* Pin toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onTogglePin}
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded transition-all duration-150 shrink-0",
                pinned
                  ? "text-dracula-cyan bg-dracula-cyan/10 hover:bg-dracula-cyan/20"
                  : "text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted/30"
              )}
              aria-label={
                pinned
                  ? "Unpin section (will collapse by default)"
                  : "Pin section (will stay expanded)"
              }
              data-testid={`pin-${id}`}
            >
              {pinned ? (
                <Pin className="w-3 h-3" />
              ) : (
                <PinOff className="w-3 h-3" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">
              {pinned ? "Unpin (collapse by default)" : "Pin open (stay expanded)"}
            </p>
          </TooltipContent>
        </Tooltip>

        {trailing && <div className="shrink-0">{trailing}</div>}
      </div>

      {/* Collapsible content */}
      {expanded && (
        <div className="px-3 pb-3" data-testid={`content-${id}`}>
          {children}
        </div>
      )}
    </section>
  );
}
