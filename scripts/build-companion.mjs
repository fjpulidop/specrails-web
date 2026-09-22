#!/usr/bin/env node
// Build the Flutter web companion and stage it under public/companion-app/, so a
// normal `vite build` copies it into dist/ and it ships at
// https://specrails.dev/companion-app (served as a standalone installable PWA;
// see the /companion-app rules in public/.htaccess).
//
// Usage:
//   node scripts/build-companion.mjs [path-to-specrails-companion]
//   (defaults to ../specrails-companion)

import { execSync } from 'node:child_process'
import { cpSync, rmSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const companionDir = path.resolve(process.argv[2] ?? '../specrails-companion')
const outDir = path.resolve('public/companion-app')

if (!existsSync(path.join(companionDir, 'pubspec.yaml'))) {
  console.error(`✗ specrails-companion not found at ${companionDir}`)
  console.error('  Pass its path: node scripts/build-companion.mjs /path/to/specrails-companion')
  process.exit(1)
}

console.log(`▸ flutter build web (base-href /companion-app/) in ${companionDir}`)
execSync('flutter build web --release --base-href /companion-app/', {
  cwd: companionDir,
  stdio: 'inherit',
})

const buildWeb = path.join(companionDir, 'build', 'web')
if (!existsSync(buildWeb)) {
  console.error(`✗ expected build output at ${buildWeb}`)
  process.exit(1)
}

// Keep the README placeholder; replace everything else with the fresh build.
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })
cpSync(buildWeb, outDir, { recursive: true })
console.log(`✓ companion synced → ${outDir} (commit it, then \`npm run build\`)`)

// Flutter entry filenames are stable; version URLs so browser/CDN caches cannot
// keep a previous interface after deploying a fresh build.
const mainPath = path.join(outDir, 'main.dart.js')
const version = createHash('sha256').update(readFileSync(mainPath)).digest('hex').slice(0, 16)
const assetRoot = `build-${version}`
mkdirSync(path.join(outDir, assetRoot), { recursive: true })
cpSync(path.join(outDir, 'assets'), path.join(outDir, assetRoot, 'assets'), { recursive: true })
const bootstrapPath = path.join(outDir, 'flutter_bootstrap.js')
writeFileSync(bootstrapPath, readFileSync(bootstrapPath, 'utf8').replaceAll('"main.dart.js"', `"main.dart.js?v=${version}"`).replace('_flutter.loader.load({', `_flutter.loader.load({\n  config: { assetBase: "/companion-app/${assetRoot}/" },`))
const indexPath = path.join(outDir, 'index.html')
writeFileSync(indexPath, readFileSync(indexPath, 'utf8').replace('src="flutter_bootstrap.js"', `src="flutter_bootstrap.js?v=${version}"`))
writeFileSync(path.join(outDir, '.htaccess'), `<IfModule mod_headers.c>
  <FilesMatch "^(index\\.html|main\\.dart\\.js|flutter_bootstrap\\.js|flutter_service_worker\\.js|version\\.json)$">
    Header set Cache-Control "no-cache, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
`)
