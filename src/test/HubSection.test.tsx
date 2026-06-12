import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HubSection from "@/components/HubSection";

function renderHubSection() {
  return render(
    <MemoryRouter>
      <HubSection />
    </MemoryRouter>
  );
}

describe("HubSection", () => {
  it("renders the section with id hub", () => {
    const { container } = renderHubSection();
    const section = container.querySelector("section#hub");
    expect(section).toBeInTheDocument();
  });

  it("renders the headline", () => {
    renderHubSection();
    expect(screen.getByText(/your ai team/i)).toBeInTheDocument();
    expect(screen.getByText(/at a glance/i)).toBeInTheDocument();
  });

  it("renders specrails-core and specrails-desktop comparison cards", () => {
    renderHubSection();
    expect(screen.getByText("specrails-core")).toBeInTheDocument();
    expect(screen.getAllByText("specrails-desktop").length).toBeGreaterThanOrEqual(1);
  });

  it("renders all four mock task items", () => {
    renderHubSection();
    expect(screen.getByText("feat: add auth middleware")).toBeInTheDocument();
    expect(screen.getByText("write API docs")).toBeInTheDocument();
    expect(screen.getByText("fix payment edge case")).toBeInTheDocument();
    expect(screen.getByText("deploy to staging")).toBeInTheDocument();
  });

  it("renders the learn more link", () => {
    renderHubSection();
    const link = screen.getByRole("link", { name: /learn more about specrails-desktop/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/docs/hub");
  });

  it("renders the mock dashboard browser chrome", () => {
    renderHubSection();
    expect(screen.getByText(/localhost:4288/)).toBeInTheDocument();
  });

  it("renders the sidebar nav items", () => {
    renderHubSection();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("Agents")).toBeInTheDocument();
  });
});
