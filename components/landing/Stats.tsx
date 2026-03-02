"use client";

import { motion } from "framer-motion";
import { landingContent } from "@/content/landing";

export function Stats() {
  const { stats } = landingContent;

  return (
    <section className="bg-black py-24 sm:py-40 relative">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.items.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-sm font-black uppercase tracking-[0.2em] text-[#444]">{stat.label}</dt>
              <dd className="order-first text-5xl font-black tracking-tight text-white sm:text-7xl tabular-nums">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
