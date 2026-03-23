/**
 * RecentJobs — compact table of recent pipeline jobs.
 * Shows command, status, cost, and relative time.
 */

import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JobSummary } from "./types";

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  completed: { icon: CheckCircle2, color: "text-dracula-green" },
  failed: { icon: XCircle, color: "text-dracula-red" },
  running: { icon: Loader2, color: "text-dracula-yellow" },
  queued: { icon: Clock, color: "text-muted-foreground" },
  canceled: { icon: XCircle, color: "text-muted-foreground" },
};

interface RecentJobsProps {
  jobs: JobSummary[];
}

export function RecentJobs({ jobs }: RecentJobsProps) {
  if (jobs.length === 0) {
    return (
      <p className="text-xs text-muted-foreground text-center py-4">
        No recent jobs
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      {jobs.map((job) => {
        const config = STATUS_CONFIG[job.status] ?? STATUS_CONFIG.queued;
        const Icon = config.icon;
        const duration =
          job.started_at && job.finished_at
            ? Math.round(
                (new Date(job.finished_at).getTime() -
                  new Date(job.started_at).getTime()) /
                  1000
              )
            : null;

        return (
          <div
            key={job.id}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <Icon
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                config.color,
                job.status === "running" && "animate-spin"
              )}
            />
            <span className="text-xs font-mono text-foreground truncate flex-1">
              {job.command}
            </span>
            {duration !== null && (
              <span className="text-[10px] text-muted-foreground/60 tabular-nums shrink-0">
                {duration < 60 ? `${duration}s` : `${Math.round(duration / 60)}m`}
              </span>
            )}
            {job.total_cost_usd != null && (
              <span className="text-[10px] text-muted-foreground/60 tabular-nums shrink-0">
                ${job.total_cost_usd.toFixed(4)}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground/40 shrink-0">
              {formatDistanceToNow(new Date(job.started_at), {
                addSuffix: true,
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}
