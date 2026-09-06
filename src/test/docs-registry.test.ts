import { describe, it, expect } from "vitest";
import {
  DOCS,
  docPathToSlug,
  getDocs,
  getDocBySlug,
  getAdjacentDocs,
  resolveDocHref,
  loadDocContent,
  searchDocs,
} from "@/lib/docs-registry";

describe("docs-registry", () => {
  it("has 37 English guide entries", () => {
    expect(DOCS).toHaveLength(37);
  });

  it("getDocBySlug returns correct entry", () => {
    expect(getDocBySlug("getting-started")?.title).toBe("What is Specrails");
  });

  it("getDocBySlug returns undefined for unknown slug", () => {
    expect(getDocBySlug("nonexistent")).toBeUndefined();
  });

  it("getAdjacentDocs: first entry has no prev", () => {
    expect(getAdjacentDocs("getting-started").prev).toBeNull();
  });

  it("getAdjacentDocs: last entry has no next", () => {
    expect(getAdjacentDocs("settings-where-your-data-lives").next).toBeNull();
  });

  it("Installing & first run follows the first getting started page", () => {
    const { next } = getAdjacentDocs("getting-started");
    expect(next?.slug).toBe("getting-started-installing-and-first-run");
  });

  it("keeps article bodies out of synchronous navigation metadata", () => {
    DOCS.forEach(doc => { expect(doc).not.toHaveProperty('content'); expect(doc.description.length).toBeGreaterThan(20); });
  });
  it("loads complete current English and Spanish guides on demand", async () => {
    for (const language of ['en','es'] as const) for (const doc of getDocs(language)) {
      expect(doc.isFallback).toBe(false);
      expect(await loadDocContent(doc)).toContain(`# ${doc.title}`);
    }
  });
  it("does not serve a stale translation as current", async () => {
    const doc = getDocBySlug('pipeline-the-loop-builder', 'fr')!;
    expect(doc).toMatchObject({language:'fr',contentLanguage:'en',isFallback:true});
    expect(await loadDocContent(doc)).toContain('Give every step a contract');
    for (const language of ['fr','de','pt','it','zh','ja'] as const) {
      for (const slug of ['getting-started','missions-first-mission','missions-review-and-delivery']) {
        const translated = getDocBySlug(slug, language)!;
        expect(translated.isFallback).toBe(false);
        expect(await loadDocContent(translated)).toContain(`# ${translated.title}`);
      }
    }
  });
  it("searches normalized localized titles, summaries and headings", () => {
    expect(searchDocs('MISION', 'es').some(doc => doc.slug === 'missions-first-mission')).toBe(true);
    expect(searchDocs('receipts', 'en').some(doc => doc.slug === 'missions-steering-and-receipts')).toBe(true);
    expect(searchDocs('processes')[0].title.toLowerCase()).toContain('processes');
    expect(searchDocs('unfindable-xyz')).toEqual([]);
    expect(searchDocs('  ', 'es')).toEqual(getDocs('es'));
  });

  it("returns localized entries", () => {
    const spanishDocs = getDocs("es");
    expect(spanishDocs).toHaveLength(37);
    expect(getDocBySlug("getting-started", "es")?.title).toBe("Qué es Specrails");
  });

  it("leaves non-doc links unchanged", () => {
    expect(resolveDocHref("https://example.com")).toBe("https://example.com");
    expect(resolveDocHref("#overview")).toBe("#overview");
    expect(resolveDocHref("mailto:hello@example.com")).toBe("mailto:hello@example.com");
    expect(resolveDocHref("/download")).toBe("/download");
  });

  it("resolves relative markdown links against the current doc category", () => {
    const currentDoc = { category: "getting-started", sourceSlug: "what-is-specrails" };

    expect(resolveDocHref("installing-and-first-run.md", currentDoc)).toBe(
      "/docs/getting-started-installing-and-first-run",
    );
    expect(resolveDocHref("installing-and-first-run.md#setup", currentDoc)).toBe(
      "/docs/getting-started-installing-and-first-run#setup",
    );
    expect(resolveDocHref("02-installing-and-first-run.md", currentDoc)).toBe(
      "/docs/getting-started-installing-and-first-run",
    );
  });

  it("resolves cross-section markdown links and keeps unknown links untouched", () => {
    const currentDoc = { category: "specs", sourceSlug: "specs-and-the-backlog" };

    expect(resolveDocHref("../pipeline/the-loop-builder.md", currentDoc)).toBe(
      "/docs/pipeline-the-loop-builder",
    );
    expect(resolveDocHref("not-a-real-doc.md", currentDoc)).toBe("not-a-real-doc.md");
  });

  it("converts source documentation paths to route slugs", () => {
    expect(docPathToSlug("./docs/guide/en/getting-started/01-what-is-specrails.md")).toBe(
      "getting-started",
    );
    expect(docPathToSlug("../docs/specs/01-specs-and-the-backlog.md")).toBe(
      "specs-specs-and-the-backlog",
    );
    expect(docPathToSlug("the-loop-builder.md")).toBe("pipeline-the-loop-builder");
  });
});
