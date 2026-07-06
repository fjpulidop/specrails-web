import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight, Home } from "lucide-react";
import { getDocBySlug, getAdjacentDocs } from "@/lib/docs-registry";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSeo } from "@/hooks/useSeo";
import { useI18n } from "@/lib/i18n";

function NotFoundContent(): JSX.Element {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-foreground mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-6">
        This documentation page doesn't exist.
      </p>
      <Link
        to="/docs"
        className="text-brand-cyan hover:text-brand-violet underline underline-offset-2 transition-colors"
      >
        Back to Documentation
      </Link>
    </div>
  );
}

export default function DocPage(): JSX.Element {
  const { slug = "" } = useParams<{ slug?: string }>();
  const { content, languageId } = useI18n();
  const doc = getDocBySlug(slug, languageId);

  useSeo({
    title: doc ? `${doc.title} — specrails` : "Not Found — specrails",
    description: doc
      ? `${doc.description} — specrails documentation.`
      : "This documentation page doesn't exist.",
    canonical: `https://specrails.dev/docs/${slug}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!doc) {
    return <NotFoundContent />;
  }

  const { prev, next } = getAdjacentDocs(slug, languageId);

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-6 py-10 md:py-12">
      {/* Reading column — capped for a comfortable reading measure */}
      <article className="min-w-0 max-w-3xl flex-1">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link
            to="/docs"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            {content.nav.docs}
          </Link>
          {doc.section && (
            <>
              <ChevronRight
                className="h-3.5 w-3.5 text-muted-foreground/50"
                aria-hidden="true"
              />
              <span className="font-mono text-xs uppercase tracking-wider">
                {doc.section}
              </span>
            </>
          )}
          <ChevronRight
            className="h-3.5 w-3.5 text-muted-foreground/50"
            aria-hidden="true"
          />
          <span className="truncate font-medium text-foreground">{doc.title}</span>
        </nav>

        {/* Mobile / tablet inline TOC (sidebar drawer handles page nav) */}
        <div className="mb-8 xl:hidden">
          <Collapsible>
            <div className="rounded-card border border-border/60 bg-surface-2/60">
              <CollapsibleTrigger className="group/toc flex w-full items-center justify-between gap-2 px-4 py-3 text-left">
                <span className="eyebrow text-muted-foreground">On this page</span>
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/toc:rotate-90"
                  aria-hidden="true"
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border/40 px-4 py-3">
                  <TableOfContents variant="compact" contentKey={slug} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        <MarkdownRenderer content={doc.content} doc={doc} />

        {/* Prev/Next navigation */}
        <nav className="mt-16 grid gap-4 border-t border-border/30 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              to={prev.slug === "" ? "/docs" : `/docs/${prev.slug}`}
              className="group flex flex-col gap-1 rounded-card border border-border/60 bg-surface-2/40 p-4 transition-colors hover:border-brand-cyan/40 hover:bg-surface-3/40"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="font-medium text-foreground group-hover:text-brand-cyan transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              to={next.slug === "" ? "/docs" : `/docs/${next.slug}`}
              className="group flex flex-col gap-1 rounded-card border border-border/60 bg-surface-2/40 p-4 text-right transition-colors hover:border-brand-cyan/40 hover:bg-surface-3/40 sm:items-end"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Next
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="font-medium text-foreground group-hover:text-brand-cyan transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </nav>
      </article>

      {/* Sticky right rail TOC — third column on wide screens */}
      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10">
          <TableOfContents contentKey={slug} />
        </div>
      </aside>
    </div>
  );
}
