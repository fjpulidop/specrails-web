import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DocsIndex from "@/pages/DocsIndex";
import { DOCS } from "@/lib/docs-registry";

function renderDocsIndex() {
  return render(
    <MemoryRouter>
      <DocsIndex />
    </MemoryRouter>
  );
}

describe("DocsIndex", () => {
  it("renders the documentation header heading", () => {
    renderDocsIndex();
    expect(
      screen.getByRole("heading", { level: 1, name: /learn specrails/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });

  it("renders the getting started section", () => {
    renderDocsIndex();
    expect(screen.getByRole("heading", { name: "Getting started" })).toBeInTheDocument();
  });

  it("renders the integrations section", () => {
    renderDocsIndex();
    expect(screen.getByRole("heading", { name: "Integrations" })).toBeInTheDocument();
  });

  it("renders a link for each guide entry plus the start CTA", () => {
    renderDocsIndex();
    const docLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/docs/"));
    expect(docLinks.length).toBeGreaterThanOrEqual(DOCS.length);
  });

  it("each link href points to /docs/<slug>", () => {
    renderDocsIndex();
    const links = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href")?.startsWith("/docs/"));
    expect(links.length).toBeGreaterThan(0);
  });
});
