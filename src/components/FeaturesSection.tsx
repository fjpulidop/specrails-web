import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart3, GitBranch, Eye, Brain, ShieldCheck, Layers, Wand2,
  Gauge, AlertTriangle, Users, ListOrdered, Terminal,
  LayoutDashboard, KanbanSquare, Activity, Search, MessageSquare,
  Keyboard, ArrowRightLeft, Workflow, FileCheck, Radio,
} from "lucide-react";

interface FeatureCard {
  title: string;
  desc: string;
  icon: typeof Terminal;
  accent: string;
  hoverGlow: string;
}

const coreFeatures: FeatureCard[] = [
  { title: "CLI Agnostic", desc: "Works with Claude Code and OpenAI Codex. Both CLIs are first-class citizens — same agents, same pipeline, same features.", icon: Terminal, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Value Proposition Canvas", desc: "Integrated VPC framework. Evaluates features by mapping Products & Services, Pain Relievers, and Gain Creators against Customer Jobs, Pains, and Gains. Scoring 0-5 per persona.", icon: BarChart3, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Parallel Execution", desc: "Multiple features are implemented simultaneously in isolated git worktrees. Conflict-aware merge with intelligent resolution.", icon: GitBranch, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Spec-Driven Development", desc: "Each agent is specialized in one part of the software development process using SDD with OpenSpec.", icon: Eye, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
  { title: "Institutional Memory", desc: "Each agent maintains persistent memory. Learned patterns, architectural decisions, and recurring fixes accumulate across sessions.", icon: Brain, accent: "text-dracula-pink", hoverGlow: "hover:glow-pink" },
  { title: "Security Gate", desc: "The Security Reviewer scans credentials (11 patterns) and OWASP vulnerabilities before every deploy. BLOCKED status prevents shipping.", icon: ShieldCheck, accent: "text-dracula-red", hoverGlow: "hover:glow-red" },
  { title: "Multi-Stack", desc: "Python, Node, Go, Rust, Java, Ruby, .NET, React, Vue, Angular, Svelte, Next.js, PostgreSQL, MongoDB, Redis, and more.", icon: Layers, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Smart Setup", desc: "Analyzes your real codebase (imports, patterns, conventions, CI) instead of applying generic templates. Self-cleans after installation.", icon: Wand2, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Confidence Scoring", desc: "Reviewer agents self-assess output quality across 5 aspects (correctness, security, tests, docs, performance). A configurable gate blocks shipping below threshold.", icon: Gauge, accent: "text-dracula-yellow", hoverGlow: "hover:glow-yellow" },
  { title: "Failure Learning Loop", desc: "When the reviewer flags a failure, a post-mortem record is written to memory. Future developer agents load these records as guardrails, preventing repeated mistakes.", icon: AlertTriangle, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Layer-Specific Reviews", desc: "Dedicated frontend and backend reviewer agents run in parallel, applying domain expertise to UI patterns and API contracts independently.", icon: Users, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
  { title: "Dependency-Aware Ordering", desc: "/specrails:get-backlog-specs parses Prerequisites fields, builds a dependency DAG, and topological-sorts features so the safest implementation order is always chosen.", icon: ListOrdered, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
];

const hubFeatures: FeatureCard[] = [
  { title: "Multi-Project Dashboard", desc: "Manage all your specrails projects from a single interface. See specs, pipeline status, and jobs across every repository.", icon: LayoutDashboard, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Real-time Pipeline", desc: "Watch your AI pipeline progress in real time. See which agents are active, what phase each feature is in, and streaming output.", icon: Workflow, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
  { title: "Ticket Management", desc: "Three views for your development tickets: List for overview, Kanban for workflow, and Post-it for brainstorming. Full CRUD with labels and status.", icon: KanbanSquare, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Analytics & Cost Tracking", desc: "KPI dashboard with charts showing agent performance, token usage, cost per feature, and success rates over time.", icon: BarChart3, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Streaming Logs", desc: "Real-time log streaming from agent execution. Filter by agent, level, or phase. Search across all log output.", icon: Search, accent: "text-dracula-yellow", hoverGlow: "hover:glow-yellow" },
  { title: "Command Launcher", desc: "Execute specrails commands directly from the dashboard. Queue jobs, monitor progress, and see results without leaving the browser.", icon: Terminal, accent: "text-dracula-pink", hoverGlow: "hover:glow-pink" },
  { title: "Chat per Project", desc: "Built-in chat interface scoped to each project. Ask questions about your codebase, get agent recommendations, and review context.", icon: MessageSquare, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Keyboard-First UX", desc: "Full keyboard navigation with Cmd+K command palette. Navigate between views, trigger actions, and search — all without touching the mouse.", icon: Keyboard, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
];

const togetherFeatures: FeatureCard[] = [
  { title: "Core Implements, Hub Visualizes", desc: "Core's agents do the heavy lifting — writing code, running tests, shipping PRs. Hub gives you a live dashboard showing every step as it happens.", icon: ArrowRightLeft, accent: "text-dracula-pink", hoverGlow: "hover:glow-pink" },
  { title: "Core Learns, Hub Reports", desc: "Core's institutional memory accumulates patterns and decisions. Hub surfaces those insights in analytics dashboards and activity feeds.", icon: Activity, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Core Ships PRs, Hub Tracks Progress", desc: "Core creates branches, writes code, and opens pull requests. Hub's ticket management tracks every feature from idea through merge.", icon: FileCheck, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Core Runs Agents, Hub Streams Logs", desc: "Core orchestrates 14 agents across your pipeline. Hub streams their output in real time — filter, search, and monitor from one screen.", icon: Radio, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
];

const FeatureGrid = ({ features }: { features: FeatureCard[] }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {features.map((f, i) => (
        <div
          key={f.title}
          className={`glass-card p-5 transition-all duration-500 hover:-translate-y-1 ${f.hoverGlow} ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <div className="p-2 rounded-lg bg-dracula-current inline-block mb-3">
            <f.icon className={`w-5 h-5 ${f.accent}`} />
          </div>
          <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState("core");

  return (
    <section id="features" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Key <span className="gradient-text">Features</span>
        </h2>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-dracula-current/50 border border-border/20">
              <TabsTrigger
                value="core"
                className="data-[state=active]:bg-dracula-cyan/20 data-[state=active]:text-dracula-cyan"
              >
                Core
              </TabsTrigger>
              <TabsTrigger
                value="hub"
                className="data-[state=active]:bg-dracula-purple/20 data-[state=active]:text-dracula-purple"
              >
                Hub
              </TabsTrigger>
              <TabsTrigger
                value="together"
                className="data-[state=active]:bg-dracula-pink/20 data-[state=active]:text-dracula-pink"
              >
                Together
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="core" className="animate-fade-up">
            <FeatureGrid features={coreFeatures} />
          </TabsContent>

          <TabsContent value="hub" className="animate-fade-up">
            <FeatureGrid features={hubFeatures} />
          </TabsContent>

          <TabsContent value="together" className="animate-fade-up">
            <FeatureGrid features={togetherFeatures} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
