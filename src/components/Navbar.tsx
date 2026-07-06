import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Coffee, Sun, Moon, Menu, Download as DownloadIcon } from "lucide-react";
import { DocsDropdown } from "@/components/DocsDropdown";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// openspec: hero-redesign-hub-primary

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { content } = useI18n();
  const { nav } = content;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const themeLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  const ThemeToggleBtn = ({ className }: { className?: string }) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={themeLabel}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg bg-surface-2 border border-border/70 text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors flex-shrink-0",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );

  const navLinkClass =
    "text-sm text-muted-foreground hover:text-foreground transition-colors";

  const sectionLinks = [
    { label: nav.product, href: "/#product" },
    { label: nav.specs, href: "/#specs" },
    { label: nav.loops, href: "/#loops" },
    { label: nav.engineering, href: "/#engineering" },
  ] as const;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo — permanent specrails wordmark (always visible). */}
        <a
          href="/"
          data-logo="nav"
          className="flex items-center"
          aria-label="specrails home"
        >
          <svg
            viewBox="0 0 188 64"
            height="48"
            width="141"
            aria-hidden="true"
            focusable="false"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id="wmGradNav" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1ccbe2" />
                <stop offset="100%" stopColor="#a374db" />
              </linearGradient>
            </defs>
            <rect x="4" y="6" width="180" height="6" rx="3" fill="hsl(var(--rail))" opacity="0.6" />
            <rect x="4" y="18" width="180" height="28" rx="14" fill="url(#wmGradNav)" />
            <rect x="14" y="21" width="160" height="9" rx="4.5" fill="#ffffff" opacity="0.18" />
            <text
              x="94"
              y="32.5"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="700"
              fontSize="20"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#0a0e1a"
              letterSpacing="0.5"
            >
              specrails
            </text>
            <rect x="4" y="52" width="180" height="6" rx="3" fill="hsl(var(--rail))" opacity="0.6" />
          </svg>
        </a>

        {/* Desktop nav — tidy groups + single gradient CTA */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Product story */}
          {sectionLinks.map((l) => (
            <a key={l.href} href={l.href} className={cn(navLinkClass, "px-2")}>
              {l.label}
            </a>
          ))}

          {/* Group 3: docs */}
          <span className="px-2">
            <DocsDropdown />
          </span>

          {/* divider */}
          <span
            className="mx-1 h-4 w-px bg-border/50"
            aria-hidden="true"
          />

          {/* Group 4: utilities (icon-only) */}
          <LanguageSwitcher />
          <ThemeToggleBtn />
          <a
            href="https://ko-fi.com/D1D81Y002C"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.donate}
            title={nav.donate}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-brand-violet transition-colors"
          >
            <Coffee className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/fjpulidop/specrails-desktop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.github}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Group 5: the ONE primary CTA */}
          <Button
            asChild
            variant="gradient"
            size="sm"
            className="ml-1 cta-sheen motion-safe:animate-download-pulse"
          >
            <Link to="/download">
              <DownloadIcon className="w-4 h-4" />
              {nav.download}
            </Link>
          </Button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggleBtn />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm p-0 flex flex-col bg-surface-0"
            >
              <SheetTitle className="px-6 pt-6 pb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {nav.menu}
              </SheetTitle>

              <nav className="flex-1 overflow-y-auto px-3 pb-4">
                {/* Sections */}
                <div className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {nav.sections}
                </div>
                {sectionLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-2 transition-colors"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}

                {/* Docs */}
                <div className="px-3 pt-5 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {nav.resources}
                </div>
                <SheetClose asChild>
                  <Link
                    to="/docs"
                    className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-2 transition-colors"
                  >
                    {nav.docs}
                  </Link>
                </SheetClose>
                <a
                  href="https://github.com/fjpulidop/specrails-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-2 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  {nav.github}
                </a>
                <a
                  href="https://ko-fi.com/D1D81Y002C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-2 transition-colors"
                >
                  <Coffee className="w-5 h-5" />
                  {nav.donate}
                </a>
              </nav>

              {/* Footer: theme toggle + gradient CTA */}
              <div className="border-t border-border/30 px-6 py-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={themeLabel}
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-surface-2 border border-border/70 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="gradient"
                    className="flex-1 h-11 cta-sheen"
                  >
                    <Link to="/download">
                      <DownloadIcon className="w-4 h-4" />
                      {nav.download}
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
