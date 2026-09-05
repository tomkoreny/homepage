# Tom Korený brand kit

## Identity in one sentence

Garage-built systems engineering with rally-livery energy: angular, direct, slightly misregistered, technically exact, and unmistakably personal.

## Design intent

The identity should feel like one person who writes infrastructure, runs services at home, and takes machinery onto a rally stage. It is not polished corporate technology branding. It borrows from screen printing, taped-up workshop graphics, and race-number vinyl, then controls that energy with disciplined spacing and strong typography.

The memorable element is the oversized overlapping TK mark. Everything around it should stay quiet enough for that mark to remain the signature.

## Core principles

1. **Engineered, not sterile.** Geometry and alignment are deliberate; small rotations and offset underprints keep the result human.
2. **Fast, not frantic.** Use one strong diagonal or overlap per composition. Do not scatter decorative motion everywhere.
3. **High contrast first.** Ink, paper, electric blue, and signal orange carry the identity. Avoid decorative gradients.
4. **Asymmetry with control.** The K is intentionally dominant and the overlap is intentionally imperfect. Do not “clean up” the mark into balanced initials.
5. **Content stays plainspoken.** Short sentences, concrete labels, no startup language, no ornamental jargon.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| Paper | `#E9EDF2` | Primary light canvas |
| Ink | `#090A0C` | Text, outlines, monochrome mark |
| Electric blue | `#263CFF` | Primary brand field and TK face |
| Signal orange | `#FF5A1F` | Offset underprint, accents, focus |
| White | `#FFFFFF` | Reversed single-color assets |

Do not substitute softened navy, pastel orange, beige, or a generic near-black gradient. Blue and orange should remain flat spot colors.

## Typography

- **Display:** Bowlby One SC, weight 400. Use for the name and major display statements. Its mass is the point; do not fake extra boldness.
- **Body:** Liberation Sans, weight 400–700. Use for readable supporting copy and metadata.
- Keep display tracking tight and body copy comfortably spaced.
- Prefer sentence case for interface labels. The wordmark is the deliberate uppercase exception.

The SVG wordmarks are converted to paths and do not require either font to be installed.

## Mark geometry

The canonical vector geometry lives in `src/app/tk-mark.json`. The homepage and this kit derive from the same three paths.

- The full-color mark uses electric blue over a signal-orange underprint offset down and right.
- The mark may carry its established slight counter-clockwise rotation in expressive placements.
- Keep the asymmetric overlap and the longer lower K leg.
- Clear space: leave at least 8% of the asset width around the visible mark.
- Avatar exports keep every visible pixel within a circle whose radius is 46% of the canvas, leaving room for platform masks and antialiasing.
- Minimum recommended digital size: 32px for the standalone mark, 180px wide for the horizontal lockup, and 140px wide for the standalone wordmark.

## Asset chooser

| Need | Use | Preferred variant |
| --- | --- | --- |
| Profile image or avatar | `png/avatars/` | `color` on neutral/light UI; `white` on dark UI |
| Flexible vector logo | `svg/marks/` | Match the background using the rules below |
| Name without the TK mark | `svg/wordmarks/` or `png/wordmarks/` | `color` on paper, otherwise monochrome |
| Compact site or document masthead | `svg/lockups/` or `png/lockups/` | `color` when the full palette is available |
| X profile header | `headers/*-x-*` | Platform-sized asset; do not crop another format |
| LinkedIn background | `headers/*-linkedin-*` | Composition already avoids the left profile-photo area |
| Open Graph or GitHub social image | `headers/*-open-graph-*` | Uses the taller social-card composition |

### Variant rules

- **Color:** Use on Paper or another quiet light surface. This is the default expression.
- **Ink:** Use for one-color printing or on a pale background.
- **White:** Use on Ink, dark photography, or a dark solid field.
- Do not place the color asset over busy photography without first giving it a quiet field.
- Do not add shadows, glows, rounded badges, or extra outlines around supplied assets.

## Composition rules

- Let the mark be oversized when it is the hero; let it bleed only when the canvas is intentionally a banner.
- Keep supporting copy left-aligned. Avoid centered portfolio-template layouts.
- Use blue as a structural field and orange as an underprint or short strike, not as interchangeable decoration.
- One diagonal field is enough. One offset shadow is enough.
- Preserve generous quiet space around body copy even when the display type overlaps.
- For platform headers, use the exact platform export so the lockup remains inside its safe area.

## Do not

- Do not redraw, tighten, symmetrize, or separate the T and K.
- Do not reduce the K until both initials have equal visual weight.
- Do not restore the retired `.com` badge or floating corner labels.
- Do not replace the palette with gradients, neon effects, or muted “premium” colors.
- Do not put the identity inside generic rounded cards, pills, glass panels, or dashboard chrome.
- Do not use a different heavy display font merely because it is locally available.
- Do not stretch an asset. Choose the correct ratio or preserve its aspect ratio.

## Export inventory

- Three standalone SVG mark variants.
- Three outlined SVG wordmark variants and matching 1200px PNGs.
- Three outlined horizontal SVG lockups and matching 1600px PNGs.
- Avatar PNGs at 1024, 512, 256, 128, 64, and 32px for every variant.
- X headers at 1500×500 in SVG and PNG for every variant.
- LinkedIn backgrounds at 1584×396 in SVG and PNG for every variant.
- Open Graph/GitHub images at 1200×630 in SVG and PNG for every variant.
- `manifest.json` lists every asset, role, variant, and exact dimensions.

## Reusable agent brief

> Continue the Tom Korený identity as garage-built systems engineering with rally-livery energy. Preserve the accepted asymmetric TK geometry, dominant K, electric-blue face, signal-orange offset underprint, Bowlby One SC display typography, and Liberation Sans body typography. Spend visual energy on one oversized mark, overlap, or diagonal field; keep surrounding structure direct and quiet. Use flat spot colors, strong contrast, left alignment, and plainspoken copy. Avoid gradients, rounded SaaS cards, glass effects, generic portfolio grids, decorative badges, and any attempt to clean or symmetrize the TK mark. Reuse assets from `/brand` instead of redrawing them.
