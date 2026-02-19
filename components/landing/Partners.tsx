import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function Partners({
  partners,
}: {
  partners: LandingContent["partners"];
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-5xl">
          {partners.title}
        </h2>
        <p className="mt-6 text-xl text-[var(--muted)]">
          {partners.description}
        </p>
        <Link
          href={partners.ctaHref}
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#1a1a1a] px-8 text-lg font-bold text-[var(--foreground)] transition-colors hover:bg-[#222]"
        >
          {partners.cta}
        </Link>
      </div>
    </section>
  );
}
