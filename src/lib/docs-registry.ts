import readmeRaw from "../../docs/README.md?raw";
import gettingStartedRaw from "../../docs/getting-started.md?raw";
import conceptsRaw from "../../docs/concepts.md?raw";
import installationRaw from "../../docs/installation.md?raw";
import agentsRaw from "../../docs/agents.md?raw";
import workflowsRaw from "../../docs/workflows.md?raw";
import customizationRaw from "../../docs/customization.md?raw";
import updatingRaw from "../../docs/updating.md?raw";

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
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
    description: "How to use /sr:implement, /sr:product-backlog, and more",
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
