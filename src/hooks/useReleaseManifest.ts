import { useEffect, useState } from "react";

/**
 * Release manifest hook — fetches the public release manifest published by
 * specrails-hub (openspec: add-latest-release-channel) and returns it for the
 * hero Download CTA + navbar download button.
 *
 * Module-level promise cache so multiple mounts share ONE network call.
 * openspec: hero-redesign-hub-primary
 */

const MANIFEST_URL =
  "https://specrails.dev/downloads/specrails-hub/latest/manifest.json";

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
  platforms: {
    "darwin-arm64": PlatformAsset;
  } & Record<string, PlatformAsset | undefined>;
}

export type ReleaseManifestState =
  | { status: "loading" }
  | { status: "ready"; manifest: ReleaseManifest }
  | { status: "error"; reason: string };

let cachedPromise: Promise<ReleaseManifestState> | null = null;

function isValid(raw: unknown): raw is ReleaseManifest {
  if (typeof raw !== "object" || raw === null) return false;
  const obj = raw as Record<string, unknown>;
  if (obj.schemaVersion !== 1) return false;
  if (typeof obj.version !== "string") return false;
  if (typeof obj.releasedAt !== "string") return false;
  if (typeof obj.releaseUrl !== "string") return false;
  const platforms = obj.platforms as Record<string, unknown> | undefined;
  if (!platforms || typeof platforms !== "object") return false;
  const mac = platforms["darwin-arm64"] as Record<string, unknown> | undefined;
  if (!mac) return false;
  return (
    typeof mac.filename === "string" &&
    typeof mac.url === "string" &&
    typeof mac.sha256 === "string" &&
    typeof mac.size === "number"
  );
}

function loadManifest(): Promise<ReleaseManifestState> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async (): Promise<ReleaseManifestState> => {
    try {
      const res = await fetch(MANIFEST_URL, { cache: "no-cache" });
      if (!res.ok) {
        return { status: "error", reason: `HTTP ${res.status}` };
      }
      const data = (await res.json()) as unknown;
      if (!isValid(data)) {
        return { status: "error", reason: "invalid schema" };
      }
      return { status: "ready", manifest: data };
    } catch (err) {
      return { status: "error", reason: (err as Error).message };
    }
  })();

  return cachedPromise;
}

/**
 * Read the release manifest. Emits `loading` until the fetch resolves, then
 * `ready` with the parsed manifest or `error` on any failure (network,
 * non-200, malformed JSON, wrong schemaVersion).
 */
export function useReleaseManifest(): ReleaseManifestState {
  const [state, setState] = useState<ReleaseManifestState>({ status: "loading" });

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

/**
 * Fallback URL when the release manifest can't be fetched (network error,
 * CORS, etc). Points directly at the Hostinger `latest/` folder so viewers
 * still land on the newest `.dmg` rather than bouncing to GitHub.
 */
export const RELEASES_FALLBACK_URL =
  "https://specrails.dev/downloads/specrails-hub/latest/";

/** Compute the best download URL + label for the current state. */
export function downloadFromState(
  state: ReleaseManifestState,
): { href: string | undefined; disabled: boolean; version: string | null } {
  if (state.status === "ready") {
    return {
      href: state.manifest.platforms["darwin-arm64"].url,
      disabled: false,
      version: state.manifest.version,
    };
  }
  if (state.status === "error") {
    return {
      href: RELEASES_FALLBACK_URL,
      disabled: false,
      version: null,
    };
  }
  return { href: undefined, disabled: true, version: null };
}
