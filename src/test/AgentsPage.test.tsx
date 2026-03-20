import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AgentsPage from "@/pages/AgentsPage";

function renderAgentsPage() {
  return render(
    <MemoryRouter>
      <AgentsPage />
    </MemoryRouter>
  );
}

describe("AgentsPage", () => {
  it("renders the page heading", () => {
    renderAgentsPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toMatch(/comparison matrix/i);
  });

  it("renders the subtitle describing all 12 agents", () => {
    renderAgentsPage();
    expect(screen.getByText(/12 specrails agents/i)).toBeInTheDocument();
  });

  it("renders the agent comparison matrix table", () => {
    renderAgentsPage();
    // AgentComparisonMatrix renders a table with header + 12 data rows
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThanOrEqual(13);
  });

  it("renders the navbar", () => {
    renderAgentsPage();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
  });
});
