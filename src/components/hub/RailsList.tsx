/**
 * RailsList — ported concept from specrails-hub Rails section.
 *
 * A "Rail" is a saved command sequence (runbook) that runs multiple steps
 * with one click. Each step is a command or free prompt.
 */

import { Play, ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface RailStep {
  type: "command" | "prompt";
  value: string;
}

interface Rail {
  id: string;
  name: string;
  description: string;
  steps: RailStep[];
}

const DEMO_RAILS: Rail[] = [
  {
    id: "rail-1",
    name: "Full Feature Pipeline",
    description: "Propose a spec, implement it, then run a health check",
    steps: [
      { type: "command", value: "/sr:propose-spec" },
      { type: "command", value: "/sr:implement" },
      { type: "command", value: "/sr:health-check" },
    ],
  },
  {
    id: "rail-2",
    name: "Batch Ship & Verify",
    description: "Batch implement pending specs and verify project health",
    steps: [
      { type: "command", value: "/sr:batch-implement" },
      { type: "command", value: "/sr:health-check" },
      { type: "command", value: "/sr:compat-check" },
    ],
  },
  {
    id: "rail-3",
    name: "Discovery Cycle",
    description: "Run full product discovery: auto-propose, select, and review",
    steps: [
      { type: "command", value: "/sr:update-product-driven-backlog" },
      { type: "command", value: "/sr:product-backlog" },
      { type: "prompt", value: "Summarize the top 3 proposed specs" },
    ],
  },
];

function StepBadge({ step, index }: { step: RailStep; index: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] font-mono text-muted-foreground/40 w-3 text-right shrink-0">
        {index + 1}
      </span>
      <span
        className={cn(
          "text-[10px] font-mono px-1.5 py-0.5 rounded",
          step.type === "command"
            ? "text-dracula-cyan bg-dracula-cyan/10"
            : "text-dracula-purple bg-dracula-purple/10 italic"
        )}
      >
        {step.value}
      </span>
    </div>
  );
}

export function RailsList() {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-muted-foreground/60 mb-3">
        Save command sequences to run them with one click.
      </p>
      {DEMO_RAILS.map((rail) => (
        <div
          key={rail.id}
          className={cn(
            "glass-card group",
            "border border-border/30 rounded-xl",
            "transition-all duration-200 cursor-default",
            "hover:shadow-[0_0_20px_rgba(139,233,253,0.1)] hover:border-dracula-cyan/30"
          )}
        >
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-dracula-cyan/10 group-hover:bg-dracula-cyan/20 transition-colors shrink-0 mt-0.5">
              <Layers className="w-4 h-4 text-dracula-cyan" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold leading-tight truncate">
                  {rail.name}
                </p>
                <span className="text-[9px] font-mono text-muted-foreground/40 shrink-0">
                  {rail.steps.length} steps
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-0.5 leading-tight">
                {rail.description}
              </p>

              <div className="flex items-center gap-1 mt-2 flex-wrap">
                {rail.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <StepBadge step={step} index={i} />
                    {i < rail.steps.length - 1 && (
                      <ChevronRight className="w-2.5 h-2.5 text-muted-foreground/20 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground/30 hover:text-dracula-green hover:bg-dracula-green/10 transition-all shrink-0 mt-0.5"
              aria-label={`Run ${rail.name}`}
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
