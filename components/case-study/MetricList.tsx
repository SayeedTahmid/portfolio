import { TextLink } from "@/components/ui/TextLink";
import { evaluationLabels, type Metric } from "@/content/types";

/**
 * Metrics with the data each was measured on and where to check it.
 * The evaluation kind is written out as text, never shown by colour alone.
 */
export function MetricList({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col rounded-md border border-line bg-surface p-5"
        >
          <dt className="text-sm text-fg-muted">{metric.label}</dt>
          <dd className="mt-1 text-xl font-semibold tracking-snug text-fg">
            {metric.value}
          </dd>
          <dd className="mt-3 font-mono text-xs text-fg-muted">
            {evaluationLabels[metric.evaluation]}
          </dd>
          {metric.detail ? (
            <dd className="mt-1 text-sm text-fg-muted">{metric.detail}</dd>
          ) : null}
          <dd className="mt-3 text-sm text-fg-muted">
            Source:{" "}
            {metric.source.href ? (
              <TextLink href={metric.source.href} external>
                {metric.source.label}
              </TextLink>
            ) : (
              metric.source.label
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
