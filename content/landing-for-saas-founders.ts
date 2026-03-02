/**
 * Landing page: /for-saas-founders
 * Target persona: Deal-Blocker SaaS Founder — enterprise sales stalled by security questionnaire
 * SEO target: "pentest report for startup", "security audit enterprise sales", "saas security questionnaire"
 */

export const saasFounderLanding = {
  meta: {
    slug: "for-saas-founders",
    title: "Security Audit Report for Enterprise SaaS Sales | ShipSafe",
    description:
      "Enterprise prospect asking for a pentest? Get a credible security audit report in minutes — not weeks. $29. No sales calls. Share it with prospects today.",
    keywords: [
      "pentest report for startup",
      "security audit enterprise sales",
      "saas security questionnaire",
      "penetration test report fast",
      "security audit for saas",
      "enterprise security compliance startup",
      "affordable pentest report",
    ],
  },

  nav: {
    logo: "ShipSafe",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "What's included", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Get My Audit Report",
    ctaHref: "#pricing",
  },

  hero: {
    badge: "For SaaS founders closing enterprise deals",
    headline: "Enterprise prospect asked if you've been pen-tested. Now what?",
    subline:
      "Traditional pentests take weeks. ShipSafe runs 38+ active security checks and delivers a professional audit report in minutes — one you can share with enterprise security teams and close the deal today.",
    primaryCta: "Get My Audit Report — $29",
    primaryCtaHref: "#pricing",
    secondaryCta: "View a sample report",
    secondaryCtaHref: "#how-it-works",
    trustLine: "Trusted by SaaS founders moving upmarket",
  },

  fear: {
    label: "The Enterprise Wall",
    title: "You've done everything right. And a security form is about to kill the deal.",
    body: "You built the product. You nailed the demo. The champion loves you. Then procurement gets involved. Their security team sends a vendor questionnaire. Has your application undergone a third-party security assessment? Can you provide a penetration test report? And suddenly the deal that was supposed to close this quarter is on ice. You're not going to lose this deal because your product isn't good enough. You're going to lose it because you can't hand them a piece of paper. ShipSafe fixes that — in minutes.",
  },

  features: [
    {
      title: "A Report You Can Actually Share",
      description:
        "Every Deep Audit comes with a professionally formatted PDF report and a shareable link. Send it directly to enterprise security teams, compliance reviewers, or procurement contacts. It's built to be read by people who look at security reports for a living.",
    },
    {
      title: "38+ Active Security Checks",
      description:
        "We cover the OWASP Top 10, SSL/TLS configuration, HTTP security headers, API endpoint exposure, and more — the exact categories enterprise security questionnaires ask about. Not a surface scan. Active exploit-testing.",
    },
    {
      title: "Results in Minutes, Not Weeks",
      description:
        "Traditional pentests take 4–6 weeks to schedule, run, and deliver. When a deal is on the line, you don't have weeks. ShipSafe delivers a full audit report in under 30 minutes — fast enough to keep your deal moving.",
    },
    {
      title: "Fix What's Found Before You Share",
      description:
        "Every finding comes with step-by-step remediation instructions. Run the audit, fix the critical issues, then share the report — showing both what was found and that you're already addressing it. That's the kind of security posture enterprise buyers respect.",
    },
  ],

  howItWorks: {
    title: "From scan to shareable report in under 30 minutes.",
    steps: [
      {
        number: "01",
        title: "Submit your URL",
        description: "No domain verification. No DNS configuration. Paste your app URL and start the audit immediately.",
      },
      {
        number: "02",
        title: "We run 38+ active checks",
        description:
          "ShipSafe actively tests your application using industry-standard tools — the same categories enterprise security teams evaluate. AI translates every finding into clear, professional language.",
      },
      {
        number: "03",
        title: "Share the report and close the deal",
        description:
          "Export a professional PDF or send a direct shareable link to the prospect's security team. Answer the questionnaire. Keep the deal alive.",
      },
    ],
  },

  socialProof: {
    title: "Founders who closed the deal",
    testimonials: [
      {
        quote:
          "An enterprise prospect froze our deal over a security questionnaire. I ran ShipSafe, sent them the PDF that same afternoon, and we closed the contract two days later.",
        author: "Sarah",
        role: "SaaS Founder",
        metric: "Deal closed in 2 days",
      },
      {
        quote:
          "I was about to lose a $40k contract because the client's security team wanted a pentest report. ShipSafe gave me one in 20 minutes. The report looked credible, covered what they asked for, and we moved forward.",
        author: "James",
        role: "B2B SaaS Founder",
        metric: "$40k contract saved",
      },
      {
        quote:
          "We were stuck in enterprise procurement hell for 6 weeks. Ran ShipSafe, shared the report, fixed three things they flagged, and got the deal unstuck within a week.",
        author: "Priya",
        role: "Series A SaaS Founder",
        metric: "6-week stall resolved",
      },
    ],
  },

  pricing: {
    title: "One audit. One report. Close the deal.",
    subline: "A $29 audit that saves a $10,000+ deal isn't a cost. It's the best ROI you'll make this quarter.",
    plans: [
      {
        name: "Quick Scan",
        price: "Free",
        period: "always free",
        description: "See your security posture at a glance before going deeper.",
        popular: false,
        features: [
          "Passive surface-level scan",
          "Overall security score",
          "Issue count by severity",
          "1 unlocked finding",
          "90-day report retention",
        ],
        cta: "Run Free Scan",
        ctaHref: "#",
      },
      {
        name: "Deep Audit",
        price: "$29",
        period: "one time, per report",
        description: "The report enterprise buyers actually want. Ready to share in minutes.",
        popular: true,
        features: [
          "Full active exploit-testing",
          "38+ checks: OWASP Top 10, SSL, APIs, headers",
          "Professionally formatted findings",
          "Step-by-step remediation for every issue",
          "PDF export — ready to share with prospects",
          "Shareable report link",
          "Permanent report archive",
        ],
        cta: "Get My Audit Report — $29",
        ctaHref: "#",
      },
    ],
  },

  faq: {
    title: "The questions enterprise buyers will ask. Answered.",
    questions: [
      {
        q: "Will enterprise security teams accept this report?",
        a: "ShipSafe covers the OWASP Top 10 and the core vulnerability categories that enterprise security questionnaires ask about. The PDF is professionally formatted and includes methodology, findings, severity ratings, and remediation steps. For most mid-market enterprise buyers, this is exactly what they need. For organizations requiring a third-party certified pentest (SOC 2 Type II, etc.), ShipSafe is an excellent starting point and complement.",
      },
      {
        q: "What if we fail the audit — should we still share the report?",
        a: "Yes — and here's why. Enterprise security teams aren't expecting perfection. They're evaluating whether you take security seriously. A report that shows findings plus clear remediation steps is far more credible than claiming you've never had any issues. Fix what you can before sharing, and be transparent about your roadmap for the rest.",
      },
      {
        q: "How quickly can I get the report?",
        a: "The Deep Audit completes in under 30 minutes. You can share the PDF the same day you run it. If a deal is on the line, you're not waiting weeks.",
      },
      {
        q: "Is this a one-time payment or a subscription?",
        a: "One-time. $29 per audit. No monthly fees, no contracts. Run one when you need it — before an enterprise pitch, after a major release, or whenever a security question comes up.",
      },
      {
        q: "Can I run it multiple times as we fix issues?",
        a: "Absolutely. Many founders run an initial audit, fix the critical findings, then run a second audit to verify. That second report is what you share — it shows both your security posture and your commitment to improving it.",
      },
    ],
  },

  cta: {
    title: "Don't let a missing report kill a real deal.",
    subline: "Get a professional security audit report in minutes. Share it. Close it.",
    points: [
      "Covers OWASP Top 10 and the checks enterprise buyers actually care about",
      "Professional PDF ready to share with prospects and security teams",
      "Results in under 30 minutes — not 6 weeks",
    ],
    primaryCta: "Get My Audit Report — $29",
    primaryCtaHref: "#",
    secondaryCta: "See Sample Report",
    secondaryCtaHref: "#how-it-works",
  },

  footer: {
    copy: "ShipSafe",
    company: "Make Real LLC",
    companyUrl: "https://makereal.app",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;

export type SaasFounderLanding = typeof saasFounderLanding;
