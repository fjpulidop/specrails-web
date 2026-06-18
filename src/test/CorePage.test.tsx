import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CorePage from "@/pages/CorePage";
import { AGENTS } from "@/data/agents";

afterEach(() => {
  vi.restoreAllMocks();
});

function renderCore() {
  return render(
    <MemoryRouter initialEntries={["/core"]}>
      <CorePage />
    </MemoryRouter>,
  );
}

describe("CorePage", () => {
  it("renders the hero identifying specrails-core as the open-source CLI", () => {
    renderCore();
    // The CLI brand surfaces on the page (hero copy, headings, CTAs).
    expect(screen.getAllByText(/specrails-core/i).length).toBeGreaterThan(0);
    // New hero eyebrow + headline replace the old "the CLI behind specrails-desktop" banner.
    expect(screen.getByText(/open-source cli/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /put your repo on spec-driven rails/i }),
    ).toBeInTheDocument();
  });

  it("renders the copyable install command", () => {
    renderCore();
    // The page now ships a single install command shown in the hero terminal
    // and the closing CTA (the old quick/full split is gone).
    const installs = screen.getAllByText(/npx specrails-core@latest init/);
    expect(installs.length).toBeGreaterThan(0);
    // The hero terminal is present with its copy affordance.
    expect(
      screen.getAllByRole("button", { name: /copy install command/i }).length,
    ).toBeGreaterThan(0);
  });

  it("renders the architecture pillars (agents, pipeline, rails)", () => {
    renderCore();
    expect(
      screen.getByRole("heading", { name: /specialised agents/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /phased pipeline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /parallel rails/i }),
    ).toBeInTheDocument();
  });

  it("renders the agents roster teaser with a link to /agents", () => {
    renderCore();
    const agentsLink = screen
      .getAllByRole("link")
      .find((el) => el.getAttribute("href") === "/agents");
    expect(agentsLink).toBeDefined();
    // The teaser reflects the real roster size and renders every agent.
    expect(
      screen.getByRole("heading", {
        name: new RegExp(`${AGENTS.length} agents`, "i"),
      }),
    ).toBeInTheDocument();
    for (const agent of AGENTS) {
      expect(
        screen.getByRole("heading", { name: agent.name }),
      ).toBeInTheDocument();
    }
  });

  it("renders the integrations cards (CI, pre-commit, cron)", () => {
    renderCore();
    expect(screen.getByText(/^ci$/i)).toBeInTheDocument();
    expect(screen.getByText(/^pre-commit$/i)).toBeInTheDocument();
    expect(screen.getByText(/^cron$/i)).toBeInTheDocument();
  });

  it("renders the GitHub CTA pointing at specrails-core", () => {
    renderCore();
    const githubLink = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("href") ===
          "https://github.com/fjpulidop/specrails-core",
      );
    expect(githubLink).toBeDefined();
  });

  it("renders a link over to specrails-desktop", () => {
    renderCore();
    // The Hub cross-sell now lives in the closing CTA and points at /download.
    const hubLink = screen.getByRole("link", {
      name: /get specrails-desktop/i,
    });
    expect(hubLink).toHaveAttribute("href", "/download");
  });
});
