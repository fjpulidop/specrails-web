import assert from "node:assert/strict";
import test from "node:test";
import { advisories, evaluate } from "./audit-gate.mjs";

const report = { vulnerabilities: {
  braces: { via: [{ url: "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm", severity: "high", title: "braces DoS" }] },
  micromatch: { via: ["braces"] },
  "source-map-js": { via: [{ url: "https://github.com/advisories/GHSA-68fv-2mgg-jv7q", severity: "high", title: "source-map-js DoS" }] },
  "postcss-selector-parser": { via: [{ url: "https://github.com/advisories/GHSA-rj75-hqrm-r3gf", severity: "moderate", title: "quadratic" }] },
} };
const allow = [{ id: "GHSA-vfj7-8cjw-p6xm", reason: "no fix", expires: "2026-12-31" }];

test("collects unique advisories with the packages they reach", () => {
  assert.deepEqual(advisories(report).map(item => [item.id, item.packages]), [
    ["GHSA-vfj7-8cjw-p6xm", ["braces"]], ["GHSA-68fv-2mgg-jv7q", ["source-map-js"]], ["GHSA-rj75-hqrm-r3gf", ["postcss-selector-parser"]],
  ]);
});

test("blocks unlisted high advisories, allows dated exceptions and ignores moderate ones", () => {
  const { allowed, failing } = evaluate(report, allow, "2026-10-14");
  assert.deepEqual(allowed.map(item => item.id), ["GHSA-vfj7-8cjw-p6xm"]);
  assert.deepEqual(failing.map(item => item.id), ["GHSA-68fv-2mgg-jv7q"]);
});

test("an expired exception blocks again", () => {
  const { failing } = evaluate(report, allow, "2027-01-01");
  assert.deepEqual(failing.map(item => [item.id, item.expired]), [["GHSA-vfj7-8cjw-p6xm", true], ["GHSA-68fv-2mgg-jv7q", false]]);
});
