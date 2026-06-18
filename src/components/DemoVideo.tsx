import { useEffect, useRef, useState, type ElementType } from "react";
import { Play } from "lucide-react";
import { ProductFrame } from "@/components/ProductFrame";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface DemoVideoProps {
  /** Title-bar label on the window frame. */
  label: string;
  /** Real screenshot shown as the poster / placeholder background. */
  poster?: string;
  /**
   * Path to the demo clip WITHOUT extension, e.g. "/demos/hub-rails".
   * When the .webm/.mp4 files are dropped in public/demos/, flip `ready` to
   * true and the clip autoplays (muted, looped) on scroll-into-view.
   */
  srcBase?: string;
  /** Set true once the video files exist. While false, a placeholder shows. */
  ready?: boolean;
  glow?: boolean;
  /** Icon for the branded placeholder when there's no poster yet. */
  icon?: ElementType;
  /** Short caption for the placeholder badge. */
  placeholderText?: string;
  aspectRatio?: string;
}

/**
 * A product-framed demo slot. Today it renders a placeholder (real screenshot
 * poster + a play badge); as soon as the matching clip exists in public/demos/
 * and `ready` is set, it becomes an autoplaying muted loop that plays when it
 * scrolls into view and pauses out of view (reduced-motion → poster only).
 */
export function DemoVideo({
  label,
  poster,
  srcBase,
  ready = false,
  glow = false,
  icon: Icon,
  placeholderText = "Demo video",
  aspectRatio = "16 / 10",
}: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const showVideo = ready && !!srcBase && !reduced;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <ProductFrame chrome="mac" label={label} glow={glow} aspectRatio={aspectRatio} bodyClassName="h-full">
      {showVideo ? (
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover object-top"
        >
          <source src={`${srcBase}.webm`} type="video/webm" />
          <source src={`${srcBase}.mp4`} type="video/mp4" />
        </video>
      ) : poster ? (
        <img
          src={poster}
          alt={label}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-1 text-muted-foreground">
          {Icon && <Icon className="h-10 w-10 text-brand-cyan/70" aria-hidden="true" />}
        </div>
      )}

      {/* Play badge / placeholder affordance (hidden once the clip is playing) */}
      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium",
              "bg-surface-0/70 text-foreground ring-1 ring-border/70 backdrop-blur-sm",
            )}
          >
            <Play className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
            {placeholderText}
          </span>
        </div>
      )}
    </ProductFrame>
  );
}

export default DemoVideo;
