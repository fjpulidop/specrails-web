import { useEffect, useState } from "react";

/**
 * Release manifest hook — reads the latest specrails-desktop GitHub Release
 * through the GitHub API (CORS-enabled; release asset downloads are not) and
 * maps its installer assets to the manifest shape the download CTAs use
 * (hero + /download page). GitHub Releases is the only download channel
 * (specrails-desktop openspec: github-release-download-channel).
 *
 * Module-level promise cache so multiple mounts share ONE network call.
 */

const LATEST_RELEASE_API =
  "https://api.github.com/repos/fjpulidop/specrails-desktop/releases/latest";

/** Canonical installer names published on every release; updater bundles never match. */
const INSTALLER_ASSETS: Record<PlatformKey, RegExp> = {
  "darwin-arm64": /^specrails-desktop-\d+\.\d+\.\d+-aarch64\.dmg$/,
  "windows-x64": /^specrails-desktop-\d+\.\d+\.\d+-x64-setup\.exe$/,
  "windows-arm64": /^specrails-desktop-\d+\.\d+\.\d+-arm64-setup\.exe$/,
};

export type PlatformKey = "darwin-arm64" | "windows-x64" | "windows-arm64";

export interface PlatformAsset {
  filename: string;
  url: string;
  sha256: string;
  size: number;
}

export interface ReleaseManifest {
  schemaVersion: 1;
  version: string;
  releasedAt: string;
  releaseUrl: string;
  platforms: Partial<Record<PlatformKey, PlatformAsset>> & {
    "darwin-arm64": PlatformAsset;
  };
}

export type ReleaseManifestState =
  | { status: "loading" }
  | { status: "ready"; manifest: ReleaseManifest }
  | { status: "error"; reason: string };

let cachedPromise: Promise<ReleaseManifestState> | null = null;

interface GitHubReleaseAsset {
  name?: unknown;
  size?: unknown;
  browser_download_url?: unknown;
  digest?: unknown;
}

/**
 * Maps a GitHub release to the manifest shape. Returns the input unchanged when
 * it is not a release object, so `isValid` rejects it with "invalid schema".
 */
export function manifestFromRelease(raw: unknown): unknown {
  if (typeof raw !== "object" || raw === null) return raw;
  const release = raw as { tag_name?: unknown; published_at?: unknown; html_url?: unknown; assets?: unknown };
  const assets = Array.isArray(release.assets) ? (release.assets as GitHubReleaseAsset[]) : [];
  const platforms: Record<string, unknown> = {};
  for (const [key, pattern] of Object.entries(INSTALLER_ASSETS)) {
    const asset = assets.find(item => typeof item?.name === "string" && pattern.test(item.name));
    if (!asset) continue;
    const digest = typeof asset.digest === "string" && asset.digest.startsWith("sha256:") ? asset.digest.slice(7) : "";
    platforms[key] = { filename: asset.name, url: asset.browser_download_url, sha256: digest, size: asset.size };
  }
  return {
    schemaVersion: 1,
    version: typeof release.tag_name === "string" ? release.tag_name.replace(/^v/, "") : release.tag_name,
    releasedAt: release.published_at,
    releaseUrl: release.html_url,
    platforms,
  };
}

function isAsset(raw: unknown): raw is PlatformAsset {
  if (typeof raw !== "object" || raw === null) return false;
  const a = raw as Record<string, unknown>;
  return (
    typeof a.filename === "string" &&
    typeof a.url === "string" &&
    typeof a.sha256 === "string" &&
    typeof a.size === "number"
  );
}

function isValid(raw: unknown): raw is ReleaseManifest {
  if (typeof raw !== "object" || raw === null) return false;
  const obj = raw as Record<string, unknown>;
  if (obj.schemaVersion !== 1) return false;
  if (typeof obj.version !== "string") return false;
  if (typeof obj.releasedAt !== "string") return false;
  if (typeof obj.releaseUrl !== "string") return false;
  const platforms = obj.platforms as Record<string, unknown> | undefined;
  if (!platforms || typeof platforms !== "object") return false;
  return isAsset(platforms["darwin-arm64"]);
}

