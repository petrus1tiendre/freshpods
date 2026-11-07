---
name: FreshPads
description: Anodized-aluminium service manual for a headphone-cushion cleaning service — brushed silver ground, engraved charcoal, one ice-mint hairline.
colors:
  metal: "#e9eaec"
  metal-light: "#f4f5f6"
  metal-deep: "#dcdee2"
  metal-well: "#e3e5e8"
  metal-well-focus: "#eef0f2"
  ink: "#1b1d20"
  ink-hover: "#2a2d31"
  ink-2: "#5c6066"
  ink-3: "#62666d"
  ink-placeholder: "#7a7f86"
  line: "rgba(27, 29, 32, 0.12)"
  line-light: "rgba(255, 255, 255, 0.75)"
  mint: "#19c7a8"
  mint-ink: "#0e7f6b"
  error-stroke: "#b4452f"
  error-text: "#9a3a26"
typography:
  display:
    fontFamily: "Familjen Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 4.9vw, 4.6rem)"
    fontWeight: 560
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Familjen Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)"
    fontWeight: 560
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  statement:
    fontFamily: "Familjen Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.022em"
  value:
    fontFamily: "Familjen Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "tabular-nums"
  numeral:
    fontFamily: "Familjen Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 4vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Familjen Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.14em"
  control:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
rounded:
  focus: "6px"
  field: "14px"
  plate: "22px"
  panel: "28px"
  plate-lg: "30px"
  pill: "999px"
  knob: "50%"
spacing:
  xs: "6px"
  sm: "12px"
  md: "18px"
  lg: "28px"
  xl: "32px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(56px, 9vh, 110px)"
  band: "clamp(72px, 12vh, 140px)"
  header: "64px"
  max: "1200px"
components:
  pill:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  pill-hover:
    backgroundColor: "{colors.ink-hover}"
  pill-small:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "38px"
  marker:
    backgroundColor: "rgba(233, 234, 236, 0.92)"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "32px"
  compare-tag:
    backgroundColor: "rgba(233, 234, 236, 0.92)"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "30px"
  values-plate-cell:
    backgroundColor: "{colors.metal-light}"
    textColor: "{colors.ink}"
    padding: "26px 24px 28px"
  booking-plate:
    backgroundColor: "{colors.metal-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate-lg}"
    padding: "clamp(28px, 4vw, 48px)"
  field:
    backgroundColor: "{colors.metal-well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "52px"
  field-focus:
    backgroundColor: "{colors.metal-well-focus}"
  compare-knob:
    backgroundColor: "{colors.metal-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.knob}"
    size: "46px"
---

# Design System: FreshPads

## Overview

**Creative North Star: "The Anodized Service Manual"**

FreshPads reads like the maintenance sheet that ships inside a precision instrument: a brushed-aluminium ground, charcoal set as if engraved into it, and one thin line of ice-mint where the machine marks progress. The page is built around a single object seen very large (the cushion) and a single gesture (scroll, and it comes clean). Everything else on the page is a plate, a hairline or a label that explains that object. Nothing competes with the photograph; the metal is the quiet that makes it legible.

The material is real, not simulated with gradients. The ground is a generated brushed raster tile (`assets/brushed.webp`, about 4% contrast, 800×160 repeat) laid over `metal`. Plates are the next lighter alloy (`metal-light`), seated with a hairline border and a long, low ambient shadow. Depth is achieved by tone and by hairlines; there is no text-shadow anywhere in the stylesheet and no bevelled plate. Controls alone carry a one-pixel white catch-light along their top edge, the way a machined button catches the room.

Density is low and the rhythm is editorial: one message per band, one headline per section, generous section padding driven by viewport height. Type is a tight grotesk pairing: Familjen Grotesk at an unusual 560 weight with negative tracking for display, Hanken Grotesk for everything read at length. Color is nearly absent: the whole text field is achromatic, and mint appears only as a hairline rule, a progress rail, a slider handle, a focus ring and a 7px dot. The photos (a hand, a teal bedsheet, grey-then-white mesh) are the only saturated things on the page, which is the point.

