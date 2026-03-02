"use client";

import { motion } from "framer-motion";
import { Quote, Trophy, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly metric?: string;
}

export function Testimonials({
  testimonials,
}: {
  testimonials: readonly Testimonial[];
}) {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 sm:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/5 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400"
          >
            Social Proof
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-4xl font-black tracking-tight text-white sm:text-6xl"
          >
            Trusted by the new <br />generation of builders.
          </motion.h2>
        </div>

        {/* High-fidelity Masonry Grid */}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl text-left">
          {testimonials.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="group relative h-fit rounded-[32px] border border-white/5 bg-[#0a0a0a] p-10 transition-all duration-500 hover:border-emerald-500/30"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-1 text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                {t.metric && (
                  <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20 text-[11px] font-black text-emerald-400 uppercase tracking-widest">
                    <Trophy className="h-3 w-3" />
                    {t.metric}
                  </div>
                )}
              </div>
              
              <p className="text-xl leading-relaxed text-[#aaa] font-medium group-hover:text-white transition-colors duration-500">
                &ldquo;{t.quote}&rdquo;
              </p>
              
              <div className="mt-12 flex items-center gap-5 border-t border-white/5 pt-10">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-emerald-500/10 border border-white/10 p-0.5">
                   <div className="relative h-full w-full rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <Image 
                        src={`https://i.pravatar.cc/150?u=${t.author}`} 
                        alt={t.author} 
                        fill
                        className="object-cover" 
                      />
                   </div>
                </div>
                <div>
                  <p className="text-lg font-black text-white">
                    {t.author}
                  </p>
                  <p className="text-sm font-bold text-[#444] uppercase tracking-widest">
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
