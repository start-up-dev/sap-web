"use client";

import { useState, useEffect, use, useCallback, Suspense } from "react";
import { 
  AlertCircle,
  Loader2,
  Lock,
  ExternalLink,
  Timer,
  Clock,
  ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { ReportResponse, Severity } from "@/lib/api/types";
import { AxiosError } from "axios";
import { Badge } from "@/components/ui/badge";
import { SecurityScoreRing } from "@/components/reports/SecurityScoreRing";
import { FindingCard } from "@/components/reports/FindingCard";
import { formatDate, formatDuration } from "@/lib/utils";
import Link from "next/link";

interface PageProps {
  params: Promise<{ token: string }>;
}

function SharedReportContent({ params }: PageProps) {
  const { token } = use(params);
  const router = useRouter();
  
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);

  const fetchPublicReport = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Fetching from the public endpoint defined in the spec
      const response = await api.get<ReportResponse>(`/v1/public/reports/${token}`);
      setReport(response.data);
    } catch (err: unknown) {
      console.error("Error fetching public report:", err);
      const axiosError = err as AxiosError;
      const status = axiosError.response?.status;
      
      let message = "Failed to load shared security report.";
      if (status === 403) message = "This link has been revoked by the owner.";
      if (status === 410) message = "This sharing link has expired (24h limit).";
      if (status === 404) message = "Invalid or missing sharing token.";
      
      setError({ status, message });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPublicReport();
  }, [fetchPublicReport]);

  if (isLoading && !report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
        <p className="text-[#666] font-medium italic">Decrypting secure report access...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Access Error</h1>
        <p className="text-[#999] mb-8 max-w-md">{error?.message || "Something went wrong."}</p>
        <Link href="/">
          <button className="px-6 py-2 bg-[#111] border border-[#222] rounded-lg hover:bg-[#1a1a1a] transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Public Header Bar */}
      <div className="border-b border-[#222] bg-[#050505] py-6 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <ShieldCheck className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="font-black text-xl tracking-tighter">ShipSafe</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#222]" />
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                {report.target_url}
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#666]">
                <span className="flex items-center gap-1 text-emerald-500/80">
                  <Clock className="h-3 w-3" /> Shared Guest View
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  Duration: {formatDuration(report.started_at, report.completed_at)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:block">
            <Badge variant="outline" className="border-yellow-500/20 text-yellow-500 bg-yellow-500/5 py-1 px-3">
              Temporary Link
            </Badge>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Guest Warning */}
        <div className="mb-12 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center gap-3 text-sm text-blue-400">
          <Lock className="h-4 w-4" />
          <span>You are viewing a shared report. For security reasons, sensitive account actions are disabled.</span>
        </div>

        {/* Top Summary Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Score Ring */}
          <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-8 shadow-xl flex flex-col items-center justify-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#666] mb-6">Security Grade</h2>
            <SecurityScoreRing score={report.score} />
          </div>

          {/* Stats & Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-8 shadow-xl">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#666] mb-6">Audit Summary</h2>
              <p className="text-lg text-[#ccc] leading-relaxed">
                ShipSafe&apos;s AI auditor has completed a multi-phase security probe of <span className="text-white font-bold">{report.target_url}</span>. 
                This report was generated on {formatDate(report.generated_at)} and shared for review.
              </p>
              
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
                {(Object.entries(report.stats) as [Severity, number][]).map(([severity, count]) => (
                  <div key={severity} className="text-center p-4 rounded-xl bg-[#111] border border-[#222]">
                    <div className={`text-2xl font-black ${
                      severity === "critical" ? "text-red-500" :
                      severity === "high" ? "text-orange-500" :
                      severity === "medium" ? "text-yellow-500" :
                      severity === "low" ? "text-blue-500" : "text-[#444]"
                    }`}>{count}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#666] mt-1">{severity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Vulnerability Findings</h2>
            <Badge variant="outline" className="border-[#222] text-[#666]">
              {report.findings.length} findings
            </Badge>
          </div>

          <div className="grid gap-4">
            {report.findings.map((finding) => (
              <FindingCard 
                key={finding.id} 
                finding={finding} 
                scanId={report.scan_id} 
                isDeepScan={report.is_deep_scan}
              />
            ))}
          </div>
        </div>

        {/* Footer for Guests */}
        <div className="mt-20 text-center border-t border-[#111] pt-12">
          <h3 className="text-xl font-bold mb-4">Want to audit your own site?</h3>
          <p className="text-[#666] mb-8 max-w-lg mx-auto">
            Get comprehensive, AI-interpreted security audits for just $29. 
            No subscriptions. No expensive pentests.
          </p>
          <Link href="/sign-up">
            <button className="bg-emerald-500 text-black font-black px-8 py-4 rounded-xl hover:bg-emerald-400 transition-all hover:scale-105">
              Start Your First Audit
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function SharedReportPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
      </div>
    }>
      <SharedReportContent params={params} />
    </Suspense>
  );
}
