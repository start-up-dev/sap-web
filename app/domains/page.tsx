"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

export default function DomainsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <main className="mx-auto max-w-6xl px-4 py-32 sm:px-6 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Automated Verification</h1>
          <p className="text-xl text-[#999] max-w-2xl">
            Domain verification is now handled automatically. You can start a Deep Audit on any URL immediately from your dashboard.
          </p>
          <Link href="/dashboard">
            <Button className="bg-emerald-500 font-bold hover:bg-emerald-400 h-12 px-8">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
