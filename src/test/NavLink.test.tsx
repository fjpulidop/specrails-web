import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

function renderNavLink(
  props: { to: string; className?: string; activeClassName?: string; children: React.ReactNode },
  initialEntry = "/"
) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <NavLink {...props} />
    </MemoryRouter>
  );
}

describe("NavLink", () => {
  it("renders a link with the correct href", () => {
    renderNavLink({ to: "/about", children: "About" });
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies base className", () => {
    renderNavLink({ to: "/about", className: "base-class", children: "About" });
    const link = screen.getByRole("link", { name: "About" });
    expect(link.className).toContain("base-class");
  });

  it("applies activeClassName when route matches", () => {
    renderNavLink(
      { to: "/about", className: "base", activeClassName: "active", children: "About" },
      "/about"
    );
    const link = screen.getByRole("link", { name: "About" });
    expect(link.className).toContain("active");
  });

  it("does not apply activeClassName when route does not match", () => {
    renderNavLink(
      { to: "/about", className: "base", activeClassName: "active", children: "About" },
      "/other"
    );
    const link = screen.getByRole("link", { name: "About" });
    expect(link.className).not.toContain("active");
  });
});
