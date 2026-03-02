"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer({ footer }: { footer: {
  readonly copy: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly links: readonly {
    readonly label: string;
    readonly href: string;
  }[];
} }) {
  return (
    <footer className="bg-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-black tracking-tighter text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <ShieldCheck className="h-6 w-6 fill-current" />
              </div>
              {footer.copy}
            </Link>
            <p className="mt-8 max-w-xs text-lg font-bold leading-relaxed text-white/20">
              The AI-powered security layer for modern app builders.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-8">Navigation</p>
            <nav className="flex flex-col gap-4">
              {footer.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-bold text-white/20 transition-colors hover:text-emerald-500"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-8">Legal</p>
            <div className="flex flex-col gap-4">
              <Link href="/privacy" className="text-[15px] font-bold text-white/20 transition-colors hover:text-emerald-500">Privacy Policy</Link>
              <Link href="/terms" className="text-[15px] font-bold text-white/20 transition-colors hover:text-emerald-500">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
          <p className="text-sm font-bold text-white/10 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {footer.copy}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-6 py-2.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              Created by
            </span>
            <a 
              href={footer.companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-black text-white/40 transition-colors hover:text-white"
            >
              {footer.company}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
