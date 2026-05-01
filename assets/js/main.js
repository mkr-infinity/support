/* ══════════════════════════════════════════════════════════════
   THEME SYSTEM
   To add / remove themes: edit THEMES and THEME_BG_COLORS.
   Each theme key must also have a matching <button data-theme="…">
   in index.html (inside #theme-menu) and a bgRunners entry below.
   ══════════════════════════════════════════════════════════════ */
const THEMES = {
  /* ── dark themes ── */
  midnight:  { background:"280 40% 5%",foreground:"300 30% 95%",primary:"290 80% 62%",primaryForeground:"280 40% 5%",muted:"280 30% 16%",mutedForeground:"300 20% 68%",accent:"290 80% 62%",border:"280 30% 19%",glassBg:"rgba(22,10,32,0.55)",glassBorder:"rgba(217,70,239,0.15)",glassShadow:"0 8px 32px rgba(0,0,0,0.4)",primaryHex:"#c084fc",accentHex:"#c084fc",label:"Midnight",emoji:"✨" },
  neon:      { background:"240 20% 4%",foreground:"180 100% 90%",primary:"180 100% 55%",primaryForeground:"240 20% 4%",muted:"240 15% 14%",mutedForeground:"240 20% 58%",accent:"300 100% 60%",border:"240 20% 19%",glassBg:"rgba(6,6,18,0.65)",glassBorder:"rgba(0,255,255,0.1)",glassShadow:"0 8px 32px rgba(0,0,0,0.5)",primaryHex:"#06f7f7",accentHex:"#f73cff",label:"Neon",emoji:"⚡" },
  aurora:    { background:"250 30% 5%",foreground:"160 80% 92%",primary:"160 90% 55%",primaryForeground:"250 30% 5%",muted:"250 22% 16%",mutedForeground:"200 30% 65%",accent:"280 90% 68%",border:"250 22% 20%",glassBg:"rgba(8,6,20,0.62)",glassBorder:"rgba(100,255,180,0.12)",glassShadow:"0 8px 32px rgba(0,0,0,0.45)",primaryHex:"#34d399",accentHex:"#c07ef4",label:"Aurora",emoji:"🌌" },
  golden:    { background:"40 22% 6%",foreground:"45 30% 90%",primary:"43 74% 52%",primaryForeground:"40 22% 6%",muted:"40 15% 14%",mutedForeground:"45 15% 58%",accent:"43 74% 52%",border:"40 15% 19%",glassBg:"rgba(26,22,14,0.6)",glassBorder:"rgba(212,175,55,0.18)",glassShadow:"0 8px 32px rgba(0,0,0,0.4)",primaryHex:"#d4af37",accentHex:"#d4af37",label:"Golden",emoji:"👑" },
  sunset:    { background:"20 35% 7%",foreground:"35 90% 95%",primary:"25 100% 65%",primaryForeground:"20 35% 5%",muted:"20 25% 16%",mutedForeground:"25 25% 60%",accent:"5 100% 68%",border:"20 22% 22%",glassBg:"rgba(20,8,4,0.6)",glassBorder:"rgba(255,130,60,0.16)",glassShadow:"0 8px 32px rgba(0,0,0,0.4)",primaryHex:"#fb923c",accentHex:"#ef4444",label:"Sunset",emoji:"🌇" },
  technical: { background:"120 10% 4%",foreground:"120 80% 85%",primary:"120 100% 50%",primaryForeground:"120 10% 4%",muted:"120 10% 11%",mutedForeground:"120 30% 53%",accent:"120 100% 50%",border:"120 15% 17%",glassBg:"rgba(4,12,4,0.65)",glassBorder:"rgba(0,255,65,0.12)",glassShadow:"0 8px 32px rgba(0,0,0,0.5)",primaryHex:"#22c55e",accentHex:"#22c55e",label:"Technical",emoji:"💻" },
  /* ── light themes ── */
  light:     { background:"0 0% 97%",foreground:"240 12% 12%",primary:"245 75% 58%",primaryForeground:"0 0% 100%",muted:"240 5% 90%",mutedForeground:"240 6% 42%",accent:"270 80% 62%",border:"240 6% 84%",glassBg:"rgba(255,255,255,0.78)",glassBorder:"rgba(0,0,0,0.07)",glassShadow:"0 8px 32px rgba(0,0,0,0.07)",primaryHex:"#6366f1",accentHex:"#9333ea",isLight:true,label:"Light",emoji:"☀️" },
  warm:      { background:"38 60% 95%",foreground:"30 30% 12%",primary:"32 90% 52%",primaryForeground:"0 0% 100%",muted:"38 35% 88%",mutedForeground:"30 20% 48%",accent:"20 80% 58%",border:"35 30% 78%",glassBg:"rgba(255,248,235,0.82)",glassBorder:"rgba(180,120,30,0.12)",glassShadow:"0 8px 32px rgba(100,60,0,0.08)",primaryHex:"#ea7c2a",accentHex:"#e85d2a",isLight:true,label:"Warm",emoji:"🌅" },
};

/* Background color used for the theme-switcher swatch conic gradient.
   Must match the approximate page background of each theme. */
const THEME_BG_COLORS = {
  midnight:"#160a20",neon:"#040412",aurora:"#080614",golden:"#1a1508",sunset:"#140802",technical:"#030c03",light:"#f5f5ff",warm:"#fff8eb"
};

/* Default theme shown on first load — one of the keys above */
let currentTheme = "midnight";

function hslToHex(h,s,l){
  s/=100;l/=100;
  const a=s*Math.min(l,1-l);
  const f=n=>{const k=(n+h/30)%12;const color=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*color).toString(16).padStart(2,'0');};
  return `#${f(0)}${f(8)}${f(4)}`;
}

function parseHsl(str){
  const parts=str.trim().split(/\s+/);
  return {h:parseFloat(parts[0]),s:parseFloat(parts[1]),l:parseFloat(parts[2])};
}

