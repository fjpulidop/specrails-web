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

  it("gives every code block a copy button", () => {
    renderWithRouter(
      <MarkdownRenderer content={"```bash\nnpx specrails-core@latest init\n```"} />
    );
    expect(
      screen.getByRole("button", { name: /copy code/i })
    ).toBeInTheDocument();
  });

  it("renders a [!NOTE] blockquote as a callout card", () => {
    renderWithRouter(
      <MarkdownRenderer content={"> [!NOTE]\n> Specs run locally."} />
    );
    expect(screen.getByText("Note")).toBeInTheDocument();
    expect(screen.getByText(/specs run locally/i)).toBeInTheDocument();
    // No raw marker should leak into the output.
    expect(screen.queryByText(/\[!NOTE\]/)).not.toBeInTheDocument();
  });

  it("renders a [!WARNING] blockquote as a warning callout", () => {
    renderWithRouter(
      <MarkdownRenderer content={"> [!WARNING]\n> This blocks the PR."} />
    );
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("leaves a plain blockquote untouched", () => {
    renderWithRouter(<MarkdownRenderer content={"> just a quote"} />);
    expect(screen.queryByText("Note")).not.toBeInTheDocument();
    expect(screen.getByText(/just a quote/i)).toBeInTheDocument();
  });

  it("adds anchor ids to headings (rehype-slug)", () => {
    renderWithRouter(<MarkdownRenderer content={"## Getting Started"} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.id).toBe("getting-started");
  });
});
