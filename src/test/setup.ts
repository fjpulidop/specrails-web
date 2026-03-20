import "@testing-library/jest-dom";

// Polyfill pointer capture and scroll APIs missing in jsdom — required by Radix UI components
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => undefined;
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => undefined;
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => undefined;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom defines window.scrollTo but throws "Not implemented" — override unconditionally
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => undefined,
});

// IntersectionObserver stub for components using useScrollAnimation
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserver {
    constructor(cb: IntersectionObserverCallback) { void cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
}

// requestAnimationFrame stub — prevents canvas animation loops from continuing
// after test environment teardown (avoids "document is not defined" post-test errors)
let _rafId = 0;
window.requestAnimationFrame = (_cb: FrameRequestCallback) => ++_rafId;
window.cancelAnimationFrame = () => {};
