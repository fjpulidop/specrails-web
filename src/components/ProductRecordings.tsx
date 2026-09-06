import { useEffect, useRef, useState, type RefObject } from "react";
import { Content as ModalContent } from "@radix-ui/react-dialog";
import { ArrowUpRight, Maximize2, Pause, Play, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";
import { RECORDINGS, RECORDING_COPY, type RecordingCopy, type RecordingId } from "@/lib/recording-copy";

interface PlaybackRequest { id: RecordingId | null; revision: number }
type Recording = typeof RECORDINGS[number];

/** Mount only after an explicit playback/expand action. No preload or autoplay
 * attribute: short recordings never compete with the initial page download. */
function RecordingVideo({ recording, videoRef, full = false, request, startTime = 0, onPlaying, onError }: {
  recording: Recording;
  videoRef: RefObject<HTMLVideoElement>;
  full?: boolean;
  request: PlaybackRequest;
  startTime?: number;
  onPlaying: (playing: boolean) => void;
  onError: () => void;
}) {
  const { languageId } = useI18n();
  const label = RECORDING_COPY[languageId].clips[recording.id].title;
  const pendingStart = useRef(startTime);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (request.id === recording.id) {
      // The visitor requested playback. A browser can still require its native
      // control (e.g. media policy); retain the player and the explicit play button.
      void video.play().catch(() => { onPlaying(false); });
    } else video.pause();
    // onPlaying is an observer, not a reason to restart playback after every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.id, request.revision, recording.id]);
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (!video) return;
      video.pause();
      // StrictMode replays effects while the same media element is mounted.
      // Only release sources after a real unmount, never during that replay.
      queueMicrotask(() => {
        if (video.isConnected) return;
        video.removeAttribute("src");
        video.querySelectorAll("source").forEach(source => source.removeAttribute("src"));
        video.load();
      });
    };
  }, [videoRef]);
  return (
    <video
      ref={videoRef}
      aria-label={label}
      className={full ? "block max-h-[65vh] w-full bg-surface-0 object-contain" : "absolute inset-0 h-full w-full object-contain"}
      poster={`/product/${recording.id === "mission" ? "specrails-mission-control-preview" : recording.file}.png`}
      preload="none"
      playsInline
      muted
      controls={full}
      onPlay={() => onPlaying(true)}
      onPause={() => onPlaying(false)}
      onEnded={() => onPlaying(false)}
      onError={onError}
      onLoadedMetadata={() => {
        const video = videoRef.current;
        if (video && pendingStart.current > 0) {
          video.currentTime = Math.min(pendingStart.current, Number.isFinite(video.duration) ? video.duration : pendingStart.current);
          pendingStart.current = 0;
        }
      }}
    >
      <source src={`/product/${recording.file}.webm`} type="video/webm" />
      <source src={`/product/${recording.file}.mp4`} type="video/mp4" />
    </video>
  );
}

