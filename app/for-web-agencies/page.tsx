import { Metadata } from "next";
import { agencyLanding } from "@/content/landing-for-web-agencies";
import { landingContent } from "@/content/landing";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Fear } from "@/components/landing/Fear";
import { Features } from "@/components/landing/Features";
import { Goals } from "@/components/landing/Goals";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: agencyLanding.meta.title,
  description: agencyLanding.meta.description,
  keywords: [...agencyLanding.meta.keywords],
};

export default function AgencyPage() {
  const c = agencyLanding;
  const global = landingContent;

  return (
    <div className="min-h-screen bg-background">
      <Nav nav={c.nav} />
      <main>
        <Hero hero={c.hero} />
        <Fear fear={c.fear} />
        <Features features={c.features} />
        <Goals goals={global.goals} />
        <Stats />
        <Testimonials testimonials={c.testimonials} />
        <Pricing pricing={c.pricing} />
        <FAQ faq={c.faq} />
        <CTA cta={c.cta} />
        <Footer footer={c.footer} />
      </main>
    </div>
  );
}
