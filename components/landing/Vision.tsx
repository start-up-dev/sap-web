import type { LandingContent } from "@/content/landing";

export function Vision({ vision }: { vision: LandingContent["vision"] }) {
  return (
    <section id="how-it-works" className="border-b border-[var(--border)] bg-[var(--background)] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)]">
          {vision.label}
        </p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-5xl">
          {vision.title}
        </h2>
        <p className="mt-8 text-xl leading-relaxed text-[var(--muted)]">
          {vision.body}
        </p>
      </div>
    </section>
  );
}