**Key Characteristics:**
- Brushed silver raster ground; lighter plates set on hairlines, not on bevels
- Charcoal ink, two tinted greys for secondary and tertiary text; no pure black, no pure white text surfaces
- Ice-mint confined to hairlines, the rail, the slider handle, focus rings and a dot; never used as text
- Familjen Grotesk 560 display with -0.028 to -0.035em tracking; Hanken Grotesk body at 1.0625rem/1.55
- Charcoal pill as the only button; translucent metal pills as photo markers
- Cushion-shaped porthole (radius 0.42 × height) and 22px plates; 999px pills
- Scroll-scrubbed before/after in the hero; drag-and-keyboard slider as the proof
- Authored SVG icons at 1.5px stroke, round caps; four icons total, no icon set

## Colors

An almost monochrome alloy palette: three greys of metal, three of ink, hairlines mixed from the ink, and a single cold mint used as a signal, not as a colour.

### Primary
- **Ice Mint** (`mint`): the signal colour. Appears as the 56×2px rule above the statement band, the scroll-progress rail fill, the 2px compare-slider handle, the focus-visible outline, the selection highlight (32% alpha) and the 7px "Après" dot with its 2px 20%-alpha halo. It is never a text colour and never a fill behind text.
- **Mint Ink** (`mint-ink`): the darker, legible mint, used only where mint touches a reading context: the text caret, the focused field border, and the 1.5px stroke of the confirmation check icon. Still never body or label text.

### Neutral
- **Brushed Metal** (`metal`): the page ground under the raster tile; also the header's translucent fill at 78% alpha and the marker pills at 92% alpha.
- **Milled Plate** (`metal-light`): the lighter alloy for anything that sits on the ground: value cells, the booking plate, the slider knob.
- **Deep Metal** (`metal-deep`): the recess behind photographs before they load (porthole and compare frame backgrounds).
- **Field Well** (`metal-well`) and **Field Well, Focused** (`metal-well-focus`): the slightly darker recess of text inputs, which lightens on focus.
- **Engraved Ink** (`ink`): all headings, body text, button fills, the wordmark, the scrollbar track accent (`accent-color`). Never pure black.
- **Ink, Hover** (`ink-hover`): the pill's hover fill, one step lighter than ink.
- **Secondary Ink** (`ink-2`): leads, step text, labels, captions, statement-band body; tinted from the metal so it reads as a lighter engraving rather than grey text.
- **Tertiary Ink** (`ink-3`): fine print, hints, step numerals, scrollbar thumb, the "facultatif" marker. Visually very close to `ink-2`; both exist in the build and both are kept.
- **Placeholder Ink** (`ink-placeholder`): input placeholders only.
- **Hairline** (`line`): every rule, border and inset frame: section tops, step dividers, the values grid gutter, plate borders, photo insets.
- **Light Hairline** (`line-light`): declared for white hairlines on dark; currently unused by any rule and kept as a reserved token.
- **Error Stroke** / **Error Text** (`error-stroke`, `error-text`): validation only, on the field border and the error line under it. The only warm hue in the system.

### Named Rules
**The Hairline-Only Mint Rule.** Mint is a line, a ring or a dot, never a letterform and never a surface behind letterforms. If a new element needs mint text, the answer is charcoal text next to a mint dot (as the "Après" marker does).

**The Tinted Ink Rule.** Secondary text is `ink-2`/`ink-3`, which are mixed toward the metal's blue-grey, not neutral greys and not opacity on ink. Text is never set in `rgba(ink, 0.x)`.

