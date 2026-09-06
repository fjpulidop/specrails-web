import { Link } from "react-router-dom";
import { Apple, ArrowLeft, ArrowRight, BookOpen, Coffee, Download, ExternalLink, Github, LoaderCircle, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";
import { PLATFORM_LABELS, formatBytes, useReleaseManifest, type PlatformAsset, type PlatformKey, type ReleaseManifestState } from "@/hooks/useReleaseManifest";
import { useI18n } from "@/lib/i18n";
import { DOWNLOAD_COPY, type DownloadCopy } from "@/lib/download-copy";
import { PRODUCT_COPY } from "@/lib/product-copy";

const RELEASES_URL = "https://github.com/fjpulidop/specrails-desktop/releases";
const SOURCE_URL = "https://github.com/fjpulidop/specrails-desktop";
const PLATFORMS: { key: PlatformKey; title: string; architecture: string; hint: "macHint" | "x64Hint" | "armHint" }[] = [
  { key: "darwin-arm64", title: "macOS", architecture: "Apple Silicon · ARM64", hint: "macHint" },
  { key: "windows-x64", title: "Windows", architecture: "Intel / AMD · x64", hint: "x64Hint" },
  { key: "windows-arm64", title: "Windows", architecture: "ARM64", hint: "armHint" },
];

function httpsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch { return false; }
}

// An optional platform entry may be absent or malformed even when the manifest
// itself loaded. Only offer an actual download with usable file metadata.
function usableAsset(value: unknown): value is PlatformAsset {
  if (!value || typeof value !== "object") return false;
  const asset = value as Partial<PlatformAsset>;
  return typeof asset.filename === "string" && asset.filename.trim().length > 0 &&
    httpsUrl(asset.url) && typeof asset.size === "number" && Number.isFinite(asset.size) && asset.size > 0 &&
    typeof asset.sha256 === "string" && /^[a-f\d]{64}$/i.test(asset.sha256);
}

function PlatformCard({ platform, state, copy }: { platform: typeof PLATFORMS[number]; state: ReleaseManifestState; copy: DownloadCopy }) {
  const candidate = state.status === "ready" ? state.manifest.platforms[platform.key] : undefined;
  const asset = usableAsset(candidate) ? candidate : null;
  const Icon = platform.key === "darwin-arm64" ? Apple : Monitor;
  const label = PLATFORM_LABELS[platform.key];
  return (
    <article aria-label={label} className="flex min-w-0 flex-col rounded-2xl border border-border bg-surface-1 p-6 sm:p-7">
      <Icon className="mb-6 h-7 w-7 text-brand-cyan" aria-hidden="true" />
      <h3 className="text-2xl font-medium tracking-tight">{platform.title}</h3>
      <p className="mt-2 text-sm font-medium text-foreground">{platform.architecture}</p>
      <p className="mb-7 mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">{copy[platform.hint]}</p>
      <div className="mt-auto">
        {state.status === "loading" ? (
          <Button disabled className="h-auto min-h-11 w-full whitespace-normal rounded-full px-4 py-3"><LoaderCircle className="motion-safe:animate-spin" aria-hidden="true" />{copy.loading}</Button>
        ) : asset ? (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span>{copy.version} <strong className="font-mono font-normal text-foreground">v{state.status === "ready" ? state.manifest.version : ""}</strong></span>
              <span>{copy.size} <strong className="font-normal text-foreground">{formatBytes(asset.size)}</strong></span>
            </div>
            <Button asChild className="h-auto min-h-11 w-full whitespace-normal rounded-full px-4 py-3">
              <a href={asset.url} download={asset.filename} aria-label={`${copy.download}: ${label}`}><Download aria-hidden="true" />{copy.download} {platform.title}</a>
            </Button>
            <details className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
              <summary className="cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{copy.details}</summary>
              <dl className="mt-4 space-y-3">
                <div><dt>{copy.file}</dt><dd className="mt-1 break-all font-mono text-foreground">{asset.filename}</dd></div>
                <div><dt>{copy.checksum}</dt><dd className="mt-1 select-all break-all font-mono leading-relaxed text-foreground">{asset.sha256}</dd></div>
              </dl>
              <p className="mt-3 leading-relaxed">{copy.checksumHint}</p>
            </details>
          </>
        ) : (
          <>
            {state.status === "ready" && <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{copy.missing}</p>}
            <Button asChild variant="outline" className="h-auto min-h-11 w-full whitespace-normal rounded-full px-4 py-3">
              <a href={RELEASES_URL} aria-label={`${copy.viewReleases}: ${label}`}>{copy.viewReleases}<ExternalLink aria-hidden="true" /></a>
            </Button>
          </>
        )}
      </div>
    </article>
  );
}

