/**
 * HubDashboard — container composing ported specrails-hub components.
 *
 * This is the main demo component for /demo, rendering a full Hub dashboard
 * with real Hub source components and static OpenClaw mock data.
 */

import { useState } from "react";
import { Command } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";
import { CommandGrid } from "./CommandGrid";
import { PipelineProgress } from "./PipelineProgress";
import { ProjectHealthWidget } from "./ProjectHealthWidget";
import { CommandPalette } from "./CommandPalette";
import { TabBar } from "./TabBar";
import { KpiCards } from "./KpiCards";
import { CostTimeline } from "./CostTimeline";
import {
  DEMO_PROJECTS,
  DEMO_COMMANDS,
  DEMO_PHASE_DEFINITIONS,
  DEMO_PHASE_MAP,
  DEMO_METRICS,
  DEMO_JOBS,
  DEMO_KPI,
  DEMO_COST_TIMELINE,
} from "./mock-data";
import type { SectionId } from "./types";

type SectionPrefs = Record<SectionId, { expanded: boolean; pinned: boolean }>;

const DEFAULT_PREFS: SectionPrefs = {
  health: { expanded: true, pinned: true },
  commands: { expanded: true, pinned: false },
  pipeline: { expanded: true, pinned: false },
  analytics: { expanded: true, pinned: false },
};

export function HubDashboard() {
  const [activeProjectId, setActiveProjectId] = useState("openclaw");
  const [sections, setSections] = useState<SectionPrefs>(DEFAULT_PREFS);

  function toggleExpand(id: SectionId) {
    setSections((prev) => ({
      ...prev,
      [id]: { ...prev[id], expanded: !prev[id].expanded },
    }));
  }

  function togglePin(id: SectionId) {
    setSections((prev) => ({
      ...prev,
      [id]: { ...prev[id], pinned: !prev[id].pinned },
    }));
  }

  return (
    <div className="glass-card overflow-hidden border border-dracula-green/30">
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20"
        style={{ background: "hsl(var(--dracula-current) / 0.2)" }}
      >
        <div className="w-3 h-3 rounded-full bg-dracula-red opacity-80" />
        <div className="w-3 h-3 rounded-full bg-dracula-yellow opacity-80" />
        <div className="w-3 h-3 rounded-full bg-dracula-green opacity-80" />
        <span className="text-xs text-muted-foreground ml-2 font-mono">
          specrails-hub &mdash; localhost:4200
        </span>
        <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Command className="h-3 w-3" />
          <span className="font-mono">K</span>
        </div>
      </div>

      {/* Tab bar */}
      <TabBar
        projects={DEMO_PROJECTS}
        activeProjectId={activeProjectId}
        onProjectChange={setActiveProjectId}
      />

      {/* Dashboard sections */}
      <div className="p-3 space-y-3">
        <CollapsibleSection
          id="health"
          title="Project Health"
          expanded={sections.health.expanded}
          pinned={sections.health.pinned}
          onToggleExpand={() => toggleExpand("health")}
          onTogglePin={() => togglePin("health")}
          indicator={
            <span className="text-[10px] font-mono text-dracula-green bg-dracula-green/10 px-1.5 py-0.5 rounded">
              {DEMO_METRICS.healthScore}
            </span>
          }
        >
          <ProjectHealthWidget metrics={DEMO_METRICS} />
        </CollapsibleSection>

        <CollapsibleSection
          id="pipeline"
          title="Pipeline Progress"
          expanded={sections.pipeline.expanded}
          pinned={sections.pipeline.pinned}
          onToggleExpand={() => toggleExpand("pipeline")}
          onTogglePin={() => togglePin("pipeline")}
          indicator={
            <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
              reviewing
            </span>
          }
        >
          <div className="flex justify-center py-2">
            <PipelineProgress
              phases={DEMO_PHASE_MAP}
              phaseDefinitions={DEMO_PHASE_DEFINITIONS}
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="commands"
          title="Commands"
          expanded={sections.commands.expanded}
          pinned={sections.commands.pinned}
          onToggleExpand={() => toggleExpand("commands")}
          onTogglePin={() => togglePin("commands")}
          indicator={
            <span className="text-[10px] font-mono text-muted-foreground/60">
              {DEMO_COMMANDS.length} installed
            </span>
          }
        >
          <CommandGrid commands={DEMO_COMMANDS} />
        </CollapsibleSection>

        <CollapsibleSection
          id="analytics"
          title="Analytics"
          expanded={sections.analytics.expanded}
          pinned={sections.analytics.pinned}
          onToggleExpand={() => toggleExpand("analytics")}
          onTogglePin={() => togglePin("analytics")}
        >
          <div className="space-y-4">
            <KpiCards kpi={DEMO_KPI} />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                Cost Timeline (7d)
              </p>
              <CostTimeline data={DEMO_COST_TIMELINE} />
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Command Palette (portal) */}
      <CommandPalette
        projects={DEMO_PROJECTS}
        activeProjectId={activeProjectId}
        commands={DEMO_COMMANDS}
        recentJobs={DEMO_JOBS}
      />
    </div>
  );
}
