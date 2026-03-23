import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Link } from "react-router-dom";
import type { Components } from "react-markdown";
import type { DocEntry } from "@/lib/docs-registry";

interface MarkdownRendererProps {
  content: string;
  product?: DocEntry["product"];
}

// Filename basename → slug for hub docs
const HUB_SLUG_MAP: Record<string, string> = {
  "getting-started": "hub-getting-started",
  "platform-overview": "hub-platform-overview",
  "features": "hub-features",
  "workflows": "hub-workflows",
  "openspec-workflow": "hub-openspec-workflow",
  "api-reference": "hub-api-reference",
  "configuration": "hub-configuration",
};

// Filename basename → slug for mcp docs
const MCP_SLUG_MAP: Record<string, string> = {
  "getting-started": "mcp-getting-started",
  "README": "mcp-overview",
};

function makeTransformUrl(product: DocEntry["product"]) {
  return function transformUrl(url: string): string {
    // External links and anchors: pass through unchanged
    if (url.startsWith("http") || url.startsWith("#")) return url;

    // Match relative .md links at any depth (./foo.md, ../bar/foo.md, foo.md)
    const mdMatch = url.match(/^(?:.*\/)?([a-zA-Z][a-zA-Z0-9_-]*)\.md(#.*)?$/);
    if (mdMatch) {
      const basename = mdMatch[1];
      const hash = mdMatch[2] ?? "";

      if (product === "hub") {
        const hubSlug = HUB_SLUG_MAP[basename];
        if (hubSlug) return `/docs/${hubSlug}${hash}`;
      } else if (product === "mcp") {
        const mcpSlug = MCP_SLUG_MAP[basename];
        if (mcpSlug) return `/docs/${mcpSlug}${hash}`;
      }

      // Core docs or cross-product fallback: use basename as slug directly
      const slug = basename === "README" ? "" : basename;
      return `/docs/${slug}${hash}`;
    }

    return url;
  };
}

function makeComponents(transformUrl: (url: string) => string): Components {
  return {
    a: ({ href, children }) => {
      const resolved = href ? transformUrl(href) : href;
      const isInternal = resolved?.startsWith("/");
      if (isInternal && resolved) {
        return (
          <Link to={resolved} className="docs-link">
            {children}
          </Link>
        );
      }
      return (
        <a href={resolved} target="_blank" rel="noopener noreferrer" className="docs-link">
          {children}
        </a>
      );
    },
  };
}

export function MarkdownRenderer({ content, product }: MarkdownRendererProps): JSX.Element {
  const transformUrl = makeTransformUrl(product);
  const components = makeComponents(transformUrl);

  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={components}
        urlTransform={transformUrl}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
