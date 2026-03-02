import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { landingContent as c } from "@/content/landing";

export default function TermsPage() {
  const lastUpdated = "May 20, 2024";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Simple Header */}
      <header className="border-b border-[#111] bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="font-bold text-xl tracking-tight">ShipSafe</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-[#666] hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-[#666]">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#999] prose-li:text-[#999] prose-strong:text-white space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using ShipSafe (a product of Make Real LLC, "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p>
              ShipSafe provides automated security auditing services for websites and REST APIs. We offer free "Quick Scans" and paid "Deep Audits." The results are interpreted by AI and provided as a report.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Payments and Refunds</h2>
            <p>
              Deep Audits are a one-time purchase of $29 per audit. Payments are processed securely via Stripe. Due to the immediate delivery of digital audit results and the underlying compute costs incurred by running security tools and AI models, we generally do not offer refunds once a scan has successfully completed. If a scan fails due to a technical error on our end, please contact support for a credit or refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Usage Authorization and Legality</h2>
            <p>
              <strong>IMPORTANT:</strong> You represent and warrant that you have the legal authority to authorize security testing on the target URL(s) you submit to ShipSafe. 
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must only submit URLs for applications you own or have explicit written permission to test.</li>
              <li>Our "Deep Audits" involve active exploit-testing which may be perceived as an attack by some infrastructure providers.</li>
              <li>ShipSafe and Make Real LLC are not responsible for any downtime, account suspensions, or legal consequences resulting from unauthorized testing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranty</h2>
            <p>
              ShipSafe is provided "as is" without any warranty of any kind. While our audits are comprehensive, they do not guarantee that your application is 100% secure. Automated testing is a tool to help identify common vulnerabilities but should not be the only component of your security strategy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Make Real LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Make Real LLC is registered, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@makereal.app.
            </p>
          </section>
        </div>
      </main>

      <Footer footer={c.footer} />
    </div>
  );
}
