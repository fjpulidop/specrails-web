import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { DocsDropdown } from "@/components/DocsDropdown";

function renderDropdown() {
  return render(
    <MemoryRouter>
      <DocsDropdown />
    </MemoryRouter>
  );
}

describe("DocsDropdown", () => {
  it("renders a Docs toggle button", () => {
    renderDropdown();
    expect(screen.getByRole("button", { name: /docs/i })).toBeInTheDocument();
  });

  it("dropdown list is hidden by default", () => {
    renderDropdown();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("clicking the button opens the dropdown", async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.click(screen.getByRole("button", { name: /docs/i }));
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("dropdown contains doc entry links", async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.click(screen.getByRole("button", { name: /docs/i }));
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("clicking a link closes the dropdown", async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.click(screen.getByRole("button", { name: /docs/i }));
    const links = screen.getAllByRole("link");
    await user.click(links[0]);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("clicking outside closes the dropdown", async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.click(screen.getByRole("button", { name: /docs/i }));
    expect(screen.getByRole("list")).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
