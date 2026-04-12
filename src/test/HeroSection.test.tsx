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

  it("renders the tagline", () => {
    renderHero();
    expect(screen.getByText(/your ai development team/i)).toBeInTheDocument();
    expect(screen.getByText(/from idea to production code/i)).toBeInTheDocument();
  });

  it("renders the supporting description", () => {
    renderHero();
    expect(screen.getByText(/12 specialized agents/i)).toBeInTheDocument();
  });

  it("renders the tabbed terminal", () => {
    renderHero();
    expect(screen.getByTestId("tabbed-terminal")).toBeInTheDocument();
  });

  it("renders both install tabs", () => {
    renderHero();
    expect(screen.getByTestId("tab-claude")).toBeInTheDocument();
    expect(screen.getByTestId("tab-codex")).toBeInTheDocument();
  });

  it("renders tab labels for Claude Code CLI and Codex CLI", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Claude Code CLI");
    expect(container.textContent).toContain("Codex CLI");
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

  it("shows Claude Code CLI tab as active by default", () => {
    renderHero();
    const claudeTab = screen.getByTestId("tab-claude");
    expect(claudeTab.getAttribute("aria-selected")).toBe("true");
  });

  it("switches to Codex tab when clicked", () => {
    renderHero();
    const codexTab = screen.getByTestId("tab-codex");
    fireEvent.click(codexTab);
    expect(codexTab.getAttribute("aria-selected")).toBe("true");
  });

  it("renders the GitHub stars button", () => {
    renderHero();
    expect(screen.getByText("Star on GitHub")).toBeInTheDocument();
  });
});
