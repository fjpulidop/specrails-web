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

  it("renders a link for internal .md links (core default)", () => {
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

  describe("hub product context", () => {
    it("transforms hub-relative links to hub-* slugs", () => {
      renderWithRouter(
        <MarkdownRenderer product="hub" content="[Features](../product/features.md)" />
      );
      const link = screen.getByRole("link", { name: "Features" });
      expect(link).toHaveAttribute("href", "/docs/hub-features");
    });

    it("transforms same-directory hub links", () => {
      renderWithRouter(
        <MarkdownRenderer product="hub" content="[Overview](platform-overview.md)" />
      );
      const link = screen.getByRole("link", { name: "Overview" });
      expect(link).toHaveAttribute("href", "/docs/hub-platform-overview");
    });

    it("falls back to plain slug for unknown filenames", () => {
      renderWithRouter(
        <MarkdownRenderer product="hub" content="[Core Concepts](concepts.md)" />
      );
      const link = screen.getByRole("link", { name: "Core Concepts" });
      expect(link).toHaveAttribute("href", "/docs/concepts");
    });
  });

  describe("mcp product context", () => {
    it("transforms mcp-relative links to mcp-* slugs", () => {
      renderWithRouter(
        <MarkdownRenderer product="mcp" content="[Getting Started](getting-started.md)" />
      );
      const link = screen.getByRole("link", { name: "Getting Started" });
      expect(link).toHaveAttribute("href", "/docs/mcp-getting-started");
    });
  });

  it("passes anchors through unchanged", () => {
    renderWithRouter(
      <MarkdownRenderer content="[Section](#installation)" />
    );
    const link = screen.getByRole("link", { name: "Section" });
    expect(link).toHaveAttribute("href", "#installation");
  });
});
