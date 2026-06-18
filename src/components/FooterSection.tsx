import { Link } from "react-router-dom";
import {
  Github,
  Coffee,
  Download,
  BookOpen,
  Terminal,
  LayoutDashboard,
  Boxes,
  GitMerge,
  FileText,
  MessageCircle,
  ScrollText,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/utils";

const INSTALL_CMD = "npx specrails-core@latest init";

const GITHUB_CORE = "https://github.com/fjpulidop/specrails-core";
const GITHUB_HUB = "https://github.com/fjpulidop/specrails-desktop";
const KOFI = "https://ko-fi.com/D1D81Y002C";

type ColLink = {
  label: string;
  icon: typeof Github;
  /** Internal route (react-router). */
  to?: string;
  /** External / absolute href. */
  href?: string;
};

type Column = {
  heading: string;
  links: ColLink[];
};

const COLUMNS: Column[] = [
  {
    heading: "Product",
    links: [
      { label: "specrails-core", icon: Terminal, to: "/core" },
      { label: "specrails-desktop", icon: LayoutDashboard, to: "/download" },
      { label: "The 14 agents", icon: Boxes, to: "/agents" },
      { label: "Hub vs Core", icon: GitMerge, to: "/docs/core-vs-hub" },
    ],
  },
  {
    heading: "Docs",
    links: [
      { label: "Documentation", icon: BookOpen, to: "/docs" },
      { label: "Install Hub", icon: Download, to: "/docs/hub-installation" },
      { label: "Install Core", icon: Download, to: "/docs/installation" },
      { label: "CLI reference", icon: FileText, to: "/docs/cli-reference" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Core on GitHub", icon: Github, href: GITHUB_CORE },
      { label: "Hub on GitHub", icon: Github, href: GITHUB_HUB },
      {
        label: "Issues",
        icon: MessageCircle,
        href: `${GITHUB_CORE}/issues`,
      },
      { label: "Support on Ko-fi", icon: Coffee, href: KOFI },
    ],
  },
  {
    heading: "Legal",
    links: [
      {
        label: "MIT License",
        icon: ScrollText,
        href: `${GITHUB_CORE}/blob/main/LICENSE`,
      },
      { label: "Changelog", icon: FileText, to: "/docs/changelog" },
    ],
  },
];

/** Shared link styling — quiet by default, brightens on hover. */
const linkClass =
  "group/link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors";

const ColumnLink = ({ link }: { link: ColLink }) => {
  const Icon = link.icon;
  const inner = (
    <>
      <Icon
        className="w-4 h-4 text-rail group-hover/link:text-brand-cyan transition-colors flex-shrink-0"
        aria-hidden="true"
      />
      <span>{link.label}</span>
    </>
  );

  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {inner}
    </a>
  );
};

/**
 * Brand lockup: a glossy gradient pill riding a neutral rail, with the
 * wordmark in mono. Token-only recreation of the "spec on rails" mark —
 * the lead owns the canonical SVG; this is a tasteful text + pill stand-in.
 */
const BrandLockup = () => (
  <Link
    to="/"
    aria-label="specrails home"
    className="inline-flex items-center gap-3 group"
  >
    {/* rails + pill glyph */}
    <span
      className="relative grid place-items-center w-11 h-11 rounded-card bg-surface-2 border border-border/70 overflow-hidden"
      aria-hidden="true"
    >
      {/* neutral rails */}
      <span className="absolute left-1.5 right-1.5 top-[13px] h-px bg-rail/60" />
      <span className="absolute left-1.5 right-1.5 bottom-[13px] h-px bg-rail/60" />
      {/* glossy gradient pill riding the rails */}
      <span className="relative w-6 h-3 rounded-pill bg-gradient-brand shadow-glow-brand transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
    <span className="font-mono text-xl font-semibold tracking-tight text-foreground">
      spec<span className="gradient-text">rails</span>
    </span>
  </Link>
);

const FooterSection = () => (
  <footer
    id="footer"
    className="relative section-darker border-t border-border/40 px-6 pt-16 pb-10 md:pt-20"
  >
    {/* cyan → violet hairline glow on the top edge */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-80"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-brand-soft opacity-40 blur-2xl"
    />

    <div className="relative max-w-6xl mx-auto">
      {/* Top: brand + pitch + install pill ◂▸ link columns */}
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        {/* Brand column */}
        <Reveal className="flex flex-col gap-6">
          <BrandLockup />

          <p className="text-xl font-bold text-foreground">Describe it. Watch it ship.</p>

          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Stop re-prompting an agent that keeps guessing. Describe a feature
            in a sentence and watch a real team design it, build it, and hand
            you a clean, reviewed PR — while you do something else.
          </p>

          {/* Copyable install command */}
          <div className="space-y-3">
            <div
              className={cn(
                "flex items-center gap-2 max-w-sm rounded-pill border border-border/70 bg-surface-2",
                "pl-4 pr-1.5 py-1.5",
              )}
            >
              <span className="text-rail font-mono text-sm select-none" aria-hidden="true">
                $
              </span>
              <code className="flex-1 font-mono text-sm text-foreground truncate">
                {INSTALL_CMD}
              </code>
              <CopyButton
                value={INSTALL_CMD}
                label="Copy install command"
                className="rounded-pill flex-shrink-0"
              />
            </div>
          </div>
        </Reveal>

        {/* Link columns */}
        <Reveal delay={100}>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10"
          >
            {COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h2 className="eyebrow">{col.heading}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <ColumnLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 pt-6 border-t border-border/30 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/70 text-center sm:text-left">
          © {new Date().getFullYear()} specrails · MIT licensed · 100% local,
          no telemetry
        </p>

        <div className="flex items-center gap-1">
          <a
            href={KOFI}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Support specrails on Ko-fi"
            title="Support on Ko-fi"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-brand-violet transition-colors"
          >
            <Coffee className="w-5 h-5" />
          </a>
          <a
            href={GITHUB_HUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="specrails-desktop on GitHub"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
