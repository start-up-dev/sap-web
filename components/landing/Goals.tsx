import type { LandingContent } from "@/content/landing";

export function Goals({ goals }: { goals: LandingContent["goals"] }) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-5xl">
            Security confidence for sales, audits & scale
          </h2>
          <p className="mt-6 text-xl text-[var(--muted)]">
            More than a scanner — a clear path to credibility.
          </p>
        </div>
        <ul className="mt-16 grid gap-x-12 gap-y-16 sm:grid-cols-2">
          {goals.map((goal, i) => (
            <li key={i} className="flex gap-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-lg font-bold text-[var(--accent-foreground)] shadow-[0_0_15px_rgba(212,255,63,0.3)]">
                ✓
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {goal.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-[var(--muted)]">
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
