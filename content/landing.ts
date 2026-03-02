/**
 * Single source of truth for landing page copy.
 * The homepage has one job: make the right visitor self-select into the right persona page — while converting the ones who are ready to buy right now.
 */

export const landingContent = {
  meta: {
    title: "ShipSafe — Security Audit for Apps & Websites | Free Scan",
    description:
      "Run 38+ active security checks on any app or website in minutes. Get a plain-English report with fix steps. Free quick scan. Full audit for $29. No pentest required.",
    keywords: [
      "website security audit",
      "security audit tool",
      "pentest alternative",
      "app security check",
      "free security scan",
      "OWASP Top 10 scanner",
      "security audit for startups",
    ],
  },

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
      "ShipSafe runs 38+ active security checks on any app or website in minutes. Get a plain-English report you can act on, or share with enterprise clients. Free quick scan. Full audit for $29.",
    primaryCta: "See What's Exposed",
    primaryCtaHref: "#pricing",
    secondaryCta: "See What's Included",
    secondaryCtaHref: "#features",
    trustLine:
      "Trusted by founders who ship fast and can't afford to get burned",
  },

  personas: {
    label: "Who is ShipSafe for?",
    title: "Choose the path that fits your current challenge",
    paths: [
      {
        id: "builder",
        icon: "rocket",
        headline:
          "You built with AI tools and want to know if it's actually safe",
        body: "Cursor, Lovable, Bolt, v0. You moved fast. Make sure nothing's broken.",
        cta: "I'm a builder →",
        href: "/for-vibe-coders",
      },
      {
        id: "founder",
        icon: "handshake",
        headline: "An enterprise prospect just asked if you've been pen-tested",
        body: "Get a professional audit report in minutes — not weeks. Close the deal.",
        cta: "I'm closing a deal →",
        href: "/for-saas-founders",
      },
      {
        id: "agency",
        icon: "building",
        headline:
          "You build sites for clients and want to protect your reputation",
        body: "Audit before every handover. Add it as a premium service. Sleep at night.",
        cta: "I run an agency →",
        href: "/for-web-agencies",
      },
    ],
  },

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

  howItWorks: {
    title: "How it works",
    steps: [
      {
        number: "01",
        title: "Submit your URL",
        description: "Any URL. No setup. No verification. Just paste and go.",
      },
      {
        number: "02",
        title: "We run 38+ checks",
        description:
          "Active testing. Not a surface scan. OWASP Top 10, SSL, headers, and more.",
      },
      {
        number: "03",
        title: "You get a real report",
        description:
          "Plain English. Severity ratings. Step-by-step fix instructions. PDF export.",
      },
    ],
  },

  stats: {
    items: [
      { value: "38+", label: "security checks per audit" },
      { value: "5 min", label: "average scan time" },
      { value: "$29", label: "vs $10,000 for pentest" },
      { value: "100%", label: "findings include a fix" },
    ],
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
        "Run a full active scan across 38+ checks including OWASP Top 10, SSL/TLS, headers, APIs, and more. One-time $29 per audit.",
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

  testimonials: [
    {
      quote:
        "Found two findings in 5 minutes that would have been really bad. Cursor/v0 move fast, but ShipSafe makes sure it's safe.",
      author: "Alex",
      role: "Vibe Coder & AI App Builder",
    },
    {
      quote:
        "Ran ShipSafe, sent the PDF that afternoon, closed the contract two days later. The enterprise prospect was impressed.",
      author: "Sarah",
      role: "SaaS Founder",
    },
    {
      quote:
        "Run it before every client launch now. Caught a serious header misconfiguration. Client never knew — and that's the point.",
      author: "Marcus",
      role: "Agency Owner",
    },
    {
      quote:
        "Had a client get hacked a year after launch. Nothing I could have caught with normal QA. Now I run ShipSafe on everything before it goes live. Haven't had an incident since.",
      author: "Tom",
      role: "Freelance Developer",
    },
  ],

  pricing: {
    title: "Simple. Transparent. No surprises.",
    subline: "Skip the $10,000 pentest. Get a full audit in minutes.",
    plans: [
      {
        name: "Quick Scan",
        price: "Free",
        period: "always",
        description:
          "A fast, passive check to see what's broken before you go deeper.",
        popular: false,
        features: [
          "Passive, read-only scan",
          "Score + issue count by severity",
          "1 low-severity finding unlocked",
          "90-day report retention",
        ],
        cta: "Run Free Scan",
        ctaHref: "#pricing",
      },
      {
        name: "Deep Audit",
        price: "$29",
        period: "One time",
        description:
          "Full active exploit-testing. Prove your security and close deals.",
        popular: true,
        features: [
          "Full active exploit-testing",
          "38+ checks across OWASP Top 10",
          "Plain-English remediation steps",
          "PDF report export",
          "Shareable report link",
          "Permanent report archive",
        ],
        cta: "Get Full Audit — $29",
        ctaHref: "#pricing",
      },
    ],
  },

  faq: {
    title: "Everything you need to understand",
    subline: "Get answers to the most common questions about ShipSafe",
    questions: [
      {
        q: "What exactly does ShipSafe do?",
        a: "We actively test your website or API for 38+ vulnerabilities, covering the OWASP Top 10, infrastructure, headers, and more using tools like ZAP, Nmap, Nikto, and Playwright. Our AI (Gemini 2.5 Pro) then interprets the results into a plain-English report with exact fixes.",
      },
      {
        q: "How do I fix the issues you find?",
        a: "Every issue comes with a clear explanation and step-by-step remediation instructions written for developers and founders, not just security experts.",
      },
      {
        q: "Do I need to verify my domain?",
        a: "No. You can run a Quick Scan or a Deep Audit on any URL immediately. We've automated the process so you can get security results without complex DNS configuration.",
      },
      {
        q: "Is it a monthly subscription?",
        a: "No. The Deep Audit is a one-time $29 payment per report. You only pay when you need an audit.",
      },
    ],
  },

  cta: {
    title: "Find what's broken. Fix it. Move forward.",
    subline: "Free scan takes 5 minutes. You'll know exactly where you stand.",
    points: [
      "Reports in plain English with clear fix steps",
      "38+ checks: OWASP Top 10, SSL, headers, APIs, and more",
      "Professional PDF export ready for enterprise security teams",
    ],
    primaryCta: "Scan My App Free — No Card Required",
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
