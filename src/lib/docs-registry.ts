import readmeRaw from "specrails-core/docs/README.md?raw";
import gettingStartedRaw from "specrails-core/docs/getting-started.md?raw";
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
    slug: "getting-started",
    title: "Getting Started",
    description: "Install and run your first workflow in 5 minutes",
    content: gettingStartedRaw,
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
    slug: "workflows",
    title: "Workflows & Commands",
    description: "How to use /implement, /product-backlog, and more",
    content: workflowsRaw,
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
