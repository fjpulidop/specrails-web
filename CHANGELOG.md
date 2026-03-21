# Changelog

## [1.4.0](https://github.com/fjpulidop/specrails-web/compare/v1.3.1...v1.4.0) (2026-03-21)


### Features

* add Codex CLI support, lint fixes ([#84](https://github.com/fjpulidop/specrails-web/issues/84)) ([ac53b4c](https://github.com/fjpulidop/specrails-web/commit/ac53b4ccab89fc5da2cba41a0cef223de229b7db))

## [1.3.1](https://github.com/fjpulidop/specrails-web/compare/v1.3.0...v1.3.1) (2026-03-21)


### Bug Fixes

* **ci:** create PR instead of direct push to main for docs updates ([#85](https://github.com/fjpulidop/specrails-web/issues/85)) ([756ab02](https://github.com/fjpulidop/specrails-web/commit/756ab02de869f5a1a97de8d965d6b6aa426a58aa))

## [1.3.0](https://github.com/fjpulidop/specrails-web/compare/v1.2.3...v1.3.0) (2026-03-20)


### Features

* **seo:** on-page SEO — meta tags, JSON-LD, sitemap, canonical URLs (SPEA-405) ([#80](https://github.com/fjpulidop/specrails-web/issues/80)) ([6a1a613](https://github.com/fjpulidop/specrails-web/commit/6a1a613180f4ffbf801f3ac175f9b5c8c0440d1a))


### Bug Fixes

* **docs:** remove internal Paperclip references from public docs (SPEA-434) ([#81](https://github.com/fjpulidop/specrails-web/issues/81)) ([6023dec](https://github.com/fjpulidop/specrails-web/commit/6023decf27b8f29c8e356d66725e5a58758e5abe))

## [1.2.3](https://github.com/fjpulidop/specrails-web/compare/v1.2.2...v1.2.3) (2026-03-20)


### Bug Fixes

* **ci:** use ftps security=loose to fix Hostinger TLS cert mismatch ([#77](https://github.com/fjpulidop/specrails-web/issues/77)) ([89e1d97](https://github.com/fjpulidop/specrails-web/commit/89e1d97624ebe30533b7a047b3488b31390f032d))

## [1.2.2](https://github.com/fjpulidop/specrails-web/compare/v1.2.1...v1.2.2) (2026-03-20)


### Bug Fixes

* cancel fade-in rAF on AnimatedLogo cleanup (flaky test fix) ([#74](https://github.com/fjpulidop/specrails-web/issues/74)) ([41aa49e](https://github.com/fjpulidop/specrails-web/commit/41aa49e7c872e8d6f95b20e2e06abf6ca9cd522d))

## [1.2.1](https://github.com/fjpulidop/specrails-web/compare/v1.2.0...v1.2.1) (2026-03-20)


### Bug Fixes

* **AnimatedLogo:** prevent document access after test teardown ([c3d5d97](https://github.com/fjpulidop/specrails-web/commit/c3d5d970b19c263ff3a387bd127ef0fd762e9f31))
* **ci:** exempt Dependabot from DCO check and fix window.scrollTo polyfill ([#73](https://github.com/fjpulidop/specrails-web/issues/73)) ([06d04a6](https://github.com/fjpulidop/specrails-web/commit/06d04a6c675ee6425ba1661198d70291331d1f74))

## [1.2.0](https://github.com/fjpulidop/specrails-web/compare/v1.1.0...v1.2.0) (2026-03-20)


### Features

* **hero:** improve typography, spacing, and install CTA ([c595ecb](https://github.com/fjpulidop/specrails-web/commit/c595ecb680a48ca25b16262317b855573ecebc83))
* **hero:** improve typography, spacing, and install CTA ([7428925](https://github.com/fjpulidop/specrails-web/commit/74289252409dfd27ebd3195ed37aed7c15cdadc8))


### Bug Fixes

* **ci:** enable FTPS with strict TLS for Hostinger FTP deployments ([575f39c](https://github.com/fjpulidop/specrails-web/commit/575f39c9814d0729ec04c54a57a4c244970f7f0e))
* **ci:** remove npm audit step (covered by dedicated security PR) ([c0b05cf](https://github.com/fjpulidop/specrails-web/commit/c0b05cf64b3963e21548907b212314a4814edcf2))
* **hero:** correct install command to npx specrails-core@latest init ([75c0dbc](https://github.com/fjpulidop/specrails-web/commit/75c0dbcca2fe7bd030ac452c2899ed7e2eef7237))
* **hero:** resolve merge conflict in INSTALL_COMMAND constant ([2df76be](https://github.com/fjpulidop/specrails-web/commit/2df76bef3c038063e47f800d4c94916e34c39ec6))
* **SectionNav:** prevent document access after test teardown ([f32a444](https://github.com/fjpulidop/specrails-web/commit/f32a444ae16023a5546a9b0a6c87b663dc78bcba))
* **security:** fix HIGH npm vulnerabilities and enforce audit in CI ([bc76317](https://github.com/fjpulidop/specrails-web/commit/bc763174a2cb54e5c163a69089cacab85439bdb0))
* **security:** patch HIGH CVEs and remediate injection vulnerabilities ([b81d8ab](https://github.com/fjpulidop/specrails-web/commit/b81d8abd82acef0a144bc62135e4a86b515ab348))
* **security:** remediate 7 HIGH npm vulnerabilities ([1673f40](https://github.com/fjpulidop/specrails-web/commit/1673f40686ec5d6da76fd4cddb3c9665d6e78449))
* **tests:** update DOC_ENTRIES count to 16 after CLI reference addition ([77adca4](https://github.com/fjpulidop/specrails-web/commit/77adca432636f760742faf06324ad93fc76dc9ec))

## [1.1.0](https://github.com/fjpulidop/specrails-web/compare/v1.0.2...v1.1.0) (2026-03-20)


### Features

* **docs:** import docs from specrails-core npm package ([b728a2b](https://github.com/fjpulidop/specrails-web/commit/b728a2bc43397922de362e35d55a88fc23b687b3))
* **docs:** import docs from specrails-core npm package ([a3a2b56](https://github.com/fjpulidop/specrails-web/commit/a3a2b5637bcac19690a320fc1ff67abe7ccb9d33))
* **web:** remove local dashboard (HubSection) from landing page ([63d2a9e](https://github.com/fjpulidop/specrails-web/commit/63d2a9e8b70cf7af647d4b8da4d380994850cefd))

## [1.0.2](https://github.com/fjpulidop/specrails-web/compare/v1.0.1...v1.0.2) (2026-03-20)


### Bug Fixes

* **ci:** FTP deploy path and force-deploy workflow_dispatch ([67528d8](https://github.com/fjpulidop/specrails-web/commit/67528d80f249b44b56d28fb033295ff516cc596a))
* **ci:** update FTP server-dir default path to domain/specrails.dev/public_html ([974c1ce](https://github.com/fjpulidop/specrails-web/commit/974c1ce2ca01c85f051a924114e3bd56b2d1789d))

## [1.0.1](https://github.com/fjpulidop/specrails-web/compare/v1.0.0...v1.0.1) (2026-03-20)


### Bug Fixes

* **ci:** add verbose FTP logging and clean-slate option for Hostinger sync ([a8532c3](https://github.com/fjpulidop/specrails-web/commit/a8532c3d5ab09ecc684f3f88ae744936d54252e8))
* **ci:** add verbose FTP logging and clean-slate option for Hostinger sync issues ([6ea1888](https://github.com/fjpulidop/specrails-web/commit/6ea18888ce93d972f285ed6db983c72ac2f21433))

## 1.0.0 (2026-03-20)


### ⚠ BREAKING CHANGES

* All commands renamed from /<name> to /sr:<name>.

### Features

* add Agent Comparison Matrix page at /agents ([#13](https://github.com/fjpulidop/specrails-web/issues/13)) ([00876e2](https://github.com/fjpulidop/specrails-web/commit/00876e2e8d3a03ea49c753d2cd6be5a787d69d9e))
* add Agents dropdown to navbar and make Docs dropdown scrollable ([9493a3f](https://github.com/fjpulidop/specrails-web/commit/9493a3ff62994c283d4337025621044ef249a4a1))
* add animated logo transition, section nav arrows, and UI polish ([da5f56e](https://github.com/fjpulidop/specrails-web/commit/da5f56e3db04c6830efeb6bf0922c483c2a31716))
* add docs index page at /docs with sections and playbooks ([06701df](https://github.com/fjpulidop/specrails-web/commit/06701df0eb18ead9ad896b8355f829c635e96cd5))
* add docs section with navigation dropdown and markdown rendering ([ae14d17](https://github.com/fjpulidop/specrails-web/commit/ae14d17eb37962389841c55e5eafcbd30351aebd))
* add docs section with navigation dropdown and markdown rendering ([d50758e](https://github.com/fjpulidop/specrails-web/commit/d50758e681b68571a806b50bc38876fdefe70e8e)), closes [#2](https://github.com/fjpulidop/specrails-web/issues/2)
* add specrails Playbook best practices guides ([#8](https://github.com/fjpulidop/specrails-web/issues/8)) ([d3f04f8](https://github.com/fjpulidop/specrails-web/commit/d3f04f82ef762acf71437566437156074e224cf2))
* add sr- prefix namespace for Volt agent compatibility ([8a29df5](https://github.com/fjpulidop/specrails-web/commit/8a29df576de47731304e750c10e6ea460c6a7b58))
* add sr- prefix namespace for Volt agent compatibility ([52f19ba](https://github.com/fjpulidop/specrails-web/commit/52f19bac6fcea237ee1abb8d6b72cceacd337cfb))
* Agent Comparison Matrix + specrails Playbook ([#13](https://github.com/fjpulidop/specrails-web/issues/13), [#8](https://github.com/fjpulidop/specrails-web/issues/8)) ([f5bd464](https://github.com/fjpulidop/specrails-web/commit/f5bd464986193026b48520903b562212276894f9))
* Agents dropdown in navbar + scrollable Docs dropdown ([e4d0067](https://github.com/fjpulidop/specrails-web/commit/e4d00677f60e3aa6fa5acc8261f902df49e3c39e))
* section nav arrows in docs pages and centered mobile navbar logo ([d1c3211](https://github.com/fjpulidop/specrails-web/commit/d1c32117e5915a037b8f1672cc722dc5c6e41f9c))
* **ux:** add HubSection, API Reference, and Deployment docs skeletons ([f4b06dc](https://github.com/fjpulidop/specrails-web/commit/f4b06dc95dd8a5180f63174bdffcfd3b226af943))


### Bug Fixes

* **agents:** correct Security Reviewer model to Sonnet + add GitHubStarsButton ([fddb986](https://github.com/fjpulidop/specrails-web/commit/fddb98645d3dfda13cfdf554669355851e3c44a7))
* **agents:** Security Reviewer model Opus→Sonnet + GitHubStarsButton ([3342809](https://github.com/fjpulidop/specrails-web/commit/334280931574f37b9038223feb010ad2f1cb13b9))
* **ci:** pin FTP-Deploy-Action to v4.3.6 ([3978660](https://github.com/fjpulidop/specrails-web/commit/3978660f2743762655806d7e2a0ed99326a756d2))
* **ci:** pin FTP-Deploy-Action to v4.3.6 to fix release failure ([d336e3e](https://github.com/fjpulidop/specrails-web/commit/d336e3e62fbb162819130eb5d7a4be098451d4f7))
* docs dropdown, navbar links, logo, and hash scroll navigation ([5e2c3d6](https://github.com/fjpulidop/specrails-web/commit/5e2c3d6f77f43c031f16899c33dd589bda04878a))
* hide Docs link in mobile navbar when already on docs pages ([10a4256](https://github.com/fjpulidop/specrails-web/commit/10a4256763b851f8508db8c067c8caf86562fdfe))
* improve mobile hero spacing and nav arrow speed ([20de2bc](https://github.com/fjpulidop/specrails-web/commit/20de2bc81432192e64f63ad977a2322cb375fdab))
* improve mobile hero spacing and speed up nav arrow transitions ([d3f1ff2](https://github.com/fjpulidop/specrails-web/commit/d3f1ff2cb7c87190aa0b73f0a14ec6692b3fc3af))
* remove duplicate Compare link from navbar ([9e0137a](https://github.com/fjpulidop/specrails-web/commit/9e0137a3ac920cedbc8d5e0ff116b917a4ed5380))
* remove duplicate Compare link from navbar ([bb8d188](https://github.com/fjpulidop/specrails-web/commit/bb8d1883297fab237ea5c68051970251d33cd07e))
* render em-dash correctly in demo terminal title ([fcc6bbb](https://github.com/fjpulidop/specrails-web/commit/fcc6bbbb96384cea72a272d817d9d3c3343940ce))
* replace remaining /implement references with /sr:implement in sr/ templates ([ab4b29d](https://github.com/fjpulidop/specrails-web/commit/ab4b29d0ecbcb3e4b74029e742ae4eabb5b4cf07))
* resolve SPA 404 on direct URL access (Hostinger/LiteSpeed) ([aecb6ac](https://github.com/fjpulidop/specrails-web/commit/aecb6ac44792e9194f2d1a06a9f986d1a1b13efd))
* scroll to top when navigating between doc pages ([01bc6a0](https://github.com/fjpulidop/specrails-web/commit/01bc6a0b2c810bd9a436d727bb73d9a017db9831))
* update repo references from specrails to specrails-core ([ec51047](https://github.com/fjpulidop/specrails-web/commit/ec5104772add9e1d90ac222a13f979f9912ddd3d))
* update repo references from specrails to specrails-core ([7526a8e](https://github.com/fjpulidop/specrails-web/commit/7526a8ec12abc6036890fe790f42c46de22644fc))

## [0.1.0](https://github.com/fjpulidop/specrails-web/releases/tag/v0.1.0) (2026-03-20)

### Initial tracked release

Baseline release establishing versioning infrastructure:
- CI workflow (GitHub Actions)
- Release automation via release-please
- GitHub issue templates and PR template
- CHANGELOG tracking from this point forward

Previous work (community files, docs portal, security policy, analytics) is included
in this baseline and visible in the git history.
