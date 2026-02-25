"use client";

import { useState, useEffect, use, useCallback, Suspense } from "react";
import { 
  Download, 
  Share2, 
  ExternalLink, 
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api/client";
import { ReportResponse, Severity, ReportDownloadResponse } from "@/lib/api/types";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SecurityScoreRing } from "@/components/reports/SecurityScoreRing";
import { FindingCard } from "@/components/reports/FindingCard";
import Link from "next/link";
import { UpgradeButton } from "@/components/payment/UpgradeButton";
import { formatDate, formatDuration } from "@/lib/utils";
import { Timer } from "lucide-react";

interface PageProps {
  params: Promise<{ scan_id: string }>;
}

function ReportContent({ params }: PageProps) {
  const { scan_id } = use(params);
  const { getToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);

  const fetchReport = useCallback(async () => {
    try {
      setError(null);
      const token = await getToken({ template: 'safeship-jwt' });
      const response = await api.get(`/v1/reports/${scan_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(response.data);
    } catch (err: unknown) {
      console.error("Error fetching report:", err);
      const axiosError = err as AxiosError;
      const status = axiosError.response?.status;
      const message = status === 403 
        ? "Access Denied: You do not have permission to view this report."
        : "Failed to load audit report.";
      
      setError({ status, message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [scan_id, getToken]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Security Audit Report - ${report?.target_url}`,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      toast.info("Preparing PDF report...");
      const token = await getToken({ template: 'safeship-jwt' });
      const response = await api.get<ReportDownloadResponse>(`/v1/reports/${scan_id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.download_url) {
        window.open(response.data.download_url, "_blank");
        toast.success("Download started!");
      } else {
        throw new Error("Download URL not found in response");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to generate download link. Please try again later.");
    }
  };

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("Payment confirmed! Your full report is now unlocked.");
      fetchReport();
      // Remove the query param without refreshing the page
      router.replace(`/reports/${scan_id}`);
    }
  }, [paymentStatus, scan_id, router, fetchReport]);

  if (isLoading && !report) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="flex h-[80vh] flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
          <p className="text-[#666] font-medium">Generating your security report...</p>
        </main>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="flex h-[80vh] flex-col items-center justify-center p-4 text-center">
          {error?.status === 403 ? (
            <>
              <Lock className="h-12 w-12 text-yellow-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
              <p className="text-[#999] mb-8 max-w-md">{error.message}</p>
            </>
          ) : (
            <>
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Report Not Found</h1>
              <p className="text-[#999] mb-8">We couldn&apos;t find the report you&apos;re looking for.</p>
            </>
          )}
          <Button onClick={() => router.push("/dashboard")} className="bg-[#222]">
            Back to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  const isFreeScan = report.findings.some(f => !f.unlocked);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header Bar */}
      <div className="border-b border-[#222] bg-[#050505] py-6 sticky top-0 z-40 backdrop-blur-md bg-opacity-80 print:hidden">
        <div className="mx-auto max-w-6xl px-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-[#666] hover:text-white px-0">
                <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-[#222]" />
            <div>
              <h1 className="text-xl font-bold">
                <a 
                  href={report.target_url.startsWith('http') ? report.target_url : `https://${report.target_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
                >
                  {report.target_url}
                  <ExternalLink className="h-3 w-3 text-[#444]" />
                </a>
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#666]">
                <span>Audit generated on {formatDate(report.generated_at)}</span>
                <span className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  Duration: {formatDuration(report.started_at, report.completed_at)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#333] hover:bg-[#111]"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            {isFreeScan ? (
              <UpgradeButton scanId={report.scan_id || Number(scan_id)} className="bg-emerald-500 font-bold hover:bg-emerald-400">
                Upgrade Audit
              </UpgradeButton>
            ) : (
              <Button 
                size="sm" 
                className="bg-white text-black hover:bg-[#ddd]"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#666] mb-6">Executive Summary</h2>
              <p className="text-lg text-[#ccc] leading-relaxed">
                ShipSafe&apos;s AI auditor has completed a multi-phase security probe of <span className="text-white font-bold">{report.target_url}</span>. 
                We discovered <span className="text-white font-bold">{report.findings.length} findings</span> across 18 vulnerability categories. 
                {report.score >= 90 ? " Your application shows strong security hygiene." : " Immediate action is recommended to address critical issues."}
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
              Showing {report.findings.length} issues
            </Badge>
          </div>

          {isFreeScan && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Unlock Full Audit Details</h3>
                  <p className="text-sm text-[#999] max-w-md mt-1">
                    Free scans only show partial results. Upgrade to a Deep Audit to unlock all findings, remediation steps, and technical proof.
                  </p>
                </div>
              </div>
              <UpgradeButton 
                scanId={report.scan_id || Number(scan_id)}
                className="bg-emerald-500 font-bold hover:bg-emerald-400 h-12 px-8 shadow-xl shadow-emerald-500/20"
              >
                Unlock Everything — $29
              </UpgradeButton>
            </div>
          )}

          <div className="grid gap-4">
            {report.findings.map((finding) => (
              <FindingCard 
                key={finding.id} 
                finding={finding} 
                scanId={Number(scan_id)} 
                isDeepScan={report.is_deep_scan}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}

export default function ReportPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
      </div>
    }>
      <ReportContent params={params} />
    </Suspense>
  );
}
