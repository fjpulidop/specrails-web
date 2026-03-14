import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

function transformUrl(url: string): string {
  // External links and anchors: pass through unchanged
  if (url.startsWith("http") || url.startsWith("#")) return url;

  // Transform relative .md links → /docs/slug
  const mdMatch = url.match(/^(?:\.\/)?([a-zA-Z-]+)\.md(#.*)?$/);
  if (mdMatch) {
    const slug = mdMatch[1] === "README" ? "" : mdMatch[1];
    const hash = mdMatch[2] ?? "";
    return `/docs/${slug}${hash}`;
  }

  return url;
}

const customComponents: Components = {
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal && href) {
      return (
        <Link to={href} className="docs-link">
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="docs-link">
        {children}
      </a>
    );
  },
};

export function MarkdownRenderer({ content }: MarkdownRendererProps): JSX.Element {
  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={customComponents}
        urlTransform={transformUrl}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
