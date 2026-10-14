#!/usr/bin/env node
// Blocking dependency audit for the shipped bundle AND the tools that build and
// test it. Fails on every high/critical advisory except those listed in
// .github/audit-allowlist.json, and an allowlisted advisory fails again once its
// `expires` date passes, so an exception is always a dated, reviewed decision.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const BLOCKING = new Set(["high", "critical"]);

/** Unique advisories ({ id, url, severity, title, packages }) from `npm audit --json`. */
export function advisories(report) {
  const byUrl = new Map();
  for (const [name, entry] of Object.entries(report?.vulnerabilities ?? {})) {
    for (const via of entry.via ?? []) {
      if (typeof via !== "object" || !via?.url) continue;
      const id = via.url.split("/").pop();
      const current = byUrl.get(via.url) ?? { id, url: via.url, severity: via.severity, title: via.title, packages: [] };
      current.packages.push(name);
      byUrl.set(via.url, current);
    }
  }
  return [...byUrl.values()];
}

/** Splits blocking advisories into allowed and failing, given the allowlist and today's date. */
export function evaluate(report, allowlist, today = new Date().toISOString().slice(0, 10)) {
  const rules = new Map(allowlist.map(rule => [rule.id, rule]));
  const allowed = [], failing = [];
  for (const advisory of advisories(report).filter(item => BLOCKING.has(item.severity))) {
    const rule = rules.get(advisory.id);
    if (rule && rule.expires >= today) allowed.push({ ...advisory, rule });
    else failing.push({ ...advisory, expired: Boolean(rule) });
  }
  return { allowed, failing };
}

function main() {
  let output;
  // npm audit exits non-zero whenever it finds anything; the JSON is the source of truth.
  try { output = execFileSync("npm", ["audit", "--json"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }); }
  catch (error) { output = error.stdout; }
  const allowlist = JSON.parse(readFileSync(new URL("../.github/audit-allowlist.json", import.meta.url), "utf8"));
  const { allowed, failing } = evaluate(JSON.parse(output), allowlist);
  for (const item of allowed) console.log(`allowed until ${item.rule.expires}: ${item.id} (${item.packages.join(", ")}) — ${item.rule.reason}`);
  for (const item of failing) console.error(`${item.expired ? "EXPIRED exception" : item.severity.toUpperCase()}: ${item.id} ${item.title} (${item.packages.join(", ")}) ${item.url}`);
  if (failing.length) { console.error(`${failing.length} blocking advisory(ies). Fix them or add a dated, justified entry to .github/audit-allowlist.json.`); process.exitCode = 1; }
  else console.log(`audit gate passed (${allowed.length} dated exception(s)).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
