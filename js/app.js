/* THE WEB OF MATHEMATICS — renderer
   Semantic zoom: level 0 shows 8 domains; zooming in resolves each into its fields.
   Data lives entirely in data/data.js — this file never needs editing to grow the map.

   WAVE 1 — typographic hierarchy + level-of-detail
   · Four type voices: Spectral serif (domains) / Inter 17 semibold (fields)
     / Inter 10.5 regular (topics) / Plex Mono 9.5 italic lowercase (bridges)
   · One applyLOD() drives all zoom-dependent visibility (fade, don't pop)
   · Viewport culling above field zoom kills the hairball
   · One-shot greedy collision pass hides overlapping topic labels
   · Glow filters reserved for navigable levels — topic dots are flat (perf) */

(function(){
"use strict";
const D = window.MATH_DATA;
const VB_W = 2200, VB_H = 1700;
const FIELD_ZOOM = 1.35;          // scale at which fields take over from domains
const svg = document.getElementById('svg');
const viewport = document.getElementById('viewport');

/* ---------- index the data ---------- */
const domById = {}; D.domains.forEach(d=>domById[d.id]=d);
const fieldById = {}; D.fields.forEach(f=>fieldById[f.id]=f);
const fieldsOf = {}; D.domains.forEach(d=>fieldsOf[d.id]=[]);
D.fields.forEach(f=>fieldsOf[f.domain].push(f));
const edgesOf = {}; D.fields.forEach(f=>edgesOf[f.id]=[]);
D.edges.forEach((e,i)=>{e._i=i; edgesOf[e.from].push(e); edgesOf[e.to].push(e);});

/* ---------- radial layout of fields around their domain ---------- */
D.domains.forEach(d=>{
  const fs = fieldsOf[d.id];
  const n = fs.length;
  const R = n<=3 ? 130 : n<=5 ? 175 : n<=7 ? 215 : 250;
  fs.forEach((f,i)=>{
    const a = -Math.PI/2 + i*(2*Math.PI/n);
    f.x = d.x + R*Math.cos(a);
    f.y = d.y + R*Math.sin(a);
  });
  d.R = R + 62;
});

/* ---------- svg helpers ---------- */
const NS='http://www.w3.org/2000/svg';
function el(tag, attrs, parent){
  const e=document.createElementNS(NS,tag);
  for(const k in attrs) e.setAttribute(k,attrs[k]);
  if(parent) parent.appendChild(e);
  return e;
}
function edgePath(a,b,bend){
  const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
  const dx=b.x-a.x, dy=b.y-a.y, len=Math.hypot(dx,dy)||1;
  const k=(bend===undefined?0.12:bend);
  const cx=mx - dy/len * len*k, cy=my + dx/len * len*k;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}
/* mix a hex colour toward white: tint('#d9a441', .6) → high-luminance hue */
function tint(hex, w){
  const n=parseInt(hex.slice(1),16);
  const r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  const m=v=>Math.round(v+(255-v)*w);
  return 'rgb('+m(r)+','+m(g)+','+m(b)+')';
}

/* ---------- defs: glows & gradients ---------- */
const defs = el('defs',{},svg);
(function buildDefs(){
  /* No feGaussianBlur filters here. Bloom is painted with radial gradients
     instead (see bloom-<domain> below) — a filter makes the browser render
     the element to an offscreen surface and blur it again on every frame the
     element moves, which is exactly what panning does. */
  // per-domain orb + nebula + bloom gradients
  D.domains.forEach(d=>{
    const og = el('radialGradient',{id:'orb-'+d.id},defs);
    el('stop',{offset:'0%','stop-color':'#ffffff','stop-opacity':'0.95'},og);
    el('stop',{offset:'30%','stop-color':d.color,'stop-opacity':'1'},og);
    el('stop',{offset:'100%','stop-color':d.color,'stop-opacity':'0.35'},og);
    const ng = el('radialGradient',{id:'nebula-'+d.id},defs);
    el('stop',{offset:'0%','stop-color':d.color,'stop-opacity':'0.30'},ng);
    el('stop',{offset:'55%','stop-color':d.color,'stop-opacity':'0.12'},ng);
    el('stop',{offset:'100%','stop-color':d.color,'stop-opacity':'0'},ng);
    const bg = el('radialGradient',{id:'bloom-'+d.id},defs);
    el('stop',{offset:'0%','stop-color':d.color,'stop-opacity':'0.8'},bg);
    el('stop',{offset:'40%','stop-color':d.color,'stop-opacity':'0.26'},bg);
    el('stop',{offset:'100%','stop-color':d.color,'stop-opacity':'0'},bg);
  });
})();

/* ---------- starfield backdrop ---------- */
const gStars = el('g',{id:'layer-stars'},viewport);
(function stars(){
  let seed=42; const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
  for(let i=0;i<170;i++){
    const s=el('circle',{cx:rnd()*VB_W,cy:rnd()*VB_H,r:(0.5+rnd()*1.4).toFixed(2),'class':'star'},gStars);
    s.style.animationDelay=(rnd()*4).toFixed(2)+'s';
    s.style.animationDuration=(2.4+rnd()*3.6).toFixed(2)+'s';
  }
})();

/* ---------- layers ---------- */
const gAgg    = el('g',{id:'layer-agg'},viewport);     // domain-level aggregate ribbons
const gDomain = el('g',{id:'layer-domains'},viewport);
const gEdges  = el('g',{id:'layer-edges'},viewport);   // field-level edges
const gFields = el('g',{id:'layer-fields'},viewport);

/* aggregate ribbons between domains (deduped) — the only edges at full zoom-out.
   Wide, soft gradient strokes running hue→hue between their two domains, so the
   overview reads as regions with currents between them, not a wire hairball. */
const aggSeen = new Set(); let aggN=0;
D.edges.forEach(e=>{
  const da = fieldById[e.from].domain, db = fieldById[e.to].domain;
  if(da===db) return;
  const key=[da,db].sort().join('|');
  if(aggSeen.has(key)) return; aggSeen.add(key);
  const A=domById[da], B=domById[db];
  const gid='aggrad-'+(aggN++);
  const lg=el('linearGradient',{id:gid,gradientUnits:'userSpaceOnUse',
    x1:A.x,y1:A.y,x2:B.x,y2:B.y},defs);
  el('stop',{offset:'0%','stop-color':A.color,'stop-opacity':'0.5'},lg);
  el('stop',{offset:'100%','stop-color':B.color,'stop-opacity':'0.5'},lg);
  el('path',{d:edgePath(A,B,0.08),'class':'agg-edge',stroke:'url(#'+gid+')'},gAgg);
});

/* domain nodes — L0 voice: Spectral serif, letterspaced, high-luminance domain hue */
D.domains.forEach(d=>{
  const g = el('g',{'class':'domain-g'},gDomain);
  d._neb = el('circle',{cx:d.x,cy:d.y,r:d.R+40,'class':'domain-nebula',
    fill:'url(#nebula-'+d.id+')'},g);
  d._ring = el('circle',{cx:d.x,cy:d.y,r:d.R,'class':'domain-ring',stroke:d.color},g);
  d._halo = el('circle',{cx:d.x,cy:d.y,r:d.R,'class':'domain-halo',
    fill:d.color+'14', stroke:d.color+'55','stroke-width':1.5},g);
  d._bloom = el('circle',{cx:d.x,cy:d.y,r:68,'class':'domain-bloom',
    fill:'url(#bloom-'+d.id+')'},g);
  d._core = el('circle',{cx:d.x,cy:d.y,r:18,'class':'domain-core',
    fill:'url(#orb-'+d.id+')',opacity:0.95},g);
  d._label = el('text',{x:d.x,y:d.y+d.R+34,'class':'domain-label','font-size':44,
    fill:tint(d.color,0.55)},g);
  d._label.textContent = d.label;
  d._label.style.filter = 'drop-shadow(0 0 14px '+d.color+'66)';
  d._tag = el('text',{x:d.x,y:d.y+d.R+58,'class':'domain-tag','font-size':13},g);
  d._tag.textContent = d.tag;
  const hit = el('circle',{cx:d.x,cy:d.y,r:Math.max(70,d.R*0.55),'class':'domain-hit'},g);
  hit.addEventListener('click',()=>{ if(scale<FIELD_ZOOM) zoomTo(d.x,d.y,1.9); else openDomain(d); });
});

/* field-level edges (drawn beneath fields) — the bridge's own voice lives on the
   via label: mono italic lowercase gold, unlike any node text on the canvas */
D.edges.forEach(e=>{
  const A=fieldById[e.from], B=fieldById[e.to];
  e._A=A; e._B=B;
  const same = A.domain===B.domain;
  const color = e.type==='sig' ? '#d9a441' : (domById[A.domain].color);
  const path = el('path',{d:edgePath(A,B, same?0.22:0.1),'class':'edge edge-'+e.type,
    stroke:color,'stroke-width': e.type==='sig'?2.2:1.3,
    'stroke-opacity': e.type==='sig'?0.85:0.4},gEdges);
  if(e.type==='pre') path.setAttribute('stroke-dasharray','none');
  const hit = el('path',{d:edgePath(A,B, same?0.22:0.1),'class':'edge-hit'},gEdges);
  hit.addEventListener('click',ev=>{ev.stopPropagation(); openEdge(e);});
  e._path = path; e._hit = hit;
  if(e.type==='sig'){
    const mx=(A.x+B.x)/2, my=(A.y+B.y)/2;
    const dx=B.x-A.x, dy=B.y-A.y, len=Math.hypot(dx,dy)||1;
    const lx=mx - dy/len*len*0.1, ly=my + dx/len*len*0.1 - 6;
    e._via = el('text',{x:lx,y:ly,'class':'via-label'},gEdges);
    e._via.textContent = e.via.toLowerCase();
  }
});

/* field nodes — L1 voice: Inter 17 semibold, near-white carrying the domain hue */
D.fields.forEach(f=>{
  const c = domById[f.domain].color;
  const g = el('g',{'class':'field-g enter'},gFields);
  g.style.animationDelay=(window.__fi=(window.__fi||0)+1)*28+'ms';
  f._g = g;
  el('circle',{cx:f.x,cy:f.y,r:10,'class':'field-pulse',stroke:c},g);
  el('circle',{cx:f.x,cy:f.y,r:32,'class':'field-bloom',fill:'url(#bloom-'+f.domain+')'},g);
  el('circle',{cx:f.x,cy:f.y,r:9,'class':'field-orb',fill:'url(#orb-'+f.domain+')'},g);
  const words = f.label.split(' ');
  let lines=[]; let cur='';
  words.forEach(w=>{ if((cur+' '+w).trim().length>16){lines.push(cur.trim());cur=w;} else cur+=' '+w; });
  if(cur.trim()) lines.push(cur.trim());
  lines.forEach((ln,i)=>{
    const t=el('text',{x:f.x,y:f.y+27+i*19,'class':'field-label',fill:tint(c,0.82)},g);
    t.textContent=ln;
  });
  const hit = el('circle',{cx:f.x,cy:f.y,r:30,'class':'field-hit'},g);
  hit.addEventListener('click',ev=>{ev.stopPropagation(); openField(f);});
});

/* ---------- L3: topic satellites (third zoom level) ----------
   L2 voice: Inter 10.5 regular, muted blue-grey. Dots are flat — glow is
   reserved for navigable levels, and topic dots are the most numerous elements
   on the map, so dropping their filter is also the Wave-1 performance fix. */
const gTopics = el('g',{id:'layer-topics'},viewport);
function normTopic(c){ return typeof c==='string' ? {label:c} : c; }
D.fields.forEach(f=>{
  const tps=(f.children||[]).map(normTopic);
  if(!tps.length) return;
  f._topics=tps;
  const c=domById[f.domain].color;
  const n=tps.length, R=52+n*5;
  tps.forEach((tp,i)=>{
    const a=-Math.PI/2 + i*(2*Math.PI/n);
    const cos=Math.cos(a), sin=Math.sin(a);
    tp.x=f.x+R*cos; tp.y=f.y+R*sin; tp.field=f.id;
    const g=el('g',{'class':'topic-g'},gTopics);
    tp._g=g;
    el('line',{x1:f.x,y1:f.y,x2:tp.x,y2:tp.y,'class':'topic-spoke',stroke:c},g);
    el('circle',{cx:tp.x,cy:tp.y,r:tp.def?4.5:3.2,'class':'topic-dot',
      fill:tp.def?c:'#0e1117',stroke:c,'stroke-width':1.2},g);
    const anchor = cos>0.35?'start':(cos<-0.35?'end':'middle');
    const lx=tp.x+cos*10;
    const ly=tp.y+sin*10 + (Math.abs(cos)<=0.35 ? (sin>0?9:-5):3);
    const t=el('text',{x:lx,y:ly,'class':'topic-label','text-anchor':anchor},g);
    t.textContent=tp.label;
    tp._labelEl=t; tp._lx=lx; tp._ly=ly; tp._anchor=anchor; tp._cos=cos; tp._sin=sin;
    const hit=el('circle',{cx:tp.x,cy:tp.y,r:15,'class':'topic-hit'},g);
    hit.addEventListener('click',ev=>{ev.stopPropagation(); openTopic(tp);});
  });
});

/* ---------- topic label collision: one-shot greedy pass ----------
   Label size and label separation both scale linearly with zoom, so overlap is
   zoom-invariant — one pass at build time settles it for every zoom level.
   Shortest labels are placed first (easiest to seat); each tries its home slot,
   then two nudges further out along its spoke, then four tangential slides that
   keep it beside its own dot. Only a label with no free slot is hidden — its dot
   stays tappable and it's still reachable through the field panel's topic chips.
   On this data: 190 seat at home, 20 nudge, 1 hides (Group representations). */
(function collidePass(){
  const CHAR_W=0.56*10.5, H_UP=9.5, H_DN=2.5, PAD=1;
  const entries=[];
  D.fields.forEach(f=>(f._topics||[]).forEach(tp=>entries.push(tp)));
  entries.sort((a,b)=>a.label.length-b.label.length);
  const placed=[];
  const rectAt=(tp,dx,dy)=>{
    const w=tp.label.length*CHAR_W;
    const lx=tp._lx+dx, ly=tp._ly+dy;
    const x0 = tp._anchor==='start' ? lx : (tp._anchor==='end' ? lx-w : lx-w/2);
    return {x0:x0, y0:ly-H_UP, x1:x0+w, y1:ly+H_DN, dx:dx, dy:dy};
  };
  const free=r=>!placed.some(p=>!(r.x1<p.x0+PAD||r.x0>p.x1-PAD||r.y1<p.y0+PAD||r.y0>p.y1-PAD));
  entries.forEach(tp=>{
    const c=tp._cos, s=tp._sin;
    const tries=[
      [0,0],                              // home slot
      [c*13, s*13], [c*26, s*26],         // push further out along the spoke
      [-s*12, c*12], [s*12, -c*12],       // slide tangentially, either way
      [c*13-s*12, s*13+c*12],             // diagonal blends of the two
      [c*13+s*12, s*13-c*12]
    ];
    let seated=null;
    for(let i=0;i<tries.length;i++){
      const r=rectAt(tp,tries[i][0],tries[i][1]);
      if(free(r)){seated=r; break;}
    }
    if(!seated){ tp._labelEl.classList.add('label-hidden'); return; }
    placed.push(seated);
    if(seated.dx||seated.dy){          // rescued by a nudge — move the text to match
      tp._labelEl.setAttribute('x', tp._lx+seated.dx);
      tp._labelEl.setAttribute('y', tp._ly+seated.dy);
    }
  });
})();

/* ============================================================
   CAMERA, RENDER LOOP AND LEVEL-OF-DETAIL
   ------------------------------------------------------------
   Design rule: input handlers never touch the DOM. They move the
   camera and ask for a frame. One rAF callback per frame does all
   the writing. Everything below exists to keep the per-frame cost
   flat no matter how much data is on screen.
   ============================================================ */

const MIN_S = 0.5, MAX_S = 6.0;
let tx = 0, ty = 0, scale = 1;
function ramp(s,a,b){return Math.max(0,Math.min(1,(s-a)/(b-a)));}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

/* ---------- write-through cache -----------------------------
   Setting .style.x to the value it already holds still costs a
   string compare and a style invalidation in most engines. With
   ~350 nodes updated per frame that was most of the old cost, so
   every write goes through here and no-ops when unchanged. */
function sset(node, prop, val){
  const m = node._ss || (node._ss = {});
  if(m[prop] === val) return;
  m[prop] = val;
  node.style[prop] = val;
}
function aset(node, attr, val){
  const m = node._sa || (node._sa = {});
  if(m[attr] === val) return;
  m[attr] = val;
  node.setAttribute(attr, val);
}

/* ---------- geometry of the visible area --------------------
   getBoundingClientRect forces a synchronous layout. Calling it
   on every pointermove — which the old code did, via clientToVB —
   is what made panning stutter. Measured once, reused until the
   window actually changes. */
let rectCache = null, fitCache = null;
function svgRect(){
  if(!rectCache) rectCache = svg.getBoundingClientRect();
  return rectCache;
}
function fitExtents(){
  if(fitCache) return fitCache;
  const r = svgRect();
  const sf = Math.min(r.width/VB_W, r.height/VB_H) || 1;
  const exU = (r.width/sf - VB_W)/2, exV = (r.height/sf - VB_H)/2;
  fitCache = {u0:-exU, u1:VB_W+exU, v0:-exV, v1:VB_H+exV, sf:sf};
  return fitCache;
}
function invalidateRect(){ rectCache = null; fitCache = null; requestRender(); }
window.addEventListener('resize', invalidateRect);
window.addEventListener('orientationchange', invalidateRect);
window.addEventListener('scroll', invalidateRect, true);
if(window.visualViewport) window.visualViewport.addEventListener('resize', invalidateRect);

/* screen pixel → viewBox unit. Pure arithmetic now: no layout. */
function clientToVB(x,y){
  const r = svgRect(), f = fitExtents();
  const ox = (r.width - VB_W*f.sf)/2, oy = (r.height - VB_H*f.sf)/2;
  return { u:(x - r.left - ox)/f.sf, v:(y - r.top - oy)/f.sf };
}

/* ---------- how far you're allowed to wander ----------------
   The old build let you pan the map entirely off screen with no
   way back except the reset button. The centre of the view is
   kept inside the content, so the map is always where you left it. */
const BOUNDS = (function(){
  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;
  D.domains.forEach(d=>{
    x0=Math.min(x0,d.x-d.R); x1=Math.max(x1,d.x+d.R);
    y0=Math.min(y0,d.y-d.R); y1=Math.max(y1,d.y+d.R);
  });
  const pad=150;
  return {x0:x0-pad, y0:y0-pad, x1:x1+pad, y1:y1+pad};
})();
function clampPan(){
  const e = fitExtents();
  const cu = (e.u0+e.u1)/2, cv = (e.v0+e.v1)/2;
  const wx = (cu - tx)/scale, wy = (cv - ty)/scale;
  const nx = clamp(wx, BOUNDS.x0, BOUNDS.x1);
  const ny = clamp(wy, BOUNDS.y0, BOUNDS.y1);
  if(nx !== wx) tx = cu - nx*scale;
  if(ny !== wy) ty = cv - ny*scale;
}

/* zoom about a fixed point, in viewBox coordinates */
function zoomAbout(px, py, factor){
  const ns = clamp(scale*factor, MIN_S, MAX_S);
  const k = ns/scale;
  tx = px - (px - tx)*k;
  ty = py - (py - ty)*k;
  scale = ns;
}

/* ---------- the frame loop ---------------------------------- */
let rafPending = false, anim = null;
let vel = {x:0, y:0}, gliding = false;
const FRICTION = 0.93, GLIDE_STOP = 0.35;

function requestRender(){
  if(rafPending) return;
  rafPending = true;
  requestAnimationFrame(renderFrame);
}
function renderFrame(now){
  rafPending = false;
  let more = false;

  if(anim){
    const k = Math.min(1, (now - anim.t0)/anim.dur);
    const e = k<0.5 ? 4*k*k*k : 1 - Math.pow(-2*k+2,3)/2;   // easeInOutCubic
    tx    = anim.tx0 + (anim.tx1 - anim.tx0)*e;
    ty    = anim.ty0 + (anim.ty1 - anim.ty0)*e;
    scale = anim.s0  + (anim.s1  - anim.s0 )*e;
    if(k >= 1) anim = null; else more = true;
  } else if(gliding){
    tx += vel.x; ty += vel.y;
    vel.x *= FRICTION; vel.y *= FRICTION;
    clampPan();
    if(Math.hypot(vel.x, vel.y) < GLIDE_STOP){ gliding = false; endInteract(); }
    else more = true;
  }

  aset(viewport, 'transform', 'translate('+tx.toFixed(2)+' '+ty.toFixed(2)+') scale('+scale.toFixed(4)+')');
  applyLOD();
  if(more) requestRender();
}

/* animate the camera to a target (used by search, legend, panel jumps) */
function flyTo(x, y, s, dur){
  s = clamp(s, MIN_S, MAX_S);
  const e = fitExtents();
  const cu = (e.u0+e.u1)/2, cv = (e.v0+e.v1)/2;
  anim = {t0:performance.now(), dur:dur||620,
          tx0:tx, ty0:ty, s0:scale,
          tx1:cu - x*s, ty1:cv - y*s, s1:s};
  gliding = false; vel.x = vel.y = 0;
  requestRender();
  hideIntroSoon();
}
/* kept for the call sites that already exist elsewhere in this file */
function zoomTo(x, y, s, animate){
  if(animate) return flyTo(x, y, s);
  const e = fitExtents();
  scale = clamp(s, MIN_S, MAX_S);
  tx = (e.u0+e.u1)/2 - x*scale;
  ty = (e.v0+e.v1)/2 - y*scale;
  anim = null; gliding = false;
  clampPan(); requestRender();
}
function centerVB(){
  const e = fitExtents();
  return {x:((e.u0+e.u1)/2 - tx)/scale, y:((e.v0+e.v1)/2 - ty)/scale};
}

/* ---------- interaction state ------------------------------
   While the camera is moving we pause every looping CSS animation
   and drop the opacity transitions. ~240 elements were animating
   continuously (stars, field pulses, domain rings, bridge dashes);
   pausing them for the duration of a drag is most of the win. */
let interacting = false, calmTimer = 0;
function beginInteract(){
  if(calmTimer){ clearTimeout(calmTimer); calmTimer = 0; }
  if(interacting) return;
  interacting = true;
  svg.classList.add('interacting');
}
function endInteract(){
  if(calmTimer) clearTimeout(calmTimer);
  calmTimer = setTimeout(()=>{
    interacting = false; calmTimer = 0;
    svg.classList.remove('interacting');
    requestRender();
  }, 180);
}

/* ---------- level of detail --------------------------------- */
let enterCleaned=false, enterTimerSet=false, fieldsWereOn=false;
let lastChromeSig = -1;
let cullRef = {s:0, x:1e9, y:1e9};

function applyLOD(){
  const s = scale;
  /* band ramps — every boundary is a fade, nothing pops */
  const fields = ramp(s,1.0,1.35);          // fields fade in
  const fEdges = ramp(s,1.35,1.7);          // field edges past field zoom
  const topics = ramp(s,2.1,2.8);           // topics + bridge labels together
  const chrome = 1-ramp(s,1.0,1.35);        // domain orb/ring/tag hand over

  /* group-level opacity: four writes, all cached */
  sset(gAgg,'opacity', String(1-fields));
  sset(gAgg,'display', fields>=1 ? 'none':'');

  sset(gFields,'opacity', String(fields));
  const fieldsOn = s>0.98;
  sset(gFields,'display', fieldsOn ? '':'none');
  sset(gFields,'pointerEvents', fields>0.5 ? 'auto':'none');
  if(fieldsOn && !fieldsWereOn && !enterCleaned && !enterTimerSet){
    enterTimerSet = true;
    setTimeout(()=>{D.fields.forEach(f=>f._g.classList.remove('enter')); enterCleaned=true;},2400);
  }
  fieldsWereOn = fieldsOn;

  sset(gEdges,'opacity', String(fEdges));
  sset(gEdges,'display', s>1.33 ? '':'none');
  sset(gEdges,'pointerEvents', fEdges>0.5 ? 'auto':'none');

  sset(gTopics,'opacity', String(topics));
  sset(gTopics,'display', s>2.05 ? '':'none');
  sset(gTopics,'pointerEvents', topics>0.5 ? 'auto':'none');

  /* per-domain chrome changes slowly; recompute only when the
     quantised zoom actually moves, not on every frame of a pan */
  const chromeSig = Math.round(s*80);
  if(chromeSig !== lastChromeSig){
    lastChromeSig = chromeSig;
    /* opacity floors raised (wave 2.5): the domain presence bottoms out at
       0.32 instead of 0.12 so the pigment never washes to near-black at
       topic zoom — you should always know whose region you're in */
    let dom;
    if(s<1.0)       dom=1;
    else if(s<1.35) dom=1   -0.30*ramp(s,1.0,1.35);
    else if(s<2.1)  dom=0.70-0.22*ramp(s,1.35,2.1);
    else if(s<2.8)  dom=0.48-0.12*ramp(s,2.1,2.8);
    else            dom=Math.max(0.32, 0.36-0.04*ramp(s,2.8,3.4));
    const dfs = Math.round(Math.max(30, Math.min(44, 27/s+10)));
    const haloFill = s>FIELD_ZOOM ? '12' : '1a';
    const domS = dom.toFixed(3), chromeS = (chrome*0.95).toFixed(3),
          ringS = (chrome*0.7).toFixed(3), nebS = (0.34+0.66*dom).toFixed(3);
    D.domains.forEach(d=>{
      sset(d._label,'opacity', domS);
      aset(d._label,'font-size', dfs);
      sset(d._tag,'opacity', String(chrome));
      sset(d._core,'opacity', chromeS);
      sset(d._bloom,'opacity', chromeS);
      sset(d._ring,'opacity', ringS);
      sset(d._neb,'opacity', nebS);
      aset(d._halo,'fill', d.color + haloFill);
    });
    const viaS = String(topics);
    D.edges.forEach(e=>{ if(e._via) sset(e._via,'opacity', viaS); });
  }

  /* culling: only re-test when the view has actually moved far
     enough to change what's on screen. Margins are generous, so
     nothing pops in at the edge between tests. */
  if(s>1.33){
    const moved = Math.abs(s-cullRef.s) > cullRef.s*0.025
               || Math.abs(tx-cullRef.x) > 55
               || Math.abs(ty-cullRef.y) > 55;
    if(moved){
      cullRef = {s:s, x:tx, y:ty};
      const ext = fitExtents();
      const x0=(ext.u0-tx)/s, x1=(ext.u1-tx)/s, y0=(ext.v0-ty)/s, y1=(ext.v1-ty)/s;
      const M=110;
      D.edges.forEach(e=>{
        const ex0=Math.min(e._A.x,e._B.x)-M, ex1=Math.max(e._A.x,e._B.x)+M;
        const ey0=Math.min(e._A.y,e._B.y)-M, ey1=Math.max(e._A.y,e._B.y)+M;
        const vis=!(ex1<x0||ex0>x1||ey1<y0||ey0>y1);
        if(vis!==e._vis){
          e._vis=vis;
          const dsp=vis?'':'none';
          sset(e._path,'display',dsp); sset(e._hit,'display',dsp);
          if(e._via) sset(e._via,'display',dsp);
        }
      });
      if(s>2.05){
        const T=130;
        D.fields.forEach(f=>(f._topics||[]).forEach(tp=>{
          const vis = tp.x>x0-T && tp.x<x1+T && tp.y>y0-T && tp.y<y1+T;
          if(vis!==tp._vis){ tp._vis=vis; sset(tp._g,'display', vis?'':'none'); }
        }));
      }
    }
  }
}

/* ============================================================
   INPUT
   ============================================================ */

/* ---------- drag to pan, two fingers to pinch --------------- */
const pointers = new Map();
let mode = null, panRef = null, pinchRef = null;
let lastMove = {u:0, v:0, t:0};
let tapStart = null;

svg.addEventListener('pointerdown', e=>{
  svg.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
  /* setPointerCapture retargets the click that follows pointerup to the
     svg itself, so a tap on a node never reaches that node's own click
     listener. Remember where the tap started; endPtr uses this to tell a
     tap from a drag and, for a tap, replays a click at the real point. */
  tapStart = {x:e.clientX, y:e.clientY, id:e.pointerId, t:performance.now()};
  anim = null; gliding = false; vel.x = vel.y = 0;
  beginInteract();
  if(pointers.size === 1){
    mode = 'pan';
    const p = clientToVB(e.clientX, e.clientY);
    panRef = {u0:p.u, v0:p.v, tx0:tx, ty0:ty};
    lastMove = {u:p.u, v:p.v, t:performance.now()};
    svg.classList.add('panning');
  } else if(pointers.size === 2){
    mode = 'pinch';
    const pts = [...pointers.values()];
    const dist = Math.hypot(pts[0].x-pts[1].x, pts[0].y-pts[1].y) || 1;
    const m = clientToVB((pts[0].x+pts[1].x)/2, (pts[0].y+pts[1].y)/2);
    pinchRef = {dist0:dist, s0:scale, ax:(m.u-tx)/scale, ay:(m.v-ty)/scale};
  }
});

window.addEventListener('pointermove', e=>{
  if(!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});

  if(mode === 'pan' && pointers.size === 1){
    const p = clientToVB(e.clientX, e.clientY);
    const ntx = panRef.tx0 + (p.u - panRef.u0);
    const nty = panRef.ty0 + (p.v - panRef.v0);
    const now = performance.now();
    const dt = Math.max(8, now - lastMove.t);
    /* velocity in viewBox units per 16ms frame, smoothed so one
       jittery sample can't launch the map across the screen */
    vel.x = vel.x*0.65 + ((ntx - tx)*16/dt)*0.35;
    vel.y = vel.y*0.65 + ((nty - ty)*16/dt)*0.35;
    lastMove = {u:p.u, v:p.v, t:now};
    tx = ntx; ty = nty;
    clampPan();
    requestRender();
  } else if(mode === 'pinch' && pointers.size === 2){
    const pts = [...pointers.values()];
    const dist = Math.hypot(pts[0].x-pts[1].x, pts[0].y-pts[1].y) || 1;
    const m = clientToVB((pts[0].x+pts[1].x)/2, (pts[0].y+pts[1].y)/2);
    scale = clamp(pinchRef.s0 * (dist/pinchRef.dist0), MIN_S, MAX_S);
    tx = m.u - pinchRef.ax*scale;   // pinch pans and zooms together
    ty = m.v - pinchRef.ay*scale;
    clampPan();
    requestRender();
  }
  hideIntroSoon();
}, {passive:true});

function endPtr(e){
  if(!pointers.delete(e.pointerId)) return;
  svg.classList.remove('panning');
  /* tap vs drag: if this pointer barely moved and didn't linger, the browser's
     own click (retargeted to svg by pointer capture, see pointerdown) never
     reaches the node underneath — so find that node ourselves and click it. */
  if(tapStart && tapStart.id === e.pointerId){
    const dx = e.clientX - tapStart.x, dy = e.clientY - tapStart.y;
    const dt = performance.now() - tapStart.t;
    if(Math.hypot(dx, dy) < 8 && dt < 500){
      const real = document.elementFromPoint(e.clientX, e.clientY);
      if(real && real !== svg){
        real.dispatchEvent(new MouseEvent('click', {bubbles:true, cancelable:true, view:window}));
      }
    }
    tapStart = null;
  }
  if(pointers.size === 1){
    const [only] = [...pointers.values()];
    mode = 'pan';
    const p = clientToVB(only.x, only.y);
    panRef = {u0:p.u, v0:p.v, tx0:tx, ty0:ty};
    lastMove = {u:p.u, v:p.v, t:performance.now()};
    vel.x = vel.y = 0;
  } else if(pointers.size === 0){
    /* let go mid-sweep and the map keeps travelling, then settles */
    const fresh = performance.now() - lastMove.t < 90;
    const speed = Math.hypot(vel.x, vel.y);
    if(mode === 'pan' && fresh && speed > 1.2){
      vel.x = clamp(vel.x, -60, 60);
      vel.y = clamp(vel.y, -60, 60);
      gliding = true;
      requestRender();
    } else {
      endInteract();
    }
    mode = null;
  }
}
window.addEventListener('pointerup', endPtr);
window.addEventListener('pointercancel', endPtr);

/* ---------- wheel and trackpad ------------------------------
   The old handler applied a flat ±12% per event no matter how far
   you actually scrolled, which is what made zoom arrive in steps.
   Zoom is exponential in the scroll distance now, so a slow drag
   creeps and a fast flick travels — and a trackpad pinch, which
   Safari and Chrome deliver as ctrl+wheel, is finally handled. */
svg.addEventListener('wheel', e=>{
  e.preventDefault();
  anim = null; gliding = false;
  beginInteract();

  let dx = e.deltaX, dy = e.deltaY;
  if(e.deltaMode === 1){ dx *= 16; dy *= 16; }              // lines
  else if(e.deltaMode === 2){ dx *= 400; dy *= 400; }        // pages

  if(e.shiftKey && !e.ctrlKey){                              // shift-scroll pans
    tx -= dx || dy;
    clampPan(); requestRender(); endInteract(); hideIntroSoon(); return;
  }
  if(!e.ctrlKey && Math.abs(dx) > Math.abs(dy)*1.6){         // sideways swipe pans
    tx -= dx;
    clampPan(); requestRender(); endInteract(); hideIntroSoon(); return;
  }

  const k = e.ctrlKey ? 0.011 : 0.0022;   // pinch gestures are far more sensitive
  const f = clamp(Math.exp(-dy*k), 0.7, 1.42);
  const p = clientToVB(e.clientX, e.clientY);
  zoomAbout(p.u, p.v, f);
  clampPan();
  requestRender();
  endInteract();
  hideIntroSoon();
}, {passive:false});

/* ---------- buttons, double-click, keyboard ----------------- */
function nudgeZoom(factor){
  const c = centerVB();
  flyTo(c.x, c.y, clamp(scale*factor, MIN_S, MAX_S), 300);
}
document.getElementById('zin').onclick  = ()=>nudgeZoom(1.6);
document.getElementById('zout').onclick = ()=>nudgeZoom(1/1.6);
document.getElementById('zreset').onclick = ()=>flyTo(VB_W/2, VB_H/2-40, 0.62, 700);

svg.addEventListener('dblclick', e=>{
  /* double-tapping empty space zooms in; double-tapping a node is just
     two clicks on that node, and shouldn't also fling the camera */
  const cls = (e.target && e.target.getAttribute && e.target.getAttribute('class')) || '';
  if(/-hit$/.test(cls)) return;
  e.preventDefault();
  const p = clientToVB(e.clientX, e.clientY);
  const w = {x:(p.u-tx)/scale, y:(p.v-ty)/scale};
  flyTo(w.x, w.y, clamp(scale*1.9, MIN_S, MAX_S), 420);
});

window.addEventListener('keydown', e=>{
  if(e.target && /input|textarea/i.test(e.target.tagName)) return;
  const step = 110/scale;
  let handled = true;
  switch(e.key){
    case 'ArrowLeft':  tx += 110; break;
    case 'ArrowRight': tx -= 110; break;
    case 'ArrowUp':    ty += 110; break;
    case 'ArrowDown':  ty -= 110; break;
    case '+': case '=': nudgeZoom(1.35); return;
    case '-': case '_': nudgeZoom(1/1.35); return;
    case '0': flyTo(VB_W/2, VB_H/2-40, 0.62, 700); return;
    case 'Escape': closePanel(); return;
    default: handled = false;
  }
  if(handled){ e.preventDefault(); anim=null; clampPan(); requestRender(); }
});

/* ---------- detail panel ---------- */
const panel=document.getElementById('panel');
const scrim=document.getElementById('scrim');
const P = id=>document.getElementById(id);
function openPanel(){panel.classList.add('open');scrim.classList.add('open');}
function closePanel(){panel.classList.remove('open');scrim.classList.remove('open');clearFocus();}
P('closepanel').onclick=closePanel; scrim.onclick=closePanel;

function chip(label,onclick,stub){
  const c=document.createElement('div');
  c.className='chip'+(stub?' stub':'');
  c.textContent=label;
  if(onclick)c.onclick=onclick;
  return c;
}

function openDomain(d){
  P('p-dot').style.background=d.color;
  P('p-eyebrow-text').textContent='Domain';
  P('p-title').textContent=d.label;
  P('p-def').textContent=d.def;
  P('p-body').innerHTML='';
  const lab=document.createElement('div');lab.className='section-label';
  lab.textContent='Fields ('+fieldsOf[d.id].length+')';
  const row=document.createElement('div');row.className='chips';
  fieldsOf[d.id].forEach(f=>row.appendChild(chip(f.label,()=>{openField(f);zoomTo(f.x,f.y,2.4,true);})));
  P('p-body').appendChild(lab);P('p-body').appendChild(row);
  openPanel();
}

function openField(f){
  focusField(f);
  const d=domById[f.domain];
  P('p-dot').style.background=d.color;
  P('p-eyebrow-text').textContent=d.label;
  P('p-title').textContent=f.label;
  P('p-def').textContent=f.def;
  const body=P('p-body'); body.innerHTML='';

  if(f.theorems&&f.theorems.length){
    const lab=document.createElement('div');lab.className='section-label';lab.textContent='Landmark theorems';
    const ul=document.createElement('ul');ul.className='theorems';
    f.theorems.forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.appendChild(li);});
    body.appendChild(lab);body.appendChild(ul);
  }
  if(f.book){
    const lab=document.createElement('div');lab.className='section-label';lab.textContent='Canonical text';
    const bk=document.createElement('div');bk.className='book';bk.textContent=f.book;
    body.appendChild(lab);body.appendChild(bk);
  }
  if(f.schuller){
    const lab=document.createElement('div');lab.className='section-label';
    lab.textContent='Companion lectures — Schuller, Geometric Anatomy of Theoretical Physics';
    const sv=document.createElement('div');sv.className='schuller';sv.textContent='🎥 '+f.schuller;
    body.appendChild(lab);body.appendChild(sv);
  }
  if(f.atom){
    const a=document.createElement('a');a.className='atom-btn';
    a.href=f.atom.href;a.target='_blank';a.rel='noopener';
    a.textContent='🧪 '+f.atom.label;
    body.appendChild(a);
  }
  const conns=edgesOf[f.id];
  if(conns.length){
    const lab=document.createElement('div');lab.className='section-label';
    lab.textContent='Connections — tap one to read the bridge';
    const row=document.createElement('div');row.className='chips';
    conns.forEach(e=>{
      const other = e.from===f.id? fieldById[e.to] : fieldById[e.from];
      const pre = e.type==='sig'?'★ ':'';
      row.appendChild(chip(pre+other.label,()=>openEdge(e)));
    });
    body.appendChild(lab);body.appendChild(row);
  }
  if(f._topics&&f._topics.length){
    const anyLive=f._topics.some(t=>t.def);
    const lab=document.createElement('div');lab.className='section-label';
    lab.textContent=anyLive
      ? 'Inside this field — tap a topic (they orbit this node at max zoom)'
      : 'Inside this field (stubs — content arriving in Part 3 waves)';
    const row=document.createElement('div');row.className='chips';
    f._topics.forEach(tp=>row.appendChild(
      chip(tp.label, tp.def?()=>openTopic(tp):null, !tp.def)));
    body.appendChild(lab);body.appendChild(row);
  }
  openPanel();
}

