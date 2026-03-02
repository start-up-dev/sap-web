"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { 
  History, 
  Plus, 
  Search, 
  Loader2, 
  ArrowRight,
  ExternalLink,
  Timer,
  Settings2,
  Lock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api/client";
import { ScanResponse } from "@/lib/api/types";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { formatDate, formatDuration } from "@/lib/utils";
import { UpgradeButton } from "@/components/payment/UpgradeButton";
import { AxiosError } from "axios";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function DashboardContent() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlFromQuery = searchParams.get("url");

  const [scans, setScans] = useState<ScanResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingScan, setIsStartingScan] = useState(false);
  const [url, setUrl] = useState(urlFromQuery || "");
  const [scanType, setScanType] = useState<"quick" | "deep">("quick");
  const [urlError, setUrlError] = useState<string | null>(null);

  // Advanced Auth Options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [authHeaderName, setAuthHeaderName] = useState("Authorization");
  const [authHeaderValue, setAuthHeaderValue] = useState("");

  const isValidUrl = (urlString: string) => {
    try {
      // Basic check for protocol and domain
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );
      return !!pattern.test(urlString);
    } catch (e) {
      return false;
    }
  };

  const fetchData = useCallback(async () => {
    // Wait for auth to be loaded and ensure the user is signed in
    if (!isLoaded || !isSignedIn) return;

    try {
      setIsLoading(true);
      const token = await getToken({ template: 'safeship-jwt' });
      
      if (!token) {
        console.warn("No token available for dashboard fetch. Clerk session might still be initializing.");
        return;
      }
      
      const response = await api.get("/v1/scans", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      setScans(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, [getToken, isLoaded, isSignedIn]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchData();
    }
  }, [fetchData, isLoaded, isSignedIn]);

  const handleStartScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url || !isLoaded || !isSignedIn) return;

    const trimmedUrl = url.trim();
    
    if (!isValidUrl(trimmedUrl)) {
      setUrlError("Please enter a valid website or API URL (e.g., https://example.com)");
      return;
    }

    setUrlError(null);

    try {
      setIsStartingScan(true);
      const token = await getToken({ template: 'safeship-jwt' });
      
      if (!token) {
        toast.error("Auth session expired. Please refresh the page.");
        return;
      }
      
      const isDeepScan = scanType === "deep";

      const response = await api.post("/v1/scans", 
        { 
          target_url: trimmedUrl, 
          is_deep_scan: isDeepScan,
          auth_header_name: authHeaderValue ? authHeaderName : undefined,
          auth_header_value: authHeaderValue || undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const scanId = response.data.id;
      const isPaid = response.data.is_paid;

      // If it's a deep scan AND not paid yet, we need to initiate payment immediately
      if (isDeepScan && !isPaid) {
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

      toast.success(isDeepScan ? "Deep Audit initiated." : "Quick Scan initiated.");
      router.push(`/scans/${scanId}`);
    } catch (error: unknown) {
      console.error("Error starting scan:", error);
      const axiosError = error as AxiosError<{ detail?: string | Array<{ loc: string[]; msg: string }> }>;
      
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
      <div className="grid gap-6 md:grid-cols-4 mb-12">
        <div className="md:col-span-4 rounded-2xl border border-[#222] bg-[#0a0a0a] p-6 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-500" /> Start New Scan
            </h2>
            
            <Tabs 
              defaultValue="quick" 
              value={scanType} 
              onValueChange={(v) => setScanType(v as "quick" | "deep")}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] border-[#333]">
                <TabsTrigger 
                  value="quick" 
                  className="data-[state=active]:bg-black data-[state=active]:text-white text-[#999]"
                >
                  Quick Scan (Free)
                </TabsTrigger>
                <TabsTrigger 
                  value="deep"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-[#999]"
                >
                  Deep Audit ($29)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <form onSubmit={handleStartScan} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                <Input
                  placeholder="https://your-app.com"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (urlError) setUrlError(null);
                  }}
                  className={`pl-10 border-[#333] bg-black text-white h-12 focus:border-emerald-500/50 transition-colors ${
                    urlError ? "border-red-500/50 focus:border-red-500/50" : ""
                  }`}
                />
              </div>
              <Button 
                type="submit"
                disabled={isStartingScan || !url}
                className={`font-bold h-12 px-8 transition-all duration-300 ${
                  scanType === 'deep' 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {isStartingScan ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                 scanType === 'deep' ? "Start Deep Audit" : "Run Quick Scan"}
              </Button>
            </div>

            {/* Advanced Options Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-[#666] hover:text-white flex items-center gap-1.5 transition-colors group"
              >
                <Settings2 className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-300" />
                Advanced: Authentication Headers
                {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>

              {showAdvanced && (
                <div className="mt-4 p-4 rounded-xl bg-black border border-[#222] grid gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#444] ml-1">Header Name</label>
                      <select 
                        value={authHeaderName}
                        onChange={(e) => setAuthHeaderName(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] rounded-lg h-10 px-3 text-xs text-white focus:border-emerald-500/50 outline-none"
                      >
                        <option value="Authorization">Authorization</option>
                        <option value="Cookie">Cookie</option>
                        <option value="X-API-Key">X-API-Key</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#444] ml-1">Header Value (Token/Session)</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#444]" />
                        <Input 
                          placeholder="Bearer eyJhbGci..."
                          value={authHeaderValue}
                          onChange={(e) => setAuthHeaderValue(e.target.value)}
                          className="pl-9 bg-[#111] border border-[#333] h-10 text-xs text-white focus:border-emerald-500/50"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#666] italic leading-relaxed">
                    Optional: Use this if your application requires an active session to reach internal pages or APIs. 
                    ShipSafe workers will use this header for all authenticated probes.
                  </p>
                </div>
              )}
            </div>
          </form>
          
          {urlError && (
            <p className="mt-2 text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
              {urlError}
            </p>
          )}
          
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#666]">
            {scanType === 'quick' ? (
              <p className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Passive, read-only scan that finds common vulnerabilities in minutes.
              </p>
            ) : (
              <p className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Active exploit-testing across 38+ vulnerability categories. No verification required.
              </p>
            )}
          </div>
        </div>

        {/* Commented out Verified Domains card for now
        <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-6 shadow-xl flex flex-col justify-center text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold">{domains.filter(d => d.is_verified).length} Verified Domains</h3>
          <Link href="/domains" className="mt-2 text-sm text-emerald-500 hover:underline flex items-center justify-center gap-1">
            Manage Domains <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        */}
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
