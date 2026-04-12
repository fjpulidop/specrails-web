import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FeaturesSection from "@/components/FeaturesSection";

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

describe("FeaturesSection", () => {
  it("renders section with id features", () => {
    const { container } = render(<FeaturesSection />);
    expect(container.querySelector("section#features")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<FeaturesSection />);
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("renders three tabs: Core, Hub, Together", () => {
    render(<FeaturesSection />);
    expect(screen.getByRole("tab", { name: "Core" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Hub" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Together" })).toBeInTheDocument();
  });

  it("Core tab is selected by default and shows core features", () => {
    render(<FeaturesSection />);
    const coreTab = screen.getByRole("tab", { name: "Core" });
    expect(coreTab).toHaveAttribute("data-state", "active");
    expect(screen.getByText("CLI Agnostic")).toBeInTheDocument();
    expect(screen.getByText("Security Gate")).toBeInTheDocument();
  });

  it("clicking Hub tab shows hub features", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    await user.click(screen.getByRole("tab", { name: "Hub" }));
    expect(screen.getByText("Multi-Project Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Streaming Logs")).toBeInTheDocument();
    expect(screen.getByText("Keyboard-First UX")).toBeInTheDocument();
  });

  it("clicking Together tab shows combined value cards", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    await user.click(screen.getByRole("tab", { name: "Together" }));
    expect(screen.getByText("Core Implements, Hub Visualizes")).toBeInTheDocument();
    expect(screen.getByText("Core Ships PRs, Hub Tracks Progress")).toBeInTheDocument();
  });

  it("tab state persists when switching back", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);

    // Switch to Hub
    await user.click(screen.getByRole("tab", { name: "Hub" }));
    expect(screen.getByText("Multi-Project Dashboard")).toBeInTheDocument();

    // Switch to Together
    await user.click(screen.getByRole("tab", { name: "Together" }));
    expect(screen.getByText("Core Implements, Hub Visualizes")).toBeInTheDocument();

    // Switch back to Core
    await user.click(screen.getByRole("tab", { name: "Core" }));
    expect(screen.getByText("CLI Agnostic")).toBeInTheDocument();
  });
});
