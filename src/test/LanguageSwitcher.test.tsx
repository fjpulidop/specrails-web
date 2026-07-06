import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function renderSwitcher() {
  return render(
    <I18nProvider>
      <LanguageSwitcher />
    </I18nProvider>,
  );
}

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
        clear: () => {
          store.clear();
        },
      },
    });
    document.documentElement.lang = "";
  });

  it("opens the language menu from the icon button", async () => {
    const user = userEvent.setup();
    renderSwitcher();

    await user.click(screen.getByRole("button", { name: /change language/i }));

    expect(screen.getByRole("button", { name: /English/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Español/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /日本語/i })).toBeInTheDocument();
  });

  it("persists the selected language and closes the menu", async () => {
    const user = userEvent.setup();
    renderSwitcher();

    await user.click(screen.getByRole("button", { name: /change language/i }));
    await user.click(screen.getByRole("button", { name: /Español/i }));

    expect(window.localStorage.getItem("specrails-web:language")).toBe("es");
    expect(document.documentElement.lang).toBe("es");
    expect(screen.getByRole("button", { name: /cambiar idioma/i })).toHaveAttribute(
      "title",
      "Idioma: Español",
    );
    expect(screen.queryByRole("button", { name: /English/i })).not.toBeInTheDocument();
  });

  it("closes when clicking outside the menu", async () => {
    const user = userEvent.setup();
    renderSwitcher();

    await user.click(screen.getByRole("button", { name: /change language/i }));
    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole("button", { name: /Español/i })).not.toBeInTheDocument();
  });
});
