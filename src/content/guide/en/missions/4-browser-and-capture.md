<!-- guide-revision: mission-first-v1 -->

# Browse, capture and annotate

Use the mission browser to inspect the application you are building and give the agent concrete visual context.

## Choose the right surface

The native app uses WebKit on macOS and WebView2 on Windows for mission browsing. Browser development and capture workflows use a Playwright-backed surface. Rendering, authentication and capture capabilities differ between them; a browser view is not automatically a recording of your whole desktop.

Open the relevant page, choose the viewport and wait for it to load. Login popups belong to that browsing session; finish authentication in the visible popup and return to the application. Do not paste passwords or session tokens into the mission.

## Make the feedback specific

Select the relevant region or element, then annotate the capture in the editor before attaching it to the mission. Completed selections, including all-size captures, pass through this review step. Cancel to discard the capture; if attachment fails, keep the editor open and retry without losing the annotations. Explain what is wrong, what should happen instead and how to verify it. For example: “At this width, keep the primary action visible without horizontal scrolling.”

Before moving a mission to another window, finish or cancel an in-progress capture. Native handoff can keep its browser session; the browser fallback may require closing its capture surface first. A screenshot is evidence of what was visible, not proof that the page's behavior is correct.
