"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Hero({ hero }: { hero: {
  readonly badge: string;
  readonly headline: string;
  readonly subline: string;
  readonly primaryCta: string;
  readonly primaryCtaHref: string;
  readonly secondaryCta: string;
  readonly secondaryCtaHref: string;
  readonly trustLine: string;
} }) {
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
    <section className="relative overflow-hidden bg-[#030303] px-4 py-24 sm:px-6 sm:py-48">
      {/* Production Background Grid & Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[800px] bg-emerald-500/[0.07] blur-[140px] rounded-full" />
        
        {/* The Scanning Line Animation */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent z-10"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center text-center">
        
        {/* Dynamic Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            {hero.badge}
            <div className="absolute -inset-1 rounded-full bg-emerald-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[52px] font-black tracking-tighter leading-[1.05] text-white sm:text-[96px] md:text-[110px]"
        >
          {hero.headline.split(" ").map((word, i) => (
            <span key={i} className={word.toLowerCase().includes("secure") || word.toLowerCase().includes("holes") ? "text-emerald-500" : "text-white"}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        {/* sophisticated subline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl text-lg font-bold leading-relaxed text-white/40 sm:text-xl"
        >
          {hero.subline}
        </motion.p>

        {/* production level input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full max-w-[680px]"
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-[28px] bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative flex w-full flex-col sm:flex-row items-center bg-[#080808] border border-white/10 rounded-[26px] p-2 transition-all duration-500 group-hover:border-white/20 group-focus-within:border-emerald-500/50">
              <div className="relative flex-1 w-full flex items-center px-6">
                <Search className="h-5 w-5 text-white/20 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your URL here..."
                  className="h-14 w-full bg-transparent pl-4 pr-4 text-lg font-bold text-white placeholder:text-white/10 focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                />
              </div>
              <button 
                onClick={handleScan}
                disabled={isLoading || !url}
                className="mt-2 sm:mt-0 h-14 w-full sm:w-auto rounded-[20px] bg-emerald-500 px-12 text-base font-black uppercase tracking-widest text-black transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : hero.primaryCta}
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-8 text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
              <span>No account required</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-white/5" />
            <span>Real-time results</span>
          </div>
        </motion.div>

        {/* trust indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 flex flex-col items-center gap-8"
        >
          <div className="flex -space-x-4">
            {[11, 22, 33, 44, 55].map((img, i) => (
              <div 
                key={i} 
                className="relative h-14 w-14 overflow-hidden rounded-full border-[4px] border-[#030303] bg-[#111]"
              >
                <Image 
                  src={`https://i.pravatar.cc/100?img=${img}`} 
                  alt="User" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" 
                />
              </div>
            ))}
          </div>
          <p className="text-[13px] font-black text-white/30 uppercase tracking-[0.2em]">
            {hero.trustLine}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
