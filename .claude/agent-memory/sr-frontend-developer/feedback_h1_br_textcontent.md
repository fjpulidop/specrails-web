---
name: h1-textcontent-br
description: In jsdom, H1 text split by <br/> has no space between adjacent text nodes — regex assertions must not assume a space.
metadata:
  type: feedback
---

When a `<h1>` uses `<br />` between two text nodes (e.g. "Describe it." `<br />` "A team of agents ships it."), jsdom's `textContent` collapses them with no space: `"Describe it.A team of agents ships it."`.

**Why:** jsdom does not insert whitespace between adjacent text nodes separated only by a `<br/>` element.

**How to apply:** Split the assertion into two separate `toHaveTextContent` calls, each matching one phrase independently. Do NOT use a single regex that expects a space or period-space between the two parts.
