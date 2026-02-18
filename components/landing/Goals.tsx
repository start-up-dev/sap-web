import type { LandingContent } from "@/content/landing";

export function Goals({ goals }: { goals: LandingContent["goals"] }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Security confidence for sales, audits & scale
        </h2>
        <p className="mt-3 text-lg text-[var(--muted-foreground)]">
          More than a scanner — a clear path to credibility.
        </p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {goals.map((goal, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-medium text-[var(--accent-foreground)]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {goal.title}
                </h3>
                <p className="mt-1 leading-relaxed text-[var(--muted-foreground)]">
                  {goal.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
