/* ============================================================
   THE WEB OF MATHEMATICS — atoms.js (playable atoms)
   One overlay, many toys. Each atom registers itself with

     registerAtom({
       id, name,                 // tab id and label
       fields: ["fieldId", …],   // fields whose panels get a "⚛ play" button
       html,                     // the pane's markup
       build(pane),              // called once, the first time it opens
       start(pane),              // called every time it is shown
       stop(),                   // called when hidden (cancel animation frames)
       wide                      // true for a wider box
     });

   Atoms are defined in atoms-*.js files, loaded after this one.
   Hooks used by app.js: ATOM_FOR, ATOM_NAMES, openAtomFromField.
   ============================================================ */

const ATOM_FOR = {};      // fieldId → [atomId, …]
const ATOM_NAMES = {};    // atomId → label
const INIT = {};          // atomId → () => void
const ATOM_LIST = [];

const atomsEl = document.getElementById("atoms");
const atomsBox = document.getElementById("atoms-box");
const atomTabs = atomsBox.querySelector(".atom-tabs");
const atomsFooter = document.getElementById("atoms-box-footer");
const ATOM_STOPS = {};
const ATOM_WIDE = new Set();
let ATOM_CUR = null;

// the tab bar groups atoms by domain: a row of domain chips, then that domain's atoms
const atomDoms = document.createElement("div");
atomDoms.className = "atom-doms";
atomsBox.insertBefore(atomDoms, atomTabs);
let ATOM_DOM = null;
function paintDoms() {
  const doms = DOMAINS.filter(d => ATOM_LIST.some(a => a.domain === d.id));
  atomDoms.innerHTML = doms.map(d => `<button class="atom-dom${d.id === ATOM_DOM ? " on" : ""}" data-dom="${d.id}" style="--h:${d.hue}"><i></i>${d.name.split(" ")[0]} <b>${ATOM_LIST.filter(a => a.domain === d.id).length}</b></button>`).join("");
  atomDoms.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    const first = ATOM_LIST.find(a => a.domain === b.dataset.dom); if (first) showAtom(first.id);
  }));
  atomTabs.querySelectorAll(".atom-tab").forEach(t => t.hidden = ATOM_DOM && t.dataset.dom !== ATOM_DOM);
}
function registerAtom(a) {
  a.domain = a.domain || "geometry";
  const tab = document.createElement("button");
  tab.className = "atom-tab"; tab.dataset.atom = a.id; tab.dataset.dom = a.domain; tab.textContent = a.name;
  tab.addEventListener("click", () => showAtom(a.id));
  atomTabs.appendChild(tab);
  const pane = document.createElement("section");
  pane.className = "atom-pane " + (a.cls || ""); pane.id = "atom-" + a.id; pane.hidden = true;
  pane.innerHTML = a.html;
  atomsBox.insertBefore(pane, atomsFooter);
  ATOM_NAMES[a.id] = a.name;
  let built = false;
  INIT[a.id] = () => { if (!built) { built = true; if (a.build) a.build(pane); } if (a.start) a.start(pane); };
  ATOM_STOPS[a.id] = a.stop || (() => {});
  if (a.wide) ATOM_WIDE.add(a.id);
  for (const f of a.fields || []) (ATOM_FOR[f] = ATOM_FOR[f] || []).push(a.id);
  ATOM_LIST.push(a);
}

function openAtom(id) { atomsEl.hidden = false; showAtom(id || (ATOM_LIST[0] && ATOM_LIST[0].id)); }
function closeAtoms() { atomsEl.hidden = true; stopAll(); ATOM_CUR = null; }
function showAtom(id) {
  if (!INIT[id]) return;
  const at = ATOM_LIST.find(a => a.id === id);
  ATOM_DOM = at ? at.domain : null; paintDoms();
  document.querySelectorAll(".atom-tab").forEach(b => b.classList.toggle("on", b.dataset.atom === id));
  document.querySelectorAll(".atom-pane").forEach(p => p.hidden = p.id !== "atom-" + id);
  atomsBox.classList.toggle("wide", ATOM_WIDE.has(id));
  stopAll();
  ATOM_CUR = id;
  INIT[id]();
  const on = atomTabs.querySelector(".atom-tab.on");
  if (on && on.scrollIntoView) on.scrollIntoView({ block: "nearest", inline: "nearest" });
}
function stopAll() { for (const k in ATOM_STOPS) { try { ATOM_STOPS[k](); } catch (e) {} } }
window.openAtomFromField = openAtom;
window.registerAtom = registerAtom;

