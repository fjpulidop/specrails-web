import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HubShowcaseSection from "@/components/HubShowcaseSection";

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

describe("HubShowcaseSection", () => {
  it("renders the section heading", () => {
    render(<HubShowcaseSection />);
    expect(screen.getByText("specrails-hub")).toBeInTheDocument();
    expect(screen.getByText(/Your AI Operations Center/i)).toBeInTheDocument();
  });

  it("renders all 8 feature cards", () => {
    render(<HubShowcaseSection />);
    for (let i = 0; i < 8; i++) {
      expect(screen.getByTestId(`hub-feature-${i}`)).toBeInTheDocument();
    }
  });

  it("renders feature titles", () => {
    render(<HubShowcaseSection />);
    expect(screen.getByText("Customizable Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Multi-Project Tabs")).toBeInTheDocument();
    expect(screen.getByText("Real-Time Pipeline")).toBeInTheDocument();
    expect(screen.getByText("Advanced Analytics")).toBeInTheDocument();
    expect(screen.getByText(/Command Grid/)).toBeInTheDocument();
    expect(screen.getByText("AI Chat")).toBeInTheDocument();
    expect(screen.getByText("Alerts & Budget")).toBeInTheDocument();
    expect(screen.getByText("Export & Shortcuts")).toBeInTheDocument();
  });

  it("renders the install command CTA", () => {
    render(<HubShowcaseSection />);
    expect(screen.getByText("npm install -g specrails-hub")).toBeInTheDocument();
    expect(screen.getByLabelText("Copy install command")).toBeInTheDocument();
  });

  it("renders the demo link", () => {
    render(<HubShowcaseSection />);
    expect(screen.getByText("See the interactive demo")).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    const { container } = render(<HubShowcaseSection />);
    expect(container.querySelector("#hub-showcase")).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<HubShowcaseSection />);
    expect(
      screen.getByText(/The star product of the specrails ecosystem/i),
    ).toBeInTheDocument();
  });
});
