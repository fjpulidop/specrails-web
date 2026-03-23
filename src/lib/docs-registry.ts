import readmeRaw from "specrails-core/docs/README.md?raw";
import gettingStartedRaw from "specrails-core/docs/getting-started.md?raw";
import tutorialQuickstartRaw from "../content/tutorial-quickstart.md?raw";
import codexGettingStartedRaw from "../content/codex-getting-started.md?raw";
import cliReferenceRaw from "../content/cli-reference.md?raw";
import conceptsRaw from "specrails-core/docs/concepts.md?raw";
import installationRaw from "specrails-core/docs/installation.md?raw";
import agentsRaw from "specrails-core/docs/agents.md?raw";
import workflowsRaw from "specrails-core/docs/workflows.md?raw";
import customizationRaw from "specrails-core/docs/customization.md?raw";
import updatingRaw from "specrails-core/docs/updating.md?raw";
import playbookProductDiscoveryRaw from "specrails-core/docs/playbook-product-discovery.md?raw";
import playbookParallelDevRaw from "specrails-core/docs/playbook-parallel-dev.md?raw";
import playbookOssMaintainerRaw from "specrails-core/docs/playbook-oss-maintainer.md?raw";
import changelogRaw from "specrails-core/docs/changelog.md?raw";
import apiReferenceRaw from "specrails-core/docs/api-reference.md?raw";
import deploymentRaw from "specrails-core/docs/deployment.md?raw";

// Hub docs (specrails-hub)
import hubGettingStartedRaw from "specrails-hub/docs/general/getting-started.md?raw";
import hubPlatformOverviewRaw from "specrails-hub/docs/general/platform-overview.md?raw";
import hubFeaturesRaw from "specrails-hub/docs/product/features.md?raw";
import hubWorkflowsRaw from "specrails-hub/docs/product/workflows.md?raw";
import hubOpenspecWorkflowRaw from "specrails-hub/docs/product/openspec-workflow.md?raw";
import hubApiReferenceRaw from "specrails-hub/docs/engineering/api-reference.md?raw";
import hubConfigurationRaw from "specrails-hub/docs/engineering/configuration.md?raw";

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  section?: string;
  product?: 'core' | 'hub' | 'mcp';
}

