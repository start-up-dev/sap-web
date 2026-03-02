"use client";

import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export function Nav({ nav }: { nav: {
  readonly logo: string;
  readonly links: readonly {
    readonly label: string;
    readonly href: string;
  }[];
  readonly cta: string;
  readonly ctaHref: string;
} }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-xl font-black tracking-tighter text-white"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform group-hover:scale-105 group-active:scale-95">
            <ShieldCheck className="h-5 w-5 fill-current" />
            <div className="absolute -inset-1 rounded-xl bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {nav.logo}
        </Link>
        
        <nav className="hidden items-center gap-10 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-[13px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-[13px] font-black uppercase tracking-widest text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10">{nav.cta}</span>
              <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-[13px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