function applyTheme(name) {
  const t = THEMES[name];
  if (!t) return;
  currentTheme = name;
  const r = document.documentElement;
  r.style.setProperty('--background', t.background);
  r.style.setProperty('--foreground', t.foreground);
  r.style.setProperty('--primary', t.primary);
  r.style.setProperty('--primary-foreground', t.primaryForeground);
  r.style.setProperty('--muted', t.muted);
  r.style.setProperty('--muted-foreground', t.mutedForeground);
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--border', t.border);
  r.style.setProperty('--glass-bg', t.glassBg);
  r.style.setProperty('--glass-border', t.glassBorder);
  r.style.setProperty('--glass-shadow', t.glassShadow);
  r.classList.toggle('dark', !t.isLight);
  r.setAttribute('data-theme', name);
  updateThemeUI(name);
  updateScrollProgressColor();
  updateScrollTopColor();
  restartBackground();
}

function updateThemeUI(name) {
  const t = THEMES[name];
  const {h,s,l} = parseHsl(t.primary);
  const hex = t.primaryHex;
  const bgHex = THEME_BG_COLORS[name] || '#0a0a14';
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.style.borderColor = hex+'45';
    btn.style.boxShadow = `0 0 18px ${hex}28, 0 4px 16px rgba(0,0,0,0.3)`;
    const dot = btn.querySelector('.dot');
    if(dot){ dot.style.background=`conic-gradient(${hex} 0deg, ${bgHex} 180deg, ${hex}99 360deg)`; dot.style.borderColor=hex+'70'; dot.style.boxShadow=`0 0 10px ${hex}50`; }
    const label = btn.querySelector('.label');
    if(label){ label.style.color=hex; label.textContent=t.label; }
  }
  document.querySelectorAll('.theme-btn').forEach(b=>{
    const isActive = b.dataset.theme === name;
    b.classList.toggle('active', isActive);
    const swatch = b.querySelector('.swatch');
    const th = THEMES[b.dataset.theme];
    if(swatch && th){ const bg=THEME_BG_COLORS[b.dataset.theme]||'#0a0a14'; swatch.style.background=`conic-gradient(${th.primaryHex} 0deg, ${bg} 180deg, ${th.primaryHex}99 360deg)`; swatch.style.borderColor=isActive?th.primaryHex:th.primaryHex+'55'; swatch.style.boxShadow=isActive?`0 0 10px ${th.primaryHex}80, 0 0 20px ${th.primaryHex}28`:'none'; }
    const namEl = b.querySelector('.name');
    if(namEl){ namEl.style.color=isActive?th.primaryHex:''; }
    const dot = b.querySelector('.active-dot');
    if(dot){ dot.style.background=th?th.primaryHex:''; dot.style.boxShadow=th?`0 0 8px ${th.primaryHex}`:''; }
  });
  const menu = document.getElementById('theme-menu');
  if(menu){ const bar=menu.querySelector('.theme-menu-header'); if(bar) bar.style.background=`linear-gradient(90deg, transparent 5%, ${hex} 50%, transparent 95%)`; menu.style.borderColor=hex+'28'; menu.style.boxShadow=`0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${hex}14`; }
}

/* ── THEME TOGGLE UI ── */
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle-btn');
  const menu = document.getElementById('theme-menu');
  if(!btn||!menu) return;
  btn.addEventListener('click', (e)=>{ e.stopPropagation(); menu.classList.toggle('open'); });
  document.addEventListener('mousedown', (e)=>{ if(!btn.contains(e.target)&&!menu.contains(e.target)) menu.classList.remove('open'); });
  document.querySelectorAll('.theme-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const name = b.dataset.theme;
      if(name===currentTheme){ menu.classList.remove('open'); return; }
      const t = THEMES[name];
      const rect = btn.getBoundingClientRect();
      const cx = rect.left+rect.width/2, cy = rect.top+rect.height/2;
      const ripple = document.createElement('div');
      ripple.className='theme-ripple';
      ripple.style.cssText=`left:${cx-20}px;top:${cy-20}px;width:40px;height:40px;background:${t.primaryHex};`;
      document.body.appendChild(ripple);
      setTimeout(()=>ripple.remove(), 900);
      applyTheme(name);
      menu.classList.remove('open');
    });
  });
}

/* ── BACKGROUND CANVAS ── */
let bgCleanup = null;

