import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  ChevronDown,
  Command,
  Circle,
  GripVertical,
  Activity,
  BarChart3,
  Heart,
  Grid3X3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Mock Data ──────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
  hasActiveJob: boolean;
}

const PROJECTS: Project[] = [
  { id: "openclaw", name: "openclaw", hasActiveJob: true },
  { id: "acme-api", name: "acme-api", hasActiveJob: true },
];

const PIPELINE_STAGES = ["Architect", "Developer", "Reviewer", "Ship"];

interface DemoCommand {
  name: string;
  label: string;
  category: "discovery" | "delivery";
}

const COMMANDS: DemoCommand[] = [
  { name: "propose-spec", label: "Propose a spec change", category: "discovery" },
  { name: "auto-propose", label: "Auto-propose specs", category: "discovery" },
  { name: "auto-select", label: "Auto-select specs", category: "discovery" },
  { name: "explore", label: "Explore ideas", category: "discovery" },
  { name: "implement", label: "Build features", category: "delivery" },
  { name: "batch-implement", label: "Batch implementation", category: "delivery" },
  { name: "review", label: "Code review", category: "delivery" },
  { name: "ship", label: "Deploy to production", category: "delivery" },
];

// ─── Per-project mock data ──────────────────────────────────

interface ProjectData {
  costData: Record<string, { day: string; cost: number }[]>;
  health: { score: number; done: number; running: number; failed: number; queued: number };
  pipelineLabel: string;
}

const PROJECT_DATA: Record<string, ProjectData> = {
  openclaw: {
    costData: {
      "7d": [
        { day: "Mon", cost: 2.4 },
        { day: "Tue", cost: 3.1 },
        { day: "Wed", cost: 1.8 },
        { day: "Thu", cost: 4.2 },
        { day: "Fri", cost: 2.9 },
        { day: "Sat", cost: 0.6 },
        { day: "Sun", cost: 1.2 },
      ],
      "30d": [
        { day: "W1", cost: 14.2 },
        { day: "W2", cost: 18.7 },
        { day: "W3", cost: 12.1 },
        { day: "W4", cost: 21.4 },
      ],
      "90d": [
        { day: "Jan", cost: 48.3 },
        { day: "Feb", cost: 62.1 },
        { day: "Mar", cost: 41.7 },
      ],
    },
    health: { score: 87, done: 14, running: 2, failed: 0, queued: 1 },
    pipelineLabel: "openclaw/feat/auth-flow",
  },
  "acme-api": {
    costData: {
      "7d": [
        { day: "Mon", cost: 1.1 },
        { day: "Tue", cost: 0.8 },
        { day: "Wed", cost: 3.6 },
        { day: "Thu", cost: 2.0 },
        { day: "Fri", cost: 5.1 },
        { day: "Sat", cost: 0.3 },
        { day: "Sun", cost: 0.9 },
      ],
      "30d": [
        { day: "W1", cost: 9.8 },
        { day: "W2", cost: 22.4 },
        { day: "W3", cost: 15.6 },
        { day: "W4", cost: 11.3 },
      ],
      "90d": [
        { day: "Jan", cost: 35.2 },
        { day: "Feb", cost: 44.8 },
        { day: "Mar", cost: 58.1 },
      ],
    },
    health: { score: 72, done: 9, running: 1, failed: 2, queued: 3 },
    pipelineLabel: "acme-api/fix/rate-limiter",
  },
};

// ─── Sub-components ─────────────────────────────────────────

