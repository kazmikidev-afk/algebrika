window.MOCK_CFG={id:'mock-test-1',title:'מבחן תרגול 1: יחס, פרופורציה, קנה מידה, אחוזים וחזקות',minutes:45,
intro:'מבחן תרגול באלגבריקה, בנוי לפי מה שנלמד בשיעורים האחרונים: יחס, פרופורציה, קנה מידה ואחוזים, ובסוף חזקות.',
getState:()=>state,save:()=>save(),viz:{},
mount(open){const w=document.getElementById('weak');if(w){const b=document.createElement('button');b.className='btn';b.id='mockHome';b.textContent='מבחן תרגול ראשון';b.onclick=()=>{open();history.replaceState(null,'',location.pathname+location.search+'#mock-test-1')};w.after(b)}},
qs:[
{t:'יחס',p:'בכיתה 12 בנים ו־18 בנות. מה היחס בנים:בנות בצורתו הפשוטה ביותר? כתבו למשל 4:5.',a:['2:3']},
{t:'יחס',p:'באותה כיתה: איזה חלק מכל התלמידים הן הבנות? כתבו שבר, למשל 1/4.',a:['3/5']},
{t:'יחס',p:'מערבבים צבע אדום וצבע כחול ביחס 3:5. סך הכול הכינו 40 ליטר תערובת. כמה ליטר צבע אדום יש בה?',a:['15'],u:'ליטר'},
{t:'יחס',p:'בשמיכה, על כל 5 ריבועים עם פסים יש 2 ריבועים עם נקודות. בשמיכה גדולה יש 35 ריבועים עם פסים. כמה ריבועים עם נקודות יש בה?',a:['14'],u:'ריבועים'},
{t:'יחס',p:'היחס בין הכסף של דן לכסף של רון הוא 4:5. לדן יש 60 ש״ח. כמה כסף יש לרון?',a:['75'],u:'ש״ח'},
{t:'פרופורציה',p:'3 ק״ג תפוחים עולים 24 ש״ח. כמה עולים 5 ק״ג תפוחים באותו מחיר לק״ג?',a:['40'],u:'ש״ח'},
{t:'פרופורציה',p:'פתרו את הפרופורציה ומצאו את x: 6/9 = x/12',a:['8']},
{t:'פרופורציה',p:'פתרו את הפרופורציה ומצאו את x x במכנה.: 5/x = 15/21',a:['7']},
{t:'פרופורציה',p:'מכונית נוסעת במהירות קבועה ועוברת 150 ק״מ ב־2 שעות. כמה ק״מ היא תעבור ב־5 שעות?',a:['375'],u:'ק״מ'},
{t:'קנה מידה',p:'קנה המידה במפה הוא 1:50000. המרחק בין שתי עיירות במפה הוא 6 ס״מ. מה המרחק האמיתי בק״מ?',a:['3'],u:'ק״מ'},
{t:'קנה מידה',p:'המרחק האמיתי בין שתי ערים הוא 45 ק״מ. קנה המידה במפה הוא 1:500000. מה המרחק ביניהן במפה, בס״מ?',a:['9'],u:'ס״מ'},
{t:'קנה מידה',p:'דגם של מכונית אורכו 12 ס״מ. אורך המכונית האמיתית 4.2 מטר. מה קנה המידה דגם:מציאות? כתבו 1:כמה.',a:['1:35']},
{t:'אחוזים',p:'כמה הם 20% מ־150?',a:['30']},
{t:'אחוזים',p:'מחיר חולצה 80 ש״ח. היא הוזלה ב־25%. מה המחיר החדש?',a:['60'],u:'ש״ח'},
{t:'אחוזים',p:'אחרי הנחה של 20% מחיר מוצר הוא 64 ש״ח. מה היה המחיר לפני ההנחה?',a:['80'],u:'ש״ח'},
{t:'חזקות',p:'חשבו: 2<sup>5</sup>',a:['32']},
{t:'חזקות',p:'חשבו: 3<sup>2</sup> · 3<sup>3</sup>',a:['243']},
{t:'חזקות',p:'חשבו: (2<sup>3</sup>)<sup>2</sup>',a:['64']},
{t:'חזקות',p:'חשבו: 7<sup>0</sup> + 2<sup>3</sup>',a:['9']},
{t:'חזקות',p:'איזה ביטוי שווה ל־ x<sup>4</sup> · x<sup>6</sup> ?',o:['x<sup>24</sup>','x<sup>10</sup>','2x<sup>10</sup>','x<sup>2</sup>'],c:1}
]};
/* Mock practice test engine (2026-10-10). Self-contained overlay; saves into the app's own progress object and reports through window.avichaiTrack. */
(()=>{
const C=window.MOCK_CFG;if(!C)return;
const clean=x=>String(x).normalize('NFKC').replace(/[\s\u200e\u200f]/g,'').replace(/−|–/g,'-').replace(/[％%]/g,'').replace(/[׳'"״]/g,'');
function same(v,a){
  v=clean(v).replace(/^(\d+),(\d+)$/,'$1.$2');a=clean(a);
  if(v===a)return true;
  const num=/^[-+]?\d+(\.\d+)?$/;
  if(num.test(v)&&num.test(a))return Math.abs(Number(v)-Number(a))<1e-8;
  if(/^\d+:\d+$/.test(v)&&/^\d+:\d+$/.test(a)){const[x,y]=v.split(':').map(Number),[p,q]=a.split(':').map(Number);return y!==0&&q!==0&&x*q===y*p}
  if(/^\d+\/\d+$/.test(v)&&/^\d+\/\d+$/.test(a)){const[x,y]=v.split('/').map(Number),[p,q]=a.split('/').map(Number);return y!==0&&q!==0&&x*q===y*p}
  return false;
}
const grade=(q,v)=>q.o?v===q.o[q.c]:(v!==undefined&&String(v).trim()!==''&&q.a.some(a=>same(v,a)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css=`#mockOv{position:fixed;inset:0;z-index:2000;background:#f3f6f5;color:#17302e;overflow:auto;font-family:Heebo,Arial,sans-serif;direction:rtl;-webkit-overflow-scrolling:touch}
#mockOv *{box-sizing:border-box}#mockOv .mw{max-width:820px;margin:0 auto;padding:14px 14px 110px}
#mockOv .mc{background:#fff;border:1px solid #d3e2de;border-radius:16px;padding:16px;margin:12px 0;box-shadow:0 6px 18px rgba(20,67,63,.08)}
#mockOv h2,#mockOv h3{margin:0 0 8px;font-weight:800}#mockOv p{line-height:1.7;margin:6px 0}
#mockOv .mtag{display:inline-block;background:#dff4ef;color:#075e58;border-radius:999px;padding:2px 10px;font-size:13px;font-weight:700}
#mockOv .mq{font-size:18px;line-height:1.8}
#mockOv .mopt{display:flex;gap:10px;align-items:center;border:2px solid #d3e2de;border-radius:12px;padding:10px 12px;margin:8px 0;cursor:pointer;background:#fff;font-size:17px;min-height:46px}
#mockOv .mopt.sel{border-color:#087f78;background:#e6f6f2}
#mockOv input[type=text]{font:inherit;font-size:18px;padding:10px 12px;border:2px solid #bcd0cb;border-radius:12px;width:min(260px,70%);direction:ltr;text-align:center}
#mockOv .mbtn{font:inherit;font-weight:700;border:0;border-radius:12px;padding:12px 18px;background:#087f78;color:#fff;cursor:pointer;min-height:46px}
#mockOv .mbtn.g{background:#fff;color:#087f78;border:2px solid #087f78}
#mockOv .mbar{position:fixed;bottom:0;right:0;left:0;background:#fff;border-top:1px solid #d3e2de;padding:10px 14px;display:flex;gap:10px;align-items:center;justify-content:space-between;z-index:2001}
#mockOv .mprog{flex:1;height:10px;background:#dfe9e6;border-radius:9px;overflow:hidden}#mockOv .mprog i{display:block;height:100%;background:#087f78;width:0}
#mockOv .ok{color:#1d7a50;font-weight:800}#mockOv .bad{color:#b23a3a;font-weight:800}
#mockOv .mres{border-right:6px solid #ccc}#mockOv .mres.ok1{border-color:#278c63}#mockOv .mres.bad1{border-color:#c44f4f}
#mockOv svg{max-width:100%;height:auto;display:block;margin:8px auto}#mockOv .score{font-size:44px;font-weight:800;color:#087f78;text-align:center}
#mockOv table{border-collapse:collapse;width:100%}#mockOv td,#mockOv th{border-bottom:1px solid #d3e2de;padding:6px 8px;text-align:right}
@media print{#mockOv .mbar{display:none}}`;
let st=document.createElement('style');st.textContent=css;document.head.append(st);
function store(){const o=C.getState();if(!o.mock)o.mock={};if(!o.mock[C.id])o.mock[C.id]={attempts:[]};return o.mock[C.id]}
let ov,qs,ans,t0,timer;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function close(){clearInterval(timer);if(ov){ov.remove();ov=null}document.body.style.overflow='';window.avichaiTrack?.mode('other','');if(location.hash==='#'+C.id)history.replaceState(null,'',location.pathname+location.search)}
function shell(inner){if(!ov){ov=document.createElement('div');ov.id='mockOv';ov.setAttribute('role','dialog');ov.setAttribute('aria-label',C.title);document.body.append(ov);document.body.style.overflow='hidden'}ov.innerHTML=inner;ov.scrollTop=0}
function intro(){
  window.avichaiTrack?.mode('quiz','mock');
  const h=store().attempts.slice(-5).reverse();
  shell(`<div class="mw"><div style="display:flex;justify-content:space-between;align-items:center"><h2>${C.title}</h2><button class="mbtn g" id="mClose">סגירה</button></div>
  <div class="mc"><p>${C.intro}</p><ul style="line-height:1.9;padding-inline-start:20px"><li>${C.qs.length} שאלות, בערך ${C.minutes} דקות.</li><li>בזמן המבחן אין רמזים ואין משוב. אפשר לחזור ולשנות תשובה עד ההגשה.</li><li>בסוף רואים ציון, תשובה נכונה לכל שאלה ופירוט לפי נושא.</li><li>זה תרגול לקראת מבחן המתמטיקה, ולא מיקוד רשמי של המורה.</li><li>התשובות הכתובות הן מספר, שבר או יחס, למשל 5 או 2:3, ובלי יחידות מידה.</li></ul>
  <button class="mbtn" id="mStart">התחלת המבחן</button></div>
  ${h.length?`<div class="mc"><h3>ניסיונות קודמים</h3><table>${h.map(a=>`<tr><td>${new Date(a.date).toLocaleDateString('he-IL')}</td><td>${a.correct} מתוך ${a.total}</td><td>${Math.round(a.duration/60)} דק׳</td></tr>`).join('')}</table></div>`:''}</div>`);
  ov.querySelector('#mClose').onclick=close;ov.querySelector('#mStart').onclick=start;
}
function start(){
  qs=C.qs.map((q,i)=>({...q,i,show:q.o?shuffle(q.o):null}));ans={};t0=Date.now();
  const body=qs.map((q,i)=>`<section class="mc" data-i="${i}"><span class="mtag">שאלה ${i+1} · ${q.t}</span><div class="mq">${q.p}</div>${q.viz?(C.viz[q.viz]?C.viz[q.viz](q):''):''}${q.o?q.show.map((o,k)=>`<div class="mopt" tabindex="0" role="radio" aria-checked="false" data-k="${k}">${o}</div>`).join(''):`<div><input type="text" inputmode="text" autocomplete="off" aria-label="תשובה לשאלה ${i+1}"> ${q.u?`<span>${q.u}</span>`:''}</div>`}</section>`).join('');
  shell(`<div class="mw"><div style="display:flex;justify-content:space-between;align-items:center"><h2>${C.title}</h2><b id="mTime">00:00</b></div>${body}</div>
  <div class="mbar"><span id="mCount">0/${qs.length}</span><div class="mprog"><i id="mProg"></i></div><button class="mbtn" id="mSubmit">סיום והגשה</button></div>`);
  const upd=()=>{const n=Object.keys(ans).filter(k=>String(ans[k]).trim()!=='').length;ov.querySelector('#mCount').textContent=n+'/'+qs.length;ov.querySelector('#mProg').style.width=(n/qs.length*100)+'%'};
  ov.querySelectorAll('section[data-i]').forEach(sec=>{const i=+sec.dataset.i,q=qs[i];
    if(q.o)sec.querySelectorAll('.mopt').forEach(el=>{const pick=()=>{sec.querySelectorAll('.mopt').forEach(x=>{x.classList.remove('sel');x.setAttribute('aria-checked','false')});el.classList.add('sel');el.setAttribute('aria-checked','true');ans[i]=q.show[+el.dataset.k];upd()};el.onclick=pick;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}}});
    else sec.querySelector('input').oninput=e=>{ans[i]=e.target.value;upd()}});
  clearInterval(timer);timer=setInterval(()=>{const s=Math.floor((Date.now()-t0)/1000),el=ov&&ov.querySelector('#mTime');if(el)el.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},1000);
  ov.querySelector('#mSubmit').onclick=()=>{const n=Object.keys(ans).filter(k=>String(ans[k]).trim()!=='').length;if(n<qs.length&&!confirm('ענית על '+n+' מתוך '+qs.length+' שאלות. להגיש בכל זאת?'))return;finish()};
}
function finish(){
  clearInterval(timer);const dur=Math.round((Date.now()-t0)/1000);
  const res=qs.map(q=>({q,v:ans[q.i],ok:grade(q,ans[q.i])}));const correct=res.filter(r=>r.ok).length;
  const by={};res.forEach(r=>{const b=by[r.q.t]||(by[r.q.t]={n:0,ok:0});b.n++;if(r.ok)b.ok++});
  const wrongByTopic={};res.filter(r=>!r.ok).forEach(r=>wrongByTopic[r.q.t]=(wrongByTopic[r.q.t]||0)+1);
  const s=store();s.attempts.push({date:new Date().toISOString(),correct,total:qs.length,duration:dur,by});C.save();
  window.avichaiTrack?.milestone('quiz_complete',{set:C.id,correct,total:qs.length,wrongByTopic});
  const pct=Math.round(correct/qs.length*100);
  shell(`<div class="mw"><div style="display:flex;justify-content:space-between;align-items:center"><h2>תוצאות: ${C.title}</h2><button class="mbtn g" id="mClose">סגירה</button></div>
  <div class="mc"><div class="score">${correct} מתוך ${qs.length}</div><p style="text-align:center">${pct}% · זמן: ${Math.floor(dur/60)} דק׳</p>
  <table><tr><th>נושא</th><th>נכון</th></tr>${Object.entries(by).map(([k,b])=>`<tr><td>${k}</td><td>${b.ok} מתוך ${b.n}</td></tr>`).join('')}</table>
  <p style="margin-top:12px">ההתקדמות נשמרה. מומלץ לחזור לנושאים שבהם יש טעויות ואז לנסות שוב.</p><button class="mbtn" id="mAgain">מבחן חוזר</button></div>
  ${res.map(r=>`<section class="mc mres ${r.ok?'ok1':'bad1'}"><span class="mtag">שאלה ${r.q.i+1} · ${r.q.t}</span> <b class="${r.ok?'ok':'bad'}">${r.ok?'נכון':'לא נכון'}</b><div class="mq">${r.q.p}</div>${r.q.viz&&C.viz[r.q.viz]?C.viz[r.q.viz](r.q):''}<p>התשובה שלך: <b>${r.v===undefined||r.v===''?'לא נענתה':(r.q.o?r.v:esc(r.v))}</b></p>${r.ok?'':`<p>התשובה הנכונה: <b>${r.q.o?r.q.o[r.q.c]:r.q.a[0]}</b></p>`}</section>`).join('')}</div>`);
  ov.querySelector('#mClose').onclick=close;ov.querySelector('#mAgain').onclick=intro;
}
function open(){if(ov)return;intro()}
window['openMock_'+C.id.replace(/\W/g,'_')]=open;
C.mount(open);
if(location.hash==='#'+C.id)setTimeout(open,0);
window.addEventListener('hashchange',()=>{if(location.hash==='#'+C.id)open()});
})();
