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

      const scale = lerp(1, navWidth.current / heroWidth.current, t);

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
        viewBox="0 0 360 96"
        height="56"
        width="auto"
        aria-hidden="true"
        focusable="false"
        style={{ display: 'block' }}
      >
        <rect x="6" y="14" width="348" height="9" rx="4.5"
              fill="hsl(var(--foreground))" opacity="0.16" />
        <rect x="6" y="33" width="348" height="30" rx="15"
              fill="hsl(var(--foreground))" />
        <text
          x="180" y="48.5"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="500"
          fontSize="20"
          textAnchor="middle"
          dominantBaseline="central"
          fill="hsl(var(--background))"
          letterSpacing="1.5"
        >specrails</text>
        <rect x="6" y="73" width="348" height="9" rx="4.5"
              fill="hsl(var(--foreground))" opacity="0.16" />
      </svg>
    </div>
  );
};

export default AnimatedLogo;
