import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

// matchMedia is already mocked in setup.ts (returns matches: false, width-agnostic).
// We override window.innerWidth per test to control the hook's behaviour.

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

beforeEach(() => {
  setViewportWidth(1024); // desktop default
});

describe("useIsMobile", () => {
  it("returns false on a desktop viewport (≥768px)", () => {
    setViewportWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true on a mobile viewport (<768px)", () => {
    setViewportWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false exactly at the breakpoint (768px)", () => {
    setViewportWidth(768);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("reacts to matchMedia change events", () => {
    setViewportWidth(1024);
    const listeners: Array<() => void> = [];

    const mql = {
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_: string, cb: () => void) => listeners.push(cb),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };

    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      setViewportWidth(375);
      listeners.forEach((cb) => cb());
    });

    expect(result.current).toBe(true);

    vi.restoreAllMocks();
  });
});
