import { describe, it, expect } from "vitest";
import {
  downloadFromState,
  RELEASES_FALLBACK_URL,
  type ReleaseManifestState,
} from "@/hooks/useReleaseManifest";

describe("downloadFromState", () => {
  it("returns the manifest .dmg url when ready", () => {
    const state: ReleaseManifestState = {
      status: "ready",
      manifest: {
        schemaVersion: 1,
        version: "1.30.0",
        releasedAt: "2026-04-17T00:00:00Z",
        releaseUrl: "https://github.com/fjpulidop/specrails-desktop/releases/tag/v1.30.0",
        platforms: {
          "darwin-arm64": {
            filename: "specrails-desktop-1.30.0-aarch64.dmg",
            url: "https://specrails.dev/downloads/specrails-desktop/latest/specrails-desktop-1.30.0-aarch64.dmg",
            sha256: "abc",
            size: 1000,
          },
        },
      },
    };
    const { href, disabled, version } = downloadFromState(state);
    expect(href).toBe(state.manifest.platforms["darwin-arm64"].url);
    expect(disabled).toBe(false);
    expect(version).toBe("1.30.0");
  });

  it("falls back to the Hostinger latest/ folder on error", () => {
    const state: ReleaseManifestState = { status: "error", reason: "boom" };
    const { href, disabled, version } = downloadFromState(state);
    expect(href).toBe(RELEASES_FALLBACK_URL);
    expect(href).toContain("specrails.dev/downloads/specrails-desktop/latest");
    expect(disabled).toBe(false);
    expect(version).toBeNull();
  });

  it("returns a disabled, href-less state while loading", () => {
    const { href, disabled, version } = downloadFromState({ status: "loading" });
    expect(href).toBeUndefined();
    expect(disabled).toBe(true);
    expect(version).toBeNull();
  });
});
