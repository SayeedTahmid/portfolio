# Deploying to Vercel

This guide takes the site from the GitHub repository to a live Vercel URL, then to an
optional custom domain. Nothing here has been deployed yet. Every step is yours to run.

## 1. Before the first deploy

Run the full check locally (Node.js 22.18 or newer) from the repository root:

```bash
npm ci
npm run check                      # types, lint, formatting, contrast, content, production build
npx playwright install chromium    # first time only
npx playwright test                # accessibility, layout, theme, links, metadata
```

Then confirm the personal details below are final.

### Where personal details live

| What                                                            | File                                           | Field                                            |
| --------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| Name, role label, location                                      | `content/site.ts`                              | `name`, `role`, `location`                       |
| Hero headline and description (currently your placeholder copy) | `content/site.ts`                              | `headline`, `description`                        |
| Share-preview / meta description                                | `content/site.ts`                              | `positioning`                                    |
| Email, GitHub, LinkedIn                                         | `content/site.ts`                              | `email`, `links.github`, `links.linkedin`        |
| Résumé PDF                                                      | `public/syed-tahmid-manzoor-resume.pdf`        | replace the file; the link is `site.resume.href` |
| Portrait                                                        | `content/images/portrait.jpg`                  | replace the file (keep the name)                 |
| About text                                                      | `content/profile.ts`                           | `aboutPreview`, `aboutFull`                      |
| Education, activities                                           | `content/profile.ts`                           | `education`, `activities`                        |
| Skills                                                          | `content/skills.ts`                            | `skillGroups`                                    |
| Projects and case studies                                       | `content/projects.ts`, `content/case-studies/` | see `docs/ADDING-A-PROJECT.md`                   |
| Homepage project selection                                      | `content/projects.ts`                          | `featuredSlugs`                                  |
| "No screenshot yet" panels                                      | `content/site.ts`                              | `showMediaPlaceholders`                          |
| Canonical domain                                                | Vercel environment variable                    | `NEXT_PUBLIC_SITE_URL` (section 4)               |

## 2. Environment variables

The site needs **no secrets and no required environment variables**.

| Variable                        | Required                                       | Set by                         | Purpose                                                          |
| ------------------------------- | ---------------------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | No (recommended once you have a custom domain) | You, **Production** scope only | Canonical URLs, sitemap, share-card URLs, robots.txt             |
| `VERCEL_ENV`                    | Automatic                                      | Vercel                         | `production` allows crawling; previews are blocked in robots.txt |
| `VERCEL_PROJECT_PRODUCTION_URL` | Automatic                                      | Vercel                         | Fallback site URL when `NEXT_PUBLIC_SITE_URL` is unset           |

The two automatic variables require **Settings → Environment Variables → Enable access
to System Environment Variables** to be ticked (check it once after importing).

URLs are written into the static pages at build time, so after changing
`NEXT_PUBLIC_SITE_URL` or adding a domain, **redeploy** for canonical links to update.

## 3. Import the repository into Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. Open https://vercel.com/new and choose **Import** next to `SayeedTahmid/portfolio`.
   If it isn't listed, use **Adjust GitHub App Permissions** to grant Vercel access to
   the repository.
3. **Project name:** this becomes the free domain, `<project-name>.vercel.app`.
   For example `syed-tahmid-manzoor` gives `syed-tahmid-manzoor.vercel.app` if it's free.
4. Leave the detected settings as they are:
   - Framework preset: **Next.js**
   - Root directory: `./`
   - Build command: `npm run build` (default)
   - Install command: default (`npm install`, which uses `package-lock.json`)
   - Node.js version: comes from `package.json` (`"engines": { "node": "22.x" }`)
5. Don't add environment variables yet. Select **Deploy**.
6. When the build finishes, open the deployment URL Vercel shows.

## 4. Optional: custom domain and HTTPS

1. Buy a domain from any registrar (or through Vercel).
2. In Vercel: **Project → Settings → Domains → Add**, and enter the domain, e.g.
   `example.com`. Vercel offers to add `www.example.com` and redirect one to the other;
   accept, and choose the apex (`example.com`) as the primary domain.
3. Vercel then shows the exact DNS records to create (or nameservers to switch to if you
   bought the domain through Vercel). Add them at your registrar exactly as shown.
4. Wait for the domain to show **Valid Configuration**. DNS changes can take from minutes
   to a few hours.
