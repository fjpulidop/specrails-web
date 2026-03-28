import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders the Hub-first tagline", () => {
    renderHero();
    expect(screen.getByText(/your ai development team/i)).toBeInTheDocument();
    expect(screen.getByText(/one hub to rule them all/i)).toBeInTheDocument();
  });

  it("renders the supporting description mentioning Hub", () => {
    renderHero();
    expect(screen.getByText(/specrails-hub is your ai control center/i)).toBeInTheDocument();
  });

  it("renders the canvas element for particle background", () => {
    const { container } = renderHero();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("renders Dashboard badge", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Dashboard");
    expect(container.textContent).toContain("Multi-Project");
    expect(container.textContent).toContain("Analytics");
  });

  // --- Tabbed terminal ---

  it("renders the tabbed terminal component", () => {
    const { container } = renderHero();
    expect(container.querySelector("[data-testid='tabbed-terminal']")).toBeInTheDocument();
  });

  it("renders three installation tabs: Claude Code, Codex, Plugin", () => {
    const { container } = renderHero();
    expect(container.querySelector("[data-testid='tab-claude']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='tab-codex']")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='tab-plugin']")).toBeInTheDocument();
  });

  it("Claude Code tab is active by default", () => {
    const { container } = renderHero();
    const claudeTab = container.querySelector("[data-testid='tab-claude']");
    expect(claudeTab?.getAttribute("aria-selected")).toBe("true");
    const codexTab = container.querySelector("[data-testid='tab-codex']");
    expect(codexTab?.getAttribute("aria-selected")).toBe("false");
  });

  it("clicking Codex tab makes it active", () => {
    const { container } = renderHero();
    const codexTab = container.querySelector("[data-testid='tab-codex']")!;
    fireEvent.click(codexTab);
    expect(codexTab.getAttribute("aria-selected")).toBe("true");
    const claudeTab = container.querySelector("[data-testid='tab-claude']");
    expect(claudeTab?.getAttribute("aria-selected")).toBe("false");
  });

  it("clicking Plugin tab makes it active", () => {
    const { container } = renderHero();
    const pluginTab = container.querySelector("[data-testid='tab-plugin']")!;
    fireEvent.click(pluginTab);
    expect(pluginTab.getAttribute("aria-selected")).toBe("true");
  });

  it("renders get started label for tabbed terminal", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Get started");
  });

});
