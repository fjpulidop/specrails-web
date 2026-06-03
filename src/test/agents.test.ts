import { describe, it, expect } from "vitest";
import { AGENTS } from "@/data/agents";
import type { PipelineStage, JobCategory } from "@/data/agents";

const VALID_STAGES: PipelineStage[] = [
  "discovery",
  "design",
  "implementation",
  "testing",
  "review",
  "audit",
];
const VALID_CATEGORIES: JobCategory[] = [
  "strategy",
  "architecture",
  "engineering",
  "quality",
  "security",
  "audit",
];
const VALID_MODELS = ["Opus", "Sonnet", "Haiku"] as const;

describe("AGENTS data", () => {
  it("contains exactly 14 agents", () => {
    expect(AGENTS).toHaveLength(14);
  });

  it("every agent has a non-empty name", () => {
    AGENTS.forEach((a) => expect(a.name.length).toBeGreaterThan(0));
  });

  it("every agent has a valid model", () => {
    AGENTS.forEach((a) => expect(VALID_MODELS).toContain(a.model));
  });

  it("every agent has a valid pipeline stage", () => {
    AGENTS.forEach((a) => expect(VALID_STAGES).toContain(a.stage));
  });

  it("every agent has a valid job category", () => {
    AGENTS.forEach((a) => expect(VALID_CATEGORIES).toContain(a.category));
  });

  it("every agent has a non-empty docsSlug", () => {
    AGENTS.forEach((a) => expect(a.docsSlug.length).toBeGreaterThan(0));
  });

  it("every agent has a non-empty description", () => {
    AGENTS.forEach((a) => expect(a.desc.length).toBeGreaterThan(0));
  });

  it("agent names are unique", () => {
    const names = AGENTS.map((a) => a.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has exactly one Opus agent", () => {
    expect(AGENTS.filter((a) => a.model === "Opus")).toHaveLength(1);
  });

  it("Product Manager is an Opus agent in the discovery stage", () => {
    const pm = AGENTS.find((a) => a.name === "Product Manager");
    expect(pm).toBeDefined();
    expect(pm?.model).toBe("Opus");
    expect(pm?.stage).toBe("discovery");
  });
});
