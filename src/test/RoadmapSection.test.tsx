import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

/** Mock both fetch calls (core + hub repos) */
function mockBothRepos(
  coreIssues: unknown[] = [],
  hubIssues: unknown[] = []
) {
  fetchMock.mockImplementation((url: string) => {
    const issues = url.includes("specrails-hub") ? hubIssues : coreIssues;
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(issues),
    });
  });
}

function mockBothReposError() {
  fetchMock.mockImplementation(() =>
    Promise.reject(new Error("network error"))
  );
}

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
    mockBothRepos();
    const { container } = renderRoadmap();
    expect(container.querySelector("section#roadmap")).toBeInTheDocument();
  });

  it("renders the heading", async () => {
    mockBothRepos();
    renderRoadmap();
    expect(screen.getByText("Roadmap")).toBeInTheDocument();
  });

  it("renders GitHub Issues subtitle", async () => {
    mockBothRepos();
    renderRoadmap();
    expect(screen.getByText(/live from github issues/i)).toBeInTheDocument();
  });

  // --- Filter buttons ---

  it("renders filter buttons for All, Core, Hub", async () => {
    mockBothRepos();
    renderRoadmap();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Core" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hub" })).toBeInTheDocument();
  });

  // --- Loading state ---

  it("shows a spinner while loading", () => {
    fetchMock.mockImplementation(() => new Promise(() => {}));
    const { container } = renderRoadmap();
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  // --- Error state ---

  it("shows error message when fetch fails", async () => {
    mockBothReposError();
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/could not load issues right now/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error on 429 rate limit", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({ ok: false, status: 429, json: () => Promise.resolve({}) })
    );
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/could not load issues right now/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error on non-ok response", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) })
    );
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/could not load issues right now/i)
      ).toBeInTheDocument();
    });
  });

  // --- Empty issues ---

  it("shows all caught up message when no issues exist", async () => {
    mockBothRepos([], []);
    renderRoadmap();

    await waitFor(() => {
      expect(
        screen.getByText(/no open issues — all caught up/i)
      ).toBeInTheDocument();
    });
  });

  // --- Issues rendered ---

  it("renders issue cards from both repos", async () => {
    mockBothRepos(
      [fakeIssue({ id: 1, number: 42, title: "Core feature" })],
      [fakeIssue({ id: 2, number: 10, title: "Hub feature", html_url: "https://github.com/fjpulidop/specrails-hub/issues/10" })]
    );
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("Core feature")).toBeInTheDocument();
      expect(screen.getByText("Hub feature")).toBeInTheDocument();
    });
  });

  it("renders product badges on issue cards", async () => {
    mockBothRepos(
      [fakeIssue({ id: 1, number: 42, title: "Core issue" })],
      [fakeIssue({ id: 2, number: 10, title: "Hub issue", html_url: "https://github.com/fjpulidop/specrails-hub/issues/10" })]
    );
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("Core issue")).toBeInTheDocument();
    });
    // Product badges
    const badges = screen.getAllByText(/^(Core|Hub)$/);
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it("renders issue labels with sanitized colors", async () => {
    mockBothRepos([
      fakeIssue({ labels: [{ name: "bug", color: "d73a4a" }] }),
    ]);
    renderRoadmap();

    await waitFor(() => {
      const label = screen.getByText("bug");
      expect(label).toBeInTheDocument();
      expect(label).toHaveStyle({ color: "#d73a4a" });
    });
  });

  it("uses fallback color for labels with invalid hex color", async () => {
    mockBothRepos([
      fakeIssue({ labels: [{ name: "invalid-label", color: "not-hex!" }] }),
    ]);
    renderRoadmap();

    await waitFor(() => {
      const label = screen.getByText("invalid-label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveStyle({ color: "#6e7681" });
    });
  });

  // --- Filters out pull requests ---

  it("filters out pull requests from the results", async () => {
    mockBothRepos([
      fakeIssue({ id: 1, number: 10, title: "Real issue" }),
      {
        ...fakeIssue({ id: 2, number: 11, title: "Pull request" }),
        pull_request: { url: "https://..." },
      },
    ]);
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("Real issue")).toBeInTheDocument();
    });
    expect(screen.queryByText("Pull request")).not.toBeInTheDocument();
  });

  // --- Filter interaction ---

  it("filters issues by product when clicking filter buttons", async () => {
    const user = userEvent.setup();
    mockBothRepos(
      [fakeIssue({ id: 1, number: 42, title: "Core only issue" })],
      [fakeIssue({ id: 2, number: 10, title: "Hub only issue", html_url: "https://github.com/fjpulidop/specrails-hub/issues/10" })]
    );
    renderRoadmap();

    await waitFor(() => {
      expect(screen.getByText("Core only issue")).toBeInTheDocument();
      expect(screen.getByText("Hub only issue")).toBeInTheDocument();
    });

    // Filter to Core only
    await user.click(screen.getByRole("button", { name: "Core" }));
    expect(screen.getByText("Core only issue")).toBeInTheDocument();
    expect(screen.queryByText("Hub only issue")).not.toBeInTheDocument();

    // Filter to Hub only
    await user.click(screen.getByRole("button", { name: "Hub" }));
    expect(screen.queryByText("Core only issue")).not.toBeInTheDocument();
    expect(screen.getByText("Hub only issue")).toBeInTheDocument();

    // Back to All
    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Core only issue")).toBeInTheDocument();
    expect(screen.getByText("Hub only issue")).toBeInTheDocument();
  });
});
