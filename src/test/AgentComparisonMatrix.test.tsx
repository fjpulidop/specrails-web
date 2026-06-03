import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AgentComparisonMatrix from "@/components/AgentComparisonMatrix";
import { AGENTS } from "@/data/agents";

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("AgentComparisonMatrix", () => {
  it("renders all agents by default", () => {
    renderWithRouter(<AgentComparisonMatrix />);
    // one data row per agent + 1 header row
    expect(screen.getAllByRole("row")).toHaveLength(AGENTS.length + 1);
  });

  it("search by name filters results", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AgentComparisonMatrix />);
    const input = screen.getByRole("textbox");
    await user.type(input, "Security Reviewer");
    // Only the Security Reviewer row + header row should remain
    expect(screen.getAllByRole("row")).toHaveLength(2);
    // "Security Reviewer" appears in table row and mobile card (both rendered in jsdom)
    expect(screen.getAllByText("Security Reviewer").length).toBeGreaterThanOrEqual(1);
  });

  it("search by primaryJob filters results", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AgentComparisonMatrix />);
    const input = screen.getByRole("textbox");
    await user.type(input, "audit");
    // Product Analyst has "Audits spec-vs-code divergence" as primaryJob — should be visible
    const rows = screen.getAllByRole("row");
    // header + at least Product Analyst row
    expect(rows.length).toBeGreaterThanOrEqual(2);
    // The Product Analyst text should appear (in table cell and/or mobile card)
    expect(screen.getAllByText("Product Analyst").length).toBeGreaterThanOrEqual(1);
  });

  it("model filter narrows to correct agents", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AgentComparisonMatrix />);
    // Use keyboard to open the model select and select Opus
    const modelTrigger = screen.getByRole("combobox", { name: /model/i });
    await user.click(modelTrigger);
    // After opening, use keyboard to navigate to Opus option
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).toBeInTheDocument();
    });
    const opusOption = screen.getByRole("option", { name: "Opus" });
    await user.click(opusOption);
    // Opus agents: Product Manager only (Security Reviewer is now Sonnet) = 1 data row + 1 header = 2 rows
    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });
  });

  it("clear filters button appears when filter active and resets all agents", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AgentComparisonMatrix />);
    const input = screen.getByRole("textbox");
    await user.type(input, "arch");
    // Clear filters button should appear
    const clearBtn = screen.getByRole("button", { name: /clear filters/i });
    expect(clearBtn).toBeInTheDocument();
    await user.click(clearBtn);
    // All agents should be back
    expect(screen.getAllByRole("row")).toHaveLength(AGENTS.length + 1);
  });

  it("zero state shown when no agents match", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AgentComparisonMatrix />);
    const input = screen.getByRole("textbox");
    await user.type(input, "zzz");
    expect(screen.getByText("No agents match your filters.")).toBeInTheDocument();
  });
});
