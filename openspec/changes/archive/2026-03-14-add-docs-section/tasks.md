# Tasks: Add Docs Section with Navigation and Markdown Rendering

All tasks are tagged `[frontend]`.

---

## Task 1 — Install dependencies [frontend]

**Description:** Install the four new npm packages required for markdown rendering.

**Command:**
```bash
npm install react-markdown remark-gfm rehype-highlight highlight.js
```

**Files involved:**
- `package.json`
- `package-lock.json`

**Acceptance criteria:**
- `react-markdown`, `remark-gfm`, `rehype-highlight`, `highlight.js` appear in `dependencies` in `package.json`
- `npm run build` succeeds after installation

**Dependencies:** None — do this first.

---

## Task 2 — Add TypeScript declaration for `*.md?raw` imports [frontend]

**Description:** Vite supports `?raw` imports natively but TypeScript doesn't know the type. Create a declaration file so TypeScript resolves these imports as `string`.

**Files involved:**
- `src/types/raw-imports.d.ts` (new)

**Content:**
```typescript
declare module "*.md?raw" {
  const content: string;
  export default content;
}
```

**Acceptance criteria:**
- `npx tsc --noEmit` passes after adding this file
- No TypeScript errors on `?raw` imports in the registry

**Dependencies:** Task 1

---

## Task 3 — Create docs registry (`src/lib/docs-registry.ts`) [frontend]

**Description:** Create the central registry that imports all `docs/*.md` files as raw strings and exports typed metadata for every doc page.

**Files involved:**
- `src/lib/docs-registry.ts` (new)
- `docs/README.md`, `docs/getting-started.md`, `docs/concepts.md`, `docs/installation.md`, `docs/agents.md`, `docs/workflows.md`, `docs/customization.md`, `docs/updating.md` (imported, not modified)

**Exports required:**
- `DocEntry` interface: `{ slug: string; title: string; description: string; content: string }`
- `DOC_ENTRIES: DocEntry[]` — array in reading order (index first, then getting-started → updating)
- `getDocBySlug(slug: string): DocEntry | undefined`
- `getAdjacentDocs(slug: string): { prev: DocEntry | null; next: DocEntry | null }`

**Acceptance criteria:**
- `DOC_ENTRIES` has exactly 8 entries
- `getDocBySlug("")` returns the README index entry
- `getDocBySlug("agents")` returns the Agents entry
- `getAdjacentDocs("getting-started").prev.slug` is `""` (index)
- `getAdjacentDocs("updating").next` is `null`
- `npx tsc --noEmit` passes

**Dependencies:** Task 2

---

## Task 4 — Create `MarkdownRenderer` component [frontend]

**Description:** Create the core markdown rendering component. Wraps `react-markdown` with `remark-gfm` and `rehype-highlight`. Handles internal link transformation and uses React Router `<Link>` for SPA navigation.

**Files involved:**
- `src/components/MarkdownRenderer.tsx` (new)

**Requirements:**
- Props: `{ content: string }`
- Wraps output in `<div className="docs-prose">`
- Uses `remarkPlugins={[remarkGfm]}` and `rehypePlugins={[rehypeHighlight]}`
- Implements `urlTransform` function that:
  - Passes through `http(s)://` and `#anchor` URLs unchanged
  - Converts `getting-started.md` → `/docs/getting-started`
  - Converts `README.md` → `/docs/` (or `/docs`)
  - Preserves `#` hash fragments on converted links
- Overrides the `a` component to use React Router `<Link>` for internal `/docs/*` paths
- External links open in `target="_blank" rel="noopener noreferrer"`
- TypeScript strict: no `any`, explicit return type on exported function

**Acceptance criteria:**
- Component renders without errors when given a markdown string
- Code blocks render with `hljs` CSS classes applied
- Tables render (remark-gfm required for this)
- Internal links (e.g., `[Agents](agents.md)`) render as `<Link to="/docs/agents">`
- External links render as `<a target="_blank">`
- `npx tsc --noEmit` passes

**Dependencies:** Tasks 1, 2, 3

