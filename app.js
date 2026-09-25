// THE WEB OF MATHEMATICS — app.js
// Layers: starfield canvas → SVG sky (shells, bridges, domains, fields, pioneers)
// One state object; render functions are idempotent updates.
// Same engine and look as the Web of Computation; the time axis runs
// from Babylon (1800 BCE) to today on a piecewise scale (TIME_KNOTS).

const S = { year: 2026, zoomed: null, people: false, playing: false };
const SVGNS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("map");
const $ = id => document.getElementById(id);
const escH = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

// ---------- time: years ↔ scrubber position ----------
const Y_MIN = TIME_KNOTS[0][0], Y_MAX = TIME_KNOTS[TIME_KNOTS.length - 1][0];
function yearToPos(y) {
  if (y <= Y_MIN) return 0;
  if (y >= Y_MAX) return 1;
  for (let i = 1; i < TIME_KNOTS.length; i++) {
    const [y1, p1] = TIME_KNOTS[i];
    if (y <= y1) { const [y0, p0] = TIME_KNOTS[i - 1]; return p0 + (p1 - p0) * (y - y0) / (y1 - y0); }
  }
  return 1;
}
function posToYear(p) {
  if (p <= 0) return Y_MIN;
  if (p >= 1) return Y_MAX;
  for (let i = 1; i < TIME_KNOTS.length; i++) {
    const [y1, p1] = TIME_KNOTS[i];
    if (p <= p1) { const [y0, p0] = TIME_KNOTS[i - 1]; return Math.round(y0 + (y1 - y0) * (p - p0) / (p1 - p0)); }
  }
  return Y_MAX;
}
// 300 BCE · 250 CE · 1832
function fmtY(y) {
  if (y == null || y === "") return "";
  if (typeof y !== "number") return String(y);
  if (y < 0) return (-y) + " BCE";
  if (y < 1000) return y + " CE";
  return String(y);
}
window.fmtY = fmtY;

// ---------- starfield ----------
(function starfield() {
  const c = $("stars"), ctx = c.getContext("2d");
  let stars = [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function resize() {
    c.width = innerWidth; c.height = innerHeight;
    stars = Array.from({ length: 190 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.3 + 0.3, p: Math.random() * Math.PI * 2,
      v: 0.4 + Math.random() * 1.2
    }));
  }
  function tick(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const s of stars) {
      const a = reduced ? 0.7 : 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(s.p + t * 0.001 * s.v));
      ctx.globalAlpha = a;
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    }
    if (!reduced) requestAnimationFrame(tick);
  }
  addEventListener("resize", resize);
  resize(); requestAnimationFrame(tick);
})();

// ---------- svg helpers ----------
function el(tag, attrs, parent) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
const D = id => DOMAINS.find(d => d.id === id);
function wrapName(name, max) {
  const lines = [""];
  for (const w of name.split(" ")) {
    const cur = lines[lines.length - 1];
    if (cur && (cur + " " + w).length > max) lines.push(w); else lines[lines.length - 1] = cur ? cur + " " + w : w;
  }
  if (lines.length > 2) return [lines[0], lines.slice(1).join(" ")];
  return lines;
}

// ---------- build defs (nebula gradients) ----------
const defs = el("defs", {}, svg);
for (const d of DOMAINS) {
  const g = el("radialGradient", { id: "neb-" + d.id }, defs);
  el("stop", { offset: "0%",  "stop-color": `hsl(${d.hue} 85% 72% / 0.85)` }, g);
  el("stop", { offset: "45%", "stop-color": `hsl(${d.hue} 75% 55% / 0.34)` }, g);
  el("stop", { offset: "100%","stop-color": `hsl(${d.hue} 75% 45% / 0)` }, g);
}

// ---------- layers ----------
const Lshell  = el("g", {}, svg);
const Ledge   = el("g", {}, svg);
const Ldomain = el("g", {}, svg);
const Lfield  = el("g", {}, svg);
const Lpeople = el("g", {}, svg);

// ---------- number shells: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ ----------
SHELLS.rings.forEach(r => {
  const g = el("g", { class: "shell-g", role: "button", tabindex: -1, "aria-label": r.label }, Lshell);
  el("ellipse", { class: "shell", cx: SHELLS.cx, cy: SHELLS.cy, rx: r.rx, ry: r.ry }, g);
  el("ellipse", { class: "shell-hit", cx: SHELLS.cx, cy: SHELLS.cy, rx: r.rx, ry: r.ry }, g);
  el("text", {
    class: "shell-label", x: SHELLS.cx, y: SHELLS.cy - r.ry - 6, "text-anchor": "middle"
  }, g).textContent = r.label;
  g.addEventListener("click", ev => { ev.stopPropagation(); openShell(r); });
  r._el = g;
});

