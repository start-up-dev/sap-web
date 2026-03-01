"use client";

import { useState } from "react";
import { 
  Copy, 
  Check, 
  Clock, 
  Shield, 
  ExternalLink,
  Info
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { formatDate, cn } from "@/lib/utils";

interface ShareReportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
  expiresAt: string;
  targetUrl: string;
}

export function ShareReportDialog({ 
  isOpen, 
  onOpenChange, 
  shareUrl, 
  expiresAt,
  targetUrl 
}: ShareReportDialogProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-[#222] text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full" />
        
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Shield className="h-5 w-5 text-emerald-500" />
            Share Security Audit
          </DialogTitle>
          <DialogDescription className="text-[#666] pt-1">
            Generate a secure, time-bound link for <span className="text-white font-medium">{targetUrl}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#444]">
              <span>Public Share Link</span>
              <span className="flex items-center gap-1 text-emerald-500/80 lowercase">
                <Clock className="h-3 w-3" /> active for 24h
              </span>
            </div>
            <div className="flex gap-2 p-1 bg-black rounded-xl border border-[#222] focus-within:border-emerald-500/50 transition-colors">
              <Input 
                value={shareUrl} 
                readOnly 
                className="bg-transparent border-none text-sm font-mono text-emerald-400 focus-visible:ring-0 h-10 px-3"
              />
              <Button 
                onClick={handleCopy}
                size="sm"
                className={cn(
                  "shrink-0 rounded-lg transition-all",
                  isCopied ? "bg-emerald-500 text-black hover:bg-emerald-400" : "bg-[#111] text-white hover:bg-[#222]"
                )}
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-[#111]/50 border border-[#222] p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Info className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="text-xs text-[#999] leading-relaxed">
                This link grants <span className="text-white">read-only access</span> to this specific report. It will automatically expire on <span className="text-white font-medium">{formatDate(expiresAt)}</span>.
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="w-full flex flex-col gap-3">
            <Button 
              className="w-full bg-white text-black hover:bg-[#ddd] font-bold rounded-xl h-11"
              onClick={() => window.open(shareUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Preview Guest View
            </Button>
            <p className="text-[10px] text-center text-[#444] uppercase tracking-widest">
              Secured by ShipSafe Auth Gateway
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
