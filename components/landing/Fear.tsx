"use client";

import { motion } from "framer-motion";

interface FearProps {
  fear: {
    readonly label: string;
    readonly title: string;
    readonly body: string;
    readonly stat?: string;
    readonly statLabel?: string;
  };
}

export function Fear({ fear }: FearProps) {
  return (
    <section className="bg-black py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-semibold leading-7 text-red-500">
              {fear.label}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {fear.title}
            </p>
            <p className="mt-6 text-lg leading-8 text-[#999]">
              {fear.body}
            </p>
          </motion.div>
          
          {fear.stat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-center rounded-3xl bg-red-500/5 p-12 border border-red-500/10 shadow-[0_0_50px_rgba(239,68,68,0.05)]"
            >
              <div className="text-7xl font-extrabold text-red-500 mb-4">
                {fear.stat}
              </div>
              <p className="text-center text-xl font-medium text-white max-w-[200px]">
                {fear.statLabel}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
