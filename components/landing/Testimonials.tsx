import type { LandingContent } from "@/content/landing";

export function Testimonials({
  testimonials,
}: {
  testimonials: LandingContent["testimonials"];
}) {
  return (
    <section
      id="reviews"
      className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          What builders are saying
        </h2>
        <p className="mt-3 text-lg text-[var(--muted-foreground)]">
          The problems we hear — and the ones we solve.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
            >
              <p className="text-[var(--foreground)]">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
                {t.author}
              </p>
              <p className="text-sm text-[var(--muted)]">{t.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