---

## Task 5 — Create `DocsSidebar` component [frontend]

**Description:** Create the sidebar navigation component that lists all doc pages with active-state highlighting.

**Files involved:**
- `src/components/DocsSidebar.tsx` (new)

**Requirements:**
- Props: `{ onNavigate?: () => void }`
- Reads `DOC_ENTRIES` from the registry
- Uses `useLocation()` from React Router to determine active page
- Active item styling: `border-l-2 border-dracula-purple text-dracula-purple bg-dracula-current/50`
- Inactive item: `text-muted-foreground hover:text-foreground hover:bg-dracula-current/30`
- All items use React Router `<Link>` (not `<a>`)
- Calls `onNavigate?.()` on link click (for mobile Sheet close)
- Section header: "Documentation" label above the list in `font-mono text-xs uppercase tracking-wider text-dracula-comment`
- The index entry (`slug: ""`) links to `/docs`
- All other entries link to `/docs/${slug}`

**Acceptance criteria:**
- Sidebar renders all 8 entries
- Active state applies when route matches
- `onNavigate` callback fires on link click
- No TypeScript errors

**Dependencies:** Task 3

---

## Task 6 — Create `DocsLayout` page [frontend]

**Description:** Create the layout shell that combines Navbar, fixed desktop sidebar, mobile Sheet sidebar, and the `<Outlet>` for doc content.

**Files involved:**
- `src/pages/DocsLayout.tsx` (new)

**Requirements:**
- Renders `<Navbar />` at the top
- Adds `pt-16` to the flex container to clear the fixed navbar (which is 64px / `h-16`)
- Desktop: `<aside>` with `hidden md:flex`, `fixed top-16 bottom-0 left-0 w-60`, right border, overflow-y scroll
- Mobile: `<Sheet>` from shadcn/ui, opens via a `<Button variant="ghost" size="icon">` with `<Menu>` icon
- Sheet content: `side="left"`, `w-60`, renders `<DocsSidebar onNavigate={() => setMobileOpen(false)} />`
- Main content area: `flex-1 md:ml-60` for desktop offset, `min-w-0` to prevent flex overflow
- Mobile header bar (below navbar, above outlet): visible only on mobile (`md:hidden`), contains the menu button and "Docs" label
- `<Outlet />` renders the active doc page

**Acceptance criteria:**
- Layout renders correctly at all breakpoints
- Mobile menu button opens the Sheet with sidebar
- Clicking a sidebar link on mobile closes the Sheet
- Desktop sidebar is sticky and scrollable independently of main content
- No TypeScript errors

**Dependencies:** Tasks 4, 5

---

## Task 7 — Create `DocPage` component [frontend]

**Description:** Create the individual doc page that reads the route slug, fetches content from the registry, renders it, and shows previous/next navigation.

**Files involved:**
- `src/pages/DocPage.tsx` (new)

**Requirements:**
- Uses `useParams<{ slug?: string }>()` — defaults to `""` for the index route
- Calls `getDocBySlug(slug)` — if not found, renders a 404-style message with a link back to `/docs`
- Renders `<MarkdownRenderer content={doc.content} />`
- Below the content, renders prev/next navigation:
  - Uses `getAdjacentDocs(slug)` for prev/next links
  - Each side is a `<Link>` showing "Previous" / "Next" label, the doc title, and a directional `ArrowLeft` / `ArrowRight` icon with a hover translate animation
  - Layout: `flex justify-between` with the prev link left-aligned and next link right-aligned
  - Separated from content by a top border and margin
- Content container: `max-w-3xl mx-auto px-6 py-12`

**Acceptance criteria:**
- `/docs` renders README content with no prev link and "Getting Started" as next
- `/docs/getting-started` renders with "Documentation" as prev and "Core Concepts" as next
- `/docs/updating` renders with "Customization" as prev and no next link
- Invalid slug (e.g., `/docs/nonexistent`) renders a not-found message, not a blank page
- No TypeScript errors

**Dependencies:** Tasks 4, 6

---

## Task 8 — Create `DocsDropdown` component [frontend]

