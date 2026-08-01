import {chromium} from '../../node_modules/playwright/index.mjs';
import AxeBuilder from '../../node_modules/@axe-core/playwright/dist/index.js';
const pages=[
 {name:'trial',url:'https://suiro-v5-review.vercel.app/?v=e9a74e1',videos:8,forms:1,flow:'trial'},
 {name:'campaign',url:'https://suiro-campaign-review.vercel.app',videos:1,forms:0,flow:'campaign'},
 {name:'scalp',url:'https://suiro-scalp-review.vercel.app',videos:3,forms:1,flow:'scalp',offerSelector:'[data-offer]',offers:5},
 {name:'basic',url:'https://suiro-basic-review.vercel.app',videos:9,forms:1,flow:'basic',offerSelector:'.offer',offers:5},
 {name:'holiday',url:'https://suiro-holiday-review.vercel.app',videos:13,forms:1,flow:'holiday',offerSelector:'[data-demo-open],.final-offer',offers:5}
];
const widths=[{name:'sp',width:390,height:844},{name:'pc',width:1440,height:900}];
const browser=await chromium.launch();const results=[];
for(const target of pages)for(const vp of widths){
 const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},isMobile:vp.width<600,hasTouch:vp.width<600});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const response=await page.goto(target.url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForFunction(()=>[...document.images].every(i=>i.complete),{timeout:30000});
 const axe=await new AxeBuilder({page}).analyze();const state=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,broken:[...document.images].filter(i=>!i.naturalWidth).length,videos:document.querySelectorAll('video').length,forms:document.querySelectorAll('form').length}));state.offers=target.offerSelector?await page.locator(target.offerSelector).count():0;
 const motion=[];for(const video of await page.locator('video').all()){await video.scrollIntoViewIfNeeded();await page.waitForFunction(v=>!v.paused&&v.currentTime>.2,await video.elementHandle(),{timeout:12000});motion.push(await video.evaluate(v=>({time:v.currentTime,paused:v.paused,ready:v.readyState,error:v.error&&v.error.code})))}
 let flow=false;
 if(target.flow==='trial'){await page.locator('.js-buy').first().click();flow=await page.locator('dialog.modal').evaluate(d=>d.open&&d.innerText.includes('購入できません'))}
 if(target.flow==='campaign'){await page.locator('[data-info]').click();flow=await page.locator('.info-dialog').evaluate(d=>d.open&&d.innerText.includes('購入や情報送信は行われません'))}
 if(target.flow==='scalp'){await page.locator('#demo').scrollIntoViewIfNeeded();await page.locator('input[name=name]').fill('デモ');await page.locator('input[name=email]').fill('demo@example.jp');await page.locator('#demo-form button[type=submit]').click();flow=await page.locator('#demo-dialog').evaluate(d=>d.open&&d.innerText.includes('情報送信は行われていません'))}
 if(target.flow==='basic'){await page.locator('#name').fill('デモ');await page.locator('#email').fill('demo@example.jp');await page.locator('#demo-form button[type=submit]').click();flow=await page.locator('#demo-dialog').evaluate(d=>d.open&&d.innerText.includes('情報送信は行われていません'))}
 if(target.flow==='holiday'){await page.locator('[data-demo-open]').first().click();const cta=await page.locator('#demo-dialog').evaluate(d=>d.open&&d.innerText.includes('購入できません'));await page.locator('[data-dialog-close]').click();await page.locator('#demo-form input[name=name]').fill('デモ');await page.locator('#demo-form input[name=email]').fill('demo@example.jp');await page.locator('#demo-form select[name=topic]').selectOption({index:1});await page.locator('#demo-form input[name=consent]').check();await page.locator('#demo-form button[type=submit]').click();const form=await page.locator('#demo-dialog').evaluate(d=>d.open&&d.innerText.includes('送信・保存されません'));flow=cta&&form}
 const row={page:target.name,viewport:vp.name,http:response?.status(),...state,axe:axe.violations.map(v=>v.id),errors,motion,flow};results.push(row);
 if(row.http!==200||row.overflow||row.broken||row.videos!==target.videos||row.forms!==target.forms||(target.offers&&row.offers<target.offers)||row.axe.length||row.errors.length||row.motion.some(v=>v.paused||v.time<=.2||v.error)||!row.flow)process.exitCode=1;await context.close();
}
await browser.close();console.log(JSON.stringify(results,null,2));
