import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableOfContents } from "@/components/TableOfContents";

function ProseFixture(): JSX.Element {
  return (
    <div className="docs-prose">
      <h2 id="installation">Installation</h2>
      <h3 id="prerequisites">Prerequisites</h3>
      <h2 id="usage">Usage</h2>
    </div>
  );
}

describe("TableOfContents", () => {
  it("lists the rendered h2/h3 headings as anchor links", async () => {
    render(
      <>
        <ProseFixture />
        <TableOfContents />
      </>,
    );

    expect(
      await screen.findByRole("link", { name: "Installation" }),
    ).toHaveAttribute("href", "#installation");
    expect(screen.getByRole("link", { name: "Prerequisites" })).toHaveAttribute(
      "href",
      "#prerequisites",
    );
    expect(screen.getByRole("link", { name: "Usage" })).toHaveAttribute(
      "href",
      "#usage",
    );
  });

  it("exposes an accessible 'On this page' navigation landmark", async () => {
    render(
      <>
        <ProseFixture />
        <TableOfContents />
      </>,
    );
    await screen.findByRole("link", { name: "Installation" });
    expect(
      screen.getByRole("navigation", { name: /on this page/i }),
    ).toBeInTheDocument();
  });

  it("renders nothing when there are no headings", () => {
    const { container } = render(
      <>
        <div className="docs-prose" />
        <TableOfContents />
      </>,
    );
    // No nav landmark is produced for an empty page.
    expect(container.querySelector("nav")).toBeNull();
  });
});
