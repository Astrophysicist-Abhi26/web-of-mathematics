/* ============================================================
   THE WEB OF MATHEMATICS — search.js
   "⌕ search the map": one box that finds domains, fields, topics
   (including their long-form text), landmark theorems, bridges,
   disputes, number shells and pioneers. With an empty query it
   lists every bridge, so you can surf bridge → bridge.
   Keyboard: "/" opens it, ↑ ↓ move, Enter opens, Esc closes.
   ============================================================ */
(function () {
"use strict";

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const MARK = { found:"🏛", fire:"🔥", work:"⚙️", obs:"🪦", rev:"🧟" };

/* ---------- the index ---------- */
const ITEMS = [];
function add(kind, title, sub, hay, go, hue, y) { ITEMS.push({ kind, title, sub, hay: norm(title + " " + hay), go, hue, y }); }
for (const d of DOMAINS) {
  add("Domain", d.name, d.tag, d.blurb, () => { closeS(); zoomTo(d); }, d.hue, d.y0);
  for (const f of FIELDS[d.id] || []) {
    add("Field", `${MARK[f.s] || ""} ${f.name}`, d.name, [f.d, f.book, (f.theorems || []).join(" ")].join(" "),
      () => { closeS(); goToField(f.id); }, d.hue, f.y);
    for (const t of f.theorems || []) add("Theorem", t, f.name, "", () => { closeS(); goToField(f.id); }, d.hue, f.y);
    (f.topics || []).forEach((t, i) => {
      const x = typeof TOPIC_DETAIL !== "undefined" ? TOPIC_DETAIL[f.id + "|" + t.n] : null;
      add("Topic", `${MARK[t.s] || ""} ${t.n}`, `${f.name} · ${t.who} · ${fmtY(t.y)}`,
        [t.d, t.who, x ? [x.i, x.ex, x.n].join(" ") : ""].join(" "),
        () => { closeS(); openTopic(f, d, i); }, d.hue, t.y);
    });
  }
}
for (const l of LINKS) {
  const A = fieldById(l.from), B = fieldById(l.to);
  if (!A || !B) continue;
  add(l.type === "sig" ? "Bridge ★" : "Connection", l.via, `${A.f.name} → ${B.f.name} · ${l.who}`, [l.story, l.note, l.who].join(" "),
    () => { closeS(); goToField(l.from); }, A.d.hue, l.y);
}
for (const b of BRIDGES) add("Gold bridge", b.label, `${DOMAINS.find(d => d.id === b.a).name} ↔ ${DOMAINS.find(d => d.id === b.b).name}`, "",
  () => { closeS(); openEdgeDetail(b, "bridge"); }, 45, b.y);
for (const c of CONTROVERSIES) add("Dispute ⚡", c.label, `${DOMAINS.find(d => d.id === c.a).name} ↔ ${DOMAINS.find(d => d.id === c.b).name}`, "",
  () => { closeS(); openEdgeDetail(c, "controversy"); }, 355, c.y);
for (const r of SHELLS.rings) add("Number shell", r.label, r.who, r.blurb + " " + r.eq, () => { closeS(); openShell(r); }, 285, r.y);
if (typeof PEOPLE !== "undefined") for (const p of PEOPLE) {
  const d = DOMAINS.find(q => q.id === p.dom[0]);
  add("Pioneer", p.name, p.role, [p.epitaph, p.legacy, p.life.map(l => l[1] + " " + l[2]).join(" ")].join(" "),
    () => { closeS(); openPioneer(p.id); }, d ? d.hue : 45, p.y);
}

function openTopic(f, d, i) {
  goToField(f.id);
  setTimeout(() => {
    const c = document.querySelectorAll("#panel-body .topic")[i];
    if (!c) return;
    c.scrollIntoView({ behavior: "smooth", block: "center" });
    if (window.WOC_TOPIC_OPEN) WOC_TOPIC_OPEN(c);
  }, 60);
}

/* ---------- the overlay ---------- */
const box = document.createElement("div");
box.id = "mw-search"; box.hidden = true;
box.innerHTML = `
  <div class="ms-shell" role="dialog" aria-modal="true" aria-labelledby="ms-title">
    <div class="ms-head">
      <h2 id="ms-title">Search the map</h2>
      <button class="ms-close" aria-label="Close search">✕</button>
    </div>
    <input id="ms-input" type="search" autocomplete="off" placeholder="Fields, topics, theorems, bridges, people… (try “Galois”, “zeta”, “1931”)" aria-label="Search the map">
    <div class="ms-kinds" role="group" aria-label="Filter results"></div>
    <div class="ms-list" role="listbox"></div>
  </div>`;
document.body.appendChild(box);
const input = box.querySelector("#ms-input"), list = box.querySelector(".ms-list"), kindsEl = box.querySelector(".ms-kinds");
const KINDS = ["All", "Field", "Topic", "Theorem", "Bridge", "Pioneer"];
let kind = "All", sel = 0, shown = [];
kindsEl.innerHTML = KINDS.map(k => `<button data-k="${k}" aria-pressed="${k === "All"}">${k}</button>`).join("");
kindsEl.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
  kind = b.dataset.k; kindsEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); render(); input.focus();
}));