// ---------- bridges & controversies ----------
function curve(a, b, side) {
  const A = D(a), B = D(b);
  const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
  const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy);
  const k = 70 * (side || 1);
  const cx = mx - dy / L * k, cy = my + dx / L * k;
  return `M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`;
}
function makeEdge(e, cls) {
  // a dispute bows the other way, so it never hides the gold bridge on the same pair
  const d = curve(e.a, e.b, cls === "bridge" ? 1 : -1);
  const vis = el("path", { class: cls, d }, Ledge);
  const hit = el("path", { class: "bridge-hit", d }, Ledge);
  el("title", {}, hit).textContent = e.label;
  hit.addEventListener("click", () => window.openEdgeDetail ? openEdgeDetail(e, cls) : openPanel({
    kind: cls === "bridge" ? "Gold bridge" : "Controversy ⚡",
    title: e.label, meta: `${D(e.a).name} ↔ ${D(e.b).name} · ${fmtY(e.y)}`,
    blurb: cls === "bridge"
      ? "A mediating concept: the idea that lets one continent's results flow into the other."
      : "A live dispute — the subject's best stories are its arguments."
  }));
  e._el = vis;
}
BRIDGES.forEach(b => makeEdge(b, "bridge"));
CONTROVERSIES.forEach(c => makeEdge(c, "controversy"));

// ---------- domains ----------
for (const d of DOMAINS) {
  const g = el("g", { class: "domain", tabindex: 0, role: "button", "aria-label": d.name }, Ldomain);
  el("circle", { class: "neb", cx: d.x, cy: d.y, r: d.r * 1.55, fill: `url(#neb-${d.id})` }, g);
  el("circle", { class: "ring", cx: d.x, cy: d.y, r: d.r * 1.1,
    stroke: `hsl(${d.hue} 80% 70%)`, "stroke-dasharray": "2 10" }, g);
  const t = el("text", { x: d.x, y: d.y - 4 }, g);
  // wrap long names on two lines
  const words = d.name.split(" ");
  const half = Math.ceil(words.length / 2);
  el("tspan", { x: d.x, dy: 0 }, t).textContent = words.slice(0, half).join(" ");
  el("tspan", { x: d.x, dy: 20 }, t).textContent = words.slice(half).join(" ");
  el("tspan", { class: "yr", x: d.x, dy: 20 }, t).textContent = "b. " + fmtY(d.y0);
  g.addEventListener("click", () => zoomTo(d));
  g.addEventListener("keydown", ev => { if (ev.key === "Enter") zoomTo(d); });
  d._el = g;
}

// ---------- fields (orbiting each domain, revealed on zoom) ----------
function orbitR(d) { const n = (FIELDS[d.id] || []).length; return Math.max(d.r * 1.05 + 55, n * 108 / (2 * Math.PI)); }
for (const d of DOMAINS) {
  const fields = FIELDS[d.id] || [];
  fields.forEach((f, i) => {
    const ang = -Math.PI / 2 + i * (2 * Math.PI / fields.length);
    const R = orbitR(d);
    f._x = d.x + R * Math.cos(ang);
    f._y = d.y + R * Math.sin(ang);
    f._d = d;
    const g = el("g", { class: `field s-${f.s}`, "data-dom": d.id, "data-fid": f.id, tabindex: -1 }, Lfield);
    el("circle", { class: "core", cx: f._x, cy: f._y, r: 11 }, g);
    const t = el("text", { x: f._x, y: f._y + 24 }, g);
    const lines = wrapName(f.short || f.name, 17);
    lines.forEach((ln, j) => { el("tspan", { x: f._x, dy: j ? 12 : 0 }, t).textContent = ln; });
    el("title", {}, g).textContent = `${f.name} · b. ${fmtY(f.y)}`;
    g.addEventListener("click", ev => { ev.stopPropagation(); openField(f, d); });
    f._el = g;
  });
}
function fieldById(id) {
  for (const d of DOMAINS) for (const f of (FIELDS[d.id] || [])) if (f.id === id) return { f, d };
  return null;
}
window.fieldById = fieldById;

// ---------- pioneers ----------
// The constellation, biography panel and gallery live in pioneers.js.

