import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

  it("renders the install command", () => {
    renderHero();
    expect(screen.getByText("npx specrails-core@latest init")).toBeInTheDocument();
  });

  it("renders the copy button with aria-label", () => {
    const { container } = renderHero();
    const btn = container.querySelector("button[aria-label='Copy install command']");
    expect(btn).toBeInTheDocument();
  });

  it("renders 'No account required' text", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("No account required");
  });

  it("renders Star on GitHub button", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Star on GitHub");
  });

  it("renders Read the docs link", () => {
    const { container } = renderHero();
    const links = container.querySelectorAll("a");
    const docsLink = Array.from(links).find(
      (a) => a.getAttribute("href") === "/docs"
    );
    expect(docsLink).toBeDefined();
    expect(docsLink?.textContent).toContain("Read the docs");
  });

  it("renders both terminal previews (npx and git clone)", () => {
    const { container } = renderHero();
    expect(container.textContent).toContain("Option A");
    expect(container.textContent).toContain("Option B");
  });

  it("renders the canvas element for particle background", () => {
    const { container } = renderHero();
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  // --- Copy button interaction ---

  it("shows 'Copy' text by default on copy button", () => {
    const { container } = renderHero();
    const btn = container.querySelector("button[aria-label='Copy install command']");
    expect(btn?.textContent).toContain("Copy");
  });

  it("shows 'Copied!' after clicking copy button when clipboard is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const { container } = renderHero();
    const btn = container.querySelector("button[aria-label='Copy install command']")!;

    await act(async () => {
      fireEvent.click(btn);
    });

    expect(writeText).toHaveBeenCalledWith("npx specrails-core@latest init");
    expect(btn.textContent).toContain("Copied!");
  });

  it("handles clipboard error gracefully", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("Not allowed")),
      },
    });

    const { container } = renderHero();
    const btn = container.querySelector("button[aria-label='Copy install command']")!;

    await act(async () => {
      fireEvent.click(btn);
      // Wait for the rejected promise to settle
      await new Promise((r) => setTimeout(r, 0));
    });

    // Should still show "Copy" (not "Copied!")
    expect(btn.textContent).toContain("Copy");
  });
});
