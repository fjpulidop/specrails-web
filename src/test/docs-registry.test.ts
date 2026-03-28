import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("docs-registry", () => {
  it("has 27 entries (8 core + 9 hub + 3 mcp + 3 playbooks + 4 reference)", () => {
    expect(DOC_ENTRIES).toHaveLength(27);
  });

  it("getDocBySlug returns correct entry", () => {
    expect(getDocBySlug("agents")?.title).toBe("Agents");
  });

  it("getDocBySlug returns undefined for unknown slug", () => {
    expect(getDocBySlug("nonexistent")).toBeUndefined();
  });

  it("getAdjacentDocs: first entry has no prev", () => {
    expect(getAdjacentDocs("").prev).toBeNull();
  });

  it("getAdjacentDocs: last entry has no next", () => {
    const lastEntry = DOC_ENTRIES[DOC_ENTRIES.length - 1];
    expect(getAdjacentDocs(lastEntry.slug).next).toBeNull();
  });

  it("content is non-empty for all entries", () => {
    DOC_ENTRIES.forEach((d) => expect(d.content.length).toBeGreaterThan(0));
  });

  it("all hub entries use hub- slug prefix", () => {
    const hubEntries = DOC_ENTRIES.filter((d) => d.section === "specrails-hub");
    expect(hubEntries).toHaveLength(9);
    hubEntries.forEach((d) => expect(d.slug).toMatch(/^hub-/));
  });

  it("all mcp entries use mcp- slug prefix", () => {
    const mcpEntries = DOC_ENTRIES.filter((d) => d.section === "specrails-mcp");
    expect(mcpEntries).toHaveLength(3);
    mcpEntries.forEach((d) => expect(d.slug).toMatch(/^mcp-/));
  });

  it("getDocBySlug returns hub entries", () => {
    expect(getDocBySlug("hub-getting-started")?.title).toBe("Getting Started");
    expect(getDocBySlug("hub-api-reference")?.title).toBe("API Reference");
  });

  it("getDocBySlug returns mcp entries", () => {
    expect(getDocBySlug("mcp-getting-started")?.title).toBe("Getting Started");
    expect(getDocBySlug("mcp-overview")?.title).toBe("Overview");
    expect(getDocBySlug("mcp-tools-reference")?.title).toBe("Tools Reference");
  });

  it("existing core doc slugs are unchanged", () => {
    const coreSlugs = [
      "",
      "getting-started",
      "concepts",
      "agents",
      "cli-reference",
      "deployment",
    ];
    coreSlugs.forEach((slug) => expect(getDocBySlug(slug)).toBeDefined());
  });

  it("has per-platform getting started guides for core", () => {
    expect(getDocBySlug("getting-started")).toBeDefined();
    expect(getDocBySlug("codex-getting-started")).toBeDefined();
  });

  it("has per-platform getting started guides for hub", () => {
    expect(getDocBySlug("hub-getting-started-claude")).toBeDefined();
    expect(getDocBySlug("hub-getting-started-codex")).toBeDefined();
  });

  it("sections are product-grouped", () => {
    const sections = [...new Set(DOC_ENTRIES.map((d) => d.section))];
    expect(sections).toEqual([
      "specrails-core",
      "specrails-hub",
      "specrails-mcp",
      "Playbooks",
      "Reference",
    ]);
  });
});
