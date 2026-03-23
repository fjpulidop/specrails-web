import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import McpSection from "@/components/McpSection";

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

describe("McpSection", () => {
  it("renders the section heading", () => {
    render(<McpSection />);
    expect(screen.getAllByText("specrails-mcp").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Connect specrails with any AI/)).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    const { container } = render(<McpSection />);
    expect(container.querySelector("#mcp")).toBeInTheDocument();
  });

  it("renders the connectivity diagram with all clients", () => {
    render(<McpSection />);
    expect(screen.getByText("Claude Code")).toBeInTheDocument();
    expect(screen.getByText("Cursor")).toBeInTheDocument();
    expect(screen.getByText("Windsurf")).toBeInTheDocument();
    expect(screen.getByText("Claude Desktop")).toBeInTheDocument();
    expect(screen.getByText("Any MCP client")).toBeInTheDocument();
  });

  it("renders all 6 resource cards", () => {
    render(<McpSection />);
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`mcp-purple-${i}`)).toBeInTheDocument();
    }
  });

  it("renders all 6 tool cards", () => {
    render(<McpSection />);
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`mcp-cyan-${i}`)).toBeInTheDocument();
    }
  });

  it("renders resource names", () => {
    render(<McpSection />);
    expect(screen.getByText("Specs")).toBeInTheDocument();
    expect(screen.getByText("Agents config")).toBeInTheDocument();
    expect(screen.getByText("Memory")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders tool names", () => {
    render(<McpSection />);
    expect(screen.getByText("doctor")).toBeInTheDocument();
    expect(screen.getByText("hub_status")).toBeInTheDocument();
    expect(screen.getByText("list_projects")).toBeInTheDocument();
    expect(screen.getByText("get_jobs")).toBeInTheDocument();
    expect(screen.getByText("get_analytics")).toBeInTheDocument();
    expect(screen.getByText("enqueue_job")).toBeInTheDocument();
  });

  it("renders the column headers", () => {
    render(<McpSection />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
    expect(screen.getByText("(read)")).toBeInTheDocument();
    expect(screen.getByText("(actions)")).toBeInTheDocument();
  });

  it("renders the install CTA with correct command", () => {
    render(<McpSection />);
    expect(screen.getByText("npm install -g specrails-mcp")).toBeInTheDocument();
  });

  it("renders the copy button", () => {
    render(<McpSection />);
    expect(screen.getByLabelText("Copy install command")).toBeInTheDocument();
  });

  it("renders the badge label", () => {
    render(<McpSection />);
    expect(screen.getByText("Universal Connection")).toBeInTheDocument();
  });
});
