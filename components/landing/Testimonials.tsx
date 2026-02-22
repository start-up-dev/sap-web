"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { LandingContent } from "@/content/landing";

export function Testimonials({
  testimonials,
}: {
  testimonials: LandingContent["testimonials"];
}) {
  return (
    <section
      id="reviews"
      className="relative border-b border-[#222] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
          Testimonials
        </p>
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Loved by founders<br className="hidden sm:block" /> and vibe coders
        </h2>
        <p className="mt-6 text-xl text-[#999]">
          The problems we hear — and the ones we solve.
        </p>

        {/* Masonry-style Grid */}
        <div className="mx-auto mt-16 columns-1 gap-6 sm:columns-2 lg:columns-2 max-w-5xl text-left">
          {testimonials.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="mb-6 break-inside-avoid rounded-2xl border border-[#222] bg-gradient-to-b from-[#111] to-[#0a0a0a] p-8 shadow-lg hover:border-emerald-500/30 transition-colors"
            >
              <Quote className="h-8 w-8 text-emerald-500/20 mb-4" />
              <p className="text-lg leading-relaxed text-[#ddd] font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-[#333] pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 font-bold text-emerald-400 text-lg">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold text-white">
                    {t.author}
                  </p>
                  <p className="text-sm font-medium text-[#888]">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