**The No Pure Black Rule.** The darkest value on the page is `ink` (#1b1d20). Pure black and pure white appear only as the 1px catch-light and the white text inside charcoal pills.

## Typography

**Display Font:** Familjen Grotesk (self-hosted variable woff2, 400–700; fallback Helvetica Neue, Arial)
**Body Font:** Hanken Grotesk (self-hosted variable woff2, 300–700; fallback Helvetica Neue, Arial)

**Character:** Two tight grotesks that read as machined rather than printed. Display is set at 560, a weight between medium and semibold that only a variable font gives, with negative tracking that tightens as size grows. Body is open, slightly large (1.0625rem) and generously leaded (1.55). Labels are the smallest voice: 0.7rem, uppercase, 0.14em tracked, in secondary ink, like text etched on a plate.

### Hierarchy
- **Display** (560, clamp(2.4rem, 4.9vw, 4.6rem), 0.98, -0.035em): the hero headline only. Centred, balanced, max 22ch, two lines.
- **Headline** (560, clamp(1.9rem, 3.6vw, 3.1rem), 1.02, -0.028em): section titles. Left-aligned, max 18ch, `text-wrap: balance`.
- **Statement** (500, clamp(1.5rem, 3.2vw, 2.6rem), 1.18, -0.022em): the one-paragraph band between hero and protocol. Set in `ink-2` with the conclusion in `ink` at 600; max 26ch.
- **Value** (560, clamp(1.7rem, 2.6vw, 2.3rem), 1, -0.03em, tabular numerals): the engraved quantity in each values cell (price, delay, handoff, region).
- **Numeral** (500, clamp(2.4rem, 4vw, 3.4rem), 0.9, -0.04em, `ink-3`): the step index in the protocol; a numeral, not an icon.
- **Title** (600, 1.25rem, 1.15, -0.015em): step titles, the confirmation heading (1.5rem variant), the wordmark (1.2rem, -0.02em).
- **Lead** (400, 1.1rem, 1.55, `ink-2`): the one paragraph under a section headline; max 58ch, `text-wrap: pretty`.
- **Body** (400, 1.0625rem, 1.55): step text (max 44ch) and form copy.
- **Small** (0.82–0.95rem, `ink-2` or `ink-3`): captions 0.95rem, hero note 0.95rem, footer 0.92rem, error 0.9rem, form hint 0.88rem, fine print and value units 0.85rem, legal 0.82rem.
- **Label** (600, 0.7rem, 1, 0.14em, uppercase, `ink-2`): field labels, value `dt`s, compare tags; the porthole marker is the 0.72rem variant, the caption tag the 0.12em variant, the vertical scroll hint the 0.66rem/0.16em variant in `ink-3`.
- **Control** (600, 1rem, 1, -0.005em, white): pill label; 0.9rem in the small pill.

### Named Rules
**The 560 Rule.** Display and headline weight is 560, not 500 and not 600. Titles at 1.25rem and below step up to 600; the statement band and numerals step down to 500. Nothing display-sized is ever bold (700).

**The Tightening Rule.** Tracking tightens with size: -0.015em at title, -0.022em at statement, -0.028em at headline, -0.035em at display, -0.04em on bare numerals. Labels run the other way, 0.12–0.16em open, uppercase, 0.66–0.72rem.

**The Measure Rule.** Every text block has a ch cap: 22ch display, 18ch headline, 26ch statement, 58ch lead, 44ch step text, 60ch fine print. No paragraph runs the full container.

## Layout

A single 1200px column (`max`) with a fluid gutter (`clamp(16px, 4vw, 48px)`); the header is fixed at 64px, translucent metal with a 14px blur and a bottom hairline. Sections are separated by a top hairline and viewport-relative padding: `clamp(56px, 9vh, 110px)` for content sections, `clamp(72px, 12vh, 140px)` for the statement band. Inside a section the rhythm is 18px (lead under headline, step column gap), 26–28px (step padding, plate cell padding, column gutters), 32px (form top margin) and `clamp(28px, 5vh, 48px)` to `clamp(36px, 6vh, 64px)` before a large figure.

The hero is a 320svh scroll track with a 100svh sticky pin; the pin is a column (title, flexible slot, CTA, note) and the porthole is positioned absolutely over the slot, measured by `main.js`. At rest the porthole's aspect is clamped between 0.84 and 1.18 (upright on phones, wide on desktop). At the end of the scrub it becomes a panel of full viewport height and width `min(100vw, 0.82·vh)`; on landscape viewports the metal behind it is replaced by a blurred, 55% copy of the same before/after pair (hidden below 700px or an aspect ratio of 82/100). A 2px progress rail sits at the right edge, 120px tall, centred vertically.

Breakpoints are content-driven, not a scale: **700px** (photo pair goes two-up, values grid goes two-up, hero background and vertical hint appear), **820px** (protocol steps go three-up, separated by left hairlines instead of bottom ones), **1000px** (values grid goes four-up). Figures cap at 720px (compare) and 980px (hero slot); the booking plate at 680px. With `prefers-reduced-motion`, the hero unpins, the porthole becomes a static 160px-radius frame with a hard 50/50 split, and the rail and hint are removed.

## Elevation & Depth

Depth is tonal and linear. Plates are one alloy step lighter than the ground and sit inside a hairline; photographs are recessed behind a 1px inset hairline; input wells are one step darker with a 2px inset shadow. Drop shadows exist but are long, low and heavily negatively spread, so they read as the plate's contact with the ground rather than as lift. Hover on the pill raises it by one pixel and lengthens its shadow; nothing else moves on hover. There are no text-shadows and no bevelled or embossed surfaces anywhere in the build.

### Shadow Vocabulary
- **Pill, rest** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 1px 2px rgba(0,0,0,0.18), 0 10px 24px -14px rgba(0,0,0,0.5)`): charcoal controls. The inset line is the catch-light.
- **Pill, hover** (`inset 0 1px 0 rgba(255,255,255,0.16), 0 2px 3px rgba(0,0,0,0.18), 0 16px 30px -14px rgba(0,0,0,0.55)`) with `translateY(-1px)`.
- **Marker pill / compare tag** (`inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,0.2)`): translucent metal labels sitting on a photograph.
- **Slider knob** (`inset 0 1px 0 #fff, 0 2px 4px rgba(0,0,0,0.22), 0 12px 24px -12px rgba(0,0,0,0.6)`).
- **Porthole, rest** (`inset 0 0 0 1px rgba(27,29,32,0.14), 0 30px 60px -30px rgba(27,29,32,0.55)`): both terms fade to zero as the porthole reaches full screen.
- **Compare frame** (`inset 0 0 0 1px {line}, 0 30px 60px -36px rgba(27,29,32,0.6)`).
- **Photo inset** (`inset 0 0 0 1px {line}`): every static photograph.
- **Booking plate** (`0 40px 80px -50px rgba(27,29,32,0.55)`) on top of a hairline border.
- **Field well** (`inset 0 2px 4px rgba(27,29,32,0.08)`); focused adds `0 0 0 3px rgba(25,199,168,0.25)`; invalid swaps it for `0 0 0 3px rgba(180,69,47,0.18)`.
- **Dot halo** (`0 0 0 2px rgba(25,199,168,0.2)`) around the 7px mint dot.
- **Header** (`backdrop-filter: blur(14px) saturate(1.2)` over 78% metal, bottom hairline).

