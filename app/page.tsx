import { landingContent } from "@/content/landing";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Vision } from "@/components/landing/Vision";
import { Features } from "@/components/landing/Features";
import { Goals } from "@/components/landing/Goals";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const c = landingContent;
  return (
    <div className="min-h-screen bg-background">
      <Nav nav={c.nav} />
      <main>
        <Hero hero={c.hero} />
        <Features features={c.features} />
        <Goals goals={c.goals} />
        <Testimonials testimonials={c.testimonials} />
        <Pricing pricing={c.pricing} />
        <FAQ faq={c.faq} />
        <CTA cta={c.cta} />
        <Footer footer={c.footer} />
      </main>
    </div>
  );
}
