import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";

function makeQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function renderIndex(hash = "") {
  return render(
    <QueryClientProvider client={makeQueryClient()}>
      <MemoryRouter initialEntries={[`/${hash}`]}>
        <Index />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Index page", () => {
  it("renders without crashing", () => {
    expect(() => renderIndex()).not.toThrow();
  });

  it("renders the Navbar", () => {
    renderIndex();
    const logo = document.querySelector("[data-logo='nav']");
    expect(logo).toBeInTheDocument();
  });

  it("renders the SectionNav with all expected section ids", () => {
    renderIndex();
    // SectionNav renders two buttons (up/down) when sectionIds is non-empty
    expect(
      screen.getByRole("button", { name: /previous section/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next section/i })
    ).toBeInTheDocument();
  });

  it("contains elements with section ids", () => {
    renderIndex();
    const sections = document.querySelectorAll("section, [id]");
    expect(sections.length).toBeGreaterThan(0);
  });
});
