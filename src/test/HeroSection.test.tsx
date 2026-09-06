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
    (contextId: string) => contextId === "2d" ? mockCtx as unknown as CanvasRenderingContext2D : null,
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
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
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/build with prompts/i);
    expect(heading).toHaveTextContent(/ship with specs/i);
  });

  it("renders the subhead describing Vibe Engineering", () => {
    renderHero();
    expect(screen.getByText(/turns vibe coding into Vibe Engineering/i)).toBeInTheDocument();
  });

  it("renders the Download CTA for the detected platform", () => {
    renderHero();
    const downloadCta = screen.getByRole("link", {
      name: /download specrails|preparing download/i,
    });
    expect(downloadCta).toBeInTheDocument();
    expect(downloadCta).toHaveAttribute(
      "href",
      expect.stringContaining("/downloads/specrails-desktop/latest/"),
    );
  });

  it("renders docs and product CTAs", () => {
    renderHero();
    const docs = screen.getByRole("link", { name: /read the docs/i });
    expect(docs).toHaveAttribute("href", "/docs");
    const product = screen.getByRole("link", { name: /product/i });
    expect(product).toHaveAttribute("href", "#product");
  });

  it("renders the trust row with platform and license info", () => {
    renderHero();
    expect(screen.getByText(/macOS & Windows/i)).toBeInTheDocument();
    expect(screen.getByText(/No accounts · local data/i)).toBeInTheDocument();
  });

  it("renders the eyebrow trust badge", () => {
    renderHero();
    expect(
      screen.getByText(/Local-first · Spec-driven · Mission Control/i),
    ).toBeInTheDocument();
  });

  it("renders provider chips", () => {
    renderHero();
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("Codex")).toBeInTheDocument();
    expect(screen.getByText("Gemini")).toBeInTheDocument();
  });

  it("renders Star on GitHub button for specrails-desktop", () => {
    renderHero();
    const githubLinks = screen.getAllByRole("link", { name: /star .* on github/i });
    const hrefs = githubLinks.map((l) => l.getAttribute("href"));
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
