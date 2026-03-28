import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";

function renderNavbar(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  it("renders the specrails logo", () => {
    renderNavbar();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
    expect(logo?.textContent).toContain("specrails");
  });

  it("renders the GitHub link", () => {
    renderNavbar();
    const githubLinks = screen.getAllByRole("link").filter((el) =>
      el.getAttribute("href")?.includes("github")
    );
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("renders navigation anchors for main sections", () => {
    renderNavbar();
    // Pipeline, Features, Commands are rendered as anchor tags
    expect(screen.getByRole("link", { name: /pipeline/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /commands/i })).toBeInTheDocument();
  });

  it("shows Docs link on mobile when not on a docs page", () => {
    renderNavbar("/");
    // The mobile Docs link is rendered as a router Link
    const docsLinks = screen.getAllByRole("link", { name: /docs/i });
    expect(docsLinks.length).toBeGreaterThan(0);
  });

  it("hides Docs mobile link on docs pages", () => {
    renderNavbar("/docs/agents");
    // The conditional mobile "Docs" link should not appear when isDocsPage=true
    // The dropdown "Docs" button is still present from DocsDropdown (desktop)
    // but the standalone mobile <Link to="/docs"> should be absent
    const allLinks = screen.queryAllByRole("link", { name: /^docs$/i });
    // There should be no standalone Docs link (only the dropdown button remains)
    expect(allLinks).toHaveLength(0);
  });
});
