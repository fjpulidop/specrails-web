import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { DocsDropdown } from "@/components/DocsDropdown";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Agents", href: "#agents" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Features", href: "#features" },
    { label: "Install", href: "#install" },
    { label: "Commands", href: "#commands" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-xl font-bold">
          <span className="text-dracula-purple">spec</span>
          <span className="text-dracula-pink">rails</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <DocsDropdown />
          <a
            href="https://github.com/fjpulidop/specrails"
            target="_blank"
            rel="noopener noreferrer"
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
