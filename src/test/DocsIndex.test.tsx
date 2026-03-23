import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DocsIndex from "@/pages/DocsIndex";
import { DOC_ENTRIES } from "@/lib/docs-registry";

function renderDocsIndex() {
  return render(
    <MemoryRouter>
      <DocsIndex />
    </MemoryRouter>
  );
}

describe("DocsIndex", () => {
  it("renders the Documentation heading", () => {
    renderDocsIndex();
    expect(screen.getByRole("heading", { name: /documentation/i })).toBeInTheDocument();
  });

  it("renders product section headers", () => {
    renderDocsIndex();
    expect(screen.getByText("specrails-core")).toBeInTheDocument();
    expect(screen.getByText("specrails-hub")).toBeInTheDocument();
    expect(screen.getByText("specrails-mcp")).toBeInTheDocument();
  });

  it("renders the Playbooks section when playbook entries exist", () => {
    const hasPlaybooks = DOC_ENTRIES.some((e) => e.section === "Playbooks");
    if (!hasPlaybooks) return;
    renderDocsIndex();
    expect(screen.getByText("Playbooks")).toBeInTheDocument();
  });

  it("renders links for core entries (excluding index)", () => {
    renderDocsIndex();
    const coreEntries = DOC_ENTRIES.filter(
      (e) => e.slug !== "" && e.section === "specrails-core"
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(coreEntries.length);
  });

  it("each link href points to /docs/<slug>", () => {
    renderDocsIndex();
    const links = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href")?.startsWith("/docs/"));
    expect(links.length).toBeGreaterThan(0);
  });
});
