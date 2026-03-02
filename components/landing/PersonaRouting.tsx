"use client";

import { motion } from "framer-motion";
import { Rocket, Handshake, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { landingContent } from "@/content/landing";

const icons = {
  rocket: Rocket,
  handshake: Handshake,
  building: Building2,
};

export function PersonaRouting() {
  const { personas } = landingContent;

  return (
    <section className="bg-black py-24 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-bold leading-7 text-emerald-500 uppercase tracking-[0.2em]"
          >
            {personas.label}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl"
          >
            {personas.title}
          </motion.p>
        </div>
        
        <div className="mx-auto grid max-w-none grid-cols-1 gap-8 lg:grid-cols-3">
          {personas.paths.map((path, idx) => {
            const Icon = icons[path.icon as keyof typeof icons] || Rocket;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <Link href={path.href} className="block h-full">
                  <div className="relative h-full overflow-hidden rounded-[32px] border border-white/5 bg-[#0a0a0a] p-10 transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)] group-hover:-translate-y-2">
                    
                    {/* Background Glow */}
                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-colors duration-500" />
                    
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                        <Icon className="h-7 w-7" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">
                        {path.headline}
                      </h3>
                      
                      <p className="text-lg leading-relaxed text-[#666] mb-10 group-hover:text-[#888] transition-colors">
                        {path.body}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-widest">
                        {path.cta}
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
