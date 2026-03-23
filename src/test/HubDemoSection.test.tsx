import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HubDemoSection from "@/components/HubDemoSection";

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

// Mock ResizeObserver for recharts
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
});

afterEach(() => {
  vi.restoreAllMocks();
  observerCallback = null;
});

describe("HubDemoSection", () => {
  it("renders the section heading", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("specrails-hub")).toBeInTheDocument();
    expect(screen.getByText(/in Action/i)).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    const { container } = render(<HubDemoSection />);
    expect(container.querySelector("#hub-demo")).toBeInTheDocument();
  });

  it("renders project tabs", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("openclaw")).toBeInTheDocument();
    expect(screen.getByText("acme-api")).toBeInTheDocument();
  });

  it("renders pipeline stages", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("Architect")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Reviewer")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });

  it("renders command grid with Spec and Rails categories", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("Spec (Discovery)")).toBeInTheDocument();
    expect(screen.getByText("Rails (Delivery)")).toBeInTheDocument();
  });

  it("renders spec commands", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("explore")).toBeInTheDocument();
    expect(screen.getByText("ff")).toBeInTheDocument();
  });

  it("renders rails commands", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("implement")).toBeInTheDocument();
    expect(screen.getByText("ship")).toBeInTheDocument();
  });

  it("renders dashboard section headers", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("Pipeline Progress")).toBeInTheDocument();
    expect(screen.getByText("Command Grid")).toBeInTheDocument();
    expect(screen.getByText("Cost Analytics")).toBeInTheDocument();
    expect(screen.getByText("Project Health")).toBeInTheDocument();
  });

  it("renders the health score", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("renders the install CTA", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("npm install -g specrails-hub")).toBeInTheDocument();
  });

  it("renders the command palette button", () => {
    render(<HubDemoSection />);
    expect(screen.getByLabelText("Open command palette")).toBeInTheDocument();
  });

  it("switches project tabs on click", async () => {
    const user = userEvent.setup();
    render(<HubDemoSection />);

    const acmeTab = screen.getByText("acme-api");
    await user.click(acmeTab);

    // acme-api tab should now have active styling (border-bottom)
    expect(acmeTab.closest("button")).toHaveStyle({
      borderBottom: "2px solid hsl(var(--dracula-green))",
    });
  });

  it("renders analytics period buttons", () => {
    render(<HubDemoSection />);
    expect(screen.getByText("7d")).toBeInTheDocument();
    expect(screen.getByText("30d")).toBeInTheDocument();
    expect(screen.getByText("90d")).toBeInTheDocument();
  });

  it("renders the window chrome with localhost", () => {
    render(<HubDemoSection />);
    expect(screen.getByText(/localhost:4200/)).toBeInTheDocument();
  });

  it("renders the OpenClaw link", () => {
    render(<HubDemoSection />);
    const link = screen.getByText("OpenClaw");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/openclaw/openclaw",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
