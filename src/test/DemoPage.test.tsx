import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import DemoPage from "@/pages/DemoPage";

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

function renderPage() {
  return render(
    <MemoryRouter>
      <TooltipProvider>
        <DemoPage />
      </TooltipProvider>
    </MemoryRouter>
  );
}

describe("DemoPage", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByText(/in Action/i)).toBeInTheDocument();
    expect(screen.getAllByText(/specrails-hub/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the install CTA", () => {
    renderPage();
    expect(
      screen.getByText("npm install -g specrails-hub")
    ).toBeInTheDocument();
  });

  it("renders the preview disclaimer", () => {
    renderPage();
    expect(
      screen.getByText(/small preview of the dashboard/)
    ).toBeInTheDocument();
  });

  it("contains the HubDashboard component", () => {
    renderPage();
    expect(screen.getByTestId("section-spec")).toBeInTheDocument();
  });
});
