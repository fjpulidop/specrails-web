import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";

// ---------- Canvas mock ----------
const mockCtx = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillStyle: "",
  strokeStyle: "",
};

function applyCanvasMock() {
  HTMLCanvasElement.prototype.getContext = vi.fn(
    () => mockCtx as unknown as CanvasRenderingContext2D
  );
}

beforeAll(() => {
  applyCanvasMock();
});

// ---------- ResizeObserver mock ----------

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    vi.fn((cb: ResizeObserverCallback) => ({
      observe: vi.fn((el: Element) => {
        Object.defineProperty(el, "clientWidth", { value: 800, configurable: true });
        Object.defineProperty(el, "clientHeight", { value: 600, configurable: true });
        cb([{ target: el } as ResizeObserverEntry], {} as ResizeObserver);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  applyCanvasMock();
});

// ---------- helpers ----------

function makeQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function renderHero() {
  return render(
    <QueryClientProvider client={makeQueryClient()}>
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// ---------- tests ----------

describe("HeroSection", () => {
  it("renders the section with id hero", { timeout: 15000 }, () => {
    const { container } = renderHero();
    expect(container.querySelector("section#hero")).toBeInTheDocument();
  });

  it("renders the logo text", () => {
    const { container } = renderHero();
    const logo = container.querySelector("[data-logo='hero']");
    expect(logo).toBeInTheDocument();
    expect(logo?.textContent).toContain("specrails");
  });

  it("renders the open source badge", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Open Source");
  });

  it("renders the tagline", () => {
    renderHero();
    expect(screen.getByText(/your ai development team/i)).toBeInTheDocument();
    // "From Idea to Production Code" appears in both tagline and supporting line
    expect(screen.getAllByText(/from idea to production code/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the supporting description", () => {
    renderHero();
    expect(screen.getAllByText(/specrails-core/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/specrails-hub/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the tabbed terminal", () => {
    renderHero();
    expect(screen.getByTestId("tabbed-terminal")).toBeInTheDocument();
  });

  it("renders both install tabs", () => {
    renderHero();
    expect(screen.getByTestId("tab-quick")).toBeInTheDocument();
    expect(screen.getByTestId("tab-full")).toBeInTheDocument();
  });

  it("renders tab labels for Quick Setup and Full Setup", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Quick Setup");
    expect(container.textContent).toContain("Full Setup");
  });

  it("renders the canvas element for particle background", () => {
    const { container } = renderHero();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("renders 'Get started' text", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Get started");
  });

  // --- Tab interaction ---

  it("shows Quick Setup tab as active by default", () => {
    renderHero();
    const quickTab = screen.getByTestId("tab-quick");
    expect(quickTab.getAttribute("aria-selected")).toBe("true");
  });

  it("switches to Full Setup tab when clicked", () => {
    renderHero();
    const fullTab = screen.getByTestId("tab-full");
    fireEvent.click(fullTab);
    expect(fullTab.getAttribute("aria-selected")).toBe("true");
  });

  it("renders the GitHub stars button", () => {
    renderHero();
    expect(screen.getByText("Star on GitHub")).toBeInTheDocument();
  });

  it("renders product switcher with core and hub buttons", () => {
    renderHero();
    expect(screen.getByTestId("product-core")).toBeInTheDocument();
    expect(screen.getByTestId("product-hub")).toBeInTheDocument();
  });

  it("shows hub terminal tabs after switching to hub product", async () => {
    renderHero();
    fireEvent.click(screen.getByTestId("product-hub"));
    await waitFor(() => {
      expect(screen.getByTestId("tab-install")).toBeInTheDocument();
      expect(screen.getByTestId("tab-add-project")).toBeInTheDocument();
    });
  });
});
