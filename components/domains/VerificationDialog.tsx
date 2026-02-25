"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Loader2, Info, FileCode, Search, Tag, AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/lib/api/client";
import { 
  VerificationMethod, 
  DomainVerificationResponse, 
  DomainResponse 
} from "@/lib/api/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface VerificationDialogProps {
  domain: DomainResponse | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
}

export function VerificationDialog({
  domain,
  isOpen,
  onOpenChange,
  onVerified,
}: VerificationDialogProps) {
  const { getToken } = useAuth();
  const [method, setMethod] = useState<VerificationMethod>("dns_txt");
  
  // Store verification data for each method to avoid redundant fetches
  const [cache, setCache] = useState<Record<string, DomainVerificationResponse>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructions = useCallback(async (targetMethod: VerificationMethod) => {
    if (!domain) return;
    
    // If already in cache, just switch
    if (cache[targetMethod]) {
      setMethod(targetMethod);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken({ template: 'safeship-jwt' });
      
      const response = await api.post(
        `/v1/domains/${domain.id}/verify/`,
        { method: targetMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCache(prev => ({ ...prev, [targetMethod]: response.data }));
      setMethod(targetMethod);
    } catch (err: unknown) {
      console.error("Error fetching instructions:", err);
      const axiosError = err as { response?: { data?: { detail?: string } }, message?: string };
      const msg = axiosError.response?.data?.detail || axiosError.message || "Failed to fetch instructions.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [domain, getToken, cache]);

  // Initial fetch when modal opens
  useEffect(() => {
    if (isOpen && domain && !cache[method]) {
      fetchInstructions(method);
    }
  }, [isOpen, domain, method, cache, fetchInstructions]);

  const checkStatus = async () => {
    if (!domain) return;
    
    try {
      setIsVerifying(true);
      const token = await getToken({ template: 'safeship-jwt' });
      const response = await api.get(`/v1/domains/${domain.id}/verify/status/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.is_verified) {
        toast.success("Domain verified successfully!");
        onVerified();
        onOpenChange(false);
      } else {
        toast.error(response.data.message || "Verification failed. Please check your implementation.");
      }
    } catch (err: unknown) {
      console.error("Error checking verification status:", err);
      const axiosError = err as { response?: { data?: { detail?: string } } };
      toast.error(axiosError.response?.data?.detail || "An error occurred during verification.");
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  const currentData = cache[method];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-[#333] bg-[#111] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Verify {domain?.url}</DialogTitle>
          <DialogDescription className="text-[#999]">
            To enable active testing, we need to confirm you own this domain. 
            Choose one of the methods below.
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue="dns_txt" 
          value={method} 
          onValueChange={(v) => fetchInstructions(v as VerificationMethod)}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-3 bg-black border border-[#222]">
            <TabsTrigger value="dns_txt" className="data-[state=active]:bg-[#222]">
              <Search className="mr-2 h-4 w-4" /> DNS TXT
            </TabsTrigger>
            <TabsTrigger value="file_upload" className="data-[state=active]:bg-[#222]">
              <FileCode className="mr-2 h-4 w-4" /> File Upload
            </TabsTrigger>
            <TabsTrigger value="meta_tag" className="data-[state=active]:bg-[#222]">
              <Tag className="mr-2 h-4 w-4" /> Meta Tag
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 min-h-[300px]">
            {isLoading && !currentData ? (
              <div className="flex h-48 flex-col items-center justify-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <p className="text-[#666]">Preparing instructions...</p>
              </div>
            ) : error && !currentData ? (
              <div className="flex h-48 flex-col items-center justify-center gap-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="text-[#999] max-w-xs">{error}</p>
                <Button variant="outline" onClick={() => fetchInstructions(method)} className="border-[#333]">
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <TabsContent value="dns_txt" className="mt-0 outline-none">
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <InstructionBlock 
                      title="Add a DNS TXT Record"
                      instructions={currentData?.instructions || "Access your DNS provider (e.g. Cloudflare, Namecheap) and add a new TXT record with the value below."}
                      token={currentData?.token}
                      copied={copied}
                      onCopy={copyToClipboard}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="file_upload" className="mt-0 outline-none">
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <InstructionBlock 
                      title="Upload a Verification File"
                      instructions={currentData?.instructions || "Create a file named 'shipsafe-verify.txt' and upload it to your server's root directory so it is accessible at the URL below."}
                      token={currentData?.token}
                      copied={copied}
                      onCopy={copyToClipboard}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="meta_tag" className="mt-0 outline-none">
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <InstructionBlock 
                      title="Add an HTML Meta Tag"
                      instructions={currentData?.instructions || "Copy the meta tag below and paste it into the <head> section of your website's homepage."}
                      token={currentData?.token}
                      copied={copied}
                      onCopy={copyToClipboard}
                    />
                  </div>
                </TabsContent>

                <div className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-xs text-emerald-500/80 leading-relaxed">
                    {method === "dns_txt" 
                      ? "DNS changes can take up to 24 hours to propagate, but usually appear within minutes." 
                      : "File and meta tag methods are typically near-instant once deployed."}
                  </p>
                </div>
              </>
            )}
          </div>
        </Tabs>

        <DialogFooter className="mt-6 border-t border-[#222] pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#333] text-white hover:bg-[#222]"
          >
            Cancel
          </Button>
          <Button
            onClick={checkStatus}
            disabled={isVerifying || !currentData || isLoading}
            className="bg-emerald-500 font-bold hover:bg-emerald-400 min-w-[120px]"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InstructionBlock({ 
  title, 
  instructions, 
  token, 
  copied, 
  onCopy 
}: { 
  title: string, 
  instructions: string, 
  token?: string,
  copied: boolean,
  onCopy: (t: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-[#999] leading-relaxed">
          {instructions}
        </p>
      </div>

      <div className="rounded-lg border border-[#222] bg-black p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#666]">
            Required Value
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => token && onCopy(token)}
            className="h-7 px-2 hover:bg-[#222]"
            disabled={!token}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <div className="relative">
          <code className={`block break-all font-mono text-sm ${token ? "text-emerald-400" : "text-[#333] animate-pulse"}`}>
            {token || "Generating security token..."}
          </code>
        </div>
      </div>
    </div>
  );
}
