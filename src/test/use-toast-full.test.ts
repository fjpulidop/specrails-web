import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer } from "@/hooks/use-toast";

// The module keeps global state between tests. We need to handle that carefully.

describe("toast() function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("creates a toast and returns id, dismiss, update", () => {
    const result = toast({ title: "Hello" });
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("dismiss");
    expect(result).toHaveProperty("update");
    expect(typeof result.id).toBe("string");
    expect(typeof result.dismiss).toBe("function");
    expect(typeof result.update).toBe("function");
  });

  it("returns unique ids for successive toasts", () => {
    const t1 = toast({ title: "First" });
    const t2 = toast({ title: "Second" });
    expect(t1.id).not.toBe(t2.id);
  });

  it("dismiss function marks the toast as closed", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Will be dismissed" });
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(result.current.toasts[0].id);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("update function updates the toast properties", () => {
    const { result } = renderHook(() => useToast());

    let toastResult: ReturnType<typeof toast>;
    act(() => {
      toastResult = toast({ title: "Original" });
    });
    expect(result.current.toasts[0].title).toBe("Original");

    act(() => {
      toastResult.update({ id: toastResult.id, title: "Updated" } as Parameters<typeof toastResult.update>[0]);
    });
    expect(result.current.toasts[0].title).toBe("Updated");
  });

  it("onOpenChange(false) calls dismiss", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Auto-close test" });
    });

    const theToast = result.current.toasts[0];
    expect(theToast.onOpenChange).toBeDefined();

    act(() => {
      theToast.onOpenChange!(false);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("onOpenChange(true) does not dismiss", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Stay open" });
    });

    act(() => {
      result.current.toasts[0].onOpenChange!(true);
    });
    expect(result.current.toasts[0].open).toBe(true);
  });
});

describe("useToast hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns toasts array, toast function, and dismiss function", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current).toHaveProperty("toasts");
    expect(result.current).toHaveProperty("toast");
    expect(result.current).toHaveProperty("dismiss");
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  it("reflects added toast in state", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Reflected" });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe("Reflected");
  });

  it("dismiss without id dismisses all toasts", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Dismiss all" });
    });
    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss();
    });
    expect(result.current.toasts.every((t) => t.open === false)).toBe(true);
  });

  it("cleans up listener on unmount", () => {
    const { unmount } = renderHook(() => useToast());
    // Should not throw after unmount
    expect(() => unmount()).not.toThrow();

    // Dispatching after unmount should not throw
    expect(() => {
      act(() => {
        toast({ title: "After unmount" });
      });
    }).not.toThrow();
  });
});

describe("addToRemoveQueue side effect", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("removes toast after TOAST_REMOVE_DELAY when dismissed", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Will be removed" });
    });
    const id = result.current.toasts[0].id;

    // Dismiss to start the remove queue
    act(() => {
      result.current.dismiss(id);
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].open).toBe(false);

    // Advance past TOAST_REMOVE_DELAY (1000000ms)
    act(() => {
      vi.advanceTimersByTime(1000001);
    });
    expect(result.current.toasts.length).toBe(0);
  });

  it("does not double-queue the same toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "No double queue" });
    });
    const id = result.current.toasts[0].id;

    // Dismiss twice — should not cause issues
    act(() => {
      result.current.dismiss(id);
    });
    act(() => {
      result.current.dismiss(id);
    });

    act(() => {
      vi.advanceTimersByTime(1000001);
    });
    expect(result.current.toasts.length).toBe(0);
  });
});
