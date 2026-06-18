import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AgentsPage from "@/pages/AgentsPage";
import { AGENTS } from "@/data/agents";

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
    expect(h1.textContent).toMatch(/meet the team/i);
  });

  it("renders the subtitle describing all agents", () => {
    renderAgentsPage();
    // The hero subtitle leads with the agent count (derived from data).
    expect(
      screen.getByText(
        new RegExp(`${AGENTS.length} specialized AI agents`, "i")
      )
    ).toBeInTheDocument();
  });

  it("defaults to the roster view with both tabs available", () => {
    renderAgentsPage();
    // Two views are offered via tabs; the roster ("Meet the team") is the default.
    expect(
      screen.getByRole("tab", { name: /meet the team/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /compact view/i })
    ).toBeInTheDocument();
  });

  it("renders the agent comparison matrix table in the compact view", async () => {
    const user = userEvent.setup();
    renderAgentsPage();

    // The matrix lives behind the "Compact view" tab — switch to it first.
    await user.click(screen.getByRole("tab", { name: /compact view/i }));

    // AgentComparisonMatrix renders a table with a header row + one row per agent.
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows.length).toBe(AGENTS.length + 1);

    // The table column headers describe the comparison dimensions.
    expect(
      within(table).getByRole("columnheader", { name: /primary job/i })
    ).toBeInTheDocument();
    // A known agent name appears as a row inside the table.
    expect(within(table).getByText("Security Reviewer")).toBeInTheDocument();
  });

  it("renders the navbar", () => {
    renderAgentsPage();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
  });
});
