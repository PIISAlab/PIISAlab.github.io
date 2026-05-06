# PIISA Lab — Design Brief

> **Author:** Mrs. Des (Atelier Morel)
> **Date:** 2026-05-06
> **Audience:** MrTL (implementation engineer)
> **Source-of-truth design system:** `~/.claude/PAI/USER/DESIGN/VeniziaDesignSystem.md` (Veni-AI Figma file `tBHAsfoInpvPeeKoZWjVtg`)

---

## 1. Intent

PIISA is **Prof. Kien's research lab at VNU-HCM** (Physics-Informed Intelligent Systems and Application). It is a separate organisation from Venizia AI — but it is the same hand on the pen. We share the design system because we share the standard.

The goal of this brief is to **align PIISA's token layer with Venizia's official Design System** so that the two surfaces feel like siblings, not strangers. PIISA receives the system in its **calm, academic register** — Venizia's "calm enterprise" mode — not the startup-aggressive register reserved for product surfaces.

> *"Form is never separate from function. An academic site must feel authoritative and cleanly organised. Use the system; resist the urge to perform."* — DM

---

## 2. Tone — academic, not startup

PIISA is a research lab. The visual language must read as **authoritative, clean, considered**. Concrete consequences for the implementation:

| Lever | Venizia (product) | PIISA (academic) — recommended |
|---|---|---|
| Animation density | Moderate motion on hover, transitions on state | **Reduce.** Keep transitions, lose the `translateY(-8px)` lift on cards. Hover = subtle border + shadow shift only. |
| Gradient text | Reserved for marketing hero | **Use once** in the home hero, never elsewhere. |
| Shadow depth | Two elevations per surface | One. Resting card = `shadow/xs`. Hover = `shadow/sm`. No deep `0 32px 64px` drama. |
| Typography weight | Display headings 600–700 | 600 max for body headings; 700 reserved for hero h1. |
| Brand glow | Allowed on primary CTA hover | **Not used** on PIISA. Use a tasteful colour transition instead. |
| Backdrop blur | Allowed (glass surfaces) | Keep for the navigation bar only. Cards are solid surfaces with subtle borders. |

The site should feel like a journal-quality research page. Authority is built through restraint.

---

## 3. Font update spec

### 3.1 Replace

| Role | Current | New (Venizia canonical) | Why |
|---|---|---|---|
| Display headings (h1, hero) | `Instrument Serif` (italic) | **Montserrat 600/700** | Venizia's display family — geometric, confident, modern. Carries personality at large sizes without performing. |
| Body text & paragraphs | `Inter` (used as default sans) | **Be Vietnam Pro 400/500** | Type-ramp-of-record in Venizia. Designed for Vietnamese diacritics — a perfect signal for a Vietnamese academic lab. |
| UI chrome (nav labels, badges, meta, buttons) | `Inter` | **Inter 400/500/600** (kept) | Unchanged. Inter is the precision typeface for small UI sizes. Three-family system, three jobs. |

### 3.2 Google Fonts import string (place in `Layout.astro`)

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

This replaces the existing `Instrument+Serif` + `Inter` import in `src/layouts/Layout.astro` line 24. **Three families, deliberate weights only — no font-payload bloat.**

### 3.3 CSS variables (token names)

```css
--font-display: "Montserrat", ui-sans-serif, system-ui, sans-serif;
--font-sans:    "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif;
--font-ui:      "Inter", ui-sans-serif, system-ui, sans-serif;
```

Tailwind v4 picks these up via `@theme`'s `--font-*` namespace, exposing classes `font-display`, `font-sans`, `font-ui`.

---

## 4. Token alignment table

### 4.1 Brand & semantic colors

| PIISA variable | Current value | Venizia canonical | Action |
|---|---|---|---|
| `--color-intellect` | `#0A6BFF` | Blue 500 `#0A6BFF` | **Keep.** Already correct — this is brand. |
| `--color-insight` | `#00E096` | Green 500 `#22C55E` | **Replace** with Venizia green. The current mint is too saturated for a serious academic palette. |
| `--color-innovation` | `#FF3D71` | Red 500 `#EF4444` | **Replace.** Venizia red is more restrained — it reads "danger" without screaming. |
| `--color-prestige` | `#FFAA00` | Amber 500 `#F59E0B` | **Replace** with Venizia amber. Slightly warmer, more refined. |