### Named Rules
**The Contact Shadow Rule.** Shadows are offset 30–40px down, blurred 60–80px and spread −30 to −50px, in ink at ≤0.6 alpha. They describe a plate resting on metal, not floating above it. No shadow is ever cast upward or sideways.

**The One Catch-Light Rule.** Depth on a control is a single 1px inset white line along the top edge (14–16% on charcoal, full white on metal). No second highlight, no inner bevel, no emboss on text.

## Shapes

Three silhouettes: the pill, the plate and the porthole. Controls and labels are full pills (999px). Plates and photographs are 22px (`plate`); the booking plate is 30px (`plate-lg`); fields are 14px; the porthole's end-state panel is 28px and the focus ring is 6px. The hero porthole is a cushion, not an ellipse: a rounded rectangle whose radius is 0.42 × its height (160px in the reduced-motion static frame), chosen to echo the cushion it frames; as it scales to the viewport its radius interpolates toward 28px (or 0 when it reaches full width). The slider knob is a 46px circle. Borders are 1px hairlines in `line`, never 2px, never coloured; the only 2px lines are the mint rule, the mint rail and the mint slider handle. Photographs are always clipped by their frame (`overflow: hidden` or a radius on the image) and never bleed square.

## Components

### Buttons
Machined charcoal pills: one shape, one colour, two sizes.
- **Shape:** full pill (999px radius)
- **Primary** (`pill`): ink fill, white label at 600/1rem/-0.005em, 52px min-height, 0 26px padding, 10px gap for an optional leading icon. Used for the hero CTA and the form submit (full-width inside the plate).
- **Small** (`pill-small`): same pill at 38px min-height, 0 16px, 0.9rem. Header "Réserver" only.
- **Hover / Focus:** fill steps to `ink-hover`, lifts 1px over 0.35s on `cubic-bezier(0.16, 1, 0.3, 1)`, shadow lengthens; active returns to 0. Focus-visible is the global 2px mint outline at 3px offset. The sending state is opacity 0.7 with pointer events off.
- **No secondary or ghost variant exists.** Secondary actions are plain underlined text links (1px underline, 0.18em offset).

