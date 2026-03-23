/**
 * HubDashboard — container composing ported specrails-hub components.
 *
 * This is the main demo component for /demo, rendering a full Hub dashboard
 * with real Hub source components and static OpenClaw mock data.
 *
 * Sections match the actual Hub dashboard: Spec, Rails, Jobs, Health.
 */

import { useState } from "react";
import { Command } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";
import { CommandGrid } from "./CommandGrid";
import { ProjectHealthWidget } from "./ProjectHealthWidget";
import { CommandPalette } from "./CommandPalette";
import { TabBar } from "./TabBar";
import { RecentJobs } from "./RecentJobs";
import { RailsList } from "./RailsList";
import {
  DEMO_PROJECTS,
  DEMO_COMMANDS,
  DEMO_METRICS,
  DEMO_METRICS_ACME,
  DEMO_JOBS,
  DEMO_JOBS_ACME,
} from "./mock-data";
import type { SectionId } from "./types";

type SectionPrefs = Record<SectionId, { expanded: boolean; pinned: boolean }>;

const DEFAULT_PREFS: SectionPrefs = {
  spec: { expanded: true, pinned: false },
  rails: { expanded: true, pinned: false },
  jobs: { expanded: true, pinned: false },
  health: { expanded: true, pinned: true },
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
  const jobs = isAcme ? DEMO_JOBS_ACME : DEMO_JOBS;

  const healthColor =
    metrics.healthScore >= 80
      ? "text-dracula-green"
      : metrics.healthScore >= 60
      ? "text-dracula-yellow"
      : "text-dracula-red";
  const healthBg =
    metrics.healthScore >= 80
      ? "bg-dracula-green/10"
      : metrics.healthScore >= 60
      ? "bg-dracula-yellow/10"
      : "bg-dracula-red/10";

  const latestJobStatus = jobs[0]?.status;
  const jobsIndicatorColor =
    latestJobStatus === "failed" ? "text-dracula-red" : "text-dracula-green";
  const jobsIndicatorBg =
    latestJobStatus === "failed" ? "bg-dracula-red/10" : "bg-dracula-green/10";

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

      {/* Dashboard sections — matches Hub: Spec, Rails, Jobs, Health */}
      <div className="p-3 space-y-3">
        <CollapsibleSection
          id="spec"
          title="Spec"
          expanded={sections.spec.expanded}
          pinned={sections.spec.pinned}
          onToggleExpand={() => toggleExpand("spec")}
          onTogglePin={() => togglePin("spec")}
          indicator={
            <span className="text-[10px] font-mono text-muted-foreground/60">
              {DEMO_COMMANDS.length} installed
            </span>
          }
        >
          <CommandGrid commands={DEMO_COMMANDS} />
        </CollapsibleSection>

        <CollapsibleSection
          id="rails"
          title="Rails"
          expanded={sections.rails.expanded}
          pinned={sections.rails.pinned}
          onToggleExpand={() => toggleExpand("rails")}
          onTogglePin={() => togglePin("rails")}
          indicator={
            <span className="text-[10px] font-mono text-dracula-cyan/60">
              3 saved
            </span>
          }
        >
          <RailsList />
        </CollapsibleSection>

        <CollapsibleSection
          id="jobs"
          title="Jobs"
          expanded={sections.jobs.expanded}
          pinned={sections.jobs.pinned}
          onToggleExpand={() => toggleExpand("jobs")}
          onTogglePin={() => togglePin("jobs")}
          indicator={
            <span
              className={`text-[10px] font-mono ${jobsIndicatorColor} ${jobsIndicatorBg} px-1.5 py-0.5 rounded`}
            >
              {jobs.length} recent
            </span>
          }
        >
          <RecentJobs jobs={jobs} />
        </CollapsibleSection>

        <CollapsibleSection
          id="health"
          title="Health"
          expanded={sections.health.expanded}
          pinned={sections.health.pinned}
          onToggleExpand={() => toggleExpand("health")}
          onTogglePin={() => togglePin("health")}
          indicator={
            <span
              className={`text-[10px] font-mono ${healthColor} ${healthBg} px-1.5 py-0.5 rounded`}
            >
              {metrics.healthScore}
            </span>
          }
        >
          <ProjectHealthWidget metrics={metrics} />
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
