import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HubShowcase from "@/components/HubShowcase";

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe(el: Element) {
    observerCallback?.(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  // Default: demo manifest not found (placeholder shown)
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      headers: new Headers(),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  observerCallback = null;
});

describe("HubShowcase", () => {
  it("renders section with id hub-showcase", () => {
    const { container } = render(<HubShowcase />);
    expect(container.querySelector("section#hub-showcase")).toBeInTheDocument();
  });

  it("renders the heading and badge", () => {
    render(<HubShowcase />);
    expect(screen.getByText(/the control center/i)).toBeInTheDocument();
    expect(screen.getByText(/powered by specrails-hub/i)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HubShowcase />);
    expect(screen.getByText(/see your ai pipeline in action/i)).toBeInTheDocument();
  });

  it("renders toolbar navigation buttons", () => {
    render(<HubShowcase />);
    // Toolbar buttons have both icon + label; match exact text to avoid mobile dot collisions
    const buttons = screen.getAllByRole("button", { name: /dashboard/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    // All three toolbar nav buttons exist
    expect(screen.getAllByRole("button", { name: /analytics/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("button", { name: /activity/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("renders iframe when demo manifest exists", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
    } as Response);
    const { container } = render(<HubShowcase />);
    await waitFor(() => {
      const iframe = container.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", "/hub-demo/index.html");
    });
  });

  it("shows placeholder when demo is not available", async () => {
    render(<HubShowcase />);
    await waitFor(() => {
      expect(screen.getByText(/interactive demo coming soon/i)).toBeInTheDocument();
    });
  });

  it("renders fake browser chrome with localhost:4200", () => {
    render(<HubShowcase />);
    expect(screen.getByText("localhost:4200")).toBeInTheDocument();
  });

  it("highlights active toolbar button", () => {
    render(<HubShowcase />);
    // Find toolbar Dashboard button (the one with text content, not just aria-label)
    const dashboardBtns = screen.getAllByRole("button", { name: /dashboard/i });
    const toolbarBtn = dashboardBtns.find((btn) => btn.textContent?.includes("Dashboard"));
    expect(toolbarBtn).toBeDefined();
    expect(toolbarBtn!.className).toContain("text-dracula-purple");
  });

  it("switches active toolbar button on click", () => {
    render(<HubShowcase />);
    const analyticsBtns = screen.getAllByRole("button", { name: /analytics/i });
    const toolbarBtn = analyticsBtns.find((btn) => btn.textContent?.includes("Analytics"));
    expect(toolbarBtn).toBeDefined();
    fireEvent.click(toolbarBtn!);
    expect(toolbarBtn!.className).toContain("text-dracula-purple");
  });

  it("renders mobile desktop-only notice", () => {
    render(<HubShowcase />);
    expect(screen.getByText(/demo best viewed on desktop/i)).toBeInTheDocument();
    expect(screen.getByText(/requires a wider screen/i)).toBeInTheDocument();
  });
});
