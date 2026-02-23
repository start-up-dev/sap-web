"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { LandingContent } from "@/content/landing";

export function CTA({ cta }: { cta: LandingContent["cta"] }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handlePrimaryClick = () => {
    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSecondaryClick = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 sm:py-40">
      {/* Cool Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
        >
          {cta.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-xl text-[#aaa] max-w-2xl mx-auto"
        >
          {cta.subline}
        </motion.p>
        
        {/* The new points section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center space-y-4"
        >
           {cta.points.map((point, i) => (
             <div key={i} className="flex items-center gap-3 text-lg font-medium text-[#ddd]">
               <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                 <Check className="h-4 w-4" />
               </span>
               {point}
             </div>
           ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={handlePrimaryClick}
            className="inline-flex h-16 min-w-[220px] items-center justify-center rounded-xl bg-emerald-500 px-8 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            {cta.primaryCta}
          </button>
          <button
            onClick={handleSecondaryClick}
            className="inline-flex h-16 min-w-[220px] items-center justify-center rounded-xl border border-[#444] bg-[#111] px-8 text-lg font-bold text-white transition-colors hover:bg-[#222] hover:border-[#666]"
          >
            {cta.secondaryCta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