// ---------- panel ----------
const panel = $("panel");
let panelCleanup = null;
function openPanel(o) {
  if (panelCleanup) { panelCleanup(); panelCleanup = null; }
  $("panel-body").innerHTML = "";
  const b = $("panel-body");
  const meta1 = document.createElement("div");
  meta1.className = "meta"; meta1.textContent = o.kind + (o.meta ? " · " + o.meta : "");
  const h = document.createElement("h2"); h.textContent = o.title;
  b.append(h, meta1);
  if (o.blurb) { const p = document.createElement("p"); p.className = "blurb"; p.textContent = o.blurb; b.append(p); }
  if (o.fate) { const f = document.createElement("p"); f.className = "fate"; f.textContent = o.fate; b.append(f); }
  if (o.html) { const x = document.createElement("div"); x.className = "mw-extra"; x.innerHTML = o.html; b.append(x); }
  if (o.topics) {
    if (o.topics.length) {
      const th = document.createElement("h3");
      th.className = "it-section-title"; th.textContent = `The ${o.topics.length} topics on the map`;
      b.append(th);
    }
    for (const t of o.topics) {
      const div = document.createElement("div");
      div.className = "topic" + (t.y > S.year ? " unborn" : "");
      div.innerHTML = `<h3>${statusMark(t.s)} ${t.n}</h3>
        <div class="tmeta">${t.who} · ${fmtY(t.y)}</div><p>${t.d}</p>`;
      b.append(div);
    }
  }
  panel.classList.add("open");
  $("panel").scrollTop = 0;
  panelCleanup = o.after || null;
}
function statusMark(s) {
  return { found: "🏛", fire: "🔥", work: "⚙️", obs: "🪦", rev: "🧟" }[s] || "";
}

// the field-to-field links touching a field
function linksOf(fid) { return LINKS.filter(l => l.from === fid || l.to === fid).sort((a, b) => a.y - b.y); }
function linkCard(l, here, open) {
  const A = fieldById(l.from), B = fieldById(l.to);
  if (!A || !B) return "";
  const other = here ? (l.from === here ? B : A) : null;
  const star = l.type === "sig" ? `<i title="signature bridge">★</i>` : "";
  const goes = here ? `<button class="mw-go" data-go="${other.f.id}">→ ${escH(other.f.name)}</button>`
    : `<button class="mw-go" data-go="${A.f.id}">→ ${escH(A.f.name)}</button><button class="mw-go" data-go="${B.f.id}">→ ${escH(B.f.name)}</button>`;
  return `<details class="mw-link${l.type === "sig" ? " sig" : ""}${l.y > S.year ? " unborn" : ""}"${open ? " open" : ""}>
    <summary><span class="via">${star}${escH(l.via)}</span>
      <span class="ends"><b>${escH(A.f.name)}</b> → <b>${escH(B.f.name)}</b></span>
      <span class="who">${escH(l.who)}</span></summary>
    <div class="mw-link-body"><p>${escH(l.story)}</p>${l.note ? `<div class="note">${escH(l.note)}</div>` : ""}${goes}</div>
  </details>`;
}
window.linkCard = linkCard;
function wireGoButtons(root) {
  root.querySelectorAll(".mw-go").forEach(b => b.addEventListener("click", ev => {
    ev.preventDefault(); ev.stopPropagation(); goToField(b.dataset.go);
  }));
  root.querySelectorAll(".mw-fieldchip").forEach(b => b.addEventListener("click", () => goToField(b.dataset.fid)));
}
window.wireGoButtons = wireGoButtons;
function goToField(fid) {
  const r = fieldById(fid); if (!r) return;
  if (S.zoomed !== r.d) zoomTo(r.d);
  openField(r.f, r.d);
}
window.goToField = goToField;

