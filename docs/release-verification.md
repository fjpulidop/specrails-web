# Website verification and release

CI and Release share the same reusable workflow at the current commit. The
existing `test` and `secret-scan` jobs retain their identities. Node 22.22.3 and
npm lockfile caching keep the toolchain stable. Verification checks types,
generator behavior, full coverage, production and development dependencies, workflow syntax,
secrets and the production build (including generated guide freshness).

Release waits for all checks before release-please or FTP. The build job uploads
`verified-site-<commit>` only when called by Release; the deploy job downloads
that immutable artifact from its own workflow run. Hidden files such as
`.htaccess` are included. Deployment never installs dependencies or rebuilds. Both release and deployment
refuse to proceed if main has advanced beyond the verified commit.
Coverage and build artifacts expire after seven days.

| Trigger | Release metadata | Deployment |
| --- | --- | --- |
| Push to main | release-please after verification | Only if it creates a release |
| Manual main, force_deploy=true | Skipped | Verified main artifact |
| Manual main, force_deploy=false | release-please after verification | Only if it creates a release |
| Manual non-main | Skipped | Skipped |

`clean_slate` is honored only on manual deployments. Release execution is
serialized and does not cancel an in-progress FTP transfer. Write permissions
belong only to release-please; validation and deployment have read-only repository
permissions. FTP credentials remain scoped to deployment steps. Standalone CI
cancels obsolete runs, while release validation has a separate concurrency key.

After each deployment, check that the static agent documentation URLs described
in README.md (`/llms.txt`, `/for-agents/index.html`, `/for-agents/mcp.md`) return
their own text or HTML rather than the SPA fallback. The workflow definition
follows GitHub's [reusable workflow contract](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows).

The dependency audit runs through `npm run audit:gate`: it fails on any high or
critical advisory, in production or development dependencies, unless the advisory
is listed with an expiry date in `.github/audit-allowlist.json`. Coverage keeps
80% thresholds for statements, branches, functions and lines (`vitest.config.ts`).
