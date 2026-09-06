import { CheckCircle2, Workflow } from "lucide-react";
import { ProductFrame } from "@/components/ProductFrame";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

const DemoSection = () => {
  const { content } = useI18n();
  const { demo } = content;

  return (
    <section id="loops" className="section-spacious section-darker">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-cyan">{demo.eyebrow}</p>
          <h2 className="section-heading mt-3">
            {demo.title} <span className="gradient-text">{demo.gradient}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {demo.intro}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <figure className="mt-12">
            <ProductFrame
              chrome="none"
              aspectRatio="1440 / 854"
              className="bg-[#06060c]"
              bodyClassName="overflow-hidden bg-[#06060c]"
            >
              <video
                className="h-full w-full bg-[#06060c] object-cover"
                poster="/product/specrails-loop-builder-real.png"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Real Specrails Loop Builder with AI step inspector"
              >
                <source src="/product/specrails-loop-builder-real.webm" type="video/webm" />
                <source src="/product/specrails-loop-builder-real.mp4" type="video/mp4" />
                <img
                  src="/product/specrails-loop-builder-real.png"
                  alt="Real Specrails Loop Builder with AI step inspector"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </video>
              <noscript>
                <img
                  src="/product/specrails-loop-builder-real.png"
                  alt="Real Specrails Loop Builder with AI step inspector"
                  className="h-full w-full object-cover"
                />
              </noscript>
            </ProductFrame>
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {demo.loopTitle} · {demo.loopSubtitle}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal delay={200}>
            <ProductFrame
              chrome="none"
              aspectRatio="1060 / 763"
              className="bg-background-deep"
              bodyClassName="overflow-hidden"
            >
              <img
                src="/product/specrails-loops-real.png"
                alt="Real Specrails loops library with built-in and template loops"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </ProductFrame>
          </Reveal>

          <Reveal delay={300}>
            <div className="rounded-frame border border-border/60 bg-surface-1/65 p-5 shadow-glow-elevated">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-card border border-brand-violet/40 bg-brand-violet/10 text-brand-violet">
                  <Workflow className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {demo.loopTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {demo.loopSubtitle}
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid gap-3">
                {demo.checks.map((check) => (
                  <li key={check} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-success" aria-hidden="true" />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
