import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function Hero({ hero }: { hero: LandingContent["hero"] }) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          {hero.badge}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.1]">
          {hero.headline}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
          {hero.subline}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={hero.primaryCtaHref}
            className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href={hero.secondaryCtaHref}
            className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-6 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--background)]"
          >
            {hero.secondaryCta}
          </Link>
        </div>
        <p className="mt-8 text-sm text-[var(--muted)]">{hero.trustLine}</p>
      </div>
    </section>
  );
}
