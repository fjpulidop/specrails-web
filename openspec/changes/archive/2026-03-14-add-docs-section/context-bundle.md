# Context Bundle: Add Docs Section

This file contains all context the developer needs to implement the docs section without further codebase investigation.

---

## Codebase State Summary

### Existing routing

`src/App.tsx` uses React Router v6 with two routes: `/` → `Index` and `*` → `NotFound`. The nested route structure for docs will be inserted between them.

### Navbar structure

`src/components/Navbar.tsx` is a simple functional component with no routing dependencies. It renders:
- A logo `<a href="#">`
- A `links` array mapped to plain `<a>` elements (desktop only, `hidden md:flex`)
- A GitHub icon link

The desktop links array is:
```typescript
const links = [
  { label: "Problem", href: "#problem" },
  { label: "Agents", href: "#agents" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Features", href: "#features" },
  { label: "Install", href: "#install" },
  { label: "Commands", href: "#commands" },
];
```

There is no mobile menu. This is a pre-existing gap — do not add a mobile menu as part of this change.

### shadcn/ui components available

All the following are already installed and available at `@/components/ui/`:
- `navigation-menu` (Radix NavigationMenu — use this for the Docs dropdown)
- `sheet` (use this for the mobile sidebar drawer)
- `button`
- `scroll-area`
- `separator`

### CSS custom properties (Dracula theme)

All defined in `src/index.css` `:root`. Key tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `--dracula-bg` | `231 15% 18%` | Page background |
| `--dracula-darker` | `234 16% 14%` | Code block backgrounds |
| `--dracula-current` | `232 14% 31%` | Card/hover backgrounds |
| `--dracula-fg` | `60 30% 96%` | Default text |
| `--dracula-comment` | `225 27% 51%` | Muted text, code comments |
| `--dracula-cyan` | `191 97% 77%` | Inline code text |
| `--dracula-green` | `135 94% 65%` | Function names, success |
| `--dracula-orange` | `31 100% 71%` | Parameters |
| `--dracula-pink` | `326 100% 74%` | Keywords, secondary accent |
| `--dracula-purple` | `265 89% 78%` | Primary accent |
| `--dracula-yellow` | `65 92% 76%` | Strings |

Existing utility classes: `.text-dracula-*`, `.bg-dracula-*`, `.border-dracula-*`, `.glass-card`, `.terminal`, `.gradient-text`

### Typography fonts

- Body: `Inter` (sans-serif)
- Monospace: `JetBrains Mono` (`font-mono` class)

### Existing patterns to follow

- Scroll animations via `useScrollAnimation` hook — not needed for docs pages (they are primarily reading interfaces)
- `cn()` from `@/lib/utils` for class merging
- Component props typed with explicit TypeScript interfaces
- No barrel exports — import directly from the component file

---

## Docs content inventory

| File | Slug | Title | Notes |
|------|------|-------|-------|
| `docs/README.md` | `""` | Documentation | Index/overview page with table of links |
| `docs/getting-started.md` | `getting-started` | Getting Started | Has bash code blocks |
| `docs/concepts.md` | `concepts` | Core Concepts | Has ASCII art diagrams in ` ``` ` blocks |
| `docs/installation.md` | `installation` | Installation & Setup | Long page, multiple sections |
| `docs/agents.md` | `agents` | Agents | Many tables, many headings |
| `docs/workflows.md` | `workflows` | Workflows & Commands | Code blocks with inline commands |
| `docs/customization.md` | `customization` | Customization | Code blocks with YAML/markdown |
| `docs/updating.md` | `updating` | Updating | Short page |

### Internal link patterns in markdown files

All footer navigation lines in the docs follow this pattern:
```markdown
[← Getting Started](getting-started.md) · [Agents →](agents.md)
```

The `urlTransform` function in `MarkdownRenderer` converts these at render time. No edits to the `.md` files are needed.

The `docs/README.md` uses relative links in its table:
```markdown
[Getting Started](getting-started.md)
[Core Concepts](concepts.md)
```

These are also handled by `urlTransform`.

---

## Key implementation decisions

### Why `?raw` imports instead of fetch

Vite's `?raw` suffix embeds the file content as a string literal in the bundle at build time. This is the correct approach for a static SPA — no runtime fetch is needed, there's no CORS concern, and the docs are available instantly without a loading state.

### Why not `@tailwindcss/typography` `prose` class

`@tailwindcss/typography` is installed (in devDependencies) but the `prose` class assumes a light color scheme and hardcodes many color values. Using a custom `.docs-prose` class in `index.css` with Dracula CSS variables gives complete control over every element's color without fighting the prose reset.

### Why `NavigationMenu` instead of `DropdownMenu` for the navbar

`NavigationMenu` (Radix) is the semantically correct component for site-level navigation. It has built-in keyboard navigation, proper ARIA roles, and the `NavigationMenuViewport` hover behavior is designed for top-level nav. `DropdownMenu` is for contextual actions (like right-click menus). The issue spec also explicitly recommends `NavigationMenu`.

### Why nested routes instead of flat routes for `/docs`

```tsx
// Nested (correct):
<Route path="/docs" element={<DocsLayout />}>
  <Route index element={<DocPage />} />
  <Route path=":slug" element={<DocPage />} />
