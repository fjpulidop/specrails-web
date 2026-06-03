import { useEffect, useRef, useState } from "react";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const TRANSITION_PX = 300;

const AnimatedLogo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const [fadeIn, setFadeIn] = useState(false);

  // One-shot "chip-seating" flash, replayed each time the logo re-docks.
  const [seatFlare, setSeatFlare] = useState(0);
  const docked = useRef(false);

  // Hero doc-relative position
  const heroDocTop = useRef(0);
  const heroCenterX = useRef(0);
  const heroWidth = useRef(0);

  // Nav viewport-relative position (nav is fixed)
  const navTop = useRef(0);
  const navCenterX = useRef(0);
  const navWidth = useRef(0);
  const navHeight = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const navLogoEl = document.querySelector('[data-logo="nav"]') as HTMLElement | null;

    // Hide real navbar logo while this component is mounted
    if (navLogoEl) navLogoEl.style.opacity = "0";

    const measure = () => {
      const heroEl = document.querySelector('[data-logo="hero"]') as HTMLElement | null;
      if (!heroEl || !navLogoEl) return;

      const hr = heroEl.getBoundingClientRect();
      const nr = navLogoEl.getBoundingClientRect();

      heroDocTop.current = hr.top + window.scrollY;
      heroCenterX.current = hr.left + hr.width / 2;
      heroWidth.current = hr.width;

      navTop.current = nr.top;
      navCenterX.current = nr.left + nr.width / 2;
      navWidth.current = nr.width;
      navHeight.current = nr.height;
    };

    const update = () => {
      const scrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1, scrollY / TRANSITION_PX));
      const t = easeInOutCubic(progress);

      // Scale relative to the logo's OWN native width so it lands at exactly
      // the nav placeholder size. (heroWidth is the big invisible <h1>; using it
      // here would shrink the logo far below the navbar slot.)
      const nativeWidth = el.offsetWidth || navWidth.current;
      const scale = lerp(1, navWidth.current / nativeWidth, t);

      // Hero position in viewport
      const heroViewTop = heroDocTop.current - scrollY;

      // Nav target: vertically center the scaled text with the nav placeholder
      const scaledHeight = el.offsetHeight * scale;
      const navTargetTop = navTop.current + (navHeight.current - scaledHeight) / 2;

      const top = lerp(heroViewTop, navTargetTop, t);
      const centerX = lerp(heroCenterX.current, navCenterX.current, t);

      el.style.top = `${top}px`;
      el.style.left = `${centerX}px`;
      el.style.transform = `translateX(-50%) scale(${scale})`;

      // Fire the seat flash once the logo fully settles into the navbar slot;
      // arm it again after scrolling back up so it can replay on re-dock.
      if (progress > 0.992) {
        if (!docked.current) {
          docked.current = true;
          setSeatFlare((n) => n + 1);
        }
      } else if (progress < 0.5) {
        docked.current = false;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    const init = () => {
      measure();
      update();
    };

    // Measure after fonts load, then re-measure shortly after to catch layout settling
    let mounted = true;
    let settleTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (!mounted) return;
      init();
      // Re-measure after layout fully settles (images, lazy content, etc.)
      settleTimeoutId = setTimeout(() => {
        if (mounted) init();
      }, 200);
    });

    // Trigger fade-in (replicate hero animate-fade-up timing)
    const fadeInRafId = requestAnimationFrame(() => setFadeIn(true));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", init);

    return () => {
      mounted = false;
      clearTimeout(settleTimeoutId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(rafId.current);
      cancelAnimationFrame(fadeInRafId);
      // Restore navbar logo when unmounted
      if (navLogoEl) navLogoEl.style.opacity = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed z-[60] pointer-events-none"
      style={{
        transformOrigin: "top center",
        willChange: "transform",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.6s ease-out",
      }}
    >
      <svg
        viewBox="0 0 188 64"
        height="56"
        width="auto"
        aria-hidden="true"
        focusable="false"
        overflow="visible"
        style={{ display: 'block' }}
      >
        <defs>
          <filter id="logo-seat-glow" x="-30%" y="-150%" width="160%" height="400%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
        </defs>
        <rect x="4" y="6" width="180" height="6" rx="3"
              fill="hsl(var(--foreground))" opacity="0.16" />
        <rect x="4" y="18" width="180" height="28" rx="14"
              fill="hsl(var(--foreground))" />
        <text
          x="94" y="32.5"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
          fontSize="20"
          textAnchor="middle"
          dominantBaseline="central"
          fill="hsl(var(--background))"
          letterSpacing="0.5"
        >specrails</text>
        <rect x="4" y="52" width="180" height="6" rx="3"
              fill="hsl(var(--foreground))" opacity="0.16" />

        {/* Chip-seating flash — replays via key on each re-dock */}
        {seatFlare > 0 && (
          <g key={seatFlare}>
            <rect
              x="4" y="18" width="180" height="28" rx="14"
              fill="none"
              stroke="hsl(var(--accent-cyan))"
              strokeWidth="5"
              filter="url(#logo-seat-glow)"
              className="logo-seat-glow"
            />
            <rect
              x="4" y="18" width="180" height="28" rx="14"
              fill="none"
              stroke="hsl(var(--dracula-cyan))"
              strokeWidth="2"
              className="logo-seat-rim"
            />
            <rect
              x="4" y="18" width="180" height="28" rx="14"
              fill="none"
              stroke="hsl(var(--dracula-cyan))"
              strokeWidth="1.6"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="16 84"
              className="logo-seat-beam"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default AnimatedLogo;
