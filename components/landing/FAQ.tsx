import type { LandingContent } from "@/content/landing";

export function FAQ({ faq }: { faq: LandingContent["faq"] }) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background)] px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#999]">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
            {faq.title}
          </h2>
          <p className="mt-6 text-xl text-[var(--muted)]">
            {faq.subline}
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {faq.questions.map((q, i) => (
            <div key={i} className="rounded-2xl border border-[var(--border)] bg-[#111] p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                {q.q}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                {q.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
