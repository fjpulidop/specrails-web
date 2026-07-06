import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion: reduce`, live. Mirrors HeroMesh's check so
 * JS-driven motion (autoplay, scripted showcase loops, scrollIntoView) can opt
 * out in sync with the global CSS reduced-motion contract in index.css.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
