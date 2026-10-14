import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { detectPlatform, downloadForPlatform, downloadFromState, formatBytes, manifestFromRelease, RELEASES_FALLBACK_URL } from '@/hooks/useReleaseManifest';

const download = (name: string) => `https://github.com/fjpulidop/specrails-desktop/releases/download/v2.58.0/${name}`;
const dmg = { name: 'specrails-desktop-2.58.0-aarch64.dmg', size: 4096, browser_download_url: download('specrails-desktop-2.58.0-aarch64.dmg'), digest: `sha256:${'a'.repeat(64)}` };
const asset = { filename: dmg.name, url: dmg.browser_download_url, sha256: 'a'.repeat(64), size: 4096 };
// GitHub's latest-release API response (only the fields the hook reads).
const manifest = { tag_name: 'v2.58.0', published_at: '2026-09-27T00:00:00Z', html_url: 'https://github.com/fjpulidop/specrails-desktop/releases/tag/v2.58.0', assets: [dmg] };
beforeEach(() => vi.resetModules());
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it.each([
  null, 'not an object',
  { ...manifest, tag_name: 1 }, { ...manifest, published_at: null }, { ...manifest, html_url: false },
  { ...manifest, assets: null }, { ...manifest, assets: [] },
  ...[null, { ...dmg, name: 'specrails-desktop-2.58.0-darwin-aarch64.app.tar.gz' }, { ...dmg, browser_download_url: null }, { ...dmg, size: '4096' }]
    .map(value => ({ ...manifest, assets: [value] })),
])('keeps malformed release metadata out of download links: %j', async value => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(value)));
  const { useReleaseManifest } = await import('@/hooks/useReleaseManifest');
  const hook = renderHook(() => useReleaseManifest());
  await waitFor(() => expect(hook.result.current).toEqual({ status: 'error', reason: 'invalid schema' }));
  expect(downloadForPlatform(hook.result.current, 'darwin-arm64').href).toBe(RELEASES_FALLBACK_URL);
});

it('shares successful metadata across consumers and preserves an available release when one platform is absent', async () => {
  const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(manifest)));
  const { useReleaseManifest } = await import('@/hooks/useReleaseManifest');
  const first = renderHook(() => useReleaseManifest()), second = renderHook(() => useReleaseManifest());
  await waitFor(() => expect(first.result.current.status).toBe('ready'));
  expect(second.result.current).toEqual(first.result.current);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(downloadForPlatform(first.result.current, 'windows-arm64')).toEqual({ href: RELEASES_FALLBACK_URL, disabled: false, version: '2.58.0', size: null, sha256: null });
  expect(downloadFromState(first.result.current, 'unknown')).toMatchObject({ href: asset.url, platform: 'darwin-arm64' });
});

it('retains an HTTP failure reason instead of trying to parse a failed response', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('unavailable', { status: 503 }));
  const { useReleaseManifest } = await import('@/hooks/useReleaseManifest');
  const hook = renderHook(() => useReleaseManifest());
  await waitFor(() => expect(hook.result.current).toEqual({ status: 'error', reason: 'HTTP 503' }));
});

it('allows remaining consumers to finish when the first consumer unmounts during the request', async () => {
  let finish!: (value: Response) => void;
  vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  const { useReleaseManifest } = await import('@/hooks/useReleaseManifest');
  const first = renderHook(() => useReleaseManifest()); first.unmount();
  const second = renderHook(() => useReleaseManifest());
  await act(async () => { finish(new Response(JSON.stringify(manifest))); });
  expect(second.result.current.status).toBe('ready');
});

it('maps the canonical installers of a GitHub release and ignores updater bundles', () => {
  const names = ['latest.json', 'specrails-desktop-2.63.1-aarch64.dmg', 'specrails-desktop-2.63.1-arm64-setup.exe', 'specrails-desktop-2.63.1-darwin-aarch64.app.tar.gz',
    'specrails-desktop-2.63.1-windows-aarch64-setup.exe', 'specrails-desktop-2.63.1-windows-x86_64-setup.exe', 'specrails-desktop-2.63.1-x64-setup.exe']
  const assets = names.map((name, index) => ({ name, size: 100 + index, browser_download_url: `https://example.test/${name}`, ...(name.endsWith('.dmg') ? { digest: `sha256:${'b'.repeat(64)}` } : {}) }));
  expect(manifestFromRelease({ tag_name: 'v2.63.1', published_at: '2026-10-14T13:00:00Z', html_url: 'https://example.test/v2.63.1', assets })).toEqual({
    schemaVersion: 1, version: '2.63.1', releasedAt: '2026-10-14T13:00:00Z', releaseUrl: 'https://example.test/v2.63.1',
    platforms: {
      'darwin-arm64': { filename: 'specrails-desktop-2.63.1-aarch64.dmg', url: 'https://example.test/specrails-desktop-2.63.1-aarch64.dmg', sha256: 'b'.repeat(64), size: 101 },
      'windows-x64': { filename: 'specrails-desktop-2.63.1-x64-setup.exe', url: 'https://example.test/specrails-desktop-2.63.1-x64-setup.exe', sha256: '', size: 106 },
      'windows-arm64': { filename: 'specrails-desktop-2.63.1-arm64-setup.exe', url: 'https://example.test/specrails-desktop-2.63.1-arm64-setup.exe', sha256: '', size: 102 },
    },
  });
});

it.each([
  [{ userAgent: '', platform: '', userAgentData: { platform: 'macOS' } }, 'darwin-arm64'],
  [{ userAgent: 'Mac OS X', platform: '' }, 'darwin-arm64'],
  [{ userAgent: '', platform: 'MacIntel' }, 'darwin-arm64'],
  [{ userAgent: '', platform: '', userAgentData: { platform: 'Windows' } }, 'windows-x64'],
  [{ userAgent: 'Windows ARM64', platform: '' }, 'windows-arm64'],
  [{ userAgent: '', platform: 'WinARM' }, 'windows-arm64'],
  [{ userAgent: 'iPhone', platform: 'MacIntel' }, 'unknown'],
  [{ userAgentData: { platform: 'Windows', mobile: true } }, 'unknown'],
  [{}, 'unknown'], [undefined, 'unknown'],
] as const)('detects a supported download from browser hints %j', (navigator, expected) => {
  vi.stubGlobal('navigator', navigator);
  expect(detectPlatform()).toBe(expected);
});
it.each([[512, '512 B'], [1024, '1.0 KB'], [1024 ** 2, '1.0 MB'], [1024 ** 3, '1.00 GB']] as const)('formats %i download bytes', (bytes, expected) => expect(formatBytes(bytes)).toBe(expected));
