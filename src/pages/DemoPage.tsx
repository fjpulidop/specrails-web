import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { HubDashboard } from "@/components/hub/HubDashboard";
import { useSeo } from "@/hooks/useSeo";

export default function DemoPage(): JSX.Element {
  useSeo({
    title: "Interactive Demo — specrails-hub",
    description:
      "Try specrails-hub in action. Explore the dashboard, pipeline, command grid, and analytics with mock OpenClaw project data.",
    canonical: "https://specrails.dev/demo",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24 px-6 section-darker">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Try{" "}
              <span className="text-dracula-green">specrails-hub</span> in
              Action
            </h2>
            <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
              Real Hub components with{" "}
              <a
                href="https://github.com/openclaw/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dracula-purple hover:text-dracula-pink underline underline-offset-2 transition-colors"
              >
                OpenClaw
              </a>{" "}
              project data. Collapse sections, switch projects, pin dashboards,
              and press{" "}
              <kbd className="inline-flex items-center gap-0.5 rounded border border-border/50 bg-muted/30 px-1.5 py-0.5 text-xs text-muted-foreground font-mono">
                &Cmd;K
              </kbd>{" "}
              to open the command palette.
            </p>
            <p className="text-center text-sm text-muted-foreground mb-12 max-w-xl mx-auto">
              This is a small preview of the dashboard &mdash; specrails-hub
              includes{" "}
              <span className="text-foreground font-medium">
                activity feed, AI chat, job logs, docs portal, settings,
              </span>{" "}
              and much more. Install it to explore the full experience.
            </p>

            <HubDashboard />

            {/* CTA */}
            <div className="mt-8 text-center">
              <code
                className="text-sm font-mono text-dracula-green px-4 py-2 rounded-lg"
                style={{
                  background: "hsl(var(--dracula-current) / 0.4)",
                  border: "1px solid hsl(var(--dracula-green) / 0.2)",
                }}
              >
                npm install -g specrails-hub
              </code>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
