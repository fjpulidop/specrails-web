import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DownloadPage from "@/pages/DownloadPage";
import { DOWNLOAD_COPY } from "@/lib/download-copy";
import { I18nProvider, LANGUAGE_IDS, SITE_COPY } from "@/lib/i18n";
import type { PlatformAsset, ReleaseManifest, ReleaseManifestState } from "@/hooks/useReleaseManifest";

let state: ReleaseManifestState;
vi.mock("@/hooks/useReleaseManifest", async importOriginal => ({
  ...await importOriginal<typeof import("@/hooks/useReleaseManifest")>(),
  useReleaseManifest: () => state,
}));
vi.mock("@/components/Navbar", () => ({ default: () => <nav /> }));
vi.mock("@/components/FooterSection", () => ({ default: () => <footer /> }));

const releases = "https://github.com/fjpulidop/specrails-desktop/releases";
const mac: PlatformAsset = { filename: "Specrails_9.8.7_aarch64.dmg", url: "https://specrails.dev/downloads/9.8.7/mac.dmg", sha256: "a".repeat(64), size: 10 * 1024 * 1024 };
const windows: PlatformAsset = { filename: "Specrails_9.8.7_x64-setup.exe", url: "https://specrails.dev/downloads/9.8.7/windows.exe", sha256: "b".repeat(64), size: 20 * 1024 * 1024 };
const arm: PlatformAsset = { filename: "Specrails_9.8.7_arm64-setup.exe", url: "https://specrails.dev/downloads/9.8.7/windows-arm.exe", sha256: "c".repeat(64), size: 21 * 1024 * 1024 };
function manifest(): ReleaseManifest {
  return { schemaVersion: 1, version: "9.8.7", releasedAt: "2026-09-05T12:00:00Z", releaseUrl: `${releases}/tag/v9.8.7`, platforms: { "darwin-arm64": mac, "windows-x64": windows, "windows-arm64": arm } };
}
function view() {
  return <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><I18nProvider><DownloadPage /></I18nProvider></MemoryRouter>;
}
function platform(name: string) { return within(screen.getByRole("article", { name })); }

beforeEach(() => {
  state = { status: "loading" };
  window.localStorage.setItem("specrails-web:language", "en");
});

