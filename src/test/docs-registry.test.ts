import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("docs-registry", () => {
  it("has 24 entries (17 core/general + 7 hub)", () => {
    expect(DOC_ENTRIES).toHaveLength(24);
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
    expect(hubEntries).toHaveLength(7);
    hubEntries.forEach((d) => expect(d.slug).toMatch(/^hub-/));
  });

  it("getDocBySlug returns hub entries", () => {
    expect(getDocBySlug("hub-getting-started")?.title).toBe("Getting Started");
    expect(getDocBySlug("hub-api-reference")?.title).toBe("API Reference");
  });

  it("existing core doc slugs are unchanged", () => {
    const coreSlugs = [
      "",
      "getting-started",
      "concepts",
      "agents",
      "workflows",
      "cli-reference",
      "api-reference",
      "deployment",
    ];
    coreSlugs.forEach((slug) => expect(getDocBySlug(slug)).toBeDefined());
  });
});
