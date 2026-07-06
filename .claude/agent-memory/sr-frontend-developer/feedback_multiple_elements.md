---
name: multiple-elements-getbytext
description: Use getAllByText when the same text string appears in multiple places (e.g., prose block AND capabilities list).
metadata:
  type: feedback
---

When a term like "WebRTC (DTLS)" appears in both a product prose block and a capabilities list, `getByText` throws "Found multiple elements". 

**Why:** ProductsSection renders the same factual claim in two places intentionally (prose description + bullet capability).

**How to apply:** Use `expect(screen.getAllByText(/pattern/i).length).toBeGreaterThan(0)` or target a specific container with `within()`.
