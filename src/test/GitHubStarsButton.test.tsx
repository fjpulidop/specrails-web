import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GitHubStarsButton } from "@/components/GitHubStarsButton";

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
}

function renderButton() {
  return render(
    <QueryClientProvider client={makeQueryClient()}>
      <GitHubStarsButton />
    </QueryClientProvider>,
  );
}

describe("GitHubStarsButton", () => {
  it("renders the Star on GitHub text", () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ stargazers_count: 42 }) });
    renderButton();
    expect(screen.getByText("Star on GitHub")).toBeInTheDocument();
  });

  it("renders star count when data is available (< 1000)", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ stargazers_count: 42 }),
    });
    renderButton();

    await waitFor(() => {
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });

  it("renders formatted star count when >= 1000", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ stargazers_count: 2500 }),
    });
    renderButton();

    await waitFor(() => {
      expect(screen.getByText("2.5k")).toBeInTheDocument();
    });
  });

  it("does not render star count when fetch fails", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });
    renderButton();

    // Wait for query to settle
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    // No star count badge should appear
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument();
  });

  it("links to the correct GitHub repo", () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ stargazers_count: 0 }) });
    renderButton();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://github.com/fjpulidop/specrails");
  });
});
