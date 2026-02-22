"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Search, Lock, Activity, FileText } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function Features({
  features,
}: {
  features: LandingContent["features"];
}) {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-[#222] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32"
    >
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Activity className="h-4 w-4" />
            Under the Hood
          </p>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Enterprise-grade security,<br className="hidden sm:block" /> 38+ active exploit-tests.
          </h2>
          <p className="mt-6 text-xl text-[#999] max-w-2xl mx-auto">
            We orchestrate industry-standard tools (ZAP, Nmap, Nikto) to scan your infrastructure, APIs, and web apps for OWASP Top 10 vulnerabilities.
          </p>
        </div>

        {/* Simulated Scanner Visual Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Terminal Header */}
          <div className="flex items-center border-b border-[#222] bg-[#111] px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
              <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
              <div className="h-3 w-3 rounded-full bg-[#22c55e]"></div>
            </div>
            <p className="ml-4 font-mono text-xs text-[#666]">ShipSafe Agent — Scanning target: https://example-app.com</p>
          </div>
          
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#222]">
            {/* Left side: simulated terminal / progress */}
            <div className="flex-1 space-y-6 p-6 sm:p-10 bg-[#0a0a0a]">
              <div className="flex items-center gap-3 border border-emerald-900/50 bg-emerald-900/10 rounded-lg p-3">
                <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin"></div>
                <p className="text-sm font-mono text-[var(--accent)] font-bold">Orchestrating tools with Gemini 2.5 Pro...</p>
              </div>
              
              <div className="space-y-4 font-mono text-sm text-[#888]">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-start gap-3">
                  <span className="text-emerald-500">➜</span>
                  <div>
                    <span className="text-white font-bold">[Nmap]</span> Port & Service Discovery
                    <p className="text-[#555] text-xs mt-1">Found open ports: 80, 443. Running version detection...</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-start gap-3">
                  <span className="text-emerald-500">➜</span>
                  <div>
                    <span className="text-white font-bold">[OWASP ZAP]</span> Active Vulnerability Scan
                    <p className="text-[#555] text-xs mt-1">Injecting payloads into /api/login and 23 other endpoints...</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="flex items-start gap-3">
                  <span className="text-emerald-500">➜</span>
                  <div>
                    <span className="text-white font-bold">[SSLyze]</span> TLS/SSL Configuration Check
                    <p className="text-[#555] text-xs mt-1">Verifying certificate chain and cipher suites...</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right side: simulated report summary */}
            <div className="flex-1 p-6 sm:p-10 bg-[#111]">
              <div className="flex items-end justify-between border-b border-[#333] pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#666]">Live Results</p>
                  <p className="text-xl font-bold text-white mt-1">example-app.com</p>
                </div>
                <div className="flex items-center gap-2 rounded bg-red-500/10 px-3 py-1.5 border border-red-500/20">
                  <Shield className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-bold text-red-500">Score: 68/100</span>
                </div>
              </div>
              
              <ul className="mt-6 space-y-4 text-sm text-[#aaa]">
                <li className="flex items-start gap-3 rounded-lg border border-red-900/30 bg-red-900/10 p-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-red-500 text-xs font-bold text-white">1</span>
                  <div>
                    <p className="font-bold text-red-400">SQL Injection in /api/users</p>
                    <p className="text-xs text-red-400/70 mt-1">Critical severity. Database exfiltration possible.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg border border-orange-900/30 bg-orange-900/10 p-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">2</span>
                  <div>
                    <p className="font-bold text-orange-400">Missing HSTS security headers</p>
                    <p className="text-xs text-orange-400/70 mt-1">Medium severity. MITM attacks possible.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-2 rounded-md bg-emerald-900/20 p-3 text-sm border border-emerald-900/50">
                <FileText className="h-4 w-4 text-[var(--accent)]" />
                <span className="font-bold text-[var(--accent)]">
                  Gemini generating remediation report <span className="animate-pulse">_</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid - Highly Visual Modules */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Quick Scan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-1"
          >
            <div className="flex items-center border-b border-[#222] bg-[#111] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#ef4444] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#eab308] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#22c55e] transition-colors"></div>
              </div>
              <p className="ml-3 font-mono text-[10px] text-[#555] group-hover:text-emerald-500/70 transition-colors uppercase tracking-widest">
                Mod_01
              </p>
            </div>
            
            <div className="flex flex-1 flex-col p-6 relative">
              <div className="mb-6 h-32 w-full rounded-xl bg-[#111] border border-[#222] flex flex-col items-center justify-center p-4 overflow-hidden relative group-hover:border-emerald-500/30 transition-colors">
                <div className="w-full h-8 bg-black rounded-md border border-[#333] flex items-center px-3 shadow-inner">
                  <span className="text-emerald-500/80 text-[10px] font-mono">https://</span>
                  <div className="ml-2 w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[20%] group-hover:w-[100%] transition-all duration-[1.5s] ease-in-out"></div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 items-center w-full">
                  <div className="h-6 w-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Search className="h-3 w-3" /></div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="h-1 w-full rounded-md bg-[#222] group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                    <div className="h-1 w-2/3 rounded-md bg-[#222] group-hover:bg-emerald-500/20 transition-colors duration-500 delay-100"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {features[0].title}
              </h3>
              <p className="text-sm leading-relaxed text-[#777]">
                Passive check in 2–5 minutes. Find out what's exposed.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Deep Audit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-1"
          >
            <div className="flex items-center border-b border-[#222] bg-[#111] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#ef4444] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#eab308] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#22c55e] transition-colors"></div>
              </div>
              <p className="ml-3 font-mono text-[10px] text-[#555] group-hover:text-emerald-500/70 transition-colors uppercase tracking-widest">
                Mod_02
              </p>
            </div>
            
            <div className="flex flex-1 flex-col p-6 relative">
              <div className="mb-6 h-32 w-full rounded-xl bg-[#111] border border-[#222] flex items-center justify-center p-4 group-hover:border-emerald-500/30 transition-colors">
                <div className="grid grid-cols-4 gap-2 w-full h-full p-2">
                   {[...Array(12)].map((_, i) => (
                      <div key={i} className={`h-full rounded-sm ${[3, 8].includes(i) ? 'bg-red-500/20 group-hover:bg-red-500' : i === 7 ? 'bg-orange-500/20 group-hover:bg-orange-500' : 'bg-[#222] group-hover:bg-emerald-500/30'} transition-all duration-500 shadow-sm`} style={{ transitionDelay: `${i * 30}ms` }}></div>
                   ))}
                </div>
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {features[1].title}
              </h3>
              <p className="text-sm leading-relaxed text-[#777]">
                38+ active exploit-tests targeting OWASP Top 10 vulnerabilities.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Plain-English */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-1"
          >
            <div className="flex items-center border-b border-[#222] bg-[#111] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#ef4444] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#eab308] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#22c55e] transition-colors"></div>
              </div>
              <p className="ml-3 font-mono text-[10px] text-[#555] group-hover:text-emerald-500/70 transition-colors uppercase tracking-widest">
                Mod_03
              </p>
            </div>
            
            <div className="flex flex-1 flex-col p-6 relative">
              <div className="mb-6 h-32 w-full rounded-xl bg-[#111] border border-[#222] flex items-center justify-center p-4 relative group-hover:border-emerald-500/30 transition-colors overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-20 h-20 bg-emerald-500/20 blur-xl rounded-full"></div>
                </div>
                <div className="w-16 h-20 bg-[#0a0a0a] border border-[#333] rounded-lg p-2.5 shadow-lg z-10 flex flex-col gap-2 group-hover:border-emerald-500/50 transition-colors">
                  <div className="h-1.5 w-3/4 bg-[#333] group-hover:bg-emerald-500/60 rounded-full transition-colors duration-500 delay-100"></div>
                  <div className="h-1.5 w-full bg-[#333] group-hover:bg-emerald-500/60 rounded-full transition-colors duration-500 delay-200"></div>
                  <div className="h-1.5 w-5/6 bg-[#333] group-hover:bg-emerald-500/60 rounded-full transition-colors duration-500 delay-300"></div>
                  <div className="mt-auto flex justify-end">
                    <div className="h-3 w-3 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40">
                      <div className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {features[2].title}
              </h3>
              <p className="text-sm leading-relaxed text-[#777]">
                AI-driven insights translating raw exploits into exact fix steps.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Built For Builders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-1"
          >
            <div className="flex items-center border-b border-[#222] bg-[#111] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#ef4444] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#eab308] transition-colors"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#333] group-hover:bg-[#22c55e] transition-colors"></div>
              </div>
              <p className="ml-3 font-mono text-[10px] text-[#555] group-hover:text-emerald-500/70 transition-colors uppercase tracking-widest">
                Mod_04
              </p>
            </div>
            
            <div className="flex flex-1 flex-col p-6 relative">
              <div className="mb-6 h-32 w-full rounded-xl bg-[#111] border border-[#222] flex items-center justify-center p-4 group-hover:border-emerald-500/30 transition-colors">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-[#333] group-hover:border-emerald-500/50 rounded-xl rotate-3 group-hover:rotate-12 transition-all duration-500"></div>
                  <div className="absolute inset-0 border-2 border-[#333] group-hover:border-emerald-500/50 rounded-xl -rotate-3 group-hover:-rotate-12 transition-all duration-500"></div>
                  <Shield className="h-8 w-8 text-[#555] group-hover:text-emerald-500 relative z-10 transition-colors duration-500 delay-100" />
                  <CheckCircle2 className="h-4 w-4 text-black absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {features[3].title}
              </h3>
              <p className="text-sm leading-relaxed text-[#777]">
                No security degree required. Close enterprise deals instantly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