export default function DownloadPage() {
  const { languageId, content } = useI18n();
  const copy = DOWNLOAD_COPY[languageId];
  const state = useReleaseManifest();
  useSeo({ title: `${copy.title} — macOS & Windows`, description: copy.intro, canonical: "https://specrails.dev/download" });
  const release = state.status === "ready" ? state.manifest : null;
  const date = release ? new Date(release.releasedAt) : null;
  const published = date && Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat(languageId, { dateStyle: "medium" }).format(date) : null;
  const releaseUrl = httpsUrl(release?.releaseUrl) ? release.releaseUrl : RELEASES_URL;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#download-content" className="sr-only z-[100] rounded-lg bg-foreground p-4 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">{PRODUCT_COPY[languageId].skip}</a>
      <Navbar />
      <main id="download-content" className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
        <header className="max-w-3xl">
          <p className="eyebrow text-brand-cyan">SPECRAILS DESKTOP · MIT</p>
          <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{copy.intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            {release && <span className="font-mono text-foreground">v{release.version}</span>}
            {published && <span>{copy.released} <time dateTime={release!.releasedAt}>{published}</time></span>}
            <a href={RELEASES_URL} className="inline-flex items-center gap-1.5 text-brand-cyan underline-offset-4 hover:underline">{copy.allReleases}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
            {release && <a href={releaseUrl} className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">{copy.releaseNotes}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a>}
          </div>
          {state.status !== "ready" && <p role={state.status === "error" ? "alert" : "status"} className="mt-6 rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm leading-relaxed text-muted-foreground">{state.status === "loading" ? copy.loading : copy.error}</p>}
        </header>
        <section aria-labelledby="download-platforms" className="mt-14">
          <h2 id="download-platforms" className="text-xl font-medium tracking-tight">{copy.platforms}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.architecture}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{PLATFORMS.map(platform => <PlatformCard key={platform.key} platform={platform} state={state} copy={copy} />)}</div>
        </section>
        <section className="mt-12 grid gap-6 border-t border-border pt-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-1 p-6 sm:p-7">
            <BookOpen className="mb-5 h-5 w-5 text-brand-cyan" aria-hidden="true" /><h2 className="text-xl font-medium">{copy.learnTitle}</h2>
            <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">{copy.learnBody}</p>
            <Button asChild variant="outline" className="rounded-full"><Link to="/docs/getting-started">{content.nav.docs}<ArrowRight aria-hidden="true" /></Link></Button>
          </div>
          <div className="rounded-2xl border border-border bg-surface-1 p-6 sm:p-7">
            <Github className="mb-5 h-5 w-5 text-brand-cyan" aria-hidden="true" /><h2 className="text-xl font-medium">{copy.source}</h2>
            <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">{copy.sourceBody}</p>
            <Button asChild variant="outline" className="rounded-full"><a href={SOURCE_URL}>{content.nav.github}<ExternalLink aria-hidden="true" /></a></Button>
          </div>
        </section>
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border px-5 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">{copy.supportBody}</p>
          <a href="https://ko-fi.com/D1D81Y002C" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-brand-cyan underline-offset-4 hover:underline"><Coffee className="h-4 w-4" aria-hidden="true" />{copy.support}</a>
        </div>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{copy.back}</Link>
      </main>
      <FooterSection />
    </div>
  );
}
