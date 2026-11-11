# tomkoreny.com

Personal homepage for Tom Korený, built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # Production build
npm test           # Playwright + axe accessibility smoke tests
npm run check      # All checks above
npm audit --omit=dev
```

Install the Playwright browser once before running the end-to-end tests locally:

```bash
npx playwright install chromium
```

GitHub Actions runs the complete validation suite for pushes and pull requests.

## Architecture

- `src/app/page.tsx` — prerendered homepage content, refreshed once a day
- `src/profile.ts` — shared identity, links, business details, and text/JSON renderers
- `src/app/about.txt` and `about.json` — explicit machine-readable profile routes
- `src/proxy.ts` — root content negotiation for browsers and terminal HTTP clients
- `src/app/tk-mark.json` — canonical TK vector geometry shared by the site and brand kit
- `public/brand` — portable SVG/PNG assets, manifest, and agent-oriented brand guidance
- `src/app/theme-toggle.tsx` — the only interactive client component
- `src/app/layout.tsx` — metadata, self-hosted fonts, theme initialization, and analytics
- `src/app/fonts` — WOFF2 subsets served to browsers; see [Fonts](#fonts)
- `src/app/privacy/page.tsx` — analytics and local-storage disclosure
- `src/app/robots.ts` and `src/app/sitemap.ts` — crawler discovery
- `src/app/opengraph-image.tsx` and `twitter-image.tsx` — generated social cards
- `src/app/logo-lab` — TK mark scratchpad; served by `next dev`, a 404 in production
- `next.config.mjs` — canonical redirect and response security headers

The site uses a self-hosted Rybbit Analytics instance. Session replay and
interaction tracking are disabled; see `/privacy` for the visitor-facing
disclosure.

## Fonts

`public/fonts` holds the full TTF sources: Bowlby One SC for headings and
Liberation Sans 2.1.5 Regular and Bold for body text. The social card reads
the TTF files directly. Browsers get WOFF2 subsets from `src/app/fonts` that
cover Latin, Latin Extended-A (Czech), and common punctuation. Regenerate a
subset with fontTools after changing a source or the character range:

```bash
pyftsubset public/fonts/liberation-sans-bold.ttf \
  --unicodes="U+0020-007E,U+00A0-017F,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2190-2193" \
  --flavor=woff2 --output-file=src/app/fonts/liberation-sans-bold.woff2
```

Body text is set bold almost everywhere, so both weights must stay loaded.
With only the regular face, browsers fake the bold.

## Security headers

`next.config.mjs` applies CSP, HSTS, clickjacking, MIME-sniffing, referrer, and
permissions headers. The production CSP deliberately allows inline scripts
because Next.js emits inline bootstrap data and the pre-hydration theme
initializer must run before paint. A strict nonce-based CSP would require
per-request rendering, so this policy is defense in depth rather than a
complete XSS boundary. Keep user-controlled HTML and script injection out of
the application.

The image optimizer endpoint (`/_next/image`) is disabled because nothing uses
`next/image`. HSTS is sent without `preload`; the domain is not on the browser
preload list.

## Caching

`/` answers with HTML, plain text, or JSON depending on the request, so
`src/proxy.ts` marks the HTML `private`. A shared cache in front of the site
must not store one representation for every client.

## Deployment

Every push to `main` runs the checks in GitHub Actions and then publishes a
standalone container image, built from `Dockerfile`, to
`ghcr.io/tomkoreny/homepage` tagged `sha-<commit>`. Kargo promotes new image
tags to the cluster. `www.tomkoreny.com` is the canonical host; the app itself
redirects the apex domain. The site is not a static export.
