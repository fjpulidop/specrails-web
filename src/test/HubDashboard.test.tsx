import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HubDashboard } from "@/components/hub/HubDashboard";

// Mock ResizeObserver for recharts
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderDashboard() {
  return render(
    <TooltipProvider>
      <HubDashboard />
    </TooltipProvider>
  );
}

describe("HubDashboard", () => {
  it("renders the window chrome with specrails-hub title", () => {
    renderDashboard();
    expect(screen.getByText(/specrails-hub/)).toBeInTheDocument();
  });

  it("renders project tabs for openclaw and acme-api", () => {
    renderDashboard();
    expect(screen.getByText("openclaw")).toBeInTheDocument();
    expect(screen.getByText("acme-api")).toBeInTheDocument();
  });

  it("renders all four dashboard sections", () => {
    renderDashboard();
    expect(screen.getByTestId("section-health")).toBeInTheDocument();
    expect(screen.getByTestId("section-pipeline")).toBeInTheDocument();
    expect(screen.getByTestId("section-commands")).toBeInTheDocument();
    expect(screen.getByTestId("section-analytics")).toBeInTheDocument();
  });

  it("renders health score indicator", () => {
    renderDashboard();
    const healthSection = screen.getByTestId("section-health");
    expect(within(healthSection).getAllByText("87").length).toBeGreaterThanOrEqual(1);
  });

  it("renders pipeline phase labels", () => {
    renderDashboard();
    expect(screen.getByText("Architect")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Reviewer")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });

  it("renders Discovery and Delivery command sections", () => {
    renderDashboard();
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();
  });

  it("renders command cards with names", () => {
    renderDashboard();
    expect(screen.getByText("Custom-Propose")).toBeInTheDocument();
    expect(screen.getByText("Implement")).toBeInTheDocument();
    expect(screen.getByText("Batch Implement")).toBeInTheDocument();
  });

  it("renders KPI cards in analytics section", () => {
    renderDashboard();
    expect(screen.getByText("Total Cost")).toBeInTheDocument();
    expect(screen.getByText("Total Jobs")).toBeInTheDocument();
    expect(screen.getByText("Success Rate")).toBeInTheDocument();
    expect(screen.getByText("Avg Duration")).toBeInTheDocument();
    expect(screen.getByText("Total Tokens")).toBeInTheDocument();
  });

  it("collapses a section when toggle is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const pipelineToggle = screen.getByTestId("toggle-pipeline");
    expect(screen.getByTestId("content-pipeline")).toBeInTheDocument();

    await user.click(pipelineToggle);
    expect(screen.queryByTestId("content-pipeline")).not.toBeInTheDocument();
  });

  it("re-expands a section when toggle is clicked again", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const pipelineToggle = screen.getByTestId("toggle-pipeline");
    await user.click(pipelineToggle);
    expect(screen.queryByTestId("content-pipeline")).not.toBeInTheDocument();

    await user.click(pipelineToggle);
    expect(screen.getByTestId("content-pipeline")).toBeInTheDocument();
  });

  it("renders the Others collapsible with correct count", () => {
    renderDashboard();
    // 8 commands total, 3 discovery + 2 delivery = 5, so 3 others
    expect(screen.getByText(/Others \(3\)/)).toBeInTheDocument();
  });

  it("expands Others section when clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    // Health Check should not be visible (it's in Others, collapsed)
    expect(screen.queryByText("Health Check")).not.toBeInTheDocument();

    await user.click(screen.getByText(/Others \(3\)/));
    expect(screen.getByText("Health Check")).toBeInTheDocument();
  });

  it("renders coverage bars in health section", () => {
    renderDashboard();
    expect(screen.getByText("82.1%")).toBeInTheDocument(); // Lines
    expect(screen.getByText("71.3%")).toBeInTheDocument(); // Functions
    expect(screen.getByText("64.8%")).toBeInTheDocument(); // Branches
  });

  it("renders recent commits", () => {
    renderDashboard();
    expect(screen.getByText("d9f67d7")).toBeInTheDocument();
    expect(screen.getByText("5754ffa")).toBeInTheDocument();
  });
});
