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
  it("renders section with id products", () => {
    const { container } = renderSection();
    expect(container.querySelector("section#products")).toBeInTheDocument();
  });

  it("renders the updated section heading", () => {
    renderSection();
    expect(screen.getByText(/the ecosystem/i)).toBeInTheDocument();
    // H2: "specrails-desktop is mission control."
    // "mission control" also appears in the desktop product h3, so use getAllByText
    expect(screen.getAllByText(/mission control/i).length).toBeGreaterThan(0);
    // The gradient span in the H2 carries the full stop
    expect(screen.getByText(/mission control\./i)).toBeInTheDocument();
  });

  it("renders the Core product with name and engine subtitle", () => {
    renderSection();
    // specrails-core appears in both the mono label and the window chrome label
    expect(screen.getAllByText(/specrails-core/i).length).toBeGreaterThan(0);
    // h3 subtitle changed from "The open-source engine" to "the engine"
    expect(screen.getByText("the engine")).toBeInTheDocument();
    expect(screen.getByText(/spec-driven pipeline, idea → pr/i)).toBeInTheDocument();
    expect(screen.getByText(/parallel builds in git worktrees/i)).toBeInTheDocument();
  });

  it("renders the Desktop product with name and cockpit subtitle", () => {
    renderSection();
    // renamed display label appears in the sublabel and the window chrome label
    expect(screen.getAllByText(/Specrails \(Desktop\)/i).length).toBeGreaterThan(0);
    // h3 subtitle changed from "The local cockpit" to "mission control"
    expect(screen.getByText("mission control")).toBeInTheDocument();
    expect(screen.getByText(/drag specs onto parallel rails/i)).toBeInTheDocument();
    expect(screen.getByText(/track every ai cost, 100% local/i)).toBeInTheDocument();
  });

  it("renders the Companion product with name and 'your phone' subtitle", () => {
    renderSection();
    // renamed display label; appears in both the sublabel and the window chrome
    expect(screen.getAllByText("Specrails (Companion)").length).toBeGreaterThan(0);
    expect(screen.getByText("your phone")).toBeInTheDocument();
    // "WebRTC (DTLS)" appears in the capabilities list
    expect(screen.getAllByText(/WebRTC \(DTLS\)/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/never sees your data/i)).toBeInTheDocument();
  });

  it("renders CTAs linking to Core, download, and companion app", () => {
    renderSection();
    const coreCta = screen.getByRole("link", { name: /get the cli/i });
    expect(coreCta).toHaveAttribute("href", "/core");

    const downloadCta = screen.getByRole("link", { name: /download for desktop/i });
    expect(downloadCta).toHaveAttribute("href", "/download");

    const companionCta = screen.getByRole("link", { name: /open the companion/i });
    expect(companionCta).toHaveAttribute("href", "https://specrails.dev/companion-app");
  });

  it("renders both product frames with their window labels", () => {
    renderSection();
    expect(screen.getByText("zsh — specrails-core")).toBeInTheDocument();
    expect(screen.getByText("Specrails (Desktop) — local")).toBeInTheDocument();
    // companion frame now embeds the real app screenshot; window label renamed
    expect(screen.getAllByText("Specrails (Companion)").length).toBeGreaterThan(0);
  });
});
