/* THE WEB OF MATHEMATICS — renderer
   Semantic zoom: level 0 shows 8 domains; zooming in resolves each into its fields.
   Data lives entirely in data/data.js — this file never needs editing to grow the map. */

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

/* ---------- defs: glows & gradients (Part 4 visual overhaul) ---------- */
const defs = el('defs',{},svg);
(function buildDefs(){
  // node glow
  const glow = el('filter',{id:'glow',x:'-80%',y:'-80%',width:'260%',height:'260%'},defs);
  el('feGaussianBlur',{'in':'SourceGraphic',stdDeviation:'5',result:'b'},glow);
  const gm = el('feMerge',{},glow);
  el('feMergeNode',{'in':'b'},gm); el('feMergeNode',{'in':'SourceGraphic'},gm);
  // soft wide glow for bridges
  const glowE = el('filter',{id:'glowE',x:'-40%',y:'-40%',width:'180%',height:'180%'},defs);
  el('feGaussianBlur',{'in':'SourceGraphic',stdDeviation:'2.6',result:'b'},glowE);
  const gm2 = el('feMerge',{},glowE);
  el('feMergeNode',{'in':'b'},gm2); el('feMergeNode',{'in':'SourceGraphic'},gm2);
  // per-domain orb + nebula gradients
  D.domains.forEach(d=>{
    const og = el('radialGradient',{id:'orb-'+d.id},defs);
    el('stop',{offset:'0%','stop-color':'#ffffff','stop-opacity':'0.95'},og);
    el('stop',{offset:'30%','stop-color':d.color,'stop-opacity':'1'},og);
    el('stop',{offset:'100%','stop-color':d.color,'stop-opacity':'0.15'},og);
    const ng = el('radialGradient',{id:'nebula-'+d.id},defs);
    el('stop',{offset:'0%','stop-color':d.color,'stop-opacity':'0.20'},ng);
    el('stop',{offset:'55%','stop-color':d.color,'stop-opacity':'0.08'},ng);
    el('stop',{offset:'100%','stop-color':d.color,'stop-opacity':'0'},ng);
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
const gAgg    = el('g',{id:'layer-agg'},viewport);     // domain-level aggregate edges
const gDomain = el('g',{id:'layer-domains'},viewport);
const gEdges  = el('g',{id:'layer-edges'},viewport);   // field-level edges
const gFields = el('g',{id:'layer-fields'},viewport);

/* aggregate edges between domains (deduped) */
const aggSeen = new Set();
D.edges.forEach(e=>{
  const da = fieldById[e.from].domain, db = fieldById[e.to].domain;
  if(da===db) return;
  const key=[da,db].sort().join('|');
  if(aggSeen.has(key)) return; aggSeen.add(key);
  el('path',{d:edgePath(domById[da],domById[db],0.08),'class':'agg-edge'},gAgg);
});

/* domain nodes */
D.domains.forEach(d=>{
  const g = el('g',{'class':'domain-g'},gDomain);
  d._neb = el('circle',{cx:d.x,cy:d.y,r:d.R+40,'class':'domain-nebula',
    fill:'url(#nebula-'+d.id+')'},g);
  d._ring = el('circle',{cx:d.x,cy:d.y,r:d.R,'class':'domain-ring',stroke:d.color},g);
  d._halo = el('circle',{cx:d.x,cy:d.y,r:d.R,'class':'domain-halo',
    fill:d.color+'14', stroke:d.color+'55','stroke-width':1.5},g);
  d._core = el('circle',{cx:d.x,cy:d.y,r:18,'class':'domain-core',
    fill:'url(#orb-'+d.id+')',filter:'url(#glow)',opacity:0.95},g);
  d._label = el('text',{x:d.x,y:d.y+d.R+34,'class':'domain-label','font-size':30},g);
  d._label.textContent = d.label;
  d._tag = el('text',{x:d.x,y:d.y+d.R+58,'class':'domain-tag','font-size':13},g);
  d._tag.textContent = d.tag;
  const hit = el('circle',{cx:d.x,cy:d.y,r:Math.max(70,d.R*0.55),'class':'domain-hit'},g);
  hit.addEventListener('click',()=>{ if(scale<FIELD_ZOOM) zoomTo(d.x,d.y,1.9); else openDomain(d); });
});

/* field-level edges (drawn beneath fields) */
D.edges.forEach(e=>{
  const A=fieldById[e.from], B=fieldById[e.to];
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
    e._via.textContent = e.via;
  }
});

/* field nodes */
D.fields.forEach(f=>{
  const c = domById[f.domain].color;
  const g = el('g',{'class':'field-g enter'},gFields);
  g.style.animationDelay=(window.__fi=(window.__fi||0)+1)*28+'ms';
  f._g = g;
  el('circle',{cx:f.x,cy:f.y,r:11,'class':'field-pulse',stroke:c},g);
  el('circle',{cx:f.x,cy:f.y,r:10,'class':'field-orb',fill:'url(#orb-'+f.domain+')',filter:'url(#glow)'},g);
  const words = f.label.split(' ');
  let lines=[]; let cur='';
  words.forEach(w=>{ if((cur+' '+w).trim().length>16){lines.push(cur.trim());cur=w;} else cur+=' '+w; });
  if(cur.trim()) lines.push(cur.trim());
  lines.forEach((ln,i)=>{
    const t=el('text',{x:f.x,y:f.y+26+i*13,'class':'field-label'},g);
    t.textContent=ln;
  });
  const hit = el('circle',{cx:f.x,cy:f.y,r:30,'class':'field-hit'},g);
  hit.addEventListener('click',ev=>{ev.stopPropagation(); openField(f);});
});

/* ---------- L3: topic satellites (third zoom level) ---------- */
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
    el('circle',{cx:tp.x,cy:tp.y,r:tp.def?4.4:3.2,'class':'topic-dot',
      fill:tp.def?c:'#0e1117',stroke:c,'stroke-width':1.2},g);
    const anchor = cos>0.35?'start':(cos<-0.35?'end':'middle');
    const lx=tp.x+cos*10;
    const ly=tp.y+sin*10 + (Math.abs(cos)<=0.35 ? (sin>0?9:-5):3);
    const t=el('text',{x:lx,y:ly,'class':'topic-label','text-anchor':anchor},g);
    t.textContent=tp.label;
    const hit=el('circle',{cx:tp.x,cy:tp.y,r:15,'class':'topic-hit'},g);
    hit.addEventListener('click',ev=>{ev.stopPropagation(); openTopic(tp);});
  });
});

