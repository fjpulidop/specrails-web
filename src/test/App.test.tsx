/**
 * App routing tests.
 *
 * We mock every page-level component with lightweight stubs so that
 * importing and rendering the *real* App module is fast, and the coverage
 * tool sees App.tsx as exercised.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

// --- Mock page modules BEFORE importing App ---

vi.mock("@/pages/Index", () => ({
  default: () => <div data-testid="page-index">Index</div>,
}));
vi.mock("@/pages/NotFound", () => ({
  default: () => <div data-testid="page-not-found">404</div>,
}));
vi.mock("@/pages/DocsLayout", () => ({
  default: () => <div data-testid="page-docs-layout">DocsLayout</div>,
}));
vi.mock("@/pages/DocPage", () => ({
  default: () => <div data-testid="page-doc">DocPage</div>,
}));
vi.mock("@/pages/DocsIndex", () => ({
  default: () => <div data-testid="page-docs-index">DocsIndex</div>,
}));
// Import App *after* mocks are in place
import App from "@/App";

describe("App", () => {
  afterEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("renders without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("renders the Index page at the default route", () => {
    render(<App />);
    expect(screen.getByTestId("page-index")).toBeInTheDocument();
  });

  it("sends legacy /core links to the guide section on Desktop's built-in engine", async () => {
    window.history.replaceState(null, "", "/core");
    render(<App />);
    expect(await screen.findByTestId("page-docs-layout")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/docs/getting-started");
    expect(window.location.hash).toBe("#core-is-built-into-desktop");
  });
});
