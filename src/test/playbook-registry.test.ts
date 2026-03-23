import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("playbook registry entries", () => {
  it("has 28 total entries in DOC_ENTRIES", () => {
    expect(DOC_ENTRIES).toHaveLength(28);
  });

  it("getDocBySlug returns a result for each playbook slug", () => {
    expect(getDocBySlug("playbook-product-discovery")).toBeDefined();
    expect(getDocBySlug("playbook-parallel-dev")).toBeDefined();
    expect(getDocBySlug("playbook-oss-maintainer")).toBeDefined();
  });

  it("playbook-product-discovery prev is the mcp-overview entry", () => {
    const { prev } = getAdjacentDocs("playbook-product-discovery");
    expect(prev?.slug).toBe("mcp-overview");
  });

  it("playbook-oss-maintainer next entry is changelog", () => {
    const { next } = getAdjacentDocs("playbook-oss-maintainer");
    expect(next?.slug).toBe("changelog");
  });

  it("changelog next entry is cli-reference", () => {
    const { next } = getAdjacentDocs("changelog");
    expect(next?.slug).toBe("cli-reference");
  });

  it("all playbook entries have section set to Playbooks", () => {
    const playbookEntries = DOC_ENTRIES.filter((e) => e.section === "Playbooks");
    expect(playbookEntries).toHaveLength(3);
  });
});
