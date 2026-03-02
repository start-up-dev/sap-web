"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Handshake, Rocket, ToggleRight, Shield, Zap } from "lucide-react";

export function Goals({ goals }: { goals: readonly {
  readonly title: string;
  readonly description: string;
}[] }) {
  const icons = [Handshake, Shield, Rocket, Zap];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#030303] px-4 py-24 sm:px-6 sm:py-48">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/40"
          >
            <Target className="h-3.5 w-3.5" />
            The Goal
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-4xl font-black tracking-tighter text-white sm:text-7xl leading-[1.05]"
          >
            Security confidence for <br /><span className="text-emerald-500">sales, audits & scale.</span>
          </motion.h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {goals.map((goal, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative flex flex-col rounded-[40px] border border-white/5 bg-[#080808] p-12 transition-all duration-500 hover:border-white/10 hover:-translate-y-1"
              >
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/[0.03] text-white transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-black">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6 leading-none">
                  {goal.title}
                </h3>
                <p className="text-lg font-bold leading-relaxed text-white/30 group-hover:text-white/50 transition-colors">
                  {goal.description}
                </p>
                
                {/* Decorative corner element */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
