import readmeRaw from "specrails-core/docs/README.md?raw";
import claudeGettingStartedRaw from "../content/getting-started.md?raw";
import codexGettingStartedRaw from "../content/codex-getting-started.md?raw";
import cliReferenceRaw from "../content/cli-reference.md?raw";
import conceptsRaw from "specrails-core/docs/concepts.md?raw";
// Local overrides — the external copies still carry Claude Code plugin
// references; the local versions drop them in favour of the npx install
// flow and match the Hub-first structure of the docs.
import installationRaw from "../content/installation.md?raw";
import deploymentRaw from "../content/deployment.md?raw";
import agentsRaw from "specrails-core/docs/agents.md?raw";
import customizationRaw from "specrails-core/docs/customization.md?raw";
import updatingRaw from "specrails-core/docs/updating.md?raw";
import playbookProductDiscoveryRaw from "specrails-core/docs/playbook-product-discovery.md?raw";
import playbookParallelDevRaw from "specrails-core/docs/playbook-parallel-dev.md?raw";
import playbookOssMaintainerRaw from "specrails-core/docs/playbook-oss-maintainer.md?raw";
import changelogRaw from "specrails-core/docs/changelog.md?raw";
import hubInstallationRaw from "../content/hub-installation.md?raw";
import hubFeaturesRaw from "../content/hub-features.md?raw";
import coreVsHubRaw from "../content/core-vs-hub.md?raw";

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  section?: string;
}

// Hub-first ordering: the desktop app is the recommended entry point;
// the CLI (specrails-core) is grouped after it for terminal-first devs.
export const DOC_ENTRIES: DocEntry[] = [
  {
    slug: "",
    title: "Documentation",
    description: "Overview and reading guide",
    content: readmeRaw,
  },
  // ── Hub (desktop app) — recommended path ────────────────────────────
  {
    slug: "hub-installation",
    title: "Install Hub",
    description: "Download the macOS app or install via npm — get specrails-hub running locally",
    content: hubInstallationRaw,
    section: "Hub",
  },
  {
    slug: "hub-features",
    title: "Hub Features",
    description: "Specs, Rails, Jobs, Analytics, Activity, Command Launcher, keyboard shortcuts",
    content: hubFeaturesRaw,
    section: "Hub",
  },
  {
    slug: "core-vs-hub",
    title: "Hub vs Core",
    description: "Which to use and when — they compose",
    content: coreVsHubRaw,
    section: "Hub",
  },
  // ── Core (CLI) — terminal-first alternative ─────────────────────────
  {
    slug: "installation",
    title: "Install specrails-core",
    description: "One command installs 14 AI agents and the workflow commands into your repo",
    content: installationRaw,
    section: "Core",
  },
  {
    slug: "claude-getting-started",
    title: "Getting Started with Claude Code",
    description: "Install and run your first pipeline in 5 minutes",
    content: claudeGettingStartedRaw,
    section: "Core",
  },
  {
    slug: "codex-getting-started",
    title: "Getting Started with OpenAI Codex",
    description: "Run the specrails pipeline with the OpenAI Codex CLI — prerequisites, setup, and differences vs Claude",
    content: codexGettingStartedRaw,
    section: "Core",
  },
  {
    slug: "concepts",
    title: "Core Concepts",
    description: "The pipeline, agents, and product-driven approach",
    content: conceptsRaw,
    section: "Core",
  },
  {
    slug: "agents",
    title: "Agents",
    description: "Every agent explained — role, model, and scope",
    content: agentsRaw,
    section: "Core",
  },
  {
    slug: "customization",
    title: "Customization",
    description: "Adapt agents, rules, personas, and conventions",
    content: customizationRaw,
    section: "Core",
  },
  {
    slug: "updating",
    title: "Updating",
    description: "Keep specrails current without losing customisations",
    content: updatingRaw,
    section: "Core",
  },
  // ── Playbooks & reference ──────────────────────────────────────────
  {
    slug: "playbook-product-discovery",
    title: "Product Discovery",
    description: "Turn rough ideas into scored, implementable specs",
    content: playbookProductDiscoveryRaw,
    section: "Playbook",
  },
  {
    slug: "playbook-parallel-dev",
    title: "Parallel Development",
    description: "Run multiple features in parallel without merge conflicts",
    content: playbookParallelDevRaw,
    section: "Playbook",
  },
  {
    slug: "playbook-oss-maintainer",
    title: "OSS Maintainer Workflow",
    description: "Review gates, confidence thresholds, and convention enforcement",
    content: playbookOssMaintainerRaw,
    section: "Playbook",
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "What's new in each release",
    content: changelogRaw,
    section: "Reference",
  },
  {
    slug: "cli-reference",
    title: "CLI Reference",
    description: "All specrails-core commands — init, enrich, doctor, implement, preview",
    content: cliReferenceRaw,
    section: "Reference",
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Running specrails locally, in CI, and on servers",
    content: deploymentRaw,
    section: "Reference",
  },
];

// Strip inline markdown navigation lines (e.g. "[← Back to Docs](...) · [Next →](...)")
// that come from source docs — DocPage renders its own prev/next navigation.
function stripMarkdownNav(content: string): string {
  return content
    .split("\n")
    .filter((line) => !/^\[←[^\]]*\]\([^)]*\)/.test(line.trim()))
    .join("\n")
    .trimEnd();
}

export const DOCS = DOC_ENTRIES.map((entry) => ({
  ...entry,
  content: stripMarkdownNav(entry.content),
}));

export function getDocBySlug(slug: string): DocEntry | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function getAdjacentDocs(slug: string): {
  prev: DocEntry | null;
  next: DocEntry | null;
} {
  const idx = DOCS.findIndex((d) => d.slug === slug);
  return {
    prev: idx > 0 ? DOCS[idx - 1] : null,
    next: idx < DOCS.length - 1 ? DOCS[idx + 1] : null,
  };
}