### Marker pills and tags
Translucent metal labels placed on photographs.
- **Marker** (`marker`): the porthole state label, 32px min-height, 0 14px, 92% metal fill with a white catch-light and a 1px contact shadow; 0.72rem/0.14em uppercase label in ink. Two states ("Avant", "Après · simulation") are separate pills in the same grid cell that crossfade over 0.4s when scroll progress passes 55% of the clean; each keeps its own natural width.
- **Compare tag** (`compare-tag`): the same pill at 30px/0 12px/0.7rem, pinned 16px into the top corners of the slider.
- **Caption tag:** the inline, unframed version (0.7rem, 0.12em) that leads a figure caption.
- **The dot:** every "Après" label carries the 7px mint dot with its halo before the word; "Avant" never does.

### Plates
- **Corner Style:** 22px; booking plate 30px.
- **Values plate** (`values-plate-cell`): a `dl` grid whose 1px gaps are the hairline colour showing through (background `line`, gap 1px, 1px border, clipped at 22px); each cell is `metal-light` padded 26px 24px 28px with a label `dt`, a `value` numeral and a small `ink-3` unit line. 1 / 2 / 4 columns at base / 700px / 1000px.
- **Booking plate** (`booking-plate`): `metal-light`, hairline border, contact shadow, `clamp(28px, 4vw, 48px)` padding, 680px max.
- **Steps:** not plates. A hairline-ruled list: numeral in `ink-3`, title, text; stacked with bottom hairlines, or three columns with left hairlines at 820px.

### Inputs / Fields
- **Style** (`field`): 52px min-height, 12px 16px padding, 1.05rem body, `metal-well` fill, 1px `rgba(27,29,32,0.16)` border, 14px radius, 2px inset shadow. Native appearance removed; the select draws its own 20px 1.5-stroke chevron in `ink-2` at 14px from the right. Textarea resizes vertically, 96px minimum. Label above at Label style with 8px gap; optional marker in `ink-3`, lowercase, 0.06em.
- **Focus:** fill lightens to `metal-well-focus`, border to `mint-ink`, plus a 3px 25%-mint ring; 0.2s transitions.
- **Error:** border `error-stroke` with an 18%-alpha ring; error line in `error-text` at 0.9rem, 8px below.
- **Done state:** a 44px 1.5-stroke check circle in `mint-ink`, a 1.5rem/600 display heading and an `ink-2` paragraph, centred.

### Navigation
A fixed 64px bar: wordmark left (24×20 authored cushion glyph in currentColor + "FreshPads" at 600/1.2rem display), small pill right. Translucent metal with blur, bottom hairline. No menu, no links beyond the single CTA; the same wordmark repeats in the footer. A skip link renders as a charcoal pill when focused.

