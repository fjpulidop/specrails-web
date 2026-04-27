import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
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
    () => mockCtx as unknown as CanvasRenderingContext2D,
  );
}

beforeAll(() => {
  applyCanvasMock();
});

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
    })),
  );
  vi.stubGlobal(
    "matchMedia",
    vi.fn((q: string) => ({
      matches: q.includes("min-width: 1024px"),
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.reject(new Error("network error in test"))),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  applyCanvasMock();
});

function renderHero() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("HeroSection", () => {
  it("renders the hero section with id hero", () => {
    const { container } = renderHero();
    expect(container.querySelector("section#hero")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    renderHero();
    expect(screen.getByText(/your agentic development team/i)).toBeInTheDocument();
    expect(screen.getAllByText(/from idea to production code/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Download CTA", () => {
    const { container } = renderHero();
    expect(container.textContent?.toLowerCase()).toContain("download");
  });

  it("renders the View on GitHub CTA", () => {
    renderHero();
    expect(screen.getByText(/view on github/i)).toBeInTheDocument();
  });

  it("renders the version pill mentioning supported platforms", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("macOS, Windows x64 & ARM64");
  });

  it("renders the Core text link", () => {
    renderHero();
    expect(screen.getByText(/prefer the cli/i)).toBeInTheDocument();
  });

  it("does not render any ProductSwitcher or TabbedTerminal", () => {
    const { container } = renderHero();
    expect(container.querySelector("[data-testid='product-core']")).toBeNull();
    expect(container.querySelector("[data-testid='product-hub']")).toBeNull();
    expect(container.querySelector("[data-testid='tabbed-terminal']")).toBeNull();
  });

  it("has no element with id hub-showcase", () => {
    const { container } = renderHero();
    expect(container.querySelector("#hub-showcase")).toBeNull();
  });

  it("renders a canvas for the particle background", () => {
    const { container } = renderHero();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