**Description:** Create the navbar dropdown using the existing `NavigationMenu` shadcn/ui component. Shows all non-index doc entries with title and description.

**Files involved:**
- `src/components/DocsDropdown.tsx` (new)

**Requirements:**
- Uses `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent` from `@/components/ui/navigation-menu`
- Trigger: "Docs" text, styled to match the existing navbar links (`text-sm text-muted-foreground hover:text-foreground`), transparent background, no default padding
- Override trigger `className` to strip the default `bg-background` and match the existing link style
- Dropdown content: `<ul>` grid with one `<li>` per non-index entry
- Each item: `<Link to="/docs/${slug}">` with entry title (bold, hover turns `text-dracula-purple`) and description (small, muted)
- Dropdown container: `w-80`, `bg-popover`, `border border-border/30`, `rounded-xl`, `shadow-xl`
- Uses React Router `<Link>` (not `<a>`) so navigation is SPA-style

**Acceptance criteria:**
- Dropdown opens on trigger click/hover
- All 7 non-index entries are listed
- Clicking an entry navigates to the correct `/docs/:slug` route
- Styling matches Dracula theme
- No TypeScript errors

**Dependencies:** Task 3

---

## Task 9 — Update `Navbar.tsx` to include `DocsDropdown` [frontend]

**Description:** Integrate the `DocsDropdown` component into the existing Navbar between the "Commands" link and the GitHub icon.

**Files involved:**
- `src/components/Navbar.tsx` (modified)

**Changes:**
1. Import `DocsDropdown` from `@/components/DocsDropdown`
2. In the desktop nav (`hidden md:flex items-center gap-6`), add `<DocsDropdown />` after the last `links.map(...)` anchor and before the GitHub `<a>` icon
3. The existing links array remains unchanged — `DocsDropdown` sits alongside the plain `<a>` links
4. No changes needed to the mobile section (pre-existing gap — out of scope)

**Acceptance criteria:**
- "Docs" dropdown appears in the desktop navbar between "Commands" and the GitHub icon
- Dropdown opens and lists all doc pages
- Other navbar links are unaffected
- No TypeScript errors, no lint errors

**Dependencies:** Tasks 8

---

## Task 10 — Add docs routes to `App.tsx` [frontend]

**Description:** Register the `/docs` nested routes in the React Router configuration.

**Files involved:**
- `src/App.tsx` (modified)

**Changes:**
1. Import `DocsLayout` from `./pages/DocsLayout.tsx`
2. Import `DocPage` from `./pages/DocPage.tsx`
3. Add the following route block above the catch-all `*` route:
   ```tsx
   <Route path="/docs" element={<DocsLayout />}>
     <Route index element={<DocPage />} />
     <Route path=":slug" element={<DocPage />} />
   </Route>
   ```

**Acceptance criteria:**
- `/docs` renders `DocsLayout` with `DocPage` for the index entry
- `/docs/getting-started` renders `DocsLayout` with the Getting Started doc
- `/docs/nonexistent` renders the not-found state inside `DocsLayout` (not the top-level NotFound page)
- The existing `/` and `*` routes are unaffected
- No TypeScript errors

**Dependencies:** Tasks 6, 7

---

## Task 11 — Add `.docs-prose` CSS and highlight.js token overrides to `index.css` [frontend]

**Description:** Add all Dracula-themed markdown typography styles to `src/index.css`.

**Files involved:**
- `src/index.css` (modified)

**Changes:** Add inside the `@layer components { }` block:
- `.docs-prose` base styles (text color, line height)
- Heading styles for `h1`–`h4` with appropriate spacing and Dracula foreground color
- `h2` has a bottom border to visually separate sections
- Inline `code` styling: monospace, `bg-dracula-current`, `text-dracula-cyan`, rounded
- `pre` block: uses the existing `.terminal` class for consistency, `overflow-x-auto`
- `pre code`: strips background, uses `text-dracula-fg` (highlight.js adds per-token colors on top)
- `highlight.js` token class overrides (`.hljs-keyword`, `.hljs-string`, etc.) using Dracula CSS variables
- Table styles: collapsed borders, purple header text, subtle row hover
- Blockquote: left border in `border-dracula-purple`, muted italic text
- List styles: proper spacing and indentation
- `hr`: subtle border
- `.docs-link` utility class (also used by the `a` override in `MarkdownRenderer`)

