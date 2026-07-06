import { Link } from "react-router-dom";
import { ArrowRight, Bot, GitPullRequest, KanbanSquare, Lock, Maximize2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductFrame } from "@/components/ProductFrame";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const modeIcons = [Bot, KanbanSquare] as const;

const ProductsSection = () => {
  const { content } = useI18n();
  const { products } = content;

  return (
    <section id="product" className="section-spacious section-darker">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-cyan">{products.eyebrow}</p>
          <h2 className="section-heading mt-3">
            {products.title}{" "}
            <span className="gradient-text">{products.gradient}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {products.intro}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {products.modes.map((mode, index) => {
              const Icon = modeIcons[index] ?? Bot;
              const primary = index === 0;
              return (
                <article
                  key={mode.title}
                  className={cn(
                    "rounded-frame border bg-surface-1/65 p-5 shadow-glow-elevated",
                    primary ? "border-brand-cyan/35" : "border-border/60",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-card border",
                        primary
                          ? "border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan"
                          : "border-brand-violet/40 bg-brand-violet/10 text-brand-violet",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {mode.label}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                        {mode.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {mode.body}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-2">
                    {mode.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-violet">
                {products.appTitle}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {products.appBody}
              </h3>

              <div className="mt-6 grid gap-3">
                <div className="rounded-card border border-border/60 bg-surface-2/45 p-4">
                  <Lock className="h-5 w-5 text-brand-cyan" aria-hidden="true" />
                  <h4 className="mt-3 font-semibold text-foreground">{products.localTitle}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {products.localBody}
                  </p>
                </div>
                <div className="rounded-card border border-border/60 bg-surface-2/45 p-4">
                  <GitPullRequest className="h-5 w-5 text-brand-violet" aria-hidden="true" />
                  <h4 className="mt-3 font-semibold text-foreground">{products.runtimeTitle}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {products.runtimeBody}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gradient" className="rounded-pill cta-sheen">
                  <Link to="/download">
                    {products.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-pill">
                  <Link to="/docs/getting-started">{content.nav.docs}</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <figure>
              <Dialog>
                <div className="relative">
                  <ProductFrame
                    chrome="none"
                    aspectRatio="1440 / 900"
                    className="bg-[#06060c]"
                    bodyClassName="overflow-hidden bg-[#06060c]"
                  >
                    <video
                      className="h-full w-full bg-[#06060c] object-cover"
                      poster="/product/specrails-board-real.png"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={products.boardVideoLabel}
                    >
                      <source src="/product/specrails-board-real.webm" type="video/webm" />
                      <source src="/product/specrails-board-real.mp4" type="video/mp4" />
                      <img
                        src="/product/specrails-board-real.png"
                        alt={products.boardVideoLabel}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </video>
                  </ProductFrame>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-3 right-3 h-9 rounded-pill border border-white/10 bg-surface-1/90 px-3 text-xs text-foreground shadow-glow-elevated backdrop-blur hover:bg-surface-2"
                    >
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                      {products.boardExpand}
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent className="w-[min(calc(100vw-2rem),72rem)] max-w-none border-0 bg-transparent p-0 shadow-none [&>button]:right-0 [&>button]:top-[-3rem] [&>button]:grid [&>button]:h-10 [&>button]:w-10 [&>button]:place-items-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-surface-1/90 [&>button]:text-foreground [&>button]:opacity-100 [&>button]:backdrop-blur">
                  <DialogTitle className="sr-only">{products.appTitle}</DialogTitle>
                  <DialogDescription className="sr-only">{products.boardVideoLabel}</DialogDescription>
                  <ProductFrame
                    chrome="none"
                    aspectRatio="1440 / 900"
                    className="bg-[#06060c]"
                    bodyClassName="overflow-hidden bg-[#06060c]"
                  >
                    <video
                      className="h-full w-full bg-[#06060c] object-cover"
                      poster="/product/specrails-board-real.png"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={products.boardVideoLabel}
                    >
                      <source src="/product/specrails-board-real.webm" type="video/webm" />
                      <source src="/product/specrails-board-real.mp4" type="video/mp4" />
                      <img
                        src="/product/specrails-board-real.png"
                        alt={products.boardVideoLabel}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </video>
                  </ProductFrame>
                </DialogContent>
              </Dialog>
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{products.modes[1]?.title}</span>
                <span className="hidden h-3 w-px bg-border sm:mx-2 sm:inline-block" aria-hidden="true" />
                <span>{products.modes[1]?.points[0]}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="mt-10 grid gap-3 md:grid-cols-4">
            {products.capabilities.map((capability) => (
              <div key={capability.title} className="rounded-card border border-border/60 bg-surface-1/55 p-4">
                <h4 className="text-sm font-semibold text-foreground">{capability.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {capability.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductsSection;
