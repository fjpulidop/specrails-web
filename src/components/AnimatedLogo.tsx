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
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      init();
      // Re-measure after layout fully settles (images, lazy content, etc.)
      setTimeout(init, 200);
    });

    // Trigger fade-in (replicate hero animate-fade-up timing)
    requestAnimationFrame(() => setFadeIn(true));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(rafId.current);
      // Restore navbar logo when unmounted
      if (navLogoEl) navLogoEl.style.opacity = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed z-[60] pointer-events-none font-mono font-bold whitespace-nowrap text-5xl md:text-7xl"
      style={{
        transformOrigin: "top center",
        willChange: "transform",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.6s ease-out",
      }}
    >
      <span className="text-dracula-purple">spec</span>
      <span className="text-dracula-pink">rails</span>
    </div>
  );
};

export default AnimatedLogo;
