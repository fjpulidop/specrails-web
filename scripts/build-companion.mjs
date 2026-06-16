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
import { cpSync, rmSync, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

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
