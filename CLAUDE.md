# PODERA — notes for Claude

Portable Finnish saunas, Thailand (Pattaya & Phuket). Content work lives in `brand/` (style, design system, footage catalog, edit lists) and `video/` (Remotion project).

## Product facts — never contradict
- Models: **2.5×4** and **2.5×6** only (never "3×4" / "3×6").
- **2.5×4 always has a SAWO 12 kW heater.** 2.5×6 has SAWO 15–18 kW. Do not write "12–18 kW" for one model.
- Capacity 4–8 people. Interior wood: Canadian Cedar, Thermo Abachi, Abachi.
- Production 1–2 months; installation 1 day; delivery time depends on location.
- Show-sauna visits: Pattaya and Phuket, no time limit.
- No prices in content. No medical claims.

## Editing rules
- Fonts: Inter (display/body), **Allura** (script accent, replaces Tempting), Instrument Serif (numbers/editorial).
- **Talking-head videos** → animations, graphics, captions. **All other videos (product/B-roll) → minimalist**: one short line per shot, no cards/checklists/diagrams, calm 3–5 s shots, logo + one-line CTA. See `brand/DESIGN_SYSTEM.md` §13.
- Follow `brand/DESIGN_SYSTEM.md` and `brand/PODERA_EDITING_STYLE.md`.
- Music must be copyright-free (own compositions in `video/public/music` or explicitly free libraries).
- Owner does not want Yasha on camera unless the brief asks for him.

## Video tools
- **Remotion** project: `video/` (skills `remotion-*`).
- **HyperFrames** project: `hyperframes/` (skills `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, …). GSAP and brand fonts are vendored in `hyperframes/assets/` because the cloud environment blocks public CDNs.
- In the cloud environment, set `PRODUCER_HEADLESS_SHELL_PATH=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` before `npx hyperframes check|render` (no Chrome download possible).
