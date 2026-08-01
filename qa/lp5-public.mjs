import {chromium} from '../../node_modules/playwright/index.mjs';
import AxeBuilder from '../../node_modules/@axe-core/playwright/dist/index.js';

const pages=[
 {name:'campaign',url:'https://suiro-campaign-review.vercel.app',videos:1,forms:0,flow:'info'},
 {name:'scalp',url:'https://suiro-scalp-review.vercel.app',videos:3,forms:1,offers:5,flow:'form'}
];
const widths=[{name:'sp',width:390,height:844},{name:'pc',width:1440,height:900}];
const browser=await chromium.launch();
const results=[];
for(const target of pages){for(const vp of widths){
 const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},isMobile:vp.width<600,hasTouch:vp.width<600});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const response=await page.goto(target.url,{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete),{timeout:30000});
 const axe=await new AxeBuilder({page}).analyze();
 const state=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,videos:document.querySelectorAll('video').length,forms:document.querySelectorAll('form').length,offers:document.querySelectorAll('[data-offer]').length}));
 const motion=[];for(const video of await page.locator('video').all()){await video.scrollIntoViewIfNeeded();await page.waitForFunction(v=>!v.paused&&v.currentTime>.2,await video.elementHandle(),{timeout:12000});motion.push(await video.evaluate(v=>({time:v.currentTime,paused:v.paused,ready:v.readyState,error:v.error&&v.error.code})))}
 let flow=false;if(target.flow==='info'){await page.locator('[data-info]').click();flow=await page.locator('.info-dialog').evaluate(d=>d.open&&d.innerText.includes('購入や情報送信は行われません'));}else{await page.locator('#demo').scrollIntoViewIfNeeded();await page.locator('input[name="name"]').fill('デモ');await page.locator('input[name="email"]').fill('demo@example.jp');await page.locator('#demo-form button[type="submit"]').click();flow=await page.locator('#demo-dialog').evaluate(d=>d.open&&d.innerText.includes('情報送信は行われていません'));}
 const row={page:target.name,viewport:vp.name,http:response?.status(),...state,axe:axe.violations.map(v=>v.id),errors,motion,flow};results.push(row);
 if(row.http!==200||row.overflow||row.broken||row.videos!==target.videos||row.forms!==target.forms||(target.offers&&row.offers<target.offers)||row.axe.length||row.errors.length||row.motion.some(v=>v.paused||v.time<=.2||v.error)||!row.flow)process.exitCode=1;
 await context.close();
}}
await browser.close();console.log(JSON.stringify(results,null,2));
