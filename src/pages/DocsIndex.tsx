import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { DOC_ENTRIES } from "@/lib/docs-registry";

export default function DocsIndex(): JSX.Element {
  useSeo({
    title: "Documentation — specrails",
    description:
      "Complete documentation for specrails — from installation to advanced agent customization and autonomous development workflows.",
    canonical: "https://specrails.dev/docs",
  });

  const coreEntries = DOC_ENTRIES.filter(
    (e) =>
      e.slug !== "" &&
      (e.section === "Getting Started" || e.section === "specrails-core")
  );
  const playbookEntries = DOC_ENTRIES.filter((e) => e.section === "Playbooks");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">Documentation</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Everything you need to run specrails — from first install to a fully autonomous product-driven
          development workflow.
        </p>
      </div>

      {/* Core docs */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-dracula-purple" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-dracula-comment">Core</h2>
        </div>
        <div className="space-y-2">
          {coreEntries.map((entry) => (
            <Link
              key={entry.slug}
              to={`/docs/${entry.slug}`}
              className="group flex items-start justify-between gap-4 rounded-lg border border-border/20 px-5 py-4 hover:border-dracula-purple/40 hover:bg-dracula-current/20 transition-colors"
            >
              <div className="min-w-0">
                <div className="font-medium text-foreground group-hover:text-dracula-purple transition-colors mb-0.5">
                  {entry.title}
                </div>
                <div className="text-sm text-muted-foreground">{entry.description}</div>
              </div>
              <ArrowRight className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0 group-hover:text-dracula-purple group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Playbooks */}
      {playbookEntries.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-dracula-cyan" />
            <h2 className="font-mono text-xs uppercase tracking-wider text-dracula-comment">Playbook</h2>
          </div>
          <div className="space-y-2">
            {playbookEntries.map((entry) => (
              <Link
                key={entry.slug}
                to={`/docs/${entry.slug}`}
                className="group flex items-start justify-between gap-4 rounded-lg border border-border/20 px-5 py-4 hover:border-dracula-cyan/40 hover:bg-dracula-current/20 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium text-foreground group-hover:text-dracula-cyan transition-colors mb-0.5">
                    {entry.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{entry.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0 group-hover:text-dracula-cyan group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
