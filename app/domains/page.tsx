"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Globe, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/lib/api/client";
import { DomainResponse } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { VerificationDialog } from "@/components/domains/VerificationDialog";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DomainsPage() {
  const { getToken } = useAuth();
  const [domains, setDomains] = useState<DomainResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Verification states
  const [selectedDomain, setSelectedDomain] = useState<DomainResponse | null>(null);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const fetchDomains = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await getToken({ template: 'safeship-jwt' });
      const response = await api.get("/v1/domains", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDomains(response.data);
    } catch (error) {
      console.error("Error fetching domains:", error);
      toast.error("Failed to load domains. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handleAddDomain = async () => {
    if (!newUrl) return;
    
    // Ensure URL has a scheme (https:// by default if missing)
    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }
    // Remove trailing slash
    formattedUrl = formattedUrl.replace(/\/$/, "");
    
    try {
      setIsAdding(true);
      const token = await getToken({ template: 'safeship-jwt' });
      const response = await api.post("/v1/domains", { domain_name: formattedUrl }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Domain added successfully.");
      setIsAddDialogOpen(false);
      setNewUrl("");
      
      // Auto-open verification for the new domain
      setSelectedDomain(response.data);
      setIsVerifyDialogOpen(true);
      
      fetchDomains();
    } catch (error: unknown) {
      console.error("Error adding domain:", error);
      let errorMessage = "Failed to add domain.";
      
      const axiosError = error as { 
        response?: { 
          data?: { 
            detail?: string | Array<{ loc: string[]; msg: string }> 
          } 
        } 
      };

      const detail = axiosError.response?.data?.detail;
      
      if (Array.isArray(detail)) {
        errorMessage = detail.map((err) => `${err.loc.join(".")}: ${err.msg}`).join(", ");
      } else if (typeof detail === "string") {
        errorMessage = detail;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  const handleVerifyClick = (domain: DomainResponse) => {
    setSelectedDomain(domain);
    setIsVerifyDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Verified Domains</h1>
            <p className="mt-2 text-[#999]">
              Manage the domains you own to enable Deep Security Audits.
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 font-bold hover:bg-emerald-400">
                <Plus className="mr-2 h-4 w-4" /> Add Domain
              </Button>
            </DialogTrigger>
            <DialogContent className="border-[#333] bg-[#111] text-white">
              <DialogHeader>
                <DialogTitle>Add New Domain</DialogTitle>
                <DialogDescription className="text-[#999]">
                  Enter the domain you want to audit. You&apos;ll need to verify ownership before running deep scans.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="url" className="text-sm font-medium">
                    Domain URL
                  </label>
                  <Input
                    id="url"
                    placeholder="example.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="border-[#333] bg-black text-white placeholder:text-[#666]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-[#333] text-white hover:bg-[#222]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddDomain}
                  disabled={isAdding || !newUrl}
                  className="bg-emerald-500 font-bold hover:bg-emerald-400"
                >
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Domain"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-10 rounded-xl border border-[#222] bg-[#0a0a0a] overflow-hidden">
          {isLoading ? (
            <div className="flex h-64 flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <p className="text-[#666]">Loading domains...</p>
            </div>
          ) : domains.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-4 text-center px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">No domains found</p>
                <p className="text-[#666]">Add your first domain to start running security audits.</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(true)}
                className="border-[#333] text-white hover:bg-[#222]"
              >
                Get Started
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader className="border-[#222]">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[#666]">Domain</TableHead>
                  <TableHead className="text-[#666]">Status</TableHead>
                  <TableHead className="text-[#666]">Security Score</TableHead>
                  <TableHead className="text-[#666]">Last Scan</TableHead>
                  <TableHead className="text-right text-[#666]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domains.map((domain) => (
                  <TableRow key={domain.id} className="border-[#222] hover:bg-[#111]/50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-[#666]" />
                        {domain.domain_name || domain.url || "Unknown Domain"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {domain.is_verified ? (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none">
                          <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/5">
                          <ShieldAlert className="mr-1 h-3 w-3" /> Needs Verification
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {domain.security_score !== null ? (
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${
                            domain.security_score >= 90 ? "text-emerald-500" :
                            domain.security_score >= 70 ? "text-yellow-500" :
                            "text-red-500"
                          }`}>
                            {domain.security_score}
                          </span>
                          <span className="text-xs text-[#666]">/ 100</span>
                        </div>
                      ) : (
                        <span className="text-[#444]">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-[#666]">
                      {domain.last_scan_date ? new Date(domain.last_scan_date).toLocaleDateString() : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!domain.is_verified && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleVerifyClick(domain)}
                            className="border-[#333] hover:bg-[#222]"
                          >
                            Verify
                          </Button>
                        )}
                        <Button size="sm" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                          Scan Now
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <VerificationDialog 
        domain={selectedDomain}
        isOpen={isVerifyDialogOpen}
        onOpenChange={setIsVerifyDialogOpen}
        onVerified={fetchDomains}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}
