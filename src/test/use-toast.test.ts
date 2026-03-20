import { describe, it, expect } from "vitest";
import { reducer } from "@/hooks/use-toast";

const makeToast = (id: string) => ({
  id,
  open: true,
  title: `Toast ${id}`,
});

describe("toast reducer", () => {
  const empty = { toasts: [] };

  it("ADD_TOAST adds a toast to an empty state", () => {
    const state = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe("1");
  });

  it("ADD_TOAST enforces TOAST_LIMIT of 1", () => {
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const withTwo = reducer(withOne, {
      type: "ADD_TOAST",
      toast: makeToast("2"),
    });
    expect(withTwo.toasts).toHaveLength(1);
    expect(withTwo.toasts[0].id).toBe("2");
  });

  it("UPDATE_TOAST patches an existing toast by id", () => {
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const updated = reducer(withOne, {
      type: "UPDATE_TOAST",
      toast: { id: "1", title: "Updated" },
    });
    expect(updated.toasts[0].title).toBe("Updated");
  });

  it("UPDATE_TOAST leaves unrelated toasts unchanged", () => {
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const updated = reducer(withOne, {
      type: "UPDATE_TOAST",
      toast: { id: "999", title: "Nope" },
    });
    expect(updated.toasts[0].title).toBe("Toast 1");
  });

  it("DISMISS_TOAST with id sets open=false for that toast", () => {
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const dismissed = reducer(withOne, {
      type: "DISMISS_TOAST",
      toastId: "1",
    });
    expect(dismissed.toasts[0].open).toBe(false);
  });

  it("DISMISS_TOAST without id dismisses all toasts", () => {
    // TOAST_LIMIT=1 so only one can exist; still verify the behaviour
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const dismissed = reducer(withOne, { type: "DISMISS_TOAST" });
    expect(dismissed.toasts.every((t) => t.open === false)).toBe(true);
  });

  it("REMOVE_TOAST with id removes only that toast", () => {
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const removed = reducer(withOne, {
      type: "REMOVE_TOAST",
      toastId: "1",
    });
    expect(removed.toasts).toHaveLength(0);
  });

  it("REMOVE_TOAST without id clears all toasts", () => {
    const withOne = reducer(empty, {
      type: "ADD_TOAST",
      toast: makeToast("1"),
    });
    const removed = reducer(withOne, { type: "REMOVE_TOAST" });
    expect(removed.toasts).toHaveLength(0);
  });
});
