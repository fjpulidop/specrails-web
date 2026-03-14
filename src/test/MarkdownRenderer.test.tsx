import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("MarkdownRenderer", () => {
  it("renders heading from markdown", () => {
    renderWithRouter(<MarkdownRenderer content="# Hello" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello"
    );
  });

  it("renders a link for internal .md links", () => {
    renderWithRouter(<MarkdownRenderer content="[Agents](agents.md)" />);
    const link = screen.getByRole("link", { name: "Agents" });
    expect(link).toHaveAttribute("href", "/docs/agents");
  });

  it("renders external links with target blank", () => {
    renderWithRouter(
      <MarkdownRenderer content="[GitHub](https://github.com)" />
    );
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("target", "_blank");
  });
});
