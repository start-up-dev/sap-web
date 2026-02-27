"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { 
  ShieldCheck, 
  History, 
  Plus, 
  Search, 
  Loader2, 
  ArrowRight,
  ExternalLink,
  Timer
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api/client";
import { ScanResponse, DomainResponse } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { formatDate, formatDuration } from "@/lib/utils";
import { UpgradeButton } from "@/components/payment/UpgradeButton";
import { AxiosError } from "axios";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function DashboardContent() {
  const { getToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlFromQuery = searchParams.get("url");

  const [scans, setScans] = useState<ScanResponse[]>([]);
  const [domains, setDomains] = useState<DomainResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingScan, setIsStartingScan] = useState(false);
  const [url, setUrl] = useState(urlFromQuery || "");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await getToken({ template: 'safeship-jwt' });
      
      const [scansRes, domainsRes] = await Promise.all([
        api.get("/v1/scans", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/v1/domains", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setScans(scansRes.data);
      setDomains(domainsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStartScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url) return;

    try {
      setIsStartingScan(true);
      const token = await getToken({ template: 'safeship-jwt' });
      
      // Determine if it should be a deep scan (if domain is verified)
      const normalizedInputUrl = url.trim().toLowerCase();
      const domainMatch = domains.find(d => {
        const domainStr = d?.domain_name || d?.url;
        if (!domainStr) return false;
        const normalizedDomain = domainStr.toLowerCase().replace(/^https?:\/\//, "");
        return normalizedInputUrl.includes(normalizedDomain);
      });
      
      const isDeepScan = Boolean(domainMatch?.is_verified);

      const response = await api.post("/v1/scans", 
        { 
          target_url: url.trim(), 
          domain_id: domainMatch?.id,
          is_deep_scan: isDeepScan 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const scanId = response.data.id;

      // If it's a deep scan, we need to initiate payment immediately
      if (isDeepScan) {
        toast.info("Initiating secure checkout...");
        const checkoutRes = await api.post("/v1/payments/checkout", 
          { 
            scan_id: scanId,
            success_url: `${window.location.origin}/payment/success`,
            cancel_url: `${window.location.origin}/dashboard`
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (checkoutRes.data.checkout_url) {
          window.location.href = checkoutRes.data.checkout_url;
          return;
        }
      }

      toast.success("Scan initiated successfully.");
      router.push(`/scans/${scanId}`);
    } catch (error: unknown) {
      console.error("Error starting scan:", error);
      const axiosError = error as AxiosError<{ detail?: string | Array<{ loc: string[]; msg: string }> }>;
      
      // Handle 403 Forbidden (Domain not verified)
      if (axiosError.response?.status === 403) {
        toast.error("Domain verification required for Deep Audits.");
        router.push("/domains");
        return;
      }

      let errorMessage = "Failed to start scan.";
      
      const detail = axiosError.response?.data?.detail;
      
      if (Array.isArray(detail)) {
        errorMessage = detail.map((err) => `${err.loc.join(".")}: ${err.msg}`).join(", ");
      } else if (typeof detail === "string") {
        errorMessage = detail;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsStartingScan(false);
    }
  };

  // If a URL was passed from the Hero, handle it
  useEffect(() => {
    const pendingUrl = localStorage.getItem("pending_scan_url");
    if (pendingUrl && !urlFromQuery) {
      setUrl(pendingUrl);
      localStorage.removeItem("pending_scan_url");
    }
  }, [urlFromQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
        <p className="mt-2 text-[#999]">
          Monitor your applications and run new security audits.
        </p>
      </div>

      {/* Quick Actions / New Scan */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <div className="md:col-span-2 rounded-2xl border border-[#222] bg-[#0a0a0a] p-6 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-emerald-500" /> Start New Scan
          </h2>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <Input
                placeholder="https://your-app.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 border-[#333] bg-black text-white h-12"
              />
            </div>
            <Button 
              type="submit"
              disabled={isStartingScan || !url}
              className="bg-emerald-500 font-bold hover:bg-emerald-400 h-12 px-8"
            >
              {isStartingScan ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run Audit"}
            </Button>
          </form>
          <p className="mt-3 text-xs text-[#666]">
            Free quick scans for any URL. Deep audits require domain verification.
          </p>
        </div>

        <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-6 shadow-xl flex flex-col justify-center text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold">{domains.filter(d => d.is_verified).length} Verified Domains</h3>
          <Link href="/domains" className="mt-2 text-sm text-emerald-500 hover:underline flex items-center justify-center gap-1">
            Manage Domains <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="rounded-xl border border-[#222] bg-[#0a0a0a] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#222] flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            <History className="h-5 w-5 text-[#666]" /> Recent Scans
          </h2>
        </div>
        
        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <p className="text-[#666]">Loading scan history...</p>
          </div>
        ) : scans.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-center px-4">
            <p className="text-[#666]">No scans found yet. Start your first audit above.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="border-[#222]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[#666]">Target URL</TableHead>
                <TableHead className="text-[#666]">Type</TableHead>
                <TableHead className="text-[#666]">Status</TableHead>
                <TableHead className="text-[#666]">Duration</TableHead>
                <TableHead className="text-[#666]">Date</TableHead>
                <TableHead className="text-right text-[#666]">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan) => (
                <TableRow key={scan.id} className="border-[#222] hover:bg-[#111]/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[200px] sm:max-w-xs">{scan.target_url}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {scan.is_deep_scan ? (
                      <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5">
                        Deep Audit
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[#666] border-[#333]">
                        Quick Scan
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      scan.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border-none" :
                      scan.status === "failed" ? "bg-red-500/10 text-red-500 border-none" :
                      "bg-blue-500/10 text-blue-500 border-none"
                    }>
                      {scan.status.charAt(0).toUpperCase() + scan.status.slice(1).replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#666]">
                    <div className="flex items-center gap-1.5">
                      <Timer className="h-3.5 w-3.5" />
                      {formatDuration(scan.started_at || scan.created_at, scan.completed_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#666]">
                    {formatDate(scan.started_at || scan.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    {scan.is_deep_scan && !scan.is_paid ? (
                      <UpgradeButton 
                        scanId={scan.id} 
                        size="sm" 
                        variant="outline" 
                        className="text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10"
                      >
                        Complete Payment
                      </UpgradeButton>
                    ) : scan.status === "completed" ? (
                      <Link href={`/reports/${scan.id}`}>
                        <Button size="sm" variant="ghost" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 gap-1">
                          View Report <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    ) : scan.status === "failed" ? (
                      <span className="text-red-500 text-sm">Failed</span>
                    ) : (
                      <Link href={`/scans/${scan.id}`}>
                        <Button size="sm" variant="ghost" className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 gap-1">
                          Track Progress <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <Suspense fallback={
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      }>
        <DashboardContent />
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
}
