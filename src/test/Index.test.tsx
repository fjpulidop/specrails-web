import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";

// jsdom stubs required by child components (recharts, canvas, IntersectionObserver)
let observerCb: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) { observerCb = cb; }
  observe(el: Element) {
    observerCb?.([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
  unobserve() {}
  disconnect() {}
}
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
  // canvas stub for HeroSection particles
  HTMLCanvasElement.prototype.getContext = (() => null) as never;
});
afterEach(() => {
  vi.restoreAllMocks();
  observerCb = null;
});

function makeQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function renderIndex(hash = "") {
  return render(
    <QueryClientProvider client={makeQueryClient()}>
      <MemoryRouter initialEntries={[`/${hash}`]}>
        <Index />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Index page", () => {
  it("renders without crashing", () => {
    expect(() => renderIndex()).not.toThrow();
  });

  it("renders the Navbar", () => {
    renderIndex();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
  });

  it("renders the SectionNav with all expected section ids", () => {
    renderIndex();
    // SectionNav renders two buttons (up/down) when sectionIds is non-empty
    expect(
      screen.getByRole("button", { name: /previous section/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next section/i })
    ).toBeInTheDocument();
  });

  it("contains elements with section ids", () => {
    renderIndex();
    const sections = document.querySelectorAll("section, [id]");
    expect(sections.length).toBeGreaterThan(0);
  });
});
