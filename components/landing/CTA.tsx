import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function CTA({ cta }: { cta: LandingContent["cta"] }) {
  return (
    <section id="cta" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {cta.title}
        </h2>
        <p className="mt-3 text-[var(--muted-foreground)]">{cta.subline}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={cta.primaryCtaHref}
            className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            {cta.primaryCta}
          </Link>
          <Link
            href={cta.secondaryCtaHref}
            className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-6 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--background)]"
          >
            {cta.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