function openTopic(tp){
  const f=fieldById[tp.field], d=domById[f.domain];
  focusField(f);
  P('p-dot').style.background=d.color;
  P('p-eyebrow-text').textContent=f.label+' · topic';
  P('p-title').textContent=tp.label;
  P('p-def').textContent=tp.def
    || 'Topic stub — the full entry arrives as Part 3 content fills in, domain by domain. Add it yourself in data/data.js by turning this string into {label, def}.';
  const body=P('p-body'); body.innerHTML='';
  /* Wave 3: def is the short map-side lede; detail carries the long-form
     entry (2–3 paragraphs, \n\n-separated) and renders as reading text */
  if(tp.detail){
    const lab0=document.createElement('div');lab0.className='section-label';lab0.textContent='In depth';
    body.appendChild(lab0);
    tp.detail.split(/\n\n+/).forEach(par=>{
      const p=document.createElement('p');p.className='detail-p';p.textContent=par;
      body.appendChild(p);
    });
  }
  const lab=document.createElement('div');lab.className='section-label';lab.textContent='Nearby';
  const row=document.createElement('div');row.className='chips';
  row.appendChild(chip('↩ '+f.label,()=>openField(f)));
  (f._topics||[]).filter(x=>x!==tp&&x.def).slice(0,6)
    .forEach(x=>row.appendChild(chip(x.label,()=>openTopic(x))));
  body.appendChild(lab);body.appendChild(row);
  openPanel();
}

