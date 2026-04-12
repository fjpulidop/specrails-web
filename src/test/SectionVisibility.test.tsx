import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components under test
import AgentsSection from "@/components/AgentsSection";
import CliCompatibilitySection from "@/components/CliCompatibilitySection";
import PipelineSection from "@/components/PipelineSection";
import CommandsSection from "@/components/CommandsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import ProblemSection from "@/components/ProblemSection";
import DemoSection from "@/components/DemoSection";
import HubSection from "@/components/HubSection";
import FooterSection from "@/components/FooterSection";

// ---------- IntersectionObserver that triggers isVisible=true ----------

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe(el: Element) {
    // Immediately trigger with isIntersecting: true
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
  // fetch stub for RoadmapSection (rendered indirectly if needed)
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    }),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  observerCallback = null;
});

// ---------- helpers ----------

function makeQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function withProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={makeQueryClient()}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

// ---------- Visible-state tests ----------

describe("Section components in visible state (isVisible=true)", () => {
  it("AgentsSection renders with visible classes", () => {
    const { container } = withProviders(<AgentsSection />);
    const section = container.querySelector("section#agents")!;
    expect(section).toBeInTheDocument();
    // The heading should have the visible class
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
    expect(h2?.className).not.toContain("opacity-0");
  });

  it("AgentsSection renders all agent cards", () => {
    withProviders(<AgentsSection />);
    expect(screen.getByText("Compare all agents →")).toBeInTheDocument();
  });

  it("CliCompatibilitySection renders with visible classes", () => {
    const { container } = withProviders(<CliCompatibilitySection />);
    const section = container.querySelector("section#cli-compat")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("CliCompatibilitySection renders feature rows and Tick icons", () => {
    withProviders(<CliCompatibilitySection />);
    expect(screen.getByText("Installation via npx")).toBeInTheDocument();
    // All features are supported for both CLIs
    const supported = screen.getAllByLabelText("Supported");
    expect(supported.length).toBeGreaterThan(0);
  });

  it("PipelineSection renders with visible classes", () => {
    const { container } = withProviders(<PipelineSection />);
    const section = container.querySelector("section#pipeline")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("PipelineSection renders all phases", () => {
    withProviders(<PipelineSection />);
    expect(screen.getByText("Phase 0")).toBeInTheDocument();
    expect(screen.getByText("Phase 4")).toBeInTheDocument();
    expect(screen.getByText("Input")).toBeInTheDocument();
    expect(screen.getByText("Implementation")).toBeInTheDocument();
  });

  it("CommandsSection renders with visible classes", () => {
    const { container } = withProviders(<CommandsSection />);
    const section = container.querySelector("section#commands")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("CommandsSection renders all command cards", () => {
    withProviders(<CommandsSection />);
    expect(screen.getByText("/specrails:enrich")).toBeInTheDocument();
    expect(screen.getByText("/specrails:implement")).toBeInTheDocument();
    expect(screen.getByText("/specrails:batch-implement")).toBeInTheDocument();
    expect(screen.getByText("/specrails:get-backlog-specs")).toBeInTheDocument();
    expect(screen.getByText("/specrails:compat-check")).toBeInTheDocument();
    expect(screen.getByText("/specrails:why")).toBeInTheDocument();
  });

  it("FeaturesSection renders with visible classes", () => {
    const { container } = withProviders(<FeaturesSection />);
    const section = container.querySelector("section#features")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("FeaturesSection renders all feature cards", () => {
    withProviders(<FeaturesSection />);
    expect(screen.getByText("CLI Agnostic")).toBeInTheDocument();
    expect(screen.getByText("Value Proposition Canvas")).toBeInTheDocument();
    expect(screen.getByText("Security Gate")).toBeInTheDocument();
    expect(screen.getByText("Failure Learning Loop")).toBeInTheDocument();
  });

  it("PrinciplesSection renders with visible classes", () => {
    const { container } = withProviders(<PrinciplesSection />);
    const section = container.querySelector("section#principles")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("PrinciplesSection renders all principles", () => {
    withProviders(<PrinciplesSection />);
    expect(screen.getByText("Mandatory sequence")).toBeInTheDocument();
    expect(screen.getByText("Agent delegation")).toBeInTheDocument();
    expect(screen.getByText("Dry-run first")).toBeInTheDocument();
    expect(screen.getByText("Security as a gate")).toBeInTheDocument();
    expect(screen.getByText("Context over convention")).toBeInTheDocument();
  });

  it("ProblemSection renders with visible classes", () => {
    const { container } = withProviders(<ProblemSection />);
    const section = container.querySelector("section#problem")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("ProblemSection renders all problem cards", () => {
    withProviders(<ProblemSection />);
    expect(screen.getByText("No product direction")).toBeInTheDocument();
    expect(screen.getByText("No coordination")).toBeInTheDocument();
    expect(screen.getByText("No guaranteed quality")).toBeInTheDocument();
  });

  it("HubSection renders with visible classes", () => {
    const { container } = withProviders(<HubSection />);
    const section = container.querySelector("section#hub")!;
    expect(section).toBeInTheDocument();
    // The isVisible ternary is on wrapping divs, not h2
    const visibleDiv = section.querySelector(".opacity-100");
    expect(visibleDiv).toBeInTheDocument();
  });

  it("DemoSection renders with visible classes and starts animation", () => {
    const { container } = withProviders(<DemoSection />);
    const section = container.querySelector("section#demo")!;
    expect(section).toBeInTheDocument();
    const h2 = section.querySelector("h2");
    expect(h2?.className).toContain("opacity-100");
  });

  it("DemoSection renders terminal header", () => {
    withProviders(<DemoSection />);
    expect(screen.getByText(/specrails — \/specrails:implement/)).toBeInTheDocument();
  });

  it("FooterSection renders footer content", () => {
    withProviders(<FooterSection />);
    // Both Core and Hub columns have GitHub + Documentation links
    expect(screen.getAllByText("GitHub").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Documentation").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("MIT License")).toBeInTheDocument();
    // Section headings
    expect(screen.getByText("Core")).toBeInTheDocument();
    expect(screen.getByText("Hub")).toBeInTheDocument();
  });
});
