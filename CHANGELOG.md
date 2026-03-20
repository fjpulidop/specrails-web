# Changelog

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
