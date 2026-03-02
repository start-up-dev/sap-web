/**
 * Landing page: /for-web-agencies
 * Target persona: Agency Owner — builds for clients, wants to add security audit as a service
 * SEO target: "security audit for web agencies", "website security check for clients", "pentest for agencies"
 */

export const agencyLanding = {
  meta: {
    slug: "for-web-agencies",
    title: "Security Audits for Web Agencies | ShipSafe",
    description:
      "Add a professional security audit to every client launch. Protect your reputation. Charge more. ShipSafe runs 38+ checks per site — $29, shareable PDF, done in minutes.",
    keywords: [
      "security audit for web agencies",
      "website security check for clients",
      "agency security audit tool",
      "pre-launch security check",
      "client website security audit",
      "web agency security checklist",
      "security audit white label",
    ],
  },

  nav: {
    logo: "ShipSafe",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "What you get", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Start Free Scan",
    ctaHref: "#pricing",
  },

  hero: {
    badge: "Built for agencies that launch sites for clients",
    headline:
      "If a client's site gets hacked after you built it, that's your problem.",
    subline:
      "Protect your reputation and catch vulnerabilities before your clients do. ShipSafe runs 38+ active security checks in minutes so you can handover with confidence. Professional PDF included. $29 per site.",

    primaryCta: "Audit a Client Site Free",
    primaryCtaHref: "#pricing",
    secondaryCta: "See what we check",
    secondaryCtaHref: "#features",
    trustLine:
      "Trusted by agencies who build fast and protect their reputation",
  },

  fear: {
    label: "The Risk Nobody Budgets For",
    title: "You delivered the site. You had no idea about the vulnerability.",
    body: "You built exactly what the client asked for, on time and on budget. Three months later, their site gets hit. Data exposed. Client panicking. And the first call they make is to you. It doesn't matter that it wasn't in scope. It doesn't matter that you used a reputable CMS. What matters is that you launched it — and now you're explaining yourself. A $29 security audit before handover is the cheapest insurance you'll ever buy. And it's a service your clients will pay a premium for.",
  },

  features: [
    {
      title: "Run It Before Every Launch",
      description:
        "Make ShipSafe part of your pre-launch checklist. Paste the client's URL, run the audit, and catch critical issues before they become your problem. Takes 5 minutes. Protects months of work.",
    },
    {
      title: "A Report Clients Can See",
      description:
        "Every Deep Audit includes a professionally formatted PDF. Hand it to the client at delivery as proof you took security seriously. It's a trust-builder — and a CYA document — rolled into one.",
    },
    {
      title: "38+ Real Checks Per Site",
      description:
        "We actively test for OWASP Top 10, SSL/TLS misconfigurations, exposed headers, API vulnerabilities, and more. Not a surface scan. Not a checkbox exercise. Findings you can act on before the client goes live.",
    },
    {
      title: "Turn It Into a Premium Service",
      description:
        '"Security audit included" is a line item clients will pay for — and one your competitors probably don\'t offer. Add $150–$500 to every project quote. Run ShipSafe for $29. The math is obvious.',
    },
  ],

  howItWorks: {
    title: "Fits into your launch process. No disruption.",
    steps: [
      {
        number: "01",
        title: "Submit the client's URL",
        description:
          "Paste any URL — staging, production, or a live site. No domain verification. No technical setup. Works on any stack.",
      },
      {
        number: "02",
        title: "ShipSafe runs the audit",
        description:
          "38+ active security checks run automatically. AI translates every finding into clear, professional language — no security jargon in the client report.",
      },
      {
        number: "03",
        title: "Deliver the report. Protect your name.",
        description:
          "Export the PDF, fix what's critical, and hand it over with confidence. Share the shareable link in the client's handover document.",
      },
    ],
  },

  testimonials: [
    {
      quote:
        "I run ShipSafe before every client launch now. Caught a serious header misconfiguration on the last project. Client never knew it was almost a problem — and that's exactly the point.",
      author: "Marcus",
      role: "Agency Owner, 12 clients/year",
    },
    {
      quote:
        "We added 'security audit' as a line item in our proposals. $250 added to every project. We run ShipSafe. Clients feel good, we feel protected, and it's the easiest $221 we make on every job.",
      author: "Rachel",
      role: "Web Agency, 4-person team",
    },
    {
      quote:
        "Had a client get hacked a year after launch. Nothing I could have caught with normal QA. Now I run ShipSafe on everything before it goes live. Haven't had an incident since.",
      author: "Tom",
      role: "Freelance Developer",
    },
  ],

  pricing: {
    title: "Protect every client launch. Charge for it.",
    subline:
      "$29 per site. A professional PDF. And the peace of mind that you caught it before they did.",
    plans: [
      {
        name: "Quick Scan",
        price: "Free",
        period: "always free",
        description: "See what's exposed at a glance before the full audit.",
        popular: false,
        features: [
          "Passive surface-level scan",
          "Overall security score",
          "Issue count by severity",
          "1 unlocked finding",
          "90-day report retention",
        ],
        cta: "Scan a Client Site Free",
        ctaHref: "#",
      },
      {
        name: "Deep Audit",
        price: "$29",
        period: "per site, one time",
        description:
          "The full audit. Professional PDF. Shareable report. Everything you need at handover.",
        popular: true,
        features: [
          "Full active exploit-testing",
          "38+ checks: OWASP Top 10, SSL, headers, APIs",
          "Plain-English findings with severity ratings",
          "Step-by-step remediation for every issue",
          "Professional PDF for client delivery",
          "Shareable report link",
          "Permanent report archive",
        ],
        cta: "Audit This Site — $29",
        ctaHref: "#",
      },
    ],
  },

  faq: {
    title: "Questions from agency owners",
    questions: [
      {
        q: "Can I use this for client sites I didn't build?",
        a: "Yes. You can run ShipSafe on any URL immediately — no domain ownership verification required. Use it on client sites, sites you're inheriting, or sites you're considering taking on.",
      },
      {
        q: "Can I show the report directly to clients?",
        a: "Absolutely. The PDF is formatted professionally — clear findings, severity ratings, and remediation steps written in plain English. Most clients appreciate the transparency. Many will never have received a security report before.",
      },
      {
        q: "What if the audit finds critical issues?",
        a: "That's exactly why you run it before launch. Fix the critical and high-severity items before handover. If it's a site you're inheriting, the report becomes a clear scope for remediation work — additional billable hours.",
      },
      {
        q: "We launch 15+ sites per year. Is there a bulk option?",
        a: "Right now it's $29 per audit, one-time. Many agencies build this into their project cost or charge clients directly for the security audit as a line item. Volume pricing is on the roadmap — email us if this is relevant.",
      },
      {
        q: "What stacks does it work on?",
        a: "Any publicly accessible web application or URL. WordPress, Webflow, Framer, custom-built apps, APIs — if it has a URL, we can audit it.",
      },
    ],
  },

  cta: {
    title: "Make security part of every launch.",
    subline:
      "Protect your reputation. Protect your clients. Add a service your competitors don't offer. $29 per site.",
    points: [
      "38+ checks on any stack — WordPress, Webflow, custom apps, APIs",
      "Professional PDF ready to hand to clients at delivery",
      "Catch critical issues before they become your problem",
    ],
    primaryCta: "Audit a Client Site Free",
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

export type AgencyLanding = typeof agencyLanding;
