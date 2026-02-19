import type { LandingContent } from "@/content/landing";

export function WhyUs({ whyUs }: { whyUs: LandingContent["whyUs"] }) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-5xl">
          {whyUs.title}
        </h2>
        <p className="mt-8 text-xl leading-relaxed text-[var(--muted)]">
          {whyUs.body}
        </p>
        <div className="mt-16 inline-block text-left">
          <ul className="space-y-4">
            {whyUs.points.map((point, i) => (
              <li key={i} className="flex items-center gap-4 text-lg font-medium text-[var(--foreground)]">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--accent)] text-sm text-[var(--accent-foreground)]">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