**Acceptance criteria:**
- Code blocks render with Dracula token colors (keywords pink, strings yellow, comments muted)
- Tables are styled and match the site visual language
- Headings have correct hierarchy spacing
- No existing styles are broken
- `npm run build` passes

**Dependencies:** None (CSS can be added independently, but test with Task 4 in place)

---

## Task 12 — Write Vitest tests for docs registry and MarkdownRenderer [frontend]

**Description:** Add basic test coverage for the two most logic-bearing new modules.

**Files involved:**
- `src/test/docs-registry.test.ts` (new)
- `src/test/MarkdownRenderer.test.tsx` (new)

**Registry tests (`docs-registry.test.ts`):**
```typescript
describe("docs-registry", () => {
  it("has 8 entries", () => expect(DOC_ENTRIES).toHaveLength(8));
  it("getDocBySlug returns correct entry", () => {
    expect(getDocBySlug("agents")?.title).toBe("Agents");
  });
  it("getDocBySlug returns undefined for unknown slug", () => {
    expect(getDocBySlug("nonexistent")).toBeUndefined();
  });
  it("getAdjacentDocs: first entry has no prev", () => {
    expect(getAdjacentDocs("").prev).toBeNull();
  });
  it("getAdjacentDocs: last entry has no next", () => {
    expect(getAdjacentDocs("updating").next).toBeNull();
  });
  it("content is non-empty for all entries", () => {
    DOC_ENTRIES.forEach((d) => expect(d.content.length).toBeGreaterThan(0));
  });
});
```

**MarkdownRenderer tests (`MarkdownRenderer.test.tsx`):**
```typescript
describe("MarkdownRenderer", () => {
  it("renders heading from markdown", () => {
    render(<MarkdownRenderer content="# Hello" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hello");
  });
  it("renders a link for internal .md links", () => {
    render(<MarkdownRenderer content="[Agents](agents.md)" />);
    const link = screen.getByRole("link", { name: "Agents" });
    // React Router Link renders as <a> in test environment
    expect(link).toHaveAttribute("href", "/docs/agents");
  });
  it("renders external links with target blank", () => {
    render(<MarkdownRenderer content="[GitHub](https://github.com)" />);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

**Note:** `MarkdownRenderer` tests require a `MemoryRouter` wrapper since the component uses `<Link>`. Set this up in the test render call.

**Acceptance criteria:**
- All registry tests pass
- All MarkdownRenderer tests pass
- `npm test` exits 0

**Dependencies:** Tasks 3, 4

---

## Task 13 — End-to-end verification [frontend]

**Description:** Manually verify the complete docs section before marking the change as complete.

**Verification checklist:**

1. `npm run dev` starts without errors
2. Navigate to `http://localhost:8080/docs` — README index renders
3. Navigate to `/docs/getting-started` — Getting Started renders with syntax-highlighted code blocks
4. Navigate to `/docs/concepts` — ASCII diagrams in `pre` blocks render in monospace
5. Navigate to `/docs/agents` — tables render with Dracula purple headers
6. Navigate to `/docs/workflows` — long page, sidebar remains fixed while scrolling
7. Click "Next" at the bottom of each page — navigates correctly through all 8 docs
8. Click a navbar "Docs" dropdown item — navigates to the correct page
9. Resize to mobile width — sidebar is hidden, menu button appears
10. Click menu button on mobile — Sheet opens with sidebar links
11. Click a sidebar link on mobile — Sheet closes, content updates
12. `npm run lint` — 0 errors
13. `npx tsc --noEmit` — 0 errors
14. `npm test` — all tests pass
15. `npm run build` — build succeeds, no warnings about unresolved imports

**Dependencies:** All previous tasks
