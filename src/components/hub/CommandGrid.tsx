/**
 * CommandGrid — ported from specrails-hub/client/src/components/CommandGrid.tsx
 *
 * Renders the Discovery / Delivery command layout with glow cards.
 * Adapted for specrails-web demo: removes API calls, useNavigate, toast spawning.
 * All interactions are visual-only (hover states, tooltips).
 */

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Rocket,
  Layers,
  ClipboardList,
  ChevronRight,
  Sparkles,
  Wrench,
  HeartPulse,
  Shield,
  HelpCircle,
  Play,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { CommandInfo } from "./types";

const COMMAND_META: Record<
  string,
  { icon: LucideIcon; color: string; glow: string; accent: string }
> = {
  "propose-spec": {
    icon: Sparkles,
    color: "text-dracula-cyan",
    glow: "hover:shadow-[0_0_20px_rgba(139,233,253,0.15)] hover:border-dracula-cyan/50",
    accent: "bg-dracula-cyan/10 group-hover:bg-dracula-cyan/20",
  },
  implement: {
    icon: Rocket,
    color: "text-dracula-purple",
    glow: "hover:shadow-[0_0_20px_rgba(189,147,249,0.15)] hover:border-dracula-purple/50",
    accent: "bg-dracula-purple/10 group-hover:bg-dracula-purple/20",
  },
  "batch-implement": {
    icon: Layers,
    color: "text-dracula-pink",
    glow: "hover:shadow-[0_0_20px_rgba(255,121,198,0.15)] hover:border-dracula-pink/50",
    accent: "bg-dracula-pink/10 group-hover:bg-dracula-pink/20",
  },
  "product-backlog": {
    icon: ClipboardList,
    color: "text-dracula-cyan",
    glow: "hover:shadow-[0_0_20px_rgba(139,233,253,0.15)] hover:border-dracula-cyan/50",
    accent: "bg-dracula-cyan/10 group-hover:bg-dracula-cyan/20",
  },
  "update-product-driven-backlog": {
    icon: Sparkles,
    color: "text-dracula-green",
    glow: "hover:shadow-[0_0_20px_rgba(80,250,123,0.15)] hover:border-dracula-green/50",
    accent: "bg-dracula-green/10 group-hover:bg-dracula-green/20",
  },
  "refactor-recommender": {
    icon: Wrench,
    color: "text-dracula-orange",
    glow: "hover:shadow-[0_0_20px_rgba(255,184,108,0.15)] hover:border-dracula-orange/50",
    accent: "bg-dracula-orange/10 group-hover:bg-dracula-orange/20",
  },
  "health-check": {
    icon: HeartPulse,
    color: "text-dracula-green",
    glow: "hover:shadow-[0_0_20px_rgba(80,250,123,0.15)] hover:border-dracula-green/50",
    accent: "bg-dracula-green/10 group-hover:bg-dracula-green/20",
  },
  "compat-check": {
    icon: Shield,
    color: "text-dracula-yellow",
    glow: "hover:shadow-[0_0_20px_rgba(241,250,140,0.12)] hover:border-dracula-yellow/50",
    accent: "bg-dracula-yellow/10 group-hover:bg-dracula-yellow/20",
  },
  why: {
    icon: HelpCircle,
    color: "text-muted-foreground",
    glow: "hover:shadow-[0_0_20px_rgba(189,147,249,0.12)] hover:border-dracula-purple/40",
    accent: "bg-dracula-current/30 group-hover:bg-dracula-current/50",
  },
};

const FALLBACK_META = {
  icon: Play,
  color: "text-dracula-purple",
  glow: "hover:shadow-[0_0_20px_rgba(189,147,249,0.15)] hover:border-dracula-purple/50",
  accent: "bg-dracula-purple/10 group-hover:bg-dracula-purple/20",
};

const DISCOVERY_ORDER = [
  "propose-spec",
  "update-product-driven-backlog",
  "product-backlog",
] as const;
const DELIVERY_ORDER = ["implement", "batch-implement"] as const;
const DISCOVERY_SET = new Set<string>(DISCOVERY_ORDER);
const DELIVERY_SET = new Set<string>(DELIVERY_ORDER);
const DISPLAY_NAMES: Record<string, string> = {
  "propose-spec": "Custom-Propose",
  "update-product-driven-backlog": "Auto-propose",
  "product-backlog": "Auto-Select Specs",
};
const WIZARD_COMMANDS = new Set(["implement", "batch-implement"]);

