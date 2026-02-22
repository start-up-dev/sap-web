"use client";

import { motion } from "framer-motion";
import type { LandingContent } from "@/content/landing";

export function Vision({ vision }: { vision: LandingContent["vision"] }) {
  return (
    <section id="how-it-works" className="relative border-b border-[#222] bg-[#050505] px-4 py-24 sm:px-6 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400"
        >
          {vision.label}
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          {vision.title}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 relative"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-teal-600/20 blur-xl"></div>
          <div className="relative rounded-2xl border border-[#333] bg-[#0a0a0a] p-8 sm:p-12 shadow-2xl">
            <p className="text-xl leading-relaxed text-[#aaa]">
              {vision.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
