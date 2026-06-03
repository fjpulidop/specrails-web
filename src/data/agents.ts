import {
  Briefcase,
  Search,
  Cpu,
  Code,
  Server,
  Monitor,
  TestTubes,
  CheckCircle,
  Eye,
  ShieldCheck,
  Shield,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PipelineStage =
  | "discovery"
  | "design"
  | "implementation"
  | "testing"
  | "review"
  | "audit";

export type JobCategory =
  | "strategy"
  | "architecture"
  | "engineering"
  | "quality"
  | "security"
  | "audit";

export interface AgentEntry {
  name: string;
  model: "Opus" | "Sonnet" | "Haiku";
  primaryJob: string;
  desc: string;
  stage: PipelineStage;
  category: JobCategory;
  docsSlug: string;
  icon: LucideIcon;
  color: string;
  border: string;
  glow: string;
  core?: boolean;
  note?: string;
}

export const AGENTS: AgentEntry[] = [
  {
    name: "Product Manager",
    model: "Opus",
    primaryJob: "Analyzes market fit and prioritizes features",
    desc: "Strategy and discovery. Analyzes the market, brainstorms features, and scores them with Value Proposition Canvas",
    stage: "discovery",
    category: "strategy",
    docsSlug: "agents",
    icon: Briefcase,
    color: "text-dracula-purple",
    border: "border-dracula-purple",
    glow: "glow-purple",
  },
  {
    name: "Product Analyst",
    model: "Haiku",
    primaryJob: "Audits spec-vs-code divergence (read-only)",
    desc: "Read-only audit. Compares specs vs actual code and generates divergence reports",
    stage: "audit",
    category: "audit",
    docsSlug: "agents",
    icon: Search,
    color: "text-dracula-cyan",
    border: "border-dracula-cyan",
    glow: "glow-cyan",
  },
  {
    name: "Architect",
    model: "Sonnet",
    primaryJob: "Translates specs into tasks and risk assessments",
    desc: "Translates specs into technical designs, ordered tasks, and risk assessments",
    stage: "design",
    category: "architecture",
    docsSlug: "agents",
    icon: Cpu,
    color: "text-dracula-orange",
    border: "border-dracula-orange",
    glow: "glow-orange",
    core: true,
  },
  {
    name: "Developer",
    model: "Sonnet",
    primaryJob: "Full-stack polyglot, 4-phase implementation",
    desc: "Full-stack polyglot engineer. 4 phases: Understand → Plan → Implement → Verify",
    stage: "implementation",
    category: "engineering",
    docsSlug: "agents",
    icon: Code,
    color: "text-dracula-green",
    border: "border-dracula-green",
    glow: "glow-green",
    core: true,
    note: "Dynamically dispatched — implement detects specialized Developer agents by keywords and routes each task to the best match.",
  },
  {
    name: "Backend Developer",
    model: "Sonnet",
    primaryJob: "Server-side specialist for parallel pipelines",
    desc: "Server-side specialist for parallel frontend/backend pipelines",
    stage: "implementation",
    category: "engineering",
    docsSlug: "agents",
    icon: Server,
    color: "text-dracula-yellow",
    border: "border-dracula-yellow",
    glow: "glow-yellow",
  },
  {
    name: "Frontend Developer",
    model: "Sonnet",
    primaryJob: "UI/UX specialist with pixel-perfect focus",
    desc: "UI/UX specialist with pixel-perfect precision",
    stage: "implementation",
    category: "engineering",
    docsSlug: "agents",
    icon: Monitor,
    color: "text-dracula-pink",
    border: "border-dracula-pink",
    glow: "glow-pink",
  },
  {
    name: "Test Writer",
    model: "Sonnet",
    primaryJob: "Generates test suites targeting >80% coverage",
    desc: "Generates test suites with >80% coverage. Auto-detects frameworks",
    stage: "testing",
    category: "quality",
    docsSlug: "agents",
    icon: TestTubes,
    color: "text-dracula-cyan",
    border: "border-dracula-cyan",
    glow: "glow-cyan",
  },
  {
    name: "Reviewer",
    model: "Sonnet",
    primaryJob: "Final quality gate with confidence scoring",
    desc: "Final quality checkpoint. Runs CI, autonomously fixes issues (up to 3 attempts)",
    stage: "review",
    category: "quality",
    docsSlug: "agents",
    icon: CheckCircle,
    color: "text-dracula-orange",
    border: "border-dracula-orange",
    glow: "glow-orange",
    core: true,
    note: "Sub-specializes on demand — delegates to Frontend or Backend Reviewers when those agents are installed.",
  },
  {
    name: "Frontend Reviewer",
    model: "Sonnet",
    primaryJob: "UI code review for a11y and component patterns",
    desc: "Reviews frontend code for accessibility, component patterns, and UI quality",
    stage: "review",
    category: "quality",
    docsSlug: "agents",
    icon: Eye,
    color: "text-dracula-pink",
    border: "border-dracula-pink",
    glow: "glow-pink",
  },
  {
    name: "Backend Reviewer",
    model: "Sonnet",
    primaryJob: "API and security review for server code",
    desc: "Reviews backend code for API design, security practices, and server-side quality",
    stage: "review",
    category: "quality",
    docsSlug: "agents",
    icon: ShieldCheck,
    color: "text-dracula-yellow",
    border: "border-dracula-yellow",
    glow: "glow-yellow",
  },
  {
    name: "Security Reviewer",
    model: "Sonnet",
    primaryJob: "OWASP scan, credential audit, deployment block",
    desc: "Security auditor. Scans 11 credential patterns and OWASP vulnerabilities. Can BLOCK deployment",
    stage: "review",
    category: "security",
    docsSlug: "agents",
    icon: Shield,
    color: "text-dracula-red",
    border: "border-dracula-red",
    glow: "glow-red",
  },
  {
    name: "Doc Sync",
    model: "Sonnet",
    primaryJob: "Updates changelogs, READMEs, and API docs",
    desc: "Documentation keeper. Syncs changelogs, READMEs, and API docs after code changes",
    stage: "review",
    category: "quality",
    docsSlug: "agents",
    icon: FileText,
    color: "text-dracula-cyan",
    border: "border-dracula-cyan",
    glow: "glow-cyan",
  },
];
