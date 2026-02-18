import type { LandingContent } from "@/content/landing";

export function Features({
  features,
}: {
  features: LandingContent["features"];
}) {
  return (
    <section
      id="features"
      className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          How it works
        </h2>
        <p className="mt-3 text-lg text-[var(--muted-foreground)]">
          From free scan to full audit — one place, plain English.
        </p>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--muted-foreground)]">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
