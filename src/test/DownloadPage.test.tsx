import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DownloadPage from "@/pages/DownloadPage";

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((q: string) => ({
      matches: false,
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  // Force the manifest into its fallback path so download links still render.
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.reject(new Error("network error in test"))),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderPage() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <DownloadPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("DownloadPage", () => {
  it("renders the download heading", () => {
    renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.toLowerCase()).toContain("download");
    expect(h1.textContent?.toLowerCase()).toContain("specrails (desktop)");
  });

  it("renders all three platform cards", () => {
    renderPage();
    expect(screen.getAllByText("macOS").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Windows").length).toBeGreaterThanOrEqual(2);
  });

  it("renders per-platform download buttons", () => {
    renderPage();
    expect(
      screen.getAllByRole("link", { name: /download specrails \(desktop\) for/i }).length,
    ).toBe(3);
  });

  it("renders the Ko-fi support card", () => {
    renderPage();
    // The support card headline is unique to the DownloadPage SupportCard.
    expect(screen.getByText(/free, forever\./i)).toBeInTheDocument();
    expect(screen.getByText(/built by one developer\./i)).toBeInTheDocument();
    // A Ko-fi CTA link points at the Ko-fi donation page. Multiple links
    // labelled "Support on Ko-fi" exist (support card + footer), so assert at
    // least one resolves to the Ko-fi URL.
    const kofiLinks = screen.getAllByRole("link", { name: /support on ko-fi/i });
    expect(kofiLinks.length).toBeGreaterThanOrEqual(1);
    expect(
      kofiLinks.some((a) =>
        a.getAttribute("href")?.includes("ko-fi.com"),
      ),
    ).toBe(true);
  });

  it("renders the info cards", () => {
    renderPage();
    expect(screen.getByText(/open documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/join the discussion/i)).toBeInTheDocument();
    expect(screen.getByText(/browse the source/i)).toBeInTheDocument();
  });

  it("links back to home", () => {
    renderPage();
    const back = screen.getByText(/back to home/i).closest("a");
    expect(back).toHaveAttribute("href", "/");
  });
});
