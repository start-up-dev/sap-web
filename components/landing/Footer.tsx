import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function Footer({ footer }: { footer: LandingContent["footer"] }) {
  return (
    <footer className="border-t border-[var(--border)] bg-[#000] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">
          &copy; {new Date().getFullYear()} {footer.copy}
        </p>
        <nav className="flex gap-8">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