/* ---------- semantic zoom ---------- */
let tx=0, ty=0, scale=1;
function applyTransform(){
  viewport.setAttribute('transform',`translate(${tx} ${ty}) scale(${scale})`);
  const t = Math.min(1, Math.max(0, (scale-1.0)/(FIELD_ZOOM-1.0)));   // 0=domain view, 1=field view
  gFields.style.opacity = t;
  gEdges.style.opacity  = t;
  gFields.style.pointerEvents = t>0.5 ? 'auto':'none';
  gEdges.style.pointerEvents  = t>0.5 ? 'auto':'none';
  gAgg.style.opacity = (1-t)*0.9;
  D.domains.forEach(d=>{
    d._label.style.opacity = 1 - t*0.25;
    d._tag.style.opacity = (1-t);
    d._core.style.opacity = (1-t)*0.95;
    d._halo.setAttribute('fill', d.color + (t>0.5?'0a':'14'));
    d._neb.style.opacity = 1-t*0.55;
    d._ring.style.opacity = (1-t)*0.7;
  });
  // via labels only readable when zoomed well in
  const showVia = scale>1.8 ? 1 : 0;
  D.edges.forEach(e=>{ if(e._via) e._via.style.opacity = showVia; });
  // topics: third zoom level, fading in from scale 2.1 → 3.0
  const t2 = Math.min(1, Math.max(0,(scale-2.1)/0.9));
  gTopics.style.opacity = t2;
  gTopics.style.pointerEvents = t2>0.5 ? 'auto':'none';
}

