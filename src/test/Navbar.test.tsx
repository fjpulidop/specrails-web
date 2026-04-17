import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.reject(new Error("network error in test"))),
  );
});
afterEach(() => {
  vi.restoreAllMocks();
});

function renderNavbar(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>,
  );
}

describe("Navbar", () => {
  it("renders the specrails logo", () => {
    renderNavbar();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
    expect(logo?.textContent).toContain("specrails");
  });

  it("renders a GitHub link pointing to specrails-hub", () => {
    renderNavbar();
    const githubLinks = screen.getAllByRole("link").filter((el) =>
      el.getAttribute("href")?.includes("github.com/fjpulidop/specrails-hub"),
    );
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("renders navigation anchors for main sections", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /pipeline/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /commands/i })).toBeInTheDocument();
  });

  it("renders a Core link to /core", () => {
    renderNavbar();
    const coreLinks = screen
      .getAllByRole("link", { name: /^core$/i })
      .filter((el) => el.getAttribute("href") === "/core");
    expect(coreLinks.length).toBeGreaterThan(0);
  });

  it("renders a Download entry", () => {
    renderNavbar();
    const downloadLinks = screen.getAllByRole("link", { name: /download/i });
    expect(downloadLinks.length).toBeGreaterThan(0);
  });

  it("does not render a Hub nav link pointing to #hub-showcase", () => {
    const { container } = renderNavbar();
    expect(container.querySelector('[href="/#hub-showcase"]')).toBeNull();
  });

  it("shows Docs link on mobile when not on a docs page", () => {
    renderNavbar("/");
    const docsLinks = screen.getAllByRole("link", { name: /docs/i });
    expect(docsLinks.length).toBeGreaterThan(0);
  });

  it("hides Docs mobile link on docs pages", () => {
    renderNavbar("/docs/agents");
    const allLinks = screen.queryAllByRole("link", { name: /^docs$/i });
    expect(allLinks).toHaveLength(0);
  });
});
