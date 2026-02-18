import { landingContent } from "@/content/landing";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Vision } from "@/components/landing/Vision";
import { Features } from "@/components/landing/Features";
import { Goals } from "@/components/landing/Goals";
import { Testimonials } from "@/components/landing/Testimonials";
import { WhyUs } from "@/components/landing/WhyUs";
import { Partners } from "@/components/landing/Partners";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const c = landingContent;
  return (
    <div className="min-h-screen bg-background">
      <Nav nav={c.nav} />
      <main>
        <Hero hero={c.hero} />
        <Vision vision={c.vision} />
        <Features features={c.features} />
        <Goals goals={c.goals} />
        <Testimonials testimonials={c.testimonials} />
        <WhyUs whyUs={c.whyUs} />
        <Partners partners={c.partners} />
        <CTA cta={c.cta} />
        <Footer footer={c.footer} />
      </main>
    </div>
  );
}