### 4.2 Foundation (canvas) & contrast (text)

| PIISA variable | Current | Venizia intent | New value |
|---|---|---|---|
| `--foundation` (light) | `#F7F9FC` | `bg/canvas` light | **`#FFFFFF`** — Venizia uses pure white as canvas, light grey is subtle/zebra. |
| `--foundation` (dark) | `#0B1221` | `bg/canvas` dark | **`#09090B`** — Venizia's dark canvas, OLED-friendly Zinc black. |
| `--contrast` (light) | `#334155` | `text/primary` light | **`#0F172A`** Slate 900 — true primary text, max readability. |
| `--contrast` (dark) | `#E2E8F0` | `text/primary` dark | **`#FAFAFA`** Zinc 900 — Venizia's high-contrast dark text. |
| `--starlight` (light, used for headings) | `#151A30` | `text/primary` light | **`#0F172A`** Slate 900 — same as primary text in Venizia. |
| `--starlight` (dark, used for headings) | `#F8FAFC` | `text/primary` dark | **`#FAFAFA`** Zinc 900. |

### 4.3 Neutral scale (NEW — introduce Slate / Zinc primitives)

PIISA currently has only `text-muted` as a single mid-grey. Venizia uses the **full 11-step Slate scale (light) and Zinc scale (dark)**. Introduce them so cards, borders, secondary text, and dividers all derive from one disciplined ramp.

**Light (Slate):**
```
--color-slate-50:  #F8FAFC   (subtle bg, hover, zebra row)
--color-slate-100: #F1F5F9
--color-slate-200: #E2E8F0   (default border)
--color-slate-300: #CBD5E1   (strong border)
--color-slate-400: #94A3B8   (text/tertiary, captions)
--color-slate-500: #64748B   (text-muted current value, OK)
--color-slate-600: #475569   (text/secondary)
--color-slate-700: #334155
--color-slate-800: #1E293B
--color-slate-900: #0F172A   (text/primary)
--color-slate-950: #020617
```

**Dark (Zinc — inverted):**
```
--color-zinc-50:  #18181B    (base surface)
--color-zinc-100: #27272A    (raised surface, divider)
--color-zinc-200: #3F3F46    (subtle border)
--color-zinc-300: #3F3F46    (border)
--color-zinc-400: #52525B    (muted text)
--color-zinc-500: #71717A    (secondary text)
--color-zinc-600: #A1A1AA    (tertiary text, icon)
--color-zinc-700: #D4D4D8
--color-zinc-800: #F4F4F5
--color-zinc-900: #FAFAFA    (display text)
--color-zinc-950: #020617
```

> **Rule:** Slate vs Zinc is structurally different by design. Don't try to merge them into one shared scale — keep the dark mode Zinc-shifted so the night theme reads like a calm OLED editor, not a tinted-blue night.

### 4.4 Surface tokens (semantic intents — NEW)

```
--surface-canvas:     light=#FFFFFF        dark=#09090B
--surface-card:       light=#FFFFFF        dark=#1C1C1F
--surface-subtle:     light=#F8FAFC        dark=#27272A
--surface-brand:      light=#EFF4FF (Blue-50)  dark=#001A40 (Blue-950)
--border-default:     light=#E2E8F0        dark=#27272A
--border-strong:      light=#CBD5E1        dark=#3F3F46
--text-primary:       light=#0F172A        dark=#FAFAFA
--text-secondary:     light=#475569        dark=#A1A1AA
--text-tertiary:      light=#94A3B8        dark=#71717A
--text-brand:         light=#0055D4        dark=#4288FF
```

These are the **intent tokens** components should consume. Never reference a colour primitive directly inside a component class — always go through an intent.

### 4.5 Border radius — replace ad-hoc rounding with the Venizia scale

Venizia's radius vocabulary is precise. PIISA currently uses `rounded-2xl` (16px) for buttons and `2rem` (32px) for cards. Both are oversized for an academic surface.

