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
  DEMO_PHASE_MAP_ACME,
  DEMO_METRICS,
  DEMO_METRICS_ACME,
  DEMO_JOBS,
  DEMO_JOBS_ACME,
  DEMO_KPI,
  DEMO_KPI_ACME,
  DEMO_COST_TIMELINE,
  DEMO_COST_TIMELINE_ACME,
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

  const isAcme = activeProjectId === "acme-api";
  const metrics = isAcme ? DEMO_METRICS_ACME : DEMO_METRICS;
  const phaseMap = isAcme ? DEMO_PHASE_MAP_ACME : DEMO_PHASE_MAP;
  const jobs = isAcme ? DEMO_JOBS_ACME : DEMO_JOBS;
  const kpi = isAcme ? DEMO_KPI_ACME : DEMO_KPI;
  const costTimeline = isAcme ? DEMO_COST_TIMELINE_ACME : DEMO_COST_TIMELINE;

  // Derive pipeline status label from phase map
  const pipelineLabel = (() => {
    const entries = Object.entries(phaseMap);
    const running = entries.find(([, s]) => s === "running");
    if (running) return running[0];
    const failed = entries.find(([, s]) => s === "failed");
    if (failed) return `${failed[0]} failed`;
    const allDone = entries.every(([, s]) => s === "done");
    if (allDone) return "shipped";
    return "idle";
  })();

  const healthColor = metrics.healthScore >= 80 ? "text-dracula-green" : metrics.healthScore >= 60 ? "text-dracula-yellow" : "text-dracula-red";
  const healthBg = metrics.healthScore >= 80 ? "bg-dracula-green/10" : metrics.healthScore >= 60 ? "bg-dracula-yellow/10" : "bg-dracula-red/10";
  const pipelineFailed = pipelineLabel.includes("failed");
  const pipelineColor = pipelineFailed ? "text-dracula-red" : "text-blue-400";
  const pipelineBg = pipelineFailed ? "bg-dracula-red/10" : "bg-blue-400/10";

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
          title="Health"
          expanded={sections.health.expanded}
          pinned={sections.health.pinned}
          onToggleExpand={() => toggleExpand("health")}
          onTogglePin={() => togglePin("health")}
          indicator={
            <span className={`text-[10px] font-mono ${healthColor} ${healthBg} px-1.5 py-0.5 rounded`}>
              {metrics.healthScore}
            </span>
          }
        >
          <ProjectHealthWidget metrics={metrics} />
        </CollapsibleSection>

        <CollapsibleSection
          id="pipeline"
          title="Pipeline"
          expanded={sections.pipeline.expanded}
          pinned={sections.pipeline.pinned}
          onToggleExpand={() => toggleExpand("pipeline")}
          onTogglePin={() => togglePin("pipeline")}
          indicator={
            <span className={`text-[10px] font-mono ${pipelineColor} ${pipelineBg} px-1.5 py-0.5 rounded`}>
              {pipelineLabel}
            </span>
          }
        >
          <div className="flex justify-center py-2">
            <PipelineProgress
              phases={phaseMap}
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
            <KpiCards kpi={kpi} />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                Cost Timeline (7d)
              </p>
              <CostTimeline data={costTimeline} />
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Command Palette (portal) */}
      <CommandPalette
        projects={DEMO_PROJECTS}
        activeProjectId={activeProjectId}
        commands={DEMO_COMMANDS}
        recentJobs={jobs}
      />
    </div>
  );
}
