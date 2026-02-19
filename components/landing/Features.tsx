import type { LandingContent } from "@/content/landing";

export function Features({
  features,
}: {
  features: LandingContent["features"];
}) {
  return (
    <section
      id="features"
      className="border-b border-[var(--border)] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#999]">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-5xl">
            Everything you need to<br className="hidden sm:block" /> secure your app
          </h2>
          <p className="mt-6 text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Deep analysis, actionable fixes, and plain-English reporting.
          </p>
        </div>

        {/* Simulated Scanner Visual Block */}
        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0d0d0d] shadow-2xl">
          <div className="flex border-b border-[var(--border)] bg-[#111] px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
              <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
              <div className="h-3 w-3 rounded-full bg-[#22c55e]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-6 sm:flex-row sm:p-10">
            {/* Left side: simulated terminal / progress */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 shrink-0 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin"></div>
                <p className="text-sm font-mono text-[var(--accent)]">Testing OWASP Top 10...</p>
              </div>
              <div className="space-y-2 font-mono text-sm text-[#666]">
                <p>✓ Checking SSL/TLS configuration</p>
                <p>✓ Fuzzing hidden endpoints & directories</p>
                <p>✓ Analyzing API Authorization headers</p>
                <p>✓ Scanning for exposed .env files</p>
              </div>
            </div>

            {/* Right side: simulated report summary */}
            <div className="flex-1 rounded-xl bg-[#1a1a1a] p-6 border border-[#222]">
              <div className="flex items-end justify-between border-b border-[#333] pb-4">
                <p className="text-lg font-bold text-white">example-app.com</p>
                <span className="rounded bg-[#ef4444]/20 px-2 py-1 text-xs font-bold text-[#ef4444]">
                  CRITICAL
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[#999]">
                <li className="flex gap-3">
                  <span className="text-[#ef4444] font-bold">1</span>
                  SQL Injection vulnerability found in /api/users
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f97316] font-bold">2</span>
                  Missing HSTS security headers
                </li>
                <li className="flex gap-3">
                  <span className="text-[#eab308] font-bold">4</span>
                  Outdated dependencies (2 known CVEs)
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
                AI Agent generating fix steps <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <ul className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <li
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[#111] p-8 transition-colors hover:border-[var(--muted-foreground)]"
            >
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                {feature.title}
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
