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

  it("renders all four dashboard sections (Spec, Rails, Jobs, Health)", () => {
    renderDashboard();
    expect(screen.getByTestId("section-spec")).toBeInTheDocument();
    expect(screen.getByTestId("section-rails")).toBeInTheDocument();
    expect(screen.getByTestId("section-jobs")).toBeInTheDocument();
    expect(screen.getByTestId("section-health")).toBeInTheDocument();
  });

  it("renders health score indicator", () => {
    renderDashboard();
    const healthSection = screen.getByTestId("section-health");
    expect(within(healthSection).getAllByText("87").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Discovery commands in Spec section", () => {
    renderDashboard();
    expect(screen.getByText("Custom-Propose")).toBeInTheDocument();
    expect(screen.getByText("Auto-propose")).toBeInTheDocument();
  });

  it("renders Delivery commands in Rails section", () => {
    renderDashboard();
    expect(screen.getByText("Implement")).toBeInTheDocument();
    expect(screen.getByText("Batch Implement")).toBeInTheDocument();
  });

  it("renders recent jobs in Jobs section", () => {
    renderDashboard();
    const jobsSection = screen.getByTestId("section-jobs");
    expect(within(jobsSection).getAllByText(/\/sr:implement/).length).toBeGreaterThanOrEqual(1);
    expect(within(jobsSection).getByText("/sr:propose-spec")).toBeInTheDocument();
  });

  it("collapses a section when toggle is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const specToggle = screen.getByTestId("toggle-spec");
    expect(screen.getByTestId("content-spec")).toBeInTheDocument();

    await user.click(specToggle);
    expect(screen.queryByTestId("content-spec")).not.toBeInTheDocument();
  });

  it("re-expands a section when toggle is clicked again", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const specToggle = screen.getByTestId("toggle-spec");
    await user.click(specToggle);
    expect(screen.queryByTestId("content-spec")).not.toBeInTheDocument();

    await user.click(specToggle);
    expect(screen.getByTestId("content-spec")).toBeInTheDocument();
  });

  it("renders Others collapsible in Rails section", () => {
    renderDashboard();
    // 8 commands total, 3 discovery in Spec, so Rails = 2 delivery + 3 others = 5
    // Others group shows the 3 non-discovery/non-delivery commands
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
