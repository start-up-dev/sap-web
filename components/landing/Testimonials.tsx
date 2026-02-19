import type { LandingContent } from "@/content/landing";

export function Testimonials({
  testimonials,
}: {
  testimonials: LandingContent["testimonials"];
}) {
  return (
    <section
      id="reviews"
      className="border-b border-[var(--border)] bg-[var(--background)] px-4 py-20 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#999]">
          Testimonials
        </p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tighter text-[var(--foreground)] sm:text-5xl">
          Loved by founders<br />and vibe coders
        </h2>
        <p className="mt-6 text-xl text-[var(--muted)]">
          The problems we hear — and the ones we solve.
        </p>

        {/* Masonry-style Grid */}
        <div className="mx-auto mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 text-left">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="mb-6 break-inside-avoid rounded-2xl border border-[#222] bg-[#111] p-8 shadow-sm"
            >
              <p className="text-lg leading-relaxed text-[#eee]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] font-bold text-[var(--muted)]">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold text-[var(--foreground)]">
                    {t.author}
                  </p>
                  <p className="text-sm font-medium text-[var(--muted)]">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
