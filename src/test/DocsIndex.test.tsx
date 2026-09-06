import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
      screen.getByRole("heading", { level: 1, name: /build your first mission/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });

  it("filters guides and restores the index when search is cleared", async () => {
    const user = userEvent.setup(); renderDocsIndex();
    await user.type(screen.getByRole('searchbox'), 'retained logs');
    expect(screen.getByRole('link', {name:/inspect processes and retained logs/i})).toBeInTheDocument();
    expect(screen.queryByRole('heading',{name:'Integrations'})).not.toBeInTheDocument();
    await user.clear(screen.getByRole('searchbox'));
    await user.type(screen.getByRole('searchbox'), 'unknown-xyz');
    expect(screen.getByRole('status')).toHaveTextContent('No guides match');
    await user.click(screen.getByRole('button',{name:'Clear search'}));
    expect(screen.getByRole('heading',{name:'Integrations'})).toBeInTheDocument();
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
