# Design: Add Docs Section with Navigation and Markdown Rendering

## Architecture Overview

This is a pure frontend change. Documentation files live in `docs/` and are imported as raw strings using Vite's `?raw` import suffix. No build plugin or preprocessing pipeline is needed — the markdown is parsed at runtime by `react-markdown`. The docs system is self-contained: a central registry file defines all pages with metadata, and every component reads from that registry.

```
docs/*.md  (source of truth — raw files)
    │
    │  imported via ?raw at build time
    ▼
src/lib/docs-registry.ts   (metadata + raw content map)
    │
    ├──▶ src/components/DocsDropdown.tsx   (navbar dropdown)
    ├──▶ src/components/DocsSidebar.tsx    (sidebar nav)
    ├──▶ src/components/MarkdownRenderer.tsx (md → styled HTML)
    │
    └──▶ src/pages/DocsLayout.tsx          (shell: sidebar + outlet)
              └──▶ src/pages/DocPage.tsx   (reads slug, renders content)
```

---

## 1. Dependency Installation

Add to `dependencies` (not devDependencies — used at runtime):

```
react-markdown        ^9.x   — core markdown-to-React renderer
remark-gfm            ^4.x   — GitHub Flavored Markdown (tables, strikethrough, etc.)
rehype-highlight      ^7.x   — syntax highlighting via highlight.js
highlight.js          ^11.x  — the highlighter itself (Dracula theme available)
```

`@tailwindcss/typography` is already present as a devDependency — it will be used in the markdown container for base prose styling, overridden with Dracula custom properties.

**Why rehype-highlight over rehype-prism-plus?** `rehype-highlight` uses `highlight.js`, which ships a first-class Dracula theme (`highlight.js/styles/atom-one-dark`). The Dracula CSS variables from `index.css` are then used to further override specific token colors to match the site exactly. This avoids importing a full Prism theme that would conflict with the existing CSS.

---

## 2. Docs Registry (`src/lib/docs-registry.ts`)

This is the single source of truth for all doc pages. It defines ordering, metadata, slugs, and holds the raw markdown content.

```typescript
// src/lib/docs-registry.ts

import readmeRaw from "../../docs/README.md?raw";
import gettingStartedRaw from "../../docs/getting-started.md?raw";
import conceptsRaw from "../../docs/concepts.md?raw";
import installationRaw from "../../docs/installation.md?raw";
import agentsRaw from "../../docs/agents.md?raw";
import workflowsRaw from "../../docs/workflows.md?raw";
import customizationRaw from "../../docs/customization.md?raw";
import updatingRaw from "../../docs/updating.md?raw";

export interface DocEntry {
  slug: string;           // URL path segment, e.g. "getting-started"
  title: string;          // Display title
  description: string;    // Short description for dropdown/sidebar
  content: string;        // Raw markdown string
}

export const DOC_ENTRIES: DocEntry[] = [
  {
    slug: "",             // maps to /docs (index)
    title: "Documentation",
    description: "Overview and reading guide",
    content: readmeRaw,
  },
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Install and run your first workflow in 5 minutes",
    content: gettingStartedRaw,
  },
  {
    slug: "concepts",
    title: "Core Concepts",
    description: "The pipeline, agents, and product-driven approach",
    content: conceptsRaw,
  },
  {
    slug: "installation",
    title: "Installation & Setup",
    description: "Detailed setup, prerequisites, and the /setup wizard",
    content: installationRaw,
  },
  {
    slug: "agents",
    title: "Agents",
    description: "Every agent explained — role, model, and scope",
    content: agentsRaw,
  },
  {
    slug: "workflows",
    title: "Workflows & Commands",
    description: "How to use /implement, /product-backlog, and more",
    content: workflowsRaw,
  },
  {
    slug: "customization",
    title: "Customization",
    description: "Adapt agents, rules, personas, and conventions",
    content: customizationRaw,
  },
  {
    slug: "updating",
    title: "Updating",
    description: "Keep SpecRails current without losing customizations",
    content: updatingRaw,
  },
];

// Helper: look up a doc entry by slug
export function getDocBySlug(slug: string): DocEntry | undefined {
  return DOC_ENTRIES.find((d) => d.slug === slug);
}

// Helper: previous/next navigation
export function getAdjacentDocs(slug: string): {
  prev: DocEntry | null;
  next: DocEntry | null;
} {
  const idx = DOC_ENTRIES.findIndex((d) => d.slug === slug);
  return {
    prev: idx > 0 ? DOC_ENTRIES[idx - 1] : null,
    next: idx < DOC_ENTRIES.length - 1 ? DOC_ENTRIES[idx + 1] : null,
  };
}
```

