import { useEffect, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
interface MeshNode {
  bx: number; by: number;
  phase: number; freq: number; amp: number;
}

// Projected position (reused per-frame)
export interface NP { sx: number; sy: number; scale: number; }

interface SpecBeam {
  row: number; x: number; speed: number;
  r: number; g: number; b: number;
  label: string;
  lit: boolean; litTimer: number; litPerimT: number;
}

interface AgentBolt {
  path: { r: number; c: number }[];
  agent: string;
  alpha: number; peakReached: boolean; decay: number;
  agentProgress: number; agentSpeed: number;
  perimT: number; perimRate: number;
  r: number; g: number; b: number;
}

// ── Constants ──────────────────────────────────────────────────────────────
const PAD = 2;
const SPACING = 36;
const SPHERE_R = 420, SPHERE_D = 150, PERSP = 900;
const N_BEAMS = 18, TAIL_PX = 110;
const N_BOLTS = 3, BOLT_SPAWN_RATE = 0.7;

const AGENT_NAMES = [
  'Full-Stack Dev', 'Architect', 'Reviewer', 'Security',
  'Backend Dev', 'Frontend Dev', 'Merger', 'Product Mgr', 'Product Analyst',
];

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
    let W = 1, H = 1, COLS = 1, ROWS = 1;
    let nodes: MeshNode[] = [], np: { sx: number; sy: number; scale: number }[] = [];
    let beams: SpecBeam[] = [], bolts: AgentBolt[] = [];
    const activeAgents = new Set<string>();
    let lastT = 0, mx = -9999, my = -9999, tmx = -9999, tmy = -9999;
    let running = false, inView = true, rafId = 0;

    // palette read from CSS tokens at runtime
    function readPalette(): [number, number, number][] {
      const s = getComputedStyle(document.documentElement);
      return [
        '--dracula-cyan', '--dracula-green', '--dracula-purple',
        '--dracula-pink', '--dracula-yellow',
      ].map((v) => {
        const raw = s.getPropertyValue(v).trim(); // e.g. "191 97% 77%"
        const parts = raw.split(' ');
        const h = parseFloat(parts[0]);
        const sat = parseFloat(parts[1]);
        const l = parseFloat(parts[2]);
        // Convert HSL → approximate RGB
        const a = (sat / 100) * Math.min(l / 100, 1 - l / 100);
        const f = (n: number) => {
          const k = (n + h / 30) % 12;
          return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        };
        return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)] as [number, number, number];
      });
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

    function spawnBeam(initX?: number): SpecBeam {
      const palette = readPalette();
      const col = palette[Math.floor(Math.random() * palette.length)];
      return {
        row: Math.floor(Math.random() * ROWS),
        x: initX !== undefined ? initX : -(220 + Math.random() * 120),
        speed: 50 + Math.random() * 130,
        r: col[0], g: col[1], b: col[2],
        label: 'Spec ' + (Math.floor(Math.random() * 400) + 1),
        lit: false, litTimer: 0, litPerimT: 0,
      };
    }

    function initBeams(): void {
      beams = [];
      for (let i = 0; i < N_BEAMS; i++) beams.push(spawnBeam(Math.random() * (W + TAIL_PX)));
    }

    function makeBoltPath(startCol: number): { r: number; c: number }[] {
      const path: { r: number; c: number }[] = [];
      let r = 0, c = Math.max(PAD, Math.min(COLS - PAD - 1, startCol));
      path.push({ r, c });
      while (r < ROWS - 1) {
        if (Math.random() < 0.38) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          const steps = 1 + Math.floor(Math.random() * 2);
          for (let s = 0; s < steps; s++) {
            const nc = Math.max(PAD, Math.min(COLS - PAD - 1, c + dir));
            if (nc !== c) { c = nc; path.push({ r, c }); }
          }
        }
        r++; path.push({ r, c });
      }
      return path;
    }

    function newBolt(): AgentBolt | null {
      const av = AGENT_NAMES.filter((a) => !activeAgents.has(a));
      if (!av.length) return null;
      const agent = av[Math.floor(Math.random() * av.length)];
      activeAgents.add(agent);
      const palette = readPalette();
      const col = palette[Math.floor(Math.random() * palette.length)];
      const visMin = PAD + 1, visMax = COLS - PAD - 2;
      const startCol = visMin + Math.floor(Math.random() * (visMax - visMin));
      return {
        path: makeBoltPath(startCol),
        agent, alpha: 0, peakReached: false,
        decay: 0.32 + Math.random() * 0.28,
        agentProgress: 0, agentSpeed: 1.5 + Math.random() * 1.8,
        perimT: 0, perimRate: 0.45 + Math.random() * 0.3,
        r: col[0], g: col[1], b: col[2],
      };
    }

    function initBolts(): void {
      bolts = []; activeAgents.clear();
      for (let i = 0; i < 2; i++) {
        const b = newBolt();
        if (b) { b.agentProgress = Math.random() * b.path.length * 0.5; bolts.push(b); }
      }
    }

    function resize(): void {
      const heroEl = canvas.parentElement;
      if (!heroEl) return;
      W = canvas.width = heroEl.clientWidth || window.innerWidth;
      H = canvas.height = heroEl.clientHeight || window.innerHeight;
      COLS = Math.ceil(W / SPACING) + 1 + PAD * 2;
      ROWS = Math.ceil(H / SPACING) + 1 + PAD * 2;
      buildNodes(); initBeams(); initBolts();
    }

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

    function pathPosAt(path: { r: number; c: number }[], progress: number): { x: number; y: number } | null {
      const i = Math.min(Math.floor(progress), path.length - 2);
      const f = Math.max(0, Math.min(1, progress - i));
      const a = path[i], b2 = path[i + 1];
      const pa = np[a.r * COLS + a.c], pb = np[b2.r * COLS + b2.c];
      if (!pa || !pb) return null;
      return { x: pa.sx + (pb.sx - pa.sx) * f, y: pa.sy + (pb.sy - pa.sy) * f };
    }

    function smoothPosAt(path: { r: number; c: number }[], progress: number, win = 8): { x: number; y: number } | null {
      let sx = 0, sy = 0, sw = 0;
      for (let i = -win; i <= win; i++) {
        const pp = Math.max(0, Math.min(path.length - 2, progress + i));
        const pos = pathPosAt(path, pp); if (!pos) continue;
        const w = Math.exp(-(i * i) / (win * win * 0.38));
        sx += pos.x * w; sy += pos.y * w; sw += w;
      }
      return sw > 0 ? { x: sx / sw, y: sy / sw } : null;
    }

    function perimPos(bx: number, by: number, bw: number, bh: number, d: number): { x: number; y: number } {
      const perim = 2 * (bw + bh);
      d = ((d % perim) + perim) % perim;
      if (d < bw) return { x: bx + d, y: by };
      d -= bw;
      if (d < bh) return { x: bx + bw, y: by + d };
      d -= bh;
      if (d < bw) return { x: bx + bw - d, y: by + bh };
      d -= bw;
      return { x: bx, y: by + bh - d };
    }

    function updateBeams(dt: number): void {
      const palette = readPalette();
      for (const b of beams) {
        if (b.litTimer > 0) { b.litTimer = Math.max(0, b.litTimer - dt); }
        b.lit = b.litTimer > 0;
        if (b.lit) b.litPerimT = (b.litPerimT + 0.7 * dt) % 1;
        b.x += b.speed * dt;
        if (b.x > W + 200) {
          const col = palette[Math.floor(Math.random() * palette.length)];
          b.row = Math.floor(Math.random() * ROWS);
          b.x = -(220 + Math.random() * 140);
          b.speed = 50 + Math.random() * 130;
          b.r = col[0]; b.g = col[1]; b.b = col[2];
          b.label = 'Spec ' + (Math.floor(Math.random() * 400) + 1);
        }
      }
    }

    function updateBolts(dt: number): void {
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        if (!b.peakReached) {
          b.alpha = Math.min(1, b.alpha + 1.2 * dt);
          if (b.alpha >= 1) b.peakReached = true;
        } else {
          b.alpha = Math.max(0, b.alpha - b.decay * dt);
        }
        b.agentProgress = Math.min(b.path.length - 1, b.agentProgress + b.agentSpeed * dt);
        b.perimT += b.perimRate * dt;
        if (b.alpha <= 0 && b.agentProgress >= b.path.length - 1) {
          activeAgents.delete(b.agent); bolts.splice(i, 1);
        }
      }
      if (bolts.length < N_BOLTS && Math.random() < BOLT_SPAWN_RATE * dt) {
        const b = newBolt(); if (b) bolts.push(b);
      }
    }

    function draw(t: number): void {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      const nodeCount = nodes.length;
      // Project positions
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

      const isLight = document.documentElement.dataset.theme === 'light';
      const lc = isLight ? '0,0,0' : '255,255,255';
      const baseAlpha = isLight ? 0.15 : 0.08;

      // Batched rail lines
      ctx.strokeStyle = `rgba(${lc},${baseAlpha})`;
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
      ctx.fillStyle = `rgba(${lc},${isLight ? 0.18 : 0.1})`;
      ctx.beginPath();
      for (let i = 0; i < nodeCount; i++) {
        const p = np[i];
        ctx.moveTo(p.sx + 1.2, p.sy);
        ctx.arc(p.sx, p.sy, 1.2, 0, Math.PI * 2);
      }
      ctx.fill();

      // Draw agent bolts (sets beam.lit collision)
      for (const b of bolts) {
        const agPos = smoothPosAt(b.path, b.agentProgress, 9);
        if (agPos && agPos.y >= -10 && agPos.y <= H + 10) {
          ctx.font = '600 10px "JetBrains Mono",monospace';
          ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
          ctx.save(); ctx.globalAlpha = 1;
          const nx = Math.min(W - 160, Math.max(8, agPos.x + 8));
          const tw = ctx.measureText(b.agent).width;
          const pad = 7, bh = 16;
          const rx = nx - pad, ry = agPos.y - bh / 2 - pad, rw = tw + pad * 2, rht = bh + pad * 2;
          ctx.strokeStyle = `rgba(${b.r},${b.g},${b.b},0.2)`;
          ctx.lineWidth = 0.8; ctx.shadowBlur = 0;
          ctx.strokeRect(rx, ry, rw, rht);
          const perim = 2 * (rw + rht);
          const trail = perim * 0.32;
          const headD = (b.perimT % 1) * perim;
          const STEPS = 18;
          ctx.shadowColor = `rgb(${b.r},${b.g},${b.b})`;
          ctx.shadowBlur = 7; ctx.lineWidth = 1.8;
          for (let s2 = 0; s2 < STEPS; s2++) {
            const d0 = headD - trail * (s2 / STEPS);
            const d1 = headD - trail * ((s2 + 1) / STEPS);
            const p0 = perimPos(rx, ry, rw, rht, d0);
            const p1 = perimPos(rx, ry, rw, rht, d1);
            const a = (1 - s2 / STEPS) * 0.9;
            ctx.strokeStyle = `rgba(${b.r},${b.g},${b.b},${a.toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
          }
          ctx.shadowColor = `rgb(${b.r},${b.g},${b.b})`;
          ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(${b.r},${b.g},${b.b},0.95)`;
          ctx.fillText(b.agent, nx, agPos.y);
          ctx.restore();
        }

        // Collision detection
        ctx.font = '500 11px "JetBrains Mono",monospace';
        ctx.textBaseline = 'middle';
        const agNow = smoothPosAt(b.path, b.agentProgress, 9);
        if (agNow) {
          for (const sp of beams) {
            const spos = railPos(sp.row, sp.x);
            if (!spos) continue;
            const stw = ctx.measureText(sp.label).width;
            const scx = spos.x + stw / 2;
            if (Math.abs(agNow.y - spos.y) < 22 && Math.abs(agNow.x - scx) < 90) {
              sp.litTimer = 3.0;
            }
          }
        }
      }

      // Draw spec beams
      ctx.font = '500 11px "JetBrains Mono",monospace';
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      for (const b of beams) {
        const pos = railPos(b.row, b.x); if (!pos) continue;
        const tw = ctx.measureText(b.label).width;
        const envIn = Math.min(1, (b.x + tw + 60) / 80);
        const envOut = Math.min(1, (W - b.x) / 80);
        const env = Math.max(0, Math.min(envIn, envOut));
        if (env <= 0.01) continue;
        ctx.save(); ctx.globalAlpha = env;
        ctx.shadowColor = `rgb(${b.r},${b.g},${b.b})`;
        if (b.lit) {
          ctx.shadowBlur = 24; ctx.fillStyle = `rgba(${b.r},${b.g},${b.b},0.95)`;
          ctx.fillText(b.label, pos.x, pos.y);
          ctx.shadowBlur = 8; ctx.fillStyle = `rgb(${b.r},${b.g},${b.b})`;
          ctx.fillText(b.label, pos.x, pos.y);
          const sp = 6, sh = 14;
          const rx = pos.x - sp, ry = pos.y - sh / 2 - sp, rw = tw + sp * 2, rht = sh + sp * 2;
          ctx.strokeStyle = `rgba(${b.r},${b.g},${b.b},0.22)`;
          ctx.lineWidth = 0.8; ctx.shadowBlur = 0; ctx.strokeRect(rx, ry, rw, rht);
          const perim = 2 * (rw + rht), trail = perim * 0.32;
          const headD = b.litPerimT * perim;
          const STEPS = 16;
          ctx.shadowColor = `rgb(${b.r},${b.g},${b.b})`;
          ctx.shadowBlur = 6; ctx.lineWidth = 1.6;
          for (let s2 = 0; s2 < STEPS; s2++) {
            const d0 = headD - trail * (s2 / STEPS);
            const d1 = headD - trail * ((s2 + 1) / STEPS);
            const p0 = perimPos(rx, ry, rw, rht, d0);
            const p1 = perimPos(rx, ry, rw, rht, d1);
            const a = (1 - s2 / STEPS) * 0.85;
            ctx.strokeStyle = `rgba(${b.r},${b.g},${b.b},${a.toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
          }
        } else {
          ctx.shadowBlur = 12; ctx.fillStyle = `rgba(${b.r},${b.g},${b.b},0.45)`;
          ctx.fillText(b.label, pos.x, pos.y);
          ctx.shadowBlur = 5; ctx.fillStyle = `rgb(${b.r},${b.g},${b.b})`;
          ctx.fillText(b.label, pos.x, pos.y);
        }
        ctx.restore();
      }
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
      updateBeams(dt); updateBolts(dt);
      draw(now);
      rafId = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent): void {
      const rc = canvas.getBoundingClientRect();
      tmx = e.clientX - rc.left; tmy = e.clientY - rc.top;
    }
    function onMouseLeave(): void { tmx = -9999; tmy = -9999; }
    function onVisibility(): void { if (document.hidden) { stop(); } else { start(); } }
    function onResize(): void { resize(); }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (es) => { inView = es[0].isIntersecting; if (inView) { start(); } else { stop(); } },
      { threshold: 0.01 },
    );

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