function darkParticles(canvas,ctx,getSpeed){
  const particles=Array.from({length:70},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.8+0.4,vx:(Math.random()-0.5)*0.18,vy:(Math.random()-0.5)*0.18,o:Math.random()*0.35+0.08}));
  let id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const s=getSpeed();
    particles.forEach(p=>{ p.x+=p.vx*s;p.y+=p.vy*s; if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0; ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(160,160,210,${p.o})`;ctx.fill(); });
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function lightBubbles(canvas,ctx,getSpeed){
  const bubbles=Array.from({length:35},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*28+8,vy:-(Math.random()*0.18+0.06),o:Math.random()*0.07+0.02}));
  let id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();
    bubbles.forEach(b=>{b.y+=b.vy*s;if(b.y+b.r<0)b.y=canvas.height+b.r;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.strokeStyle=`rgba(80,130,240,${b.o})`;ctx.lineWidth=1;ctx.stroke();});
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function goldenSparks(canvas,ctx,getSpeed){
  const sparks=Array.from({length:55},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.8+0.4,vx:(Math.random()-0.5)*0.25,vy:-(Math.random()*0.4+0.1),o:Math.random()*0.6+0.15,life:Math.random()}));
  let id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();
    sparks.forEach(p=>{p.x+=p.vx*s;p.y+=p.vy*s;p.life-=0.004*s;if(p.life<=0){p.x=Math.random()*canvas.width;p.y=canvas.height+10;p.life=1;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(212,175,55,${p.o*p.life})`;ctx.fill();});
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function matrixRain(canvas,ctx,getSpeed){
  const cols=Math.floor(canvas.width/16);
  const drops=Array(cols).fill(1).map(()=>Math.random()*(canvas.height/16));
  const chars="01ABCDEF0110xCAFEBEEF<>{}[]010110001CODE/\\|^&*#";
  let id,accumulator=0;
  function draw(){
    const s=getSpeed();accumulator+=s*0.6;
    if(accumulator>=1){accumulator=0;ctx.fillStyle="rgba(0,0,0,0.04)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.font="13px monospace";drops.forEach((y,i)=>{const alpha=Math.random()>0.5?0.85:0.35;ctx.fillStyle=`rgba(0,255,65,${alpha})`;const char=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(char,i*16,y*16);if(y*16>canvas.height&&Math.random()>0.972)drops[i]=0;drops[i]+=1;});}
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function neonGrid(canvas,ctx,getSpeed){
  let offset=0,id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();offset+=0.3*s;const size=65;
    ctx.lineWidth=0.5;ctx.strokeStyle="rgba(0,255,255,0.055)";
    for(let x=(offset%size)-size;x<canvas.width+size;x+=size){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
    for(let y=(offset%size)-size;y<canvas.height+size;y+=size){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
    ctx.lineWidth=0.8;ctx.strokeStyle="rgba(255,0,255,0.025)";
    const big=size*5;
    for(let x=(offset%big)-big;x<canvas.width+big;x+=big){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
    for(let y=(offset%big)-big;y<canvas.height+big;y+=big){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function gradientWaves(canvas,ctx,getSpeed){
  let t=0,id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();t+=0.002*s;
    for(let w=0;w<4;w++){ctx.beginPath();for(let x=0;x<=canvas.width;x+=5){const y=canvas.height*0.4+Math.sin(x*0.004+t+w*1.3)*55+Math.sin(x*0.007+t*0.65)*25;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}const alpha=0.045-w*0.008;ctx.strokeStyle=`rgba(100,180,255,${alpha})`;ctx.lineWidth=1.5;ctx.stroke();}
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function starfield(canvas,ctx,getSpeed){
  const stars=Array.from({length:180},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.4+0.2,o:Math.random()*0.65+0.1,twinkle:Math.random()*Math.PI*2,speed:Math.random()*0.015+0.004}));
  let id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();
    stars.forEach(st=>{st.twinkle+=st.speed*s;const alpha=st.o*(0.4+0.6*Math.sin(st.twinkle));ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fillStyle=`rgba(210,170,255,${alpha})`;ctx.fill();});
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function sunsetWaves(canvas,ctx,getSpeed){
  let t=0,id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();t+=0.0018*s;
    const colors=["255,90,40","255,140,45","255,70,115","195,45,95","255,110,70"];
    for(let w=0;w<5;w++){ctx.beginPath();for(let x=0;x<=canvas.width;x+=4){const y=canvas.height*0.58+Math.sin(x*0.0035+t+w*0.85)*48;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.strokeStyle=`rgba(${colors[w]},0.055)`;ctx.lineWidth=1.8;ctx.stroke();}
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}
function auroraWaves(canvas,ctx,getSpeed){
  let t=0,id;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);const s=getSpeed();t+=0.0014*s;
    const bands=[{color:"52,211,153",phase:0},{color:"167,139,250",phase:1.4},{color:"34,211,238",phase:2.8},{color:"196,181,253",phase:4.2}];
    bands.forEach(({color,phase},i)=>{ctx.beginPath();for(let x=0;x<=canvas.width;x+=4){const y=canvas.height*0.35+Math.sin(x*0.0025+t+phase)*70+Math.sin(x*0.005+t*0.7+phase)*30;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.strokeStyle=`rgba(${color},${0.055-i*0.01})`;ctx.lineWidth=2;ctx.stroke();});
    id=requestAnimationFrame(draw);
  }
  draw();return()=>cancelAnimationFrame(id);
}

/* Maps each theme key → its canvas background animation function.
   Add/remove entries here when adding/removing themes above. */
const bgRunners = {
  midnight:starfield, neon:neonGrid, aurora:auroraWaves,
  light:lightBubbles, warm:lightBubbles, golden:goldenSparks, sunset:sunsetWaves,
  technical:matrixRain,
};

function setupBackground() {
  const canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d',{alpha:true});
  if(!ctx) return;
  const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;};
  resize();
  let resizeTimer;
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,150);});
  let speed=1,paused=document.hidden,idleTimer;
  const resetIdle=()=>{speed=1;clearTimeout(idleTimer);idleTimer=setTimeout(()=>{speed=0.35;},3500);};
  const getSpeed=()=>paused?0:speed;
  resetIdle();
  window.addEventListener('mousemove',resetIdle,{passive:true});
  window.addEventListener('keydown',resetIdle,{passive:true});
  window.addEventListener('touchstart',resetIdle,{passive:true});
  document.addEventListener('visibilitychange',()=>{paused=document.hidden;});
  window._bgCtx=ctx; window._bgCanvas=canvas; window._bgGetSpeed=getSpeed;
}

function restartBackground() {
  if(bgCleanup) bgCleanup();
  const canvas=window._bgCanvas, ctx=window._bgCtx, getSpeed=window._bgGetSpeed;
  if(!canvas||!ctx) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const runner=bgRunners[currentTheme]||bgRunners.midnight;
  bgCleanup=runner(canvas,ctx,getSpeed);
}

/* ── MOUSE ORB PARALLAX ── */
function setupMouseOrbs() {
  const tl=document.querySelector('.mouse-orb-tl'), br=document.querySelector('.mouse-orb-br');
  if(!tl||!br) return;
  let pending=false,rafId;
  window.addEventListener('mousemove',(e)=>{
    if(pending) return; pending=true;
    rafId=requestAnimationFrame(()=>{
      const mx=e.clientX/window.innerWidth, my=e.clientY/window.innerHeight;
      tl.style.transform=`translate(${mx*-15}px,${my*-10}px)`;
      br.style.transform=`translate(${mx*12}px,${my*8}px)`;
      pending=false;
    });
  },{passive:true});
}

/* ── SCROLL PROGRESS ── */
function setupScrollProgress() {
  const fill=document.getElementById('scroll-progress-fill');
  const btn=document.getElementById('scroll-top-btn');
  if(!fill&&!btn) return;
  const onScroll=()=>{
    const scrollTop=window.scrollY;
    const docH=document.documentElement.scrollHeight-window.innerHeight;
    const pct=docH>0?Math.min(1,scrollTop/docH):0;
    if(fill) fill.style.width=`${pct*100}%`;
    if(btn){ btn.classList.toggle('visible',scrollTop>300); updateScrollTopRing(pct); }
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  if(btn) btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  onScroll();
}

function updateScrollTopRing(pct) {
  const svg=document.querySelector('#scroll-top-btn svg.ring');
  if(!svg) return;
  const SIZE=48,STROKE=3,HALF=24,RADIUS=HALF-STROKE/2-1;
  const CIRC=2*Math.PI*RADIUS;
  const progress=svg.querySelector('.progress-ring');
  if(progress) progress.style.strokeDashoffset=CIRC*(1-pct);
}

function updateScrollProgressColor() {
  const t=THEMES[currentTheme];
  if(!t) return;
  const fill=document.getElementById('scroll-progress-fill');
  if(fill) fill.style.background=`linear-gradient(90deg,${t.primaryHex}bb,${t.primaryHex})`;
  updateScrollTopColor();
}

function updateScrollTopColor() {
  const t=THEMES[currentTheme];if(!t) return;
  const btn=document.getElementById('scroll-top-btn');
  if(!btn) return;
  btn.style.boxShadow=`0 0 18px ${t.primaryHex}44, 0 4px 18px rgba(0,0,0,0.35)`;
  const icon=btn.querySelector('.icon');
  if(icon) icon.style.color=t.primaryHex;
  const track=btn.querySelector('.track-ring');
  const prog=btn.querySelector('.progress-ring');
  if(track) track.setAttribute('stroke',t.primaryHex+'25');
  if(prog){ prog.setAttribute('stroke',t.primaryHex); const SIZE=48,STROKE=3,HALF=24,RADIUS=HALF-STROKE/2-1,CIRC=2*Math.PI*RADIUS; prog.setAttribute('stroke-dasharray',CIRC); prog.style.strokeDashoffset=CIRC; }
}

/* ── ROTATING TEXT ── */
const PHRASES=["Open Source Project Builder","README Crafter & Documenter","Open Source App Maker","Free Tools for Everyone","Building Things That Matter"];
let phraseIndex=0,phraseTimer;
function setupRotatingText(){
  const el=document.querySelector('.rotating-text');
  if(!el) return;
  el.textContent=PHRASES[0];
  phraseTimer=setInterval(()=>{
    el.style.animation='none'; el.offsetHeight;
    el.style.animation='text-cycle-out 0.4s ease forwards';
    setTimeout(()=>{
      phraseIndex=(phraseIndex+1)%PHRASES.length;
      el.textContent=PHRASES[phraseIndex];
      el.style.animation='text-cycle-in 0.4s ease forwards';
    },400);
  },5000);
}

/* ── APPEAR ON SCROLL ── */
function setupAppear(){
  const els=document.querySelectorAll('.appear');
  const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -60px 0px'});
  els.forEach(el=>obs.observe(el));
}

/* ── TOAST ── */
function showToast(title,desc){
  const container=document.getElementById('toast-container');
  if(!container) return;
  const toast=document.createElement('div');
  toast.className='toast';
  toast.innerHTML=`<div class="toast-title">${title}</div><div class="toast-desc">${desc}</div>`;
  container.appendChild(toast);
  setTimeout(()=>{toast.style.opacity='0';toast.style.transform='translateY(8px)';toast.style.transition='opacity 0.3s, transform 0.3s';setTimeout(()=>toast.remove(),300);},2500);
}

/* ── CONFETTI ── */
function spawnConfetti(x,y){
  if(typeof confetti==='function'){
    confetti({particleCount:70,spread:80,origin:{x:x/window.innerWidth,y:y/window.innerHeight},colors:["#a855f7","#3b82f6","#14b8a6","#ec4899","#f59e0b"],ticks:180,gravity:0.8,decay:0.93,startVelocity:40});
  }
}

/* ══════════════════════════════════════════════════════════════
   CRYPTO WALLET CARDS
   ──────────────────────────────────────────────────────────────
   Each object = one flip card.  Fields you will commonly edit:
     address   – your wallet address (shown on front + back)
     allowed   – list of tokens/NFTs you accept on this chain
     neverSend – list of tokens you do NOT accept (safety warning)
     quote     – thank-you message shown on back of card
   Icon files live in assets/  (ton.svg, eth.svg, sol.svg).
   ══════════════════════════════════════════════════════════════ */
const CRYPTO_CARDS=[
  {
    name:"TON Network", symbol:"TON",
    /* ↓ Replace with your own TON wallet address */
    address:"UQDTX8QV6csepk9U1-dGzhoPfE4MUZTzAjjVE6YVIKVWuVj1",
    glowColor:"#0098EA", holoColor:"#29b6f6",
    subtitle:"The Open Network",
    /* ↓ Tokens/NFTs you accept */
    allowed:["Toncoin (TON)","TON NFTs","Fragment usernames","Plush Pepe"],
    /* ↓ What NOT to send (safety warning on card back) */
    neverSend:["Ethereum / ERC-20","Solana / SPL","Any other network"],
    quote:"Your belief in this vision transforms dreams into reality. Thank you for being part of this journey.",
    /* Icon comes from assets/ton.svg — replace file to change logo */
    icon:'<img src="assets/ton.svg" width="44" height="44" alt="TON logo" style="display:block">'
  },
  {
    name:"Ethereum / EVM", symbol:"ETH",
    /* ↓ Replace with your own EVM wallet address */
    address:"0x56dC57B9D03C6b947e49a28edC7e18FBe383365a",
    glowColor:"#627EEA", holoColor:"#9c8fff",
    subtitle:"MetaMask & EVM Compatible",
    allowed:["ETH / ERC-20","ERC-721 NFTs","BNB / BEP-20","Polygon / Arbitrum"],
    neverSend:["Solana / SPL","TON / Jettons","Bitcoin / BTC"],
    quote:"Your generosity is the heartbeat of innovation. Together we're building something extraordinary.",
    /* Icon comes from assets/eth.svg — replace file to change logo */
    icon:'<img src="assets/eth.svg" width="44" height="44" alt="ETH logo" style="display:block">'
  },
  {
    name:"Solana", symbol:"SOL",
    /* ↓ Replace with your own Solana wallet address */
    address:"9JEjaDCfe9esp6ECpyww7Gm3NUcieiy7hMU1pKMQVWxP",
    glowColor:"#9945FF", holoColor:"#14F195",
    subtitle:"Phantom / Solflare",
    allowed:["SOL","GRASS & SPL tokens","Solana NFTs","Digital Collectibles"],
    neverSend:["Ethereum / ERC-20","TON / Jettons","Bitcoin / BTC"],
    quote:"Your kindness ripples far beyond what you see. Every contribution writes a new chapter.",
    /* Icon comes from assets/sol.svg — replace file to change logo */
    icon:'<img src="assets/sol.svg" width="44" height="44" alt="Solana logo" style="display:block">'
  },
];

const TOAST_MSGS=["Address copied! You're awesome","Thank you for supporting the project","Your support keeps these projects alive"];

function truncateAddr(addr){ if(addr.length<=20) return addr; return addr.slice(0,10)+'…'+addr.slice(-8); }

function buildCryptoCard(card, idx){
  const {name,symbol,address,glowColor,holoColor,subtitle,allowed,neverSend,quote,icon}=card;
  const allowedHTML=allowed.map(a=>`<span>→ ${a}</span>`).join('');
  const neverHTML=neverSend.map(n=>`<p class="card-never-item">✗ ${n}</p>`).join('');
  const allowedGridHTML=allowed.map(a=>`<span><span style="color:${glowColor}">→</span> ${a}</span>`).join('');
  return `
  <div class="crypto-card-wrapper" data-idx="${idx}">
    <div class="crypto-card-inner">
      <div class="crypto-card-face crypto-card-front" style="border:1.5px solid ${holoColor}40">
        <div class="card-holo" style="background:linear-gradient(45deg,transparent 20%,${holoColor}50 50%,transparent 80%)"></div>
        <div class="card-glow-tl" style="background:${glowColor};opacity:0.12"></div>
        <div class="card-glow-bl" style="background:${glowColor};opacity:0.08"></div>
        <div class="card-header">
          <div class="card-icon-wrap" style="background:${glowColor}22;border:1px solid ${glowColor}35">${icon}</div>
          <div>
            <div class="card-symbol" style="background:${glowColor}20;color:${glowColor};border:1px solid ${glowColor}30">${symbol}</div>
            <p class="card-tap">tap to see details</p>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-name" style="background:linear-gradient(135deg,hsl(var(--foreground)) 40%,${glowColor});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${name}</h3>
          <p class="card-subtitle">${subtitle}</p>
          <div class="card-tags">${allowed.map(a=>`<span class="card-tag" style="background:${glowColor}18;color:${glowColor};border:1px solid ${glowColor}30">${a}</span>`).join('')}</div>
        </div>
        <div class="card-footer">
          <div class="card-addr-row" style="border:1px solid ${glowColor}25">
            <span class="card-addr-text">${truncateAddr(address)}</span>
            <button class="card-copy-mini" style="background:${glowColor}20;color:${glowColor}" onclick="copyAddr(event,'${address}',this)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
          <button class="card-copy-btn" style="background:linear-gradient(135deg,${glowColor}cc,${glowColor});box-shadow:0 4px 20px ${glowColor}45" onclick="copyAddr(event,'${address}',this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span class="copy-btn-text">Copy Full Address</span>
          </button>
        </div>
      </div>
      <div class="crypto-card-face crypto-card-back" style="border:1.5px solid ${glowColor}40;box-shadow:0 0 50px ${glowColor}20,0 8px 40px rgba(0,0,0,0.4)">
        <div class="card-glow-tl" style="background:${glowColor};opacity:0.15"></div>
        <div style="position:absolute;inset:0;border-radius:24px;pointer-events:none;background:linear-gradient(135deg,transparent 0%,rgba(255,255,255,0.07) 50%,transparent 100%)"></div>
        <div class="card-back-header">
          <div>
            <p class="card-back-title">${name}</p>
            <p class="card-back-subtitle">${subtitle}</p>
          </div>
          <button class="card-flip-back-btn" style="background:${glowColor}15;color:${glowColor}" onclick="flipBackCard(event,this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
        <div class="card-back-body">
          <div>
            <p class="card-section-label" style="color:${glowColor}">You Can Send</p>
            <div class="card-back-grid">${allowedGridHTML}</div>
          </div>
          <div class="card-never-box">
            <p class="card-never-label">Never Send</p>
            ${neverHTML}
          </div>
          <div>
            <p class="card-section-label" style="color:${glowColor}">Wallet Address</p>
            <div class="card-back-addr-wrap" style="border:1px solid ${glowColor}25">
              <span class="card-back-addr-text">${address}</span>
              <button class="card-copy-mini" style="background:${glowColor}20;color:${glowColor}" onclick="copyAddr(event,'${address}',this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="card-back-footer" style="border-color:${glowColor}25">
          <p class="card-quote" style="color:${glowColor}">"${quote}"</p>
        </div>
      </div>
    </div>
  </div>`;
}

window.copyAddr = function(e, address, btn) {
  e.stopPropagation();
  navigator.clipboard.writeText(address).catch(()=>{});
  spawnConfetti(e.clientX, e.clientY);
  const msg=TOAST_MSGS[Math.floor(Math.random()*TOAST_MSGS.length)];
  showToast('Address Copied!', msg);
  const svgEl=btn.querySelector('svg');
  const originalHTML=btn.innerHTML;
  btn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
  setTimeout(()=>{ btn.innerHTML=originalHTML; },2500);
};

window.flipBackCard = function(e, btn) {
  e.stopPropagation();
  const wrapper=btn.closest('.crypto-card-wrapper');
  if(wrapper) wrapper.classList.remove('flipped');
};

function setupCryptoCards(){
  const grid=document.getElementById('crypto-grid');
  const carousel=document.getElementById('crypto-carousel');
  if(grid){
    grid.innerHTML=CRYPTO_CARDS.map((c,i)=>buildCryptoCard(c,i)).join('');
  }
  if(carousel){
    const window2=carousel.querySelector('.carousel-window');
    const dots=carousel.querySelector('.carousel-dots');
    if(window2){
      /* Slide 0 = active, last = prev, rest = next — prevents invisible overlay bug */
      window2.innerHTML=CRYPTO_CARDS.map((c,i)=>`<div class="carousel-slide${i===0?' active':i===CRYPTO_CARDS.length-1?' prev':' next'}" data-slide="${i}">${buildCryptoCard(c,i)}</div>`).join('');
    }
    if(dots){
      dots.innerHTML=CRYPTO_CARDS.map((c,i)=>`<button class="carousel-dot${i===0?' active':''}" style="${i===0?`background:${c.glowColor};width:22px`:''}" data-dot="${i}"></button>`).join('');
    }
  }
  document.querySelectorAll('.crypto-card-wrapper').forEach(wrapper=>{
    wrapper.addEventListener('click',()=>wrapper.classList.toggle('flipped'));
  });
  setupCarousel();
}

/* ── CAROUSEL ── */
let carouselIdx=0;
function setupCarousel(){
  const carousel=document.getElementById('crypto-carousel');
  if(!carousel) return;
  const prevBtn=carousel.querySelector('.carousel-prev');
  const nextBtn=carousel.querySelector('.carousel-next');
  if(prevBtn) prevBtn.addEventListener('click',()=>goCarousel(carouselIdx-1));
  if(nextBtn) nextBtn.addEventListener('click',()=>goCarousel(carouselIdx+1));
  carousel.querySelectorAll('.carousel-dot').forEach(dot=>{
    dot.addEventListener('click',()=>goCarousel(parseInt(dot.dataset.dot)));
  });
}
function goCarousel(idx){
  const len=CRYPTO_CARDS.length;
  const newIdx=((idx%len)+len)%len;
  /* Scope to #crypto-carousel so Telegram slides are never affected */
  const el=document.getElementById('crypto-carousel');
  if(!el) return;
  const slides=el.querySelectorAll('.carousel-slide');
  const dots=el.querySelectorAll('.carousel-dot');
  slides.forEach((s,i)=>{
    s.classList.remove('active','prev','next');
    if(i===newIdx) s.classList.add('active');
    else if(i===(newIdx-1+len)%len) s.classList.add('prev');
    else s.classList.add('next');
  });
  dots.forEach((d,i)=>{
    const isActive=i===newIdx;
    d.classList.toggle('active',isActive);
    d.style.background=isActive?CRYPTO_CARDS[i].glowColor:'';
    d.style.width=isActive?'22px':'';
  });
  carouselIdx=newIdx;
}

/* ══════════════════════════════════════════════════════════════
   TELEGRAM SUPPORT CARDS
   ──────────────────────────────────────────────────────────────
   Each object = one flip card shown in the "Support via Telegram"
   section.  Fields you will commonly edit:
     name        – card title shown on front
     subtitle    – one-line description under the title
     tags        – badge chips shown on front face
     steps       – numbered instructions shown on back face
                   (HTML allowed, e.g. <b>bold</b>)
     actionLabel – text of the call-to-action button on back
     actionUrl   – URL the button opens (t.me link, fragment.com…)
     quote       – small italic message at bottom of back face
     tgHandle    – Telegram username of the recipient (used in steps)
   Icon files live in assets/ (tg-nft.svg, tg-premium.svg, tg-stars.svg).
   ══════════════════════════════════════════════════════════════ */
const TELEGRAM_CARDS=[
  {
    name:"TON NFT",
    symbol:"NFT",
    glowColor:"#0098EA",
    subtitle:"Gift from your Telegram profile or Fragment",
    tags:["Profile NFTs","Fragment NFTs","Username NFTs","TON Collectibles"],
    /* ↓ Edit these steps to change the instructions shown on the card back */
    steps:[
      "Open <b>Telegram</b> → tap your profile photo at the top",
      "Scroll down to <b>My NFTs</b> → tap any NFT you want to gift",
      "Tap <b>Transfer</b> and search for <b>@mkr_infinity</b>",
      "Confirm the transfer — it arrives on TON network instantly",
      "Or go to <b>fragment.com</b> → find an NFT → transfer directly"
    ],
    /* ↓ Change URL if your Telegram handle differs */
    actionLabel:"Open Fragment",
    actionUrl:"https://fragment.com",
    tgHandle:"@mkr_infinity",
    quote:"A digital collectible you gift lives forever on-chain — a gift that never fades.",
    /* Icon file: assets/tg-nft.svg */
    icon:'<img src="assets/tg-nft.svg" width="52" height="52" alt="NFT icon" style="display:block">'
  },
  {
    name:"Telegram Premium",
    symbol:"PREM",
    glowColor:"#8B5CF6",
    subtitle:"Gift a Premium subscription directly",
    tags:["1 Month","3 Months","6 Months","Lifetime Boost"],
    steps:[
      "Open <b>Telegram</b> and search for <b>@mkr_infinity</b>",
      "Tap the profile name at the top to open the full profile",
      "Scroll down and tap <b>Gift Telegram Premium</b>",
      "Choose a duration (1 / 3 / 6 months) and confirm payment"
    ],
    actionLabel:"Open Profile",
    actionUrl:"https://t.me/mkr_infinity",
    tgHandle:"@mkr_infinity",
    quote:"Gifting Premium unlocks a world of features — and tells a creator their work truly matters.",
    /* Icon file: assets/tg-premium.svg */
    icon:'<img src="assets/tg-premium.svg" width="52" height="52" alt="Premium icon" style="display:block">'
  },
  {
    name:"Telegram Stars",
    symbol:"⭐",
    glowColor:"#F59E0B",
    subtitle:"Send Stars inside any Telegram chat",
    tags:["Any Amount","Instant","No Fees","Boosts Creator"],
    steps:[
      "Open <b>Telegram</b> → find any post or message from <b>@mkr_infinity</b>",
      "Long-press (or right-click) the message to see options",
      "Tap <b>Send Stars ⭐</b> from the context menu",
      "Enter your amount and tap <b>Send</b> — done!"
    ],
    actionLabel:"Open Chat",
    actionUrl:"https://t.me/mkr_infinity",
    tgHandle:"@mkr_infinity",
    quote:"Every star you send shines a light on the work that makes a difference. Thank you.",
    /* Icon file: assets/tg-stars.svg */
    icon:'<img src="assets/tg-stars.svg" width="52" height="52" alt="Stars icon" style="display:block">'
  }
];

/* ── Build HTML for a single Telegram card (front + back) ── */
function buildTelegramCard(card,idx){
  const{name,symbol,glowColor,subtitle,tags,steps,actionLabel,actionUrl,quote,icon}=card;

  /* Steps: numbered circles + text */
  const stepsHTML=steps.map((s,i)=>`
    <div class="tg-step">
      <span class="tg-step-num" style="background:${glowColor}22;color:${glowColor};border:1px solid ${glowColor}40">${i+1}</span>
      <span class="tg-step-text">${s}</span>
    </div>`).join('');

  /* Tags: shown on front face */
  const tagsHTML=tags.map(t=>`<span class="tg-card-tag">${t}</span>`).join('');

  return `
  <div class="crypto-card-wrapper tg-card" data-tg-idx="${idx}">
    <div class="crypto-card-inner">

      <!-- ── FRONT ─────────────────────────────────────────── -->
      <div class="crypto-card-face tg-front"
           style="background:linear-gradient(150deg,${glowColor}ee 0%,${glowColor}99 55%,${glowColor}55 100%)">
        <!-- shine overlay -->
        <div style="position:absolute;inset:0;border-radius:24px;pointer-events:none;
             background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 50%,rgba(0,0,0,0.08) 100%)"></div>
        <!-- Telegram badge top-left -->
        <div class="tg-front-badge">
          <img src="assets/tg-logo.svg" width="14" height="14" alt="Telegram" style="border-radius:50%"> Telegram Gift
        </div>
        <!-- Large centered icon -->
        <div class="tg-front-icon-wrap">
          <div class="tg-front-icon-bg">${icon}</div>
        </div>
        <!-- Title + subtitle -->
        <h3 class="tg-front-name">${name}</h3>
        <p class="tg-front-subtitle">${subtitle}</p>
        <!-- Tag chips -->
        <div class="tg-front-tags">${tagsHTML}</div>
        <!-- Flip hint -->
        <div class="tg-front-hint">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/>
          </svg>
          Tap to see steps
        </div>
      </div>

      <!-- ── BACK ──────────────────────────────────────────── -->
      <div class="crypto-card-face crypto-card-back tg-back"
           style="border:1.5px solid ${glowColor}45">
        <!-- subtle glow overlay -->
        <div style="position:absolute;inset:0;border-radius:24px;pointer-events:none;
             background:linear-gradient(135deg,${glowColor}16 0%,transparent 60%)"></div>
        <!-- Back header: icon + name + flip button -->
        <div class="tg-back-header" style="border-bottom-color:${glowColor}25">
          <div class="tg-back-header-left">
            <div class="tg-back-icon-sm" style="background:${glowColor}20;border:1px solid ${glowColor}38">${icon}</div>
            <div>
              <p class="tg-back-name">${name}</p>
              <p class="tg-back-subtitle">${subtitle}</p>
            </div>
          </div>
          <button class="card-flip-back-btn" style="background:${glowColor}18;color:${glowColor}"
                  onclick="flipBackTgCard(event,this)" aria-label="Flip back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
            </svg>
          </button>
        </div>
        <!-- Steps -->
        <div class="tg-back-steps">
          <p class="card-section-label" style="color:${glowColor};margin-bottom:10px">How to Support</p>
          <div class="tg-steps-list">${stepsHTML}</div>
        </div>
        <!-- Footer: action button + quote -->
        <div class="tg-back-footer" style="border-top-color:${glowColor}25">
          <a href="${actionUrl}" target="_blank" rel="noopener noreferrer"
             class="tg-action-btn"
             style="background:linear-gradient(135deg,${glowColor}cc,${glowColor});box-shadow:0 4px 20px ${glowColor}45"
             onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            ${actionLabel}
          </a>
          <p class="card-quote" style="color:${glowColor}">"${quote}"</p>
        </div>
      </div>

    </div>
  </div>`;
}

window.flipBackTgCard = function(e,btn){
  e.stopPropagation();
  const wrapper=btn.closest('.crypto-card-wrapper');
  if(wrapper) wrapper.classList.remove('flipped');
};

let tgCarouselIdx=0;
function setupTelegramCards(){
  const grid=document.getElementById('tg-grid');
  const carousel=document.getElementById('tg-carousel');
  if(grid){
    grid.innerHTML=TELEGRAM_CARDS.map((c,i)=>buildTelegramCard(c,i)).join('');
  }
  if(carousel){
    const win=carousel.querySelector('.carousel-window');
    const dots=carousel.querySelector('.carousel-dots');
    if(win){
      /* Slide 0 = active, last = prev, rest = next — prevents invisible overlay bug */
      win.innerHTML=TELEGRAM_CARDS.map((c,i)=>`<div class="carousel-slide${i===0?' active':i===TELEGRAM_CARDS.length-1?' prev':' next'}" data-tg-slide="${i}">${buildTelegramCard(c,i)}</div>`).join('');
    }
    if(dots){
      dots.innerHTML=TELEGRAM_CARDS.map((c,i)=>`<button class="carousel-dot${i===0?' active':''}" style="${i===0?`background:${c.glowColor};width:22px`:''}" data-tg-dot="${i}"></button>`).join('');
    }
    const prevBtn=carousel.querySelector('.carousel-prev');
    const nextBtn=carousel.querySelector('.carousel-next');
    if(prevBtn) prevBtn.addEventListener('click',()=>goTgCarousel(tgCarouselIdx-1));
    if(nextBtn) nextBtn.addEventListener('click',()=>goTgCarousel(tgCarouselIdx+1));
    carousel.querySelectorAll('.carousel-dot').forEach(dot=>{
      dot.addEventListener('click',()=>goTgCarousel(parseInt(dot.dataset.tgDot)));
    });
  }
  /* Flip toggle for both grid and carousel cards */
  document.querySelectorAll('#tg-grid .crypto-card-wrapper, #tg-carousel .crypto-card-wrapper').forEach(wrapper=>{
    wrapper.addEventListener('click',()=>wrapper.classList.toggle('flipped'));
  });
}

function goTgCarousel(idx){
  const len=TELEGRAM_CARDS.length;
  const newIdx=((idx%len)+len)%len;
  const carousel=document.getElementById('tg-carousel');
  if(!carousel) return;
  const slides=carousel.querySelectorAll('.carousel-slide');
  const dots=carousel.querySelectorAll('.carousel-dot');
  slides.forEach((s,i)=>{
    s.classList.remove('active','prev','next');
    if(i===newIdx) s.classList.add('active');
    else if(i===(newIdx-1+len)%len) s.classList.add('prev');
    else s.classList.add('next');
  });
  dots.forEach((d,i)=>{
    const isActive=i===newIdx;
    d.classList.toggle('active',isActive);
    d.style.background=isActive?TELEGRAM_CARDS[i].glowColor:'';
    d.style.width=isActive?'22px':'';
  });
  tgCarouselIdx=newIdx;
}

/* ── SOCIAL CARDS ── */
const SOCIALS=[
  {icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',label:"GitHub",handle:"@mkr-infinity",url:"https://github.com/mkr-infinity",gradient:["#1a1a2e","#16213e","#0f3460"],glow:"rgba(99,110,123,0.6)",accent:"#8b949e",description:"Open-source projects & code"},
  {icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',label:"Instagram",handle:"@mkr_infinity",url:"https://www.instagram.com/mkr_infinity",gradient:["#833ab4","#fd1d1d","#fcb045"],glow:"rgba(253,29,29,0.4)",accent:"#fd1d1d",description:"Life behind the builds"},
  {icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/></svg>',label:"Buy Me a Coffee",handle:"mkr_infinity",url:"https://buymeacoffee.com/mkr_infinity",gradient:["#FFDD00","#FF6B35","#FFDD00"],glow:"rgba(255,221,0,0.5)",accent:"#FFDD00",description:"Support my open-source work"},
  {icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',label:"Website",handle:"mkr-infinity.github.io",url:"https://mkr-infinity.github.io",gradient:["#1a1a2e","#16213e","#0f3460"],glow:"rgba(59,130,246,0.5)",accent:"#60a5fa",description:"Projects & portfolio"},
];

function buildSocialCards(){
  const grid=document.getElementById('socials-grid');
  if(!grid) return;
  grid.innerHTML=SOCIALS.map((s,i)=>`
  <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-card" style="animation-delay:${i*0.07}s">
    <div class="social-card-inner">
      <div class="social-card-face-wrap" style="">
        <div class="social-card-shimmer"></div>
        <div class="social-card-glow" style="background:radial-gradient(circle at 50% 40%,${s.glow},transparent 65%)"></div>
        <div class="social-card-content">
          <div class="social-icon" style="color:${s.accent}">${s.icon}</div>
          <p class="social-card-name">${s.label}</p>
          <p class="social-card-handle" style="color:${s.accent}">${s.handle}</p>
          <p class="social-card-desc">${s.description}</p>
          <div class="social-open-badge">Open ↗</div>
        </div>
      </div>
    </div>
  </a>`).join('');
  grid.querySelectorAll('.social-card').forEach((card,i)=>{
    const s=SOCIALS[i];
    const face=card.querySelector('.social-card-face-wrap');
    const icon=card.querySelector('.social-icon');
    const name=card.querySelector('.social-card-name');
    const handle=card.querySelector('.social-card-handle');
    card.addEventListener('mouseenter',()=>{
      face.style.background=`linear-gradient(135deg,${s.gradient[0]},${s.gradient[1]},${s.gradient[2]})`;
      face.style.borderColor=s.accent+'70';
      icon.style.color='#fff'; name.style.color='#fff'; handle.style.color='rgba(255,255,255,0.75)';
    });
    card.addEventListener('mouseleave',()=>{
      face.style.background='';face.style.borderColor='';
      icon.style.color=s.accent; name.style.color=''; handle.style.color=s.accent;
    });
    card.addEventListener('touchstart',()=>{ card.classList.add('touch-active'); face.style.background=`linear-gradient(135deg,${s.gradient[0]},${s.gradient[1]},${s.gradient[2]})`; face.style.borderColor=s.accent+'70'; icon.style.color='#fff'; name.style.color='#fff'; handle.style.color='rgba(255,255,255,0.75)'; },{passive:true});
    card.addEventListener('touchend',()=>{ setTimeout(()=>{ card.classList.remove('touch-active'); face.style.background='';face.style.borderColor=''; icon.style.color=s.accent; name.style.color=''; handle.style.color=s.accent; },600); },{passive:true});
  });
}

/* ── CONTACT FLIP TILES ── */
const CONTACT_REASONS=[
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',title:"Project Ideas",color:"#39b5f0",desc:"Have a cool idea? Let\'s bring it to life — I love turning wild concepts into real things."},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',title:"Build Together",color:"#34d399",desc:"Looking for an open-source collaborator? Let\'s ship something meaningful, together."},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',title:"Hiring / Freelance",color:"#c084fc",desc:"Interested in working with me? I\'m open to freelance, part-time, or full-time roles."},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',title:"README / Docs",color:"#fb923c",desc:"Need a README or documentation crafted properly? That\'s literally my thing."},
];

function buildContactTiles(){
  const container=document.getElementById('contact-reasons');
  if(!container) return;
  container.innerHTML=CONTACT_REASONS.map(r=>`
  <div class="flip-tile">
    <div class="flip-tile-inner">
      <div class="flip-face flip-front" style="background:linear-gradient(135deg,${r.color}14,${r.color}06);border:1px solid ${r.color}30">
        <div class="flip-front-icon" style="background:${r.color}18;border:1px solid ${r.color}35">${r.icon.replace('stroke="currentColor"',`stroke="${r.color}"`)}</div>
        <div><p class="flip-front-title">${r.title}</p><p class="flip-front-hint" style="color:${r.color}bb">Tap to reveal</p></div>
      </div>
      <div class="flip-face flip-back" style="background:linear-gradient(135deg,${r.color}28,${r.color}12);border:1.5px solid ${r.color}55;box-shadow:0 0 20px ${r.color}28">
        <p>${r.desc}</p>
      </div>
    </div>
  </div>`).join('');
  container.querySelectorAll('.flip-tile').forEach(tile=>{
    tile.addEventListener('click',()=>tile.classList.toggle('flipped'));
  });
}

/* ── SCROLL TO SUPPORT ── */
function scrollToSupport(){
  const el=document.getElementById('crypto-support');
  if(el) el.scrollIntoView({behavior:'smooth'});
}

/* ── HERO STAR ANIMATION ── */
function animateHeroStar(){
  const star=document.querySelector('.hero-star');
  if(!star) return;
  setTimeout(()=>{ star.style.opacity='1'; star.style.transform='scale(1) rotate(0deg)'; },900);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',()=>{
  const allThemes=Object.keys(THEMES);
  const startTheme=allThemes[Math.floor(Math.random()*allThemes.length)];
  applyTheme(startTheme);
  setupBackground();
  restartBackground();
  setupMouseOrbs();
  setupScrollProgress();
  setupRotatingText();
  setupThemeToggle();
  setupCryptoCards();
  setupTelegramCards();
  buildSocialCards();
  buildContactTiles();
  setupAppear();
  animateHeroStar();
});
