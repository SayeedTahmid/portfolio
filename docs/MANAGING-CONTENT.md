# Managing your photo and projects

Everything is file-based: **add a file or folder and it appears on the site; delete it
and it disappears.** No list to update and no code to change. After you push, Vercel
rebuilds the site in about a minute. If something is wrong (a typo, a missing image),
the build stops with a message saying exactly what to fix, and the previous version
stays live.

You can do all of this either on the GitHub website (works from a phone, nothing to
install) or on your computer.

## Profile photo

| To          | Do this                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------ |
| **Add**     | Put a photo named `profile-photo.jpg` (or `.jpeg`, `.png`, `.webp`, `.avif`) in `content/` |
| **Replace** | Delete the old file and add the new one with the same name                                 |
| **Remove**  | Delete `content/profile-photo.*`; the homepage and About page close up around it           |

Any shape works. It is shown in a 4:5 portrait frame, filled from the centre and biased
towards the top so your face stays in view. A JPEG around 1,000 pixels wide is ideal; keep
it under 5 MB. Only one photo may exist at a time.

## Projects

Each project is a folder: `content/projects/<slug>/project.ts`. The folder name is the
project's web address: `content/projects/weather-dashboard/` → `/projects/weather-dashboard`.

### Add a project

1. Copy `content/projects/_template/` to `content/projects/<your-slug>/`
   (lowercase letters, numbers and hyphens only).
2. Edit the copy's `project.ts`. Set `slug` to the same name as the folder. The comments
   explain each field; delete any optional field you can't fill truthfully.
3. Optional screenshot: put it in `public/projects/<your-slug>/` and fill in the `image`
   field. If you get the pixel size wrong, the check tells you the right numbers.
4. Optional full case study: see `content/projects/crowd-action-detection/case-study.ts`
   for a complete example. Copy it next to your `project.ts`, edit it, and attach it with
   `caseStudy:` in `project.ts`.

### Remove a project

Delete its folder `content/projects/<slug>/`, and `public/projects/<slug>/` if it has
images. Cards, its page, the sitemap and share images all go with it. If it was on the
homepage, the remaining featured projects move up. If none are left featured, the homepage
shows your four newest projects.

### Choose what's on the homepage

In a project's `project.ts`, `featured: 1` puts it first on the homepage, `featured: 2`
second, and so on up to 4. Delete the line to take a project off the homepage. Two
projects can't share a number. Projects are otherwise listed newest first by `year`.

## Doing it on the GitHub website

1. Open https://github.com/SayeedTahmid/portfolio and go to the folder (for example
   `content/`).
2. **Add a file:** **Add file → Upload files**, drag the file in, then **Commit changes**.
3. **Edit a file:** open it, press the pencil icon, edit, then **Commit changes**.
4. **Delete a file:** open it, use the **⋯** menu → **Delete file**, then **Commit changes**.
   To delete a whole project, delete every file inside its folder. Empty folders
   disappear on their own.
5. **Copy the template:** open `content/projects/_template/project.ts`, copy its text,
   then in `content/projects/` choose **Add file → Create new file**, type
   `your-slug/project.ts` as the name (the `/` creates the folder), paste, edit, and commit.

Each commit to `main` deploys automatically. Watch the **Actions** tab on GitHub (the
automated checks) or the Vercel dashboard (the deployment) to see when it's live.

## Doing it on your computer

```bash
# Run from the repository root
git pull                                         # get the latest version first

# Add a project from the template
cp -r content/projects/_template content/projects/weather-dashboard
# ...edit content/projects/weather-dashboard/project.ts...

# Remove a project
rm -r content/projects/crowd-action-detection public/projects/crowd-action-detection

# Replace the photo
rm content/profile-photo.*
cp ~/Pictures/new-photo.jpg content/profile-photo.jpg

npm run validate:content     # quick check: slugs, links, images, featured positions
npm run dev                  # preview at http://localhost:3000 (restart it after adding or removing a project folder)
npm run check                # the full check Vercel and GitHub will run

git add -A
git commit -m "Add the weather dashboard project"
git push
```

## How it works

`scripts/generate-content-index.ts` scans `content/projects/` and `content/` and writes two
small files the site imports (`content/projects/index.generated.ts` and
`content/profile-photo.generated.ts`). It runs automatically on `npm install`, `npm run dev`,
`npm run build` and every check, including on Vercel, so you never run it yourself.
Both files are git-ignored. The tests are generated from the same content, so they keep
working as projects come and go.
