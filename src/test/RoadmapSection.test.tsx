import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import RoadmapSection from "@/components/RoadmapSection";

// ---------- helpers ----------

const fakeIssue = (overrides: Record<string, unknown> = {}) => ({
  id: 1,
  number: 42,
  title: "Add dark mode support",
  html_url: "https://github.com/fjpulidop/specrails-core/issues/42",
  labels: [{ name: "enhancement", color: "a2eeef" }],
  state: "open",
  created_at: "2025-01-01T00:00:00Z",
  ...overrides,
});

function renderRoadmap() {
  return render(<RoadmapSection />);
}

// ---------- mocks ----------

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------- tests ----------

describe("RoadmapSection", () => {
  it("renders section with id roadmap", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    });
    const { container } = renderRoadmap();
    expect(container.querySelector("section#roadmap")).toBeInTheDocument();
  });

  it("renders the heading", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    });
    renderRoadmap();
    expect(screen.getByText("Roadmap")).toBeInTheDocument();
  });

  it("renders GitHub Issues link in subtitle", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    });
    renderRoadmap();
    const link = screen.getByRole("link", { name: /github issues/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/fjpulidop/specrails-core/issues"
    );
  });

  // --- Loading state ---

  it("shows a spinner while loading", () => {
    // Never resolve the fetch — keeps loading=true
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    const { container } = renderRoadmap();
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  // --- Error state ---

  it("shows error message when fetch fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network error"));
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/could not load issues right now/i)
      ).toBeInTheDocument();
    });
    // Should show fallback link
    expect(
      screen.getByRole("link", { name: /view issues on github/i })
    ).toBeInTheDocument();
  });

  it("shows error on 429 rate limit", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: () => Promise.resolve({}),
    });
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/could not load issues right now/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error on non-ok response", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/could not load issues right now/i)
      ).toBeInTheDocument();
    });
  });

  // --- Empty issues ---

  it("shows all caught up message when no issues exist", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    });
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/no open issues — all caught up/i)
      ).toBeInTheDocument();
    });
  });

  // --- Issues rendered ---

  it("renders issue cards when issues are returned", async () => {
    const issues = [
      fakeIssue({ id: 1, number: 42, title: "Add dark mode support" }),
      fakeIssue({ id: 2, number: 43, title: "Fix CLI output" }),
    ];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(issues),
    });
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("Add dark mode support")).toBeInTheDocument();
      expect(screen.getByText("Fix CLI output")).toBeInTheDocument();
    });
  });

  it("renders issue numbers", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([fakeIssue({ id: 1, number: 42 })]),
    });
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("#42")).toBeInTheDocument();
    });
  });

  it("renders issue labels with sanitized colors", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([
          fakeIssue({
            labels: [{ name: "bug", color: "d73a4a" }],
          }),
        ]),
    });
    renderRoadmap();

    await waitFor(() => {
      const label = screen.getByText("bug");
      expect(label).toBeInTheDocument();
      // Valid hex color should be used
      expect(label).toHaveStyle({
        color: "#d73a4a",
      });
    });
  });

  it("uses fallback color for labels with invalid hex color", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([
          fakeIssue({
            labels: [{ name: "invalid-label", color: "not-hex!" }],
          }),
        ]),
    });
    renderRoadmap();

    await waitFor(() => {
      const label = screen.getByText("invalid-label");
      expect(label).toBeInTheDocument();
      // Fallback color 6e7681
      expect(label).toHaveStyle({
        color: "#6e7681",
      });
    });
  });

  // --- Filters out pull requests ---

  it("filters out pull requests from the results", async () => {
    const issues = [
      fakeIssue({ id: 1, number: 10, title: "Real issue" }),
      {
        ...fakeIssue({ id: 2, number: 11, title: "Pull request" }),
        pull_request: { url: "https://..." },
      },
    ];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(issues),
    });
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("Real issue")).toBeInTheDocument();
    });
    expect(screen.queryByText("Pull request")).not.toBeInTheDocument();
  });

  // --- "View all issues" footer link ---

  it("renders 'View all issues on GitHub' footer link", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    });
    renderRoadmap();

    await waitFor(() => {
      const links = screen.getAllByRole("link", {
        name: /view all issues on github/i,
      });
      expect(links.length).toBeGreaterThanOrEqual(1);
    });
  });
});