function score(it, words) {
  let s = 0;
  const t = norm(it.title);
  for (const w of words) {
    if (!it.hay.includes(w)) return -1;
    s += t.includes(w) ? (t.startsWith(w) ? 6 : 4) : 1;
  }
  return s + ({ Field: 3, Domain: 3, Pioneer: 2, Topic: 2, "Gold bridge": 2, "Bridge ★": 1.5, Theorem: 1 }[it.kind] || 0);
}
function render() {
  const q = norm(input.value.trim());
  const words = q.split(/\s+/).filter(Boolean);
  let res;
  if (!words.length) {
    // no query: every bridge, oldest first — surf bridge to bridge
    res = ITEMS.filter(it => it.kind === "Gold bridge" || it.kind === "Bridge ★" || it.kind === "Dispute ⚡").sort((a, b) => a.y - b.y);
    if (kind !== "All") res = res.filter(it => it.kind.startsWith(kind));
  } else {
    res = ITEMS.map(it => ({ it, s: score(it, words) })).filter(x => x.s >= 0)
      .filter(x => kind === "All" || x.it.kind.startsWith(kind) || (kind === "Bridge" && /bridge|connection|dispute/i.test(x.it.kind)))
      .sort((a, b) => b.s - a.s || a.it.y - b.it.y).map(x => x.it);
  }
  shown = res.slice(0, 80); sel = 0;
  const head = words.length ? `<p class="ms-count">${res.length} result${res.length === 1 ? "" : "s"}${res.length > 80 ? " (showing 80)" : ""}</p>`
    : `<p class="ms-count">Every gold bridge, signature link and dispute on the map, oldest first. Start typing to search everything.</p>`;
  list.innerHTML = head + (shown.length ? shown.map((it, i) => `<button class="ms-item${i === 0 ? " sel" : ""}" data-i="${i}" role="option" style="--h:${it.hue}">
      <span class="ms-kind">${esc(it.kind)}<i>${esc(fmtY(it.y))}</i></span>
      <b>${esc(it.title)}</b><small>${esc(it.sub)}</small></button>`).join("")
    : `<p class="ms-empty">Nothing matches. Try a surname, a theorem, or a year.</p>`);
  list.querySelectorAll(".ms-item").forEach(b => b.addEventListener("click", () => shown[+b.dataset.i].go()));
}
function move(k) {
  const items = list.querySelectorAll(".ms-item"); if (!items.length) return;
  sel = (sel + k + items.length) % items.length;
  items.forEach((x, i) => x.classList.toggle("sel", i === sel));
  items[sel].scrollIntoView({ block: "nearest" });
}
input.addEventListener("input", render);
input.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
  else if (e.key === "Enter") { e.preventDefault(); if (shown[sel]) shown[sel].go(); }
});
let last = null;
function openS() { last = document.activeElement; box.hidden = false; render(); input.focus(); input.select(); }
function closeS() { box.hidden = true; if (last && last.focus) last.focus({ preventScroll: true }); }
box.querySelector(".ms-close").addEventListener("click", closeS);
box.addEventListener("click", e => { if (e.target === box) closeS(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !box.hidden) closeS();
  else if (e.key === "/" && box.hidden && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); openS(); }
});
document.getElementById("toggle-search").addEventListener("click", openS);
window.openMapSearch = openS;