**Why a registry instead of filesystem scanning?** Vite `?raw` imports must be static — dynamic `import()` with a variable path doesn't work with `?raw`. A registry gives us type safety, ordering control, and metadata co-location.

**TypeScript note:** Vite's `?raw` imports return `string`. Add a declaration to `src/vite-env.d.ts` (or a new `src/types/raw-imports.d.ts`) so TypeScript is satisfied:

```typescript
declare module "*.md?raw" {
  const content: string;
  export default content;
}
```

---

## 3. Vite Configuration

No changes needed for basic `?raw` imports — Vite supports this natively. However, the `docs/` folder is outside `src/`, so TypeScript's path resolution must reach it. The `tsconfig.json` already sets `"rootDir"` loosely enough (via `paths` in Vite config) and this pattern (`../../docs/`) resolves correctly via relative imports.

**Verify:** If TypeScript complains about importing outside `rootDir`, adjust `tsconfig.json`:

```json
{
  "compilerOptions": {
    "rootDir": "."   // change from "src" to "." if set
  }
}
```

---

## 4. Markdown Renderer (`src/components/MarkdownRenderer.tsx`)

This component wraps `react-markdown` with plugins and custom renderers for every element type that needs Dracula styling.

### Plugins

```typescript
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
```

### Component structure

```typescript
interface MarkdownRendererProps {
  content: string;
}

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
```

### Internal link transformation (`urlTransform`)

Markdown files use relative links like `getting-started.md` or `./concepts.md`. These must become `/docs/getting-started` for SPA routing.

```typescript
function transformUrl(url: string): string {
  // External links and anchors: pass through unchanged
  if (url.startsWith("http") || url.startsWith("#")) return url;

  // Transform relative .md links → /docs/slug
  const mdMatch = url.match(/^(?:\.\/)?([a-z-]+)\.md(#.*)?$/);
  if (mdMatch) {
    const slug = mdMatch[1] === "README" ? "" : mdMatch[1];
    const hash = mdMatch[2] ?? "";
    return `/docs/${slug}${hash}`;
  }

  return url;
}
```

### Custom component renderers

Links must use React Router's `<Link>` to enable client-side navigation:

```typescript
import { Link } from "react-router-dom";

const customComponents = {
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
      return <Link to={href} className="docs-link">{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="docs-link">
        {children}
      </a>
    );
  },
  // All other elements are styled via the .docs-prose CSS class (see section 9)
};
```

---

## 5. Docs Layout (`src/pages/DocsLayout.tsx`)

Shell page that renders sidebar + content area. Uses React Router's `<Outlet>` for child routes.

### Layout structure

```
┌─────────────────────────────────────────────────┐
│  Navbar (fixed, z-50)                           │
├────────────┬────────────────────────────────────┤
│            │                                    │
│  Sidebar   │   <Outlet />  (DocPage content)    │
│  (fixed,   │                                    │
│  240px)    │                                    │
│            │                                    │
└────────────┴────────────────────────────────────┘
```

### Responsive behavior

- **Desktop (md+):** Sidebar is permanently visible at 240px left. Content has `ml-60` margin.
- **Mobile (<md):** Sidebar is hidden by default. A hamburger/menu button in the content header toggles it as a slide-in drawer using the existing `Sheet` shadcn/ui component.