function SectionHeader({
  label,
  subtitle,
  accent,
  collapsible,
  open,
  count,
  onToggle,
}: {
  label: string;
  subtitle?: string;
  accent: "cyan" | "purple" | "muted";
  collapsible?: boolean;
  open?: boolean;
  count?: number;
  onToggle?: () => void;
}) {
  if (collapsible) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-3 hover:text-foreground transition-colors cursor-pointer"
      >
        <ChevronRight
          className={cn(
            "w-3 h-3 transition-transform duration-150",
            open && "rotate-90"
          )}
        />
        {label} ({count})
      </button>
    );
  }

  const barColor =
    accent === "cyan"
      ? "bg-dracula-cyan"
      : accent === "purple"
      ? "bg-dracula-purple"
      : "bg-muted-foreground/30";

  const labelColor =
    accent === "cyan"
      ? "text-dracula-cyan"
      : accent === "purple"
      ? "text-dracula-purple"
      : "text-muted-foreground";

  const glowBg =
    accent === "cyan"
      ? "bg-dracula-cyan/5"
      : accent === "purple"
      ? "bg-dracula-purple/5"
      : "";

  return (
    <div
      className={cn(
        "rounded-lg px-3 py-2.5 mb-3 border border-transparent",
        glowBg,
        accent !== "muted" && "border-dracula-current/10"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className={cn("w-1 h-5 rounded-full shrink-0", barColor)} />
        <div>
          <p
            className={cn(
              "text-[11px] font-bold uppercase tracking-widest leading-none",
              labelColor
            )}
          >
            {label}
          </p>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground/60 mt-0.5 leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CommandCard({ cmd }: { cmd: CommandInfo }) {
  const isWizard = WIZARD_COMMANDS.has(cmd.slug);
  const meta = COMMAND_META[cmd.slug] ?? FALLBACK_META;
  const Icon = meta.icon;
  const displayName = DISPLAY_NAMES[cmd.slug] ?? cmd.name;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "glass-card group w-full text-left",
            "flex items-center gap-3 px-4 py-3.5",
            "border border-border/30 rounded-xl",
            "transition-all duration-200 cursor-default",
            meta.glow
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all duration-200",
              meta.accent
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                meta.color
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">
              {displayName}
            </p>
            {cmd.description && (
              <p className="text-[11px] text-muted-foreground/70 mt-0.5 leading-tight line-clamp-1">
                {cmd.description}
              </p>
            )}
            {(cmd.totalRuns !== undefined || cmd.lastRunAt) && (
              <div className="flex items-center gap-1.5 mt-1">
                {cmd.totalRuns !== undefined && cmd.totalRuns > 0 && (
                  <span className="text-[10px] text-muted-foreground/40 tabular-nums">
                    {cmd.totalRuns} run{cmd.totalRuns !== 1 ? "s" : ""}
                  </span>
                )}
                {cmd.totalRuns !== undefined &&
                  cmd.totalRuns > 0 &&
                  cmd.lastRunAt && (
                    <span className="text-[10px] text-muted-foreground/30">
                      ·
                    </span>
                  )}
                {cmd.lastRunAt && (
                  <span className="text-[10px] text-muted-foreground/40">
                    {formatDistanceToNow(new Date(cmd.lastRunAt), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </div>
            )}
          </div>

          {isWizard ? (
            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-dracula-purple group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
          ) : (
            <Zap className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-dracula-cyan transition-all duration-200 shrink-0 opacity-0 group-hover:opacity-100" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[240px]">
        <p className="font-medium font-mono text-[11px]">/sr:{cmd.slug}</p>
        {cmd.description && (
          <p className="text-muted-foreground mt-0.5">{cmd.description}</p>
        )}
        {isWizard && (
          <p className="text-dracula-purple mt-1 text-[10px]">
            Opens guided wizard
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

interface CommandGridProps {
  commands: CommandInfo[];
}

export function CommandGrid({ commands }: CommandGridProps) {
  const [othersOpen, setOthersOpen] = useState(false);

  if (commands.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/30 p-10 text-center space-y-3">
        <Terminal className="w-9 h-9 text-muted-foreground/20 mx-auto" />
        <p className="text-sm font-medium text-muted-foreground">
          No commands installed
        </p>
      </div>
    );
  }

  const bySlug = new Map(commands.map((c) => [c.slug, c]));
  const discovery = DISCOVERY_ORDER.map((s) => bySlug.get(s)).filter(
    (c): c is CommandInfo => c !== undefined
  );
  const delivery = DELIVERY_ORDER.map((s) => bySlug.get(s)).filter(
    (c): c is CommandInfo => c !== undefined
  );
  const others = commands
    .filter((c) => !DISCOVERY_SET.has(c.slug) && !DELIVERY_SET.has(c.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      {(discovery.length > 0 || delivery.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {discovery.length > 0 && (
            <div>
              <SectionHeader
                label="Discovery"
                subtitle="Explore & define your product"
                accent="cyan"
              />
              <div className="space-y-2">
                {discovery.map((cmd) => (
                  <CommandCard key={cmd.id} cmd={cmd} />
                ))}
              </div>
            </div>
          )}

          {delivery.length > 0 && (
            <div>
              <SectionHeader
                label="Delivery"
                subtitle="Build & ship features"
                accent="purple"
              />
              <div className="space-y-2">
                {delivery.map((cmd) => (
                  <CommandCard key={cmd.id} cmd={cmd} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {others.length > 0 && (
        <section>
          <SectionHeader
            label="Others"
            accent="muted"
            collapsible
            open={othersOpen}
            count={others.length}
            onToggle={() => setOthersOpen(!othersOpen)}
          />
          {othersOpen && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {others.map((cmd) => (
                <CommandCard key={cmd.id} cmd={cmd} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
