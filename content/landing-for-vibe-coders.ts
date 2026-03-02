/**
 * Landing page: /for-vibe-coders
 * Target persona: Anxious Founder — built with AI tools, no security knowledge, fears a breach
 * SEO target: "vibe coding security", "cursor app security check", "is my ai built app secure"
 */

export const vibeCoderLanding = {
  meta: {
    slug: "for-vibe-coders",
    title: "Security Audit for AI-Built Apps | ShipSafe",
    description:
      "Built your app with Cursor, Lovable, or Bolt? Get a real security audit in 5 minutes. Find out what's exposed before someone else does. Free quick scan, no sign-up.",
    keywords: [
      "vibe coding security",
      "cursor app security",
      "lovable security audit",
      "bolt.new security check",
      "ai built app security",
      "is my app secure",
      "security audit no code",
    ],
  },

  nav: {
    logo: "ShipSafe",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "What we find", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
    cta: "Scan My App Free",
    ctaHref: "#pricing",
  },

  hero: {
    badge: "Built for AI app builders and vibe coders",
    headline: "You shipped it fast. Do you actually know if it's secure?",
    subline:
      "Cursor, Lovable, and Bolt are great for building fast, but AI-generated code has gaps. ShipSafe runs 38+ active security checks in minutes and tells you exactly what's exposed — in plain English.",
    primaryCta: "See What's Exposed",
    primaryCtaHref: "#pricing",
    secondaryCta: "See a real scan result",
    secondaryCtaHref: "#how-it-works",
    trustLine: "Trusted by AI app builders who move fast and want to stay safe",
  },

  fear: {
    label: "The Part Nobody Talks About",
    title: "AI writes the features. Nobody writes the security.",
    body: "You used AI to ship something real in days instead of months. That's genuinely impressive. But here's what the AI didn't do: think about what happens when someone tries to break in. 45% of AI-generated code contains at least one security vulnerability. Exposed APIs. Missing authentication checks. Headers that tell attackers exactly what version of everything you're running. You don't know what's in your app — and neither does the AI that wrote it. ShipSafe does.",
    stat: "45%",
    statLabel:
      "of AI-generated code contains at least one security vulnerability",
  },

  features: [
    {
      title: "See What a Hacker Sees",
      description:
        "Run a free passive scan on any URL in 2–5 minutes. No credit card, no setup. Get a real picture of what's visible from the outside — before someone with bad intentions finds it first.",
    },
    {
      title: "38+ Real Security Checks",
      description:
        "Our Deep Audit actively probes your app across OWASP Top 10, SSL/TLS, exposed headers, API endpoints, and more. The same checks a real penetration tester would run — for $29 instead of $10,000.",
    },
    {
      title: "Written for Builders, Not Security Experts",
      description:
        "No raw scan output. No acronym soup. Every finding comes with a plain-English explanation of what was found, why it matters, and a step-by-step fix you can actually implement — even if you don't have a security background.",
    },
    {
      title: "Fix It This Weekend",
      description:
        "We prioritize every issue by severity so you know exactly what to tackle first. Most critical findings have straightforward fixes. You don't need to hire a security consultant — you need to know what to Google.",
    },
  ],

  howItWorks: {
    title: "Three steps. Five minutes. Done.",
    steps: [
      {
        number: "01",
        title: "Paste your URL",
        description:
          "Any URL — your app, your API, your landing page. No account required for the free scan.",
      },
      {
        number: "02",
        title: "We run the checks",
        description:
          "ShipSafe actively tests 38+ vulnerability categories using industry-standard security tools, then passes every finding through AI to translate it into plain English.",
      },
      {
        number: "03",
        title: "You get a real report",
        description:
          "See every issue, its severity, and exactly how to fix it. Export as PDF or share a link. Know where you stand — finally.",
      },
    ],
  },

  testimonials: [
    {
      quote:
        "I shipped an app with Cursor and genuinely had no idea if it was secure. ShipSafe found two issues in 5 minutes that would have been really, really bad.",
      author: "Alex",
      role: "AI App Builder",
    },
    {
      quote:
        "I built my whole SaaS with Lovable. I ran ShipSafe before launch almost as an afterthought. Found an exposed admin endpoint I didn't even know existed. Could have been catastrophic.",
      author: "Jordan",
      role: "Solo SaaS Founder",
    },
    {
      quote:
        "Even if I got a $10,000 security report, I wouldn't understand it. ShipSafe gave me something I could actually read and fix myself over a weekend.",
      author: "David",
      role: "Vibe Coder",
    },
  ],

  pricing: {
    title: "Find out what's broken. Fix it before it matters.",
    subline: "Start free. Go deep when you're ready.",
    plans: [
      {
        name: "Quick Scan",
        price: "Free",
        period: "always free",
        description: "See what's visible from the outside. No card. No catch.",
        popular: false,
        features: [
          "Passive surface-level scan",
          "Overall security score",
          "Issue count by severity",
          "1 unlocked finding",
          "90-day report retention",
        ],
        cta: "Scan My App Now",
        ctaHref: "#",
      },
      {
        name: "Deep Audit",
        price: "$29",
        period: "one time",
        description:
          "38+ active checks. Every finding explained. Every fix written out.",
        popular: true,
        features: [
          "Full active exploit-testing",
          "38+ checks: OWASP Top 10, SSL, APIs, headers",
          "Plain-English findings with severity ratings",
          "Step-by-step fix instructions for every issue",
          "PDF export",
          "Shareable link",
          "Permanent archive",
        ],
        cta: "Get My Full Report — $29",
        ctaHref: "#",
      },
    ],
  },

  faq: {
    title: "Questions from builders like you",
    questions: [
      {
        q: "I'm not technical. Will I understand the report?",
        a: "Yes — that's the entire point. Every finding is written in plain English with a clear explanation of what was found, why it's risky, and a step-by-step fix you can follow. No security degree required.",
      },
      {
        q: "Does it matter that my app was built with AI?",
        a: "It matters a lot — and it's exactly why we built ShipSafe. AI tools are incredible for building fast, but they don't think about security the same way an experienced developer would. We check for the gaps they leave behind.",
      },
      {
        q: "What if I can't fix everything it finds?",
        a: "We prioritize every issue by severity. Start with the critical and high-severity findings — those are the ones that actually matter. The rest can wait. Most fixes are simpler than you'd expect.",
      },
      {
        q: "Do I need to verify that I own the domain?",
        a: "No. You can scan any URL immediately. No DNS records, no verification process — just paste and go.",
      },
    ],
  },

  cta: {
    title: "You've been building in the dark long enough.",
    subline:
      "Run a free scan in 5 minutes. See exactly what's exposed. Sleep better tonight.",
    primaryCta: "Scan My App Free",
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

export type VibeCoderLanding = typeof vibeCoderLanding;