document.getElementById("toggle-atoms").addEventListener("click", () => openAtom(ATOM_CUR));
document.getElementById("atoms-close").addEventListener("click", closeAtoms);
document.getElementById("atoms-close-text").addEventListener("click", closeAtoms);
atomsEl.addEventListener("click", e => { if (e.target === atomsEl) closeAtoms(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !atomsEl.hidden) closeAtoms(); });

/* ---------- shared helpers for the atom files ---------- */
const AtomKit = {
  // a crisp canvas sized to its CSS width; returns { ctx, w, h }
  canvas(el, h) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = el.clientWidth || 520;
    el.width = Math.round(w * dpr); el.height = Math.round(h * dpr); el.style.height = h + "px";
    const ctx = el.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  },
  rng(seed) { let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
  esc: s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])),
  C: { gold:"#f5c451", teal:"#3fd0c9", red:"#ff7847", green:"#57e08a", violet:"#b48cff", ink:"#e8e4f4", dim:"#9a93b8", blue:"#7aa8ff", pink:"#ff7ac8", bg:"#120b22" },
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches
};
window.AtomKit = AtomKit;

/* ---------- the four hand-built atom pages, embedded ---------- */
// Each is a standalone page in atoms/ (they also work on their own).
[
  { id:"hyperbolic", name:"Poincaré disk", domain:"geometry", fields:["classical-geometry"], src:"atoms/hyperbolic-disk.html",
    title:"The Poincaré disk — a whole infinite plane, seen at once",
    hint:"Geodesics are arcs meeting the rim at right angles. Drag the points: a triangle's angles add up to less than π, and through a point off a line pass infinitely many parallels." },
  { id:"ladder", name:"Structure ladder", fields:["point-set-topology","differential-topology"], src:"atoms/structure-ladder.html",
    title:"The structure ladder — a bare set gains topology, smoothness, metric, angles, volume",
    hint:"Tap a rung to add one layer of structure at a time, and watch which questions become meaningful." },
  { id:"surfaces", name:"Torus · Möbius · Klein", fields:["low-dim-topology"], src:"atoms/surfaces.html",
    title:"Torus, Möbius band and Klein bottle — orientability in motion",
    hint:"Rotating surfaces with their orientability facts: carry a little clock around the Möbius band and it comes back mirrored." },
  { id:"transport", name:"Parallel transport", fields:["differential-geometry","fiber-bundles"], src:"atoms/parallel-transport.html",
    title:"Parallel transport — carry a vector around a loop; the rotation is the curvature",
    hint:"On the plane the vector comes home unchanged. On the sphere it returns rotated by exactly the curvature it enclosed." },
  { id:"dglab", name:"Differential Geometry Lab", fields:["differential-geometry","differential-topology"], src:"atoms/dg-lab.html", wide:true, tall:true,
    title:"The Differential Geometry Lab — a thirteen-module course on live surfaces",
    hint:"From charts and tangent spaces through the metric, curvature, connections and geodesics to Gauss–Bonnet and the Klein bottle. Pick a module on the left; every surface shows its Gaussian-curvature heat map, a probe with E, F, G, K and H, and a numerically integrated geodesic. Ported from the Differential Geometry Lab v2." }
].forEach(a => registerAtom({
  id: a.id, name: a.name, domain: "geometry", fields: a.fields, cls: "atom-framed" + (a.tall ? " atom-tall" : ""), wide: a.wide,
  html: `<h3>${a.title}</h3><p class="ahint">${a.hint}</p>
    <div class="atom-frame-wrap"><iframe class="atom-frame" title="${a.title}" data-src="${a.src}" loading="lazy"></iframe></div>
    <p class="astatus"><a class="atom-pop" href="${a.src}" target="_blank" rel="noopener">open full screen ↗</a></p>`,
  build(pane) { const f = pane.querySelector("iframe"); f.src = f.dataset.src; }
}));

