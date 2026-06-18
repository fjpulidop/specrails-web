import { useEffect, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
interface MeshNode {
  bx: number; by: number;
  phase: number; freq: number; amp: number;
}

// Projected position (reused per-frame)
export interface NP { sx: number; sy: number; scale: number; }

// Ambient light pulse riding a single rail row.
interface RailPulse {
  row: number;          // which horizontal rail it travels along
  x: number;            // base-space x position of the pulse head
  speed: number;        // px/s in base space
  len: number;          // tail length in base-space px
  r: number; g: number; b: number;
  intensity: number;    // 0..1 brightness multiplier
}

// ── Constants ──────────────────────────────────────────────────────────────
const PAD = 2;
const SPACING_BASE = 36;       // desktop node spacing
const SPACING_MOBILE = 48;     // sparser on narrow screens
const MOBILE_W = 640;
const SPHERE_R = 420, SPHERE_D = 150, PERSP = 900;
const DPR_CAP = 1.5;

const N_PULSES_DESKTOP = 7;
const N_PULSES_MOBILE = 4;

// ── Exported projection function (testable) ────────────────────────────────
export function computePositions(
  nodes: MeshNode[],
  mouseX: number,
  mouseY: number,
  out: { sx: number; sy: number; scale: number }[],
  W: number,
  H: number,
): void {
  const cx = W / 2, cy = H / 2;
  const t = performance.now() / 1000;
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const dx = n.bx - mouseX, dy = n.by - mouseY;
    const raw = 1 - Math.sqrt(dx * dx + dy * dy) / SPHERE_R;
    const sc_ = Math.max(0, Math.min(1, raw));
    const s = sc_ * sc_ * (3 - 2 * sc_); // smoothstep
    const z = -SPHERE_D * s * s + Math.sin(t * n.freq + n.phase) * n.amp;
    const sc = PERSP / (PERSP - z);
    const p = out[i];
    p.sx = cx + (n.bx - cx) * sc;
    p.sy = cy + (n.by - cy) * sc;
    p.scale = z < 0 ? -z / SPHERE_D : 0;
  }
}

