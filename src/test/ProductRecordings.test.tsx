import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProductRecordings } from "@/components/ProductRecordings";
import { I18nProvider, LANGUAGE_IDS } from "@/lib/i18n";
import { RECORDINGS, RECORDING_COPY } from "@/lib/recording-copy";

let play: ReturnType<typeof vi.spyOn>;
let pause: ReturnType<typeof vi.spyOn>;
let load: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  window.localStorage.clear();
  play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) { this.dispatchEvent(new Event("play")); return Promise.resolve(); });
  pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) { this.dispatchEvent(new Event("pause")); });
  load = vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
});
afterEach(async () => { await act(async () => { cleanup(); }); vi.restoreAllMocks(); });

function card(title: string) { return screen.getByRole("heading", { name: title }).closest("article")!; }
function playCard(title: string) { fireEvent.click(within(card(title)).getAllByRole("button", { name: `Play: ${title}` })[0]); }

describe("ProductRecordings", () => {
  it("shows three real posters without loading any video or starting playback", () => {
    const { container } = render(<ProductRecordings />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
    expect(container.querySelectorAll("video, source")).toHaveLength(0);
    expect(play).not.toHaveBeenCalled();
    for (const recording of RECORDINGS) expect(screen.getByRole("img", { name: RECORDING_COPY.en.clips[recording.id].title })).toHaveAttribute("src", `/product/${recording.id === "mission" ? "specrails-mission-control-preview" : recording.file}.png`);
    expect(screen.getByText(RECORDING_COPY.en.note)).toBeVisible();
  });

  it("loads only the requested recording, then pauses it when another card plays", async () => {
    render(<ProductRecordings />);
    playCard("Mission Control");
    const mission = card("Mission Control").querySelector("video")!;
    expect(mission).not.toHaveAttribute("autoplay");
    expect(mission).not.toHaveAttribute("loop");
    expect(mission).toHaveAttribute("preload", "none");
    expect(mission).toHaveAttribute("playsinline");
    expect(mission.controls).toBe(false);
    expect(within(card("Mission Control")).getByRole("button", { name: "Pause: Mission Control" })).toBeVisible();
    playCard("Specs and rails");
    expect(pause.mock.contexts).toContain(mission);
    expect(within(card("Specs and rails")).getByRole("button", { name: "Pause: Specs and rails" })).toBeVisible();
    expect(card("Loop builder").querySelector("video")).toBeNull();
    fireEvent.click(within(card("Specs and rails")).getByRole("button", { name: "Pause: Specs and rails" }));
    expect(within(card("Specs and rails")).getAllByRole("button", { name: "Play: Specs and rails" }).length).toBeGreaterThan(0);
    await act(async () => {});
  });

  it("stops inline playback when the page becomes hidden", () => {
    render(<ProductRecordings />);
    playCard("Mission Control");
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    expect(within(card("Mission Control")).queryByRole("button", { name: "Pause: Mission Control" })).toBeNull();
  });

  it("expands the full uncropped video at the current position and restores focus on close", async () => {
    render(<ProductRecordings />);
    playCard("Mission Control");
    const inline = card("Mission Control").querySelector("video")!;
    inline.currentTime = 6;
    const trigger = within(card("Mission Control")).getByRole("button", { name: "Expand recording: Mission Control" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    const full = dialog.querySelector("video")!;
    expect(full.controls).toBe(true);
    expect(full.className).toContain("object-contain");
    expect(within(dialog).getByText(RECORDING_COPY.en.clips.mission.description)).toBeVisible();
    expect(within(dialog).getByRole("link", { name: "Open video file" })).toHaveAttribute("href", "/product/specrails-mission-control-real.mp4");
    Object.defineProperty(full, "duration", { value: 15 });
    fireEvent.loadedMetadata(full);
    expect(full.currentTime).toBe(6);
    fireEvent.click(within(dialog).getByRole("button", { name: "Close recording" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger).toHaveFocus();
    expect(pause.mock.contexts).toContain(full);
    expect(within(card("Mission Control")).queryByRole("button", { name: "Pause: Mission Control" })).toBeNull();
  });

  it("opens a recording directly from its poster and retains native controls if play is blocked", async () => {
    play.mockRejectedValue(new Error("Media policy"));
    render(<ProductRecordings showHeading={false} />);
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Expand recording: Loop builder" }));
    const video = screen.getByRole("dialog").querySelector("video")!;
    expect(video.controls).toBe(true);
    expect(screen.getByText(RECORDING_COPY.en.fullscreenHint)).toBeVisible();
    await act(async () => {});
  });

  it("retains an explicit play control after media policy rejects inline playback", async () => {
    play.mockRejectedValueOnce(new Error("Media policy"));
    render(<ProductRecordings />);
    playCard("Mission Control");
    await act(async () => {});
    expect(within(card("Mission Control")).getAllByRole("button", { name: "Play: Mission Control" }).length).toBeGreaterThan(0);
    playCard("Mission Control");
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("shows a recoverable recording failure without automatically retrying", async () => {
    render(<ProductRecordings />);
    playCard("Specs and rails");
    const video = card("Specs and rails").querySelector("video")!;
    fireEvent.error(video);
    expect(within(card("Specs and rails")).getByRole("alert")).toHaveTextContent(RECORDING_COPY.en.error);
    const prior = play.mock.calls.length;
    await act(async () => {});
    expect(play).toHaveBeenCalledTimes(prior);
    fireEvent.click(within(card("Specs and rails")).getByRole("button", { name: "Retry" }));
    expect(card("Specs and rails").querySelector("video")).not.toBe(video);
    expect(within(card("Specs and rails")).queryByRole("alert")).toBeNull();
  });

  it("retries failed full-size playback and preserves its textual alternative", () => {
    render(<ProductRecordings />);
    fireEvent.click(screen.getByRole("button", { name: "Expand recording: Loop builder" }));
    const dialog = screen.getByRole("dialog");
    const video = dialog.querySelector("video")!;
    fireEvent.error(video);
    expect(within(dialog).getByRole("alert")).toHaveTextContent(RECORDING_COPY.en.error);
    fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
    expect(dialog.querySelector("video")).not.toBe(video);
    expect(within(dialog).getByText(RECORDING_COPY.en.clips.loop.description)).toBeVisible();
  });

  it("keeps source URLs during StrictMode replay and releases detached video resources", async () => {
    const { unmount } = render(<StrictMode><ProductRecordings /></StrictMode>);
    playCard("Mission Control");
    const video = card("Mission Control").querySelector("video")!;
    await act(async () => {});
    expect(video.querySelectorAll("source[src]")).toHaveLength(2);
    unmount();
    await act(async () => {});
    expect(video.querySelectorAll("source[src]")).toHaveLength(0);
    expect(load.mock.contexts).toContain(video);
  });

  it.each(LANGUAGE_IDS)("renders complete %s copy and accessible localized controls", language => {
    window.localStorage.setItem("specrails-web:language", language);
    render(<I18nProvider><ProductRecordings /></I18nProvider>);
    const copy = RECORDING_COPY[language];
    expect(screen.getByRole("heading", { name: copy.title })).toBeVisible();
    for (const recording of RECORDINGS) {
      const clip = copy.clips[recording.id];
      expect(screen.getByRole("heading", { name: clip.title })).toBeVisible();
      expect(screen.getByRole("button", { name: `${copy.expand}: ${clip.title}` })).toBeVisible();
      expect(clip.description.length).toBeGreaterThan(40);
    }
  });
});
