import { describe, it, expect, vi, beforeEach } from 'vitest';
import { computePositions } from '@/components/HeroMesh';

// Mock performance.now for deterministic output
vi.stubGlobal('performance', { now: () => 0 });

describe('computePositions', () => {
  beforeEach(() => {
    vi.stubGlobal('performance', { now: () => 0 });
  });

  const makeNode = (bx: number, by: number) => ({
    bx, by,
    phase: 0, freq: 0.2, amp: 2,
  });

  it('mutates out array in place', () => {
    const nodes = [makeNode(100, 100)];
    const out = [{ sx: 0, sy: 0, scale: 0 }];
    const outRef = out[0];
    computePositions(nodes, -9999, -9999, out, 200, 200);
    expect(out[0]).toBe(outRef); // same object
    expect(out[0].sx).not.toBe(0);
  });

  it('node far from mouse has near-zero depth (no sphere distortion)', () => {
    const nodes = [makeNode(100, 100)];
    const out = [{ sx: 0, sy: 0, scale: 0 }];
    computePositions(nodes, -9999, -9999, out, 200, 200);
    expect(out[0].scale).toBeCloseTo(0, 1);
  });

  it('node near mouse has non-zero depth', () => {
    const nodes = [makeNode(100, 100)];
    const out = [{ sx: 0, sy: 0, scale: 0 }];
    computePositions(nodes, 100, 100, out, 200, 200);
    expect(out[0].scale).toBeGreaterThan(0);
  });
});
