import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DocsLayout from "@/pages/DocsLayout";

function renderDocsLayout() {
  return render(
    <MemoryRouter initialEntries={["/docs"]}>
      <Routes>
        <Route path="/docs" element={<DocsLayout />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("DocsLayout", () => {
  it("renders the navbar", () => {
    renderDocsLayout();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
  });

  it("renders the desktop sidebar", () => {
    renderDocsLayout();
    // DocsSidebar renders inside <aside>
    expect(document.querySelector("aside")).toBeInTheDocument();
  });

  it("renders a mobile menu button", () => {
    renderDocsLayout();
    // The mobile hamburger is the only button in main content area (not in Navbar)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("opens mobile sidebar when menu button is clicked", async () => {
    const user = userEvent.setup();
    renderDocsLayout();
    // The first button in the layout is the mobile hamburger Menu button
    await user.click(screen.getByRole("button", {name:"Browse the guide"}));
    expect(screen.getByRole("dialog", {name:"Documentation"})).toBeInTheDocument();
    // After click, at least one navigation element should be present
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThanOrEqual(1);
  });

  it("renders an <Outlet /> placeholder (main content area)", () => {
    renderDocsLayout();
    expect(document.querySelector("main")).toBeInTheDocument();
  });
});
