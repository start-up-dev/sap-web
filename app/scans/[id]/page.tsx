"use client";

import { useState, useEffect, use, useRef } from "react";
import { 
  Loader2, 
  Shield, 
  Search, 
  Cpu, 
  FileSearch, 
  BarChart, 
  CheckCircle2, 
  AlertCircle,
  Clock
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { ScanStatusResponse } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/landing/Nav";
import { landingContent } from "@/content/landing";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ScanProgressPage({ params }: PageProps) {
  const { id } = use(params);
  const { getToken } = useAuth();
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  const [status, setStatus] = useState<ScanStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const token = await getToken();
        const response = await api.get(`/v1/scans/${id}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = response.data as ScanStatusResponse;
        setStatus(data);

        if (data.status === "completed") {
          toast.success("Scan completed! Redirecting to report...");
          setTimeout(() => router.push(`/reports/${id}`), 2000);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else if (data.status === "failed") {
          setError("Scan failed. Please check the target URL and try again.");
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    pollStatus();
    intervalRef.current = setInterval(pollStatus, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id, getToken, router]);

  const phases = [
    { id: "queued", label: "Queued", icon: Clock },
    { id: "crawling", label: "Crawling", icon: Search },
    { id: "scanning", label: "Scanning", icon: Cpu },
    { id: "analyzing", label: "Analyzing", icon: FileSearch },
    { id: "generating_report", label: "Finalizing", icon: BarChart },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === status?.phase) || 0;

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Nav nav={landingContent.nav} />
        <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Scan Failed</h1>
          <p className="text-[#999] mb-8 max-w-md">{error}</p>
          <Button onClick={() => router.push("/dashboard")} className="bg-[#222] hover:bg-[#333]">
            Return to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav nav={landingContent.nav} />
      
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6 animate-pulse">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Audit in Progress
          </h1>
          <p className="mt-4 text-lg text-[#999]">
            Our AI agent is currently probing your application for vulnerabilities.
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-8 shadow-2xl relative overflow-hidden">
          {/* Progress fill background effect */}
          <div 
            className="absolute inset-0 bg-emerald-500/5 transition-all duration-1000 ease-in-out" 
            style={{ width: `${status?.progress || 0}%` }}
          />
          
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-500">
                {status?.phase?.replace("_", " ") || "Initializing..."}
              </span>
              <span className="text-2xl font-black text-white">
                {status?.progress || 0}%
              </span>
            </div>
            
            {/* Custom progress bar since we might not have the shadcn one yet */}
            <div className="h-3 w-full bg-[#222] rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${status?.progress || 0}%` }}
              />
            </div>

            <div className="space-y-6">
              {phases.map((phase, index) => {
                const isCompleted = index < currentPhaseIndex || status?.status === "completed";
                const isCurrent = index === currentPhaseIndex;
                const Icon = phase.icon;

                return (
                  <div key={phase.id} className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                      isCompleted ? "bg-emerald-500 border-emerald-500 text-black" :
                      isCurrent ? "border-emerald-500 text-emerald-500 animate-pulse" :
                      "border-[#222] text-[#444]"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${isCompleted || isCurrent ? "text-white" : "text-[#444]"}`}>
                        {phase.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-emerald-500/80 animate-in fade-in slide-in-from-left-2">
                          {status?.message}
                        </p>
                      )}
                    </div>
                    {isCurrent && <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-[#666] text-sm">
            <Clock className="h-4 w-4" />
            <span>Estimated time remaining: {Math.ceil((status?.estimated_remaining_seconds || 0) / 60)} minutes</span>
          </div>
          <p className="text-xs text-[#444] max-w-md">
            You can safely close this window. We&apos;ll email you a link to the full report once it&apos;s ready.
          </p>
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}