| Token | px | Use in PIISA |
|---|---|---|
| `--radius-xs` | 2 | Tags, dense chips |
| `--radius-sm` | 4 | Inputs (compact), small buttons |
| `--radius-md` | 6 | **Default for buttons, inputs, nav items** |
| `--radius` (DEFAULT) | 8 | **BentoCard, badges, KPI tiles** |
| `--radius-lg` | 10 | Panels, swatches |
| `--radius-xl` | 12 | Premium cards, mode panels |
| `--radius-2xl` | 16 | Modals, large cards |

**Concrete change for PIISA:**
- BentoCard: `border-radius: 2rem` → **`var(--radius)` = 8px**
- glass-button: `rounded-2xl` (16px) → **`var(--radius-md)` = 6px**
- Navigation pills (if any): **6px**

### 4.6 Shadow / elevation — adopt Venizia's six-step ramp

Replace the dramatic `0 32px 64px -16px rgba(0,0,0,0.1)` hover shadow with Venizia's calibrated scale:

```
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-brand: 0 4px 16px 0 rgba(10, 107, 255, 0.35);   /* used sparingly */
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

**PIISA usage discipline:**
- BentoCard resting: **none or `--shadow-xs`**
- BentoCard hover: **`--shadow-sm`** (not `lg` or `xl`)
- Modal / popover: `--shadow-xl`
- `--shadow-brand` is reserved for a single emphasis moment (e.g., featured publication card) — not a default

---

## 5. Component-level updates

### 5.1 Navigation

| Spec | Value |
|---|---|
| Height | **64px** (`h-16`) |
| Background | `var(--surface-canvas)` with 1px bottom border `var(--border-default)` |
| Backdrop blur | Keep `backdrop-filter: blur(12px)` with surface at 80% opacity for that subtle glass feel — academic but not sterile |
| Logo / wordmark | **Montserrat 600**, `text/lg` (18/23) |
| Nav items | **Inter 500**, `text/base` (14/18), `--text-secondary` default → `--text-primary` on hover |
| Active item | `--surface-brand` background pill, `--text-brand` text colour, `radius/md` (6px) |
| Padding | 16px horizontal (`space-4`), 16px gap between items |

### 5.2 BentoCard

| Spec | Current | New |
|---|---|---|
| Background | `rgba(255,255,255,0.7)` w/ blur | `var(--surface-card)` — solid white (light) / `#1C1C1F` (dark). **Drop the backdrop blur.** Solid surfaces read more authoritative. |
| Border | 1px `rgba(0,0,0,0.05)` | 1px `var(--border-default)` |
| Radius | `2rem` (32px) | **`var(--radius)` = 8px** |
| Padding | `2rem` (32px) | **`24px`** (`space-6`) — Venizia's standard card inner padding |
| Resting shadow | none | **`--shadow-xs`** |
| Hover transform | `translateY(-8px)` | **Remove.** Replace with border colour shift to Blue-200 + shadow lift to `--shadow-sm`. The page should sit still and feel solid. |
| Hover shadow | `0 32px 64px -16px rgba(0,0,0,0.1)` | **`var(--shadow-sm)`** |
| Hover border | `rgba(10,107,255,0.2)` | `#B9D1FF` (Blue 200) — explicit token, same brand family |
| Transition duration | `0.5s` | **`200ms`** with ease-out — Venizia's faster, more confident timing |

### 5.3 Buttons (glass-button)

The current `.glass-button` is closer to a marketing CTA than Venizia's chrome. Re-spec to Venizia's primary button:

| Spec | Current | New |
|---|---|---|
| Height | implied ~60px (py-4 = 16px × 2 + line-height) | **`md` size = 40px** (default), `lg` = 48px (hero CTA) |
| Horizontal padding | `px-8` (32px) | **`md`: 16px (`space-4`)**, `lg`: 20px (`space-5`) |
| Radius | `rounded-2xl` (16px) | **`var(--radius-md)` = 6px** |
| Font | `font-bold` (Inter 700) | **Inter 500** for `md`, **Inter 600** for `lg` |
| Font size | not specified | **md: `text/base` 14/18**, lg: `text/md` 16/21 |
| Background (default) | `rgba(10,107,255,0.1)` (subtle brand tint) — variant: secondary-brand | **Two variants:** `primary` = solid Blue-500 with white text · `outline` = transparent with 1px Slate-300 border + Slate-900 text |
| Hover | full Blue-500 fill, `translateY(-4px)`, brand-glow shadow | `primary` → Blue-600. `outline` → bg `--surface-subtle`. **No vertical lift.** No glow shadow on routine buttons. |
| Focus ring | none | **2px Blue-500 ring on Blue-50 halo** — accessibility-required |
| Transition | `0.5s` | **150ms ease-out** |

**Recommendation:** introduce two button classes, `.btn-primary` and `.btn-outline`, replacing the single `.glass-button`. Keep the old name as an alias for one release if existing pages depend on it.

### 5.4 Footer

Minimal changes. The footer is doing little harm. Verify:
- Background uses `var(--surface-canvas)` (or `var(--surface-subtle)` if you want zebra separation from main)
- Top border 1px `var(--border-default)`
- Body copy `--text-secondary` in `text/sm` Inter 400
- Links `--text-brand`

### 5.5 Hero section — gradient approach

The current hero likely uses a gradient text effect via `.text-gradient`. For PIISA's academic register:

- **Use Montserrat 700 in `text/6xl` (48/62) or `text/7xl` (60/78)** for the hero h1 instead of leaning on a gradient.
- If gradient is desired, keep it **subtle**: linear gradient from `#0F172A` (Slate-900) to `#0055D4` (Blue-600) — same-family, low contrast. Avoid the 3-stop animated gradient which feels like marketing.
- **Reserve gradient for the hero only.** No gradient text anywhere else on the site.

---

## 6. Typography scale — map Venizia ramp to PIISA usage

Adopt Venizia's full type ramp. Map common page elements to the right token:

| Element | Venizia token | px / line-height | Family |
|---|---|---|---|
| Hero h1 (homepage) | `text/6xl` or `text/7xl` | 48/62 or 60/78 | Montserrat 700 |
| Page h1 | `text/4xl` | 32/42 | Montserrat 600 |
| Section h2 | `text/2xl` | 24/31 | Montserrat 600 |
| Subsection h3 | `text/xl` | 20/26 | Montserrat 600 |
| Card title h4 | `text/lg` | 18/23 | Montserrat 600 |
| Body paragraph | `text/md` | 16/21 | Be Vietnam Pro 400 |
| Default UI text | `text/base` | 14/18 | Be Vietnam Pro 400 |
| Caption / meta / nav | `text/sm` | 12/16 | Inter 400/500 |
| Micro / badge | `text/xs` | 10/13 | Inter 500/600 (uppercase, tracking-wide) |

**Discipline rule:** three weights of importance only — `text-primary` (heading), `text-secondary` (body), `text-tertiary` (caption). If a fourth weight feels needed, the first three are wrong.

---

## 7. Updated global.css — `@theme` and `:root`

This is the verbatim replacement to apply to `src/styles/global.css`. Preserve the `@layer components` block at the bottom of the file — only replace the token layer above it (lines 1–111 in the current file).

