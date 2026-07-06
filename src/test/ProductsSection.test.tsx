import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

const renderSection = () =>
  render(
    <MemoryRouter>
      <ProductsSection />
    </MemoryRouter>,
  );

describe("ProductsSection", () => {
  it("renders section with id product", () => {
    const { container } = renderSection();
    expect(container.querySelector("section#product")).toBeInTheDocument();
  });

  it("renders the Specrails modes heading", () => {
    renderSection();
    expect(screen.getByText(/Specrails has two modes/i)).toBeInTheDocument();
    expect(screen.getByText(/Mission Control comes first/i)).toBeInTheDocument();
  });

  it("renders Mission Control as the primary mode", () => {
    renderSection();
    expect(screen.getByText("Primary mode")).toBeInTheDocument();
    expect(screen.getAllByText("Mission Control").length).toBeGreaterThan(0);
    expect(screen.getByText(/Direct MCP control over specs, rails, loops/i)).toBeInTheDocument();
  });

  it("renders Specrails Board as the manual mode", () => {
    renderSection();
    expect(screen.getByText("Manual mode")).toBeInTheDocument();
    expect(screen.getAllByText("Specrails Board").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Human-operated specs and rails/i).length).toBeGreaterThan(0);
  });

  it("renders local-first and runtime product details", () => {
    renderSection();
    expect(screen.getByText("Local-first")).toBeInTheDocument();
    expect(screen.getByText("Bundled runtime")).toBeInTheDocument();
    expect(screen.getByText(/No account system, no cloud workspace/i)).toBeInTheDocument();
  });

  it("renders CTAs linking to download and docs", () => {
    renderSection();
    const downloadCta = screen.getByRole("link", { name: /download specrails/i });
    expect(downloadCta).toHaveAttribute("href", "/download");

    const docsCta = screen.getByRole("link", { name: /docs/i });
    expect(docsCta).toHaveAttribute("href", "/docs/getting-started");
  });

  it("renders the Board video expand control", () => {
    renderSection();
    expect(screen.getByRole("button", { name: /expand video/i })).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Real Specrails Board flow creating a spec/i),
    ).toBeInTheDocument();
  });
});
