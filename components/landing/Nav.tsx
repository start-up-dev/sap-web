import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function Nav({ nav }: { nav: LandingContent["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-2"
        >
          <div className="h-6 w-6 rounded-md bg-[var(--accent)]"></div>
          {nav.logo}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={nav.ctaHref}
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-foreground)] transition-transform hover:scale-105"
        >
          {nav.cta}
        </Link>
      </div>
    </header>
  );
}