const DemoTabBar = ({
  activeProject,
  onProjectChange,
  onOpenPalette,
}: {
  activeProject: string;
  onProjectChange: (id: string) => void;
  onOpenPalette: () => void;
}) => (
  <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
    <div className="flex items-center gap-1">
      {PROJECTS.map((p) => (
        <button
          key={p.id}
          onClick={() => onProjectChange(p.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-mono transition-colors ${
            activeProject === p.id
              ? "text-dracula-fg"
              : "text-muted-foreground hover:text-dracula-fg"
          }`}
          style={
            activeProject === p.id
              ? {
                  background: "hsl(var(--dracula-current) / 0.5)",
                  borderBottom: "2px solid hsl(var(--dracula-green))",
                }
              : undefined
          }
        >
          {p.hasActiveJob && (
            <Circle
              className="h-2 w-2 text-dracula-green"
              style={{ fill: "hsl(var(--dracula-green))" }}
            />
          )}
          {p.name}
        </button>
      ))}
    </div>
    <button
      onClick={onOpenPalette}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-dracula-fg transition-colors px-2 py-1 rounded border border-border/30"
      aria-label="Open command palette"
    >
      <Command className="h-3 w-3" />K
    </button>
  </div>
);

const DemoPipeline = ({ activeStage }: { activeStage: number }) => (
  <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
    {PIPELINE_STAGES.map((stage, i) => {
      const isDone = i < activeStage;
      const isActive = i === activeStage;
      return (
        <div key={stage} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="flex flex-col items-center" style={{ minWidth: 70 }}>
            <div
              className="w-full h-2 rounded-full transition-all duration-500"
              style={{
                background: isDone
                  ? "hsl(var(--dracula-green))"
                  : isActive
                  ? "hsl(var(--dracula-green) / 0.5)"
                  : "hsl(var(--dracula-current) / 0.4)",
                animation: isActive ? "pulse 2s infinite" : undefined,
              }}
            />
            <span
              className={`text-[10px] mt-1 font-mono ${
                isDone
                  ? "text-dracula-green"
                  : isActive
                  ? "text-dracula-yellow"
                  : "text-muted-foreground"
              }`}
            >
              {stage}
            </span>
          </div>
          {i < PIPELINE_STAGES.length - 1 && (
            <span className="text-muted-foreground text-xs flex-shrink-0">
              {"\u2192"}
            </span>
          )}
        </div>
      );
    })}
  </div>
);

const DemoCommandGrid = () => {
  const discoveryCmds = COMMANDS.filter((c) => c.category === "discovery");
  const deliveryCmds = COMMANDS.filter((c) => c.category === "delivery");

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <span
          className="text-[10px] font-mono text-dracula-purple uppercase tracking-wider mb-2 block"
        >
          Discovery
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {discoveryCmds.map((cmd) => (
            <div
              key={cmd.name}
              className="px-2 py-1.5 rounded text-[11px] font-mono text-dracula-fg cursor-default transition-all hover:scale-[1.02]"
              style={{
                background: "hsl(var(--dracula-current) / 0.3)",
                border: "1px solid hsl(var(--dracula-purple) / 0.2)",
              }}
            >
              {cmd.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <span
          className="text-[10px] font-mono text-dracula-cyan uppercase tracking-wider mb-2 block"
        >
          Delivery
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {deliveryCmds.map((cmd) => (
            <div
              key={cmd.name}
              className="px-2 py-1.5 rounded text-[11px] font-mono text-dracula-fg cursor-default transition-all hover:scale-[1.02]"
              style={{
                background: "hsl(var(--dracula-current) / 0.3)",
                border: "1px solid hsl(var(--dracula-cyan) / 0.2)",
              }}
            >
              {cmd.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DemoAnalytics = ({
  period,
  onPeriodChange,
  projectId,
}: {
  period: string;
  onPeriodChange: (p: string) => void;
  projectId: string;
}) => {
  const projectCostData = PROJECT_DATA[projectId]?.costData ?? PROJECT_DATA.openclaw.costData;
  const data = projectCostData[period] ?? projectCostData["7d"];
  const total = data.reduce((s, d) => s + d.cost, 0);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {["7d", "30d", "90d"].map((p) => (
          <button
            key={p}
            onClick={() => onPeriodChange(p)}
            className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
              period === p
                ? "text-dracula-green"
                : "text-muted-foreground hover:text-dracula-fg"
            }`}
            style={
              period === p
                ? {
                    background: "hsl(var(--dracula-green) / 0.15)",
                    border: "1px solid hsl(var(--dracula-green) / 0.3)",
                  }
                : undefined
            }
          >
            {p}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-muted-foreground font-mono">
          Total: ${total.toFixed(2)}
        </span>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v}`}
              width={35}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 6,
                fontSize: 11,
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost"]}
            />
            <Bar
              dataKey="cost"
              fill="hsl(135, 94%, 65%)"
              radius={[3, 3, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DemoProjectHealth = ({ projectId }: { projectId: string }) => {
  const health = PROJECT_DATA[projectId]?.health ?? PROJECT_DATA.openclaw.health;
  const scoreColor = health.score >= 80 ? "text-dracula-green" : health.score >= 60 ? "text-dracula-yellow" : "text-dracula-red";
  const strokeColor = health.score >= 80 ? "hsl(135, 94%, 65%)" : health.score >= 60 ? "hsl(var(--dracula-yellow))" : "hsl(var(--dracula-red))";

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="hsl(var(--dracula-current))"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeDasharray={`${health.score} ${100 - health.score}`}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold ${scoreColor}`}>
          {health.score}
        </span>
      </div>
      <div className="flex gap-4 text-[11px] font-mono">
        <div>
          <span className="text-dracula-green">{health.done}</span>{" "}
          <span className="text-muted-foreground">done</span>
        </div>
        <div>
          <span className="text-dracula-yellow">{health.running}</span>{" "}
          <span className="text-muted-foreground">running</span>
        </div>
        <div>
          <span className="text-dracula-red">{health.failed}</span>{" "}
          <span className="text-muted-foreground">failed</span>
        </div>
        <div>
          <span className="text-muted-foreground">
            {health.queued} queued
          </span>
        </div>
      </div>
    </div>
  );
};

const DashboardSection = ({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full px-3 py-2 text-xs font-mono transition-colors rounded-sm"
        style={{ background: open ? undefined : "hsl(var(--dracula-current) / 0.1)" }}
      >
        <GripVertical className="h-3 w-3 text-muted-foreground" />
        <Icon className="h-3.5 w-3.5 text-dracula-green" />
        <span className="text-dracula-fg">{title}</span>
        <ChevronDown
          className={`h-3 w-3 ml-auto text-muted-foreground transition-transform duration-200 ${
            open ? "" : "-rotate-90"
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 py-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const DemoCommandPalette = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <CommandDialog open={open} onOpenChange={onOpenChange}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Discovery">
        {COMMANDS.filter((c) => c.category === "discovery").map((cmd) => (
          <CommandItem key={cmd.name} onSelect={() => onOpenChange(false)}>
            <span className="font-mono text-dracula-purple mr-2">
              {cmd.name}
            </span>
            <span className="text-muted-foreground">{cmd.label}</span>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandGroup heading="Delivery">
        {COMMANDS.filter((c) => c.category === "delivery").map((cmd) => (
          <CommandItem key={cmd.name} onSelect={() => onOpenChange(false)}>
            <span className="font-mono text-dracula-cyan mr-2">
              {cmd.name}
            </span>
            <span className="text-muted-foreground">{cmd.label}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </CommandDialog>
);

// ─── Main Component ─────────────────────────────────────────

const HubDemoSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeProject, setActiveProject] = useState("openclaw");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [period, setPeriod] = useState("7d");

  // Cycle pipeline animation when visible
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % (PIPELINE_STAGES.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section id="hub-demo" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Try{" "}
          <span className="text-dracula-green">specrails-hub</span> in
          Action
        </h2>
        <p
          className={`text-center text-muted-foreground mb-4 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Interactive demo with{" "}
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dracula-purple hover:text-dracula-pink underline underline-offset-2 transition-colors"
          >
            OpenClaw
          </a>{" "}
          project data. Collapse sections, switch projects, and open the
          command palette.
        </p>
        <p
          className={`text-center text-sm text-muted-foreground mb-12 max-w-xl mx-auto transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          This is a small preview of the dashboard &mdash; specrails-hub
          includes{" "}
          <span className="text-dracula-fg font-medium">
            activity feed, AI chat, job logs, docs portal, settings,
          </span>{" "}
          and much more. Install it to explore the full experience.
        </p>

        {/* Dashboard mockup */}
        <div
          className={`glass-card overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ border: "1px solid hsl(var(--dracula-green) / 0.3)" }}
        >
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
          </div>

          {/* Tab bar */}
          <DemoTabBar
            activeProject={activeProject}
            onProjectChange={setActiveProject}
            onOpenPalette={() => setPaletteOpen(true)}
          />

          {/* Dashboard sections */}
          <div className="divide-y divide-border/10">
            <DashboardSection title="Pipeline" icon={Activity}>
              <DemoPipeline activeStage={activeStage} />
            </DashboardSection>

            <DashboardSection title="CommandGrid" icon={Grid3X3}>
              <DemoCommandGrid />
            </DashboardSection>

            <DashboardSection title="Analytics" icon={BarChart3}>
              <DemoAnalytics period={period} onPeriodChange={setPeriod} projectId={activeProject} />
            </DashboardSection>

            <DashboardSection title="Project Health" icon={Heart}>
              <DemoProjectHealth projectId={activeProject} />
            </DashboardSection>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-8 text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <code
            className="text-sm font-mono text-dracula-green px-4 py-2 rounded-lg"
            style={{
              background: "hsl(var(--dracula-current) / 0.4)",
              border: "1px solid hsl(var(--dracula-green) / 0.2)",
            }}
          >
            npm install -g specrails-hub
          </code>
        </div>
      </div>

      {/* Command Palette (portal) */}
      <DemoCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </section>
  );
};

export default HubDemoSection;
