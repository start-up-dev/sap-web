import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function Footer({ footer }: { footer: LandingContent["footer"] }) {
  return (
    <footer className="border-t border-[#111] bg-black px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-10 sm:flex-row">
          
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {footer.copy}
              </span>
            </div>
            <p className="text-sm font-medium text-[#555] text-center sm:text-left">
              &copy; {new Date().getFullYear()} {footer.copy}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-6">
            <nav className="flex gap-8">
              {footer.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#888] transition-all hover:text-white hover:translate-y-[-1px]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#222] bg-[#050505] hover:border-[#333] transition-colors group">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#444] group-hover:text-[#666] transition-colors">
                A product by
              </span>
              <a 
                href={footer.companyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-black text-[#999] hover:text-white transition-colors flex items-center gap-1"
              >
                {footer.company}
                <div className="h-1 w-1 rounded-full bg-emerald-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