```css
@import "tailwindcss";

/* =====================================================================
 * PIISA Lab — Token Layer
 * Aligned with Venizia AI Design System (Mrs. Des, 2026-05-06)
 * Source: ~/.claude/PAI/USER/DESIGN/VeniziaDesignSystem.md
 * Fonts loaded in src/layouts/Layout.astro <head> via Google Fonts.
 * ===================================================================== */

@theme {
  /* ---- Brand / semantic colors (Venizia canonical) ---- */
  --color-intellect:  #0A6BFF;   /* Blue 500 — primary brand */
  --color-insight:    #22C55E;   /* Green 500 — success */
  --color-innovation: #EF4444;   /* Red 500 — danger */
  --color-prestige:   #F59E0B;   /* Amber 500 — warning */
  --color-info:       #06B6D4;   /* Cyan 500 — info */

  /* ---- Brand ramp (Blue) ---- */
  --color-brand-50:  #EFF4FF;
  --color-brand-100: #DCE8FF;
  --color-brand-200: #B9D1FF;
  --color-brand-300: #85B3FF;
  --color-brand-400: #4288FF;
  --color-brand-500: #0A6BFF;
  --color-brand-600: #0055D4;
  --color-brand-700: #0043A9;
  --color-brand-800: #003882;
  --color-brand-900: #002D6B;
  --color-brand-950: #001A40;

  /* ---- Neutral ramp (Slate, light mode) ---- */
  --color-slate-50:  #F8FAFC;
  --color-slate-100: #F1F5F9;
  --color-slate-200: #E2E8F0;
  --color-slate-300: #CBD5E1;
  --color-slate-400: #94A3B8;
  --color-slate-500: #64748B;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1E293B;
  --color-slate-900: #0F172A;
  --color-slate-950: #020617;

  /* ---- Neutral ramp (Zinc, dark mode) ---- */
  --color-zinc-50:  #18181B;
  --color-zinc-100: #27272A;
  --color-zinc-200: #3F3F46;
  --color-zinc-300: #3F3F46;
  --color-zinc-400: #52525B;
  --color-zinc-500: #71717A;
  --color-zinc-600: #A1A1AA;
  --color-zinc-700: #D4D4D8;
  --color-zinc-800: #F4F4F5;
  --color-zinc-900: #FAFAFA;
  --color-zinc-950: #020617;

  /* ---- Semantic intent tokens (consumed by components) ---- */
  --color-foundation:    var(--surface-canvas);
  --color-contrast:      var(--text-primary);
  --color-starlight:     var(--text-primary);

  /* ---- Type families (Venizia three-family system) ---- */
  --font-display: "Montserrat", ui-sans-serif, system-ui, sans-serif;
  --font-sans:    "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif;
  --font-ui:      "Inter", ui-sans-serif, system-ui, sans-serif;

  /* ---- Border radius (Venizia scale) ---- */
  --radius-xs:  2px;
  --radius-sm:  4px;
  --radius-md:  6px;
  --radius:     8px;   /* DEFAULT — cards, badges */
  --radius-lg:  10px;
  --radius-xl:  12px;
  --radius-2xl: 16px;
  --radius-3xl: 20px;
  --radius-4xl: 24px;

  /* ---- Shadow / elevation (Venizia six-step ramp) ---- */
  --shadow-xs:    0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm:    0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
  --shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
  --shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
  --shadow-xl:    0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);
  --shadow-2xl:   0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-brand: 0 4px 16px 0 rgba(10, 107, 255, 0.35);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* ---- Motion ---- */
  --animate-gradient: gradient 8s ease infinite;
  --animate-border-beam: border-beam 4s linear infinite;
  --ease-expo-out: cubic-bezier(0.19, 1, 0.22, 1);

  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes border-beam {
    0% { offset-distance: 0%; }
    100% { offset-distance: 100%; }
  }
}

@layer base {
  :root {
    /* ---- Surface intents (light) ---- */
    --surface-canvas:  #FFFFFF;
    --surface-card:    #FFFFFF;
    --surface-subtle:  #F8FAFC;
    --surface-brand:   #EFF4FF;
    --border-default:  #E2E8F0;
    --border-strong:   #CBD5E1;
    --text-primary:    #0F172A;
    --text-secondary:  #475569;
    --text-tertiary:   #94A3B8;
    --text-brand:      #0055D4;

    /* ---- Compatibility aliases (existing components) ---- */
    --foundation:  var(--surface-canvas);
    --contrast:    var(--text-primary);
    --starlight:   var(--text-primary);
    --bg-color:    var(--surface-canvas);
    --text-color:  var(--text-primary);
    --heading-color: var(--text-primary);
    --card-bg:     var(--surface-card);
    --card-border: var(--border-default);
    --text-muted:  var(--text-tertiary);
    --noise-opacity: 0.02;
  }

  :root.dark {
    /* ---- Surface intents (dark) ---- */
    --surface-canvas:  #09090B;
    --surface-card:    #1C1C1F;
    --surface-subtle:  #27272A;
    --surface-brand:   #001A40;
    --border-default:  #27272A;
    --border-strong:   #3F3F46;
    --text-primary:    #FAFAFA;
    --text-secondary:  #A1A1AA;
    --text-tertiary:   #71717A;
    --text-brand:      #4288FF;

    /* ---- Compatibility aliases (existing components) ---- */
    --foundation:  var(--surface-canvas);
    --contrast:    var(--text-primary);
    --starlight:   var(--text-primary);
    --bg-color:    var(--surface-canvas);
    --text-color:  var(--text-primary);
    --heading-color: var(--text-primary);
    --card-bg:     var(--surface-card);
    --card-border: var(--border-default);
    --text-muted:  var(--text-tertiary);
    --noise-opacity: 0.04;
  }

  body {
    background-color: var(--surface-canvas);
    color: var(--text-primary);
    font-family: var(--font-sans);
    margin: 0;
    line-height: 1.5;
    transition: background-color 0.2s ease-out, color 0.2s ease-out;
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: var(--noise-opacity);
    pointer-events: none;
    z-index: 50;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  h1 { font-weight: 700; }

  .font-display { font-family: var(--font-display); }
  .font-ui { font-family: var(--font-ui); }

  a {
    color: var(--text-brand);
    text-decoration: none;
    transition: color 150ms ease-out;
  }
  a:hover { color: var(--color-brand-700); }

  :focus-visible {
    outline: 2px solid var(--color-brand-500);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
}
```

