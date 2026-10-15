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

- Node.js 22.12 or newer
- npm 10+

## Commands

Run all commands from the repository root.

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:3000
npm run typecheck    # generate route types, then tsc --noEmit
npm run lint         # ESLint, zero warnings allowed
npm run format       # format with Prettier
npm run check        # typecheck + lint + format check + production build
```

## Known advisories

`npm audit` reports 5 high-severity advisories. All of them come from one chain inside the
lint toolchain only (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` →
`micromatch` → `braces`, GHSA-vfj7-8cjw-p6xm). No patched `braces` release exists yet, the
package never ships to site visitors, and the attack needs a malicious glob pattern passed
to the linter. npm's suggested fix (downgrading to `eslint-config-next@14`) is wrong for
this project and should not be applied.

## Deployment

Deployment instructions are added in the final phase.
