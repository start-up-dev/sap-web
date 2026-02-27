"use client";

import { useState, useEffect, use, useRef } from "react";
import { 
  Loader2, 
  Search, 
  Cpu, 
  FileSearch, 
  BarChart, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Mail,
  Zap,
  Activity
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api/client";
import { ScanStatusResponse } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        const token = await getToken({ template: 'safeship-jwt' });
        const response = await api.get(`/v1/scans/${id}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = response.data as ScanStatusResponse;
        setStatus(data);

        if (data.status === "completed") {
          toast.success("Scan completed! Redirecting to report...");
          router.push(`/reports/${id}`);
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
    { 
      id: "queued", 
      label: "Job Queued", 
      icon: Clock,
      description: "Audit request received. Waiting for an isolated security worker instance to initialize."
    },
    { 
      id: "crawling", 
      label: "System Discovery", 
      icon: Search,
      description: "Mapping application structure, identifying all pages, forms, and API endpoints using Playwright."
    },
    { 
      id: "scanning", 
      label: "Active Vulnerability Testing", 
      icon: Cpu,
      description: "Probing for SQL injection, XSS, and infrastructure flaws with parallel security tools (ZAP, Nikto, Nmap)."
    },
    { 
      id: "analyzing", 
      label: "AI Threat Interpretation", 
      icon: FileSearch,
      description: "Gemini 2.5 Pro is analyzing technical results to deduplicate findings and generate remediation steps."
    },
    { 
      id: "generating_report", 
      label: "Finalizing Audit", 
      icon: BarChart,
      description: "Calculating security score and compiling your comprehensive PDF audit report."
    },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === status?.phase) || 0;

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardHeader />
        <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-20 w-20 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20"
          >
            <AlertCircle className="h-10 w-10 text-red-500" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Scan Failed</h1>
          <p className="text-muted-foreground mb-8 max-w-md">{error}</p>
          <Button onClick={() => router.push("/dashboard")} variant="outline" className="border-white/10 hover:bg-white/5">
            Return to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <DashboardHeader />
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Title and Descriptions */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500 bg-emerald-500/5 px-3 py-1">
                  <Activity className="h-3 w-3 mr-2 animate-pulse" />
                  Live Audit in Progress
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
                  Securing Your Application
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Our autonomous AI agent is currently probing your target for 38+ vulnerability categories.
                </p>
              </motion.div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Estimated Time</h3>
                  <p className="text-sm text-muted-foreground">Typically takes 15 to 30 minutes for a comprehensive deep audit.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Automated Notification</h3>
                  <p className="text-sm text-muted-foreground">We&apos;ll message you via email once the full report is ready for review.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Real-time Dashboard</h3>
                  <p className="text-sm text-muted-foreground">You can safely close this page; the audit will continue in the background.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Progress Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-white/10 bg-white/[0.02] backdrop-blur-2xl p-1 sm:p-2 overflow-hidden shadow-2xl">
                <div className="bg-black/40 rounded-[calc(var(--radius)-4px)] p-6 sm:p-8">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                        Current Phase
                      </p>
                      <h2 className="text-xl font-bold text-white">
                        {status?.phase?.replace("_", " ") || "Initializing..."}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-white">
                        {status?.progress || 0}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced progress bar */}
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-10 border border-white/5 relative">
                    <motion.div 
                      className="absolute inset-0 bg-emerald-500/20"
                      initial={{ width: 0 }}
                      animate={{ width: `${status?.progress || 0}%` }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="h-full bg-emerald-500 relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${status?.progress || 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }} />
                    </motion.div>
                  </div>

                  <div className="space-y-8 relative">
                    {/* Connecting line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/5 z-0" />
                    
                    {phases.map((phase, index) => {
                      const isCompleted = index < currentPhaseIndex || status?.status === "completed";
                      const isCurrent = index === currentPhaseIndex;
                      const Icon = phase.icon;

                      return (
                        <div key={phase.id} className="relative z-10 flex gap-6">
                          <motion.div 
                            animate={isCurrent ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500 ${
                              isCompleted ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" :
                              isCurrent ? "bg-black border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" :
                              "bg-black border-white/10 text-white/20"
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                          </motion.div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className={`font-bold transition-colors duration-500 ${isCompleted || isCurrent ? "text-white" : "text-white/20"}`}>
                                {phase.label}
                              </p>
                              {isCurrent && <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />}
                            </div>
                            <AnimatePresence mode="wait">
                              {(isCurrent || isCompleted) && (
                                <motion.p 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className={`text-sm leading-relaxed transition-colors duration-500 ${
                                    isCurrent ? "text-emerald-500/80" : "text-muted-foreground/60"
                                  }`}
                                >
                                  {isCurrent ? (status?.message || phase.description) : phase.description}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Toaster position="top-right" theme="dark" />
      
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
