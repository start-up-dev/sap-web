import Link from "next/link";
import { ShieldCheck, LayoutDashboard, Globe } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[var(--accent)] to-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:inline">ShipSafe</span>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-white/5 rounded-md"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/domains"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-white/5 rounded-md"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Domains</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
