import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  Terminal,
  Layers,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { DOCS, type DocEntry } from "@/lib/docs-registry";
import { Reveal } from "@/components/Reveal";
import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/utils";

// Full literal Tailwind classes per accent so the JIT compiler can see them
// (no dynamic `group-hover:${...}` interpolation, which the JIT cannot detect).
type Accent = "cyan" | "violet";

const ACCENT_CLASSES: Record<
  Accent,
  { text: string; iconBox: string; cardHover: string; hoverText: string }
> = {
  cyan: {
    text: "text-brand-cyan",
    iconBox: "text-brand-cyan",
    cardHover: "hover:border-brand-cyan/50",
    hoverText: "group-hover:text-brand-cyan",
  },
  violet: {
    text: "text-brand-violet",
    iconBox: "text-brand-violet",
    cardHover: "hover:border-brand-violet/50",
    hoverText: "group-hover:text-brand-violet",
  },
};

interface SectionMeta {
  key: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  accent: Accent;
}

const SECTION_META: SectionMeta[] = [
  {
    key: "Hub",
    label: "Hub",
    blurb: "The local-first desktop dashboard — draft, organize, and run specs on rails.",
    icon: LayoutDashboard,
    accent: "cyan",
  },
  {
    key: "Core",
    label: "Core",
    blurb: "The open-source CLI — 14 specialized agents wired into a spec-driven pipeline.",
    icon: Terminal,
    accent: "violet",
  },
  {
    key: "Playbook",
    label: "Playbooks",
    blurb: "Opinionated workflows for product discovery, parallel builds, and OSS maintenance.",
    icon: Layers,
    accent: "cyan",
  },
  {
    key: "Reference",
    label: "Reference",
    blurb: "Command-line reference, deployment notes, and the release changelog.",
    icon: FileText,
    accent: "violet",
  },
];

function DocCard({
  entry,
  accent,
  delay,
}: {
  entry: DocEntry;
  accent: Accent;
  delay: 0 | 100 | 200 | 300;
}): JSX.Element {
  const a = ACCENT_CLASSES[accent];
  return (
    <Reveal delay={delay}>
      <Link
        to={entry.slug === "" ? "/docs" : `/docs/${entry.slug}`}
        className={cn(
          "group flex h-full items-start justify-between gap-4 rounded-card border border-border/60 bg-surface-2/50 px-5 py-4 transition-all",
          "hover:bg-surface-3/50 hover:shadow-glow-elevated",
          a.cardHover,
        )}
      >
        <div className="min-w-0">
          <div
            className={cn(
              "mb-1 font-medium text-foreground transition-colors",
              a.hoverText,
            )}
          >
            {entry.title}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
        </div>
        <ArrowRight
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-all",
            "group-hover:translate-x-0.5",
            a.hoverText,
          )}
          aria-hidden="true"
        />
      </Link>
    </Reveal>
  );
}

export default function DocsIndex(): JSX.Element {
  useSeo({
    title: "Documentation — specrails",
    description:
      "Complete documentation for specrails — from installation to advanced agent customization and autonomous development workflows.",
    canonical: "https://specrails.dev/docs",
  });

  const groups = SECTION_META.map((meta) => ({
    meta,
    entries: DOCS.filter((e) => e.section === meta.key),
  })).filter((g) => g.entries.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Branded header band */}
      <Reveal>
        <header className="relative overflow-hidden rounded-frame border border-border/60 bg-surface-1/60 p-8 md:p-10">
          {/* Decorative drifting brand orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
          >
            <span className="brand-orb animate-drift-a absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-cyan/20 blur-3xl" />
            <span className="brand-orb animate-drift-b absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-brand-violet/20 blur-3xl" />
          </div>

          <div className="relative max-w-2xl">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
              Documentation
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              Everything to run <span className="gradient-text">specrails</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              From first install to a fully autonomous, product-driven development
              workflow. Start with the Hub desktop app, or wire the open-source CLI
              straight into your repo.
            </p>

            {/* Quick start command */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-pill border border-border/70 bg-surface-0/70 py-1.5 pl-4 pr-1.5">
                <code className="font-mono text-sm text-brand-cyan">
                  npx specrails-core@latest init
                </code>
                <CopyButton
                  value="npx specrails-core@latest init"
                  label="Copy install command"
                  className="h-7 w-7"
                />
              </div>
              <Link
                to="/docs/hub-installation"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-cyan"
              >
                Get started with Hub
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>
      </Reveal>

      {/* Sections */}
      <div className="mt-12 space-y-12">
        {groups.map(({ meta, entries }) => {
          const Icon = meta.icon;
          return (
            <section key={meta.key}>
              <Reveal>
                <div className="mb-5 flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-card border border-border/60 bg-surface-2/60",
                      ACCENT_CLASSES[meta.accent].iconBox,
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {meta.label}
                    </h2>
                    <p className="text-sm text-muted-foreground">{meta.blurb}</p>
                  </div>
                </div>
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                {entries.map((entry, i) => (
                  <DocCard
                    key={entry.slug}
                    entry={entry}
                    accent={meta.accent}
                    delay={(Math.min(i, 3) * 100) as 0 | 100 | 200 | 300}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