function openEdge(e){
  const A=fieldById[e.from],B=fieldById[e.to];
  focusEdge(e);
  P('p-dot').style.background='#d9a441';
  P('p-eyebrow-text').textContent=(e.type==='sig'?'Signature bridge':'Natural flow');
  P('p-title').innerHTML='';
  const t=P('p-title');
  t.appendChild(document.createTextNode(A.label+' '));
  const ar=document.createElement('span');ar.className='arrow';ar.textContent='⟷';t.appendChild(ar);
  t.appendChild(document.createTextNode(' '+B.label));
  P('p-def').textContent='';
  const body=P('p-body');body.innerHTML='';

  // who built the bridge
  if(e.who){
    const who=document.createElement('div');who.className='who-box';
    who.innerHTML='<span class="who-eyebrow">Bridged by</span><span class="who-name">'+e.who+'</span>';
    body.appendChild(who);
  }
  // mediating concept
  const box=document.createElement('div');box.className='via-box';
  box.innerHTML='<b>Mediating concept — '+e.via+'</b>'+(e.note||'');
  body.appendChild(box);
  // the theory of the bridge
  if(e.story){
    const lab=document.createElement('div');lab.className='section-label';
    lab.textContent='The theory of the bridge';
    const st=document.createElement('div');st.className='story-box';st.textContent=e.story;
    body.appendChild(lab);body.appendChild(st);
  }
  const row=document.createElement('div');row.className='chips';
  row.appendChild(chip('Open '+A.label,()=>openField(A)));
  row.appendChild(chip('Open '+B.label,()=>openField(B)));
  body.appendChild(row);
  // let people surf bridge → bridge
  const near=D.edges.filter(x=>x!==e&&(x.from===e.from||x.to===e.to||x.from===e.to||x.to===e.from)).slice(0,6);
  if(near.length){
    const lab=document.createElement('div');lab.className='section-label';lab.textContent='Adjacent bridges';
    const r2=document.createElement('div');r2.className='chips';
    near.forEach(x=>{
      const a=fieldById[x.from].label, b=fieldById[x.to].label;
      r2.appendChild(chip((x.type==='sig'?'★ ':'')+a+' ⟷ '+b,()=>openEdge(x)));
    });
    body.appendChild(lab);body.appendChild(r2);
  }
  openPanel();
}

