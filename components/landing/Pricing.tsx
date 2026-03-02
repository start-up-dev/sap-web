"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function Pricing({ pricing }: { pricing: {
  readonly title: string;
  readonly subline: string;
  readonly plans: readonly {
    readonly name: string;
    readonly price: string;
    readonly period: string;
    readonly description: string;
    readonly popular: boolean;
    readonly features: readonly string[];
    readonly cta: string;
    readonly ctaHref: string;
  }[];
} }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handlePlanClick = () => {
    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section id="pricing" className="relative overflow-hidden border-t border-white/5 bg-[#030303] px-4 py-24 sm:px-6 sm:py-48">
      {/* Dynamic Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-emerald-500/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/40"
          >
            Pricing
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-[40px] font-black tracking-tighter text-white sm:text-[88px] leading-[0.95]"
          >
            {pricing.title.split(" ").map((word, i) => (
              <span key={i} className={i > 1 ? "text-emerald-500" : ""}>{word} </span>
            ))}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-xl font-bold text-white/30 max-w-2xl mx-auto"
          >
            {pricing.subline}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-none grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          
          {/* Legacy comparison */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col rounded-[48px] border border-white/5 bg-white/[0.01] p-12 opacity-40 grayscale transition-all duration-1000 hover:opacity-100 hover:grayscale-0"
          >
            <h3 className="text-lg font-black uppercase tracking-widest text-white/20">Legacy Pentest</h3>
            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-4xl font-black text-white/10 line-through decoration-red-500/20 decoration-4">
                $10,000
              </span>
            </div>
            <ul className="mt-12 mb-12 flex-1 space-y-6">
              {[
                "4-6 weeks lead time",
                "100+ page PDF jargon",
                "Endless sales calls",
                "One-time snapshot",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-sm font-bold text-white/10">
                  <XCircle className="h-5 w-5 shrink-0 opacity-20" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
              Not Recommended
            </div>
          </motion.div>

          {/* modern ShipSafe plans */}
          {pricing.plans.map((plan, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
              key={i}
              className={`relative flex flex-col rounded-[48px] p-12 transition-all duration-700 ${
                plan.popular 
                  ? "bg-[#080808] border border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.1)] scale-105 z-20" 
                  : "bg-[#080808] border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center justify-between mb-10">
                <h3 className={`text-2xl font-black uppercase tracking-tight ${plan.popular ? "text-white" : "text-white/40"}`}>
                  {plan.name}
                </h3>
                {plan.popular && <ShieldCheck className="h-7 w-7 text-emerald-500" />}
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl font-black text-white tracking-tighter">
                  {plan.price}
                </span>
                <span className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">
                  {plan.period === "always" ? "/ free" : "/ once"}
                </span>
              </div>
              
              <p className="text-lg font-bold text-white/40 leading-relaxed mb-12">
                {plan.description}
              </p>
              
              <ul className="mb-16 flex-1 space-y-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-sm font-bold text-white/60">
                    <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${plan.popular ? "text-emerald-500" : "text-white/10"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={handlePlanClick}
                className={`mt-auto flex items-center justify-center gap-3 rounded-2xl py-6 text-base font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.98] ${
                  plan.popular
                    ? "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
