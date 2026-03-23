/**
 * TabBar — ported from specrails-hub/client/src/components/TabBar.tsx
 *
 * Multi-project tab bar for Hub mode.
 * Adapted for specrails-web demo: static projects, visual-only interactions.
 */

import { Plus, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoProject } from "./types";

interface TabBarProps {
  projects: DemoProject[];
  activeProjectId: string;
  onProjectChange: (id: string) => void;
}

function ProjectTab({
  project,
  isActive,
  onSelect,
}: {
  project: DemoProject;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-t-md border-b-0 transition-colors whitespace-nowrap",
        isActive
          ? "bg-background text-foreground border border-border border-b-background z-10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
      )}
    >
      <FolderOpen className="w-3 h-3 flex-shrink-0" />
      <span className="max-w-[120px] truncate">{project.name}</span>
    </button>
  );
}

export function TabBar({
  projects,
  activeProjectId,
  onProjectChange,
}: TabBarProps) {
  return (
    <div className="flex items-end gap-0.5 px-2 pt-1 border-b border-border bg-card/30">
      {projects.map((project) => (
        <ProjectTab
          key={project.id}
          project={project}
          isActive={project.id === activeProjectId}
          onSelect={() => onProjectChange(project.id)}
        />
      ))}

      <button
        type="button"
        className="h-8 px-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-md transition-colors cursor-default"
        aria-label="Add project"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add project</span>
      </button>
    </div>
  );
}