```typescript
// src/pages/DocsLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DocsLayout(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 fixed top-16 bottom-0 left-0 border-r border-border/20 bg-background overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* Mobile sidebar via Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-60 p-0 pt-16">
            <DocsSidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 md:ml-60 min-w-0">
          <div className="md:hidden flex items-center gap-3 px-6 py-4 border-b border-border/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <span className="text-sm text-muted-foreground font-mono">Docs</span>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

## 6. Docs Sidebar (`src/components/DocsSidebar.tsx`)

Lists all doc entries with active-state highlighting.

```typescript
interface DocsSidebarProps {
  onNavigate?: () => void; // called when a link is clicked (mobile: closes Sheet)
}
```

Active state: compare `useLocation().pathname` to `/docs/${entry.slug}`. Use `text-dracula-purple` and a left border accent for the active item.

Structure:
- Section header: "Documentation" in `font-mono text-xs uppercase tracking-wider text-dracula-comment`
- Each nav item: `NavLink` from React Router with active class injection
- Hover state: `hover:bg-dracula-current hover:text-foreground`
- Active state: `border-l-2 border-dracula-purple text-dracula-purple bg-dracula-current/50`

---

## 7. Doc Page (`src/pages/DocPage.tsx`)

Reads the `:slug` param, looks up the doc from the registry, renders it with `MarkdownRenderer`, and renders previous/next navigation.

```typescript
// src/pages/DocPage.tsx
import { useParams } from "react-router-dom";
import { getDocBySlug, getAdjacentDocs } from "@/lib/docs-registry";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
          <Link to={`/docs/${prev.slug}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-xs text-dracula-comment">Previous</div>
              <div>{prev.title}</div>
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/docs/${next.slug}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right">
            <div>
              <div className="text-xs text-dracula-comment">Next</div>
              <div>{next.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </nav>
    </div>
  );
}
```

**Edge case:** The index page (`/docs`) has slug `""`. `useParams` returns `undefined` for an optional param — the default `""` handles this.

---

## 8. Navbar Docs Dropdown (`src/components/DocsDropdown.tsx` + `Navbar.tsx`)

### New component: `DocsDropdown`

Uses the existing `NavigationMenu` shadcn/ui component. The dropdown lists all doc entries (excluding the index entry) with title and description.

```typescript
// src/components/DocsDropdown.tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { DOC_ENTRIES } from "@/lib/docs-registry";

export function DocsDropdown(): JSX.Element {
  const entries = DOC_ENTRIES.filter((d) => d.slug !== ""); // exclude index

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm text-muted-foreground hover:text-foreground h-auto px-0 py-0 font-normal">
            Docs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-3 bg-popover border border-border/30 rounded-xl shadow-xl">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/docs/${entry.slug}`}
                    className="block rounded-lg px-3 py-2 hover:bg-dracula-current transition-colors group"
                  >
                    <div className="text-sm font-medium text-foreground group-hover:text-dracula-purple transition-colors">
                      {entry.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {entry.description}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Navbar.tsx changes

1. Import `DocsDropdown`
2. Import `Link` from `react-router-dom` (for the logo — currently uses a plain `<a href="#">`)
3. Add `<DocsDropdown />` between "Commands" link and the GitHub icon
4. On mobile: add a "Docs" link in a mobile menu (currently there is no mobile menu — the entire nav is `hidden md:flex`). Since this is a pre-existing gap, add a simple mobile hamburger that opens a Sheet with all nav links including Docs. This is out of scope for the minimal implementation — instead, document as a known gap and add the Docs link as a visible item in a future mobile menu task.

**Minimal approach (in-scope):** Add `<DocsDropdown />` to the desktop nav bar only. The mobile menu gap is a pre-existing issue and not introduced by this feature.

---

## 9. Dracula-Themed Markdown CSS

Add a `.docs-prose` component class in `src/index.css` that styles all markdown elements. This is **not** the `@tailwindcss/typography` `prose` class (which has its own opinion on colors) — instead it's a custom class that applies Dracula tokens directly.

```css
/* src/index.css — inside @layer components */

.docs-prose {
  @apply text-foreground leading-7;
}

/* Headings */
.docs-prose h1 { @apply text-3xl font-bold mb-6 mt-0 text-foreground; }
.docs-prose h2 { @apply text-2xl font-semibold mb-4 mt-10 pb-2 border-b border-border/20 text-foreground; }
.docs-prose h3 { @apply text-xl font-semibold mb-3 mt-8 text-foreground; }
.docs-prose h4 { @apply text-base font-semibold mb-2 mt-6 text-foreground; }

/* Paragraphs and spacing */
.docs-prose p { @apply mb-4 text-foreground/90; }

/* Links */
.docs-prose a, .docs-link {
  @apply text-dracula-purple hover:text-dracula-pink underline underline-offset-2 transition-colors;
}

/* Code — inline */
.docs-prose :not(pre) > code {
  @apply font-mono text-sm px-1.5 py-0.5 rounded bg-dracula-current text-dracula-cyan;
}

/* Code blocks */
.docs-prose pre {
  @apply terminal p-4 mb-6 overflow-x-auto text-sm;
}
.docs-prose pre code {
  @apply bg-transparent p-0 text-dracula-fg font-mono;
}

/* highlight.js Dracula token overrides */
.docs-prose .hljs-keyword    { color: hsl(var(--dracula-pink)); }
.docs-prose .hljs-string     { color: hsl(var(--dracula-yellow)); }
.docs-prose .hljs-comment    { color: hsl(var(--dracula-comment)); font-style: italic; }
.docs-prose .hljs-function   { color: hsl(var(--dracula-green)); }
.docs-prose .hljs-variable   { color: hsl(var(--dracula-fg)); }
.docs-prose .hljs-number     { color: hsl(var(--dracula-purple)); }
.docs-prose .hljs-title      { color: hsl(var(--dracula-green)); }
.docs-prose .hljs-params     { color: hsl(var(--dracula-orange)); }
.docs-prose .hljs-built_in   { color: hsl(var(--dracula-cyan)); }
.docs-prose .hljs-attr       { color: hsl(var(--dracula-green)); }
.docs-prose .hljs-literal    { color: hsl(var(--dracula-purple)); }
.docs-prose .hljs-symbol     { color: hsl(var(--dracula-yellow)); }
.docs-prose .hljs-meta       { color: hsl(var(--dracula-comment)); }
.docs-prose .hljs            { background: hsl(var(--dracula-darker)); }

/* Tables */
.docs-prose table { @apply w-full text-sm mb-6 border-collapse; }
.docs-prose thead tr { @apply border-b border-border/30; }
.docs-prose th { @apply text-left px-3 py-2 font-semibold text-dracula-purple; }
.docs-prose td { @apply px-3 py-2 border-b border-border/10 text-foreground/80; }
.docs-prose tr:hover td { @apply bg-dracula-current/20; }

/* Blockquotes */
.docs-prose blockquote {
  @apply border-l-4 border-dracula-purple pl-4 my-4 text-muted-foreground italic;
}

/* Lists */
.docs-prose ul { @apply list-disc list-outside pl-6 mb-4 space-y-1; }
.docs-prose ol { @apply list-decimal list-outside pl-6 mb-4 space-y-1; }
.docs-prose li { @apply text-foreground/90; }

/* Horizontal rules */
.docs-prose hr { @apply border-border/20 my-8; }

/* Strong / emphasis */
.docs-prose strong { @apply font-semibold text-foreground; }
.docs-prose em { @apply italic text-foreground/80; }
```

**Why custom class over `@tailwindcss/typography`?** The `prose` class ships with hardcoded light-mode color values that conflict with the Dracula dark theme. Using a custom `.docs-prose` class gives full control over every token color without fighting the `prose` reset.

---

## 10. Route Structure (`App.tsx`)

```typescript
import DocsLayout from "./pages/DocsLayout.tsx";
import DocPage from "./pages/DocPage.tsx";

// Inside <Routes>:
<Route path="/docs" element={<DocsLayout />}>
  <Route index element={<DocPage />} />           {/* /docs */}
  <Route path=":slug" element={<DocPage />} />    {/* /docs/:slug */}
</Route>
```

The nested route structure means `DocsLayout` renders once and `DocPage` replaces via `<Outlet>` on each navigation — the sidebar stays mounted and doesn't re-render on doc-to-doc navigation.

---

## 11. Markdown File Internal Link Updates

All `docs/*.md` files use relative links like `getting-started.md`. The `urlTransform` function in `MarkdownRenderer` handles these automatically at render time, so **no changes to the markdown files are strictly required** for the SPA links to work.

However, the footer navigation lines in each doc (e.g., `[← Back to Docs](README.md) · [Core Concepts →](concepts.md)`) will be transformed correctly by `urlTransform`. No manual edits to `.md` files are needed.

**Decision:** Leave markdown files unchanged. The `urlTransform` function is the right place for this concern — it keeps the markdown files valid for GitHub rendering too.

---

## Summary of Files Changed/Created

| File | Status | Notes |
|------|--------|-------|
| `src/lib/docs-registry.ts` | New | Registry with metadata and raw imports |
| `src/types/raw-imports.d.ts` | New | TypeScript declarations for `*.md?raw` |
| `src/components/MarkdownRenderer.tsx` | New | react-markdown wrapper with Dracula styling |
| `src/components/DocsDropdown.tsx` | New | NavigationMenu dropdown for Navbar |
| `src/components/DocsSidebar.tsx` | New | Sidebar nav component |
| `src/pages/DocsLayout.tsx` | New | Layout shell with sidebar + Outlet |
| `src/pages/DocPage.tsx` | New | Individual doc page renderer |
| `src/components/Navbar.tsx` | Modified | Add DocsDropdown between Commands and GitHub icon |
| `src/App.tsx` | Modified | Add `/docs` nested routes |
| `src/index.css` | Modified | Add `.docs-prose` styles and highlight.js token overrides |
| `package.json` | Modified | Add react-markdown, remark-gfm, rehype-highlight, highlight.js |
