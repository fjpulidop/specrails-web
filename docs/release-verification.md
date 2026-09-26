# Website verification and release

CI and Release share the same reusable workflow at the current commit. The
existing `test` and `secret-scan` jobs retain their identities. Node 22.22.3 and
npm lockfile caching keep the toolchain stable. Verification checks types,
generator behavior, full coverage, production dependencies, workflow syntax,
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

No release or deployment was triggered to validate these changes. Local checks
and actionlint validate the reviewable implementation; the first authorized
production run must still verify the live static documentation URLs described in
README.md. The workflow definition follows GitHub's [reusable workflow contract](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows).
