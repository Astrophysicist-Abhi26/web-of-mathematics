# NOTES — visual identity decisions

*Wave 2 chose a direction; Wave 2.5 recalibrated its color. This file records
the reasoning so you can redirect at any point.*

## The three candidate directions (Wave 2)

1. **Iron-Gall Codex** *(chosen, now live)* — illuminated manuscript: warm
   bister/vellum ground, the 8 domains as manuscript pigments, gold-leaf
   signature bridges (the one signature element), parchment reading panel with
   iron-gall ink, ambient motion stilled, collapsible header.
2. **Copperplate Atlas** — engraved plate: platemark frame + cartouche title,
   cross-hatch instead of glow. Rejected for now: the frame fights an infinite
   pan/zoom canvas and eats mobile space.
3. **Astrolabe Vellum** — brass instrument reticle behind the map. Rejected for
   now: competes with the domain layout for the centre of attention.

A switch to 2 or 3 stays cheap: the palette/motion/header work carries over.

## Wave 2.5 — the vibrancy recalibration (your morning color note)

Your reference (web-of-computation) paints its glows at ~80% saturation and
~70% lightness with strong radial-gradient cores. The first codex palette sat
near 45% saturation — pigment-faithful but dull on the dark ground. Changes:

- **Same hue families, more light**: vermilion `#ec6a4f`, lapis `#549bee`,
  verdigris `#4cc596`, orpiment `#f0b23e`, mulberry `#d873b8`, turnsole
  `#9f8cf2`, celadon `#56c4b0`, pewter `#aab9cf` (in `data/data.js` — one
  edit point recolours everything).
- **Real bloom, still painted**: the glow is radial-gradient circles behind
  each node (core opacity .8, domain radius 68, field radius 32) — deliberately
  **no SVG filter elements**, which is what caused the original pan stutter.
  Please keep it that way in future edits.
- **Opacity floors raised** (`applyLOD` in `js/app.js`): domain presence now
  bottoms out at 0.32 (was 0.12), nebula at 0.34, prerequisite edges at .42 —
  deep zoom keeps its color.
- The identity stays codex: warm ground, gilt bridges, parchment panel, ❦.
  If it now reads *too* energetic, the four knobs above are independent —
  say which to pull back.

## Wave 3 schema (content depth)

Per your instruction: topic `def` stays the 1–3-sentence map-side lede;
long-form content lives in a new **`detail`** field (2–3 paragraphs,
`\n\n`-separated: key objects → worked example → why it matters). The topic
panel renders `detail` under an "In depth" label as serif reading text with an
illuminated initial; search indexes it. Geometry & Topology (44/44 topics) is
done; other domains untouched pending your review.

## Still needs you

- **`ROADMAP.md` remains uncommitted** — I keep working from your inline
  instructions; please `git add` it so sessions see the actual plan of record.
- Review one geometry `detail` entry for voice/level — if the register is
  right I'll run the same treatment across the other seven domains on request.
