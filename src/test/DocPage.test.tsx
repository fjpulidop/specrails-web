import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DocPage from "@/pages/DocPage";

function renderDocPage(slug?: string) {
  const path = slug ? `/docs/${slug}` : "/docs/agents";
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/docs" element={<DocPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("DocPage", () => {
  it("renders content for a valid slug", () => {
    renderDocPage("agents");
    // MarkdownRenderer renders the content — the page must have some text
    expect(document.body.textContent?.length).toBeGreaterThan(0);
  });

  it("shows 'Page not found' for an unknown slug", () => {
    renderDocPage("this-slug-does-not-exist");
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it("renders prev/next navigation links for non-boundary docs", () => {
    renderDocPage("agents");
    // Agents has a next entry; check for navigation nav
    const navs = document.querySelectorAll("nav");
    expect(navs.length).toBeGreaterThan(0);
  });

  it("renders Back to Documentation link on 404", () => {
    renderDocPage("zzz-unknown");
    expect(
      screen.getByRole("link", { name: /back to documentation/i })
    ).toBeInTheDocument();
  });

  it("does not render 'Page not found' for a valid slug", () => {
    renderDocPage("agents");
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });
});