function RecordingCard({ recording, copy, request, requestPlayback, expand }: {
  recording: Recording;
  copy: RecordingCopy;
  request: PlaybackRequest;
  requestPlayback: (id: RecordingId | null) => void;
  expand: (id: RecordingId, time: number, trigger: HTMLButtonElement) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clip = copy.clips[recording.id];
  const play = () => {
    if (failed) { setAttempt(value => value + 1); setFailed(false); }
    setLoaded(true);
    requestPlayback(recording.id);
  };
  return (
    <article className={`group flex min-w-0 flex-col overflow-hidden rounded-frame border border-border/70 bg-surface-1 shadow-glow-elevated ${recording.id === "mission" ? "md:col-span-2" : ""}`} data-recording={recording.id}>
      {/* Original app pixels, including side panels. The main mission recording
          has more room; the expanded view adds native playback controls. */}
      <div className={`relative overflow-hidden bg-surface-0 ${recording.id === "mission" ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {loaded ? (
          <RecordingVideo key={attempt} recording={recording} videoRef={videoRef} request={request} onPlaying={setPlaying} onError={() => { setFailed(true); setPlaying(false); }} />
        ) : (
          <img src={`/product/${recording.id === "mission" ? "specrails-mission-control-preview" : recording.file}.png`} alt={clip.title} width={1440} height={recording.id === "loop" ? 854 : 900} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
        )}
        {!playing && !failed && (
          <div className="absolute inset-0 grid place-items-center bg-surface-0/10">
            <Button type="button" size="icon" variant="secondary" onClick={play} aria-label={`${copy.play}: ${clip.title}`} className="h-14 w-14 rounded-full border border-brand-cyan/40 bg-surface-1/95 text-brand-cyan shadow-glow-elevated motion-safe:transition-transform motion-safe:hover:scale-105">
              <Play className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        )}
        {failed && <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-0/95 p-6 text-center">
          <p className="text-sm text-muted-foreground">{copy.error}</p>
          <Button type="button" size="sm" variant="outline" onClick={play}><RotateCcw aria-hidden="true" />{copy.retry}</Button>
        </div>}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-border/70 bg-surface-0/90 px-2.5 py-1 font-mono text-[11px] text-foreground">{recording.duration}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{clip.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{clip.summary}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <Button type="button" size="sm" variant="ghost" className="-ml-3 text-brand-cyan" onClick={playing ? () => requestPlayback(null) : play} aria-label={`${playing ? copy.pause : copy.play}: ${clip.title}`}>
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{playing ? copy.pause : copy.play}
          </Button>
          <Button type="button" size="sm" variant="ghost" className="-mr-3 text-muted-foreground" onClick={event => expand(recording.id, videoRef.current?.currentTime ?? 0, event.currentTarget)} aria-label={`${copy.expand}: ${clip.title}`}>
            <Maximize2 aria-hidden="true" /><span>{copy.expand}</span>
          </Button>
        </div>
        <details className="mt-3 border-t border-border/50 pt-3 text-xs leading-relaxed text-muted-foreground">
          <summary className="cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{copy.transcript}</summary>
          <p className="mt-2">{clip.description}</p>
        </details>
      </div>
    </article>
  );
}

function FullRecording({ recording, time, copy }: { recording: Recording; time: number; copy: RecordingCopy }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <>
    <RecordingVideo key={attempt} recording={recording} videoRef={videoRef} full startTime={time} request={{ id: recording.id, revision: attempt }} onPlaying={() => {}} onError={() => setFailed(true)} />
    {failed && <div role="alert" className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <p>{copy.error}</p><Button variant="outline" size="sm" onClick={() => { setFailed(false); setAttempt(value => value + 1); }}>{copy.retry}</Button>
    </div>}
    <p className="text-xs text-muted-foreground">{copy.fullscreenHint}</p>
    <a href={`/product/${recording.file}.mp4`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-cyan underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{copy.openFile}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
  </>;
}

/** Real app recordings, selected by the visitor; one inline player at a time. */
export function ProductRecordings({ showHeading = true }: { showHeading?: boolean }) {
  const { languageId } = useI18n();
  const copy = RECORDING_COPY[languageId];
  const [request, setRequest] = useState<PlaybackRequest>({ id: null, revision: 0 });
  const [expanded, setExpanded] = useState<{ id: RecordingId; time: number } | null>(null);
  const expandTriggerRef = useRef<HTMLButtonElement | null>(null);
  const requestPlayback = (id: RecordingId | null) => setRequest(previous => ({ id, revision: previous.revision + 1 }));
  useEffect(() => {
    const hidden = () => { if (document.hidden) setRequest(previous => ({ id: null, revision: previous.revision + 1 })); };
    document.addEventListener("visibilitychange", hidden);
    return () => document.removeEventListener("visibilitychange", hidden);
  }, []);
  const selected = RECORDINGS.find(recording => recording.id === expanded?.id);
  return (
    <section id="recordings" aria-label={copy.eyebrow} className={showHeading ? "section-spacious" : "px-4 pb-12 sm:px-6"}>
      <div className="mx-auto max-w-6xl">
        {showHeading && <div className="mb-10 max-w-2xl">
          <p className="eyebrow text-brand-cyan">{copy.eyebrow}</p>
          <h2 className="section-heading mt-3">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy.intro}</p>
        </div>}
        <div className="grid gap-5 md:grid-cols-2">
          {RECORDINGS.map(recording => <RecordingCard key={recording.id} recording={recording} copy={copy} request={request} requestPlayback={requestPlayback} expand={(id, time, trigger) => {
            expandTriggerRef.current = trigger;
            requestPlayback(null);
            setExpanded({ id, time });
          }} />)}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
      </div>
      <Dialog open={expanded !== null} onOpenChange={open => { if (!open) setExpanded(null); }}>
        {expanded && selected && <DialogPortal>
          <DialogOverlay />
          <ModalContent onCloseAutoFocus={event => { event.preventDefault(); expandTriggerRef.current?.focus(); }} className="fixed left-1/2 top-1/2 z-50 grid max-h-[95dvh] w-[95vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-frame border border-border bg-surface-1 p-4 shadow-glow-elevated focus:outline-none sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">{copy.clips[selected.id].title}</DialogTitle>
                <p className="mt-1 text-xs text-muted-foreground">{copy.note}</p>
              </div>
              <DialogClose asChild><Button type="button" variant="ghost" size="icon" aria-label={copy.close}><X aria-hidden="true" /></Button></DialogClose>
            </div>
            <FullRecording key={selected.id} recording={selected} time={expanded.time} copy={copy} />
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">{copy.clips[selected.id].description}</DialogDescription>
          </ModalContent>
        </DialogPortal>}
      </Dialog>
    </section>
  );
}

export default ProductRecordings;