5. HTTPS is automatic: Vercel issues and renews the certificate once DNS is valid. Verify:

   ```bash
   curl -sI https://example.com | head -1        # expect: HTTP/2 200
   curl -sI http://example.com | grep -i location   # expect a redirect to https://
   ```

6. Add `NEXT_PUBLIC_SITE_URL` = `https://example.com` under
   **Settings → Environment Variables**, scoped to **Production** only, then redeploy
   (**Deployments → … on the latest → Redeploy**).

## 5. Verify the live site

Replace `SITE` with your URL in these commands (run from any terminal):

```bash
SITE=https://syed-tahmid-manzoor.vercel.app

curl -s -o /dev/null -w "home %{http_code}\n" "$SITE/"
curl -s -o /dev/null -w "case study %{http_code}\n" "$SITE/projects/crowd-action-detection"
curl -s -o /dev/null -w "unknown project %{http_code} (expect 404)\n" "$SITE/projects/does-not-exist"
curl -s -o /dev/null -w "resume %{http_code}\n" "$SITE/syed-tahmid-manzoor-resume.pdf"
curl -s "$SITE/robots.txt"                        # production: Allow: / and a Sitemap line
curl -s "$SITE/sitemap.xml" | grep -c "<loc>"     # expect 11
curl -sI "$SITE/" | grep -iE "content-security-policy|x-frame-options"   # security headers from next.config.ts
curl -s "$SITE/" | grep -o '<link rel="canonical"[^>]*>'   # must use your real domain
```

Run the full automated suite against the deployment (from the repository root):

```bash
PLAYWRIGHT_BASE_URL="$SITE" npx playwright test
```

Then check by hand, on your phone and on a laptop:

- [ ] Home, Projects, About, a case study and the 404 page all render.
- [ ] Theme: choose Dark, reload: still dark. Choose System and switch your OS
      appearance: the site follows. No light flash when loading in dark mode.
- [ ] Phone: the Menu opens, closes with the ✕ and after choosing a link; nothing scrolls sideways.
- [ ] Keyboard only (Tab / Shift+Tab / Enter / arrow keys): every control is reachable
      with a visible outline; "Skip to content" appears on the first Tab.
- [ ] Every external link opens the right page: GitHub profile and the five repos,
      the Hugging Face demo (wake it up before sharing the site), the OS-AlgoSim demo,
      LinkedIn, and the email link opens your mail app.
- [ ] Share previews: paste the homepage and one case-study URL into the LinkedIn Post
      Inspector (https://www.linkedin.com/post-inspector/) and check the title, text
      and image.

## 6. Day-to-day workflow

- **Every push to `main`** deploys to production automatically.
- **Every other branch and pull request** gets its own preview URL. Previews aren't
  indexed: robots.txt disallows them, and Vercel adds a noindex header to previews by
  default.
- **GitHub Actions** (`.github/workflows/ci.yml`) runs the full check and Playwright suite
  on every push and pull request. A red check means don't merge.
- Suggested habit for content changes:

  ```bash
  git switch -c update-crm-case-study
  # edit content/…
  npm run check
  git commit -am "Expand the CRM case study"
  git push -u origin update-crm-case-study
  # open a pull request, review the Vercel preview link it posts, then merge
  ```

- **Rolling back:** in Vercel, **Deployments**, pick the last good production deployment
  → **Instant Rollback** (or **Promote to Production**).

## 7. Launch checklist

Must do before sharing the link:

- [ ] Replace the placeholder hero headline and description in `content/site.ts`.
- [ ] Approve or rewrite the About text in `content/profile.ts` (it's a draft).
- [ ] Confirm team or solo for SAILOR, OS-AlgoSim and the marketplace (`team` field),
      or accept that these pages show no team information.
- [ ] Read every case study once; each statement must be true as written.
- [ ] Ask the teammates named on the gas-detection and flood-warning pages if they're
      comfortable being named.
- [ ] Decide on the "no screenshot yet" panels: add real screenshots, or set
      `showMediaPlaceholders: false` in `content/site.ts`.
- [ ] Section 5 verification passes on the deployed URL.

Recommended:

- [ ] Add the site URL to your GitHub profile, LinkedIn and résumé.
- [ ] Wake the Hugging Face Space before applications go out.
- [ ] Clean the editor folders (`extensions/`, `projects/`, `mcp.json`, `argv.json`) out of
      the CRM repository's root before recruiters click through to it.
