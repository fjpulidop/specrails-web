// Run the recording Vite config first. Samples are local; no live account/API.
import { chromium } from '@playwright/test'
import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
const out = path.resolve('public/product')
const raw = path.resolve(process.env.TMPDIR ?? '/tmp','specrails-recordings')
mkdirSync(raw,{recursive:true})
const browser = await chromium.launch({headless:true})
const records = []
for(const [id, duration] of [['mission-control',15],['board',12],['loop-builder',10]]) {
  const context = await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:raw,size:{width:1440,height:900}}})
  const page = await context.newPage()
  const errors=[]
  page.on('pageerror',e=>errors.push(e.message))
  await page.addInitScript(()=>{
    localStorage.setItem('specrails-desktop:sidebar-mode:left','pinned-open')
    localStorage.setItem('specrails-desktop:sidebar-mode:right','pinned-open')
    localStorage.setItem('specrails-desktop:ui-theme','obsidian-dark')
    Object.defineProperty(navigator,'platform',{value:'MacIntel'})
    window.__TAURI_EVENT_PLUGIN_INTERNALS__={unregisterListener:()=>{}}
    window.__TAURI_INTERNALS__={metadata:{currentWindow:{label:'main'},currentWebview:{label:'main'}},invoke:async command=>command==='desktop_system_status'?{supported:true,awake:false}:command==='plugin:event|listen'?1:null,transformCallback:()=>1,unregisterCallback:()=>{}}
  })
  const video=page.video();const epoch=Date.now()
  await page.goto('http://127.0.0.1:5202/desktop-demo/demo.html')
  await page.waitForTimeout(6000)
  if(id==='board') await page.getByRole('button',{name:'Switch to Board',exact:true}).click()
  if(id==='loop-builder') await page.evaluate(()=>location.hash='/loops/factory%3Afreestyle/edit')
  await page.waitForTimeout(1600)
  const start=(Date.now()-epoch)/1000
  const name=`specrails-${id}-real`
  if(id==='mission-control') {
    await page.getByRole('button',{name:/Recover interrupted checkout/}).click()
    await page.waitForTimeout(3500)
    await page.screenshot({path:`${out}/${name}.png`})
    copyFileSync(`${out}/${name}.png`,`${out}/specrails-mission-control-preview.png`)
    await page.getByRole('button',{name:'Usage',exact:true}).hover()
    await page.waitForTimeout(6000)
    await page.mouse.move(750,400)
  } else if(id==='board') {
    await page.waitForTimeout(2200)
    await page.screenshot({path:`${out}/${name}.png`})
    copyFileSync(`${out}/${name}.png`,`${out}/specrails-dashboard-real.png`)
    await page.getByText('Build real-time job streaming via WebSocket',{exact:true}).click()
    await page.waitForTimeout(4000)
    await page.keyboard.press('Escape')
  } else {
    await page.waitForTimeout(1200)
    await page.locator('.react-flow__node[data-id="decide"]').click()
    await page.waitForTimeout(2500)
    await page.screenshot({path:`${out}/${name}.png`})
    copyFileSync(`${out}/${name}.png`,`${out}/specrails-loops-real.png`)
  }
  await page.waitForTimeout(Math.max(0, duration*1000-(Date.now()-epoch-start*1000)))
  if(errors.length) throw new Error(JSON.stringify(errors))
  await context.close()
  const input=await video.path()
  for(const [extension,codec] of [['mp4',['-c:v','libx264','-preset','slow','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart']],['webm',['-c:v','libvpx-vp9','-crf','34','-b:v','0']]]) {
    execFileSync('ffmpeg',['-y','-ss',String(start),'-i',input,'-t',String(duration),'-an','-vf','fps=25,tpad=stop_mode=clone:stop_duration=1',...codec,`${out}/${name}.${extension}`],{stdio:'ignore'})
  }
  records.push({id,file:name,durationSeconds:duration})
}
await browser.close()
const desktop=path.resolve(process.env.SPECRAILS_DESKTOP_DIR ?? '../specrails-desktop')
const desktopCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:desktop,encoding:'utf8'}).trim()
writeFileSync(`${out}/recordings.json`,JSON.stringify({recordedAt:new Date().toISOString(),desktopCommit,sampleData:true,nativeShell:'Tauri bridge simulated for capture; real React interface',viewport:{width:1440,height:900},recordings:records},null,2)+'\n')
console.log('Recorded and encoded all three clips.')
