"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function FAQ({ faq }: { faq: {
  readonly title: string;
  readonly subline?: string;
  readonly questions: readonly {
    readonly q: string;
    readonly a: string;
  }[];
} }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 sm:py-48">
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/40"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Support
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-[40px] font-black tracking-tighter text-white sm:text-[64px]"
          >
            {faq.title}
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faq.questions.map((q, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group overflow-hidden rounded-[32px] border transition-all duration-500 ${
                openIndex === i ? "border-emerald-500/30 bg-emerald-500/[0.02]" : "border-white/5 bg-[#080808] hover:border-white/10"
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-10 text-left"
              >
                <span className={`text-xl font-bold tracking-tight transition-colors ${openIndex === i ? "text-emerald-500" : "text-white"}`}>
                  {q.q}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                  openIndex === i ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500" : "border-white/10 text-[#333]"
                }`}>
                  {openIndex === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-10 pb-10">
                  <p className="text-lg font-medium leading-relaxed text-white/40 max-w-3xl">
                    {q.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