(function atomCSS() {
  const st = document.createElement("style");
  st.textContent = `
#atoms-box { transition: width .25s ease; }
#atoms-box.wide { width: min(1060px, 96vw); }
.atom-doms { display: flex; flex-wrap: wrap; gap: .35rem; margin: 0 3.2rem .55rem 0; }
.atom-dom { font-family: "IBM Plex Mono", monospace; font-size: .64rem; color: var(--dim); background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.12); border-radius: 999px; padding: .28rem .65rem; cursor: pointer; display: inline-flex; gap: .35rem; align-items: center; }
.atom-dom i { width: 7px; height: 7px; border-radius: 50%; background: hsl(var(--h) 80% 62%); }
.atom-dom b { font-weight: 500; color: #6e6789; }
.atom-dom.on { color: var(--ink); border-color: hsl(var(--h) 75% 62%); background: hsl(var(--h) 60% 50% / .14); }
.atom-tabs { margin-right: 0 !important; }
.atom-tab[hidden] { display: none; }
.atom-pane [hidden], #atoms [hidden] { display: none !important; }
.atom-frame-wrap { position: relative; width: 100%; height: min(62vh, 560px); border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px; overflow: hidden; background: #0e0618; }
.atom-frame { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.atom-tall .atom-frame-wrap { height: min(78vh, 720px); }
.atom-pop { font-family: "IBM Plex Mono", monospace; font-size: .72rem; color: var(--gold); }
.atom-pane canvas.acv { display: block; width: 100%; border: 1px solid rgba(255,255,255,.12); border-radius: 10px;
  background: rgba(0,0,0,.25); touch-action: none; }
.atom-pane .arow2 { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 1rem; align-items: start; }
.atom-pane .aout { font: .72rem/1.6 "IBM Plex Mono", monospace; color: #cfc9e4; background: rgba(0,0,0,.28);
  border: 1px solid rgba(255,255,255,.09); border-radius: 8px; padding: .5rem .65rem; margin: .5rem 0; white-space: pre-wrap; }
.atom-pane .aout .g { color: var(--gold); font-weight: 600; } .atom-pane .aout .t { color: #7fe3d6; font-weight: 600; }
.atom-pane .aout .r { color: #ff8f7a; font-weight: 600; } .atom-pane .aout .d { color: #8d86a8; }
.atom-pane .awhy { font-size: .8rem; line-height: 1.55; color: #bdb6d6; border-left: 2px solid var(--gold); padding: .2rem 0 .2rem .7rem; margin: .8rem 0 0; }
.atom-pane .achips { display: flex; gap: .35rem; flex-wrap: wrap; margin: .4rem 0; }
.atom-pane .achip { font: 500 .68rem "IBM Plex Mono", monospace; color: var(--dim); background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.16); border-radius: 999px; padding: .32rem .7rem; cursor: pointer; }
.atom-pane .achip.on { color: #fff; border-color: var(--gold); background: rgba(245,196,81,.14); }
.atom-pane .achip:hover { border-color: var(--gold); }
.atom-pane input[type=range] { accent-color: var(--gold); }
.atom-pane select { font: .7rem "IBM Plex Mono", monospace; color: var(--ink); background: #140c24; border: 1px solid rgba(255,255,255,.18); border-radius: 7px; padding: .3rem .4rem; }
@media (max-width: 760px) { .atom-pane .arow2 { grid-template-columns: 1fr; } }
`;
  document.head.appendChild(st);
})();
