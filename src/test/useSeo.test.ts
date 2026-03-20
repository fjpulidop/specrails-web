import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSeo } from "@/hooks/useSeo";

const BASE_TITLE = "specrails — AI Coding Assistant for Dev Teams";
const BASE_DESC =
  "specrails is the AI coding assistant that turns Claude Code into your full dev team.";
const BASE_CANONICAL = "https://specrails.dev/";

beforeEach(() => {
  // Reset document state before each test
  document.title = "";

  let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = "";

  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = "";
});

describe("useSeo", () => {
  it("sets document.title", () => {
    renderHook(() =>
      useSeo({ title: BASE_TITLE, description: BASE_DESC, canonical: BASE_CANONICAL })
    );
    expect(document.title).toBe(BASE_TITLE);
  });

  it("sets meta description content", () => {
    renderHook(() =>
      useSeo({ title: BASE_TITLE, description: BASE_DESC, canonical: BASE_CANONICAL })
    );
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    expect(metaDesc?.content).toBe(BASE_DESC);
  });

  it("sets canonical link href", () => {
    renderHook(() =>
      useSeo({ title: BASE_TITLE, description: BASE_DESC, canonical: BASE_CANONICAL })
    );
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonicalLink?.href).toBe(BASE_CANONICAL);
  });

  it("updates all values when params change", () => {
    const { rerender } = renderHook(
      ({ title, description, canonical }) => useSeo({ title, description, canonical }),
      {
        initialProps: {
          title: BASE_TITLE,
          description: BASE_DESC,
          canonical: BASE_CANONICAL,
        },
      }
    );

    rerender({
      title: "Documentation — specrails",
      description: "Complete documentation for specrails.",
      canonical: "https://specrails.dev/docs",
    });

    expect(document.title).toBe("Documentation — specrails");
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    expect(metaDesc?.content).toBe("Complete documentation for specrails.");
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonicalLink?.href).toBe("https://specrails.dev/docs");
  });
});
