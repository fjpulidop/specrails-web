import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nProvider, LANGUAGE_IDS } from "@/lib/i18n";
import { PRODUCT_COPY } from "@/lib/product-copy";
import {
  CompanionShowcase,
  DocumentationShowcase,
  ProductFeatures,
  ProductHero,
  ProductWorkflow,
} from "@/components/ProductLanding";
import { getDocBySlug } from "@/lib/docs-registry";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Current product journeys", () => {
  for (const language of LANGUAGE_IDS) {
    it(`provides complete ${language} journeys with resolvable guide links`, () => {
      localStorage.setItem("specrails-web:language", language);
      const { container } = render(
        <I18nProvider>
          <MemoryRouter>
            <ProductHero />
            <ProductWorkflow />
            <ProductFeatures />
            <CompanionShowcase />
            <DocumentationShowcase />
          </MemoryRouter>
        </I18nProvider>,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        PRODUCT_COPY[language].title,
      );
      expect(
        screen.getByRole("link", { name: PRODUCT_COPY[language].companionCta }),
      ).toHaveAttribute("href", "/companion-app/");
      expect(
        screen.getByText(PRODUCT_COPY[language].companionNote),
      ).toBeInTheDocument();
      const links = [
        ...container.querySelectorAll<HTMLAnchorElement>('a[href^="/docs/"]'),
      ];
      expect(links.length).toBeGreaterThan(6);
      for (const link of links)
        expect(
          getDocBySlug(link.getAttribute("href")!.slice(6), language),
          link.href,
        ).toBeDefined();
      expect(container.querySelectorAll("video")).toHaveLength(0);
      expect(container.textContent).not.toMatch(/undefined|illustrative data/i);
    });
  }

  it("uses the real Companion screenshot rather than recreating its interface", () => {
    render(
      <MemoryRouter>
        <CompanionShowcase standalone />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      PRODUCT_COPY.en.companionTitle,
    );
    expect(
      screen.getByRole("img", { name: /Specrails Companion/ }),
    ).toHaveAttribute("loading", "lazy");
  });
});
