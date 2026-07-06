import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Component under test: the full homepage and its section set/order.
import Index from "@/pages/Index";

// The canonical set of section ids the homepage is expected to render, in order.
// Mirrors SECTION_IDS in src/pages/Index.tsx.
const EXPECTED_SECTION_IDS = [
  "hero",
  "product",
  "specs",
  "loops",
  "engineering",
  "footer",
] as const;

// ---------- IntersectionObserver that triggers isVisible=true ----------
// Sections use <Reveal> (IntersectionObserver) to fade in. We immediately
// report intersection so revealed content is in its visible state. (The DOM
// nodes exist regardless — this just exercises the reveal path.)

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe(el: Element) {
    observerCallback?.(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  // Generic fetch stub (e.g. release manifest in HeroSection).
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    }),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  observerCallback = null;
});

// ---------- helpers ----------

function makeQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

function renderHomepage() {
  return render(
    <QueryClientProvider client={makeQueryClient()}>
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

// ---------- section visibility / presence tests ----------

describe("Homepage section set", () => {
  it("renders every expected section, each with the right id", () => {
    const { container } = renderHomepage();
    for (const id of EXPECTED_SECTION_IDS) {
      const el = container.querySelector(`#${id}`);
      expect(el, `expected an element with id="${id}"`).toBeInTheDocument();
    }
  });

  it("renders the sections in the canonical order", () => {
    const { container } = renderHomepage();
    const renderedIds = Array.from(
      container.querySelectorAll<HTMLElement>(
        EXPECTED_SECTION_IDS.map((id) => `#${id}`).join(","),
      ),
    ).map((el) => el.id);
    expect(renderedIds).toEqual([...EXPECTED_SECTION_IDS]);
  });

  it("does not render any deleted sections", () => {
    const { container } = renderHomepage();
    // These ids belonged to sections removed in the redesign.
    expect(container.querySelector("#install")).not.toBeInTheDocument();
    expect(container.querySelector("#integrations")).not.toBeInTheDocument();
    expect(container.querySelector("#agents")).not.toBeInTheDocument();
    expect(container.querySelector("#hub")).not.toBeInTheDocument();
    expect(container.querySelector("#features")).not.toBeInTheDocument();
    expect(container.querySelector("#commands")).not.toBeInTheDocument();
    expect(container.querySelector("#api")).not.toBeInTheDocument();
    expect(container.querySelector("#principles")).not.toBeInTheDocument();
  });
});
