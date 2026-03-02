"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Search, Activity, FileText, Lock, Globe, Zap, Cpu } from "lucide-react";

export function Features({
  features,
}: {
  features: readonly {
    readonly title: string;
    readonly description: string;
  }[];
}) {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-white/5 bg-[#030303] px-4 py-24 sm:px-6 sm:py-48"
    >
      {/* Cyber Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.03] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/[0.03] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-500"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            Under the Hood
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-[40px] font-black tracking-tighter leading-tight text-white sm:text-[72px]"
          >
            Enterprise-grade checks.<br /> <span className="text-white/20">Done in minutes.</span>
          </motion.h2>
        </div>

        {/* Exact Production Terminal Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto mb-32 max-w-5xl relative"
        >
          <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-b from-white/10 to-transparent blur-sm" />
          
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-8 py-5">
              <div className="flex gap-2.5">
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-5 py-2 border border-white/5">
                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-mono text-[12px] font-bold text-white/30 tracking-tight">shipsafe_orchestrator --target v1.api</span>
              </div>
              <div className="w-16" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
              {/* Left: Tool Output */}
              <div className="md:col-span-7 p-10 font-mono text-[13px] leading-relaxed">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-emerald-500 font-black">➜</span>
                    <div>
                      <p className="text-white font-black">[Nmap] Scanning Infrastructure...</p>
                      <p className="text-white/20">Found 3 open services. Detecting OS fingerprint...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="text-emerald-500 font-black">➜</span>
                    <div>
                      <p className="text-white font-black">[ZAP] Active Exploit Phase</p>
                      <p className="text-emerald-500/50 animate-pulse">Payload injection active on 124 endpoints...</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-emerald-500 font-black">➜</span>
                    <div>
                      <p className="text-white font-black">[Gemini] Interpreting Results</p>
                      <p className="text-white/20">Translating raw data into plain English remediation steps...</p>
                    </div>
                  </div>
                  
                  <div className="pt-10">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ["0%", "70%", "70%", "90%"] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">System Load: 42% -- Memory: 1.2GB</p>
                  </div>
                </div>
              </div>

              {/* Right: Score/Results Card Overlay style */}
              <div className="md:col-span-5 p-10 bg-white/[0.02] border-l border-white/5 flex flex-col">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">Current Scan</p>
                    <p className="text-xl font-black text-white">Security Score</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-black font-black text-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    84
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {[
                    { severity: "Critical", label: "SQL Injection Path", color: "bg-red-500", text: "text-red-500" },
                    { severity: "High", label: "Broken Auth Flow", color: "bg-orange-500", text: "text-orange-500" },
                    { severity: "Medium", label: "Weak TLS Cipher", color: "bg-yellow-500", text: "text-yellow-500" },
                  ].map((finding, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/5 p-4"
                    >
                      <div className={`h-2 w-2 rounded-full ${finding.color} shadow-[0_0_10px_currentColor]`} />
                      <div className="flex-1">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${finding.text}`}>{finding.severity}</p>
                        <p className="text-sm font-bold text-white/80">{finding.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500">Auto-Remediation</span>
                  </div>
                  <p className="text-xs font-bold text-white/50 leading-relaxed">Fixes generated for all 12 findings by Gemini 2.5 Pro.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full"
            >
              <div className="h-full rounded-[32px] border border-white/5 bg-[#080808] p-10 transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] text-white/20 transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-black">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base font-bold leading-relaxed text-white/30 group-hover:text-white/50 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
