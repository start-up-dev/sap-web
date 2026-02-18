import type { LandingContent } from "@/content/landing";

export function WhyUs({ whyUs }: { whyUs: LandingContent["whyUs"] }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {whyUs.title}
        </h2>
        <p className="mt-6 leading-relaxed text-[var(--muted-foreground)]">
          {whyUs.body}
        </p>
        <ul className="mt-10 space-y-3">
          {whyUs.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-[var(--muted-foreground)]">
              <span className="text-[var(--foreground)]">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
