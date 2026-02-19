import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function CTA({ cta }: { cta: LandingContent["cta"] }) {
  return (
    <section id="cta" className="relative overflow-hidden bg-[var(--background)] px-4 py-24 sm:px-6 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-5xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-6xl">
          {cta.title}
        </h2>
        <p className="mt-6 text-xl text-[var(--muted)]">
          {cta.subline}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={cta.primaryCtaHref}
            className="inline-flex h-16 min-w-[220px] items-center justify-center rounded-full bg-[var(--accent)] px-8 text-lg font-bold text-[var(--accent-foreground)] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(212,255,63,0.3)]"
          >
            {cta.primaryCta}
          </Link>
          <Link
            href={cta.secondaryCtaHref}
            className="inline-flex h-16 min-w-[220px] items-center justify-center rounded-full border border-[var(--border)] bg-[#111] px-8 text-lg font-bold text-[var(--foreground)] transition-colors hover:bg-[#222]"
          >
            {cta.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
