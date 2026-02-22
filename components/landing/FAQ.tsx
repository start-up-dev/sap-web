"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function FAQ({ faq }: { faq: LandingContent["faq"] }) {
  return (
    <section className="relative border-b border-[#222] bg-[#0a0a0a] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </p>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {faq.title}
          </h2>
          <p className="mt-6 text-xl text-[#999]">
            {faq.subline}
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faq.questions.map((q, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="group rounded-2xl border border-[#333] bg-[#111] p-8 transition-colors hover:border-emerald-500/50 hover:bg-[#151515]"
            >
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {q.q}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-[#aaa]">
                {q.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