function loadManifest(): Promise<ReleaseManifestState> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async (): Promise<ReleaseManifestState> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);
    try {
      const res = await fetch(LATEST_RELEASE_API, {
        headers: { Accept: "application/vnd.github+json" },
        signal: controller.signal,
      });
      if (!res.ok) {
        return { status: "error", reason: `HTTP ${res.status}` };
      }
      const data = manifestFromRelease(await res.json());
      if (!isValid(data)) {
        return { status: "error", reason: "invalid schema" };
      }
      return { status: "ready", manifest: data };
    } catch (err) {
      return { status: "error", reason: (err as Error).message };
    } finally {
      clearTimeout(timeout);
    }
  })();

  return cachedPromise;
}

export function useReleaseManifest(): ReleaseManifestState {
  const [state, setState] = useState<ReleaseManifestState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    loadManifest().then((next) => {
      if (!cancelled) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export const RELEASES_FALLBACK_URL =
  "https://github.com/fjpulidop/specrails-desktop/releases/latest";

export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  "darwin-arm64": "macOS · Apple Silicon",
  "windows-x64": "Windows · x64",
  "windows-arm64": "Windows · ARM64",
};

export const PLATFORM_SHORT: Record<PlatformKey, string> = {
  "darwin-arm64": "Mac",
  "windows-x64": "Windows",
  "windows-arm64": "Windows",
};

export type DetectedPlatform = PlatformKey | "unknown";

/**
 * Best-effort browser platform detection. Uses userAgentData when available
 * (Chromium) and falls back to navigator.userAgent + navigator.platform.
 * Returns "unknown" on Linux, mobile, or anything we don't ship a build for.
 */
export function detectPlatform(): DetectedPlatform {
  if (typeof navigator === "undefined") return "unknown";

  const uaData = (
    navigator as Navigator & {
      userAgentData?: { platform?: string; mobile?: boolean };
    }
  ).userAgentData;

  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";

  if (uaData?.mobile) return "unknown";
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return "unknown";

  const isMac =
    uaData?.platform === "macOS" ||
    /Mac/i.test(platform) ||
    /Mac OS X/i.test(ua);
  if (isMac) {
    // Apple Silicon detection is unreliable from JS — Safari hides it. We
    // ship Apple Silicon only, so default any Mac to darwin-arm64 and let
    // the page caveat clarify Intel users in the UI.
    return "darwin-arm64";
  }

  const isWindows =
    uaData?.platform === "Windows" ||
    /Win/i.test(platform) ||
    /Windows/i.test(ua);
  if (isWindows) {
    const arm =
      /ARM64|aarch64/i.test(ua) ||
      /ARM/i.test(platform) ||
      // Edge on Windows ARM still reports x64 in UA but exposes arch via UAData
      false;
    return arm ? "windows-arm64" : "windows-x64";
  }

  return "unknown";
}

export function getAsset(
  manifest: ReleaseManifest,
  platform: PlatformKey,
): PlatformAsset | undefined {
  return manifest.platforms[platform];
}

/**
 * Compute download URL + label for a specific platform. When the manifest is
 * still loading, href is undefined and disabled is true. On error, falls back
 * to the latest/ folder so the user still lands on a real download.
 */
export function downloadForPlatform(
  state: ReleaseManifestState,
  platform: PlatformKey,
): {
  href: string | undefined;
  disabled: boolean;
  version: string | null;
  size: number | null;
  sha256: string | null;
} {
  if (state.status === "ready") {
    const asset = getAsset(state.manifest, platform);
    if (asset) {
      return {
        href: asset.url,
        disabled: false,
        version: state.manifest.version,
        size: asset.size,
        sha256: asset.sha256,
      };
    }
    return {
      href: RELEASES_FALLBACK_URL,
      disabled: false,
      version: state.manifest.version,
      size: null,
      sha256: null,
    };
  }
  if (state.status === "error") {
    return {
      href: RELEASES_FALLBACK_URL,
      disabled: false,
      version: null,
      size: null,
      sha256: null,
    };
  }
  return {
    href: undefined,
    disabled: true,
    version: null,
    size: null,
    sha256: null,
  };
}

/** Hero CTA helper: download for detected platform, mac fallback if unknown. */
export function downloadFromState(
  state: ReleaseManifestState,
  platform: DetectedPlatform = "darwin-arm64",
): {
  href: string | undefined;
  disabled: boolean;
  version: string | null;
  platform: PlatformKey;
} {
  const target: PlatformKey =
    platform === "unknown" ? "darwin-arm64" : platform;
  const r = downloadForPlatform(state, target);
  return {
    href: r.href,
    disabled: r.disabled,
    version: r.version,
    platform: target,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}
