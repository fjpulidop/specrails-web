import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
const RECORDINGS = ["specrails-mission-control-real", "specrails-board-real", "specrails-loop-builder-real"].map(file => ({ file }));

const read = (file) => readFileSync(resolve("public", file));
describe("Published product assets", () => {
  it("ships the recorded release bundle, bootstrap and asset directory together", () => {
    const info = JSON.parse(read("companion-app/build-info.json").toString());
    const hash = createHash("sha256").update(read("companion-app/main.dart.js")).digest("hex").slice(0, 16);
    assert.match(info.sourceCommit, /^[a-f0-9]{40}$/);
    assert.ok(info.sourceVersion);
    assert.equal(info.bundleHash, hash);
    assert.ok(read("companion-app/index.html").toString().includes(`flutter_bootstrap.js?v=${hash}`));
    const bootstrap = read("companion-app/flutter_bootstrap.js").toString();
    assert.ok(bootstrap.includes(`main.dart.js?v=${hash}`));
    assert.ok(bootstrap.includes(`/companion-app/build-${hash}/`));
    assert.ok(existsSync(resolve("public", `companion-app/build-${hash}/assets/AssetManifest.bin`)));
  });
  it("includes both formats and a poster for every current recording", () => {
    const manifest = JSON.parse(read("product/recordings.json").toString());
    assert.equal(manifest.sampleData, true);
    assert.match(manifest.desktopCommit, /^[a-f0-9]{40}$/);
    for (const clip of RECORDINGS) {
      assert.ok(manifest.recordings.find((item) => item.file === clip.file));
      for (const extension of ["mp4", "webm", "png"]) assert.ok(read(`product/${clip.file}.${extension}`).length > 10_000);
    }
  });
});
