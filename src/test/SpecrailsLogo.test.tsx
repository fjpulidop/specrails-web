import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecrailsLogo } from "@/components/SpecrailsLogo";

describe("SpecrailsLogo", () => {
  it("renders the decorative wordmark with default dimensions", () => {
    const { container } = render(<SpecrailsLogo />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("height", "40");
    expect(svg).toHaveAttribute("width", "118");
    expect(screen.getByText("specrails")).toBeInTheDocument();
  });

  it("derives width from a custom height and keeps the class name", () => {
    const { container } = render(<SpecrailsLogo height={64} className="brand-mark" />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("height", "64");
    expect(svg).toHaveAttribute("width", "188");
    expect(svg).toHaveClass("brand-mark");
  });
});
