import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

function renderNotFound(path = "/unknown") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NotFound />
    </MemoryRouter>
  );
}

describe("NotFound", () => {
  it("renders 404 heading", () => {
    renderNotFound();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders page not found message", () => {
    renderNotFound();
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
  });

  it("renders a link back to home", () => {
    renderNotFound();
    const link = screen.getByRole("link", { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("logs 404 error to console", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderNotFound("/bad-route");
    expect(spy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/bad-route"
    );
    spy.mockRestore();
  });
});