// ── Component ──────────────────────────────────────────────────────────────
export function HeroMesh(_props: Record<string, never>): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // All mutable engine state lives here — never in React state
    let W = 1, H = 1, COLS = 1, ROWS = 1, SPACING = SPACING_BASE;
    let dpr = 1;
    let nodes: MeshNode[] = [], np: { sx: number; sy: number; scale: number }[] = [];
    let pulses: RailPulse[] = [];
    let lastT = 0, mx = -9999, my = -9999, tmx = -9999, tmy = -9999;
    let running = false, inView = true, rafId = 0;

    // Cached theme-derived state — re-read only on theme change / visibility / resize.
    let palette: [number, number, number][] = [
      [28, 203, 226],   // brand-cyan fallback
      [163, 116, 219],  // brand-violet fallback
    ];
    let rail: [number, number, number] = [122, 127, 150]; // --rail #7a7f96 fallback
    let isLight = false;

    // HSL triplet ("188 78% 52%") → RGB. Tokens are authored as CSS HSL components.
    function hslTripletToRgb(raw: string): [number, number, number] {
      const parts = raw.split(/\s+/);
      const h = parseFloat(parts[0]);
      const sat = parseFloat(parts[1]);
      const l = parseFloat(parts[2]);
      if (!Number.isFinite(h) || !Number.isFinite(sat) || !Number.isFinite(l)) {
        return [128, 128, 128];
      }
      const a = (sat / 100) * Math.min(l / 100, 1 - l / 100);
      const f = (n: number): number => {
        const k = (n + h / 30) % 12;
        return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      };
      return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    }

    // Read brand + rail tokens once; called only on theme/visibility/resize changes.
    function readPalette(): void {
      const s = getComputedStyle(document.documentElement);
      const cyan = hslTripletToRgb(s.getPropertyValue('--brand-cyan').trim());
      const violet = hslTripletToRgb(s.getPropertyValue('--brand-violet').trim());
      palette = [cyan, violet];
      rail = hslTripletToRgb(s.getPropertyValue('--rail').trim());
      isLight = document.documentElement.dataset.theme === 'light';
    }

    function buildNodes(): void {
      nodes = []; np = [];
      const ox = (W - (COLS - 1) * SPACING) / 2;
      const oy = (H - (ROWS - 1) * SPACING) / 2;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          nodes.push({
            bx: ox + c * SPACING, by: oy + r * SPACING,
            phase: Math.random() * Math.PI * 2,
            freq: 0.18 + Math.random() * 0.22,
            amp: 2 + Math.random() * 4,
          });
          np.push({ sx: 0, sy: 0, scale: 0 });
        }
      }
    }

    function spawnPulse(seeded: boolean): RailPulse {
      const col = palette[Math.floor(Math.random() * palette.length)];
      return {
        row: Math.floor(Math.random() * ROWS),
        x: seeded ? Math.random() * W : -(80 + Math.random() * 200),
        speed: 60 + Math.random() * 120,
        len: 70 + Math.random() * 90,
        r: col[0], g: col[1], b: col[2],
        intensity: 0.55 + Math.random() * 0.45,
      };
    }

    function resetPulse(p: RailPulse): void {
      const col = palette[Math.floor(Math.random() * palette.length)];
      p.row = Math.floor(Math.random() * ROWS);
      p.x = -(80 + Math.random() * 200);
      p.speed = 60 + Math.random() * 120;
      p.len = 70 + Math.random() * 90;
      p.r = col[0]; p.g = col[1]; p.b = col[2];
      p.intensity = 0.55 + Math.random() * 0.45;
    }

    function initPulses(): void {
      const count = W < MOBILE_W ? N_PULSES_MOBILE : N_PULSES_DESKTOP;
      pulses = [];
      for (let i = 0; i < count; i++) pulses.push(spawnPulse(true));
    }

    function resize(): void {
      const heroEl = canvas.parentElement;
      if (!heroEl) return;
      readPalette();
      const cssW = heroEl.clientWidth || window.innerWidth;
      const cssH = heroEl.clientHeight || window.innerHeight;
      dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1);
      // CSS size stays at 100% via the class; back the canvas with a capped DPR buffer.
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = cssW; H = cssH;
      SPACING = cssW < MOBILE_W ? SPACING_MOBILE : SPACING_BASE;
      COLS = Math.ceil(W / SPACING) + 1 + PAD * 2;
      ROWS = Math.ceil(H / SPACING) + 1 + PAD * 2;
      buildNodes(); initPulses();
    }

    // Interpolated screen position of a point on a horizontal rail row.
    function railPos(row: number, px: number): { x: number; y: number } | null {
      if (row < 0 || row >= ROWS) return null;
      const base = row * COLS;
      const fn = nodes[base]; if (!fn) return null;
      const colF = (px - fn.bx) / SPACING;
      const c0 = Math.max(0, Math.min(COLS - 2, Math.floor(colF)));
      const frac = Math.max(0, Math.min(1, colF - c0));
      const pa = np[base + c0], pb = np[base + c0 + 1];
      if (!pa || !pb) return null;
      return { x: pa.sx + (pb.sx - pa.sx) * frac, y: pa.sy + (pb.sy - pa.sy) * frac };
    }

    function updatePulses(dt: number): void {
      const offRight = W + 240;
      for (const p of pulses) {
        p.x += p.speed * dt;
        if (p.x - p.len > offRight) resetPulse(p);
      }
    }

    function draw(t: number): void {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      const nodeCount = nodes.length;
      // Project positions (inlined for the hot path)
      const cx = W / 2, cy = H / 2;
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const dx = n.bx - mx, dy = n.by - my;
        const raw = 1 - Math.sqrt(dx * dx + dy * dy) / SPHERE_R;
        const sc_ = Math.max(0, Math.min(1, raw));
        const s = sc_ * sc_ * (3 - 2 * sc_);
        const z = -SPHERE_D * s * s + Math.sin(t * n.freq + n.phase) * n.amp;
        const sc = PERSP / (PERSP - z);
        const p = np[i];
        p.sx = cx + (n.bx - cx) * sc;
        p.sy = cy + (n.by - cy) * sc;
        p.scale = z < 0 ? -z / SPHERE_D : 0;
      }

      // Neutral graphic rails sourced from the --rail token, theme-tuned alpha.
      const rc = `${rail[0]},${rail[1]},${rail[2]}`;
      const lineAlpha = isLight ? 0.2 : 0.12;
      const dotAlpha = isLight ? 0.26 : 0.16;

      // Batched rail lines
      ctx.strokeStyle = `rgba(${rc},${lineAlpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let r = 0; r < ROWS; r++) {
        const row = r * COLS;
        for (let c = 0; c < COLS - 1; c++) {
          const p = np[row + c], pr2 = np[row + c + 1];
          ctx.moveTo(p.sx, p.sy); ctx.lineTo(pr2.sx, pr2.sy);
        }
      }
      ctx.stroke();

      // Batched node dots
      ctx.fillStyle = `rgba(${rc},${dotAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < nodeCount; i++) {
        const p = np[i];
        ctx.moveTo(p.sx + 1.2, p.sy);
        ctx.arc(p.sx, p.sy, 1.2, 0, Math.PI * 2);
      }
      ctx.fill();

      // Ambient light pulses gliding along the rails.
      // Each pulse = a soft glowing head with a short fading tail traced along
      // the (mouse-distorted) rail, sampled in base space and re-projected.
      const TAIL_SEGS = 10;
      const headBoost = isLight ? 0.85 : 1;
      ctx.save();
      ctx.lineCap = 'round';
      for (const p of pulses) {
        const col = `${p.r},${p.g},${p.b}`;
        // Tail: from behind the head up to the head, fading out toward the back.
        ctx.shadowColor = `rgb(${col})`;
        for (let seg = 0; seg < TAIL_SEGS; seg++) {
          const x0 = p.x - p.len * (seg / TAIL_SEGS);
          const x1 = p.x - p.len * ((seg + 1) / TAIL_SEGS);
          const a0 = railPos(p.row, x0);
          const a1 = railPos(p.row, x1);
          if (!a0 || !a1) continue;
          if (a0.x < -p.len || a0.x > W + p.len) continue;
          const fade = 1 - seg / TAIL_SEGS;       // brightest at the head
          const alpha = fade * fade * 0.5 * p.intensity * headBoost;
          if (alpha <= 0.004) continue;
          ctx.strokeStyle = `rgba(${col},${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.8 + fade * 1.6;
          ctx.shadowBlur = 4 + fade * 8;
          ctx.beginPath();
          ctx.moveTo(a0.x, a0.y);
          ctx.lineTo(a1.x, a1.y);
          ctx.stroke();
        }
        // Glowing head dot.
        const head = railPos(p.row, p.x);
        if (head && head.x >= -8 && head.x <= W + 8) {
          ctx.shadowBlur = 14;
          ctx.fillStyle = `rgba(${col},${(0.9 * p.intensity * headBoost).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // ── Lifecycle ──
    const heroEl = canvas.closest('[data-hero]') as HTMLElement | null
                ?? canvas.parentElement;

    function start(): void {
      if (running || !inView || document.hidden) return;
      running = true; lastT = 0;
      rafId = requestAnimationFrame(loop);
    }
    function stop(): void { running = false; cancelAnimationFrame(rafId); }

    function loop(): void {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, lastT > 0 ? now - lastT : 0.016); lastT = now;
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      updatePulses(dt);
      draw(now);
      rafId = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent): void {
      const rc = canvas.getBoundingClientRect();
      tmx = e.clientX - rc.left; tmy = e.clientY - rc.top;
    }
    function onMouseLeave(): void { tmx = -9999; tmy = -9999; }
    function onVisibility(): void {
      if (document.hidden) { stop(); }
      else { readPalette(); start(); }
    }
    function onResize(): void { resize(); }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (es) => { inView = es[0].isIntersecting; if (inView) { start(); } else { stop(); } },
      { threshold: 0.01 },
    );

    // Re-read the palette whenever the theme toggles (data-theme on <html>).
    const themeObserver = new MutationObserver(() => {
      readPalette();
      if (reducedMotion && !running) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    const timeoutId = setTimeout(() => {
      resize();
      if (reducedMotion) {
        draw(0);
      } else {
        start();
        if (heroEl) io.observe(heroEl);
      }
    }, 60);

    heroEl?.addEventListener('mousemove', onMouseMove);
    heroEl?.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timeoutId);
      stop();
      io.disconnect();
      themeObserver.disconnect();
      heroEl?.removeEventListener('mousemove', onMouseMove);
      heroEl?.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default HeroMesh;
