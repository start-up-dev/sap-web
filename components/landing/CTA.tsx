"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CTA({ cta }: { cta: {
  readonly title: string;
  readonly subline: string;
  readonly points?: readonly string[];
  readonly primaryCta: string;
  readonly primaryCtaHref: string;
  readonly secondaryCta: string;
  readonly secondaryCtaHref: string;
} }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handlePrimaryClick = () => {
    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-[#030303] px-4 py-24 sm:px-6 sm:py-48">
      {/* Immersive background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] h-[800px] bg-emerald-500/[0.05] blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,#000_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 inline-flex h-20 w-20 items-center justify-center rounded-[24px] bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20"
        >
          <Shield className="h-10 w-10" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black tracking-tighter text-white sm:text-[100px] leading-[0.9]"
        >
          {cta.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12 text-xl font-bold text-white/40 max-w-2xl mx-auto"
        >
          {cta.subline}
        </motion.p>
        
        {cta.points && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
             {cta.points.map((point, i) => (
               <div key={i} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white/20">
                 <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                   <Check className="h-3 w-3" />
                 </div>
                 {point}
               </div>
             ))}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <button
            onClick={handlePrimaryClick}
            className="group relative inline-flex h-20 min-w-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-white px-12 text-lg font-black uppercase tracking-widest text-black transition-all hover:bg-emerald-400 active:scale-[0.98]"
          >
            <span className="relative z-10">{cta.primaryCta}</span>
            <ArrowRight className="relative z-10 ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-emerald-500 transition-transform group-hover:translate-x-0" />
          </button>
          
          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/10">
            Secure your launch in 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
