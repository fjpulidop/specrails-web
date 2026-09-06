import { describe, it, expect } from "vitest";
import {
  getDocs,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";
import { LANGUAGE_IDS } from "@/lib/i18n";

describe("localized guide registry entries", () => {
  it("has the same guide count in every supported language", () => {
    for (const language of LANGUAGE_IDS) {
      expect(getDocs(language), language).toHaveLength(37);
    }
  });

  it("getDocBySlug returns a result for core guide slugs", () => {
    expect(getDocBySlug("getting-started")).toBeDefined();
    expect(getDocBySlug("specs-specs-and-the-backlog")).toBeDefined();
    expect(getDocBySlug("pipeline-the-loop-builder")).toBeDefined();
  });

  it("keeps adjacent docs inside the guide order", () => {
    const { prev, next } = getAdjacentDocs("specs-specs-and-the-backlog");
    expect(prev?.slug).toBe("missions-mission-windows");
    expect(next?.slug).toBe("specs-add-spec-quick-mode");
  });

  it("localizes section names", () => {
    expect(getDocBySlug("integrations-ai-providers", "es")?.section).toBe("Integraciones");
  });

  it("does not expose legacy playbook slugs", () => {
    expect(getDocBySlug("playbook-product-discovery")).toBeUndefined();
  });
});
