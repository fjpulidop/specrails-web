import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { buildGuideIndex, buildSitemap, buildArticleLoaders, syncGuide, GUIDE_CATEGORIES } from './sync-guide.mjs';
const current = '# Current guide\n\nCurrent product description.\n\n## Check the result\n\nRead the source.';
const marker = '<!-- guide-revision: mission-first-v1 -->\n\n';
async function fixture(t) {
 const root = await mkdtemp(resolve(tmpdir(),'specrails-guide-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 for (const category of GUIDE_CATEGORIES) for (const language of ['en','es']) {
  const dir=resolve(root,'src/content/guide',language,category); await mkdir(dir,{recursive:true});
  await writeFile(resolve(dir,'1-example.md'), marker+current);
 }
 await mkdir(resolve(root,'src/lib'),{recursive:true});await mkdir(resolve(root,'public'));
 return root;
}
test('generates only current translations and preserves a lightweight search index',async t=>{
 const root=await fixture(t);const dir=resolve(root,'src/content/guide/fr/getting-started');await mkdir(dir,{recursive:true});
 await writeFile(resolve(dir,'1-example.md'),'# Obsolete\n\nOld instructions');
 const index=await buildGuideIndex(resolve(root,'src/content/guide'));
 assert.equal(index.entries.length,8);assert.equal(index.entries[0].translations.fr,undefined);
 assert.doesNotMatch(buildArticleLoaders(index),/guide\/fr\//);
 assert.match(buildArticleLoaders(index), /guide\/en\/getting-started\/1-example.md\?raw/);
 assert.deepEqual(index.entries[0].translations.en.headings,['Check the result']);assert.equal('content' in index.entries[0],false);
 await writeFile(resolve(dir,'1-example.md'),marker+'# Guide actuel\n\nDescription actuelle.');
 assert.equal((await buildGuideIndex(resolve(root,'src/content/guide'))).entries[0].translations.fr.title,'Guide actuel');
});
test('rejects required stale translations and broken internal links',async t=>{
 const root=await fixture(t);const file=resolve(root,'src/content/guide/es/specs/1-example.md');
 await writeFile(file,current);await assert.rejects(buildGuideIndex(resolve(root,'src/content/guide')),/Stale required guide/);
 await writeFile(file,marker+current+'\n[missing](/docs/missing)');await assert.rejects(buildGuideIndex(resolve(root,'src/content/guide')),/Broken guide link/);
});
test('check detects stale metadata and sitemap without rewriting either',async t=>{
 const root=await fixture(t);const index=await syncGuide(root);await syncGuide(root,true);
 const sitemap=buildSitemap(index);assert.match(sitemap,/<loc>https:\/\/specrails.dev\/companion<\/loc>/);assert.doesNotMatch(sitemap,/<loc>[^<]*\/(core|agents)<\/loc>/);
 const file=resolve(root,'public/sitemap.xml');await writeFile(file,'old');await assert.rejects(syncGuide(root,true),/Outdated public\/sitemap.xml/);assert.equal(await readFile(file,'utf8'),'old');
});
test('the committed guide and sitemap match all current article metadata',async()=>{
 const root=resolve(import.meta.dirname,'..');const index=await syncGuide(root,true);
 assert.equal(index.entries.length,37);
 assert.ok(index.entries.every(entry=>entry.translations.en&&entry.translations.es));
 for(const language of ['fr','de','pt','it','zh','ja']) assert.equal(index.entries.filter(entry=>entry.translations[language]).length,3);
});
