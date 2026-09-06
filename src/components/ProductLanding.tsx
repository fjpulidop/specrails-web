import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCheck,
  FileText,
  FolderGit2,
  GitBranch,
  MessageSquare,
  Monitor,
  Network,
  ScanLine,
  Smartphone,
  SquareTerminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_COPY } from "@/lib/product-copy";

const featureIcons = [
  FolderGit2,
  MessageSquare,
  GitBranch,
  SquareTerminal,
  ScanLine,
  Monitor,
  FileText,
  Network,
];
const featureGuides = [
  "getting-started-multiple-repositories",
  "missions-steering-and-receipts",
  "missions-review-and-delivery",
  "insights-background-processes",
  "missions-browser-and-capture",
  "missions-mission-windows",
  "insights-code-explorer",
  "integrations-mcp-server",
];
const stepIcons = [MessageSquare, FileText, Network, CheckCheck];

export function ProductHero() {
  const { languageId, content } = useI18n();
  const c = PRODUCT_COPY[languageId];
  return (
    <section
      id="hero"
      className="mx-auto max-w-6xl pb-12 pt-32 sm:pb-16 sm:pt-40"
    >
      <div className="mb-7 flex items-center gap-3">
        <span
          className="h-2 w-2 rounded-full bg-brand-cyan"
          aria-hidden="true"
        />
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs">
          {c.eyebrow}
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-12">
        <h1 className="text-[clamp(2.6rem,5.3vw,4.7rem)] font-semibold leading-[1.06] tracking-[-0.055em]">
          {c.title}
          <br />
          <span className="text-brand-cyan">{c.accent}</span>
        </h1>
        <div className="pb-1">
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            {c.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
            >
              <Link to="/download">
                {content.nav.download}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-full px-4 text-foreground"
            >
              <a href="#product">
                {c.explore}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
          macOS · Windows
        </span>
        <span
          className="hidden h-3 w-px bg-border sm:block"
          aria-hidden="true"
        />
        <span>Claude</span>
        <span>Codex</span>
        <span>Gemini</span>
        <span>Kimi</span>
        <span className="ml-auto hidden font-mono text-[10px] tracking-widest sm:block">
          SPEC → IMPLEMENT → REVIEW
        </span>
      </div>
    </section>
  );
}

export function ProductWorkflow() {
  const { languageId } = useI18n();
  const c = PRODUCT_COPY[languageId];
  return (
    <section
      id="specs"
      className="mx-auto max-w-6xl scroll-mt-24 py-20 sm:py-28"
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-20">
        <div>
          <p className="mb-4 font-mono text-xs text-brand-cyan">
            01 / {c.workflow}
          </p>
          <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            {c.workflowTitle}
          </h2>
        </div>
        <p className="self-end text-base leading-relaxed text-muted-foreground">
          {c.workflowBody}
        </p>
      </div>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {c.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <li key={index} className="relative border-t border-border pt-6">
              <span className="mb-6 flex items-center justify-between">
                <Icon className="h-5 w-5 text-brand-cyan" aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </span>
              </span>
              <h3 className="mb-3 font-medium">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
      <div
        id="loops"
        className="mt-12 scroll-mt-24 rounded-xl border border-border bg-surface-1 px-5 py-5 sm:px-7"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Network
            className="mr-1 h-4 w-4 text-brand-violet"
            aria-hidden="true"
          />
          {["Implement", "Batch Implement", "SDD Quick", "Freestyle"].map(
            (name) => (
              <span
                key={name}
                className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs"
              >
                {name}
              </span>
            ),
          )}
          <Link
            to="/docs/pipeline-the-loop-builder"
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-brand-cyan"
          >
            Loop Builder
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{c.loopNote}</p>
      </div>
    </section>
  );
}

export function ProductFeatures() {
  const { languageId } = useI18n();
  const c = PRODUCT_COPY[languageId];
  return (
    <section
      id="engineering"
      className="border-y border-border bg-surface-1/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-4 font-mono text-xs text-brand-cyan">
              02 / Specrails Desktop
            </p>
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              {c.featureTitle}
            </h2>
          </div>
          <p className="self-end text-base leading-relaxed text-muted-foreground">
            {c.featureIntro}
          </p>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {c.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <article
                key={index}
                className="group border-t border-border pt-6"
              >
                <Icon
                  className="mb-5 h-5 w-5 text-brand-cyan"
                  aria-hidden="true"
                />
                <h3 className="mb-3 font-medium">
                  <Link
                    to={`/docs/${featureGuides[index]}`}
                    className="inline-flex items-start gap-2 hover:text-brand-cyan"
                  >
                    {feature.title}
                    <ArrowUpRight
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CompanionShowcase({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { languageId } = useI18n();
  const c = PRODUCT_COPY[languageId];
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="companion"
      className={
        standalone
          ? "mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40"
          : "mx-auto max-w-6xl scroll-mt-24 py-20 sm:py-28"
      }
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <p className="mb-5 flex items-center gap-2 font-mono text-xs text-brand-violet">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Specrails Companion
          </p>
          <Heading className="max-w-lg text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {c.companionTitle}
          </Heading>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            {c.companionBody}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="h-12 rounded-full px-6">
              <a href="/companion-app/">
                {c.companionCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full px-6"
            >
              <Link to="/docs/integrations-mobile-companion">
                {c.learn}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <p className="mt-5 max-w-lg text-xs leading-relaxed text-muted-foreground">
            {c.companionNote}
          </p>
        </div>
        <figure className="mx-auto w-full max-w-md rounded-3xl border border-border bg-surface-1 p-6 sm:p-10">
          <img
            src="/companion/missions-real.png"
            alt="Specrails Companion"
            width="780"
            height="1688"
            loading="lazy"
            decoding="async"
            className="mx-auto max-h-[480px] w-auto max-w-full rounded-2xl border border-border object-contain shadow-xl"
          />
        </figure>
      </div>
    </section>
  );
}

export function DocumentationShowcase() {
  const { languageId, content } = useI18n();
  const c = PRODUCT_COPY[languageId];
  return (
    <section className="mx-auto mb-20 grid max-w-6xl gap-6 rounded-2xl border border-border bg-surface-1 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <BookOpen className="mb-5 h-5 w-5 text-brand-cyan" aria-hidden="true" />
        <h2 className="text-2xl font-medium tracking-tight">{c.docsTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {c.docsBody}
        </p>
      </div>
      <Button
        asChild
        variant="outline"
        className="h-12 w-fit rounded-full px-6"
      >
        <Link to="/docs">
          {content.nav.docs}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </section>
  );
}