describe("DownloadPage", () => {
  it("disables all downloads during loading and keeps published releases reachable", () => {
    render(view());
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(DOWNLOAD_COPY.en.title);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("status")).toHaveTextContent(DOWNLOAD_COPY.en.loading);
    const buttons = screen.getAllByRole("button", { name: DOWNLOAD_COPY.en.loading });
    expect(buttons).toHaveLength(3);
    for (const button of buttons) expect(button).toBeDisabled();
    expect(screen.queryByRole("link", { name: /^Download:/ })).toBeNull();
    expect(screen.getByRole("link", { name: DOWNLOAD_COPY.en.allReleases })).toHaveAttribute("href", releases);
  });

  it("updates loading state with real version, links, size and complete file checksums", () => {
    const { rerender } = render(view());
    state = { status: "ready", manifest: manifest() };
    rerender(view());
    expect(screen.queryByRole("status")).toBeNull();
    for (const [label, asset] of [["macOS · Apple Silicon", mac], ["Windows · x64", windows], ["Windows · ARM64", arm]] as const) {
      const card = platform(label);
      expect(card.getByRole("link", { name: `Download: ${label}` })).toHaveAttribute("href", asset.url);
      expect(card.getByRole("link", { name: `Download: ${label}` })).toHaveAttribute("download", asset.filename);
      expect(card.getByText("v9.8.7")).toBeVisible();
      fireEvent.click(card.getByText(DOWNLOAD_COPY.en.details));
      expect(card.getByText(asset.filename)).toBeInTheDocument();
      expect(card.getByText(asset.sha256)).toBeInTheDocument();
    }
    expect(platform("macOS · Apple Silicon").getByText("10.0 MB")).toBeVisible();
    expect(screen.getByRole("link", { name: DOWNLOAD_COPY.en.releaseNotes })).toHaveAttribute("href", `${releases}/tag/v9.8.7`);
    expect(document.querySelector("time")).toHaveAttribute("datetime", "2026-09-05T12:00:00Z");
  });

  it("shows a clear offline fallback without disguising release pages as downloads", () => {
    state = { status: "error", reason: "private-network-diagnostic" };
    render(view());
    expect(screen.getByRole("alert")).toHaveTextContent(DOWNLOAD_COPY.en.error);
    expect(screen.queryByText("private-network-diagnostic")).toBeNull();
    expect(screen.queryByRole("link", { name: /^Download:/ })).toBeNull();
    const links = screen.getAllByRole("link", { name: /^Check published versions:/ });
    expect(links).toHaveLength(3);
    for (const link of links) { expect(link).toHaveAttribute("href", releases); expect(link).not.toHaveAttribute("download"); }
  });

  it("does not advertise an installer missing from this version", () => {
    const release = manifest();
    delete release.platforms["windows-arm64"];
    state = { status: "ready", manifest: release };
    render(view());
    const card = platform("Windows · ARM64");
    expect(card.getByText(DOWNLOAD_COPY.en.missing)).toBeVisible();
    expect(card.queryByRole("link", { name: /^Download:/ })).toBeNull();
    expect(card.getByRole("link", { name: /^Check published versions:/ })).toHaveAttribute("href", releases);
    expect(screen.getAllByRole("link", { name: /^Download:/ })).toHaveLength(2);
  });

  it.each([
    { url: "javascript:alert(1)" }, { url: "https://user:secret@example.com/app.exe" },
    { size: -1 }, { size: Number.NaN }, { sha256: "truncated-checksum" }, { filename: "" },
  ])("treats malformed optional installer metadata as unavailable: %j", invalid => {
    const release = manifest();
    release.platforms["windows-x64"] = { ...windows, ...invalid };
    state = { status: "ready", manifest: release };
    render(view());
    const card = platform("Windows · x64");
    expect(card.queryByRole("link", { name: /^Download:/ })).toBeNull();
    expect(card.getByRole("link", { name: /^Check published versions:/ })).toHaveAttribute("href", releases);
  });

  it("keeps documentation, source and optional support available and omits invalid release metadata", () => {
    state = { status: "ready", manifest: { ...manifest(), releaseUrl: "javascript:alert(1)", releasedAt: "not-a-date" } };
    render(view());
    expect(document.querySelector("time")).toBeNull();
    expect(screen.getByRole("link", { name: DOWNLOAD_COPY.en.releaseNotes })).toHaveAttribute("href", releases);
    expect(screen.getByRole("link", { name: SITE_COPY.en.nav.docs })).toHaveAttribute("href", "/docs/getting-started");
    expect(screen.getByRole("link", { name: SITE_COPY.en.nav.github })).toHaveAttribute("href", "https://github.com/fjpulidop/specrails-desktop");
    expect(screen.getByRole("link", { name: DOWNLOAD_COPY.en.support })).toHaveAttribute("href", "https://ko-fi.com/D1D81Y002C");
    expect(screen.getByRole("link", { name: DOWNLOAD_COPY.en.back })).toHaveAttribute("href", "/");
  });

  it.each(LANGUAGE_IDS)("localizes the complete download flow in %s", language => {
    window.localStorage.setItem("specrails-web:language", language);
    const release = manifest();
    delete release.platforms["windows-arm64"];
    state = { status: "ready", manifest: release };
    render(view());
    const copy = DOWNLOAD_COPY[language];
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(copy.title);
    expect(screen.getByRole("heading", { name: copy.platforms })).toBeVisible();
    expect(screen.getByText(copy.architecture)).toBeVisible();
    expect(screen.getByText(copy.macHint)).toBeVisible();
    expect(screen.getByText(copy.x64Hint)).toBeVisible();
    expect(screen.getByText(copy.armHint)).toBeVisible();
    expect(screen.getByText(copy.missing)).toBeVisible();
    expect(platform("macOS · Apple Silicon").getByRole("link", { name: `${copy.download}: macOS · Apple Silicon` })).toHaveAttribute("href", mac.url);
    expect(platform("Windows · ARM64").getByRole("link", { name: `${copy.viewReleases}: Windows · ARM64` })).toHaveAttribute("href", releases);
    expect(screen.getByRole("link", { name: copy.support })).toBeVisible();
    expect(document.title).toBe(`${copy.title} — macOS & Windows`);
    for (const value of Object.values(copy)) expect(value.trim().length).toBeGreaterThan(0);
  });
});
