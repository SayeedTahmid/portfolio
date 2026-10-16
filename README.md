# Syed Tahmid Manzoor: portfolio

Personal portfolio site: homepage, project index, case studies and an About page.
Static Next.js App Router site, deployed on Vercel.

- **Deploying:** [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) (Vercel setup, custom domain, verification, launch checklist)
- **Adding or removing projects and your photo:** [`docs/MANAGING-CONTENT.md`](docs/MANAGING-CONTENT.md)

## Stack

| Package           | Version                              | Notes                                                                                     |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Next.js           | 16.4.1                               | App Router, Cache Components, Partial Prefetching, typed routes                           |
| React / React DOM | 19.3.1                               | Server components by default; two small client components (navigation, theme switcher)    |
| TypeScript        | 6.0.3                                | Pinned. TS 7 breaks `typescript-eslint` (peer range `<6.1.0`) used by Next's lint config. |
| Tailwind CSS      | 4.x                                  | CSS-first config through `@tailwindcss/turbopack`; tokens in `app/globals.css`            |
| Geist, Geist Mono | `geist` 1.7                          | Self-hosted through `next/font/local` (SIL OFL 1.1)                                       |
| lucide-react      | 1.x                                  | Icons                                                                                     |
| ESLint            | 9.x                                  | ESLint 10 isn't supported yet by `eslint-plugin-react`, `-import` or `-jsx-a11y`.         |
| Playwright + axe  | 1.56.1 / `@axe-core/playwright` 4.14 | End-to-end and accessibility tests                                                        |

No database, CMS, backend, authentication or analytics.

## Requirements

- Node.js 22.18 or newer (`package.json` pins Vercel to 22.x)
- npm 10+

## Commands

Run from the repository root.

```bash
npm install               # install dependencies
npm run dev               # development server at http://localhost:3000
npm run check             # typecheck + lint + format check + contrast + content validation + build
npm run test:e2e:full     # production build, then the Playwright suite
```

Individual steps: `npm run typecheck`, `npm run lint`, `npm run format`,
`npm run check:contrast`, `npm run validate:content`, `npm run build`.

## Project structure

```
app/                  routes, root layout, design tokens (globals.css), metadata files
  projects/[slug]/    case-study pages and their share images
components/           layout, theme, home sections, project cards, case-study parts, UI primitives
content/              all site content: identity, profile photo, skills, profile text
  projects/<slug>/    one folder per project (project.ts, optional case-study.ts); _template to copy
lib/                  fonts, theme script, site URL, metadata helper, share-image renderer
public/               resume PDF and project images
scripts/              content index generator, contrast checker, content validator (Node, no build step)
tests/                Playwright suites
proxy.ts              returns a real 404 for unknown project URLs
docs/                 deployment and content guides
```

## How the main guarantees are enforced

| Guarantee                                                   | Enforced by                                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Every text and control colour pair meets WCAG 2.2 AA        | `scripts/check-contrast.ts` (56 pairs, both themes, reads the real CSS)         |
| No invented claims: every project lists its sources         | Required `evidence` field; metrics need a `source` and an `evaluation` kind     |
| No dead links or broken images                              | `scripts/validate-content.ts`, typed routes, link-crawl test                    |
| Empty case-study sections are hidden, never padded          | `components/case-study/buildSections.tsx`                                       |
| Accessible in both themes at every width                    | axe (WCAG 2.2 A/AA), focus, target size, heading and reflow tests               |
| Theme: no flash, persists, follows the OS, keeps page state | Inline head script in `lib/theme.ts`; `tests/shell.spec.ts`, `tests/qa.spec.ts` |
| Correct metadata on every page                              | `lib/metadata.ts`; `tests/seo.spec.ts`                                          |

## Tests

Playwright runs every suite at desktop and phone sizes against the production build:

- `a11y.spec.ts`: axe WCAG 2.2 A/AA on every route, light and dark
- `qa.spec.ts`: landmarks, heading order, theme on every route, focus visibility, target
  size, reduced motion, link crawl, image checks, console errors, security headers
- `layout.spec.ts`: no horizontal scrolling at 320, 375, 768, 1024, 1280 and 1600px
- `home.spec.ts`, `case-study.spec.ts`, `seo.spec.ts`, `shell.spec.ts`

`@playwright/test` is pinned to an exact version because each release expects a matching
browser build. To test a deployed site: `PLAYWRIGHT_BASE_URL=https://… npx playwright test`.

GitHub Actions (`.github/workflows/ci.yml`) runs `npm run check` and the Playwright suite on
every push and pull request.

## Known advisories

`npm audit` reports high-severity advisories from one chain inside the lint toolchain only
(`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`,
GHSA-vfj7-8cjw-p6xm). No patched `braces` release exists, the package never ships to
visitors, and exploiting it needs a malicious glob passed to the linter. npm's suggested
fix (downgrading to `eslint-config-next@14`) is wrong for this project; don't apply it.

## Licences

Code: all rights reserved by Syed Tahmid Manzoor unless a licence is added. Fonts: Geist
and Geist Mono, SIL Open Font License 1.1 (`lib/og/fonts/Geist-OFL.txt`).
