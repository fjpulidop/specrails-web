import readmeRaw from "specrails-core/docs/README.md?raw";
import claudeGettingStartedRaw from "../content/getting-started.md?raw";
import codexGettingStartedRaw from "../content/codex-getting-started.md?raw";
import cliReferenceRaw from "../content/cli-reference.md?raw";
import conceptsRaw from "specrails-core/docs/concepts.md?raw";
import installationRaw from "specrails-core/docs/installation.md?raw";
import agentsRaw from "specrails-core/docs/agents.md?raw";
import customizationRaw from "specrails-core/docs/customization.md?raw";
import updatingRaw from "specrails-core/docs/updating.md?raw";
import playbookProductDiscoveryRaw from "specrails-core/docs/playbook-product-discovery.md?raw";
import playbookParallelDevRaw from "specrails-core/docs/playbook-parallel-dev.md?raw";
import playbookOssMaintainerRaw from "specrails-core/docs/playbook-oss-maintainer.md?raw";
import changelogRaw from "specrails-core/docs/changelog.md?raw";
import deploymentRaw from "specrails-core/docs/deployment.md?raw";

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  section?: string;
}

export const DOC_ENTRIES: DocEntry[] = [
  {
    slug: "",
    title: "Documentation",
    description: "Overview and reading guide",
    content: readmeRaw,
  },
  {
    slug: "claude-getting-started",
    title: "Getting Started with Claude Code",
    description: "Install and run your first workflow in 5 minutes",
    content: claudeGettingStartedRaw,
    section: "Tutorials",
  },
  {
    slug: "codex-getting-started",
    title: "Getting Started with OpenAI Codex",
    description: "Install and run specrails using OpenAI Codex — full feature parity with Claude Code",
    content: codexGettingStartedRaw,
    section: "Tutorials",
  },
  {
    slug: "concepts",
    title: "Core Concepts",
    description: "The pipeline, agents, and product-driven approach",
    content: conceptsRaw,
  },
  {
    slug: "installation",
    title: "Installation & Setup",
    description: "Detailed setup, prerequisites, and the /setup wizard",
    content: installationRaw,
  },
  {
    slug: "agents",
    title: "Agents",
    description: "Every agent explained — role, model, and scope",
    content: agentsRaw,
  },
  {
    slug: "customization",
    title: "Customization",
    description: "Adapt agents, rules, personas, and conventions",
    content: customizationRaw,
  },
  {
    slug: "updating",
    title: "Updating",
    description: "Keep SpecRails current without losing customizations",
    content: updatingRaw,
  },
  {
    slug: "playbook-product-discovery",
    title: "Product Discovery",
    description: "Write specs that produce reliable implementations",
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
    description: "What's new in each SpecRails release",
    content: changelogRaw,
  },
  {
    slug: "cli-reference",
    title: "CLI Reference",
    description: "All specrails-core commands — init, setup, doctor, implement, preview, update",
    content: cliReferenceRaw,
    section: "Reference",
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Local, Docker, and CI/CD deployment options",
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
