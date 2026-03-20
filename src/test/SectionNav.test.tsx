import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SectionNav from "@/components/SectionNav";

describe("SectionNav", () => {
  it("renders nothing when no sectionIds are provided", () => {
    const { container } = render(<SectionNav sectionIds={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders up and down buttons when sectionIds are provided", () => {
    render(<SectionNav sectionIds={["a", "b", "c"]} />);
    expect(screen.getByRole("button", { name: /previous section/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next section/i })).toBeInTheDocument();
  });

  it("previous button is disabled at first section (index 0)", () => {
    render(<SectionNav sectionIds={["a", "b"]} />);
    expect(screen.getByRole("button", { name: /previous section/i })).toBeDisabled();
  });

  it("next button is disabled at last section when only one section", () => {
    render(<SectionNav sectionIds={["only"]} />);
    expect(screen.getByRole("button", { name: /next section/i })).toBeDisabled();
  });

  it("clicking next button does not throw", async () => {
    const user = userEvent.setup();
    render(<SectionNav sectionIds={["a", "b", "c"]} />);
    const next = screen.getByRole("button", { name: /next section/i });
    // next is not disabled when there are multiple sections
    await expect(user.click(next)).resolves.not.toThrow();
  });

  it("uses custom scrollThreshold prop without errors", () => {
    const { container } = render(
      <SectionNav sectionIds={["a", "b"]} scrollThreshold={200} />
    );
    expect(container).toBeTruthy();
  });
});
