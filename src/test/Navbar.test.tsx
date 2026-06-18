import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";

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

  it("renders a GitHub link pointing to specrails-desktop", () => {
    renderNavbar();
    const githubLinks = screen.getAllByRole("link").filter((el) =>
      el.getAttribute("href")?.includes("github.com/fjpulidop/specrails-desktop"),
    );
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("renders navigation anchors for main sections", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^why$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ecosystem/i })).toBeInTheDocument();
  });

  it("renders a Core link to /core", () => {
    renderNavbar();
    const coreLinks = screen
      .getAllByRole("link", { name: /^core$/i })
      .filter((el) => el.getAttribute("href") === "/core");
    expect(coreLinks.length).toBeGreaterThan(0);
  });

  it("does not render a Hub nav link pointing to #hub-showcase", () => {
    const { container } = renderNavbar();
    expect(container.querySelector('[href="/#hub-showcase"]')).toBeNull();
  });

  it("exposes a mobile hamburger that reveals the Docs link in the drawer", async () => {
    const user = userEvent.setup();
    renderNavbar("/");

    // Docs now lives inside the mobile Sheet drawer, not in the top bar.
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();

    await user.click(menuButton);

    const drawer = await screen.findByRole("dialog");
    const docsLink = within(drawer).getByRole("link", { name: /^docs$/i });
    expect(docsLink).toHaveAttribute("href", "/docs");
  });

  it("offers a Download CTA pointing to /download", () => {
    renderNavbar();
    const downloadLinks = screen
      .getAllByRole("link", { name: /download/i })
      .filter((el) => el.getAttribute("href") === "/download");
    expect(downloadLinks.length).toBeGreaterThan(0);
  });
});