/* ---------- browsable index of every bridge ---------- */
function openBridgeIndex(){
  clearFocus();
  P('p-dot').style.background='#d9a441';
  P('p-eyebrow-text').textContent='Index';
  P('p-title').textContent='All bridges';
  P('p-def').textContent='Every connection on the map, and the person who built it. Signature bridges (★) are the deep cross-domain links; tap any to read its story.';
  const body=P('p-body');body.innerHTML='';
  const sigs=D.edges.filter(e=>e.type==='sig');
  const pres=D.edges.filter(e=>e.type!=='sig');
  const section=(title,list)=>{
    const lab=document.createElement('div');lab.className='section-label';lab.textContent=title;
    body.appendChild(lab);
    list.forEach(e=>{
      const a=fieldById[e.from], b=fieldById[e.to];
      const card=document.createElement('div');card.className='bridge-row';
      card.innerHTML='<div class="bridge-row-t">'+(e.type==='sig'?'★ ':'')+a.label+' <span class="arrow">⟷</span> '+b.label+'</div>'+
                     '<div class="bridge-row-w">'+(e.who||'')+' · <i>'+e.via+'</i></div>';
      card.onclick=()=>openEdge(e);
      body.appendChild(card);
    });
  };
  section('Signature bridges ('+sigs.length+')',sigs);
  section('Natural flows ('+pres.length+')',pres);
  openPanel();
}
window._openBridgeIndex = openBridgeIndex;

