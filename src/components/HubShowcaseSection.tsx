import {
  MessagesSquare,
  Globe,
  BarChart3,
  ListChecks,
  Scissors,
  Columns2,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { DemoVideo } from "@/components/DemoVideo";
import { cn } from "@/lib/utils";

/*
 * DEMO CLIPS — drop muted screen-recordings of specrails-desktop into public/demos/
 * (both .webm and .mp4, ~1280px wide, no audio, 8–15s loops) and flip the
 * matching slot's `ready` to true. Until then each slot shows a placeholder
 * (real screenshot poster + play badge).
 *
 *   public/demos/hub-overview.{webm,mp4}         — full flow (centerpiece)
 *   public/demos/hub-explore.{webm,mp4}          — talk a spec into existence
 *   public/demos/hub-website-to-spec.{webm,mp4}  — turn a website into a spec
 *   public/demos/hub-analytics.{webm,mp4}        — cost analytics
 *   public/demos/hub-jobs.{webm,mp4}             — job runs / traces
 */
const VIDEOS_READY = false;

interface Cap {
  icon: typeof MessagesSquare;
  eyebrow: string;
  title: string;
  body: string;
  srcBase: string;
  poster?: string;
  label: string;
  reverse: boolean;
}

const CAPS: Cap[] = [
  {
    icon: MessagesSquare,
    eyebrow: "Explore",
    title: "Talk a spec into existence",
    body: "Describe a change in plain language in Explore — or one-shot it with Quick. The spec drafts itself as you talk to Claude or Codex.",
    srcBase: "/demos/hub-explore",
    label: "specrails-desktop — explore",
    reverse: false,
  },
  {
    icon: Globe,
    eyebrow: "From the web",
    title: "Turn any website into a spec",
    body: "Point the embedded browser at a live site, hover-select any element, and capture it into a structured spec — no extension.",
    srcBase: "/demos/hub-website-to-spec",
    label: "specrails-desktop — capture",
    reverse: true,
  },
  {
    icon: BarChart3,
    eyebrow: "Analytics",
    title: "Track every AI dollar",
    body: "Cost over time, jobs by status, duration and token efficiency — per project and across providers. Export to CSV anytime.",
    srcBase: "/demos/hub-analytics",
    poster: "/hub/hub-analytics.png",
    label: "specrails-desktop — analytics",
    reverse: false,
  },
  {
    icon: ListChecks,
    eyebrow: "Jobs",
    title: "Every run, fully traced",
    body: "Each pipeline run is a job you can open — phases, logs, cost, and outcome. Nothing happens on your machine that you can't inspect.",
    srcBase: "/demos/hub-jobs",
    poster: "/hub/hub-jobs.png",
    label: "specrails-desktop — jobs",
    reverse: true,
  },
];

export function HubShowcaseSection() {
  return (
    <section id="hub" className="section-spacious section-darker">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <Reveal as="span" className="eyebrow block mb-4">
            Local dashboard
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-heading">
              The desktop home for your{" "}
              <span className="gradient-text">specs and rails</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              specrails-desktop is a local-first desktop app: draft specs by talking
              to an AI, drag them onto parallel execution rails, and track every
              run and cost — all on your machine.
            </p>
          </Reveal>
        </div>

        {/* Centerpiece — full walkthrough */}
        <Reveal delay={100}>
          <DemoVideo
            label="specrails-desktop — localhost:4200"
            poster="/hub/hub-dashboard.png"
            srcBase="/demos/hub-overview"
            ready={VIDEOS_READY}
            glow
            aspectRatio="16 / 9"
            placeholderText="Full walkthrough"
          />
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Draft a spec, drag it onto a rail, watch it ship.
          </p>
        </Reveal>

        {/* Capability rows */}
        <div className="mt-20 md:mt-28 flex flex-col gap-20 md:gap-28">
          {CAPS.map((c) => (
            <div
              key={c.title}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <Reveal className={cn("flex flex-col", c.reverse ? "lg:order-2" : "lg:order-1")}>
                <span className="eyebrow flex items-center gap-2 mb-3">
                  <c.icon className="w-3.5 h-3.5 text-brand-cyan" aria-hidden="true" />
                  {c.eyebrow}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  {c.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-prose">
                  {c.body}
                </p>
              </Reveal>
              <Reveal delay={100} className={c.reverse ? "lg:order-1" : "lg:order-2"}>
                <DemoVideo
                  label={c.label}
                  poster={c.poster}
                  srcBase={c.srcBase}
                  ready={VIDEOS_READY}
                  icon={c.icon}
                  placeholderText="Demo video"
                />
              </Reveal>
            </div>
          ))}
        </div>

        {/* And more */}
        <div className="mt-20 md:mt-24 text-center">
          <Reveal as="span" className="eyebrow block mb-3">
            And more
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/85">
              <span className="inline-flex items-center gap-2">
                <Scissors className="h-4 w-4 text-brand-violet" aria-hidden="true" />
                SMASH an epic into sub-specs
              </span>
              <span className="inline-flex items-center gap-2">
                <Columns2 className="h-4 w-4 text-brand-violet" aria-hidden="true" />
                Compare two specs side by side
              </span>
            </div>
          </Reveal>
        </div>

        {/* Primary CTA */}
        <Reveal delay={100} className="mt-12 md:mt-16">
          <div className="flex flex-col items-center text-center gap-4">
            <Button
              asChild
              size="lg"
              className="gradient-btn cta-sheen rounded-pill w-full sm:w-auto px-8 h-12 text-base"
            >
              <Link to="/download">
                Get specrails-desktop
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </Link>
            </Button>
            <p className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Lock className="w-3 h-3" aria-hidden="true" />
              100% local · single-user · no accounts · no telemetry
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HubShowcaseSection;
