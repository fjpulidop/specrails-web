import { readFileSync } from 'node:fs'
import path from 'node:path'
const desktopDir = path.resolve(process.env.SPECRAILS_DESKTOP_DIR ?? '../specrails-desktop')
const {default:base} = await import(path.join(desktopDir,'client/vite.demo.config.ts'))
const conversations = [{id:'mission-checkout',title:'Recover interrupted checkout',provider:'claude',model:'sonnet',session_id:null,pinned_project_id:'demo-project-001',tier_level:1,reasoning_effort:'high',created_at:'2026-09-30T10:00:00Z',updated_at:'2026-09-30T10:00:00Z'}]
const snapshot = {conversation:conversations[0],messages:[{id:'m1',conversation_id:'mission-checkout',role:'user',content:'Recover checkout when the network drops. Keep the cart intact and show a clear retry action.',created_at:'2026-09-30T10:00:00Z'},{id:'m2',conversation_id:'mission-checkout',role:'assistant',content:'I will preserve the cart, add a retry path and verify the checkout flow before handing it back for review.',created_at:'2026-09-30T10:01:00Z'}],pendingMessages:[],live:{isStreaming:false,streamingText:''}}
const loops = JSON.parse(readFileSync(new URL('./factory-loops.json', import.meta.url),'utf8')).map(loop => ({...loop,status:'published',createdAt:'2026-09-30T10:00:00Z',updatedAt:'2026-09-30T10:00:00Z',source:'builtin'}))
const now = Date.now()
const usage = {scope:'machine',instanceId:'recording',revision:1,providers:['claude','codex'].map(providerId=>({providerId,installed:true,generation:'sample',availability:'available',refreshState:'idle',freshness:'fresh',plan:null,source:providerId==='claude'?'oauth':'app-server',observedAt:new Date(now-120000).toISOString(),attemptedAt:new Date(now-120000).toISOString(),retryAt:null,issue:null,windows:(providerId==='claude'?[['session','session',4,300,10000000],['weekly','weekly',58,10080,160000000],['fable','weekly',28,10080,160000000]]:[['weekly','weekly',28,10080,530000000]]).map(([id,label,usedPercent,durationMinutes,reset])=>({id,label,usedPercent,durationMinutes,resetsAt:new Date(now+reset).toISOString(),scope:id==='fable'?'model':'account',model:id==='fable'?'Fable':null}))}))}
const routeCode = `
  [/\\/agent-runtime\\/runs/, () => json({runs:[]})],
  [/\\/loops\\/constants/, () => json({constants:[]})],
  [/\\/loops\\/commands/, () => json({commands:[]})],
  [/\\/loop-templates/, () => json({templates:[]})],

  [/\\/api\\/.*git$/, () => json({git:true,branch:"main",detached:false,dirty:false,branches:["main"],lastCommit:{hash:"a47bc91",subject:"Preserve checkout state",at:"2026-09-30T10:00:00Z"}})],
  [/\\/api\\/loops\\/catalog/, () => json({nodeKinds:[],definitionSchema:{},capabilities:{}})],
  [/\\/api\\/loops\\/[^/]+$/, () => json({loop:${JSON.stringify(loops[1])}})],
  [/\\/api\\/loops$/, () => json({loops:${JSON.stringify(loops)}})],
  [/\\/api\\/.*terminals/, () => json({sessions:[],limit:4})],
  [/\\/api\\/agent\\/models/, () => json({models:[{value:'sonnet',label:'Sonnet 5.5',default:true}],efforts:['medium','high'],supportsImageInput:true})],
  [/\\/api\\/agent\\/conversations\\/[^/]+$/, () => json(${JSON.stringify(snapshot)})],
  [/\\/api\\/agent\\/conversations/, () => json({conversations:${JSON.stringify(conversations)}})],
  [/\\/api\\/available-providers/, () => json({any:true,installed:['claude','codex']})],
  [/\\/api\\/mcp-admin\\/status/, () => json({enabled:true})],
  [/\\/api\\/subscription-usage\\/refresh/, () => json({snapshot:${JSON.stringify(usage)},scheduled:false})],
  [/\\/api\\/subscription-usage/, () => json(${JSON.stringify(usage)})],
`
export default {...base,root:path.join(desktopDir,'client'),server:{host:'127.0.0.1',port:5202,fs:{allow:[desktopDir,path.resolve('.')]}},plugins:[...base.plugins,{name:'recording-fixtures',enforce:'pre',transform(code,id){if(id.endsWith('/demo-api.ts'))return code.replace('const routes: Array<[RegExp, () => Response]> = [','const routes: Array<[RegExp, () => Response]> = ['+routeCode);if(id.endsWith('/demo-entry.tsx'))return code.replace("import './tour/tour.css'",'').replace('ric(() => startTour(), { timeout: 1500 })','void ric; void startTour;') }}]}
