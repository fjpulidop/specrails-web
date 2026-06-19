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
  save: vi.fn(),
  restore: vi.fn(),
  setTransform: vi.fn(),
  fillStyle: "",
  strokeStyle: "",
  lineWidth: 0,
  lineCap: "",
  globalAlpha: 1,
  shadowColor: "",
  shadowBlur: 0,
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

  it("renders the new headline", () => {
    renderHero();
    // New H1: "Describe it. / A team of agents ships it." (br between the two sentences)
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/describe it/i);
    expect(heading).toHaveTextContent(/a team of agents ships it/i);
  });

  it("renders the subhead describing the agentic pipeline", () => {
    renderHero();
    expect(screen.getByText(/agentic software development system/i)).toBeInTheDocument();
  });

  it("renders the Download CTA for the detected platform", () => {
    renderHero();
    // The primary CTA exposes a stable aria-label regardless of manifest state.
    const downloadCta = screen.getByRole("link", {
      name: /download specrails \(desktop\) for/i,
    });
    expect(downloadCta).toBeInTheDocument();
  });

  it("renders the See how it works CTA", () => {
    renderHero();
    const demoCta = screen.getByRole("link", { name: /see how it works/i });
    expect(demoCta).toBeInTheDocument();
    expect(demoCta).toHaveAttribute("href", "#pipeline");
  });

  it("renders the npx CLI command in the hero", () => {
    renderHero();
    expect(screen.getByText(/npx specrails-core@latest init/i)).toBeInTheDocument();
  });

  it("renders the trust row with platform and license info", () => {
    renderHero();
    expect(screen.getByText(/macOS & Windows/i)).toBeInTheDocument();
    expect(screen.getByText(/MIT licensed/i)).toBeInTheDocument();
  });

  it("renders the eyebrow trust badge", () => {
    renderHero();
    expect(
      screen.getByText(/MIT · Local-first · Open source/i),
    ).toBeInTheDocument();
  });

  it("renders Star on GitHub buttons for both repos", () => {
    renderHero();
    // One star button per product card (Desktop + Core).
    const githubLinks = screen.getAllByRole("link", { name: /star .* on github/i });
    const hrefs = githubLinks.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/fjpulidop/specrails-core");
    expect(hrefs).toContain("https://github.com/fjpulidop/specrails-desktop");
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

  it("renders the static brand glow (no animated canvas background)", () => {
    const { container } = renderHero();
    expect(container.querySelector("canvas")).toBeNull();
    expect(container.querySelector(".hero-glow")).toBeInTheDocument();
  });
});
