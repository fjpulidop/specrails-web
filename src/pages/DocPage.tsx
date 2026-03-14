import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDocBySlug, getAdjacentDocs } from "@/lib/docs-registry";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

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

export default function DocPage(): JSX.Element {
  const { slug = "" } = useParams<{ slug?: string }>();
  const doc = getDocBySlug(slug);

  if (!doc) {
    return <NotFoundContent />;
  }

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <MarkdownRenderer content={doc.content} />

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
