import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("playbook registry entries", () => {
  it("has 24 total entries in DOC_ENTRIES", () => {
    expect(DOC_ENTRIES).toHaveLength(24);
  });

  it("getDocBySlug returns a result for each playbook slug", () => {
    expect(getDocBySlug("playbook-product-discovery")).toBeDefined();
    expect(getDocBySlug("playbook-parallel-dev")).toBeDefined();
    expect(getDocBySlug("playbook-oss-maintainer")).toBeDefined();
  });

  it("playbook-product-discovery prev is the updating entry", () => {
    const { prev } = getAdjacentDocs("playbook-product-discovery");
    expect(prev?.slug).toBe("updating");
  });

  it("playbook-oss-maintainer next entry is changelog", () => {
    const { next } = getAdjacentDocs("playbook-oss-maintainer");
    expect(next?.slug).toBe("changelog");
  });

  it("deployment next entry is hub-getting-started", () => {
    const { next } = getAdjacentDocs("deployment");
    expect(next?.slug).toBe("hub-getting-started");
  });

  it("all playbook entries have section set to Playbook", () => {
    const playbookEntries = DOC_ENTRIES.filter((e) => e.section === "Playbook");
    expect(playbookEntries).toHaveLength(3);
  });
});
