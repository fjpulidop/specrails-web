<!-- guide-revision: mission-first-v1 -->

# Use profiles deliberately

Profiles are workflow presets for allocating model capability across roles. They are useful only where the selected provider and installed workflow support them.

## Start with the effective settings

Inspect the profile shown by Specrails rather than assuming a historical default applies to your installation. A balanced preset aims to distribute work sensibly; it cannot predict the complexity or cost of a particular change.

Claude and Kimi have profile-aware paths. Codex and Gemini expose their own model and capability controls. A profile name should not be interpreted as a promise that every nested call uses the same model.

## Compare with a real task

Keep the spec and verification criteria stable, then compare completion, corrections and measured usage. A cheaper individual call can still lead to more retries. Change only the roles you have a reason to tune, and verify the resulting configuration before launch.

Continue with [per-agent models](/docs/agents-customizing-models-per-agent).
