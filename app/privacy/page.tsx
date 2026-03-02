import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { landingContent as c } from "@/content/landing";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[#666]">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#999] prose-li:text-[#999] prose-strong:text-white space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              ShipSafe (a product of Make Real LLC, "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our security auditing service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
            <p>We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> We use Clerk for authentication. Your name, email address, and profile picture are handled according to Clerk&apos;s privacy standards.</li>
              <li><strong>Scan Data:</strong> When you run an audit, we store the target URL, the technical findings from security tools, and the AI-generated interpretations.</li>
              <li><strong>Payment Information:</strong> All payments are processed by Stripe. We do not store your credit card details on our servers. Stripe provides us with transaction confirmation and basic billing details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <p>We use the collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our security auditing service.</li>
              <li>Generate and archive your security reports.</li>
              <li>Process your one-time payments via Stripe.</li>
              <li>Communicate with you regarding your audit status and support requests.</li>
              <li>Improve our security testing algorithms and AI interpretations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Service Providers</h2>
            <p>We share certain data with trusted third parties to provide our service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Clerk:</strong> For user authentication and session management.</li>
              <li><strong>Stripe:</strong> For secure payment processing.</li>
              <li><strong>Google Gemini:</strong> We send technical security findings to Google Gemini 2.5 Pro to generate plain-English explanations. We do not send your personal account information to these models.</li>
              <li><strong>Infrastructure:</strong> Our security workers run on isolated cloud instances to perform the technical scanning.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
            <p>
              Free "Quick Scans" are retained for 90 days before being automatically purged. Paid "Deep Audits" and their associated reports are archived permanently in your account unless you choose to delete them. You can delete your account and all associated data at any time from your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have rights under the GDPR, CCPA, or other privacy laws, including the right to access, correct, or delete your personal data. Please contact us at support@makereal.app to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@makereal.app.
            </p>
          </section>
        </div>
      </main>

      <Footer footer={c.footer} />
    </div>
  );
}
