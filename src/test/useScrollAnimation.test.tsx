import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// IntersectionObserver is not available in jsdom — provide a controllable mock.
type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;
let observerCallback: ObserverCallback | null = null;
let observedElement: Element | null = null;

const mockObserver = {
  observe: vi.fn((el: Element) => { observedElement = el; }),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
};

beforeEach(() => {
  observerCallback = null;
  observedElement = null;
  mockObserver.observe.mockClear();
  mockObserver.unobserve.mockClear();
  mockObserver.disconnect.mockClear();

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn((cb: ObserverCallback) => {
      observerCallback = cb;
      return mockObserver;
    })
  );
});

describe("useScrollAnimation", () => {
  it("starts with isVisible = false", () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.isVisible).toBe(false);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref).toHaveProperty("current");
  });

  it("sets isVisible to true when the element intersects", () => {
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      if (observerCallback) {
        observerCallback([
          { isIntersecting: true, target: document.createElement("div") } as IntersectionObserverEntry,
        ]);
      }
    });

    expect(result.current.isVisible).toBe(true);
  });

  it("does not set isVisible when isIntersecting is false", () => {
    const { result } = renderHook(() => useScrollAnimation());

    act(() => {
      if (observerCallback) {
        observerCallback([
          { isIntersecting: false, target: document.createElement("div") } as IntersectionObserverEntry,
        ]);
      }
    });

    expect(result.current.isVisible).toBe(false);
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = renderHook(() => useScrollAnimation());
    unmount();
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });
});
