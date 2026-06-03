import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Coffee, Sun, Moon } from "lucide-react";
import { AgentsDropdown } from "@/components/AgentsDropdown";
import { DocsDropdown } from "@/components/DocsDropdown";
import { useTheme } from "@/hooks/useTheme";

// openspec: hero-redesign-hub-primary
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isDocsPage = pathname.startsWith("/docs");
  const { theme, toggle } = useTheme();

  const ThemeToggleBtn = () => (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border/60 transition-colors flex-shrink-0"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Pipeline", href: "/#pipeline" },
    { label: "Features", href: "/#features" },
    { label: "Commands", href: "/#commands" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-center md:justify-between relative">
        <a href="/" data-logo="nav" className="flex items-center" aria-label="specrails home">
          <svg
            viewBox="0 0 188 64"
            height="48"
            width="auto"
            aria-hidden="true"
            focusable="false"
            style={{ display: 'block' }}
          >
            <rect x="4" y="6" width="180" height="6" rx="3"
                  fill="hsl(var(--foreground))" opacity="0.16" />
            <rect x="4" y="18" width="180" height="28" rx="14"
                  fill="hsl(var(--foreground))" />
            <text
              x="94" y="32.5"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
              fontSize="20"
              textAnchor="middle"
              dominantBaseline="central"
              fill="hsl(var(--background))"
              letterSpacing="0.5"
            >specrails</text>
            <rect x="4" y="52" width="180" height="6" rx="3"
                  fill="hsl(var(--foreground))" opacity="0.16" />
          </svg>
        </a>
        {/* Mobile: theme toggle pinned left to free up the right cluster */}
        <div className="md:hidden absolute left-6 inset-y-0 flex items-center">
          <ThemeToggleBtn />
        </div>
        <div className="flex md:hidden items-center gap-4 absolute right-6">
          {!isDocsPage && (
            <Link
              to="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          )}
          <a
            href="https://ko-fi.com/D1D81Y002C"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate on Ko-fi"
            title="Donate on Ko-fi"
            className="text-muted-foreground hover:text-dracula-pink transition-colors"
          >
            <Coffee className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/fjpulidop/specrails-hub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="specrails-hub on GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/#problem"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Problem
          </a>
          <AgentsDropdown />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/core"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Core
          </Link>
          <Link
            to="/download"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Download
          </Link>
          <DocsDropdown />
          <ThemeToggleBtn />
          <a
            href="https://ko-fi.com/D1D81Y002C"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate on Ko-fi"
            title="Donate on Ko-fi"
            className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-dracula-pink transition-colors"
          >
            <Coffee className="w-4 h-4" />
            <span className="text-sm">Donate</span>
          </a>
          <a
            href="https://github.com/fjpulidop/specrails-hub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="specrails-hub on GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
