import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function Partners({
  partners,
}: {
  partners: LandingContent["partners"];
}) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {partners.title}
        </h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          {partners.description}
        </p>
        <Link
          href={partners.ctaHref}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          {partners.cta}
        </Link>
      </div>
    </section>
  );
}
