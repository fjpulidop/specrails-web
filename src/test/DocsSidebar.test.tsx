import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { DocsSidebar } from "@/components/DocsSidebar";
import { DOC_ENTRIES } from "@/lib/docs-registry";

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
    expect(links).toHaveLength(DOC_ENTRIES.length);
  });

  it("marks the active doc entry as active (border style)", () => {
    renderSidebar("/docs/agents");
    const agentsLink = screen.getByRole("link", { name: /^agents$/i });
    expect(agentsLink.className).toMatch(/border-dracula-purple/);
  });

  it("non-active entries do not have active border style", () => {
    renderSidebar("/docs/agents");
    const links = screen.getAllByRole("link");
    const inactive = links.filter(
      (l) => !l.className.includes("border-dracula-purple")
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

  it("renders collapsible section groups", () => {
    renderSidebar();
    const buttons = screen.getAllByRole("button");
    // 5 sections: specrails-core, specrails-hub, specrails-mcp, Playbooks, Reference
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it("renders product section headers", () => {
    renderSidebar();
    expect(screen.getByText("specrails-core")).toBeInTheDocument();
    expect(screen.getByText("specrails-hub")).toBeInTheDocument();
    expect(screen.getByText("specrails-mcp")).toBeInTheDocument();
  });

  it("renders non-product section headers", () => {
    renderSidebar();
    expect(screen.getByText("Playbooks")).toBeInTheDocument();
    expect(screen.getByText("Reference")).toBeInTheDocument();
  });

  it("renders product color indicators for product sections", () => {
    renderSidebar();
    const coreHeader = screen.getByText("specrails-core");
    const coreDot = coreHeader.parentElement?.querySelector(
      "span.rounded-full"
    );
    expect(coreDot).toBeInTheDocument();

    const hubHeader = screen.getByText("specrails-hub");
    const hubDot = hubHeader.parentElement?.querySelector("span.rounded-full");
    expect(hubDot).toBeInTheDocument();

    const mcpHeader = screen.getByText("specrails-mcp");
    const mcpDot = mcpHeader.parentElement?.querySelector("span.rounded-full");
    expect(mcpDot).toBeInTheDocument();
  });

  it("does not render color indicators for non-product sections", () => {
    renderSidebar();
    const playbooksHeader = screen.getByText("Playbooks");
    const dot = playbooksHeader.parentElement?.querySelector(
      "span.rounded-full"
    );
    expect(dot).toBeNull();
  });
});
