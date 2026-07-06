import { ArrowRight, FileText, GitPullRequest, MessageSquareText, PenLine, RefreshCw, Route } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

const stageIcons = [MessageSquareText, FileText, Route, RefreshCw, GitPullRequest] as const;

const PipelineSection = () => {
  const { content } = useI18n();
  const { pipeline } = content;

  return (
    <section id="specs" className="section-spacious">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3">{pipeline.eyebrow}</p>
          <h2 className="section-heading">
            {pipeline.title}{" "}
            <span className="gradient-text">{pipeline.gradient}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {pipeline.intro}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {pipeline.modes.map((mode) => (
              <div
                key={mode.title}
                className="rounded-card border border-border/60 bg-surface-2/45 p-5"
              >
                <PenLine className="h-5 w-5 text-brand-cyan" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{mode.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {mode.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ol className="mt-14 grid gap-4 md:grid-cols-5">
            {pipeline.stages.map((stage, index) => {
              const Icon = stageIcons[index] ?? FileText;
              return (
                <li key={stage.label} className="relative">
                  {index < pipeline.stages.length - 1 && (
                    <ArrowRight
                      className="absolute -right-4 top-8 hidden h-4 w-4 text-border md:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="h-full rounded-card border border-border/60 bg-surface-1/60 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-card border border-brand-violet/30 bg-brand-violet/10 text-brand-violet">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cyan">
                      {stage.phase}
                    </p>
                    <h3 className="mt-1 font-semibold text-foreground">{stage.label}</h3>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {stage.actor}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {stage.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={300} className="mt-10 text-center">
          <a
            href="#loops"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violet"
          >
            {pipeline.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default PipelineSection;
