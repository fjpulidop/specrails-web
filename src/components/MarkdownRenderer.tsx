import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Link } from "react-router-dom";
import { Info, Lightbulb, AlertTriangle, Link2 } from "lucide-react";
import type { Components } from "react-markdown";
import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/utils";

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

/** Recursively flatten React children into plain text (for copy + slugs). */
function nodeToString(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToString).join("");
  if (isValidElement(node)) {
    if (node.type === "br") return "\n";
    return nodeToString((node.props as { children?: ReactNode }).children);
  }
  return "";
}

// ── GitHub-style callouts ──────────────────────────────────────────────────
type CalloutKind = "note" | "tip" | "warning";

const CALLOUT_CONFIG: Record<
  CalloutKind,
  { label: string; icon: typeof Info; cardClass: string; iconClass: string }
> = {
  note: {
    label: "Note",
    icon: Info,
    cardClass: "docs-callout-note",
    iconClass: "text-brand-cyan",
  },
  tip: {
    label: "Tip",
    icon: Lightbulb,
    cardClass: "docs-callout-tip",
    iconClass: "text-accent-success",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    cardClass: "docs-callout-warning",
    iconClass: "text-accent-warning",
  },
};

const CALLOUT_ALIASES: Record<string, CalloutKind> = {
  note: "note",
  info: "note",
  important: "note",
  tip: "tip",
  hint: "tip",
  success: "tip",
  warning: "warning",
  caution: "warning",
  danger: "warning",
};

/**
 * Strips a leading `[!TYPE]` marker (and the following soft break) from the
 * start of a node list, preserving the remaining inline nodes (links, code…).
 */
function stripLeadingMarker(nodes: ReactNode[]): ReactNode[] {
  const out = [...nodes];
  let removed = false;
  while (out.length > 0 && !removed) {
    const head = out[0];
    if (typeof head === "string") {
      const replaced = head.replace(/^\s*\[![A-Za-z]+\]\s*\n?/, "");
      if (replaced !== head) {
        removed = true;
        if (replaced.trim() === "") out.shift();
        else out[0] = replaced.replace(/^\n/, "");
      } else {
        break;
      }
    } else if (isValidElement(head) && head.type === "br") {
      // leading break left after the marker — drop it
      out.shift();
    } else {
      break;
    }
  }
  // Trim a leading soft-break / blank string left behind.
  while (out.length > 0) {
    const head = out[0];
    if (isValidElement(head) && head.type === "br") out.shift();
    else if (typeof head === "string" && head.trim() === "") out.shift();
    else break;
  }
  return out;
}

/**
 * Detects a leading `[!TYPE]` marker (GitHub alert syntax) inside a blockquote
 * and returns the matched kind plus the children with the marker stripped.
 * Inline formatting (links, code, bold) in the body is preserved.
 */
function detectCallout(
  children: ReactNode,
): { kind: CalloutKind; rest: ReactNode[] } | null {
  const items = Children.toArray(children);
  const firstReal = items.find(
    (item) => !(typeof item === "string" && item.trim() === ""),
  );
  if (!isValidElement(firstReal)) return null;

  const firstChildren = Children.toArray(
    (firstReal.props as { children?: ReactNode }).children,
  );
  const leadText = nodeToString(firstChildren);
  const match = leadText.match(/^\s*\[!([A-Za-z]+)\]/);
  if (!match) return null;

  const kind = CALLOUT_ALIASES[match[1].toLowerCase()];
  if (!kind) return null;

  const strippedFirst = stripLeadingMarker(firstChildren);
  const rest: ReactNode[] = [];
  if (strippedFirst.length > 0) {
    rest.push(
      <p key="callout-lead" className="mb-0 text-foreground/90">
        {strippedFirst}
      </p>,
    );
  }
  for (const item of items) {
    if (item === firstReal) continue;
    if (typeof item === "string" && item.trim() === "") continue;
    rest.push(item);
  }
  return { kind, rest };
}

function HeadingAnchor({ id }: { id?: string }): JSX.Element | null {
  if (!id) return null;
  return (
    <a
      href={`#${id}`}
      aria-label="Link to this section"
      tabIndex={-1}
      className={cn(
        "ml-2 inline-flex items-center align-middle text-muted-foreground/60",
        "opacity-0 transition-opacity hover:text-brand-cyan group-hover:opacity-100",
        "focus-visible:opacity-100",
      )}
    >
      <Link2 className="h-4 w-4" aria-hidden="true" />
    </a>
  );
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

  // Heading anchors on hover — ids come from rehype-slug.
  h2: ({ id, children }) => (
    <h2 id={id} className="group">
      {children}
      <HeadingAnchor id={id} />
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3 id={id} className="group">
      {children}
      <HeadingAnchor id={id} />
    </h3>
  ),
  h4: ({ id, children }) => (
    <h4 id={id} className="group">
      {children}
      <HeadingAnchor id={id} />
    </h4>
  ),

  // Code blocks get a copy button. Inline code is left to the prose styles.
  // `node` is dropped so it never lands on the DOM element as an attribute.
  pre: ({ children, node: _node, ...props }) => {
    const code = nodeToString(children).replace(/\n$/, "");
    return (
      <div className="group/code relative">
        <pre {...props}>{children}</pre>
        <CopyButton
          value={code}
          label="Copy code"
          className="absolute right-3 top-3 opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
        />
      </div>
    );
  },

  // GitHub alert blockquotes → callout cards; everything else stays a blockquote.
  blockquote: ({ children }) => {
    const callout = detectCallout(children);
    if (!callout) return <blockquote>{children}</blockquote>;

    const { label, icon: Icon, cardClass, iconClass } = CALLOUT_CONFIG[callout.kind];
    return (
      <div className={cn("docs-callout not-italic", cardClass)} role="note">
        <Icon
          className={cn("mt-0.5 h-5 w-5 shrink-0", iconClass)}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className={cn("mb-1 font-semibold not-italic", iconClass)}>
            {label}
          </div>
          <div className="space-y-2 not-italic text-foreground/90 [&_p]:mb-0 [&>*:last-child]:mb-0">
            {callout.rest}
          </div>
        </div>
      </div>
    );
  },
};

export function MarkdownRenderer({ content }: MarkdownRendererProps): JSX.Element {
  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={customComponents}
        urlTransform={transformUrl}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
