import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Terminal, Github, ArrowLeft, Layers, Zap, Box, Workflow } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useSeo } from "@/hooks/useSeo";

// openspec: hero-redesign-hub-primary (core-page capability)

const CorePage = () => {
  useSeo({
    title: "specrails-core — The CLI behind specrails-hub",
    description:
      "specrails-core is the terminal-first CLI for spec-driven AI development. Quick setup, 14 agents, and a structured pipeline from idea to shipped code.",
    canonical: "https://specrails.dev/core",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-5xl px-6 pt-28 pb-20 space-y-24">
        {/* 1. Banner */}
        <header id="banner" className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dracula-cyan/30 bg-dracula-cyan/5 text-xs font-mono text-dracula-cyan mb-6">
            <Terminal className="w-3.5 h-3.5" />
            For terminal-first developers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="font-mono text-dracula-cyan">specrails-core</span>
            <br />
            <span className="text-muted-foreground text-2xl md:text-3xl">
              The CLI behind specrails-hub
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Structured, spec-driven AI development from the terminal. No
            dashboard, no GUI — just your shell and the pipeline.
          </p>
        </header>

        {/* 2. Install block */}
        <section id="install" className="space-y-6">
          <SectionHeading icon={Zap} title="Install" />
          <div className="grid md:grid-cols-2 gap-4">
            <InstallCard
              title="Quick setup"
              command="npx specrails-core@latest init"
              blurb="Auto-detects your provider, picks 8 of 14 agents, ready in under a minute."
            />
            <InstallCard
              title="Full setup"
              command="npx specrails-core@latest init --tier full"
              blurb="All 14 agents, enrichment, VPC personas. ~3 minutes first run."
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Works with <span className="text-dracula-orange">Claude Code</span>.
          </p>
        </section>

        {/* 3. Architecture */}
        <section id="architecture" className="space-y-6">
          <SectionHeading icon={Workflow} title="Architecture" />
          <div className="grid md:grid-cols-3 gap-4">
            <PillarCard
              title="Agents"
              body="14 specialised AI agents covering architect, developer, reviewer, security, docs, tests, and ship roles."
            />
            <PillarCard
              title="Pipeline"
              body="Phased execution — idea → spec → implement → review → ship. Each phase has explicit gates and confidence scoring."
            />
            <PillarCard
              title="Rails"
              body="Parallel execution lanes with git worktrees so two specs can run side by side without stepping on each other."
            />
          </div>
        </section>

        {/* 4. Agents teaser */}
        <section id="agents-teaser" className="space-y-6">
          <SectionHeading icon={Box} title="Agents catalog" />
          <p className="text-muted-foreground">
            Each agent is a focused Claude Code sub-process with a sharp
            system prompt and scoped tool access. See the full list:
          </p>
          <Link
            to="/agents"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dracula-cyan/30 bg-dracula-cyan/5 text-dracula-cyan text-sm font-medium hover:bg-dracula-cyan/10 transition-colors"
          >
            Browse all 14 agents
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </section>

        {/* 5. Customisation */}
        <section id="customise" className="space-y-4">
          <SectionHeading icon={Layers} title="Customise your team" />
          <p className="text-muted-foreground max-w-3xl">
            Drop your own agents and slash commands into{" "}
            <code className="text-dracula-cyan">.claude/agents/</code> and{" "}
            <code className="text-dracula-cyan">.claude/commands/</code>. They
            appear in the pipeline alongside the built-ins. Export any spec
            from the hub into a command; import any command back into core.
          </p>
        </section>

        {/* 6. Integration examples */}
        <section id="integrations" className="space-y-6">
          <SectionHeading title="Run it where you live" />
          <div className="grid md:grid-cols-3 gap-4">
            <IntegrationCard label="CI" blurb="Run the full pipeline on every PR to block regressions before merge." />
            <IntegrationCard label="Pre-commit" blurb="Lint-and-test agents as git hooks catch issues before code leaves your laptop." />
            <IntegrationCard label="Cron" blurb="Scheduled runs for nightly health checks, dependency updates, docs sync." />
          </div>
        </section>

        {/* 7. GitHub CTA */}
        <section id="github-cta" className="text-center space-y-4">
          <a
            href="https://github.com/fjpulidop/specrails-core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dracula-cyan/10 border border-dracula-cyan/30 text-dracula-cyan font-semibold hover:bg-dracula-cyan/15 transition-colors"
          >
            <Github className="w-5 h-5" />
            specrails-core on GitHub
          </a>
          <p className="text-xs text-muted-foreground">
            MIT licensed · Contributions welcome
          </p>
        </section>

        {/* 8. Back to Hub */}
        <section id="back-to-hub" className="text-center pt-8 border-t border-border/20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-dracula-purple hover:text-dracula-pink transition-colors text-sm"
          >
            Want the dashboard?
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span className="font-medium">specrails-hub</span>
          </Link>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

// ---------- helpers ----------

const SectionHeading = ({
  icon: Icon,
  title,
}: {
  icon?: typeof Terminal;
  title: string;
}) => (
  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
    {Icon && <Icon className="w-6 h-6 text-dracula-cyan" />}
    {title}
  </h2>
);

const InstallCard = ({
  title,
  command,
  blurb,
}: {
  title: string;
  command: string;
  blurb: string;
}) => (
  <div className="glass-card p-6 border-dracula-cyan/20">
    <h3 className="text-sm font-semibold text-dracula-cyan mb-3">{title}</h3>
    <pre className="bg-dracula-bg/60 rounded-md p-3 text-xs font-mono text-dracula-green overflow-x-auto mb-3">
      <code>{command}</code>
    </pre>
    <p className="text-xs text-muted-foreground">{blurb}</p>
  </div>
);

const PillarCard = ({ title, body }: { title: string; body: string }) => (
  <div className="glass-card p-5 border-border/30">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
  </div>
);

const IntegrationCard = ({ label, blurb }: { label: string; blurb: string }) => (
  <div className="glass-card p-5 border-border/30">
    <span className="text-xs font-mono text-dracula-cyan uppercase tracking-wider">
      {label}
    </span>
    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{blurb}</p>
  </div>
);

export default CorePage;