/* ---------- focus / dim ---------- */
function clearFocus(){
  D.fields.forEach(f=>f._g.classList.remove('dimmed'));
  D.edges.forEach(e=>{e._path.classList.remove('dimmed'); if(e._via)e._via.classList.remove('dimmed');});
}
function focusField(f){
  const keep=new Set([f.id]);
  edgesOf[f.id].forEach(e=>{keep.add(e.from);keep.add(e.to);});
  D.fields.forEach(x=>x._g.classList.toggle('dimmed',!keep.has(x.id)));
  D.edges.forEach(e=>{
    const on = e.from===f.id||e.to===f.id;
    e._path.classList.toggle('dimmed',!on);
    if(e._via)e._via.classList.toggle('dimmed',!on);
  });
}
function focusEdge(e){
  D.fields.forEach(x=>x._g.classList.toggle('dimmed', x.id!==e.from && x.id!==e.to));
  D.edges.forEach(x=>{
    x._path.classList.toggle('dimmed', x!==e);
    if(x._via)x._via.classList.toggle('dimmed', x!==e);
  });
}

/* ---------- search ---------- */
const searchBox=document.getElementById('search');
searchBox.addEventListener('input',()=>{
  const q=searchBox.value.trim().toLowerCase();
  if(!q){clearFocus();return;}
  if(scale<FIELD_ZOOM){ zoomTo(centerVB().x,centerVB().y,1.6,true); }
  D.fields.forEach(f=>{
    const kids=(f.children||[]).map(c=>typeof c==='string'?c:(c.label+' '+(c.def||'')+' '+(c.detail||''))).join(' ');
    const hay=(f.label+' '+f.def+' '+(f.theorems||[]).join(' ')+' '+kids).toLowerCase();
    f._g.classList.toggle('dimmed', !hay.includes(q));
  });
  D.edges.forEach(e=>{
    const hay=(e.via+' '+e.note).toLowerCase();
    const hit=hay.includes(q);
    e._path.classList.toggle('dimmed',!hit);
    if(e._via)e._via.classList.toggle('dimmed',!hit);
  });
});
searchBox.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    const q=searchBox.value.trim().toLowerCase(); if(!q)return;
    const hit=D.fields.find(f=>(f.label+' '+f.def).toLowerCase().includes(q));
    if(hit){zoomTo(hit.x,hit.y,2.4,true);openField(hit);}
  }
});

