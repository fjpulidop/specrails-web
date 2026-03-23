import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import EcosystemSection from "@/components/EcosystemSection";

// ---------- IntersectionObserver that triggers isVisible=true ----------

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

describe("EcosystemSection", () => {
  it("renders the section heading", () => {
    render(<EcosystemSection />);
    expect(screen.getByText(/One ecosystem/i)).toBeInTheDocument();
    expect(screen.getByText(/One control center/i)).toBeInTheDocument();
  });

  it("renders all three product cards", () => {
    render(<EcosystemSection />);
    expect(screen.getByTestId("ecosystem-specrails-core")).toBeInTheDocument();
    expect(screen.getByTestId("ecosystem-specrails-hub")).toBeInTheDocument();
    expect(screen.getByTestId("ecosystem-specrails-mcp")).toBeInTheDocument();
  });

  it("highlights Hub as recommended", () => {
    render(<EcosystemSection />);
    expect(screen.getByText(/\u2605 Recommended/)).toBeInTheDocument();
  });

  it("renders the ecosystem diagram with all three product names", () => {
    const { container } = render(<EcosystemSection />);
    const diagram = container.querySelector(".flex.items-center.justify-center.gap-2");
    expect(diagram).toBeInTheDocument();
    expect(diagram?.textContent).toContain("specrails-core");
    expect(diagram?.textContent).toContain("specrails-hub");
    expect(diagram?.textContent).toContain("specrails-mcp");
  });

  it("renders the footer guidance text", () => {
    render(<EcosystemSection />);
    expect(
      screen.getByText(/Start with/i),
    ).toBeInTheDocument();
  });

  it("renders subtitles for each product", () => {
    render(<EcosystemSection />);
    expect(screen.getByText("The Engine")).toBeInTheDocument();
    expect(screen.getByText("\u2605 The Control Center")).toBeInTheDocument();
    expect(screen.getByText("The Universal Connection")).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    const { container } = render(<EcosystemSection />);
    expect(container.querySelector("#ecosystem")).toBeInTheDocument();
  });
});