const css = `
#mw-search { position: fixed; inset: 0; z-index: 46; background: rgba(4,4,12,.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  display: flex; justify-content: center; align-items: flex-start; padding: 7vh 16px; }
#mw-search[hidden] { display: none; }
.ms-shell { width: min(760px, 100%); max-height: 86vh; display: flex; flex-direction: column;
  background: linear-gradient(160deg, rgba(26,16,46,.97), rgba(12,8,24,.97)); border: 1px solid rgba(245,196,81,.25);
  border-radius: 18px; box-shadow: 0 24px 70px rgba(0,0,0,.6); overflow: hidden; }
.ms-head { display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.3rem .5rem; }
.ms-head h2 { font-family: "Fraunces", Georgia, serif; font-weight: 600; font-size: 1.4rem; }
.ms-close { background: none; border: 1px solid rgba(255,255,255,.2); color: var(--ink); width: 2.2rem; height: 2.2rem; border-radius: 50%; cursor: pointer; font-size: 1rem; }
.ms-close:hover, .ms-close:focus-visible { border-color: var(--gold); color: var(--gold); outline: none; }
#ms-input { margin: .2rem 1.3rem .6rem; font-family: "Spectral", Georgia, serif; font-size: 1rem; color: var(--ink);
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.16); border-radius: 999px; padding: .55rem 1rem; }
#ms-input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(245,196,81,.15); }
.ms-kinds { display: flex; gap: .35rem; flex-wrap: wrap; padding: 0 1.3rem .7rem; border-bottom: 1px solid rgba(255,255,255,.08); }
.ms-kinds button { font-family: "IBM Plex Mono", monospace; font-size: .66rem; color: var(--dim); cursor: pointer;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.12); border-radius: 999px; padding: .3rem .65rem; }
.ms-kinds button[aria-pressed="true"] { color: var(--ink); border-color: var(--gold); background: rgba(245,196,81,.12); }
.ms-list { overflow-y: auto; padding: .5rem .9rem 1rem; }
.ms-count, .ms-empty { font-family: "IBM Plex Mono", monospace; font-size: .66rem; color: var(--dim); padding: .2rem .4rem .5rem; }
.ms-item { display: block; width: 100%; text-align: left; cursor: pointer; font: inherit; color: var(--ink);
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-left: 3px solid hsl(var(--h) 75% 62%);
  border-radius: 10px; padding: .55rem .75rem; margin-bottom: .35rem; }
.ms-item:hover, .ms-item.sel { border-color: rgba(245,196,81,.6); border-left-color: hsl(var(--h) 80% 68%); background: rgba(245,196,81,.07); }
.ms-kind { display: flex; justify-content: space-between; font-family: "IBM Plex Mono", monospace; font-size: .6rem; letter-spacing: .1em;
  text-transform: uppercase; color: var(--gold); }
.ms-kind i { font-style: normal; color: var(--dim); letter-spacing: 0; }
.ms-item b { display: block; font-family: "Spectral", Georgia, serif; font-weight: 600; font-size: .98rem; margin-top: .1rem; }
.ms-item small { display: block; font-size: .78rem; color: var(--dim); margin-top: .1rem; line-height: 1.35; }
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();
