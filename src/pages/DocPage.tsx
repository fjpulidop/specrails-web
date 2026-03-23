import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Server, Plug } from "lucide-react";
import { getDocBySlug, getAdjacentDocs } from "@/lib/docs-registry";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useSeo } from "@/hooks/useSeo";
import type { DocEntry } from "@/lib/docs-registry";

const PRODUCT_META: Record<
  NonNullable<DocEntry["product"]>,
  { label: string; Icon: React.ElementType; color: string; slug: string }
> = {
  hub: {
    label: "specrails-hub",
    Icon: Server,
    color: "text-dracula-green",
    slug: "hub-getting-started",
  },
  core: {
    label: "specrails-core",
    Icon: BookOpen,
    color: "text-dracula-cyan",
    slug: "getting-started",
  },
  mcp: {
    label: "specrails-mcp",
    Icon: Plug,
    color: "text-dracula-purple",
    slug: "mcp-getting-started",
  },
};

function NotFoundContent(): JSX.Element {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-foreground mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-6">
        This documentation page doesn't exist.
      </p>
      <Link
        to="/docs"
        className="text-dracula-purple hover:text-dracula-pink underline underline-offset-2 transition-colors"
      >
        Back to Documentation
      </Link>
    </div>
  );
}

function ProductBreadcrumb({ doc }: { doc: DocEntry }): JSX.Element | null {
  if (!doc.product) return null;
  const meta = PRODUCT_META[doc.product];
  const { Icon, label, color, slug } = meta;
  return (
    <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
      <Link to="/docs" className="hover:text-foreground transition-colors">
        Docs
      </Link>
      <span>/</span>
      <Link
        to={`/docs/${slug}`}
        className={`flex items-center gap-1 hover:text-foreground transition-colors ${color}`}
      >
        <Icon className="w-3 h-3" />
        {label}
      </Link>
      <span>/</span>
      <span className="text-foreground">{doc.title}</span>
    </nav>
  );
}

export default function DocPage(): JSX.Element {
  const { slug = "" } = useParams<{ slug?: string }>();
  const doc = getDocBySlug(slug);

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

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <ProductBreadcrumb doc={doc} />
      <MarkdownRenderer content={doc.content} product={doc.product} />

      {/* Prev/Next navigation */}
      <nav className="mt-16 pt-8 border-t border-border/20 flex justify-between gap-4">
        {prev ? (
          <Link
            to={prev.slug === "" ? "/docs" : `/docs/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-xs text-dracula-comment">Previous</div>
              <div>{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={next.slug === "" ? "/docs" : `/docs/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <div>
              <div className="text-xs text-dracula-comment">Next</div>
              <div>{next.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