### Porthole (signature: scroll-scrubbed before/after)
A cushion-shaped frame over the dirty photo, with the clean photo on top under a radial mask. `main.js` writes three eased progress values onto the hero as custom properties: `--pT` (0–20% of the track: title, CTA and note fade and drift), `--pS` (2–50%: the frame grows from its measured rest size to the full-height panel, its radius and inset hairline fading out), `--pC` (30–92%: a `farthest-corner` radial mask centred at 32% 46% expands from 0 to 124% with a 24% soft edge). The marker crossfades at `--pC` > 0.55. Progress and the rail fill share `--pC`. `?p=0.6` in the URL freezes the scrub for review. Under reduced motion the frame is static, 160px radius, with a hard vertical 50/50 split.

### Compare slider (proof)
A 3:4 frame (720px max, 82vh cap, 22px radius) holding two stacked photographs; the after image is `clip-path: inset(0 0 0 var(--x))`. A 2px mint handle with a 1px 50%-white outline carries a 46px `metal-light` knob with a 22px 1.5-stroke double chevron. Pointer drag anywhere on the frame sets `--x`; a transparent full-size `range` input (step 0.5) keeps keyboard and screen-reader control, and focus draws the 2px mint outline around the whole frame.

### Icons
Four authored SVGs, no icon set: the cushion glyph (wordmark, 2px stroke), the select chevron, the slider double chevron and the done check, all `stroke-width: 1.5`, round caps and joins, `fill: none`, in currentColor or `ink-2`/`mint-ink`.

## Do's and Don'ts

### Do:
- **Do** set every display and headline in Familjen Grotesk at 560 with tracking between -0.028em and -0.035em; step titles at 600, statements and numerals at 500.
- **Do** keep the brushed ground as the raster tile over `metal` (800×160 repeat, about 4% contrast); plates are flat `metal-light` on a 1px `line` hairline.
- **Do** confine mint to the 2px rule, rail and handle, the focus ring, the selection highlight and the 7px dot; use `mint-ink` only for the caret, the focused border and the check icon.
- **Do** label photographs with translucent metal pills (92% `metal`, white catch-light, 1px contact shadow) and give every "Après" its dot.
- **Do** express quantities (price, delay, region) as engraved values in a hairline-gutter plate with a small `ink-3` qualifier; unknowns read "—" plus "à confirmer".
- **Do** author icons as inline SVG at 1.5px stroke with round caps, sized 20–24px (44px for the confirmation mark).
- **Do** cap measures (18–26ch for display sizes, 44–60ch for reading sizes) and balance or pretty-wrap headings and leads.
- **Do** keep the contact-shadow recipe (30–40px y, 60–80px blur, −30 to −50px spread, ink ≤0.6) and the single top catch-light on controls; use `cubic-bezier(0.16, 1, 0.3, 1)` for transforms and 0.2–0.4s durations.

### Don't:
- **Don't** set text in mint, `mint-ink` or any tinted colour; text is `ink`, `ink-2` or `ink-3` (plus `error-text` in validation).
- **Don't** add text-shadows, inner bevels, emboss or a second highlight line; depth is a hairline, a tonal step and one contact shadow.
- **Don't** replace the raster ground with a CSS gradient or a flat fill, and don't put the tile on plates.
- **Don't** introduce a second button style (outline, ghost, coloured). One charcoal pill; secondary actions are underlined text.
- **Don't** use icon cards, icon bullets or an icon set in the protocol or anywhere else; steps are numeral + title + text.
- **Don't** use pure black (#000) for text or fills, or opacity on `ink` for secondary text.
- **Don't** render a photograph square or unframed; every image is clipped at 22px or by the porthole and carries the 1px inset hairline.
- **Don't** split the hero into copy-left / product-right or add a badge row; the hero is headline, porthole, pill, one line.
- **Don't** invent values for price, delay, city, handoff or the contact address; they are placeholders until confirmed.
- **Don't** present the synthetic "after" (`photos/clean*.webp`) as a photograph; it stays labelled "simulation" in the marker and the fine print until a real after in the same framing replaces it.
