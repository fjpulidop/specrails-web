import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Cable,
  Layers,
  FileText,
  KanbanSquare,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { getDocs, type DocEntry } from "@/lib/docs-registry";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
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

interface SectionConfig {
  key: string;
  metaKey: string;
  icon: LucideIcon;
  accent: Accent;
}

const SECTION_CONFIG: SectionConfig[] = [
  { key: "getting-started", metaKey: "Start", icon: BookOpen, accent: "cyan" },
  { key: "specs", metaKey: "Product", icon: FileText, accent: "violet" },
  { key: "pipeline", metaKey: "Product", icon: KanbanSquare, accent: "cyan" },
  { key: "agents", metaKey: "Product", icon: Bot, accent: "violet" },
  { key: "insights", metaKey: "Product", icon: Layers, accent: "cyan" },
  { key: "integrations", metaKey: "Integrations", icon: Cable, accent: "violet" },
  { key: "settings", metaKey: "Product", icon: Settings2, accent: "cyan" },
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
  const { content, languageId } = useI18n();
  const { docs, nav } = content;
  const localizedDocs = getDocs(languageId);

  useSeo({
    title: docs.seoTitle,
    description: docs.seoDescription,
    canonical: "https://specrails.dev/docs",
  });

  const groups = SECTION_CONFIG.map((config) => {
    const entries = localizedDocs.filter((entry) => entry.category === config.key);
    const fallback = docs.sections[config.metaKey] ?? { label: config.key, blurb: "" };
    return {
      config,
      meta: {
        ...fallback,
        label: entries[0]?.section ?? fallback.label,
      },
      entries,
    };
  }).filter((g) => g.entries.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Branded header band */}
      <Reveal>
        <header className="relative overflow-hidden rounded-frame border border-border/60 bg-surface-1/60 p-8 md:p-10">
          <div className="relative max-w-2xl">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
              {docs.eyebrow}
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              {docs.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              {docs.body}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 rounded-pill bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-background shadow-glow-brand"
              >
                {nav.download}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/docs/getting-started"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-cyan"
              >
                {docs.start}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>
      </Reveal>

      {/* Sections */}
      <div className="mt-12 space-y-12">
        {groups.map(({ config, meta, entries }) => {
          const Icon = config.icon;
          return (
            <section key={config.key}>
              <Reveal>
                <div className="mb-5 flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-card border border-border/60 bg-surface-2/60",
                      ACCENT_CLASSES[config.accent].iconBox,
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
                    accent={config.accent}
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