</Route>
```

The nested structure means `DocsLayout` (sidebar + navbar) is mounted once and persists across doc-to-doc navigations. The sidebar does not re-render or lose scroll position when changing pages. With flat routes, the entire layout would remount on each navigation.

### `urlTransform` vs custom `a` component

`react-markdown` accepts both a `urlTransform` prop (transforms raw URLs in the AST before rendering) and a custom `components.a` renderer (wraps the final anchor). Both are needed:
- `urlTransform` converts `.md` URLs to `/docs/` paths
- The custom `a` component then checks if the resulting URL is internal and uses React Router `<Link>`

---

## New files to create

```
src/
├── lib/
│   └── docs-registry.ts          Task 3
├── types/
│   └── raw-imports.d.ts          Task 2
├── components/
│   ├── MarkdownRenderer.tsx      Task 4
│   ├── DocsDropdown.tsx          Task 8
│   └── DocsSidebar.tsx           Task 5
├── pages/
│   ├── DocsLayout.tsx            Task 6
│   └── DocPage.tsx               Task 7
└── test/
    ├── docs-registry.test.ts     Task 12
    └── MarkdownRenderer.test.tsx Task 12
```

## Files to modify

```
src/components/Navbar.tsx         Task 9  — add DocsDropdown
src/App.tsx                       Task 10 — add /docs routes
src/index.css                     Task 11 — add .docs-prose styles
package.json                      Task 1  — add dependencies
```

---

## Pitfalls to watch for

1. **`?raw` imports need the TypeScript declaration** (Task 2) before TypeScript will accept them. The import paths are relative from `src/lib/` to `docs/` at the repo root: `../../docs/README.md?raw`.

2. **The index route slug is `""`** (empty string), not `"index"` or `"readme"`. The `useParams` hook returns `undefined` for an unmatched optional param — always default: `const { slug = "" } = useParams()`.

3. **`DocsLayout` uses `pt-16` to clear the fixed Navbar** (which is `h-16` = 64px). The sidebar's `top-16` matches this.

4. **`NavigationMenuTrigger` has default `bg-background` styling** via the `navigationMenuTriggerStyle` CVA. Override with `className` to strip it and match the existing nav link appearance: `bg-transparent h-auto px-0 py-0 font-normal`.

5. **`MemoryRouter` wrapper required in tests** for any component that uses React Router hooks (`<Link>`, `useLocation`, `useParams`). Wrap render calls: `render(<MemoryRouter><Component /></MemoryRouter>)`.

6. **`highlight.js` language auto-detection** is used by `rehype-highlight` by default. The docs contain `bash`, `typescript`, `yaml`, `json`, and `markdown` code blocks. Auto-detection handles these correctly without manual language registration.

7. **The `docs/` folder is outside `src/`** — this is fine for Vite `?raw` imports via relative paths. If TypeScript's `rootDir` is set to `"src"` in `tsconfig.json`, it may need to be changed to `"."` to allow imports from `../../docs/`.

8. **Existing navbar links are anchor-scroll links** (`href="#problem"` etc.) and work from the `/` route. These do not need to be changed to React Router links — they use plain `<a>` tags and that is correct.
