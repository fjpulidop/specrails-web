import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductsSection from "@/components/ProductsSection";

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
});

afterEach(() => {
  vi.restoreAllMocks();
  observerCallback = null;
});

describe("ProductsSection", () => {
  it("renders section with id products", () => {
    const { container } = render(<ProductsSection />);
    expect(container.querySelector("section#products")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<ProductsSection />);
    expect(screen.getByText(/two products/i)).toBeInTheDocument();
    expect(screen.getByText(/one platform/i)).toBeInTheDocument();
  });

  it("renders Core card with tagline and capabilities", () => {
    render(<ProductsSection />);
    expect(screen.getByText("The Engine")).toBeInTheDocument();
    expect(screen.getByText("specrails-core")).toBeInTheDocument();
    expect(screen.getByText(/14 specialized ai agents/i)).toBeInTheDocument();
    expect(screen.getByText(/institutional memory/i)).toBeInTheDocument();
  });

  it("renders Hub card with tagline and capabilities", () => {
    render(<ProductsSection />);
    expect(screen.getByText("The Control Center")).toBeInTheDocument();
    expect(screen.getByText("specrails-hub")).toBeInTheDocument();
    expect(screen.getByText(/multi-project dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics & cost tracking/i)).toBeInTheDocument();
  });

  it("renders CTA buttons for both products", () => {
    render(<ProductsSection />);
    const coreCta = screen.getByText("Get Started with Core");
    const hubCta = screen.getByText("Explore the Hub");
    expect(coreCta.closest("a")).toHaveAttribute("href", "#hero");
    expect(hubCta.closest("a")).toHaveAttribute("href", "#hub-showcase");
  });

  it("renders with visible classes when intersecting", () => {
    const { container } = render(<ProductsSection />);
    const cards = container.querySelectorAll(".glass-card");
    expect(cards.length).toBe(2);
    cards.forEach((card) => {
      expect(card.className).toContain("opacity-100");
    });
  });
});
