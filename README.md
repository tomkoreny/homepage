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

- `src/app/page.tsx` — server-rendered homepage content
- `src/app/theme-toggle.tsx` — the only interactive client component
- `src/app/layout.tsx` — metadata, self-hosted heading font, theme initialization, and analytics
- `src/app/privacy/page.tsx` — analytics and local-storage disclosure
- `src/app/robots.ts` and `src/app/sitemap.ts` — crawler discovery
- `src/app/opengraph-image.tsx` and `twitter-image.tsx` — generated social cards
- `next.config.mjs` — canonical redirect and response security headers

The site uses a self-hosted Rybbit Analytics instance. Session replay and
interaction tracking are disabled; see `/privacy` for the visitor-facing
disclosure.

## Security headers

`next.config.mjs` applies CSP, HSTS, clickjacking, MIME-sniffing, referrer, and
permissions headers. The production CSP deliberately allows inline scripts
because Next.js emits inline bootstrap data and the pre-hydration theme
initializer must run before paint. A strict nonce-based CSP would require
per-request rendering, so this policy is defense in depth rather than a
complete XSS boundary. Keep user-controlled HTML and script injection out of
the application.

## Deployment

The production deployment runs on Vercel from the `main` branch. Configure
`www.tomkoreny.com` as the canonical production domain and redirect the apex
domain permanently to it. The application is deployed with `next build` and
`next start`; it is not a static export.
