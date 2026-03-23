/**
 * CommandPalette — ported from specrails-hub/client/src/components/CommandPalette.tsx
 *
 * Global Cmd+K search palette with commands, projects, and navigation.
 * Adapted for specrails-web demo: uses static data, no API fetches or real navigation.
 */

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import {
  Search,
  FolderOpen,
  Zap,
  Briefcase,
  LayoutDashboard,
  BarChart3,
  Activity,
  Settings,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CommandInfo, DemoProject, JobSummary } from "./types";

interface CommandPaletteProps {
  projects: DemoProject[];
  activeProjectId: string;
  commands: CommandInfo[];
  recentJobs: JobSummary[];
}

export function CommandPalette({
  projects,
  activeProjectId,
  commands,
  recentJobs,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const navItemClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "border border-border/30 bg-popover shadow-2xl backdrop-blur-md rounded-xl overflow-hidden"
      )}
    >
      <span className="sr-only">Command palette</span>

      <div className="flex items-center gap-2 px-3 border-b border-border/30">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <Command.Input
          placeholder="Search projects, commands, jobs..."
          className="flex-1 h-11 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
        />
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/50 bg-muted/30 px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
          esc
        </kbd>
      </div>

      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
          No results found.
        </Command.Empty>

        {projects.length > 0 && (
          <Command.Group heading="Projects">
            {projects.map((project) => (
              <Command.Item
                key={project.id}
                value={`project ${project.name} ${project.slug}`}
                onSelect={handleClose}
                className={cn(
                  navItemClass,
                  project.id === activeProjectId && "text-dracula-purple"
                )}
              >
                <FolderOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 truncate">{project.name}</span>
                {project.id === activeProjectId && (
                  <span className="text-[10px] text-dracula-purple font-medium">
                    active
                  </span>
                )}
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {commands.length > 0 && (
          <Command.Group heading="Commands">
            {commands.map((cmd) => (
              <Command.Item
                key={cmd.id}
                value={`command ${cmd.name} ${cmd.slug} ${cmd.description}`}
                onSelect={handleClose}
                className={navItemClass}
              >
                <Zap className="w-4 h-4 text-dracula-cyan shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="truncate">{cmd.name}</span>
                  {cmd.description && (
                    <span className="text-[11px] text-muted-foreground/60 ml-2 truncate">
                      {cmd.description}
                    </span>
                  )}
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {recentJobs.length > 0 && (
          <Command.Group heading="Recent Jobs">
            {recentJobs.map((job) => (
              <Command.Item
                key={job.id}
                value={`job ${job.command} ${job.status} ${job.id}`}
                onSelect={handleClose}
                className={navItemClass}
              >
                <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 truncate">{job.command}</span>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    job.status === "completed" && "text-dracula-green",
                    job.status === "failed" && "text-dracula-red",
                    job.status === "running" && "text-dracula-cyan",
                    job.status === "queued" && "text-muted-foreground"
                  )}
                >
                  {job.status}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Navigation">
          <Command.Item
            value="navigate dashboard home"
            onSelect={handleClose}
            className={navItemClass}
          >
            <LayoutDashboard className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>Dashboard</span>
          </Command.Item>
          <Command.Item
            value="navigate analytics metrics"
            onSelect={handleClose}
            className={navItemClass}
          >
            <BarChart3 className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>Analytics</span>
          </Command.Item>
          <Command.Item
            value="navigate activity feed log"
            onSelect={handleClose}
            className={navItemClass}
          >
            <Activity className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>Activity Feed</span>
          </Command.Item>
          <Command.Item
            value="navigate settings configuration"
            onSelect={handleClose}
            className={navItemClass}
          >
            <Settings className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>Settings</span>
          </Command.Item>
          <Command.Item
            value="navigate docs documentation"
            onSelect={handleClose}
            className={navItemClass}
          >
            <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>Docs</span>
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="flex items-center justify-between px-3 py-2 border-t border-border/30 text-[10px] text-muted-foreground/50">
        <div className="flex items-center gap-3">
          <span>
            <kbd className="font-mono">&uarr;&darr;</kbd> navigate
          </span>
          <span>
            <kbd className="font-mono">&crarr;</kbd> select
          </span>
          <span>
            <kbd className="font-mono">esc</kbd> close
          </span>
        </div>
      </div>
    </Command.Dialog>
  );
}
