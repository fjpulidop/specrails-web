import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivacyPage from "@/pages/PrivacyPage";

function renderPrivacyPage() {
  return render(
    <MemoryRouter>
      <PrivacyPage />
    </MemoryRouter>,
  );
}

describe("PrivacyPage", () => {
  it("describes local storage, signaling and external services without a LAN-only promise", () => {
    renderPrivacyPage();

    expect(
      screen.getByRole("heading", { level: 1, name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Some features connect to external services/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Local workspace and device storage/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Companion connections/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mailbox payloads expire after 60 seconds/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Plausible Analytics/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Nothing ever leaves your network/i),
    ).not.toBeInTheDocument();
  });

  it("links contact to the Specrails desktop repository", () => {
    renderPrivacyPage();

    expect(
      screen
        .getAllByRole("link", { name: "GitHub" })
        .some(
          (link) =>
            link.getAttribute("href") ===
            "https://github.com/fjpulidop/specrails-desktop",
        ),
    ).toBe(true);
  });
});
