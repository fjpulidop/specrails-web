import { act, renderHook } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import {
  downloadFromState,
  RELEASES_FALLBACK_URL,
  useReleaseManifest,
} from "@/hooks/useReleaseManifest";

it("shares the manifest request and enables the fallback after a stalled download lookup", async () => {
  vi.useFakeTimers();
  const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(
    (_input, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new DOMException("Timed out", "AbortError")),
        );
      }),
  );
  try {
    const first = renderHook(() => useReleaseManifest());
    const second = renderHook(() => useReleaseManifest());
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first.result.current.status).toBe("loading");
    await act(() => vi.advanceTimersByTimeAsync(8_000));
    expect(first.result.current.status).toBe("error");
    expect(second.result.current.status).toBe("error");
    expect(downloadFromState(first.result.current)).toMatchObject({
      href: RELEASES_FALLBACK_URL,
      disabled: false,
    });
    first.unmount();
    second.unmount();
  } finally {
    fetchMock.mockRestore();
    vi.useRealTimers();
  }
});
