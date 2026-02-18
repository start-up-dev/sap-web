import type { LandingContent } from "@/content/landing";

export function Vision({ vision }: { vision: LandingContent["vision"] }) {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          {vision.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {vision.title}
        </h2>
        <p className="mt-6 leading-relaxed text-[var(--muted-foreground)]">
          {vision.body}
        </p>
      </div>
    </section>
  );
}
