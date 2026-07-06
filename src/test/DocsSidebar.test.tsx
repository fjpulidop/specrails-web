import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { DocsSidebar } from "@/components/DocsSidebar";
import { DOCS } from "@/lib/docs-registry";

function renderSidebar(
  initialPath = "/docs",
  onNavigate?: () => void
) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <DocsSidebar onNavigate={onNavigate} />
    </MemoryRouter>
  );
}

describe("DocsSidebar", () => {
  it("renders a nav element", () => {
    renderSidebar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders a link for every doc entry", () => {
    renderSidebar();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(DOCS.length);
  });

  it("marks the active doc entry as active (border style)", () => {
    renderSidebar("/docs/agents-meet-the-agents");
    const agentsLink = screen.getByRole("link", { name: /meet the agents/i });
    expect(agentsLink.className).toMatch(/border-brand-cyan/);
  });

  it("non-active entries do not have active border style", () => {
    renderSidebar("/docs/agents-meet-the-agents");
    const links = screen.getAllByRole("link");
    const inactive = links.filter(
      (l) => !l.className.includes("border-brand-cyan")
    );
    expect(inactive.length).toBeGreaterThan(0);
  });

  it("calls onNavigate when a link is clicked", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    renderSidebar("/docs", onNavigate);
    const links = screen.getAllByRole("link");
    await user.click(links[0]);
    expect(onNavigate).toHaveBeenCalledOnce();
  });

  it("renders section headers for entries with a section field", () => {
    renderSidebar();
    expect(screen.getByText("Getting started")).toBeInTheDocument();
    expect(screen.getByText("Specs")).toBeInTheDocument();
  });
});