export const DOC_ENTRIES: DocEntry[] = [
  // ── Getting Started ──────────────────────────────────────
  {
    slug: "",
    title: "Documentation",
    description: "Overview and reading guide",
    content: readmeRaw,
    section: "Getting Started",
  },
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Install and run your first workflow in 5 minutes",
    content: gettingStartedRaw,
    section: "Getting Started",
  },
  {
    slug: "tutorial-quickstart",
    title: "Quick Start (5 min)",
    description: "Zero to first agent-generated PR in 5 minutes",
    content: tutorialQuickstartRaw,
    section: "Getting Started",
  },
  {
    slug: "codex-getting-started",
    title: "Getting Started with Codex",
    description: "Install and run specrails using OpenAI Codex — full feature parity with Claude Code",
    content: codexGettingStartedRaw,
    section: "Getting Started",
  },

  // ── specrails-core ───────────────────────────────────────
  {
    slug: "concepts",
    title: "Core Concepts",
    description: "The pipeline, agents, and product-driven approach",
    content: conceptsRaw,
    section: "specrails-core",
    product: "core",
  },
  {
    slug: "installation",
    title: "Installation & Setup",
    description: "Detailed setup, prerequisites, and the /setup wizard",
    content: installationRaw,
    section: "specrails-core",
    product: "core",
  },
  {
    slug: "agents",
    title: "Agents",
    description: "Every agent explained — role, model, and scope",
    content: agentsRaw,
    section: "specrails-core",
    product: "core",
  },
  {
    slug: "workflows",
    title: "Workflows & Commands",
    description: "How to use /implement, /product-backlog, and more",
    content: workflowsRaw,
    section: "specrails-core",
    product: "core",
  },
  {
    slug: "customization",
    title: "Customization",
    description: "Adapt agents, rules, personas, and conventions",
    content: customizationRaw,
    section: "specrails-core",
    product: "core",
  },

  // ── specrails-hub ────────────────────────────────────────
  {
    slug: "hub-getting-started",
    title: "Getting Started",
    description: "Install and run specrails-hub to manage multiple projects",
    content: hubGettingStartedRaw,
    section: "specrails-hub",
    product: "hub",
  },
  {
    slug: "hub-platform-overview",
    title: "Platform Overview",
    description: "Mental model behind specrails-hub and how pieces fit together",
    content: hubPlatformOverviewRaw,
    section: "specrails-hub",
    product: "hub",
  },
  {
    slug: "hub-features",
    title: "Features",
    description: "Reference guide to every feature in the specrails-hub dashboard",
    content: hubFeaturesRaw,
    section: "specrails-hub",
    product: "hub",
  },
  {
    slug: "hub-workflows",
    title: "Workflows",
    description: "Step-by-step guides for common tasks in specrails-hub",
    content: hubWorkflowsRaw,
    section: "specrails-hub",
    product: "hub",
  },
  {
    slug: "hub-openspec-workflow",
    title: "OpenSpec Workflow",
    description: "Structured change management lifecycle with OpenSpec artifacts",
    content: hubOpenspecWorkflowRaw,
    section: "specrails-hub",
    product: "hub",
  },
  {
    slug: "hub-api-reference",
    title: "API Reference",
    description: "Complete reference for specrails-hub local API endpoints",
    content: hubApiReferenceRaw,
    section: "specrails-hub",
    product: "hub",
  },
  {
    slug: "hub-configuration",
    title: "Configuration",
    description: "Hub-level settings, project settings, environment variables, and CLI flags",
    content: hubConfigurationRaw,
    section: "specrails-hub",
    product: "hub",
  },

  // ── Playbooks ────────────────────────────────────────────
  {
    slug: "playbook-product-discovery",
    title: "Product Discovery",
    description: "Write specs that produce reliable implementations",
    content: playbookProductDiscoveryRaw,
    section: "Playbooks",
  },
  {
    slug: "playbook-parallel-dev",
    title: "Parallel Development",
    description: "Run multiple features in parallel without merge conflicts",
    content: playbookParallelDevRaw,
    section: "Playbooks",
  },
  {
    slug: "playbook-oss-maintainer",
    title: "OSS Maintainer Workflow",
    description: "Review gates, confidence thresholds, and convention enforcement",
    content: playbookOssMaintainerRaw,
    section: "Playbooks",
  },

  // ── Reference ────────────────────────────────────────────
  {
    slug: "changelog",
    title: "Changelog",
    description: "What's new in each SpecRails release",
    content: changelogRaw,
    section: "Reference",
  },
  {
    slug: "cli-reference",
    title: "CLI Reference",
    description: "All specrails-core commands — init, setup, doctor, implement, preview, update",
    content: cliReferenceRaw,
    section: "Reference",
  },
  {
    slug: "api-reference",
    title: "API Reference",
    description: "Complete reference for the specrails-hub local API endpoints",
    content: apiReferenceRaw,
    section: "Reference",
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Local, Docker, and CI/CD deployment options",
    content: deploymentRaw,
    section: "Reference",
  },
  {
    slug: "updating",
    title: "Updating",
    description: "Keep SpecRails current without losing customizations",
    content: updatingRaw,
    section: "Reference",
  },
];

export function getDocBySlug(slug: string): DocEntry | undefined {
  return DOC_ENTRIES.find((d) => d.slug === slug);
}

export function getAdjacentDocs(slug: string): {
  prev: DocEntry | null;
  next: DocEntry | null;
} {
  const idx = DOC_ENTRIES.findIndex((d) => d.slug === slug);
  return {
    prev: idx > 0 ? DOC_ENTRIES[idx - 1] : null,
    next: idx < DOC_ENTRIES.length - 1 ? DOC_ENTRIES[idx + 1] : null,
  };
}