function openField(f, d) {
  if (window.WOC_CRACK) WOC_CRACK.field(f, d);   // crack.js: the field breaks into its topics
  const links = linksOf(f.id);
  const html = `
    ${f.theorems && f.theorems.length ? `<div class="mw-sec"><h4>Landmark theorems</h4><ul class="mw-thm">${f.theorems.map(t => `<li>${escH(t)}</li>`).join("")}</ul></div>` : ""}
    ${f.book ? `<div class="mw-sec"><h4>The canonical book</h4><p class="mw-book">${escH(f.book)}</p>
      ${f.schuller ? `<div class="mw-schuller"><b>Schuller companion ·</b> ${escH(f.schuller)} — <i>Lectures on the Geometric Anatomy of Theoretical Physics</i></div>` : ""}</div>` : ""}
    ${links.length ? `<div class="mw-sec"><h4>Bridges &amp; connections (${links.length})</h4><div class="mw-links">${links.map(l => linkCard(l, f.id)).join("")}</div></div>` : ""}`;
  openPanel({
    kind: statusMark(f.s) + " Field of " + d.name, title: f.name,
    meta: "b. " + fmtY(f.y), blurb: f.d, topics: f.topics, html
  });
  wireGoButtons($("panel-body"));
  // a field with a playable atom offers it at the top of the panel
  if (typeof ATOM_FOR !== "undefined" && ATOM_FOR[f.id]) {   // a top-level const in atoms.js, not a window property
    const body = $("panel-body");
    let after = null;
    ATOM_FOR[f.id].forEach(id => {
      const btn = document.createElement("button");
      btn.className = "atom-launch";
      btn.textContent = "⚛ play: " + ATOM_NAMES[id];
      btn.addEventListener("click", () => window.openAtomFromField(id));
      if (after) after.after(btn); else body.insertBefore(btn, body.children[2] || null);
      after = btn;
    });
  }
  // guide-kit.js guides register themselves here by field id
  if (window.GUIDES && GUIDES[f.id]) { GUIDES[f.id](); return; }
}
$("panel-close").addEventListener("click", () => {
  panel.classList.remove("open");
  if (panelCleanup) { panelCleanup(); panelCleanup = null; }
});

// ---------- the number shells ----------
function openShell(r) {
  const rings = SHELLS.rings.slice().reverse();     // ℕ first
  const ladder = rings.map((q, i) => `${i ? "<span>⊂</span>" : ""}<button data-ring="${q.id}" class="${q === r ? "on" : ""}">${q.label.split(" ")[0]}</button>`).join("");
  openPanel({
    kind: "Number shell", title: r.label.replace(/^\S+\s+/, "").toLowerCase().replace(/^\w/, c => c.toUpperCase()) + " " + r.label.split(" ")[0],
    meta: fmtY(r.y) + " · " + r.who,
    html: `<div class="mw-ladder">${ladder}</div>
      <div class="mw-sec"><h4>The equation that forced it</h4><code class="mw-eq">${escH(r.eq)}</code></div>
      <p class="blurb">${escH(r.blurb)}</p>
      <p class="fate">${escH(r.beyond)}</p>`
  });
  $("panel-body").querySelectorAll("[data-ring]").forEach(b => b.addEventListener("click", () => {
    const q = SHELLS.rings.find(x => x.id === b.dataset.ring); if (q) openShell(q);
  }));
}
window.openShell = openShell;

// ---------- semantic zoom ----------
let HOME = "0 -190 1600 1190";   // room at the top for the pioneer portraits
// pioneers.js changes the home view to suit the chosen pioneer layout
function setHome(v) { HOME = v; if (!S.zoomed) animateViewBox(HOME); }
function domainBox(d) {
  // shift the domain left of centre so the side panel doesn't cover its fields,
  // and leave room below for the scrubber (big domains get a bigger box)
  const R = orbitR(d);
  const h = Math.max(420, (2 * R + 110) * 1.22), w = h * 620 / 420, shift = innerWidth > 700 ? w * 0.12 : 0;
  return `${d.x - w / 2 + shift} ${d.y - h * 0.46} ${w} ${h}`;
}
function zoomTo(d) {
  S.zoomed = d;
  document.body.classList.add("zoomed");
  animateViewBox(domainBox(d));
  document.querySelectorAll(".field").forEach(f =>
    f.classList.toggle("active", f.dataset.dom === d.id));
  const fields = FIELDS[d.id] || [];
  const chips = fields.map(f => `<button class="mw-fieldchip${f.y > S.year ? " unborn" : ""}" data-fid="${f.id}" style="--h:${d.hue}">${statusMark(f.s)} ${escH(f.name)}</button>`).join("");
  const nT = fields.reduce((n, f) => n + (f.topics || []).length, 0);
  openPanel({ kind: "Domain", title: d.name, meta: "b. " + fmtY(d.y0) + " · " + d.tag, blurb: d.blurb,
    html: `<div class="mw-sec"><h4>${fields.length} fields · ${nT} topics</h4><div class="mw-fieldchips">${chips}</div></div>` });
  wireGoButtons($("panel-body"));
  if (window.WOC_CRACK) WOC_CRACK.domain(d);   // crack.js: the domain breaks open
}
$("back-btn").addEventListener("click", () => {
  if (window.WOC_CRACK && WOC_CRACK.back()) return;   // leave a field's topics first
  if (window.WOC_CRACK) WOC_CRACK.reset();
  S.zoomed = null;
  document.body.classList.remove("zoomed");
  animateViewBox(HOME);
  panel.classList.remove("open");
});
let vbAnim = null;
function animateViewBox(target) {
  const from = svg.getAttribute("viewBox").split(" ").map(Number);
  const to = target.split(" ").map(Number);
  const t0 = performance.now(), dur = 650;
  cancelAnimationFrame(vbAnim);
  (function step(t) {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    svg.setAttribute("viewBox", from.map((v, i) => v + (to[i] - v) * e).join(" "));
    if (k < 1) vbAnim = requestAnimationFrame(step);
  })(t0);
}
svg.setAttribute("viewBox", HOME);