/* ---------- pan / zoom (pointer + wheel + pinch) ---------- */
const pointers=new Map(); let mode=null;
let panRef={}, pinchRef={};
function clientToVB(x,y){
  const r=svg.getBoundingClientRect();
  // preserveAspectRatio="xMidYMid meet": uniform fit scale + centering offsets
  const scaleFit = Math.min(r.width/VB_W, r.height/VB_H);
  const ox = (r.width - VB_W*scaleFit)/2, oy=(r.height-VB_H*scaleFit)/2;
  return { u:(x-r.left-ox)/scaleFit, v:(y-r.top-oy)/scaleFit };
}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

svg.addEventListener('pointerdown',e=>{
  svg.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===1){
    mode='pan';
    const p=clientToVB(e.clientX,e.clientY);
    panRef={u0:p.u,v0:p.v,tx0:tx,ty0:ty};
    svg.classList.add('panning');
  }else if(pointers.size===2){
    mode='pinch';
    const pts=[...pointers.values()];
    const dist=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y)||1;
    const m=clientToVB((pts[0].x+pts[1].x)/2,(pts[0].y+pts[1].y)/2);
    pinchRef={dist0:dist,scale0:scale,ax:(m.u-tx)/scale,ay:(m.v-ty)/scale};
  }
});
window.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId))return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(mode==='pan'&&pointers.size===1){
    const p=clientToVB(e.clientX,e.clientY);
    tx=panRef.tx0+(p.u-panRef.u0); ty=panRef.ty0+(p.v-panRef.v0);
    applyTransform();
  }else if(mode==='pinch'&&pointers.size===2){
    const pts=[...pointers.values()];
    const dist=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y)||1;
    const m=clientToVB((pts[0].x+pts[1].x)/2,(pts[0].y+pts[1].y)/2);
    scale=clamp(pinchRef.scale0*(dist/pinchRef.dist0),0.55,4.5);
    tx=m.u-pinchRef.ax*scale; ty=m.v-pinchRef.ay*scale;
    applyTransform();
  }
});
function endPtr(e){
  pointers.delete(e.pointerId);
  svg.classList.remove('panning');
  if(pointers.size===1){
    const[only]=[...pointers.values()];
    mode='pan';
    const p=clientToVB(only.x,only.y);
    panRef={u0:p.u,v0:p.v,tx0:tx,ty0:ty};
  } else if(pointers.size===0) mode=null;
}
window.addEventListener('pointerup',endPtr);
window.addEventListener('pointercancel',endPtr);
svg.addEventListener('wheel',e=>{
  e.preventDefault();
  const f=e.deltaY<0?1.12:0.89;
  const m=clientToVB(e.clientX,e.clientY);
  const ax=(m.u-tx)/scale, ay=(m.v-ty)/scale;
  scale=clamp(scale*f,0.55,4.5);
  tx=m.u-ax*scale; ty=m.v-ay*scale;
  applyTransform();
  hideIntroSoon();
},{passive:false});

function zoomTo(x,y,s,animate){
  const target={tx:VB_W/2-x*s, ty:VB_H/2-y*s, s:s};
  if(!animate){ tx=target.tx;ty=target.ty;scale=target.s;applyTransform();return; }
  const from={tx,ty,s:scale}; const t0=performance.now(), dur=520;
  function step(t){
    const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
    tx=from.tx+(target.tx-from.tx)*e; ty=from.ty+(target.ty-from.ty)*e;
    scale=from.s+(target.s-from.s)*e; applyTransform();
    if(k<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  hideIntroSoon();
}
document.getElementById('zin').onclick =()=>{const c=centerVB();zoomAt(c.x,c.y,1.25);};
document.getElementById('zout').onclick=()=>{const c=centerVB();zoomAt(c.x,c.y,0.8);};
document.getElementById('zreset').onclick=()=>zoomTo(VB_W/2,VB_H/2,0.62,true);
function centerVB(){return {x:(VB_W/2-tx)/scale, y:(VB_H/2-ty)/scale};}
function zoomAt(x,y,f){
  scale=clamp(scale*f,0.55,4.5);
  tx=VB_W/2-x*scale; ty=VB_H/2-y*scale; applyTransform();
}

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
    const kids=(f.children||[]).map(c=>typeof c==='string'?c:(c.label+' '+(c.def||''))).join(' ');
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
