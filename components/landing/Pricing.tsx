import type { LandingContent } from "@/content/landing";

export function Pricing({ pricing }: { pricing: LandingContent["pricing"] }) {
  return (
    <section id="pricing" className="border-b border-[var(--border)] bg-[#050505] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#999]">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
            {pricing.title}
          </h2>
          <p className="mt-6 text-xl text-[var(--muted)]">
            {pricing.subline}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
          {pricing.plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border ${
                plan.popular ? "border-[var(--accent)]" : "border-[var(--border)]"
              } bg-[#111] p-8 shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-sm font-bold text-[var(--accent-foreground)]">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-[var(--foreground)]">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-[var(--foreground)]">
                  {plan.price}
                </span>
                <span className="text-lg font-medium text-[var(--muted)]">
                  {plan.period !== "always" ? plan.period : ""}
                </span>
              </div>
              <p className="mt-4 text-base text-[var(--muted)]">
                {plan.description}
              </p>
              
              <ul className="mt-8 mb-10 flex-1 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-base text-[var(--foreground)]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-xs">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`mt-auto h-14 w-full rounded-full text-lg font-bold transition-transform hover:scale-[1.02] ${
                  plan.popular
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "border-2 border-[var(--border)] bg-[#1a1a1a] text-[var(--foreground)] hover:bg-[#222]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
