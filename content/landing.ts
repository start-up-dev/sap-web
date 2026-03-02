/**
 * Single source of truth for landing page copy.
 * Edit this file to change all marketing content — no need to hop between components.
 */

export const landingContent = {
  nav: {
    logo: "ShipSafe",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Reviews", href: "#reviews" },
    ],
    cta: "Get started",
    ctaHref: "#pricing",
  },

  hero: {
    badge: "ShipSafe — Prove your security. Close enterprise deals.",
    headline: "You built the app. We'll find the holes.",
    subline:
      "A traditional pentest costs $10,000 and takes weeks. ShipSafe uses AI to run an active deep scan in minutes. One audit, one payment, plain English — no security knowledge required.",
    primaryCta: "Scan Now",
    primaryCtaHref: "#pricing",
    secondaryCta: "See sample report",
    secondaryCtaHref: "#how-it-works",
    trustLine: "Trusted by vibe coders and founders",
  },

  vision: {
    label: "The Problem",
    title: "Stop losing deals over security concerns",
    body: "Growing companies hit a wall: enterprise clients and compliance auditors want proof of security before they sign. Traditional penetration testing is slow, expensive, and speaks in jargon. Basic scanners are shallow and leave critical gaps. We built an AI-powered security audit that runs in minutes, costs a fraction of a traditional pentest, and gives you a plain-English report you can act on — or share with prospects.",
  },

  features: [
    {
      title: "Free Quick Scan",
      description:
        "Submit any URL. Get a passive security check in 2–5 minutes. No credit card, no commitment. See what’s broken before you go deeper.",
    },
    {
      title: "Deep Audit When You're Ready",
      description:
        "Run a full active scan across 38+ checks including OWASP Top 10, SSL/TLS, headers, APIs, and more. One-time $29 per audit. No complex verification required.",
    },
    {
      title: "Plain-English Reports",
      description:
        "No raw tool dumps. Powered by Gemini 2.5 Pro, our AI turns findings into clear explanations: what was found, how serious it is, and exactly how to fix it.",
    },
    {
      title: "Built For Builders",
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
      quote: "I built this with AI/Cursor and have no idea if it's secure. ShipSafe gave me peace of mind in 5 minutes.",
      author: "Alex",
      role: "Vibe Coder & AI App Builder",
    },
    {
      quote: "I launched a SaaS product and an enterprise prospect asked if we'd been pen-tested. ShipSafe saved the deal.",
      author: "Sarah",
      role: "SaaS Founder",
    },
    {
      quote: "I don't know if my client's new website is secure or not. Now I just run ShipSafe before every launch.",
      author: "Marcus",
      role: "Agency Owner",
    },
    {
      quote: "Even if I got a $10,000 security report, I wouldn't understand it. ShipSafe's plain English is exactly what I needed.",
      author: "David",
      role: "Solo Developer",
    }
  ],

  pricing: {
    title: "Get your app to the next level",
    subline: "Skip the $10,000 pentest. Get a full audit in minutes.",
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
        ctaHref: "#pricing",
      },
      {
        name: "Deep Audit",
        price: "$29",
        period: "One time",
        description: "Full active exploit-testing. Prove your security and close deals.",
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
        ctaHref: "#pricing",
      }
    ]
  },

  faq: {
    title: "Everything you need to understand",
    subline: "Get answers to the most common questions about ShipSafe",
    questions: [
      {
        q: "What exactly does ShipSafe do?",
        a: "We actively test your website or API for 38+ vulnerabilities, covering the OWASP Top 10, infrastructure, headers, and more using tools like ZAP, Nmap, Nikto, and Playwright. Our AI (Gemini 2.5 Pro) then interprets the results into a plain-English report with exact fixes."
      },
      {
        q: "How do I fix the issues you find?",
        a: "Every issue comes with a clear explanation and step-by-step remediation instructions written for developers and founders, not just security experts."
      },
      {
        q: "Do I need to verify my domain?",
        a: "No. You can run a Quick Scan or a Deep Audit on any URL immediately. We've automated the process so you can get security results without complex DNS configuration."
      },
      {
        q: "Is it a monthly subscription?",
        a: "No. The Deep Audit is a one-time $29 payment per report. You only pay when you need an audit."
      }
    ]
  },

  cta: {
    title: "Find what's broken. Fix what matters.",
    subline: "Run a free quick scan in minutes. Upgrade to a full audit when you're ready.",
    points: [
      "Reports in plain English with clear fix steps",
      "38+ checks: OWASP Top 10, SSL, headers, APIs, and more",
      "For non-technical founders, vibe coders, and AI app builders",
    ],
    primaryCta: "Run Free Scan",
    primaryCtaHref: "#",
    secondaryCta: "See Pricing",
    secondaryCtaHref: "#pricing",
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

export type LandingContent = typeof landingContent;