// ---------- the era engine (signature) ----------
function eraFor(y) { return ERAS.find(e => y >= e.from && y <= e.to) || (y < ERAS[0].from ? ERAS[0] : ERAS[ERAS.length - 1]); }
function setYear(y, fromSlider) {
  S.year = y;
  $("year-readout").textContent = fmtY(y);
  if (!fromSlider) $("year-slider").value = Math.round(yearToPos(y) * 1000);
  const era = eraFor(y);
  const root = document.documentElement.style;
  root.setProperty("--sky1", era.sky1);
  root.setProperty("--sky2", era.sky2);
  root.setProperty("--tint", era.tint);
  $("era-label").textContent = era.name;
  document.body.classList.toggle("winter", !!era.frost);

  // ignite / extinguish nodes
  for (const d of DOMAINS) d._el.classList.toggle("unborn", d.y0 > y);
  for (const id in FIELDS) for (const f of FIELDS[id]) f._el.classList.toggle("unborn", f.y > y);
  for (const b of BRIDGES) b._el.classList.toggle("unborn", b.y > y);
  for (const c of CONTROVERSIES) c._el.classList.toggle("unborn", c.y > y);
  for (const r of SHELLS.rings) r._el.classList.toggle("unborn", r.y > y);
  if (typeof PEOPLE !== "undefined") for (const p of PEOPLE) if (p._el) p._el.classList.toggle("unborn", p.y > y);
  document.querySelectorAll(".topic-node").forEach(n => n.classList.toggle("unborn", +n.dataset.y > y));
}
$("year-slider").addEventListener("input", e => { stopPlay(); setYear(posToYear(+e.target.value / 1000), true); });

// the track is painted with the eras, in proportion to their share of the scrubber
(function paintTrack() {
  const stops = ERAS.map(e => {
    const a = (yearToPos(Math.max(e.from, Y_MIN)) * 100).toFixed(2), b = (yearToPos(Math.min(e.to + 1, Y_MAX)) * 100).toFixed(2);
    return `${e.tint} ${a}% ${b}%`;
  });
  $("year-slider").style.background = `linear-gradient(90deg,${stops.join(",")})`;
})();

// play through history
let playRAF = null;
function stopPlay() { S.playing = false; $("play-btn").textContent = "▶"; cancelAnimationFrame(playRAF); }
$("play-btn").addEventListener("click", () => {
  if (S.playing) return stopPlay();
  S.playing = true; $("play-btn").textContent = "⏸";
  const p0 = S.year >= Y_MAX ? 0 : yearToPos(S.year);
  const t0 = performance.now(), dur = (1 - p0) * 36000;   // ~a slow burn through 3,800 years
  (function step(t) {
    if (!S.playing) return;
    const k = Math.min(1, (t - t0) / dur);
    setYear(posToYear(p0 + (1 - p0) * k));
    if (k < 1) playRAF = requestAnimationFrame(step);
    else stopPlay();
  })(t0);
});

// timeline load-bearing stars
const wrap = document.querySelector(".tl-stars");
TIMELINE_STARS.forEach(y => {
  const s = document.createElement("span");
  s.style.left = (yearToPos(y) * 100) + "%";
  s.title = fmtY(y);
  wrap.appendChild(s);
});

// ---------- toggles ----------
$("toggle-people").addEventListener("click", e => {
  S.people = !S.people;
  document.body.classList.toggle("people", S.people);
  e.currentTarget.classList.toggle("on", S.people);
});
$("toggle-shells").addEventListener("click", e => {
  const on = Lshell.style.display !== "none";
  Lshell.style.display = on ? "none" : "";
  e.currentTarget.classList.toggle("on", !on);
});

// ---------- boot ----------
document.body.classList.add("people"); // pioneers visible by default
$("toggle-people").classList.add("on");
S.people = true;
setYear(2026);
