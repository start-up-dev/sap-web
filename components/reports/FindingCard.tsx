"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  ShieldAlert, 
  AlertTriangle, 
  Info,
  Bug,
  Lightbulb,
  Clock
} from "lucide-react";
import { Finding, Severity } from "@/lib/api/types";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

import { UpgradeButton } from "@/components/payment/UpgradeButton";

interface FindingCardProps {
  finding: Finding;
  scanId: number;
}

const severityConfig: Record<Severity, { color: string, icon: React.ElementType, label: string }> = {
  critical: { color: "text-red-500", icon: ShieldAlert, label: "Critical" },
  high: { color: "text-orange-500", icon: AlertTriangle, label: "High" },
  medium: { color: "text-yellow-500", icon: Bug, label: "Medium" },
  low: { color: "text-blue-500", icon: Info, label: "Low" },
  informational: { color: "text-[#666]", icon: Info, label: "Info" },
};

export function FindingCard({ finding, scanId }: FindingCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = severityConfig[finding.severity];
  const Icon = config.icon;

  if (!finding.unlocked) {
    return (
      <div className="group relative rounded-xl border border-[#222] bg-[#0a0a0a] p-6 transition-all hover:border-[#333] overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111] ${config.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={`${config.color} border-current/20 bg-current/5`}>
                  {config.label}
                </Badge>
                <span className="text-xs text-[#444] font-mono">ID: {finding.id}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{finding.title}</h3>
              {finding.category && (
                <span className="text-xs text-[#666] uppercase tracking-widest font-bold mt-1 block">
                  {finding.category}
                </span>
              )}
              <div className="mt-4 filter blur-sm opacity-30 select-none pointer-events-none">
                <p className="text-sm text-[#666] line-clamp-1">
                  Detailed analysis of this vulnerability including technical proof, impact assessment, and step-by-step remediation guidance.
                </p>
              </div>
            </div>
          </div>
          <Lock className="h-5 w-5 text-[#444] shrink-0" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
          <UpgradeButton 
            scanId={scanId}
            className="bg-emerald-500 font-bold hover:bg-emerald-400 shadow-2xl"
          >
            Unlock Full Details
          </UpgradeButton>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-[#222] bg-[#0a0a0a] overflow-hidden transition-all ${isOpen ? "ring-1 ring-[#333]" : ""}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between hover:bg-[#111]/50 transition-colors"
      >
        <div className="flex gap-4">
          <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111] ${config.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`${config.color} border-current/20 bg-current/5`}>
                {config.label}
              </Badge>
              <span className="text-xs text-[#444] font-mono">ID: {finding.id}</span>
            </div>
            <h3 className="text-lg font-bold text-white">{finding.title}</h3>
            {finding.category && (
              <span className="text-xs text-[#666] uppercase tracking-widest font-bold mt-1 block">
                {finding.category}
              </span>
            )}
          </div>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-[#444]" /> : <ChevronDown className="h-5 w-5 text-[#444]" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 border-t border-[#222] pt-6 space-y-8">
              {/* Description Section */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#666] flex items-center gap-2">
                    <Info className="h-4 w-4" /> Description
                  </h4>
                  <p className="text-[#999] leading-relaxed">
                    {finding.description}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-red-500/70 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> Impact
                  </h4>
                  <p className="text-[#999] leading-relaxed">
                    {finding.impact}
                  </p>
                </div>
              </div>

              {/* Technical Detail */}
              {finding.technical_proof && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#666] flex items-center gap-2">
                    <Bug className="h-4 w-4" /> Technical Proof
                  </h4>
                  <div className="rounded-lg bg-black border border-[#222] p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <pre>{finding.technical_proof}</pre>
                  </div>
                </div>
              )}

              {/* Remediation */}
              <div className="grid gap-6 md:grid-cols-2 bg-[#111]/30 rounded-xl p-6 border border-[#222]">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" /> How to Fix
                  </h4>
                  <p className="text-white leading-relaxed">
                    {finding.remediation}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#666] flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Estimated Fix Time
                  </h4>
                  <p className="text-white font-bold text-lg">
                    {finding.estimated_fix_time || "1-2 hours"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
