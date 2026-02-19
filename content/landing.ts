/**
 * Single source of truth for landing page copy.
 * Edit this file to change all marketing content — no need to hop between components.
 */

export const landingContent = {
  nav: {
    logo: "Security Audit",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#cta" },
      { label: "Reviews", href: "#reviews" },
    ],
    cta: "Get started",
    ctaHref: "#cta",
  },

  hero: {
    badge: "AI-Powered Security Audits",
    headline: "You built the app. We'll find the holes.",
    subline:
      "One audit, one payment, plain English — no security knowledge required. Get a detailed vulnerability report in minutes, not weeks.",
    primaryCta: "Analyze",
    primaryCtaHref: "#cta",
    secondaryCta: "See sample report",
    secondaryCtaHref: "#how-it-works",
    trustLine: "Trusted by builders and founders",
  },

  vision: {
    label: "Our vision",
    title: "Stop losing deals over security concerns",
    body: "Growing companies hit a wall: enterprise clients and compliance auditors want proof of security before they sign. Traditional penetration testing is slow, expensive, and speaks in jargon. Basic scanners are shallow and leave critical gaps. We built an AI-powered security audit that runs in minutes, costs a fraction of a traditional pentest, and gives you a plain-English report you can act on — or share with prospects.",
  },

  features: [
    {
      title: "Free quick scan",
      description:
        "Submit any URL. Get a passive security check in 2–5 minutes. No credit card, no commitment. See what’s broken before you go deeper.",
    },
    {
      title: "Deep audit when you're ready",
      description:
        "Verify domain ownership once, then run a full active scan. 38+ checks across OWASP Top 10, SSL/TLS, headers, APIs, and more. One-time $29 per audit.",
    },
    {
      title: "Plain-English reports",
      description:
        "No raw tool dumps. Our AI turns findings into clear explanations: what was found, how serious it is, and exactly how to fix it.",
    },
    {
      title: "Built for vibe coders & founders",
      description:
        "No security degree required. Whether you ship with Cursor, v0, or an agency — get a credible audit and close enterprise deals without the guesswork.",
    },
  ],

  goals: [
    {
      title: "Win deals without security friction",
      description:
        "Answer “have you been pen-tested?” with a real report. Share audit results with enterprise prospects and compliance reviewers.",
    },
    {
      title: "No panic compliance",
      description:
        "Get audit-ready reports and clear remediation steps. Know your posture before an auditor or customer asks.",
    },
    {
      title: "Ship with confidence",
      description:
        "Find and fix critical issues early. Integrate security checks into your workflow without slowing your team down.",
    },
    {
      title: "Security without complexity",
      description:
        "One dashboard, one report, one price. No subscriptions, no enterprise sales cycle — just run a scan when you need it.",
    },
  ],

  testimonials: [
    {
      quote: "I built this with AI/Cursor and have no idea if it's secure.",
      author: "Solo founder",
      role: "AI app builder",
    },
    {
      quote: "I don't know if my website is secure or not.",
      author: "Business owner",
      role: "Non-technical",
    },
    {
      quote: "I can't afford a $10,000 security audit.",
      author: "Startup founder",
      role: "SaaS",
    },
    {
      quote: "Even if I got a security report, I wouldn't understand it.",
      author: "Vibe coder",
      role: "Ships with AI tools",
    },
    {
      quote: "I just shipped my app and someone told me I should get it pen-tested — what does that even mean?",
      author: "Builder",
      role: "First-time shipper",
    },
    {
      quote: "I launched a SaaS product and need to tell enterprise customers I've been pen-tested.",
      author: "CTO",
      role: "B2B SaaS",
    },
  ],

  pricing: {
    title: "Get your app to the next level",
    subline: "Everything you'll get in a deep audit",
    plans: [
      {
        name: "Quick Scan",
        price: "Free",
        period: "always",
        description: "A fast, passive check to see what's broken before you go deeper.",
        popular: false,
        features: [
          "Passive, read-only scan",
          "Score + issue count by severity",
          "1 low-severity finding unlocked",
          "90-day report retention",
        ],
        cta: "Run Quick Scan",
        ctaHref: "#cta",
      },
      {
        name: "Deep Audit",
        price: "$29",
        period: "One time",
        description: "Full active testing. Prove your security and close deals.",
        popular: true,
        features: [
          "Full active exploit-testing",
          "38+ checks across OWASP Top 10",
          "Plain-English remediation steps",
          "PDF report export",
          "Shareable report link",
          "Permanent report archive",
        ],
        cta: "Get Full Audit",
        ctaHref: "#cta",
      }
    ]
  },

  faq: {
    title: "Everything you need to understand",
    subline: "Get answers to the most common questions about our security platform",
    questions: [
      {
        q: "What exactly does the Security Audit do?",
        a: "We actively test your website or API for 38+ vulnerabilities, covering the OWASP Top 10, infrastructure, headers, and more. Our AI then interprets the results into a plain-English report with exact fixes."
      },
      {
        q: "How do I fix the issues you find?",
        a: "Every issue comes with a clear explanation and step-by-step remediation instructions written for developers and founders, not just security experts."
      },
      {
        q: "Do I need to verify my domain?",
        a: "For the Free Quick Scan (passive), no verification is needed. For the $29 Deep Audit (active exploit testing), you must verify ownership via a DNS record, file upload, or meta tag."
      },
      {
        q: "Is it a monthly subscription?",
        a: "No. The Deep Audit is a one-time $29 payment per report. You only pay when you need an audit."
      }
    ]
  },

  whyUs: {
    title: "You keep shipping. We keep securing.",
    body: "AI lets you build and ship faster. Security hasn’t kept up — until now. We run industry-standard checks, interpret results with AI, and give you a report you can read and act on. No weeks of waiting, no five-figure invoices, no jargon.",
    points: [
      "Quick scan free, deep audit $29 one-time — no subscription",
      "Reports in plain English with clear fix steps",
      "38+ checks: OWASP Top 10, SSL, headers, APIs, and more",
      "For non-technical founders, vibe coders, and AI app builders",
    ],
  },

  partners: {
    title: "Built for teams that ship",
    description:
      "Solo builders, startups, and agencies use us to get audit-ready and close deals.",
    cta: "Get in touch",
    ctaHref: "#cta",
  },

  cta: {
    title: "Find what's broken. Fix what matters.",
    subline: "Run a free quick scan in minutes. Upgrade to a full audit when you're ready.",
    primaryCta: "Run free scan",
    primaryCtaHref: "#",
    secondaryCta: "See pricing",
    secondaryCtaHref: "#pricing",
  },

  footer: {
    copy: "Security Audit Platform",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;

export type LandingContent = typeof landingContent;
