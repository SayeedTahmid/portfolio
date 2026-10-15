import {
  categoryLabels,
  statusLabels,
  type Project,
  type Team,
} from "@/content/types";

function teamLabel(team: Team): string {
  if (team.kind === "solo") return "Solo project";
  const base = `Team of ${team.size}`;
  return team.collaborators?.length
    ? `${base}, with ${team.collaborators.join(" and ")}`
    : base;
}

/** Key facts at the top of a case study. Unconfirmed facts are omitted, not guessed. */
export function ProjectFacts({ project }: { project: Project }) {
  const facts: Array<[string, string]> = [
    ["Category", categoryLabels[project.category]],
    ["Status", `${statusLabels[project.status]}, ${project.year}`],
  ];
  if (project.context) facts.push(["Context", project.context]);
  if (project.team) facts.push(["Team", teamLabel(project.team)]);
  if (project.role) facts.push(["My role", project.role]);
  if (project.advisor) facts.push(["Advisor", project.advisor]);

  return (
    <dl className="divide-y divide-line rounded-md border border-line bg-surface text-sm">
      {facts.map(([term, value]) => (
        <div
          key={term}
          className="grid gap-1 px-5 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4"
        >
          <dt className="text-fg-muted">{term}</dt>
          <dd className="text-fg">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