/* ---------- legend ---------- */
const legend=document.getElementById('legend');
D.domains.forEach(d=>{
  const s=document.createElement('span');s.className='lgitem';
  s.innerHTML='<span class="dot" style="background:'+d.color+'"></span>'+d.label;
  s.onclick=()=>zoomTo(d.x,d.y,1.9,true);
  legend.appendChild(s);
});
const sig=document.createElement('span');sig.className='lgitem';
sig.innerHTML='<span class="dot" style="background:#d9a441"></span>★ signature bridge';
sig.onclick=()=>openBridgeIndex();
legend.appendChild(sig);

const bb=document.getElementById('bridgesBtn');
if(bb) bb.onclick=()=>openBridgeIndex();

/* ---------- collapsible header (Wave 2) ---------- */
(function(){
  const btn=document.getElementById('hdrToggle');
  if(!btn) return;
  const KEY='wom.hdr';
  const apply=v=>{
    const min = v==='min';
    document.body.classList.toggle('hdr-min', min);
    btn.setAttribute('aria-label', min?'Expand header':'Collapse header');
    btn.title = min?'Expand header':'Collapse header';
  };
  let saved=null; try{saved=localStorage.getItem(KEY);}catch(e){}
  apply(saved);
  btn.addEventListener('click',()=>{
    const v=document.body.classList.contains('hdr-min')?'full':'min';
    apply(v); try{localStorage.setItem(KEY,v);}catch(e){}
  });
})();

/* ---------- intro hint ---------- */
let introHidden=false;
function hideIntroSoon(){
  if(introHidden)return; introHidden=true;
  document.getElementById('intro').classList.add('gone');
}
setTimeout(hideIntroSoon,7000);

/* ---------- start ---------- */
zoomTo(VB_W/2,VB_H/2-40,0.62,false);
})();
