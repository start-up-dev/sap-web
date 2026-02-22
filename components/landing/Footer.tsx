import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function Footer({ footer }: { footer: LandingContent["footer"] }) {
  return (
    <footer className="border-t border-[#222] bg-black px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900/50 border border-emerald-500/30">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-sm font-medium text-[#666]">
            &copy; {new Date().getFullYear()} {footer.copy}. All rights reserved.
          </p>
        </div>

        <nav className="flex gap-8">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#888] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
