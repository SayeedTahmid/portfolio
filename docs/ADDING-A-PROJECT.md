# Adding a project

Every project lives in `content/`. Pages, cards, the sitemap and metadata are generated
from it, so adding a project never means writing page markup.

The rule for content: every statement must come from something a reader could check
(a repository, a report, the résumé). If a section has no verified content, leave it out;
the case-study page hides empty sections automatically.

## 1. Add images (optional)

Use only real screenshots, diagrams or result plots from the project. Put them in a folder
named after the project's slug:

```bash
# Run from the repository root
mkdir -p public/projects/my-project
cp ~/Downloads/dashboard.png public/projects/my-project/dashboard.png

# Print the pixel size; you need it for width and height below
node -e "const b=require('fs').readFileSync('public/projects/my-project/dashboard.png');console.log(b.readUInt32BE(16)+'x'+b.readUInt32BE(20))"
```

## 2. Add the registry entry

Open `content/projects.ts` and add an object to the `projects` array. Required fields are
`slug`, `title`, `summary`, `category`, `status`, `year`, `highlights`, `stack` and
`evidence`. Everything else is optional.

```ts
// content/projects.ts  (inside the projects array)
{
  slug: "my-project", // becomes /projects/my-project
  title: "Short, specific title",
  summary: "One or two sentences for cards and share previews (max 260 characters).",
  category: "software", // "ml-research" | "software" | "embedded"
  status: "completed", // "completed" | "ongoing"
  year: 2026,
  context: "Course or setting, e.g. Software Engineering (CSE327), North South University",
  team: { kind: "solo" }, // or { kind: "team", size: 3 } — omit if unsure
  highlights: [
    "A concrete thing the project does or achieved, traceable to a source below.",
  ],
  metrics: [
    {
      label: "p95 response time",
      value: "120 ms",
      evaluation: "other", // "test" | "validation" | "preliminary" | "other"
      detail: "What it was measured on",
      source: { label: "Load-test report in the repo", href: github("my-project") },
    },
  ],
  stack: ["TypeScript", "React"],
  links: [
    { kind: "repo", href: github("my-project"), label: "Source code" },
    { kind: "demo", href: "https://my-project.vercel.app", label: "Live demo" },
  ],
  // Required instead of links when nothing is public:
  // availabilityNote: "The code is private.",
  evidence: [resume, { label: "my-project repository", href: github("my-project") }],
  image: {
    src: "/projects/my-project/dashboard.png",
    width: 1440,
    height: 900,
    alt: "Describe what the screenshot shows, not just 'screenshot'.",
  },
},
```

## 3. Write the case study (optional)

For a full case study, create a file in `content/case-studies/` and attach it with
`caseStudy`. Every field is optional; leave out what you can't verify.
`content/case-studies/crowd-action-detection.ts` is a complete example.

```ts
// content/case-studies/my-project.ts
import type { CaseStudy } from "../types.ts";

export const myProject: CaseStudy = {
  overview: ["A paragraph that adds to the summary."],
  problem: ["Why the project exists."],
  contributions: ["What you personally did."],
  requirements: ["Constraints you had to work within."],
  architecture: {
    components: [{ name: "API", description: "What it does." }],
  },
  implementation: [{ title: "Authentication", body: ["How it works."] }],
  technologies: [{ name: "Firebase", purpose: "Auth and Firestore database" }],
  decisions: [{ title: "Why X over Y", body: "The trade-off." }],
  results: ["What the numbers in `metrics` mean, and their caveats."],
  limitations: ["What doesn't work yet."],
  futureWork: ["What you'd do next."],
  figures: [
    {
      src: "/projects/my-project/architecture.png",
      width: 1600,
      height: 900,
      alt: "Diagram of …",
      caption: "System architecture.",
    },
  ],
};
```

```ts
// content/projects.ts
import { myProject } from "./case-studies/my-project.ts";
// ...in the project's entry:
caseStudy: myProject,
```

Keep the `.ts` extension in imports inside `content/`; the content validator runs these
files directly with Node.

## 4. Feature it on the homepage (optional)

Edit `featuredSlugs` near the bottom of `content/projects.ts`. Two to four projects; four
fills the grid evenly.

## 5. Check and preview

```bash
# Run from the repository root
npm run validate:content   # slugs, links, image files and sizes, alt text
npm run check              # types, lint, formatting, contrast, content, production build
npm run dev                # then open http://localhost:3000/projects/my-project
```

`npm run test:e2e:full` also runs the accessibility and layout tests against the new page,
because the test route list is generated from the registry.
