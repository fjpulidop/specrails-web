import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("docs-registry", () => {
  it("has 19 entries", () => {
    expect(DOC_ENTRIES).toHaveLength(19);
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
    expect(getAdjacentDocs("deployment").next).toBeNull();
  });

  it("What is a Spec? is the first section entry (Concepts-first order)", () => {
    const { next } = getAdjacentDocs("");
    expect(next?.slug).toBe("what-is-a-spec");
  });

  it("content is non-empty for all entries", () => {
    DOC_ENTRIES.forEach((d) => expect(d.content.length).toBeGreaterThan(0));
  });
});
