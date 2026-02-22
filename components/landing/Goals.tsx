"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Handshake, Rocket, ToggleRight } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function Goals({ goals }: { goals: LandingContent["goals"] }) {
  return (
    <section className="relative border-b border-[#222] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Target className="h-4 w-4" />
            The Goal
          </p>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Security confidence for sales, audits & scale
          </h2>
          <p className="mt-6 text-xl text-[#999]">
            More than a scanner — a clear path to credibility.
          </p>
        </div>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          
          {/* Card 1: Win Deals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex-1 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
              <div className="mb-8 relative w-32 h-32 flex items-center justify-center">
                 <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors" />
                 <div className="relative z-10 w-20 h-20 bg-[#111] border border-[#333] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Handshake className="h-10 w-10 text-emerald-400" />
                 </div>
                 <div className="absolute -bottom-2 -right-2 z-20 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#0d0d0d] shadow-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                 </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {goals[0].title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#777]">
                {goals[0].description}
              </p>
            </div>
          </motion.div>

          {/* Card 2: No Panic Compliance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex-1 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
              <div className="mb-8 w-full max-w-[240px] flex flex-col gap-3">
                 {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl p-3 group-hover:border-emerald-500/30 transition-colors" style={{ transitionDelay: `${idx * 100}ms` }}>
                       <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                       </div>
                       <div className="flex flex-col gap-1.5 flex-1">
                          <div className={`h-1.5 rounded-full bg-[#333] group-hover:bg-[#444] transition-colors`} style={{ width: idx === 1 ? '60%' : '80%' }} />
                       </div>
                    </div>
                 ))}
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {goals[1].title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#777]">
                {goals[1].description}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Ship with Confidence */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex-1 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
              <div className="mb-8 relative w-32 h-32 flex items-center justify-center">
                 <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors" />
                 <div className="relative z-10 w-20 h-20 bg-[#111] border border-[#333] rounded-2xl flex items-center justify-center shadow-xl group-hover:-translate-y-3 transition-transform duration-500">
                    <Rocket className="h-10 w-10 text-blue-400 group-hover:text-emerald-400 transition-colors duration-500" />
                 </div>
                 
                 {/* Launch trails */}
                 <div className="absolute top-[80%] flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1 h-6 bg-gradient-to-t from-transparent to-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-4 bg-gradient-to-t from-transparent to-blue-500 rounded-full animate-pulse delay-75 mt-2"></div>
                    <div className="w-1 h-6 bg-gradient-to-t from-transparent to-blue-500 rounded-full animate-pulse delay-150"></div>
                 </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {goals[2].title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#777]">
                {goals[2].description}
              </p>
            </div>
          </motion.div>

          {/* Card 4: Security Without Complexity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#333] bg-[#0d0d0d] shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex-1 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
              <div className="mb-8 w-full max-w-[240px] h-32 flex items-center justify-center">
                 <div className="w-full bg-[#111] border border-[#222] rounded-2xl p-6 flex items-center justify-between shadow-xl group-hover:border-emerald-500/30 transition-colors group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <div className="flex flex-col gap-3 items-start w-1/2">
                       <div className="h-2 w-full bg-[#333] rounded-full group-hover:bg-[#444] transition-colors" />
                       <div className="h-2 w-2/3 bg-[#333] rounded-full group-hover:bg-[#444] transition-colors" />
                    </div>
                    <div className="flex items-center justify-end w-1/2 relative">
                        <ToggleRight className="h-14 w-14 text-[#333] group-hover:text-emerald-500 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                 </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {goals[3].title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#777]">
                {goals[3].description}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
