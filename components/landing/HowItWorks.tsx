"use client";

import { motion } from "framer-motion";

interface HowItWorksProps {
  howItWorks: {
    title: string;
    steps: readonly {
      number: string;
      title: string;
      description: string;
    }[];
  };
}

export function HowItWorks({ howItWorks }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-black py-24 sm:py-32 border-t border-[#111]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {howItWorks.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {howItWorks.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-16"
            >
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xl font-bold text-[var(--accent)]">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-base leading-7 text-[#999]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
