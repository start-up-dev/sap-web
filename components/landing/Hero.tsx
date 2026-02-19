import Link from "next/link";
import type { LandingContent } from "@/content/landing";

export function Hero({ hero }: { hero: LandingContent["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
        
        {/* Top small text and badge */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <p className="text-sm italic text-[#999]">
            Get your badge + backlink 👇
          </p>
          <div className="flex items-center gap-4 rounded-xl bg-[#1c1c1c] px-4 py-2 shadow-lg ring-1 ring-white/5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] border-[#ef4444] border-t-[#10b981] border-r-[#10b981] border-b-[#f97316] border-l-[#ef4444] bg-transparent text-sm font-bold text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
              A
            </div>
            <div className="flex flex-col items-start justify-center text-left">
              <p className="text-sm font-bold text-white leading-tight">
                example-app.com
              </p>
              <p className="text-[10px] font-semibold tracking-widest text-[#999] uppercase">
                VERIFIED SECURITY GRADE
              </p>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[52px] font-extrabold tracking-[-0.02em] text-[#f2f2f2] sm:text-[76px] sm:leading-[1.1]">
          {hero.headline}
        </h1>

        {/* 3 Colored Bars */}
        <div className="mt-8 mb-6 flex w-full max-w-[620px] justify-center gap-3">
          <div className="h-3.5 w-[45%] rounded-full bg-[#ef4444]"></div>
          <div className="h-3.5 w-[30%] rounded-full bg-[#f97316]"></div>
          <div className="h-3.5 w-[25%] rounded-full bg-[#22c55e]"></div>
        </div>

        {/* Subline */}
        <p className="mx-auto mt-6 max-w-3xl text-[20px] font-normal leading-relaxed text-[#8a8a8a]">
          {hero.subline}
        </p>

        {/* Input Bar */}
        <div className="mt-16 flex w-full max-w-[700px] flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-base font-semibold text-white">Run audit</span>
            <span className="text-xl">👉</span>
          </div>
          
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="relative w-full sm:w-[380px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8a8a8a]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="website.com"
                className="h-[54px] w-full rounded-xl border border-white/10 bg-[#171717] pl-12 pr-4 text-[17px] text-[#f2f2f2] placeholder:text-[#6a6a6a] focus:border-[#444] focus:outline-none focus:ring-1 focus:ring-[#444] shadow-sm"
              />
            </div>
            
            <button className="h-[54px] w-full rounded-xl bg-[#e6e6e6] px-8 text-[17px] font-semibold text-[#111] transition-colors hover:bg-white sm:w-auto shadow-sm">
              {hero.primaryCta}
            </button>
          </div>
        </div>

        {/* Trust avatars */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <div className="flex -space-x-3">
            <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-[#0d0d0d]" />
            <img src="https://i.pravatar.cc/100?img=22" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-[#0d0d0d]" />
            <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-[#0d0d0d]" />
            <img src="https://i.pravatar.cc/100?img=44" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-[#0d0d0d]" />
            <img src="https://i.pravatar.cc/100?img=55" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-[#0d0d0d]" />
          </div>
          <p className="text-[15px] font-medium text-[#8a8a8a]">
            Trusted by <strong className="text-[#f2f2f2]">2300+ developers</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
