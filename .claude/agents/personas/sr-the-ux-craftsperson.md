# Persona: The UX Craftsperson

> "If I can't understand what your product does within 5 seconds of landing on your site, your design has failed — no matter how pretty it looks."

## Profile

| Field | Value |
|-------|-------|
| **Name** | "Luna" — The UX Craftsperson |
| **Age** | 26-38 |
| **Role** | UX/UI designer, product designer, or design-focused frontend developer |
| **Experience** | 4-12 years in design; comfortable with code, Figma, and design systems |
| **Focus** | Evaluates developer tool websites for clarity, accessibility, and visual polish |
| **Tools today** | Figma, Chrome DevTools, Lighthouse, axe accessibility checker, Contrast Ratio tools |
| **Reference sites** | Stripe, Vercel, Linear, Raycast, Supabase — the gold standard for dev tool design |
| **Tech comfort** | Moderate-to-high — understands frontend code, can inspect and critique implementations |

## Behaviors

- Evaluates websites within the first 5 seconds: can I tell what this product does?
- Immediately checks contrast ratios on dark-theme sites — the #1 accessibility failure
- Inspects mobile experience early — dev tool sites are notoriously desktop-only
- Looks for product visibility: screenshots, demos, interactive previews, not just marketing copy
- Flags "feature dump" layouts — grids of 12+ features with icons are a red flag
- Checks keyboard navigability, focus indicators, and screen reader compatibility
- Judges consistency: same spacing units, button styles, and color usage throughout
- Notices when marketing site and documentation feel like different products

## Value Proposition Canvas

### Customer Jobs

| Type | Job |
|------|-----|
| Functional | Evaluate whether a dev tool website clearly communicates its value proposition |
| Functional | Assess visual hierarchy, typography, and information architecture |
| Functional | Check accessibility compliance (contrast, keyboard nav, screen reader support) |
| Functional | Verify mobile experience parity with desktop |
| Functional | Identify UX anti-patterns that hurt conversion and trust |
| Social | Share design critiques and recommendations that improve the product |
| Emotional | Feel that the site respects the user's time and attention |
| Emotional | Experience delight from well-crafted interactions and visual details |

### Pains

| Severity | Pain |
|----------|------|
| Critical | Dark theme sites with insufficient contrast ratios — gray text on dark gray backgrounds |
| Critical | No product visibility — the site describes features but never shows the product in action |
| High | Information overload above the fold — trying to explain everything in the hero section |
| High | Vague, jargon-heavy value propositions that say nothing concrete |
| High | Mobile experience is broken — horizontal scrolling, tiny touch targets, janky animations |
| Medium | Feature-dump layouts with 12+ items in a grid, forcing the user to figure out what matters |
| Medium | Excessive decorative animations that drain battery and distract from content |
| Medium | Navigation confusion between marketing site and documentation |
| Low | Social proof that doesn't land — logo walls without context or specifics |

### Gains

| Impact | Gain |
|--------|------|
| High | Clear value proposition above the fold — under 10 words, concrete, not jargon |
| High | Interactive or animated product demos that replace static screenshots |
| High | Proper dark theme execution — carefully tuned grays, adequate contrast, no pure black |
| High | Consistent visual language — same spacing, typography scale, and color system throughout |
| Medium | Progressive disclosure — showing the right depth based on where the visitor is in their journey |
| Medium | Fast load times (LCP < 2.5s) with purposeful, not decorative, animations |
| Medium | Seamless transition between marketing site and documentation |
| Low | Content freshness signals — changelog links, GitHub activity, "last updated" indicators |
| Low | Respect for `prefers-reduced-motion` and other accessibility preferences |

## Key Insight

> UX designers evaluating dev tool websites care about one thing above all: **can the visitor understand what this product does and see it in action within 5 seconds?** The biggest failures aren't aesthetic — they're structural: unclear value propositions, missing product demos, broken mobile experiences, and dark themes that sacrifice readability for aesthetics. The sites that win (Stripe, Vercel, Linear) nail clarity first, then add polish. specrails-web should be evaluated through this lens.

## Sources

- Best-in-class analysis: Stripe, Vercel, Linear, Raycast, Supabase website design patterns
- WCAG 2.1 AA accessibility guidelines for contrast, focus indicators, and motion
- UX conference discourse (Config, Smashing, An Event Apart) on developer tool design
- Community patterns from r/webdesign, r/userexperience, and Designer News
- Material Design dark theme guidelines for elevation and surface color
