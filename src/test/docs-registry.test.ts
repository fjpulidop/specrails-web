import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("docs-registry", () => {
  it("has 17 entries", () => {
    expect(DOC_ENTRIES).toHaveLength(17);
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
    expect(getAdjacentDocs("core-vs-hub").next).toBeNull();
  });

  it("content is non-empty for all entries", () => {
    DOC_ENTRIES.forEach((d) => expect(d.content.length).toBeGreaterThan(0));
  });
});
