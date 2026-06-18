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
  it("renders the documentation header heading", () => {
    renderDocsIndex();
    // Branded header band: the h1 carries the headline; "Documentation" is the eyebrow.
    expect(
      screen.getByRole("heading", { level: 1, name: /specrails/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });

  it("renders the Core section", () => {
    renderDocsIndex();
    expect(screen.getByText("Core")).toBeInTheDocument();
  });

  it("renders the Playbooks section when playbook entries exist", () => {
    const hasPlaybooks = DOC_ENTRIES.some((e) => e.section === "Playbook");
    if (!hasPlaybooks) return;
    renderDocsIndex();
    expect(screen.getByText("Playbooks")).toBeInTheDocument();
  });

  it("renders a link for each non-index core entry", () => {
    renderDocsIndex();
    const coreEntries = DOC_ENTRIES.filter((e) => e.slug !== "" && !e.section);
    const links = screen.getAllByRole("link");
    // Each core entry and each playbook entry gets a link
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
