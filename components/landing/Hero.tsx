"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShieldAlert, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { LandingContent } from "@/content/landing";

export function Hero({ hero }: { hero: LandingContent["hero"] }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = () => {
    if (!url) return;
    setIsLoading(true);
    
    if (!isSignedIn) {
      localStorage.setItem("pending_scan_url", url);
      router.push(`/sign-up?redirect_url=/dashboard`);
    } else {
      router.push(`/dashboard?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-900/30 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-red-900/10 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[400px] h-[400px] rounded-full bg-orange-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center text-center">
        
        {/* Top badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3 rounded-full bg-[#111] px-5 py-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-[#222]">
            <ShieldAlert className="h-4 w-4 text-[var(--accent)]" />
            <span className="text-sm font-semibold tracking-wide text-white">
              {hero.badge}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[52px] font-extrabold tracking-tight text-white sm:text-[76px] sm:leading-[1.1]"
        >
          {hero.headline}
        </motion.h1>

        {/* Subline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl text-[20px] font-medium leading-relaxed text-[#999]"
        >
          {hero.subline}
        </motion.p>

        {/* Input Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex w-full max-w-[600px] flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <div className="flex w-full flex-col gap-3 sm:flex-row relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative flex w-full flex-col sm:flex-row bg-[#111] border border-[#333] rounded-2xl p-1 shadow-2xl">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-[#666]" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-app.com"
                  className="h-14 w-full bg-transparent pl-12 pr-4 text-lg text-white placeholder:text-[#666] focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                />
              </div>
              <button 
                onClick={handleScan}
                disabled={isLoading || !url}
                className="mt-2 sm:mt-0 h-14 w-full sm:w-auto rounded-xl bg-[var(--accent)] px-8 text-lg font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-400 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : hero.primaryCta}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust avatars */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <div className="flex -space-x-3">
            {[11, 22, 33, 44, 55].map((img, i) => (
              <div key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-black">
                <Image 
                  src={`https://i.pravatar.cc/100?img=${img}`} 
                  alt="Avatar" 
                  fill
                  className="object-cover" 
                />
              </div>
            ))}
          </div>
          <p className="text-[15px] font-medium text-[#8a8a8a]">
            {hero.trustLine}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