The existing `@layer components` block is preserved as-is. Tweaks to BentoCard / glass-button geometry recommended in §5 above are deliberately **not auto-applied** — those are component-level decisions for MrTL to make in the markup or component CSS, not in the token layer.

---

## 8. Implementation order for MrTL

Build in this order — each step unlocks the next without rework:

1. **Week 1 — Token layer.** Apply the new `global.css` (already done by Mrs. Des). Update `Layout.astro` `<head>` with the new Google Fonts import string. Verify all pages still render — colours and fonts will shift; that is expected.

2. **Week 1 — Navigation.** Re-spec per §5.1. Logo to Montserrat 600. Nav items to Inter 500. Active pill to brand-tinted surface.

3. **Week 1 — BentoCard.** Reduce radius to 8px, padding to 24px, drop the lift on hover, switch to `--shadow-xs` resting / `--shadow-sm` hover, swap border to `--border-default`.

4. **Week 2 — Buttons.** Introduce `.btn-primary` (Blue-500 solid, white text, h-40, radius-md, Inter 500) and `.btn-outline` (transparent, Slate-300 border, Slate-900 text). Migrate hero CTAs first; migrate inner CTAs second.

5. **Week 2 — Hero.** Convert h1 to Montserrat 700 in `text/6xl` or `text/7xl`. Demote the gradient effect to subtle Slate-900 → Blue-600, or remove altogether. Verify the page still feels confident without the gradient — if it feels flat, the type sizing is wrong, not the gradient.

6. **Week 2 — Body & paragraphs.** Verify body copy now renders in Be Vietnam Pro. Check Vietnamese diacritics render cleanly (this is the entire reason we picked it).

7. **Week 3 — Audit.** Walk every page in light + dark, every breakpoint (375 / 768 / 1280 / 1440). Look for: orphan `Inter` heads (should be Montserrat), oversized radii (anything > 12px outside modals), tertiary text not using `--text-tertiary`, hover states with vertical lifts (remove all).

---

## 9. Acceptance criteria

A page is "Venizia-aligned" when:

- All headings render in Montserrat
- All body text renders in Be Vietnam Pro
- All UI labels (nav, buttons, badges) render in Inter
- No card has a corner radius greater than 12px
- No button has a corner radius greater than 8px
- All borders consume `var(--border-default)` or `var(--border-strong)`
- All secondary text consumes `var(--text-secondary)`; tertiary `var(--text-tertiary)`
- All focus rings show 2px Blue-500 with 2px offset
- No hover state vertically translates an element by more than 0px
- No element shadow exceeds `var(--shadow-md)` outside modals/popovers
- The brand blue `#0A6BFF` is the only blue on the page

---

*Mrs. Des — Atelier Morel*
*"Design is not decoration. Design is the shape of intent."*
