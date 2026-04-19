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
    expect(screen.getByText(/installation in/i)).toBeInTheDocument();
    expect(screen.getByText("2 Steps")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderInstallSection();
    expect(
      screen.getByText(/two methods, same result/i)
    ).toBeInTheDocument();
  });

  // --- Method tabs (npx vs git) ---

  it("defaults to npx method and shows npx command", () => {
    const { container } = renderInstallSection();
    // The first terminal should contain npx command text
    const terminals = container.querySelectorAll(".terminal");
    expect(terminals.length).toBeGreaterThanOrEqual(1);
    expect(terminals[0].textContent).toContain("npx specrails-core@latest init");
  });

  it("shows git clone commands when Git Clone tab is clicked", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const gitBtn = Array.from(buttons).find((b) => b.textContent === "Git Clone");
    expect(gitBtn).toBeDefined();
    fireEvent.click(gitBtn!);

    // Both git clone commands are visible in the step 1 terminal
    const terminals = container.querySelectorAll(".terminal");
    expect(terminals[0].textContent).toContain(
      "git clone https://github.com/fjpulidop/specrails-core.git"
    );
    expect(terminals[0].textContent).toContain("./specrails/install.sh");
  });

  it("switches back to npx when npx tab is clicked after git", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const gitBtn = Array.from(buttons).find((b) => b.textContent === "Git Clone");
    const npxBtn = Array.from(buttons).find((b) => b.textContent === "npx");

    fireEvent.click(gitBtn!);
    fireEvent.click(npxBtn!);

    const terminals = container.querySelectorAll(".terminal");
    expect(terminals[0].textContent).toContain("npx specrails-core@latest init");
  });

  // --- CLI (Claude Code — Codex coming soon, removed from UI) ---

  it("uses Claude Code as the only CLI in step 2", () => {
    const { container } = renderInstallSection();
    // The second terminal shows "claude" as the terminal label
    const terminals = container.querySelectorAll(".terminal");
    expect(terminals[1].textContent).toContain("claude");
  });

  it("does not render an OpenAI Codex CLI tab (coming soon — in lab)", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const codexBtn = Array.from(buttons).find(
      (b) => b.textContent === "OpenAI Codex"
    );
    expect(codexBtn).toBeUndefined();
  });

  // --- Step indicators ---

  it("renders step 1 and step 2 indicators", () => {
    renderInstallSection();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders step 1 heading", () => {
    renderInstallSection();
    expect(screen.getByText("Install the templates")).toBeInTheDocument();
  });

  it("renders step 2 heading", () => {
    renderInstallSection();
    expect(
      screen.getByText("Configure with the TUI installer")
    ).toBeInTheDocument();
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

  it("renders estimated install time text", () => {
    renderInstallSection();
    expect(
      screen.getByText(/estimated install time/i)
    ).toBeInTheDocument();
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

  // --- Combined state: method=git + claude CLI (codex coming soon) ---

  it("keeps Claude Code in step 2 when Git Clone method is active", () => {
    const { container } = renderInstallSection();
    const buttons = container.querySelectorAll("button");
    const gitBtn = Array.from(buttons).find((b) => b.textContent === "Git Clone");

    fireEvent.click(gitBtn!);

    const terminals = container.querySelectorAll(".terminal");
    // git clone commands visible in step 1 terminal
    expect(terminals[0].textContent).toContain("./specrails/install.sh");
    // Claude Code visible in step 2 terminal
    expect(terminals[1].textContent).toContain("claude");
  });
});
