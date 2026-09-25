## 1. Guide

- [x] 1.1 Explain Specrails Core as Desktop's built-in engine in "What is Specrails" in all eight languages, under a "Core is built into Desktop" heading
- [x] 1.2 Describe Core as part of Desktop in the install, add-project, agent-roles and provider articles (English and Spanish)
- [x] 1.3 Regenerate the guide index and sitemap with `npm run docs:sync`

## 2. Site

- [x] 2.1 Add the localized "the installer includes Specrails Core" note to the download page and test it in every language
- [x] 2.2 Redirect `/core` to `/docs/getting-started#core-is-built-into-desktop` and test the redirect
- [x] 2.3 Add product facts to the generated `llms.txt` and assert them in the generator tests

## 3. Removals

- [x] 3.1 Delete the unrouted Core, former Desktop and Agents pages, the Commands, Features, Principles and Agents sections, the agents data and their tests
- [x] 3.2 Delete the unpublished `src/content/*.md` docs
- [x] 3.3 Default `GitHubStarsButton` to the specrails-desktop repository
- [x] 3.4 Drop the `specrails-core` devDependency, `update-docs.yml` and the copied Core changelog

## 4. Specs and repository docs

- [x] 4.1 Delete the stale dual-product main specs and the superseded changes
- [x] 4.2 Update README, CLAUDE.md, the guide maintenance README and agent notes

## 5. Verification

- [x] 5.1 Run lint, type check, coverage tests, docs checks and a production build
