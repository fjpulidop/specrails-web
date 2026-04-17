import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CorePage from "@/pages/CorePage";

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
  it("renders the banner identifying specrails-core", () => {
    renderCore();
    expect(screen.getAllByText(/specrails-core/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/the cli behind specrails-hub/i)).toBeInTheDocument();
  });

  it("renders the install block with quick and full setup commands", () => {
    renderCore();
    expect(screen.getByText(/quick setup/i)).toBeInTheDocument();
    expect(screen.getByText(/full setup/i)).toBeInTheDocument();
    expect(screen.getAllByText(/npx specrails-core@latest init/).length).toBeGreaterThan(0);
  });

  it("renders the architecture pillars (Agents, Pipeline, Rails)", () => {
    renderCore();
    expect(screen.getAllByText(/^agents$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^pipeline$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^rails$/i).length).toBeGreaterThan(0);
  });

  it("renders the agents catalog teaser with a link to /agents", () => {
    renderCore();
    const agentsLink = screen
      .getAllByRole("link")
      .find((el) => el.getAttribute("href") === "/agents");
    expect(agentsLink).toBeDefined();
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
      .find((el) =>
        el.getAttribute("href") === "https://github.com/fjpulidop/specrails-core",
      );
    expect(githubLink).toBeDefined();
  });

  it("renders the back-to-Hub link pointing at /", () => {
    renderCore();
    const backLink = screen
      .getAllByRole("link")
      .find((el) => el.getAttribute("href") === "/");
    expect(backLink).toBeDefined();
  });
});
