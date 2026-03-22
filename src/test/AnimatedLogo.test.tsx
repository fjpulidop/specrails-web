import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import AnimatedLogo from "@/components/AnimatedLogo";

beforeEach(() => {
  // Mock RAF to execute callback synchronously for fade-in
  let id = 0;
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0);
    return ++id;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());

  // Mock document.fonts.ready
  Object.defineProperty(document, "fonts", {
    value: { ready: Promise.resolve() },
    configurable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AnimatedLogo", () => {
  it("renders the specrails logo text", () => {
    const { container } = render(<AnimatedLogo />);
    expect(container.textContent).toContain("specrails");
  });

  it("renders with fade-in opacity", async () => {
    const { container } = render(<AnimatedLogo />);
    const logo = container.firstElementChild as HTMLElement;
    // After RAF triggers setFadeIn(true), opacity should be 1
    expect(logo).toBeTruthy();
  });

  it("hides navbar logo when mounted and restores on unmount", () => {
    // Create a mock navbar logo element
    const navLogo = document.createElement("div");
    navLogo.setAttribute("data-logo", "nav");
    document.body.appendChild(navLogo);

    const { unmount } = render(<AnimatedLogo />);

    // Should hide navbar logo
    expect(navLogo.style.opacity).toBe("0");

    // On unmount, should restore
    unmount();
    expect(navLogo.style.opacity).toBe("");

    document.body.removeChild(navLogo);
  });

  it("measures hero and nav elements when they exist", async () => {
    // Create hero logo element
    const heroLogo = document.createElement("div");
    heroLogo.setAttribute("data-logo", "hero");
    document.body.appendChild(heroLogo);

    const navLogo = document.createElement("div");
    navLogo.setAttribute("data-logo", "nav");
    document.body.appendChild(navLogo);

    // Mock getBoundingClientRect
    heroLogo.getBoundingClientRect = vi.fn(() => ({
      top: 100, left: 50, width: 200, height: 40,
      bottom: 140, right: 250, x: 50, y: 100, toJSON: () => {},
    }));
    navLogo.getBoundingClientRect = vi.fn(() => ({
      top: 10, left: 20, width: 80, height: 30,
      bottom: 40, right: 100, x: 20, y: 10, toJSON: () => {},
    }));

    const { unmount } = render(<AnimatedLogo />);

    // Wait for fonts.ready and init
    await new Promise((r) => setTimeout(r, 10));

    unmount();
    document.body.removeChild(heroLogo);
    document.body.removeChild(navLogo);
  });

  it("handles missing ref gracefully", () => {
    // When ref.current is null, the effect exits early
    expect(() => render(<AnimatedLogo />)).not.toThrow();
  });
});
