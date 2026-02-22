"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function Pricing({ pricing }: { pricing: LandingContent["pricing"] }) {
  return (
    <section id="pricing" className="relative overflow-hidden border-b border-[#222] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
            Simple Pricing
          </p>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {pricing.title}
          </h2>
          <p className="mt-6 text-xl text-[#999] max-w-2xl mx-auto">
            {pricing.subline}
          </p>
        </div>

        {/* Unified Pricing Grid: 3 Columns */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-8 lg:grid-cols-3 items-stretch">
          
          {/* 1. Traditional Pentest (Comparison Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col rounded-2xl border border-[#222] bg-[#0a0a0a] p-8 shadow-lg opacity-80"
          >
            <h3 className="text-2xl font-bold text-[#666]">Traditional Pentest</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#777] line-through decoration-red-500/50 decoration-4">
                $10,000+
              </span>
            </div>
            <p className="mt-4 text-base text-[#666]">
              The old way. Slow, expensive, and hard to understand.
            </p>
            <ul className="mt-8 mb-10 flex-1 space-y-4">
              <li className="flex items-center gap-3 text-base text-[#666]">
                <XCircle className="h-5 w-5 shrink-0 text-red-500/50" />
                Takes 2-4 weeks to complete
              </li>
              <li className="flex items-center gap-3 text-base text-[#666]">
                <XCircle className="h-5 w-5 shrink-0 text-red-500/50" />
                Dense 100-page PDF reports
              </li>
              <li className="flex items-center gap-3 text-base text-[#666]">
                <XCircle className="h-5 w-5 shrink-0 text-red-500/50" />
                Requires meetings & sales calls
              </li>
              <li className="flex items-center gap-3 text-base text-[#666]">
                <XCircle className="h-5 w-5 shrink-0 text-red-500/50" />
                Written for security engineers
              </li>
            </ul>
            <div className="mt-auto h-14 w-full rounded-xl border border-[#222] bg-transparent text-[#444] flex items-center justify-center font-bold uppercase tracking-widest text-sm">
              Not Recommended
            </div>
          </motion.div>

          {/* 2 & 3. ShipSafe Plans (Quick Scan & Deep Audit) */}
          {pricing.plans.map((plan, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.2 }}
              key={i}
              className={`relative flex flex-col rounded-2xl border ${
                plan.popular ? "border-emerald-500 bg-[#111]" : "border-[#333] bg-[#111]"
              } p-8 shadow-lg transition-transform hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max rounded-full bg-emerald-500 px-4 py-1 text-sm font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl font-bold ${plan.popular ? "text-white" : "text-emerald-400"}`}>
                {plan.popular ? "ShipSafe Deep Audit" : plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-lg font-medium text-[#666]">
                  {plan.period !== "always" ? `/${plan.period}` : ""}
                </span>
              </div>
              <p className="mt-4 text-base text-[#888]">
                {plan.description}
              </p>
              
              <ul className="mt-8 mb-10 flex-1 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-base text-[#ccc]">
                    <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.popular ? "text-emerald-500" : "text-emerald-500/50"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`mt-auto h-14 w-full rounded-xl text-lg font-bold transition-all ${
                  plan.popular
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:scale-[1.02]"
                    : "border-2 border-[#333] bg-transparent text-white hover:border-[#555] hover:bg-[#1a1a1a]"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
