# Syed Tahmid Manzoor — portfolio

Personal portfolio site. Static Next.js App Router site, deployed on Vercel.

## Stack

| Package           | Version | Why this version                                                                          |
| ----------------- | ------- | ----------------------------------------------------------------------------------------- |
| Next.js           | 16.4.1  | Latest stable. Cache Components and Partial Prefetching on (16.4 defaults).               |
| React / React DOM | 19.3.1  |                                                                                           |
| TypeScript        | 6.0.3   | Pinned. TS 7 breaks `typescript-eslint` (peer range `<6.1.0`) used by Next's lint config. |
| Tailwind CSS      | 4.x     | CSS-first config via the `@tailwindcss/turbopack` loader (Next 16.4 default).             |
| ESLint            | 9.x     | ESLint 10 isn't supported yet by `eslint-plugin-react`, `-import` or `-jsx-a11y`.         |

## Requirements

- Node.js 22.18 or newer (the content validator uses Node's built-in TypeScript support)
- npm 10+

## Commands

Run all commands from the repository root.

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:3000
npm run typecheck    # generate route types, then tsc --noEmit
npm run lint         # ESLint, zero warnings allowed
npm run format       # format with Prettier
npm run validate:content  # check the project registry (see below)
npm run check        # typecheck + lint + format check + content validation + production build
npm run test:e2e:full  # production build, then Playwright + axe tests
```

### End-to-end and accessibility tests

Playwright runs against the production build at desktop and phone sizes:

- `tests/a11y.spec.ts`: axe-core WCAG 2.2 A/AA scan of every page in light and dark themes
- `tests/layout.spec.ts`: no horizontal scrolling at 320px and 375px (WCAG 1.4.10)
- `tests/shell.spec.ts`: skip link, theme persistence, no wrong-theme flash, OS theme following, mobile menu

First time on a new machine, install the browser:

```bash
npx playwright install chromium
```

`@playwright/test` is pinned to an exact version because each release expects a matching browser build.

## Project structure

```
app/            routes, root layout, global styles and design tokens (globals.css)
app/fonts/      self-hosted variable fonts (OFL-1.1, licences in app/fonts/licenses)
components/     layout, theme and UI components
content/        site identity, project registry, images
lib/            fonts, theme logic, helpers
tests/          Playwright specs
```

## Content

All site content lives in `content/` and every statement must be traceable:

- `content/site.ts`: name, positioning, contact links
- `content/projects.ts`: the project registry. Each project lists its `evidence` (the résumé, a
  repository, or a report), every metric carries a `source`, and links render only when they exist.
  Team details are optional and are omitted until confirmed, never guessed.
- `content/skills.ts`, `content/profile.ts`: skills, education and activities from the résumé

`npm run validate:content` enforces the rules TypeScript can't: unique kebab-case slugs, https
links, local files that exist in `public/`, an availability note for projects without links,
and 2–3 featured projects. Errors fail `npm run check`; warnings list details still to confirm.

## Design tokens

Colours are defined in three layers in `app/globals.css`: raw palette values, semantic tokens
per theme (`--canvas`, `--fg`, `--primary`, ...), and Tailwind utilities generated only from
the semantic tokens (`bg-canvas`, `text-fg-muted`, `border-line`). Components never use raw
colour values. Contrast ratios for every text pair are recorded next to the tokens.

## Known advisories

`npm audit` reports 5 high-severity advisories. All of them come from one chain inside the
lint toolchain only (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` →
`micromatch` → `braces`, GHSA-vfj7-8cjw-p6xm). No patched `braces` release exists yet, the
package never ships to site visitors, and the attack needs a malicious glob pattern passed
to the linter. npm's suggested fix (downgrading to `eslint-config-next@14`) is wrong for
this project and should not be applied.

## Deployment

Deployment instructions are added in the final phase.
