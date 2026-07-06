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
  it("renders the privacy policy heading and local-first promise", () => {
    renderPrivacyPage();

    expect(
      screen.getByRole("heading", { level: 1, name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Specrails does not collect, store, or transmit any personal data/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Data we collect/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Local network communication/i })).toBeInTheDocument();
  });

  it("links contact to the Specrails desktop repository", () => {
    renderPrivacyPage();

    expect(
      screen
        .getAllByRole("link", { name: "GitHub" })
        .some((link) => link.getAttribute("href") === "https://github.com/fjpulidop/specrails-desktop"),
    ).toBe(true);
  });
});
