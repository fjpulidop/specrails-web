import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InstallSection from "@/components/InstallSection";

function renderInstallSection() {
  return render(<InstallSection />);
}

describe("InstallSection", () => {
  it("renders the section with id install", () => {
    const { container } = renderInstallSection();
    const section = container.querySelector("section#install");
    expect(section).toBeInTheDocument();
  });

  it("renders the headline", () => {
    renderInstallSection();
    expect(screen.getByText(/choose your/i)).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderInstallSection();
    expect(
      screen.getByText(/hub includes core as a dependency/i)
    ).toBeInTheDocument();
  });

  // --- Product selector ---

  it("renders three product options", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const productNames = Array.from(buttons).map((b) => b.textContent);
    expect(productNames.some((t) => t?.includes("specrails-hub"))).toBe(true);
    expect(productNames.some((t) => t?.includes("specrails-core"))).toBe(true);
    expect(productNames.some((t) => t?.includes("specrails-mcp"))).toBe(true);
  });

  it("shows recommended badge on Hub", () => {
    renderInstallSection();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
  });

  it("defaults to Hub and shows hub install command", () => {
    const { container } = renderInstallSection();
    const terminal = container.querySelector(".terminal");
    expect(terminal?.textContent).toContain("npm install -g specrails-hub");
  });

  it("shows core command when specrails-core is selected", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const coreBtn = Array.from(buttons).find((b) =>
      b.textContent?.includes("specrails-core")
    );
    fireEvent.click(coreBtn!);

    const terminal = container.querySelector(".terminal");
    expect(terminal?.textContent).toContain("npx specrails-core@latest init");
  });

  it("shows mcp command when specrails-mcp is selected", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const mcpBtn = Array.from(buttons).find((b) =>
      b.textContent?.includes("specrails-mcp")
    );
    fireEvent.click(mcpBtn!);

    const terminal = container.querySelector(".terminal");
    expect(terminal?.textContent).toContain("npm install -g specrails-mcp");
  });

  it("switches back to Hub when re-selected", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const coreBtn = Array.from(buttons).find((b) =>
      b.textContent?.includes("specrails-core")
    );
    const hubBtn = Array.from(buttons).find((b) =>
      b.textContent?.includes("specrails-hub")
    );

    fireEvent.click(coreBtn!);
    fireEvent.click(hubBtn!);

    const terminal = container.querySelector(".terminal");
    expect(terminal?.textContent).toContain("npm install -g specrails-hub");
  });

  it("shows post-install commands for Hub", () => {
    const { container } = renderInstallSection();
    const terminal = container.querySelector(".terminal");
    expect(terminal?.textContent).toContain("specrails-hub");
    expect(terminal?.textContent).toContain("Dashboard ready at localhost:4200");
  });

  // --- Requirements text ---

  it("renders requirements text", () => {
    const { container } = renderInstallSection();
    const paragraphs = container.querySelectorAll("p");
    const reqParagraph = Array.from(paragraphs).find(
      (p) => p.textContent?.includes("Requirements:")
    );
    expect(reqParagraph).toBeDefined();
  });

  it("renders open source link to GitHub", () => {
    const { container } = renderInstallSection();
    const links = container.querySelectorAll("a");
    const ghLink = Array.from(links).find(
      (a) =>
        a.getAttribute("href") ===
        "https://github.com/fjpulidop/specrails-core"
    );
    expect(ghLink).toBeDefined();
    expect(ghLink?.textContent).toContain("open source on GitHub");
  });
});
