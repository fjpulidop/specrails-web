import { ArrowRight, CheckCircle2, MessageSquareWarning, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

const ProblemSection = () => {
  const { content } = useI18n();
  const { problem } = content;

  return (
    <section id="engineering" className="section-spacious">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal as="p" className="eyebrow mb-4">
              {problem.eyebrow}
            </Reveal>

            <Reveal delay={100}>
              <h2 className="section-heading lg:text-[2.75rem]">
                {problem.title}{" "}
                <span className="gradient-text">{problem.gradient}</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                {problem.intro}
              </p>

              <div className="mt-7 rounded-frame border border-brand-cyan/30 bg-surface-2/60 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-brand-cyan" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {problem.vibeTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {problem.vibeBody}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <Button asChild variant="cyan" className="rounded-pill motion-safe:animate-download-pulse">
                  <Link to="/download">
                    {content.nav.download}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="grid gap-4 sm:grid-cols-2">
              <ComparisonColumn
                title={problem.beforeTitle}
                items={problem.before}
                tone="danger"
              />
              <ComparisonColumn
                title={problem.afterTitle}
                items={problem.after}
                tone="success"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

function ComparisonColumn({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "danger" | "success";
}): JSX.Element {
  const isSuccess = tone === "success";
  const Icon = isSuccess ? CheckCircle2 : MessageSquareWarning;

  return (
    <div className="h-full rounded-frame border border-border/60 bg-surface-2/50 p-5">
      <div className="mb-5 flex items-center gap-2">
        <span
          className={`grid h-9 w-9 place-items-center rounded-card border ${
            isSuccess
              ? "border-accent-success/40 bg-accent-success/10 text-accent-success"
              : "border-accent-danger/40 bg-accent-danger/10 text-accent-danger"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isSuccess ? "bg-accent-success" : "bg-accent-danger"
              }`}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemSection;
