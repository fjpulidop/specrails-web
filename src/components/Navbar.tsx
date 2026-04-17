import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Download } from "lucide-react";
import { AgentsDropdown } from "@/components/AgentsDropdown";
import { DocsDropdown } from "@/components/DocsDropdown";
import {
  useReleaseManifest,
  downloadFromState,
} from "@/hooks/useReleaseManifest";

// openspec: hero-redesign-hub-primary
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isDocsPage = pathname.startsWith("/docs");

  const releaseState = useReleaseManifest();
  const { href: downloadHref, disabled: downloadDisabled } = downloadFromState(releaseState);

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
        <a href="/" data-logo="nav" className="font-mono text-[1.8rem] font-bold">
          <span className="text-dracula-purple">spec</span>
          <span className="text-dracula-pink">rails</span>
        </a>
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
            href={downloadHref ?? "#"}
            download
            aria-disabled={downloadDisabled}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dracula-purple/40 bg-dracula-purple/10 text-dracula-purple text-xs font-medium ${
              downloadDisabled ? "pointer-events-none opacity-60" : "hover:bg-dracula-purple/20"
            } transition-colors`}
          >
            <Download className="w-3 h-3" />
            Download
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
          <DocsDropdown />
          <a
            href={downloadHref ?? "#"}
            download
            aria-disabled={downloadDisabled}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-dracula-purple/40 bg-dracula-purple/10 text-dracula-purple text-sm font-medium ${
              downloadDisabled ? "pointer-events-none opacity-60" : "hover:bg-dracula-purple/20 hover:border-dracula-purple/60"
            } transition-colors`}
          >
            <Download className="w-4 h-4" />
            Download
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
